import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Loader2 } from "lucide-react";

interface BookRecommendationsProps {
  currentBookId: number;
  currentBookPillar?: string;
  limit?: number;
}

export default function BookRecommendations({
  currentBookId,
  currentBookPillar,
  limit = 3,
}: BookRecommendationsProps) {
  const booksQuery = trpc.books.listPublished.useQuery();

  if (booksQuery.isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 size={24} className="animate-spin" style={{ color: "#B8963E" }} />
      </div>
    );
  }

  // Filter out current book and get recommendations
  const allBooks = booksQuery.data || [];
  const recommendations = allBooks
    .filter((book) => book.id !== currentBookId && book.bookType === "authored")
    .slice(0, limit);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t" style={{ borderColor: "#E5E7EB" }}>
      <div className="mb-8">
        <div className="font-ui text-xs font-medium uppercase tracking-[0.15em] mb-2" style={{ color: "#B8963E" }}>
          Explore More
        </div>
        <h3 className="font-display text-2xl font-bold" style={{ color: "#1A1A1A" }}>
          You Might Also Like
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((book) => (
          <Link key={book.id} href={`/books/${book.slug}`}>
            <div className="group cursor-pointer transition-all duration-300 transform hover:scale-105">
              <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {book.coverImage && (
                  <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                  </div>
                )}
                <div className="p-4" style={{ backgroundColor: "#FFFFFF" }}>
                  <h4 className="font-display text-base font-bold mb-1 line-clamp-2" style={{ color: "#1A1A1A" }}>
                    {book.title}
                  </h4>
                  {book.author && (
                    <p className="font-ui text-xs" style={{ color: "#6B7280" }}>
                      by {book.author}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
