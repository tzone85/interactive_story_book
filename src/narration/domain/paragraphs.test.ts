import { splitParagraphs } from './paragraphs';

describe('splitParagraphs', () => {
  it('splits on blank lines and trims each paragraph', () => {
    expect(splitParagraphs('One.\n\n  Two.  \n\nThree.')).toEqual(['One.', 'Two.', 'Three.']);
  });

  it('treats CRLF blank lines as separators', () => {
    expect(splitParagraphs('One.\r\n\r\nTwo.')).toEqual(['One.', 'Two.']);
  });

  it('drops empty paragraphs', () => {
    expect(splitParagraphs('\n\nOne.\n\n\n\n')).toEqual(['One.']);
  });

  it('returns an empty list for blank input', () => {
    expect(splitParagraphs('   ')).toEqual([]);
  });

  it('keeps a single-paragraph scene whole', () => {
    expect(splitParagraphs('Just one paragraph.')).toEqual(['Just one paragraph.']);
  });
});
