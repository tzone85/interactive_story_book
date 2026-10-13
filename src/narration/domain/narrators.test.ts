import { DEFAULT_NARRATOR_ID, NARRATORS, getNarrator, isNarratorId } from './narrators';

describe('narrators', () => {
  it('offers the Librarian and the Studio host', () => {
    expect(NARRATORS.map((n) => n.id)).toEqual(['librarian', 'studio']);
  });

  it('gives every narrator the fields the UI and providers rely on', () => {
    for (const narrator of NARRATORS) {
      expect(narrator.name).not.toBe('');
      expect(narrator.tagline).not.toBe('');
      expect(narrator.voiceStudio.instructions).not.toBe('');
      expect(narrator.voiceStudio.speed).toBeGreaterThan(0);
      expect(narrator.browser.lang).toMatch(/^[a-z]{2}-[A-Z]{2}$/);
      expect(narrator.palette.primary).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it('distinguishes the two voices so they never sound identical', () => {
    const [a, b] = NARRATORS;
    expect(a.voiceStudio.instructions).not.toBe(b.voiceStudio.instructions);
    expect(a.browser.pitch).not.toBe(b.browser.pitch);
  });

  it('looks narrators up by id and falls back to the default', () => {
    expect(getNarrator('studio').id).toBe('studio');
    expect(getNarrator('nope').id).toBe(DEFAULT_NARRATOR_ID);
  });

  it('guards narrator ids', () => {
    expect(isNarratorId('librarian')).toBe(true);
    expect(isNarratorId('robot')).toBe(false);
  });
});
