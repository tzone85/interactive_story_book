export type NarratorId = 'librarian' | 'studio';

export type ProviderId = 'voicestudio' | 'browser';

export interface NarratorPalette {
  primary: string;
  soft: string;
  ink: string;
}

/** A narrator character: who the child meets and how each speech backend should voice them. */
export interface Narrator {
  id: NarratorId;
  name: string;
  title: string;
  tagline: string;
  palette: NarratorPalette;
  voiceStudio: {
    /** Voice-design tags / style instructions sent as `instructions` to VoiceStudio. */
    instructions: string;
    /** Voice id used when the reader has not picked a specific VoiceStudio voice. */
    defaultVoice: string;
    speed: number;
  };
  browser: {
    lang: string;
    pitch: number;
    rate: number;
  };
}

export interface SpeechRequest {
  text: string;
  narrator: Narrator;
  /** Reader-chosen VoiceStudio voice id; overrides the narrator default. */
  voiceId?: string;
}

/** A running utterance. `finished` rejects on failure and resolves on natural end or stop(). */
export interface Playback {
  readonly finished: Promise<void>;
  pause(): void;
  resume(): void;
  stop(): void;
}

/** Port implemented by every speech backend (VoiceStudio, browser Web Speech, ...). */
export interface SpeechProvider {
  readonly id: ProviderId;
  isAvailable(): Promise<boolean>;
  start(request: SpeechRequest): Promise<Playback>;
}

export type NarrationStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

export interface NarrationState {
  status: NarrationStatus;
  providerId: ProviderId | null;
  paragraphIndex: number;
  paragraphCount: number;
  error: string | null;
}

export interface VoiceOption {
  id: string;
  name: string;
  kind: 'profile' | 'preset';
}
