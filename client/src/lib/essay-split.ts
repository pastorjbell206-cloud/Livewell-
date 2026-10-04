/**
 * Split a Markdown essay body two-thirds of the way down, at a paragraph
 * boundary, so a "keep reading" block can sit inside the essay where a reader
 * who is still with the argument sees it, not at the foot where only finishers
 * do. Never splits inside a code fence, a list, a quote or a heading run, and
 * never splits a short essay at all.
 */
export function splitForRelated(body: string, minWords = 900): [string, string] {
  const text = String(body ?? "");
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words < minWords) return [text, ""];
  const blocks = text.replace(/\r\n/g, "\n").split(/\n{2,}/);
  const target = Math.floor(words * 0.66);
  let count = 0;
  let cut = -1;
  let inFence = false;
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (/^```/.test(b.trim())) inFence = !inFence || !/```\s*$/.test(b.trim()) ? !inFence : inFence;
    count += b.split(/\s+/).filter(Boolean).length;
    const next = blocks[i + 1] ?? "";
    const plainNext = !/^\s{0,3}(#{1,6}\s|[-*+]\s|\d+\.\s|>)/.test(next) && !/^```/.test(next.trim());
    const plainHere = !/^\s{0,3}(#{1,6}\s|[-*+]\s|\d+\.\s|>)/.test(b) && !inFence;
    if (count >= target && plainHere && plainNext && i < blocks.length - 3) { cut = i + 1; break; }
  }
  if (cut < 0) return [text, ""];
  return [blocks.slice(0, cut).join("\n\n"), blocks.slice(cut).join("\n\n")];
}
