/**
 * TableOfContents — a quiet, editorial "In this essay" rail.
 *
 * The slugify here is the single source of truth for heading anchor ids: the
 * custom rehype visitor in ArticleDetail imports THIS function so the ids it
 * injects into the rendered <h2>/<h3> line up exactly with these links.
 *
 * Renders as a sticky nav in the desktop grid's first column; ArticleDetail
 * hides it below 1024px so the prose stays full-width and centered.
 */

export interface TocItem {
  id: string;
  text: string;
}

/** lowercase, non-alphanumerics → hyphens, collapse repeats, trim hyphens. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Parse level-2 ATX headings (`## …`) out of the heading-stripped body.
 * Returns [] when there are fewer than three — the caller hides the ToC then.
 */
export function buildToc(body: string): TocItem[] {
  const items: TocItem[] = [];
  const seen = new Set<string>();
  const re = /^##\s+(.+?)\s*$/gm;
  let match: RegExpExecArray | null;
  while ((match = re.exec(body)) !== null) {
    // Strip inline markdown emphasis/backticks for a clean label.
    const text = match[1]
      .replace(/[*_`]/g, "")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .trim();
    if (!text) continue;
    let id = slugify(text);
    if (!id) continue;
    // Guard against duplicate ids the same way a heading visitor would not,
    // but keep first-wins so the most likely target is reachable.
    if (seen.has(id)) continue;
    seen.add(id);
    items.push({ id, text });
  }
  return items;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length < 3) return null;
  return (
    <nav className="toc" aria-label="On this page">
      <p className="toc__label">In this essay</p>
      <ul className="toc__list">
        {items.map(item => (
          <li key={item.id} className="toc__item">
            <a href={`#${item.id}`} className="toc__link">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContents;
