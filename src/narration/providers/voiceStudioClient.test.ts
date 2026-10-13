import { VoiceStudioClient, VoiceStudioError, normalizeBaseUrl } from './voiceStudioClient';

const BASE = 'http://127.0.0.1:3900';

function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
}

describe('normalizeBaseUrl', () => {
  it('trims whitespace and trailing slashes', () => {
    expect(normalizeBaseUrl('  http://localhost:3900/// ')).toBe('http://localhost:3900');
  });

  it('accepts http and https only', () => {
    expect(() => normalizeBaseUrl('ftp://x')).toThrow(VoiceStudioError);
    expect(() => normalizeBaseUrl('javascript:alert(1)')).toThrow(VoiceStudioError);
    expect(() => normalizeBaseUrl('not a url')).toThrow(VoiceStudioError);
    expect(normalizeBaseUrl('https://studio.example.com')).toBe('https://studio.example.com');
  });
});

describe('VoiceStudioClient', () => {
  it('pings the discovery document', async () => {
    const fetchFn = vi.fn().mockResolvedValue(jsonResponse({ protocol: 'voicestudio.speech.v1' }));
    const client = new VoiceStudioClient({ baseUrl: BASE, fetchFn });

    await expect(client.ping()).resolves.toBe(true);
    expect(fetchFn.mock.calls[0][0]).toBe(`${BASE}/.well-known/voicestudio-speech`);
  });

  it('reports unreachable when fetch fails or returns an error status', async () => {
    const down = new VoiceStudioClient({
      baseUrl: BASE,
      fetchFn: vi.fn().mockRejectedValue(new TypeError('Failed to fetch')),
    });
    await expect(down.ping()).resolves.toBe(false);

    const broken = new VoiceStudioClient({
      baseUrl: BASE,
      fetchFn: vi.fn().mockResolvedValue(new Response('no', { status: 500 })),
    });
    await expect(broken.ping()).resolves.toBe(false);
  });

  it('lists voices, profiles first, mapping the VoiceStudio extension shape', async () => {
    const fetchFn = vi.fn().mockResolvedValue(
      jsonResponse({
        voices: [
          { voice_id: 'alloy', name: 'Alloy', type: 'openai_alias' },
          { voice_id: 'p-1', name: 'Gogo Nomsa', type: 'profile' },
        ],
        engines: [],
      }),
    );
    const client = new VoiceStudioClient({ baseUrl: BASE, fetchFn });

    await expect(client.listVoices()).resolves.toEqual([
      { id: 'p-1', name: 'Gogo Nomsa', kind: 'profile' },
      { id: 'alloy', name: 'Alloy', kind: 'preset' },
    ]);
    expect(fetchFn.mock.calls[0][0]).toBe(`${BASE}/v1/audio/voices`);
  });

  it('ignores malformed voice entries', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValue(jsonResponse({ voices: [{ nope: true }, null, { voice_id: 'x', name: 'X', type: 'profile' }] }));
    const client = new VoiceStudioClient({ baseUrl: BASE, fetchFn });
    await expect(client.listVoices()).resolves.toEqual([{ id: 'x', name: 'X', kind: 'profile' }]);
  });

  it('synthesizes speech with the OpenAI-compatible request body', async () => {
    const fetchFn = vi.fn().mockResolvedValue(new Response(new Uint8Array([1, 2, 3]), { status: 200 }));
    const client = new VoiceStudioClient({ baseUrl: BASE, fetchFn });

    const blob = await client.synthesize({
      input: 'Once upon a time.',
      voice: 'p-1',
      instructions: 'female, low pitch',
      speed: 0.92,
    });

    expect(blob.size).toBe(3);
    const [url, init] = fetchFn.mock.calls[0];
    expect(url).toBe(`${BASE}/v1/audio/speech`);
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({
      model: 'tts-1',
      input: 'Once upon a time.',
      voice: 'p-1',
      instructions: 'female, low pitch',
      speed: 0.92,
      response_format: 'mp3',
    });
  });

  it('sends the bearer key only when configured', async () => {
    const fetchFn = vi.fn().mockImplementation(async () => new Response(new Uint8Array([1])));
    const withKey = new VoiceStudioClient({ baseUrl: BASE, apiKey: 'secret', fetchFn });
    await withKey.synthesize({ input: 'Hi', voice: 'default', instructions: '', speed: 1 });
    expect(fetchFn.mock.calls[0][1].headers.Authorization).toBe('Bearer secret');

    const noKey = new VoiceStudioClient({ baseUrl: BASE, fetchFn });
    await noKey.synthesize({ input: 'Hi', voice: 'default', instructions: '', speed: 1 });
    expect(fetchFn.mock.calls[1][1].headers.Authorization).toBeUndefined();
  });

  it('surfaces the OpenAI-shaped error message', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValue(jsonResponse({ error: { message: 'Model not installed', code: 'model_missing' } }, { status: 400 }));
    const client = new VoiceStudioClient({ baseUrl: BASE, fetchFn });

    await expect(
      client.synthesize({ input: 'Hi', voice: 'default', instructions: '', speed: 1 }),
    ).rejects.toThrow('Model not installed');
  });

  it('raises a typed error for non-JSON failures', async () => {
    const fetchFn = vi.fn().mockResolvedValue(new Response('boom', { status: 503 }));
    const client = new VoiceStudioClient({ baseUrl: BASE, fetchFn });

    await expect(
      client.synthesize({ input: 'Hi', voice: 'default', instructions: '', speed: 1 }),
    ).rejects.toMatchObject({ name: 'VoiceStudioError', status: 503 });
  });

  it('forwards the abort signal', async () => {
    const fetchFn = vi.fn().mockImplementation(async () => new Response(new Uint8Array([1])));
    const controller = new AbortController();
    const client = new VoiceStudioClient({ baseUrl: BASE, fetchFn });
    await client.synthesize({ input: 'Hi', voice: 'default', instructions: '', speed: 1 }, controller.signal);
    expect(fetchFn.mock.calls[0][1].signal).toBe(controller.signal);
  });
});
