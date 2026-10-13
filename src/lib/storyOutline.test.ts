import { describe, it, expect } from 'vitest';
import { outlineStory, readingMinutes } from './storyOutline';
import type { Story } from '../types';

const make = (scenes: Story['scenes'], firstSceneId = 'a'): Story => ({
  id: 's',
  title: 'T',
  description: 'D',
  ageRange: { min: 1, max: 99 },
  coverImage: '',
  firstSceneId,
  scenes,
  tags: [],
});

describe('outlineStory', () => {
  const story = make({
    a: {
      id: 'a',
      content: 'Opening line. More text here.',
      choices: [
        { id: 'c1', text: 'Left', nextSceneId: 'b' },
        { id: 'c2', text: 'Right', nextSceneId: 'c' },
      ],
    },
    b: { id: 'b', content: 'Left path ends.', isEnding: true },
    c: { id: 'c', content: 'Right path ends.', isEnding: true },
  });

  it('counts scenes, endings and decision points', () => {
    const o = outlineStory(story);
    expect(o.sceneCount).toBe(3);
    expect(o.endingCount).toBe(2);
    expect(o.decisionCount).toBe(1);
  });

  it('follows the first choice and uses the first sentence as the excerpt', () => {
    const { steps } = outlineStory(story);
    expect(steps.map((s) => s.sceneId)).toEqual(['a', 'b']);
    expect(steps[0].excerpt).toBe('Opening line.');
    expect(steps[0].choiceCount).toBe(2);
    expect(steps[1].isEnding).toBe(true);
  });

  it('stops on cycles instead of looping forever', () => {
    const loop = make({
      a: { id: 'a', content: 'A.', choices: [{ id: 'x', text: 'on', nextSceneId: 'b' }] },
      b: { id: 'b', content: 'B.', choices: [{ id: 'y', text: 'back', nextSceneId: 'a' }] },
    });
    expect(outlineStory(loop).steps.map((s) => s.sceneId)).toEqual(['a', 'b']);
  });

  it('stops on a dangling choice target', () => {
    const dangling = make({
      a: { id: 'a', content: 'A.', choices: [{ id: 'x', text: 'on', nextSceneId: 'nope' }] },
    });
    expect(outlineStory(dangling).steps).toHaveLength(1);
  });

  it('truncates long first sentences', () => {
    const long = make({ a: { id: 'a', content: 'word '.repeat(80).trim() + '.' } });
    expect(outlineStory(long).steps[0].excerpt.length).toBeLessThanOrEqual(141);
  });
});

describe('readingMinutes', () => {
  it('is at least one minute', () => {
    expect(readingMinutes(make({ a: { id: 'a', content: 'Hi.' } }))).toBe(1);
  });

  it('estimates from the longest path word count at ~180 wpm', () => {
    const words = 'w '.repeat(360).trim();
    const s = make({ a: { id: 'a', content: words } });
    expect(readingMinutes(s)).toBe(2);
  });
});
