import type { Narrator, NarratorId } from './types';

// Voice-design tags follow VoiceStudio's Gender / Age / Pitch / Style / Accent
// taxonomy; engines that do not understand a tag ignore it.
export const NARRATORS: readonly Narrator[] = [
  {
    id: 'librarian',
    name: 'Mama Thuli',
    title: 'The Librarian',
    tagline: 'Slow, warm and calm. Perfect for bedtime and big feelings.',
    palette: { primary: '#b45309', soft: '#fef3c7', ink: '#451a03' },
    voiceStudio: {
      instructions: 'female, middle-aged, low pitch',
      defaultVoice: 'default',
      speed: 0.92,
    },
    browser: { lang: 'en-ZA', pitch: 0.9, rate: 0.9 },
  },
  {
    id: 'studio',
    name: 'Studio Sam',
    title: 'The Studio Host',
    tagline: 'Bright and bouncy, like your favourite radio show.',
    palette: { primary: '#0e7490', soft: '#cffafe', ink: '#083344' },
    voiceStudio: {
      instructions: 'male, young adult, high pitch',
      defaultVoice: 'default',
      speed: 1.05,
    },
    browser: { lang: 'en-ZA', pitch: 1.2, rate: 1.05 },
  },
];

export const DEFAULT_NARRATOR_ID: NarratorId = 'librarian';

export function isNarratorId(value: string): value is NarratorId {
  return NARRATORS.some((narrator) => narrator.id === value);
}

export function getNarrator(id: string): Narrator {
  const found = NARRATORS.find((narrator) => narrator.id === id);
  return found ?? NARRATORS.find((n) => n.id === DEFAULT_NARRATOR_ID)!;
}
