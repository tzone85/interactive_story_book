import { describe, it, expect } from "vitest";
import { searchStories, collectTags } from "./storySearch";
import { stories } from "../data/stories";

describe("searchStories", () => {
  it("returns every story for an empty query", () => {
    expect(searchStories(stories, "")).toHaveLength(stories.length);
    expect(searchStories(stories, "   ")).toHaveLength(stories.length);
  });

  it("matches on title, case-insensitively", () => {
    const hits = searchStories(stories, "quantum");
    expect(hits.map((s) => s.title)).toEqual(["The Quantum Decision"]);
  });

  it("matches on tags", () => {
    const hits = searchStories(stories, "dragons");
    expect(hits.map((s) => s.id)).toEqual(["story-8-1"]);
  });

  it("matches on description", () => {
    const hits = searchStories(stories, "parallel universes");
    expect(hits.length).toBeGreaterThan(0);
  });

  it("requires every word to match somewhere", () => {
    expect(searchStories(stories, "quantum dragons")).toEqual([]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(searchStories(stories, "zzzz")).toEqual([]);
  });

  it("does not mutate its input", () => {
    const copy = [...stories];
    searchStories(stories, "mystery");
    expect(stories).toEqual(copy);
  });
});

describe("collectTags", () => {
  it("returns unique tags sorted by frequency then alphabetically", () => {
    const tags = collectTags(stories);
    expect(new Set(tags).size).toBe(tags.length);
    expect(tags.slice(0, 2)).toEqual(["friendship", "mystery"]);
  });

  it("honours the limit", () => {
    expect(collectTags(stories, 3)).toHaveLength(3);
  });
});
