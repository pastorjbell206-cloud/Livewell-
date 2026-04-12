import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useToast } from "@/contexts/ToastContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ExternalLink, Loader2, Check } from "lucide-react";
import Layout from "@/components/Layout";

export default function BooksStore() {
  const { addToast } = useToast();
  const { data: books, isLoading } = trpc.books.listPublished.useQuery();
  const [loadingBookId, setLoadingBookId] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showCheckoutForm, setShowCheckoutForm] = useState<number | null>(null);

  const createCheckout = trpc.stripe.createCheckoutSession.useMutation();

  const handleBuyBook = async (bookId: number, bookTitle: string) => {
    if (!email || !name) {
      setShowCheckoutForm(bookId);
      addToast({
        type: "info",
        title: "Email Required",
        message: "Please enter your email and name to proceed with purchase",
      });
      return;
    }

    setLoadingBookId(bookId);
    try {
      const result = await createCheckout.mutateAsync({
        bookId,
        customerEmail: email,
        customerName: name,
        origin: window.location.origin,
      });

      if (result.success && result.sessionUrl) {
        // Open checkout in new tab
        window.open(result.sessionUrl, "_blank");
        addToast({
          type: "success",
          title: "Checkout Opened",
          message: `Opening Stripe checkout for "${bookTitle}"`,
        });
      }
    } catch (error: any) {
      addToast({
        type: "error",
        title: "Purchase failed",
        message: error.message || "Unable to process purchase",
      });
    } finally {
      setLoadingBookId(null);
    }
  };

  const handleAmazonLink = (amazonUrl: string) => {
    window.open(amazonUrl, "_blank");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
        </div>
      </Layout>
    );
  }

  const authoredBooks = books?.filter((b) => b.bookType === "authored") || [];
  const recommendedBooks = books?.filter((b) => b.bookType === "recommended") || [];

  return (
    <Layout>
      <section className="py-24" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto mb-16">
            <h1
              className="font-display font-bold mb-6"
              style={{
                color: "#1A1A1A",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                lineHeight: 1.15,
              }}
            >
              Books & Resources
            </h1>
            <p style={{ color: "#2C3E50", fontSize: "18px", lineHeight: 1.6 }}>
              Explore James Bell's published works and recommended reading for deeper theological
              engagement and spiritual growth.
            </p>
          </div>

          {/* Email Capture Form */}
          {showCheckoutForm && (
            <div className="max-w-md mx-auto mb-12 p-6 bg-white rounded-lg shadow-md border-l-4" style={{ borderColor: "#B8963E" }}>
              <h3 style={{ color: "#1A1A1A", fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>
                Complete Your Purchase
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  style={{ borderColor: "#D1C9BB" }}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  style={{ borderColor: "#D1C9BB" }}
                />
                <Button
                  onClick={() => handleBuyBook(showCheckoutForm, "")}
                  disabled={loadingBookId !== null}
                  className="w-full"
                  style={{ backgroundColor: "#B8963E" }}
                >
                  {loadingBookId ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Proceed to Checkout
                </Button>
                <button
                  onClick={() => setShowCheckoutForm(null)}
                  className="w-full text-sm"
                  style={{ color: "#6B7280" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Authored Books */}
          {authoredBooks.length > 0 && (
            <div className="mb-24">
              <div className="font-ui text-xs font-medium uppercase tracking-[0.15em] mb-12" style={{ color: "#B8963E" }}>
                James Bell's Books
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {authoredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    {book.coverImage && (
                      <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <h3
                        className="font-display font-bold mb-2"
                        style={{ color: "#1A1A1A", fontSize: "18px" }}
                      >
                        {book.title}
                      </h3>

                      {book.author && (
                        <p style={{ color: "#B8963E", fontSize: "14px", marginBottom: "12px" }}>
                          by {book.author}
                        </p>
                      )}

                      {book.description && (
                        <p
                          style={{ color: "#2C3E50", fontSize: "14px", lineHeight: 1.6, marginBottom: "16px" }}
                        >
                          {book.description}
                        </p>
                      )}

                      <div className="flex gap-2 pt-4 border-t border-gray-200">
                        {book.purchaseUrl && (
                          <Button
                            onClick={() => handleAmazonLink(book.purchaseUrl!)}
                            variant="outline"
                            className="flex-1 flex items-center justify-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Amazon
                          </Button>
                        )}
                        <Button
                          onClick={() => handleBuyBook(book.id, book.title)}
                          disabled={loadingBookId === book.id}
                          className="flex-1 flex items-center justify-center gap-2"
                          style={{ backgroundColor: "#B8963E" }}
                        >
                          {loadingBookId === book.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" />
                              Buy
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Books */}
          {recommendedBooks.length > 0 && (
            <div>
              <div className="font-ui text-xs font-medium uppercase tracking-[0.15em] mb-12" style={{ color: "#B8963E" }}>
                Recommended Reading
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    {book.coverImage && (
                      <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <h3
                        className="font-display font-bold mb-2"
                        style={{ color: "#1A1A1A", fontSize: "18px" }}
                      >
                        {book.title}
                      </h3>

                      {book.author && (
                        <p style={{ color: "#B8963E", fontSize: "14px", marginBottom: "12px" }}>
                          by {book.author}
                        </p>
                      )}

                      {book.description && (
                        <p
                          style={{ color: "#2C3E50", fontSize: "14px", lineHeight: 1.6, marginBottom: "16px" }}
                        >
                          {book.description}
                        </p>
                      )}

                      {book.purchaseUrl && (
                        <Button
                          onClick={() => handleAmazonLink(book.purchaseUrl!)}
                          className="w-full flex items-center justify-center gap-2"
                          style={{ backgroundColor: "#B8963E" }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Get on Amazon
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!authoredBooks.length && !recommendedBooks.length && (
            <div className="text-center py-12">
              <p style={{ color: "#6B7280", fontSize: "16px" }}>No books available yet.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
