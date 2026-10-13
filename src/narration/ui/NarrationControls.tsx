import { Loader2, Pause, Play, Square, Volume2 } from 'lucide-react';
import type { ProviderId } from '../domain/types';
import { NarratorAvatar } from './NarratorAvatar';
import type { UseNarration } from './useNarration';

const PROVIDER_LABELS: Record<ProviderId, string> = {
  voicestudio: 'VoiceStudio voice',
  browser: 'Browser voice',
};

interface NarrationControlsProps {
  narration: UseNarration;
}

/** Storyteller card with listen / pause / stop controls for the current page. */
export function NarrationControls({ narration }: NarrationControlsProps) {
  const { state, narrator, play, pause, resume, stop } = narration;
  const { status } = state;
  const busy = status === 'loading' || status === 'playing' || status === 'paused';
  const buttonStyle = { background: narrator.palette.primary };
  const buttonClass =
    'inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  return (
    <section
      aria-label="Story narration"
      className="mb-6 flex flex-wrap items-center gap-4 rounded-xl p-4"
      style={{ background: narrator.palette.soft, color: narrator.palette.ink }}
    >
      <NarratorAvatar narratorId={narrator.id} speaking={status === 'playing'} />

      <div className="min-w-0 flex-1">
        <p className="font-bold">{narrator.name}</p>
        <p className="text-sm opacity-80">
          {status === 'playing' || status === 'paused'
            ? `Reading part ${state.paragraphIndex + 1} of ${state.paragraphCount}`
            : narrator.title}
        </p>
        {state.providerId && busy && (
          <p className="mt-1 inline-flex items-center gap-1 text-xs opacity-80">
            <Volume2 className="h-3 w-3" aria-hidden="true" />
            {PROVIDER_LABELS[state.providerId]}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        {status === 'loading' && (
          <button type="button" disabled className={buttonClass} style={buttonStyle}>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Getting ready
          </button>
        )}
        {(status === 'idle' || status === 'error') && (
          <button type="button" onClick={play} className={buttonClass} style={buttonStyle}>
            <Play className="h-4 w-4" aria-hidden="true" />
            Listen
          </button>
        )}
        {status === 'playing' && (
          <button type="button" onClick={pause} className={buttonClass} style={buttonStyle}>
            <Pause className="h-4 w-4" aria-hidden="true" />
            Pause
          </button>
        )}
        {status === 'paused' && (
          <button type="button" onClick={resume} className={buttonClass} style={buttonStyle}>
            <Play className="h-4 w-4" aria-hidden="true" />
            Resume
          </button>
        )}
        {busy && (
          <button
            type="button"
            onClick={stop}
            className="inline-flex items-center gap-2 rounded-lg border-2 bg-white px-4 py-2 font-semibold"
            style={{ borderColor: narrator.palette.primary, color: narrator.palette.primary }}
          >
            <Square className="h-4 w-4" aria-hidden="true" />
            Stop
          </button>
        )}
      </div>

      {status === 'error' && state.error && (
        <p role="alert" className="w-full rounded-lg bg-white p-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
    </section>
  );
}
