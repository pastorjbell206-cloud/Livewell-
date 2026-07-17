import Layout from "@/components/Layout";
import { SEOMeta, getBookSchema, getBreadcrumbSchema } from "@/components/SEOMeta";
import { trpc } from "@/lib/trpc";
import { Link, useRoute } from "wouter";
import { ArrowLeft, BookOpen, ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";
import BookPreview from "@/components/BookPreview";
import BookRecommendations from "@/components/BookRecommendations";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { bookUrl, SITE_URL } from "@/lib/site";
import { readSlugFor } from "@/lib/readableBooks";

export default function BookDetail() {
  const [, params] = useRoute("/books/:slug");
  const bookSlug = params?.slug ?? "";
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Fetch a single book by slug instead of pulling the whole catalog.
  const bookQuery = trpc.books.getBySlug.useQuery(
    { slug: bookSlug },
    { enabled: Boolean(bookSlug) }
  );
  const book = bookQuery.data ?? null;

  if (bookQuery.isLoading) {
    return (
      <Layout>
        <div className="flex justify-center py-32">
          <Loader2 size={32} className="animate-spin" style={{ color: "var(--gold)" }} />
        </div>
      </Layout>
    );
  }

  if (!book) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container">
            <Link href="/books">
              <a className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded font-ui font-medium no-underline transition-colors" style={{ backgroundColor: "var(--bone)", color: "var(--ink)" }}>
                <ArrowLeft size={16} /> Back to Books
              </a>
            </Link>
            <div className="text-center">
              <h1 className="font-display text-3xl font-bold mb-4" style={{ color: "var(--ink)" }}>
                Book Not Found
              </h1>
              <p className="font-body text-lg" style={{ color: "var(--ink-muted)" }}>
                The book you're looking for doesn't exist.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const bookTopics: Record<string, string[]> = {
    "What Elders Are For": [
      "Boards that govern instead of shepherd",
      "The elder as shepherd: back to the Bible",
      "The elder as teacher: guarding and proclaiming truth",
      "The elder as overseer: leading without micromanaging",
      "The elder's personal life as ministry",
      "Building an elder team that functions biblically",
    ],
    "Qualified": [
      "The character of a church planter",
      "Theological conviction and clarity",
      "Building a healthy leadership culture",
      "The early years",
      "Sustaining vision and health long-term",
      "When to plant and when to wait",
    ],
    "Finding and Installing Elders": [
      "Recognizing elder potential in your congregation",
      "The development process: from prospect to elder",
      "Having the hard conversations about qualification",
      "Creating elder role descriptions and covenants",
      "Building accountability and evaluation systems",
      "Sustaining elder health and preventing burnout",
    ],
  };

  const topics = bookTopics[book.title] || [];

  const canonical = book.slug ? bookUrl(book.slug) : undefined;
  // Books with a full on-site manuscript are read free at /read/:slug.
  const readSlug = readSlugFor(book.slug);

  return (
    <>
      <SEOMeta
        title={book.title}
        description={book.description || `${book.title} by ${book.author || "James Bell"}.`}
        keywords={`${book.title}, ${book.author}, theology, pastoral, books`}
        image={book.coverImage || undefined}
        url={canonical}
        type="book"
        structuredData={[
          getBookSchema(
            book.title,
            book.description || "",
            book.author || "James Bell",
            book.coverImage || undefined,
            canonical
          ),
          getBreadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Books", url: `${SITE_URL}/books` },
            { name: book.title, url: canonical ?? `${SITE_URL}/books` },
          ]),
        ]}
      />
      <Layout>
        {/* Back Button */}
        <section className="py-8" style={{ backgroundColor: "var(--bone)" }}>
          <div className="container">
            <Link href="/books">
              <a className="inline-flex items-center gap-2 px-4 py-2 rounded font-ui font-medium no-underline transition-colors" style={{ backgroundColor: "var(--card)", color: "var(--ink)" }}>
                <ArrowLeft size={16} /> Back to Books
              </a>
            </Link>
          </div>
        </section>

        {/* Book Hero */}
        <section className="py-16" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
              {/* Book Cover */}
              <div className="md:col-span-1">
                {book.coverImage && (
                  <img
                    width={400}
                height={600}
                src={book.coverImage}
                    alt={book.title}
                    className="w-full rounded-lg shadow-lg"
                    style={{ aspectRatio: "3/4", objectFit: "cover" }}
                  />
                )}
                <div className="mt-6 space-y-3">
                  {readSlug && (
                    <Link href={`/read/${readSlug}`}>
                      <a
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-ui font-medium no-underline transition-colors"
                        style={{ backgroundColor: "var(--charcoal)", color: "var(--charcoal-fg)", borderBottom: "2px solid var(--mustard)" }}
                      >
                        <BookOpen size={18} /> Read the full book free
                      </a>
                    </Link>
                  )}
                  {book.sampleExcerpt && (
                    <button
                      onClick={() => setIsPreviewOpen(true)}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-ui font-medium transition-colors"
                      style={{ backgroundColor: "var(--bone)", color: "var(--ink)" }}
                    >
                      <BookOpen size={18} /> Read Sample
                    </button>
                  )}
                  {book.purchaseUrl && (
                    <a
                      href={book.purchaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-ui font-medium no-underline transition-colors"
                      style={{ backgroundColor: "var(--charcoal)", color: "var(--charcoal-fg)" }}
                    >
                      <ExternalLink size={18} /> Purchase Now
                    </a>
                  )}
                </div>
              </div>

              {/* Book Info */}
              <div className="md:col-span-2">
                <div className="font-ui text-xs font-medium uppercase tracking-[0.15em] mb-2" style={{ color: "var(--gold)" }}>
                  Published Book
                </div>
                <h1 className="font-display text-4xl font-bold mb-2" style={{ color: "var(--ink)" }}>
                  {book.title}
                </h1>
                {book.author && (
                  <p className="font-ui text-lg mb-6" style={{ color: "var(--ink-muted)" }}>
                    by {book.author}
                  </p>
                )}

                {book.description && (
                  <div className="mb-8">
                    <p className="font-body text-lg leading-relaxed" style={{ color: "var(--charcoal)", lineHeight: 1.8 }}>
                      {book.description}
                    </p>
                  </div>
                )}

                {/* Key Topics */}
                {topics.length > 0 && (
                  <div>
                    <h3 className="font-display text-xl font-bold mb-4" style={{ color: "var(--ink)" }}>
                      What You'll Discover
                    </h3>
                    <ul className="space-y-3">
                      {topics.map((topic, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                          <div
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: "var(--gold)" }}
                          />
                          <span className="font-body" style={{ color: "var(--charcoal)" }}>
                            {topic}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* EMAIL CAPTURE — the sample above is free and ungated; the list ask
            stands on its own. (The old SampleChapterForm here promised a PDF
            "on the way" that nothing could send.) */}
        <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
            <NewsletterSignup
              variant="inline"
              title="If this book is your kind of reading"
              description="One serious essay a week in the same vein — theology that meets the actual Tuesday afternoon. No spam, ever."
              source={`book-${book.slug ?? "detail"}`}
            />
          </div>
        </section>

        {/* CTA — bone on charcoal with mustard rule (palette honored) */}
        <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4)" }}>
          <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto", textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(28px, 4vw, 38px)",
                fontWeight: 400,
                letterSpacing: "-0.015em",
                color: "var(--charcoal-fg)",
                marginBottom: "16px",
              }}
            >
              The work the book asks of you starts now.
            </h2>
            <p
              style={{
                fontFamily: "var(--B)",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(245,240,230,0.7)",
                maxWidth: "55ch",
                margin: "0 auto 28px",
              }}
            >
              Read the first chapter free above. If it carries weight, buy the rest.
            </p>
            {book.purchaseUrl && (
              <a
                href={book.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "var(--bone)",
                  color: "var(--ink)",
                  border: "none",
                  borderBottom: "2px solid var(--mustard)",
                  padding: "14px 28px",
                  fontFamily: "var(--U)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  borderRadius: "var(--radius-sm)",
                  textDecoration: "none",
                }}
              >
                <ExternalLink size={16} aria-hidden /> Buy the book
              </a>
            )}
          </div>
        </section>

        {/* Book Recommendations */}
        <section className="py-16" style={{ backgroundColor: "var(--bone)" }}>
          <div className="container">
            <BookRecommendations currentBookId={book.id} limit={3} />
          </div>
        </section>
        {/* Book Preview Modal */}
        <BookPreview
          title={book.title}
          excerpt={book.sampleExcerpt}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      </Layout>
    </>
  );
}
