const PARAGRAPH_BREAK = /\r?\n\s*\r?\n/;

/** Splits scene text into trimmed, non-empty paragraphs (blank-line separated). */
export function splitParagraphs(text: string): string[] {
  return text
    .split(PARAGRAPH_BREAK)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
}
