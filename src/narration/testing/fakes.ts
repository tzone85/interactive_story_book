import type { Narrator, Playback, ProviderId, SpeechProvider, SpeechRequest } from '../domain/types';
import { NARRATORS } from '../domain/narrators';
import type { AudioLike } from '../providers/voiceStudioProvider';

export const librarian: Narrator = NARRATORS[0];
export const studio: Narrator = NARRATORS[1];

/** Controllable stand-in for an HTMLAudioElement. */
export class FakeAudio implements AudioLike {
  static instances: FakeAudio[] = [];
  onended: (() => void) | null = null;
  onerror: (() => void) | null = null;
  playing = false;
  playError: Error | null = null;

  constructor(readonly src: string) {
    FakeAudio.instances.push(this);
  }

  play(): Promise<void> {
    if (this.playError) return Promise.reject(this.playError);
    this.playing = true;
    return Promise.resolve();
  }

  pause(): void {
    this.playing = false;
  }

  end(): void {
    this.playing = false;
    this.onended?.();
  }

  fail(): void {
    this.onerror?.();
  }
}

export interface FakePlayback extends Playback {
  readonly request: SpeechRequest;
  readonly calls: string[];
  complete(): void;
  fail(error: Error): void;
}

export function createFakePlayback(request: SpeechRequest): FakePlayback {
  let resolve!: () => void;
  let reject!: (error: Error) => void;
  const finished = new Promise<void>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  // Callers may never await `finished` in every test; avoid unhandled rejection noise.
  finished.catch(() => undefined);
  const calls: string[] = [];
  return {
    request,
    calls,
    finished,
    pause: () => calls.push('pause'),
    resume: () => calls.push('resume'),
    stop: () => {
      calls.push('stop');
      resolve();
    },
    complete: () => resolve(),
    fail: (error) => reject(error),
  };
}

export class FakeProvider implements SpeechProvider {
  readonly playbacks: FakePlayback[] = [];
  available = true;
  startError: Error | null = null;

  constructor(readonly id: ProviderId) {}

  isAvailable(): Promise<boolean> {
    return Promise.resolve(this.available);
  }

  async start(request: SpeechRequest): Promise<Playback> {
    if (this.startError) throw this.startError;
    const playback = createFakePlayback(request);
    this.playbacks.push(playback);
    return playback;
  }
}

/** Lets pending microtasks (promise chains) settle inside async tests. */
export const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));
