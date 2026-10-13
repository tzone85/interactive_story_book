import { chunkText } from '../domain/chunkText';
import type { Playback, SpeechProvider, SpeechRequest } from '../domain/types';

// Chrome silently cuts off long utterances, so speak in sentence-sized pieces.
const MAX_UTTERANCE_LENGTH = 220;
const BENIGN_ERRORS = new Set(['canceled', 'interrupted']);

export interface VoiceLike {
  lang: string;
  name: string;
}

export interface UtteranceLike {
  lang: string;
  pitch: number;
  rate: number;
  voice: VoiceLike | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
}

export interface SpeechSynthesisLike {
  speak(utterance: UtteranceLike): void;
  cancel(): void;
  pause(): void;
  resume(): void;
  getVoices(): VoiceLike[];
}

export interface BrowserSpeechConfig {
  synth: SpeechSynthesisLike | null;
  createUtterance: (text: string) => UtteranceLike;
}

const normalizeLang = (lang: string) => lang.replace('_', '-').toLowerCase();

function pickVoice(voices: VoiceLike[], lang: string): VoiceLike | null {
  const wanted = normalizeLang(lang);
  const primary = wanted.split('-')[0];
  return (
    voices.find((v) => normalizeLang(v.lang) === wanted) ??
    voices.find((v) => normalizeLang(v.lang).split('-')[0] === primary) ??
    null
  );
}

/** Fallback narration using the browser's built-in Web Speech API. */
export class BrowserSpeechProvider implements SpeechProvider {
  readonly id = 'browser' as const;

  constructor(private readonly config: BrowserSpeechConfig) {}

  isAvailable(): Promise<boolean> {
    return Promise.resolve(this.config.synth !== null);
  }

  async start(request: SpeechRequest): Promise<Playback> {
    const { synth, createUtterance } = this.config;
    if (!synth) throw new Error('Speech synthesis is not supported in this browser');

    const { browser } = request.narrator;
    const voice = pickVoice(synth.getVoices(), browser.lang);
    const pieces = chunkText(request.text, MAX_UTTERANCE_LENGTH);
    let stopped = false;
    let settle!: { resolve: () => void; reject: (error: Error) => void };
    const finished = new Promise<void>((resolve, reject) => {
      settle = { resolve, reject };
    });
    finished.catch(() => undefined);

    pieces.forEach((piece, index) => {
      const utterance = createUtterance(piece);
      utterance.lang = browser.lang;
      utterance.pitch = browser.pitch;
      utterance.rate = browser.rate;
      utterance.voice = voice;
      if (index === pieces.length - 1) utterance.onend = () => settle.resolve();
      utterance.onerror = (event) => {
        if (stopped || BENIGN_ERRORS.has(event.error)) settle.resolve();
        else settle.reject(new Error(event.error));
      };
      synth.speak(utterance);
    });
    if (pieces.length === 0) settle.resolve();

    return {
      finished,
      pause: () => synth.pause(),
      resume: () => synth.resume(),
      stop: () => {
        stopped = true;
        synth.cancel();
        settle.resolve();
      },
    };
  }
}

/** Wires the provider to the real `window.speechSynthesis` (null on unsupported browsers). */
export function createBrowserSpeechProvider(): BrowserSpeechProvider {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  return new BrowserSpeechProvider({
    synth: supported ? (window.speechSynthesis as unknown as SpeechSynthesisLike) : null,
    createUtterance: (text) => new SpeechSynthesisUtterance(text) as unknown as UtteranceLike,
  });
}
