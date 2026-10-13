import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_NARRATOR_ID, isNarratorId } from "../domain/narrators";
import type { NarratorId } from "../domain/types";
import {
  VoiceStudioError,
  normalizeBaseUrl,
} from "../providers/voiceStudioClient";

export const DEFAULT_SERVER_URL: string =
  (import.meta.env.VITE_VOICESTUDIO_URL as string | undefined) ??
  "http://127.0.0.1:3900";

export type SettingResult = { ok: true } | { ok: false; error: string };

interface NarrationSettingsState {
  narratorId: NarratorId;
  /** VoiceStudio voice id chosen per narrator; absent means "use the narrator default". */
  voiceByNarrator: Partial<Record<NarratorId, string>>;
  serverUrl: string;
  /** Optional bearer key for a remote VoiceStudio backend. Kept in this browser's localStorage only. */
  apiKey: string;
  autoNarrate: boolean;
  setNarrator: (id: string) => void;
  setVoice: (narratorId: NarratorId, voiceId: string | null) => void;
  setServerUrl: (url: string) => SettingResult;
  setApiKey: (key: string) => void;
  setAutoNarrate: (enabled: boolean) => void;
}

export const useNarrationSettings = create<NarrationSettingsState>()(
  persist(
    (set) => ({
      narratorId: DEFAULT_NARRATOR_ID,
      voiceByNarrator: {},
      serverUrl: DEFAULT_SERVER_URL,
      apiKey: "",
      autoNarrate: false,

      setNarrator: (id) => {
        if (isNarratorId(id)) set({ narratorId: id });
      },

      setVoice: (narratorId, voiceId) =>
        set((state) => {
          const others = Object.fromEntries(
            Object.entries(state.voiceByNarrator).filter(
              ([id]) => id !== narratorId,
            ),
          );
          return {
            voiceByNarrator: voiceId
              ? { ...others, [narratorId]: voiceId }
              : others,
          };
        }),

      setServerUrl: (url) => {
        try {
          set({ serverUrl: normalizeBaseUrl(url) });
          return { ok: true };
        } catch (error) {
          const message =
            error instanceof VoiceStudioError ? error.message : "Invalid URL";
          return { ok: false, error: message };
        }
      },

      setApiKey: (key) => set({ apiKey: key.trim() }),
      setAutoNarrate: (enabled) => set({ autoNarrate: enabled }),
    }),
    { name: "narration-settings" },
  ),
);
