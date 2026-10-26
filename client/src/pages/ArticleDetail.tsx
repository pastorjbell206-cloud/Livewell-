/**
 * ArticleDetail — single article page.
 *
 * Architectural notes:
 * - Fetches the post by slug (was: full listPublished + .find())
 * - Related articles uses the relatedArticles router
 * - Emits Article schema + Open Graph via SEOMeta (React 19 head JSX)
 * - Body width is 680px (var(--w-prose)) per CLAUDE.md
 * - Save and send (TakeItWithYou) sit under the byline, on a phone's first
 *   screen, and again after the essay; Save is My Library (lib/library), the
 *   one save store, which also reads the page's older bookmarks
 * - Listen (the device's own voice), Text size, and Focus sit above the body;
 *   Focus mode keeps every action reachable
 * - Printing gives the title, byline, and text; the rest is .no-print
 * - On a phone the essay's first sentence is on the first screen (U04): a 16px
 *   gutter and tighter air (.essay-* in index.css), the reading tools in one
 *   row, the contents card closed under 760px, and no art before the text. A
 *   real cover sits after the opening section; generated art is not drawn.
 * - Crossway's notice follows an essay that quotes the ESV (lib/esv)
 */
import { useEffect, useRef, useState } from "react";
import { scrollBehavior } from "@/lib/motion";
import { createPortal } from "react-dom";
import { Link, useLocation, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { DISCUSSION_GUIDES } from "@/data/discussion-guides";
import { Markdown } from "@/components/Markdown";
import { recordReadEvent } from "@/components/ReadDepthBeacon";
import { ArrowLeft, BookOpen, Share2, User } from "lucide-react";

import Layout from "@/components/Layout";
import { TakeItWithYou } from "@/components/TakeItWithYou";
import { ListenButton } from "@/components/ListenButton";
import { TextSize, useTextSize } from "@/components/TextSize";
import { shareTrigger } from "@/components/AudienceShare";
import { LoadFailed } from "@/components/LoadFailed";
import PageEndNav from "@/components/PageEndNav";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { SEOMeta, getArticleSchema, getBreadcrumbSchema } from "@/components/SEOMeta";
import { AuthorBio } from "@/components/AuthorBio";
import ChannelLine from "@/components/ChannelLine";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { CitationCopy } from "@/components/CitationCopy";
import { AudienceShare } from "@/components/AudienceShare";
import { KeepReadingBook } from "@/components/KeepReadingBook";
import { RelatedEssays } from "@/components/RelatedEssays";
import ArticleNextSteps, { isArticleOnPath } from "@/components/ArticleNextSteps";
import { trpc } from "@/lib/trpc";
import { pillarToTrack } from "@/lib/taxonomy";
import { ESV_NOTICE, owesEsvNotice } from "@/lib/esv";
import {
  cleanExcerpt,
  essayDate,
  essayVisibility,
  isEssayOverride,
  nearestSection,
  overrideMeta,
  overrideUrl,
  sectionBySlug,
  sectionHref,
  shelfEntry,
} from "@/lib/shelf";
import { fetchJson } from "@/lib/fetch-json";
import { RetiredEssayNotice } from "@/components/RetiredEssayNotice";
import { articleUrl, OG_DEFAULT_IMAGE, SITE_URL } from "@/lib/site";
import { trackEssayComplete, trackPathStep } from "@/lib/telemetry";
import { markEssayRead } from "@/lib/readProgress";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";
import { copyToClipboard } from "@/lib/clipboard";
import { normalizeEssayBody, opensWithProse, stripDuplicateTitle } from "@/lib/html-body";

/**
 * Per-slug byline overrides. Every essay not listed here is authored by
 * James Bell (the default). Susanna Bell's essays open the platform's
 * motherhood/womanhood lane.
 */
const ARTICLE_AUTHORS: Record<string, string> = {
  "the-work-nobody-watches": "Susanna Bell",
  "the-womanhood-they-preached-was-small": "Susanna Bell",
};

/**
 * What a shared quotation carries: the words, then the essay they were met in
 * and the site. Never a byline. A block quote in an essay is as often
 * Scripture or another writer as James, so signing it "James Bell" would put
 * words in his mouth (or put his name on Paul's). The link travels separately.
 */
export function quoteShareText(quote: string, essayTitle: string): string {
  let words = quote.replace(/\s+/g, " ").trim();
  // A quotation already set in quotation marks keeps one pair, not two.
  const wrapped = /^["“](.*)["”]$/.exec(words);
  if (wrapped) words = wrapped[1].trim();
  return `“${words}”\n\nFrom "${essayTitle}" on LiveWell`;
}

/**
 * Hand a quotation to the phone's share sheet, or copy it with the link where
 * there is no share sheet (or it fails). A reader who closes the sheet has
 * chosen not to share: nothing is copied behind their back.
 */
async function shareQuote(title: string, text: string, url: string): Promise<"shared" | "cancelled" | "copied" | "failed"> {
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({ title, text, url });
      return "shared";
    } catch (e) {
      if ((e as { name?: string } | null)?.name === "AbortError") return "cancelled";
      // Anything else (no permission, unsupported data): copy instead.
    }
  }
  return (await copyToClipboard(`${text}\n${url}`)) ? "copied" : "failed";
}

