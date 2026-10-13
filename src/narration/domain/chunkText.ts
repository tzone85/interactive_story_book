const SENTENCE = /[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g;

function hardSplit(sentence: string, maxLength: number): string[] {
  const chunks: string[] = [];
  let current = '';
  for (const word of sentence.split(/\s+/)) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxLength) {
      current = candidate;
      continue;
    }
    if (current) chunks.push(current);
    // A single word longer than the limit is sliced as a last resort.
    let rest = word;
    while (rest.length > maxLength) {
      chunks.push(rest.slice(0, maxLength));
      rest = rest.slice(maxLength);
    }
    current = rest;
  }
  if (current) chunks.push(current);
  return chunks;
}

/** Splits text into chunks of at most `maxLength` characters, preferring sentence boundaries. */
export function chunkText(text: string, maxLength: number): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (trimmed.length <= maxLength) return [trimmed];

  const sentences = (trimmed.match(SENTENCE) ?? [trimmed]).map((s) => s.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    if (sentence.length > maxLength) {
      if (current) chunks.push(current);
      current = '';
      chunks.push(...hardSplit(sentence, maxLength));
      continue;
    }
    const candidate = current ? `${current} ${sentence}` : sentence;
    if (candidate.length <= maxLength) {
      current = candidate;
    } else {
      chunks.push(current);
      current = sentence;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}
