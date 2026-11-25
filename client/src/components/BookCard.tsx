/**
 * One book on the shelf: its cover, large, then its title, its plain
 * subtitle, one line on what it is, its length and formats, and the download.
 * While giving is open it also says the suggested gift; the download then
 * raises the gift sheet (components/DownloadGiftHost.tsx), which always
 * carries "Download without giving".
 */
import { Link } from "wouter";
import { FreeEbookButtons, formerlyLine } from "@/components/FreeEbookButtons";
import { useGivingOpen } from "@/lib/downloadGift";
import { formatLine, type ShelfItem } from "@/lib/shelfItems";
import { formatUsd, suggestedCents } from "@shared/downloads";
import "./bookshelf.css";

export function SuggestedGift({ id, className = "bk-gift" }: { id: string; className?: string }) {
  const open = useGivingOpen();
  if (!open) return null;
  return <p className={className}>Suggested gift: {formatUsd(suggestedCents(id))}</p>;
}

export default function BookCard({
  item,
  eager = false,
  headingLevel = 3,
  line,
  kicker,
  moreLabel,
}: {
  item: ShelfItem;
  eager?: boolean;
  headingLevel?: 2 | 3 | 4;
  /** A longer line than the shelf's, where the page has room for it. */
  line?: string;
  /** A small label over the title. */
  kicker?: string;
  /** A text link to the book's own page, under the buttons. */
  moreLabel?: string;
}) {
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";
  const cover = <img className="bk-cover" src={item.cover.src} alt={item.cover.alt} width={item.cover.width} height={item.cover.height} loading={eager ? "eager" : "lazy"} decoding="async" />;
  return (
    <article className="ed-card bk-card" aria-labelledby={`bk-${item.folder}`}>
      {item.page ? (
        <Link href={item.page} className="bk-cover-link" aria-hidden="true" tabIndex={-1}>
          {cover}
        </Link>
      ) : (
        <div className="bk-cover-link">{cover}</div>
      )}
      <div className="bk-body">
        {kicker && <p className="eyebrow bk-kicker">{kicker}</p>}
        <H className="bk-title" id={`bk-${item.folder}`}>
          {item.page ? <Link href={item.page}>{item.title}</Link> : item.title}
        </H>
        <p className="bk-sub">{item.subtitle}</p>
        <p className="bk-line">{line ?? item.line}</p>
        {item.formerly && <p className="bk-meta">{formerlyLine(item.formerly)}</p>}
        <p className="bk-meta">{formatLine(item)}</p>
        <SuggestedGift id={item.id} />
        <FreeEbookButtons title={item.title} pdf={item.pdf} epub={item.epub} size="sm" />
        {moreLabel && item.page && (
          <p className="bk-more">
            <Link href={item.page} className="btn--text">
              {moreLabel}
            </Link>
          </p>
        )}
      </div>
    </article>
  );
}
