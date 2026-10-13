import type {
  NarrationState,
  Narrator,
  Playback,
  ProviderId,
  SpeechProvider,
  SpeechRequest,
} from '../domain/types';

export const IDLE_STATE: NarrationState = Object.freeze({
  status: 'idle',
  providerId: null,
  paragraphIndex: 0,
  paragraphCount: 0,
  error: null,
});

const NO_VOICE_MESSAGE = 'No voice is available. Start VoiceStudio, or use a browser that supports speech.';

export interface NarrateOptions {
  voiceId?: string;
}

interface Session {
  cancelled: boolean;
  paused: boolean;
  playback: Playback | null;
  active: SpeechProvider | null;
  /** Providers that were unavailable or failed during this session; never retried within it. */
  skipped: Set<ProviderId>;
  lastError: Error | null;
}

interface Started {
  provider: SpeechProvider;
  playback: Playback;
}

/**
 * Plays story paragraphs through an ordered list of speech providers,
 * falling back to the next provider whenever one is unavailable or fails.
 */
export class NarrationEngine {
  private state: NarrationState = IDLE_STATE;
  private session: Session | null = null;
  private readonly listeners = new Set<() => void>();

  constructor(private readonly providers: readonly SpeechProvider[]) {}

  getState = (): NarrationState => this.state;

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  /** Resolves when narration ends, is stopped, or fails; never rejects. */
  async narrate(paragraphs: readonly string[], narrator: Narrator, options: NarrateOptions = {}): Promise<void> {
    this.stop();
    if (paragraphs.length === 0) return;

    const session: Session = {
      cancelled: false,
      paused: false,
      playback: null,
      active: null,
      skipped: new Set(),
      lastError: null,
    };
    this.session = session;
    this.setState({ ...IDLE_STATE, status: 'loading', paragraphCount: paragraphs.length });

    for (let index = 0; index < paragraphs.length; index++) {
      const request: SpeechRequest = { text: paragraphs[index], narrator, voiceId: options.voiceId };
      const completed = await this.playParagraph(session, request, index, paragraphs.length);
      if (!completed) return;
    }
    if (this.session === session) this.finish(session);
  }

  pause(): void {
    const session = this.session;
    if (!session?.playback || this.state.status !== 'playing') return;
    session.paused = true;
    session.playback.pause();
    this.setState({ ...this.state, status: 'paused' });
  }

  resume(): void {
    const session = this.session;
    if (!session?.playback || this.state.status !== 'paused') return;
    session.paused = false;
    session.playback.resume();
    this.setState({ ...this.state, status: 'playing' });
  }

  stop(): void {
    const session = this.session;
    if (!session) return;
    session.cancelled = true;
    session.playback?.stop();
    this.session = null;
    this.setState(IDLE_STATE);
  }

  /** Returns true when the paragraph played to the end, false when narration should stop. */
  private async playParagraph(
    session: Session,
    request: SpeechRequest,
    index: number,
    count: number,
  ): Promise<boolean> {
    for (;;) {
      const started = await this.open(session, request);
      if (session.cancelled) {
        started?.playback.stop();
        return false;
      }
      if (!started) {
        this.fail(session, session.lastError?.message ?? NO_VOICE_MESSAGE);
        return false;
      }

      session.playback = started.playback;
      this.setState({
        status: session.paused ? 'paused' : 'playing',
        providerId: started.provider.id,
        paragraphIndex: index,
        paragraphCount: count,
        error: null,
      });

      try {
        await started.playback.finished;
        return !session.cancelled;
      } catch (error) {
        if (session.cancelled) return false;
        session.skipped.add(started.provider.id);
        session.lastError = error instanceof Error ? error : new Error(String(error));
      }
    }
  }

  private async open(session: Session, request: SpeechRequest): Promise<Started | null> {
    const { active } = session;
    const ordered = active ? [active, ...this.providers.filter((p) => p !== active)] : this.providers;

    for (const provider of ordered) {
      if (session.skipped.has(provider.id)) continue;
      if (provider !== active && !(await provider.isAvailable())) {
        session.skipped.add(provider.id);
        continue;
      }
      if (session.cancelled) return null;
      try {
        const playback = await provider.start(request);
        session.active = provider;
        return { provider, playback };
      } catch (error) {
        session.skipped.add(provider.id);
        session.lastError = error instanceof Error ? error : new Error(String(error));
      }
    }
    return null;
  }

  private finish(session: Session): void {
    if (this.session !== session) return;
    this.session = null;
    this.setState(IDLE_STATE);
  }

  private fail(session: Session, message: string): void {
    if (this.session !== session) return;
    this.session = null;
    this.setState({ ...IDLE_STATE, status: 'error', error: message });
  }

  private setState(next: NarrationState): void {
    this.state = next;
    this.listeners.forEach((listener) => listener());
  }
}
