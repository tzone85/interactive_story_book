import type { Mock } from 'vitest';
import { FakeAudio, flush, librarian, studio } from '../testing/fakes';
import { VoiceStudioProvider } from './voiceStudioProvider';
import type { SynthesisInput } from './voiceStudioClient';

type SynthesizeMock = Mock<[SynthesisInput, AbortSignal?], Promise<Blob>>;
type PingMock = Mock<[], Promise<boolean>>;

function setup(
  overrides: { synthesize?: SynthesizeMock; ping?: PingMock; maxChunkLength?: number } = {},
) {
  FakeAudio.instances = [];
  const synthesize: SynthesizeMock =
    overrides.synthesize ?? vi.fn<[SynthesisInput, AbortSignal?], Promise<Blob>>().mockResolvedValue(new Blob(['mp3']));
  const ping: PingMock = overrides.ping ?? vi.fn<[], Promise<boolean>>().mockResolvedValue(true);
  let urlCounter = 0;
  const revoked: string[] = [];
  const provider = new VoiceStudioProvider({
    client: { ping, synthesize },
    createAudio: (src) => new FakeAudio(src),
    objectUrls: {
      create: () => `blob:fake-${++urlCounter}`,
      revoke: (url) => revoked.push(url),
    },
    cacheSize: 2,
    maxChunkLength: overrides.maxChunkLength,
  });
  return { provider, synthesize, ping, revoked };
}

describe('VoiceStudioProvider', () => {
  it('is available when VoiceStudio answers the ping', async () => {
    const { provider, ping } = setup();
    await expect(provider.isAvailable()).resolves.toBe(true);
    ping.mockResolvedValue(false);
    await expect(provider.isAvailable()).resolves.toBe(false);
  });

  it('requests speech using the narrator voice settings', async () => {
    const { provider, synthesize } = setup();
    await provider.start({ text: 'Hello.', narrator: librarian });

    expect(synthesize).toHaveBeenCalledTimes(1);
    const input = synthesize.mock.calls[0][0] as SynthesisInput;
    expect(input).toEqual({
      input: 'Hello.',
      voice: librarian.voiceStudio.defaultVoice,
      instructions: librarian.voiceStudio.instructions,
      speed: librarian.voiceStudio.speed,
    });
  });

  it('prefers the voice the reader picked', async () => {
    const { provider, synthesize } = setup();
    await provider.start({ text: 'Hello.', narrator: studio, voiceId: 'profile-9' });
    expect((synthesize.mock.calls[0][0] as SynthesisInput).voice).toBe('profile-9');
  });

  it('plays the audio and resolves when it ends', async () => {
    const { provider } = setup();
    const playback = await provider.start({ text: 'Hello.', narrator: librarian });
    await flush();

    const audio = FakeAudio.instances[0];
    expect(audio.src).toBe('blob:fake-1');
    expect(audio.playing).toBe(true);

    audio.end();
    await expect(playback.finished).resolves.toBeUndefined();
  });

  it('pauses and resumes the current audio', async () => {
    const { provider } = setup();
    const playback = await provider.start({ text: 'Hello.', narrator: librarian });
    await flush();
    const audio = FakeAudio.instances[0];

    playback.pause();
    expect(audio.playing).toBe(false);
    playback.resume();
    expect(audio.playing).toBe(true);
    audio.end();
    await playback.finished;
  });

  it('stop silences the audio and settles `finished`', async () => {
    const { provider } = setup();
    const playback = await provider.start({ text: 'Hello.', narrator: librarian });
    await flush();

    playback.stop();
    expect(FakeAudio.instances[0].playing).toBe(false);
    await expect(playback.finished).resolves.toBeUndefined();
  });

  it('rejects start when synthesis fails so the engine can fall back', async () => {
    const { provider } = setup({
      synthesize: vi.fn<[SynthesisInput, AbortSignal?], Promise<Blob>>().mockRejectedValue(new Error('server down')),
    });
    await expect(provider.start({ text: 'Hello.', narrator: librarian })).rejects.toThrow('server down');
  });

  it('rejects `finished` when playback is blocked by the browser', async () => {
    const { provider } = setup();
    const originalPlay = FakeAudio.prototype.play;
    FakeAudio.prototype.play = function (this: FakeAudio) {
      this.playError = new Error('NotAllowedError');
      return originalPlay.call(this);
    };
    try {
      const playback = await provider.start({ text: 'Hello.', narrator: librarian });
      await expect(playback.finished).rejects.toThrow('NotAllowedError');
    } finally {
      FakeAudio.prototype.play = originalPlay;
    }
  });

  it('rejects `finished` when the audio element errors', async () => {
    const { provider } = setup();
    const playback = await provider.start({ text: 'Hello.', narrator: librarian });
    await flush();
    FakeAudio.instances[0].fail();
    await expect(playback.finished).rejects.toThrow(/audio/i);
  });

  it('reuses cached audio for identical requests', async () => {
    const { provider, synthesize } = setup();
    const first = await provider.start({ text: 'Hello.', narrator: librarian });
    await flush();
    FakeAudio.instances[0].end();
    await first.finished;

    const second = await provider.start({ text: 'Hello.', narrator: librarian });
    await flush();
    FakeAudio.instances[1].end();
    await second.finished;

    expect(synthesize).toHaveBeenCalledTimes(1);
  });

  it('does not share cache entries across narrators', async () => {
    const { provider, synthesize } = setup();
    await provider.start({ text: 'Hello.', narrator: librarian });
    await provider.start({ text: 'Hello.', narrator: studio });
    expect(synthesize).toHaveBeenCalledTimes(2);
  });

  it('revokes object URLs evicted from the cache', async () => {
    const { provider, revoked } = setup();
    await provider.start({ text: 'One.', narrator: librarian });
    await provider.start({ text: 'Two.', narrator: librarian });
    await provider.start({ text: 'Three.', narrator: librarian });
    expect(revoked).toEqual(['blob:fake-1']);
  });

  it('plays long text as consecutive chunks and finishes after the last one', async () => {
    const { provider, synthesize } = setup({ maxChunkLength: 20 });
    const playback = await provider.start({ text: 'One two. Three four. Five six.', narrator: librarian });
    await flush();

    expect(FakeAudio.instances).toHaveLength(1);
    FakeAudio.instances[0].end();
    await flush();
    expect(FakeAudio.instances).toHaveLength(2);
    FakeAudio.instances[1].end();
    await expect(playback.finished).resolves.toBeUndefined();

    expect(synthesize.mock.calls.map(([input]) => (input as SynthesisInput).input)).toEqual([
      'One two. Three four.',
      'Five six.',
    ]);
  });

  it('stops requesting further chunks once stopped', async () => {
    const { provider, synthesize } = setup({ maxChunkLength: 20 });
    const playback = await provider.start({ text: 'One two. Three four. Five six.', narrator: librarian });
    await flush();

    playback.stop();
    await playback.finished;
    await flush();
    expect(synthesize).toHaveBeenCalledTimes(1);
  });
});
