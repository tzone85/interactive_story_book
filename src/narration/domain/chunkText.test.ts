import { chunkText } from './chunkText';

describe('chunkText', () => {
  it('returns short text untouched', () => {
    expect(chunkText('Hello there.', 50)).toEqual(['Hello there.']);
  });

  it('splits on sentence boundaries without exceeding the limit', () => {
    const chunks = chunkText('One two. Three four. Five six.', 19);
    expect(chunks).toEqual(['One two.', 'Three four.', 'Five six.']);
    chunks.forEach((chunk) => expect(chunk.length).toBeLessThanOrEqual(19));
  });

  it('packs as many sentences as fit into a chunk', () => {
    expect(chunkText('A b. C d. E f.', 10)).toEqual(['A b. C d.', 'E f.']);
  });

  it('hard-splits a single sentence longer than the limit on word boundaries', () => {
    const chunks = chunkText('alpha beta gamma delta', 11);
    expect(chunks).toEqual(['alpha beta', 'gamma delta']);
  });

  it('never loses text', () => {
    const text = 'Word '.repeat(100).trim();
    expect(chunkText(text, 37).join(' ')).toBe(text);
  });

  it('returns nothing for blank text', () => {
    expect(chunkText('  ', 10)).toEqual([]);
  });
});
