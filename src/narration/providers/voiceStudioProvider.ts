import { chunkText } from '../domain/chunkText';
import { LruCache } from '../domain/lruCache';
import type { Playback, SpeechProvider, SpeechRequest } from '../domain/types';
import type { SynthesisInput } from './voiceStudioClient';

// VoiceStudio rejects speech input above 4096 characters.
const DEFAULT_MAX_CHUNK = 4000;
const DEFAULT_CACHE_SIZE = 32;

export interface AudioLike {
  onended: (() => void) | null;
  onerror: (() => void) | null;
  play(): Promise<void>;
  pause(): void;
}

export interface SpeechSynthesizer {
  ping(): Promise<boolean>;
  synthesize(input: SynthesisInput, signal?: AbortSignal): Promise<Blob>;
}

export interface ObjectUrls {
  create(blob: Blob): string;
  revoke(url: string): void;
}

export interface VoiceStudioProviderConfig {
  client: SpeechSynthesizer;
  createAudio: (src: string) => AudioLike;
  objectUrls: ObjectUrls;
  cacheSize?: number;
  maxChunkLength?: number;
}

interface RunState {
  stopped: boolean;
  paused: boolean;
  current: AudioLike | null;
  releaseCurrent: (() => void) | null;
}

/** Speaks through a (usually local) VoiceStudio server using its OpenAI-compatible API. */
export class VoiceStudioProvider implements SpeechProvider {
  readonly id = 'voicestudio' as const;
  private readonly cache: LruCache<string>;
  private readonly maxChunkLength: number;

  constructor(private readonly config: VoiceStudioProviderConfig) {
    this.maxChunkLength = config.maxChunkLength ?? DEFAULT_MAX_CHUNK;
    this.cache = new LruCache<string>(config.cacheSize ?? DEFAULT_CACHE_SIZE, (url) =>
      config.objectUrls.revoke(url),
    );
  }

  isAvailable(): Promise<boolean> {
    return this.config.client.ping();
  }

  async start(request: SpeechRequest): Promise<Playback> {
    const chunks = chunkText(request.text, this.maxChunkLength);
    const abort = new AbortController();
    const state: RunState = { stopped: false, paused: false, current: null, releaseCurrent: null };

    // Fail fast: a synthesis error on the first chunk lets the engine try another provider.
    const firstUrl = chunks.length > 0 ? await this.audioUrl(chunks[0], request, abort.signal) : null;

    const run = async (): Promise<void> => {
      try {
        for (let i = 0; i < chunks.length; i++) {
          if (state.stopped) return;
          const url = i === 0 && firstUrl ? firstUrl : await this.audioUrl(chunks[i], request, abort.signal);
          if (state.stopped) return;
          await this.playUrl(url, state);
        }
      } catch (error) {
        if (!state.stopped) throw error;
      }
    };

    const finished = run();
    // Consumers still observe the rejection; this only prevents unhandled-rejection noise.
    finished.catch(() => undefined);

    return {
      finished,
      pause: () => {
        state.paused = true;
        state.current?.pause();
      },
      resume: () => {
        state.paused = false;
        void state.current?.play().catch(() => undefined);
      },
      stop: () => {
        state.stopped = true;
        abort.abort();
        state.current?.pause();
        state.releaseCurrent?.();
      },
    };
  }

  private async audioUrl(text: string, request: SpeechRequest, signal: AbortSignal): Promise<string> {
    const { narrator } = request;
    const input: SynthesisInput = {
      input: text,
      voice: request.voiceId ?? narrator.voiceStudio.defaultVoice,
      instructions: narrator.voiceStudio.instructions,
      speed: narrator.voiceStudio.speed,
    };
    const key = [input.voice, input.instructions, input.speed, input.input].join('|');

    const cached = this.cache.get(key);
    if (cached) return cached;

    const blob = await this.config.client.synthesize(input, signal);
    const url = this.config.objectUrls.create(blob);
    this.cache.set(key, url);
    return url;
  }

  private playUrl(url: string, state: RunState): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const audio = this.config.createAudio(url);
      state.current = audio;
      state.releaseCurrent = resolve;
      audio.onended = () => resolve();
      audio.onerror = () => reject(new Error('Audio playback failed'));
      if (!state.paused) audio.play().catch(reject);
    });
  }
}