/**
 * ShareableQuote — every blockquote in an essay renders as a pull-quote the
 * reader can lift and share. Reads its own rendered text (so it survives
 * whatever markup the Markdown renderer puts inside), then hands it to the
 * native share sheet, or copies it with the essay's title and link.
 */
function ShareableQuote({
  children,
  shareTitle,
  shareUrl,
}: {
  children?: React.ReactNode;
  shareTitle: string;
  shareUrl: string;
}) {
  const textRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"" | "copied" | "failed">("");

  const onShare = async () => {
    const quote = textRef.current?.textContent?.trim() ?? "";
    if (!quote) return;
    const result = await shareQuote(shareTitle, quoteShareText(quote, shareTitle), shareUrl);
    setState(result === "copied" || result === "failed" ? result : "");
  };

  return (
    <blockquote className="quote-share">
      <div className="quote-share__text" ref={textRef}>
        {children}
      </div>
      <button
        type="button"
        className="quote-share__btn no-print"
        onClick={onShare}
        aria-live="polite"
        style={{ minHeight: "44px" }}
      >
        <Share2 size={13} aria-hidden />
        {state === "copied" ? "Copied" : state === "failed" ? "Couldn't copy" : "Share this quote"}
      </button>
    </blockquote>
  );
}

/**
 * QuoteSelectionShare — Medium-style "share any quote." When the reader
 * highlights text inside the essay body, a small Share button floats above the
 * selection. Desktop only: phones already surface a native selection menu, and
 * a second floating control there would collide with it.
 */
