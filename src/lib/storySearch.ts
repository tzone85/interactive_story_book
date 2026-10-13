import type { Story } from '../types';

const haystack = (story: Story): string =>
  [story.title, story.description, ...story.tags].join(' ').toLowerCase();

/** Every whitespace-separated word of the query must appear in the title, description or tags. */
export const searchStories = (stories: readonly Story[], query: string): Story[] => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [...stories];
  return stories.filter((story) => {
    const text = haystack(story);
    return words.every((word) => text.includes(word));
  });
};

/** Unique tags, most common first, ties broken alphabetically. */
export const collectTags = (stories: readonly Story[], limit = Infinity): string[] => {
  const counts = new Map<string, number>();
  for (const story of stories) {
    for (const tag of story.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag]) => tag);
};
