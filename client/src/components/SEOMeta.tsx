/**
 * SEOMeta — emits per-route head tags using React 19's native head JSX.
 *
 * Why this rewrite: the previous version mutated `document` during render
 * (anti-pattern; double-fires under Strict Mode, races with concurrent
 * rendering, loses tags on fast navigation). React 19 hoists <title>,
 * <meta>, and <link> rendered anywhere in the tree to <head> and dedupes
 * them — works for both client-side and any future SSR/prerender path.
 *
 * The static index.html still ships sensible homepage defaults so the very
 * first paint (and bots that ignore JS) gets something. When this component
 * mounts on a route, it overrides them.
 */
import { useLocation } from "wouter";
import { SITE_URL, SITE_NAME, AUTHOR_NAME, OG_DEFAULT_IMAGE } from "@/lib/site";
import { SAME_AS } from "@/lib/channels";

interface SEOMetaProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  /** og:type. "webpage" is accepted as an alias for "website" for legacy callers. */
  type?: "website" | "article" | "book" | "profile" | "webpage";
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export function SEOMeta({
  title,
  description,
  keywords,
  image = OG_DEFAULT_IMAGE,
  url,
  type = "website",
  author = AUTHOR_NAME,
  publishedDate,
  modifiedDate,
  noindex,
  structuredData,
}: SEOMetaProps) {
  // Brand-once: append the site name only when the title doesn't already carry
  // the brand. Matching the full SITE_NAME missed titles ending "| LiveWell" or
  // "— by James Bell", which then shipped doubled.
  const fullTitle =
    title.includes("James Bell") || title.includes("LiveWell") ? title : `${title} | ${SITE_NAME}`;
  // Canonical: an explicit `url` always wins. Otherwise derive it from the
  // current route so each page self-canonicalizes — without this, every page
  // that omits `url` would canonicalize to the homepage (SITE_URL), telling
  // search engines those pages are duplicates of "/". Query-content pages
  // (e.g. /writing?pillar=…) pass an explicit `url` and are unaffected.
  const [pathname] = useLocation();
  const canonicalUrl = url ?? `${SITE_URL}${pathname === "/" ? "" : pathname}`;
  // "webpage" is a legacy alias for "website" (Open Graph never had a webpage type).
  const ogType: "website" | "article" | "book" | "profile" =
    type === "webpage" ? "website" : type;
  const schemas = Array.isArray(structuredData)
    ? structuredData
    : structuredData
      ? [structuredData]
      : [];

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      {publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}
      {ogType === "article" && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Escape "<" so a literal "</script>" inside any field (article
          // bodies travel through here) can never close the tag early; it is
          // valid JSON and parses identically.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}

// ─── Schema helpers ─────────────────────────────────────────────────────

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Connecting the depth of theology to the weight of everyday life.",
    founder: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: `${SITE_URL}/about`,
    },
    sameAs: SAME_AS,
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Theology that carries the weight of everyday life. Essays on faith, justice, marriage, parenting, and pastoral ministry.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/writing?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function getArticleSchema(
  title: string,
  description: string,
  publishedDate: string,
  modifiedDate?: string,
  image?: string,
  url?: string,
  articleBody?: string,
  wordCount?: number,
  articleSection?: string,
  authorName?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image ?? OG_DEFAULT_IMAGE,
    url: url ?? SITE_URL,
    datePublished: publishedDate,
    dateModified: modifiedDate ?? publishedDate,
    inLanguage: "en",
    ...(articleSection ? { articleSection } : {}),
    ...(articleBody ? { articleBody } : {}),
    ...(wordCount ? { wordCount } : {}),
    author: {
      "@type": "Person",
      name: authorName ?? AUTHOR_NAME,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url ?? SITE_URL,
    },
  };
}

export function getBookSchema(
  title: string,
  description: string,
  author: string = AUTHOR_NAME,
  image?: string,
  url?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: title,
    description,
    author: { "@type": "Person", name: author },
    image,
    url,
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Reduce markdown/HTML to a single trimmed line of plain text, capped in
 * length. JSON-LD wants clean strings, not rendered markup — this strips tags,
 * links, and emphasis marks so what an answer engine reads matches what a human
 * reads. Coerces any input to a string so JSON.stringify never breaks on it.
 */
function toPlainText(input: string, maxLen = 300): string {
  const text = String(input ?? "")
    .replace(/<[^>]*>/g, " ") // HTML tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // markdown images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // markdown links -> their text
    .replace(/[*_`~#>]/g, "") // emphasis / code / heading / blockquote marks
    .replace(/\s+/g, " ") // collapse whitespace (incl. newlines)
    .trim();
  return text.length > maxLen ? `${text.slice(0, maxLen).trimEnd()}…` : text;
}

export function getFAQPageSchema(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: toPlainText(i.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: toPlainText(i.answer),
      },
    })),
  };
}

export function getQAPageSchema(question: string, answer: string) {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: toPlainText(question),
      acceptedAnswer: {
        "@type": "Answer",
        // A QAPage carries one full answer, so allow more room than an FAQ item.
        text: toPlainText(answer, 1200),
      },
    },
  };
}