function QuoteSelectionShare({
  title,
  url,
  bodyRef,
}: {
  title: string;
  url: string;
  bodyRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [pop, setPop] = useState<{ text: string; top: number; left: number } | null>(null);
  const [copy, setCopy] = useState<"" | "copied" | "failed">("");

  useEffect(() => {
    const fine =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const update = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) { setPop(null); return; }
      const text = sel.toString().trim();
      const range = sel.getRangeAt(0);
      const within = bodyRef.current && bodyRef.current.contains(range.commonAncestorContainer);
      if (!within || text.length < 12) { setPop(null); return; }
      const rect = range.getBoundingClientRect();
      if (!rect || rect.width === 0) { setPop(null); return; }
      setCopy("");
      setPop({ text, top: rect.top, left: rect.left + rect.width / 2 });
    };
    const hide = () => setPop(null);

    document.addEventListener("mouseup", update);
    document.addEventListener("keyup", update);
    document.addEventListener("scroll", hide, true);
    return () => {
      document.removeEventListener("mouseup", update);
      document.removeEventListener("keyup", update);
      document.removeEventListener("scroll", hide, true);
    };
  }, [bodyRef]);

  if (!pop) return null;

  const share = async () => {
    const result = await shareQuote(title, quoteShareText(pop.text, title), url);
    if (result === "shared" || result === "cancelled") {
      setPop(null);
      return;
    }
    setCopy(result);
    if (result === "copied") setTimeout(() => setPop(null), 1200);
  };

  return createPortal(
    <div className="no-print" style={{ position: "fixed", top: Math.max(8, pop.top - 52), left: pop.left, transform: "translateX(-50%)", zIndex: 1100 }}>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={share}
        aria-live="polite"
        style={{ display: "inline-flex", alignItems: "center", gap: "7px", minHeight: "44px", background: "var(--charcoal)", color: "var(--charcoal-fg)", border: "none", borderRadius: "var(--radius-sm)", padding: "8px 14px", fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", cursor: "pointer", boxShadow: "var(--shadow-modal)", whiteSpace: "nowrap" }}
      >
        <Share2 size={13} aria-hidden /> {copy === "copied" ? "Copied" : copy === "failed" ? "Couldn't copy" : "Share quote"}
      </button>
    </div>,
    document.body
  );
}

/**
 * The essay's opening section and the rest: the split falls on the first
 * section heading ("## "). With no heading the whole essay is its opening, and
 * the rest is empty. A body with footnote or link definitions ("[^1]: …",
 * "[ref]: …") is not split, since each half is rendered on its own and a
 * reference must share a document with its definition.
 */
export function splitAtFirstSection(markdown: string): [opening: string, rest: string] {
  if (/^ {0,3}\[[^\]\n]+\]:/m.test(markdown)) return [markdown, ""];
  const heading = /^##\s/m.exec(markdown);
  if (!heading || heading.index === 0) return [markdown, ""];
  return [markdown.slice(0, heading.index), markdown.slice(heading.index)];
}

/** The contents card starts closed on a phone, where it would push the first sentence off the screen. */
const PHONE_WIDTH = "(max-width: 760px)";
function contentsOpenAtFirst(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return true;
  return !window.matchMedia(PHONE_WIDTH).matches;
}

function slugifyHeading(text: string, index: number) {
  const base = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
  return base || `section-${index + 1}`;
}

/**
 * TableOfContents — a slim, collapsible "In this essay" card for long pieces.
 *
 * Reads the section headings the Markdown renderer put into the body, assigns stable
 * anchor ids, and links to them. Renders nothing on short essays (fewer than
 * three section headings), so the reading experience is untouched where a
 * contents list would only be noise. No layout grid, no right rail: the
 * single-column measure stays exactly as it was.
 */
