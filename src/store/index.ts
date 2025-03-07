import { create } from 'zustand';
import { Reader, StoryProgress } from '../types';

interface AppState {
  currentReader: Reader | null;
  storyProgress: StoryProgress | null;
  setCurrentReader: (reader: Reader) => void;
  setStoryProgress: (progress: StoryProgress) => void;
  clearStoryProgress: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentReader: null,
  storyProgress: null,
  setCurrentReader: (reader) => set({ currentReader: reader }),
  setStoryProgress: (progress) => set({ storyProgress: progress }),
  clearStoryProgress: () => set({ storyProgress: null }),
}));