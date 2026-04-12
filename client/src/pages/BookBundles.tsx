import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ShoppingCart, Gift } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

interface BookInBundle {
  id: number;
  title: string;
  author: string;
  cover?: string;
}

interface BookBundle {
  id: string;
  title: string;
  description: string;
  icon: string;
  regularPrice: number;
  bundlePrice: number;
  savings: number;
  books: BookInBundle[];
}

const BUNDLES: BookBundle[] = [
  {
    id: "1",
    title: "Church Leadership Essentials",
    description: "Everything a pastor needs to know about leadership, governance, and vision",
    icon: "👥",
    regularPrice: 59.97,
    bundlePrice: 39.99,
    savings: 19.98,
    books: [
      { id: 1, title: "What Elders Are For", author: "James Bell" },
      { id: 2, title: "Qualified", author: "James Bell" },
      { id: 3, title: "Finding and Installing Elders", author: "James Bell" },
      { id: 4, title: "When Elders Disagree", author: "PCN" },
    ],
  },
  {
    id: "2",
    title: "Pastoral Health & Wellness",
    description: "Protect your health, prevent burnout, and sustain your calling",
    icon: "💪",
    regularPrice: 49.97,
    bundlePrice: 29.99,
    savings: 19.98,
    books: [
      { id: 5, title: "The Patient Pastor", author: "PCN" },
      { id: 6, title: "The Hidden Life", author: "PCN" },
      { id: 7, title: "Mind, Body, Soul", author: "PCN" },
    ],
  },
  {
    id: "3",
    title: "Marriage & Family in Ministry",
    description: "Strengthen your marriage and protect your family while serving",
    icon: "❤️",
    regularPrice: 39.98,
    bundlePrice: 24.99,
    savings: 14.99,
    books: [
      { id: 8, title: "The Honest Marriage", author: "James Bell" },
      { id: 9, title: "The Pastor's Family", author: "LiveWell" },
      { id: 10, title: "Staying", author: "James Bell" },
    ],
  },
  {
    id: "4",
    title: "Complete Governance Bundle",
    description: "Master church governance, deacons, and organizational health",
    icon: "⚖️",
    regularPrice: 69.97,
    bundlePrice: 44.99,
    savings: 24.98,
    books: [
      { id: 11, title: "What Deacons Actually Do", author: "PCN" },
      { id: 12, title: "Deacon Qualifications & Selection", author: "PCN" },
      { id: 13, title: "Church Governance That Works", author: "PCN" },
      { id: 14, title: "Solo Pastor and His Board", author: "PCN" },
    ],
  },
  {
    id: "5",
    title: "Change Management Series",
    description: "Navigate change in your church without losing people or your mind",
    icon: "🔄",
    regularPrice: 39.98,
    bundlePrice: 24.99,
    savings: 14.99,
    books: [
      { id: 15, title: "Change Without Casualties", author: "PCN" },
      { id: 16, title: "Changing the Unchangeable", author: "PCN" },
    ],
  },
  {
    id: "6",
    title: "Complete James Bell Collection",
    description: "All of James Bell's books - the complete works",
    icon: "📚",
    regularPrice: 149.95,
    bundlePrice: 89.99,
    savings: 59.96,
    books: [
      { id: 17, title: "What Elders Are For", author: "James Bell" },
      { id: 18, title: "Qualified", author: "James Bell" },
      { id: 19, title: "Finding and Installing Elders", author: "James Bell" },
      { id: 20, title: "When God Bless America Replaces Thy Kingdom Come", author: "James Bell" },
      { id: 21, title: "The Monster in the Mirror", author: "James Bell" },
      { id: 22, title: "The Honest Marriage", author: "James Bell" },
      { id: 23, title: "Staying", author: "James Bell" },
    ],
  },
];

export function BookBundles() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card py-12">
        <div className="container">
          <Breadcrumb items={[{ label: "Books" }, { label: "Bundles" }]} className="mb-6" />

          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Book Bundles
          </h1>
          <p className="text-lg text-muted-foreground">
            Save up to 40% when you buy books together. Curated collections on specific topics.
          </p>
        </div>
      </div>

      {/* Bundles Grid */}
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {BUNDLES.map((bundle) => {
            const savingsPercent = Math.round(
              ((bundle.regularPrice - bundle.bundlePrice) / bundle.regularPrice) * 100
            );

            return (
              <div
                key={bundle.id}
                className="rounded-lg border border-border bg-card p-8 hover:shadow-lg transition-shadow relative overflow-hidden"
              >
                {/* Savings Badge */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Save {savingsPercent}%
                </div>

                {/* Header */}
                <div className="mb-6">
                  <div className="mb-4 text-5xl">{bundle.icon}</div>
                  <h2 className="mb-2 text-2xl font-bold text-foreground">
                    {bundle.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {bundle.description}
                  </p>
                </div>

                {/* Books List */}
                <div className="mb-6 space-y-2 border-t border-border pt-6">
                  <p className="text-sm font-semibold text-foreground">
                    Includes {bundle.books.length} books:
                  </p>
                  <ul className="space-y-1">
                    {bundle.books.map((book) => (
                      <li
                        key={book.id}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-[#B8963E] mt-1">•</span>
                        <div>
                          <span className="font-medium text-foreground">
                            {book.title}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">
                            by {book.author}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="mb-6 border-t border-border pt-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <div className="text-3xl font-bold text-[#B8963E]">
                      ${bundle.bundlePrice.toFixed(2)}
                    </div>
                    <div className="text-lg text-muted-foreground line-through">
                      ${bundle.regularPrice.toFixed(2)}
                    </div>
                  </div>
                  <p className="text-sm text-green-600 font-semibold">
                    You save ${bundle.savings.toFixed(2)}
                  </p>
                </div>

                {/* CTA */}
                <Button className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 rounded-lg border border-border bg-card p-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground flex items-center gap-2">
            <Gift className="text-[#B8963E]" />
            Why Buy Bundles?
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-[#B8963E] font-bold">✓</span>
              <span>Save up to 40% compared to buying books individually</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#B8963E] font-bold">✓</span>
              <span>Curated collections on specific topics for focused learning</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#B8963E] font-bold">✓</span>
              <span>Perfect for small groups, church libraries, or personal study</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#B8963E] font-bold">✓</span>
              <span>Lifetime access to all books in your bundle</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