function TableOfContents({
  bodyRef,
  contentKey,
}: {
  bodyRef: React.RefObject<HTMLDivElement | null>;
  contentKey: string;
}) {
  const [items, setItems] = useState<{ id: string; text: string }[]>([]);
  const [open, setOpen] = useState(contentsOpenAtFirst);

  useEffect(() => {
    const root = bodyRef.current;
    if (!root) return;
    const seen = new Set<string>();
    // An empty heading (a stray "##" in an imported body) is not a section.
    const nodes = Array.from(root.querySelectorAll("h2")).filter((node) => node.textContent?.trim());
    const headings = nodes.map((node, i) => {
      const text = node.textContent?.trim() || `Section ${i + 1}`;
      let id = node.id || slugifyHeading(text, i);
      while (seen.has(id)) id = `${id}-${i}`;
      seen.add(id);
      node.id = id;
      node.style.scrollMarginTop = "96px";
      return { id, text };
    });
    setItems(headings);
  }, [bodyRef, contentKey]);

  if (items.length < 3) return null;

  const handleJump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    if (typeof history !== "undefined") {
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav aria-label="In this essay" className="essay-contents" style={{ maxWidth: "var(--w-prose)" }}>
      <details
        open={open}
        onToggle={e => setOpen(e.currentTarget.open)}
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderLeft: "2px solid var(--mustard)",
          borderRadius: "var(--radius-sm)",
        }}
      >
        {/* The card's padding sits on the summary, so the whole closed card
            is the tap target (it starts closed on a phone), not one line of
            11px text. */}
        <summary
          style={{
            padding: "16px 20px",
            fontFamily: "var(--U)",
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--mustard-text)",
            cursor: "pointer",
          }}
        >
          In this essay
        </summary>
        <ol
          style={{
            listStyle: "none",
            margin: "0 20px 16px",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {items.map(item => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={e => handleJump(e, item.id)}
                style={{
                  fontFamily: "var(--B)",
                  fontSize: "15px",
                  lineHeight: 1.4,
                  color: "var(--ink-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={e =>
                  (e.currentTarget.style.color = "var(--ink-muted)")
                }
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}

/** What the page renders: the database post, or the shelf's rewrite of it. */
interface EssayView {
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  pillar: string | null;
  coverImage: string | null;
  audience: string | null;
  readingTimeMinutes: number | null;
  publishedAt: Date | string | null;
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  // The shelf decides what this URL shows (lib/shelf.ts). A pending shelf
  // essay with no rewrite yet needs nothing from the server; one with a
  // rewrite renders that file instead of the database body.
  const entry = shelfEntry(slug);
  const rewrite = overrideMeta(slug);
  const waitingOnRewrite = entry?.status === "pending" && !rewrite;

  const postQuery = trpc.posts.getBySlug.useQuery(
    { slug: slug ?? "" },
    { enabled: Boolean(slug) && !waitingOnRewrite }
  );
  const rewriteQuery = useQuery({
    queryKey: ["essay-rewrite", slug],
    queryFn: () => fetchJson(overrideUrl(slug ?? ""), isEssayOverride),
    enabled: Boolean(slug && rewrite),
  });

  const dbPost = postQuery.data ?? null;
  const rewritten = rewriteQuery.data ?? null;
  const post: EssayView | null = rewritten
    ? {
        slug: rewritten.slug,
        title: rewritten.title,
        excerpt: rewritten.excerpt || null,
        body: rewritten.body,
        pillar: dbPost?.pillar ?? null,
        coverImage: dbPost?.coverImage ?? null,
        audience: dbPost?.audience ?? null,
        readingTimeMinutes: Math.max(1, Math.round(rewritten.body.split(/\s+/).filter(Boolean).length / 225)),
        publishedAt: dbPost?.publishedAt ?? rewritten.updated,
        createdAt: dbPost?.createdAt ?? rewritten.updated,
        updatedAt: rewritten.updated,
      }
    : dbPost
      ? {
          slug: dbPost.slug,
          title: dbPost.title,
          // The shelf's own line when it has one (blurb "" means no line);
          // otherwise the excerpt, with the entities Substack left decoded.
          excerpt:
            entry?.blurb !== undefined ? entry.blurb || null : cleanExcerpt(dbPost.excerpt) || null,
          body: dbPost.body ?? null,
          pillar: dbPost.pillar ?? null,
          coverImage: dbPost.coverImage ?? null,
          audience: dbPost.audience ?? null,
          readingTimeMinutes: dbPost.readingTimeMinutes ?? null,
          publishedAt: dbPost.publishedAt ?? null,
          createdAt: dbPost.createdAt ?? null,
          updatedAt: dbPost.updatedAt ?? null,
        }
      : null;

  // Reading-focus mode (board rec #10): a page-level calm that reduces the
  // article to title + body, persisted so the preference survives a reload.
  // Related essays now come from the static RelatedEssays component (board
  // rec #9) — no backend index fetch here.
  const [focus, setFocus] = useState<boolean>(() =>
    readStoredJSON(
      "livewell-reading-focus",
      (x): x is boolean => typeof x === "boolean",
      false
    )
  );
  const toggleFocus = () => {
    setFocus(prev => {
      const next = !prev;
      writeStoredJSON("livewell-reading-focus", next);
      return next;
    });
  };
  // The reader's text size (A− / A+), kept on this device, separate from Focus.
  const textSize = useTextSize();

  // Depth telemetry (board rec #17): emit "essay_read_complete" once, when a
  // zero-chrome sentinel at the foot of the body scrolls into view — a real
  // read, not an open (firing on mount would measure clicks, not reading). The
  // ref flag guarantees a single emit per mount and re-arms on navigation.
  const bodyEndRef = useRef<HTMLDivElement>(null);
  const readCompleteRef = useRef(false);
  const postSlug = post?.slug;
  useEffect(() => {
    readCompleteRef.current = false;
    const sentinel = bodyEndRef.current;
    if (!sentinel || !postSlug || typeof IntersectionObserver === "undefined") {
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting) && !readCompleteRef.current) {
          readCompleteRef.current = true;
          trackEssayComplete(postSlug);
          // If the reader reached this essay from a topic pathway (?path=<slug>),
          // finishing it completes that step — depth metric #4 (path_step_complete).
          const pathSlug = new URLSearchParams(window.location.search).get("path");
          if (pathSlug) trackPathStep(pathSlug, postSlug);
          recordReadEvent(`/writing/${postSlug}`);
          // Depth's memory (P13): a finished essay joins the device-local read
          // set the reading paths use for "pick up here."
          markEssayRead(postSlug);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [postSlug]);

  if (waitingOnRewrite && entry) {
    return (
      <RetiredEssayNotice
        slug={entry.slug}
        title={entry.title}
        pending
        section={nearestSection(entry.slug)}
      />
    );
  }

  // With a rewrite, wait for the file and for the database row (its pillar and
  // dates); a missing or failed row does not hold the rewrite back.
  if (postQuery.isLoading || rewriteQuery.isLoading) {
    return (
      <Layout>
        <div style={{ padding: "var(--s-6) var(--s-4)", textAlign: "center" }}>
          <div style={{ color: "var(--ink-muted)" }}>Loading article…</div>
        </div>
      </Layout>
    );
  }

  // A request that failed is not an article that does not exist. Telling a
  // reader the piece is gone when the server simply did not answer is a lie
  // the reader has no way to check, and it loses them for good.
  if (rewrite ? rewriteQuery.isError : postQuery.isError) {
    return (
      <Layout>
        <div style={{ padding: "var(--s-6) var(--s-4)" }}>
          <LoadFailed
            what="This essay"
            onRetry={() => void (rewrite ? rewriteQuery.refetch() : postQuery.refetch())}
            backHref="/writing"
            backLabel="All essays"
          />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div style={{ padding: "var(--s-6) var(--s-4)", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "28px",
              fontWeight: 500,
              color: "var(--ink)",
              marginBottom: "20px",
            }}
          >
            Essay not found
          </h2>
          <button
            type="button"
            onClick={() => navigate("/writing")}
            style={{
              padding: "12px 24px",
              background: "var(--ink)",
              color: "var(--bone)",
              border: "none",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              fontFamily: "var(--U)",
              fontWeight: 600,
              fontSize: "13px",
            }}
          >
            All essays
          </button>
        </div>
      </Layout>
    );
  }

  // Off the shelf: the URL still answers, with a short notice that points on.
  const visibility = essayVisibility(post.slug, essayDate(post));
  if (visibility === "retired" || visibility === "pending") {
    return (
      <RetiredEssayNotice
        slug={post.slug}
        title={post.title}
        pending={visibility === "pending"}
        section={nearestSection(post.slug, pillarToTrack(post.pillar))}
      />
    );
  }

  // The body as Markdown, with the import's broken structure repaired and a
  // repeated title dropped; the drop cap only when it opens on real prose.
  const bodyMarkdown = post.body ? stripDuplicateTitle(normalizeEssayBody(post.body), post.title) : "";
  const dropCap = opensWithProse(bodyMarkdown);
  const kickerSection = sectionBySlug(entry?.section);

  const canonical = articleUrl(post.slug);
  // The body in two parts only when a real cover sits after the opening section.
  const [opening, rest] = post.coverImage ? splitAtFirstSection(bodyMarkdown) : [bodyMarkdown, ""];
  const bodyComponents = {
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <ShareableQuote shareTitle={post.title} shareUrl={canonical}>
        {children}
      </ShareableQuote>
    ),
  };
  const esvNotice = owesEsvNotice(bodyMarkdown, { rewrite: Boolean(rewritten) });
  const description = post.excerpt || post.title;
  const ogImage = post.coverImage || OG_DEFAULT_IMAGE;
  const publishedIso = String(post.publishedAt || post.createdAt || "");
  const author = ARTICLE_AUTHORS[post.slug] ?? "James Bell";
  // Save and send carry the essay's own path, so a saved essay is one entry in
  // My Library however the reader arrived (?path=, #section).
  const essayPath = `/writing/${post.slug}`;
  const summary = post.excerpt ?? undefined;
  const measure = focus ? "68ch" : "var(--w-prose)";
  const bodySize = Math.round((focus ? 20 : 18) * textSize.scale);

  return (
    <Layout>
      <div className="no-print">
        <ReadingProgressBar />
      </div>
      <SEOMeta
        title={post.title}
        description={description}
        image={ogImage}
        url={canonical}
        type="article"
        author={author}
        publishedDate={publishedIso}
        modifiedDate={String(post.updatedAt || publishedIso)}
        structuredData={[
          getArticleSchema(
            post.title,
            description,
            publishedIso,
            String(post.updatedAt || publishedIso),
            ogImage,
            canonical,
            undefined,
            undefined,
            undefined,
            author
          ),
          getBreadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Essays", url: `${SITE_URL}/writing` },
            { name: post.title, url: canonical },
          ]),
        ]}
      />
      {/* print-paper: printed, the essay is ink on paper whatever the screen's
          theme (index.css, end of file). */}
      <article className={focus ? "lw-reading-focus print-paper" : "print-paper"}>
        {/* BACK BUTTON — hidden in reading-focus mode (breadcrumb chrome) */}
        {!focus && (
        <div className="no-print essay-back" style={{ borderBottom: "1px solid var(--border)" }}>
          <button
            type="button"
            onClick={() => navigate("/writing")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              minHeight: "44px",
              background: "transparent",
              border: "none",
              color: "var(--ink-muted)",
              cursor: "pointer",
              fontFamily: "var(--U)",
              fontSize: "13px",
              fontWeight: 600,
              padding: 0,
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
            onMouseLeave={e =>
              (e.currentTarget.style.color = "var(--ink-muted)")
            }
          >
            <ArrowLeft size={16} aria-hidden />
            All essays
          </button>
        </div>
        )}

        {/* HEADER — centered editorial. On a phone, a 16px gutter and less
            air (.essay-head in index.css), so save and send and then the
            essay's first sentence land on the first screen. */}
        <section
          className="essay-head"
          style={{
            background: "var(--bone)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              maxWidth: "var(--w-prose)",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            {/* Kicker: the shelf section the essay sits in, or Latest for a
                new post off the shelf (the names /writing uses). */}
            <div className="essay-kicker" style={{ display: "flex", justifyContent: "center" }}>
              <Link
                href={kickerSection ? sectionHref(kickerSection) : "/writing"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "var(--U)",
                  fontSize: "11px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "var(--mustard-text)",
                  textDecoration: "none",
                }}
              >
                <span aria-hidden style={{ width: "24px", height: "1px", background: "var(--mustard)" }} />
                {kickerSection ? kickerSection.name : "Latest"}
              </Link>
            </div>

            {/* Title */}
            <h1
              className={post.excerpt ? "essay-title" : "essay-title essay-title--alone"}
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              {post.title}
            </h1>

            {/* Standfirst / dek (size and air in .essay-dek) */}
            {post.excerpt && (
              <p
                className="essay-dek"
                style={{
                  fontFamily: "var(--F)",
                  color: "var(--ink-muted)",
                  fontStyle: "italic",
                  maxWidth: "32em",
                }}
              >
                {post.excerpt}
              </p>
            )}

            {/* Mustard rule */}
            <div
              aria-hidden
              className="essay-rule"
              style={{
                width: "64px",
                height: "2px",
                background: "var(--mustard)",
              }}
            />

            {/* Meta row — byline · audience/reading time · date */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
                fontFamily: "var(--U)",
                fontSize: "13px",
                color: "var(--ink-muted)",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <User size={14} aria-hidden />
                {author}
              </span>
              <span aria-hidden style={{ opacity: 0.5 }}>·</span>
              <span>{post.readingTimeMinutes ?? 5} min read</span>
              {post.publishedAt && (
                <>
                  <span aria-hidden style={{ opacity: 0.5 }}>·</span>
                  <time dateTime={publishedIso}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </>
              )}
            </div>

            {/* SAVE AND SEND — under the byline, so a reader on a phone can
                keep the essay or send it to themselves before scrolling.
                Shown in Focus mode too. The wrapper centers the bar and lets
                its panel's text sit flush left. */}
            <div className="essay-actions" style={{ display: "flex", justifyContent: "center", textAlign: "left" }}>
              <TakeItWithYou title={post.title} kind="Essay" href={essayPath} summary={summary} date={publishedIso} print align="center" />
            </div>
          </div>
        </section>

        {/* No art between the header and the text: the reader meets the
            essay's first sentence next. A real cover sits after the opening
            section (below); generated art is not drawn on the essay page. */}

        {/* BODY */}
        <section className="essay-main">
          {/* Reading tools, above the measure so they are reachable in both
              modes: Listen (the device's own voice reads the body), Text size
              (kept on this device), and the Focus toggle (board rec #10),
              which doubles as "Exit focus" since the body is never hidden.
              One row on a phone: .essay-tools drops the visible "Text size"
              word there (the group keeps it as its name). */}
          <div
            className="no-print essay-tools"
            role="group"
            aria-label="Reading tools"
            style={{
              maxWidth: measure,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            {/* Keyed by essay: moving to another essay stops the voice. */}
            <ListenButton key={post.slug} target={bodyRef} title={post.title} byline={`By ${author}`} />
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
              <TextSize size={textSize.size} onChange={textSize.setSize} saveFailed={textSize.saveFailed} />
              <button
                type="button"
                onClick={toggleFocus}
                aria-pressed={focus}
                style={{ ...shareTrigger, transition: "color 0.2s, border-color 0.2s" }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "var(--ink)";
                  e.currentTarget.style.borderColor = "var(--mustard)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "var(--ink-muted)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <BookOpen size={16} aria-hidden />
                {focus ? "Exit focus" : "Focus"}
              </button>
            </div>
          </div>
          <QuoteSelectionShare title={post.title} url={canonical} bodyRef={bodyRef} />
          {!focus && <TableOfContents bodyRef={bodyRef} contentKey={post.slug} />}
          <div
            className={dropCap ? "article-body" : "article-body prose-section"}
            ref={bodyRef}
            style={{
              maxWidth: measure,
              margin: "0 auto",
              fontFamily: "var(--B)",
              fontSize: `${bodySize}px`,
              lineHeight: focus ? 1.9 : 1.75,
              color: "var(--ink)",
            }}
          >
            {post.body ? (
              <>
                <Markdown components={bodyComponents}>{opening}</Markdown>
                {/* A real cover, after the opening section: art for the
                    screen, never ahead of the first sentence or on paper. */}
                {post.coverImage && (
                  <figure className="no-print" style={{ margin: "2em 0" }}>
                    <img
                      src={post.coverImage}
                      alt=""
                      width={1200}
                      height={630}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "auto",
                        aspectRatio: "16 / 9",
                        objectFit: "cover",
                        borderRadius: "var(--radius-sm)",
                        display: "block",
                        margin: 0,
                      }}
                    />
                  </figure>
                )}
                {rest && <Markdown components={bodyComponents}>{rest}</Markdown>}
              </>
            ) : (
              <p style={{ fontStyle: "italic", color: "var(--ink-muted)" }}>
                This article is in preparation.
              </p>
            )}
          </div>

          {/* Crossway's notice, for an essay that quotes the ESV (lib/esv).
              Printed with the essay, since the quotations are. */}
          {esvNotice && (
            <p
              className="essay-esv-notice"
              style={{
                maxWidth: measure,
                margin: "var(--s-4) auto 0",
                fontFamily: "var(--U)",
                fontSize: "12px",
                lineHeight: 1.6,
                color: "var(--ink-muted)",
              }}
            >
              {ESV_NOTICE}
            </p>
          )}

          {/* Depth-telemetry sentinel — a 1px, aria-hidden anchor at the foot
              of the essay body; entering the viewport marks a completed read.
              One observer, two sinks: Vercel Analytics (lib/telemetry) and the
              site's own read_events table (recordReadEvent), which feeds the
              admin dashboard's "Essays finished" tile. */}
          <div ref={bodyEndRef} aria-hidden style={{ height: 1 }} />

          {/* Reader actions after the essay, in both modes: save and send
              (the same My Library entry as the bar under the byline), then
              cite, send to someone else, and the small-group guide. */}
          <div
            className="no-print"
            style={{
              maxWidth: measure,
              margin: "var(--s-5) auto 0",
              paddingTop: "var(--s-4)",
              borderTop: "1px solid var(--border)",
            }}
          >
            <TakeItWithYou
              title={post.title}
              kind="Essay"
              href={essayPath}
              summary={summary}
              date={publishedIso}
              print
              extra={
                <>
                  <CitationCopy title={post.title} url={canonical} publishedDate={publishedIso} author={author} />
                  {/* Three-audience share: a skeptic, a pastor, a spouse */}
                  <AudienceShare title={post.title} url={canonical} />
                  {/* Pastor distribution: hand this essay to a whole small group */}
                  {post.slug && DISCUSSION_GUIDES[post.slug] && (
                    <Link href={`/group-guide/${post.slug}`} style={{ ...shareTrigger, color: "var(--ink)" }}>
                      Use this with your small group
                    </Link>
                  )}
                </>
              }
            />
          </div>
        </section>

        {/* POST-BODY CHROME — hidden in reading-focus mode, and never printed.
            The book that carries this essay's argument, then a quiet list of
            other essays (board rec #9), then the newsletter CTA, author bio,
            and end nav. */}
        {!focus && (
          <div className="no-print">
            {/* NEXT STEPS — the matched tool and reading path for this essay
                (built long ago, never imported; revived by QW-16) */}
            {/* ONE PRIMARY NEXT STEP. A reader at the end of an essay is at
                peak intent, so exactly one ask leads, chosen by where they
                are: mid-path, the next essay in that path; otherwise the book
                that carries the argument. The other demotes to a quiet line. */}
            {isArticleOnPath(post.slug ?? "") ? (
              <>
                <ArticleNextSteps articleSlug={post.slug ?? ""} articlePillar={post.pillar ?? ""} />
                <KeepReadingBook post={post} quiet />
              </>
            ) : (
              <>
                <KeepReadingBook post={post} />
                <ArticleNextSteps articleSlug={post.slug ?? ""} articlePillar={post.pillar ?? ""} />
              </>
            )}
            <RelatedEssays post={post} />

            {/* NEWSLETTER (single CTA — no fake form) */}
            <section
              style={{
                background: "var(--bone-warm)",
                padding: "var(--s-6) var(--s-4)",
              }}
            >
              <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
                <NewsletterSignup variant="inline" source="article" />
              </div>
            </section>

            {/* AUTHOR BIO */}
            <AuthorBio author={author} />
            <ChannelLine />

            <PageEndNav back={{ href: "/writing", label: "All essays" }} />
          </div>
        )}
      </article>
    </Layout>
  );
}
