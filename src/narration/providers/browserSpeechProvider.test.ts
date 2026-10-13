import { BrowserSpeechProvider, type SpeechSynthesisLike, type UtteranceLike } from './browserSpeechProvider';
import { librarian, studio } from '../testing/fakes';

class FakeUtterance implements UtteranceLike {
  lang = '';
  pitch = 1;
  rate = 1;
  voice: { lang: string; name: string } | null = null;
  onend: (() => void) | null = null;
  onerror: ((event: { error: string }) => void) | null = null;
  constructor(readonly text: string) {}
}

function createSynth(voices: { lang: string; name: string }[] = []) {
  const spoken: FakeUtterance[] = [];
  const synth = {
    speak: vi.fn((u: FakeUtterance) => spoken.push(u)),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    getVoices: () => voices,
  };
  return { synth: synth as unknown as SpeechSynthesisLike, spoken, raw: synth };
}

describe('BrowserSpeechProvider', () => {
  it('is unavailable without the Web Speech API', async () => {
    const provider = new BrowserSpeechProvider({ synth: null, createUtterance: (t) => new FakeUtterance(t) });
    await expect(provider.isAvailable()).resolves.toBe(false);
  });

  it('is available when speechSynthesis exists', async () => {
    const { synth } = createSynth();
    const provider = new BrowserSpeechProvider({ synth, createUtterance: (t) => new FakeUtterance(t) });
    await expect(provider.isAvailable()).resolves.toBe(true);
  });

  it('applies the narrator pitch, rate and language', async () => {
    const { synth, spoken } = createSynth();
    const provider = new BrowserSpeechProvider({ synth, createUtterance: (t) => new FakeUtterance(t) });
    await provider.start({ text: 'Hi there.', narrator: studio });

    expect(spoken).toHaveLength(1);
    expect(spoken[0].text).toBe('Hi there.');
    expect(spoken[0].pitch).toBe(studio.browser.pitch);
    expect(spoken[0].rate).toBe(studio.browser.rate);
    expect(spoken[0].lang).toBe(studio.browser.lang);
  });

  it('picks an exact-language voice, then a same-language voice', async () => {
    const voices = [
      { lang: 'fr-FR', name: 'Amelie' },
      { lang: 'en-US', name: 'Samantha' },
      { lang: 'en-ZA', name: 'Tessa' },
    ];
    const first = createSynth(voices);
    await new BrowserSpeechProvider({ synth: first.synth, createUtterance: (t) => new FakeUtterance(t) }).start({
      text: 'x',
      narrator: librarian,
    });
    expect(first.spoken[0].voice?.name).toBe('Tessa');

    const second = createSynth(voices.slice(0, 2));
    await new BrowserSpeechProvider({ synth: second.synth, createUtterance: (t) => new FakeUtterance(t) }).start({
      text: 'x',
      narrator: librarian,
    });
    expect(second.spoken[0].voice?.name).toBe('Samantha');
  });

  it('resolves when the utterance ends', async () => {
    const { synth, spoken } = createSynth();
    const provider = new BrowserSpeechProvider({ synth, createUtterance: (t) => new FakeUtterance(t) });
    const playback = await provider.start({ text: 'Hi.', narrator: librarian });
    spoken[0].onend?.();
    await expect(playback.finished).resolves.toBeUndefined();
  });

  it('rejects on a real speech error', async () => {
    const { synth, spoken } = createSynth();
    const provider = new BrowserSpeechProvider({ synth, createUtterance: (t) => new FakeUtterance(t) });
    const playback = await provider.start({ text: 'Hi.', narrator: librarian });
    spoken[0].onerror?.({ error: 'synthesis-failed' });
    await expect(playback.finished).rejects.toThrow('synthesis-failed');
  });

  it.each(['canceled', 'interrupted'])('treats "%s" as a normal stop', async (reason) => {
    const { synth, spoken } = createSynth();
    const provider = new BrowserSpeechProvider({ synth, createUtterance: (t) => new FakeUtterance(t) });
    const playback = await provider.start({ text: 'Hi.', narrator: librarian });
    spoken[0].onerror?.({ error: reason });
    await expect(playback.finished).resolves.toBeUndefined();
  });

  it('delegates pause, resume and stop to speechSynthesis', async () => {
    const { synth, raw } = createSynth();
    const provider = new BrowserSpeechProvider({ synth, createUtterance: (t) => new FakeUtterance(t) });
    const playback = await provider.start({ text: 'Hi.', narrator: librarian });

    playback.pause();
    playback.resume();
    playback.stop();

    expect(raw.pause).toHaveBeenCalled();
    expect(raw.resume).toHaveBeenCalled();
    expect(raw.cancel).toHaveBeenCalled();
  });
});
