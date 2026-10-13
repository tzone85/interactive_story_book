import { useCallback, useEffect, useMemo, useRef, useSyncExternalStore } from 'react';
import { getNarrator } from '../domain/narrators';
import type { NarrationState, Narrator } from '../domain/types';
import { createNarrationEngine } from '../engine/createNarrationEngine';
import type { NarrationEngine } from '../engine/narrationEngine';
import { useNarrationSettings } from '../store/narrationSettings';

/** One engine per VoiceStudio connection; silenced when the connection changes or the page unmounts. */
function useNarrationEngine(): NarrationEngine {
  const serverUrl = useNarrationSettings((s) => s.serverUrl);
  const apiKey = useNarrationSettings((s) => s.apiKey);
  const engine = useMemo(() => createNarrationEngine({ serverUrl, apiKey }), [serverUrl, apiKey]);

  useEffect(() => () => engine.stop(), [engine]);
  return engine;
}

export interface UseNarration {
  state: NarrationState;
  narrator: Narrator;
  play: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

/**
 * Narrates one story page. Switching pages, narrators or voices silences the
 * previous page; with auto-narrate on, the new page starts by itself.
 */
export function useNarration(paragraphs: readonly string[]): UseNarration {
  const engine = useNarrationEngine();
  const narratorId = useNarrationSettings((s) => s.narratorId);
  const voiceId = useNarrationSettings((s) => s.voiceByNarrator[narratorId]);
  const autoNarrate = useNarrationSettings((s) => s.autoNarrate);
  const narrator = getNarrator(narratorId);

  const state = useSyncExternalStore(engine.subscribe, engine.getState);

  const paragraphsRef = useRef(paragraphs);
  paragraphsRef.current = paragraphs;
  const pageKey = paragraphs.join('\n\n');

  const play = useCallback(() => {
    void engine.narrate(paragraphsRef.current, narrator, { voiceId });
  }, [engine, narrator, voiceId]);

  useEffect(() => {
    if (autoNarrate) play();
    return () => engine.stop();
  }, [engine, play, pageKey, autoNarrate]);

  return {
    state,
    narrator,
    play,
    pause: useCallback(() => engine.pause(), [engine]),
    resume: useCallback(() => engine.resume(), [engine]),
    stop: useCallback(() => engine.stop(), [engine]),
  };
}
