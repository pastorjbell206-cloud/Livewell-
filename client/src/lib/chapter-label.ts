/**
 * The label beside a book's table-of-contents entry. Front and back matter
 * (Introduction, Conclusion, Afterword…) stand alone; everything else is a
 * numbered chapter, whether the number is a digit or a word. (The old test,
 * "capitalized and longer than four letters", printed "Chapter Two" but a
 * bare "Three", "Seven" and "Eleven".)
 */
const STANDALONE = /^(introduction|conclusion|afterword|prologue|epilogue|preface|foreword|interlude|appendix|coda|postscript)\b/i;

export function chapterLabel(num: string): string {
  return STANDALONE.test(num.trim()) ? num : `Chapter ${num}`;
}
