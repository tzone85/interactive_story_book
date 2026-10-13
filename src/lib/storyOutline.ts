import type { Scene, Story } from '../types';

const WORDS_PER_MINUTE = 180;
const EXCERPT_MAX = 140;

export interface OutlineStep {
  sceneId: string;
  excerpt: string;
  choiceCount: number;
  isEnding: boolean;
}

export interface StoryOutline {
  sceneCount: number;
  endingCount: number;
  decisionCount: number;
  steps: OutlineStep[];
}

const firstSentence = (content: string): string => {
  const flat = content.replace(/\s+/g, ' ').trim();
  const match = flat.match(/^.*?[.!?](?=\s|$)/);
  const sentence = match ? match[0] : flat;
  return sentence.length > EXCERPT_MAX ? `${sentence.slice(0, EXCERPT_MAX).trimEnd()}…` : sentence;
};

/** Scenes visited when the reader always takes the first choice; cycle- and dangling-link-safe. */
const walkFirstChoices = (story: Story): Scene[] => {
  const path: Scene[] = [];
  const seen = new Set<string>();
  let scene: Scene | undefined = story.scenes[story.firstSceneId];
  while (scene && !seen.has(scene.id)) {
    seen.add(scene.id);
    path.push(scene);
    const next: string | undefined = scene.choices?.[0]?.nextSceneId;
    scene = next ? story.scenes[next] : undefined;
  }
  return path;
};

export const outlineStory = (story: Story): StoryOutline => {
  const scenes = Object.values(story.scenes);
  return {
    sceneCount: scenes.length,
    endingCount: scenes.filter((s) => s.isEnding || !s.choices?.length).length,
    decisionCount: scenes.filter((s) => (s.choices?.length ?? 0) > 0).length,
    steps: walkFirstChoices(story).map((scene) => ({
      sceneId: scene.id,
      excerpt: firstSentence(scene.content),
      choiceCount: scene.choices?.length ?? 0,
      isEnding: Boolean(scene.isEnding) || !scene.choices?.length,
    })),
  };
};

/** Minutes to read one full pass (first-choice path) at a relaxed pace, never below one. */
export const readingMinutes = (story: Story): number => {
  const words = walkFirstChoices(story)
    .map((scene) => scene.content.split(/\s+/).filter(Boolean).length)
    .reduce((total, count) => total + count, 0);
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};
