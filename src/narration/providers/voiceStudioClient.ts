import type { VoiceOption } from '../domain/types';

const DISCOVERY_PATH = '/.well-known/voicestudio-speech';
const PING_TIMEOUT_MS = 2000;
// "tts-1" is an OpenAI alias VoiceStudio maps onto whichever TTS engine is active.
const SPEECH_MODEL = 'tts-1';

export class VoiceStudioError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'VoiceStudioError';
  }
}

export interface VoiceStudioConfig {
  baseUrl: string;
  apiKey?: string;
  fetchFn?: typeof fetch;
}

export interface SynthesisInput {
  input: string;
  voice: string;
  instructions: string;
  speed: number;
}

export function normalizeBaseUrl(raw: string): string {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    throw new VoiceStudioError(`"${raw}" is not a valid URL`);
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new VoiceStudioError('VoiceStudio URL must start with http:// or https://');
  }
  return url.toString().replace(/\/+$/, '');
}

interface RawVoice {
  voice_id?: unknown;
  name?: unknown;
  type?: unknown;
}

function toVoiceOption(raw: unknown): VoiceOption | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const { voice_id, name, type } = raw as RawVoice;
  if (typeof voice_id !== 'string' || typeof name !== 'string') return null;
  return { id: voice_id, name, kind: type === 'profile' ? 'profile' : 'preset' };
}

async function errorMessage(response: Response): Promise<string> {
  const fallback = `VoiceStudio responded ${response.status}`;
  try {
    const body = (await response.json()) as { error?: { message?: string }; detail?: unknown };
    return body.error?.message ?? (typeof body.detail === 'string' ? body.detail : fallback);
  } catch {
    return fallback;
  }
}

/** Thin HTTP client for VoiceStudio's OpenAI-compatible speech API. */
export class VoiceStudioClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;
  private readonly fetchFn: typeof fetch;

  constructor(config: VoiceStudioConfig) {
    this.baseUrl = normalizeBaseUrl(config.baseUrl);
    this.apiKey = config.apiKey?.trim() || undefined;
    this.fetchFn = config.fetchFn ?? ((...args) => fetch(...args));
  }

  private authHeaders(): Record<string, string> {
    return this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {};
  }

  async ping(): Promise<boolean> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), PING_TIMEOUT_MS);
    try {
      const response = await this.fetchFn(`${this.baseUrl}${DISCOVERY_PATH}`, {
        headers: this.authHeaders(),
        signal: controller.signal,
      });
      return response.ok;
    } catch {
      return false;
    } finally {
      clearTimeout(timer);
    }
  }

  async listVoices(signal?: AbortSignal): Promise<VoiceOption[]> {
    const response = await this.fetchFn(`${this.baseUrl}/v1/audio/voices`, {
      headers: this.authHeaders(),
      signal,
    });
    if (!response.ok) throw new VoiceStudioError(await errorMessage(response), response.status);

    const body = (await response.json()) as { voices?: unknown };
    const voices = Array.isArray(body.voices) ? body.voices : [];
    const options = voices.map(toVoiceOption).filter((v): v is VoiceOption => v !== null);
    return [...options.filter((v) => v.kind === 'profile'), ...options.filter((v) => v.kind === 'preset')];
  }

  async synthesize(input: SynthesisInput, signal?: AbortSignal): Promise<Blob> {
    const response = await this.fetchFn(`${this.baseUrl}/v1/audio/speech`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...this.authHeaders() },
      body: JSON.stringify({
        model: SPEECH_MODEL,
        input: input.input,
        voice: input.voice,
        instructions: input.instructions,
        speed: input.speed,
        response_format: 'mp3',
      }),
      signal,
    });
    if (!response.ok) throw new VoiceStudioError(await errorMessage(response), response.status);
    return response.blob();
  }
}
