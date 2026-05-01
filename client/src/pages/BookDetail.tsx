import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { trpc } from "@/lib/trpc";
import { useRoute } from "wouter";
import { ExternalLink, Loader2, ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import BookPreview from "@/components/BookPreview";
import BookRecommendations from "@/components/BookRecommendations";

export default function BookDetail() {
  const [match, params] = useRoute("/books/:slug");
  const bookSlug = params?.slug;
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const booksQuery = trpc.books.listPublished.useQuery();
  const book = booksQuery.data?.find((b) => b.slug === bookSlug);

  if (booksQuery.isLoading) {
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
      "Navigating the early years",
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

  return (
    <>
      <SEOMeta
        title={book.title}
        description={book.description || ""}
        keywords={`${book.title}, ${book.author}, church leadership, pastoral resources`}
      />
      <Layout>
        {/* Back Button */}
        <section className="py-8" style={{ backgroundColor: "var(--bone)" }}>
          <div className="container">
            <Link href="/books">
              <a className="inline-flex items-center gap-2 px-4 py-2 rounded font-ui font-medium no-underline transition-colors" style={{ backgroundColor: "#FFFFFF", color: "var(--ink)" }}>
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
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full rounded-lg shadow-lg"
                    style={{ aspectRatio: "3/4", objectFit: "cover" }}
                  />
                )}
                <div className="mt-6 space-y-3">
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
                      style={{ backgroundColor: "var(--ink)", color: "var(--bone)" }}
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

        {/* CTA Section */}
        <section className="py-16" style={{ backgroundColor: "var(--ink)" }}>
          <div className="container text-center">
            <h2 className="font-display text-3xl font-bold mb-4" style={{ color: "var(--bone)" }}>
              Ready to Transform Your Leadership?
            </h2>
            <p className="font-body text-lg mb-8 max-w-2xl mx-auto" style={{ color: "rgba(244,241,234,0.7)" }}>
              This book provides the biblical foundation and practical roadmap you need to lead with clarity and conviction.
            </p>
            {book.purchaseUrl && (
              <a
                href={book.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded font-ui font-medium no-underline transition-colors"
                style={{ backgroundColor: "var(--gold)", color: "var(--ink)" }}
              >
                <ExternalLink size={18} /> Get Your Copy
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
