import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Download, DollarSign } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";

interface ArticleInCollection {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  pillar: string;
  readTime?: number;
  author?: string;
}

interface ArticleCollection {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  price: number;
  articles: ArticleInCollection[];
  downloadUrl?: string;
}

const COLLECTIONS: ArticleCollection[] = [
  {
    id: "1",
    slug: "pastoral-health",
    title: "Pastoral Health & Wellness",
    description: "A comprehensive guide to maintaining physical, emotional, and spiritual health in ministry",
    icon: "💪",
    price: 9.99,
    articles: [
      {
        id: 1,
        slug: "burnout-warning-signs",
        title: "Burnout: Warning Signs and Recovery",
        excerpt: "Recognizing the signs of burnout before it's too late.",
        pillar: "Leadership Formation",
        readTime: 7,
        author: "James Bell",
      },
      {
        id: 2,
        slug: "prayer-discipline",
        title: "Prayer as Discipline",
        excerpt: "Building a sustainable prayer life in the midst of ministry demands.",
        pillar: "Leadership Formation",
        readTime: 6,
        author: "James Bell",
      },
      {
        id: 3,
        slug: "sabbath-rest",
        title: "Sabbath: The Rhythm of Rest",
        excerpt: "Why rest is not laziness but obedience to God's design.",
        pillar: "Integrated Life",
        readTime: 8,
        author: "James Bell",
      },
    ],
  },
  {
    id: "2",
    slug: "leadership-essentials",
    title: "Leadership Essentials for Pastors",
    description: "Core principles for effective, faithful pastoral leadership",
    icon: "👥",
    price: 12.99,
    articles: [
      {
        id: 4,
        slug: "the-calling",
        title: "The Calling",
        excerpt: "Understanding your pastoral calling and how to stay faithful to it.",
        pillar: "Leadership Formation",
        readTime: 8,
        author: "James Bell",
      },
      {
        id: 5,
        slug: "vision-casting",
        title: "Vision Casting Without Manipulation",
        excerpt: "Leading people toward God's vision with integrity.",
        pillar: "Leadership Formation",
        readTime: 7,
        author: "James Bell",
      },
      {
        id: 6,
        slug: "difficult-conversations",
        title: "Having Difficult Conversations",
        excerpt: "Navigating conflict with wisdom and grace.",
        pillar: "Leadership Formation",
        readTime: 6,
        author: "PCN",
      },
    ],
  },
  {
    id: "3",
    slug: "marriage-family-ministry",
    title: "Marriage & Family in Ministry",
    description: "Protecting and strengthening your marriage and family while serving in ministry",
    icon: "❤️",
    price: 11.99,
    articles: [
      {
        id: 7,
        slug: "marriage-ministry-strain",
        title: "Marriage in Ministry: Common Strains",
        excerpt: "Understanding the unique pressures on pastoral marriages.",
        pillar: "Integrated Life",
        readTime: 7,
        author: "James Bell",
      },
      {
        id: 8,
        slug: "pastors-kids",
        title: "Pastors' Kids: Protecting from Expectations",
        excerpt: "Raising children in ministry without burdening them.",
        pillar: "Integrated Life",
        readTime: 6,
        author: "PCN",
      },
      {
        id: 9,
        slug: "ministry-spouse",
        title: "The Ministry Spouse: Finding Identity",
        excerpt: "Supporting your spouse's unique role and needs.",
        pillar: "Integrated Life",
        readTime: 5,
        author: "James Bell",
      },
    ],
  },
  {
    id: "4",
    slug: "prophetic-witness",
    title: "Prophetic Witness in Culture",
    description: "Speaking truth in a confused age with courage and clarity",
    icon: "🔥",
    price: 10.99,
    articles: [
      {
        id: 10,
        slug: "prophetic-disruption",
        title: "Prophetic Disruption: What Needs Challenging",
        excerpt: "Identifying comfortable assumptions that need to be questioned.",
        pillar: "Prophetic Disruption",
        readTime: 8,
        author: "James Bell",
      },
      {
        id: 11,
        slug: "prophetic-justice",
        title: "Prophetic Justice: What Needs Naming",
        excerpt: "Speaking to injustice with biblical clarity.",
        pillar: "Prophetic Justice",
        readTime: 7,
        author: "PCN",
      },
      {
        id: 12,
        slug: "cultural-engagement",
        title: "Cultural Engagement Without Compromise",
        excerpt: "Engaging culture faithfully as a Christian leader.",
        pillar: "Prophetic Justice",
        readTime: 6,
        author: "James Bell",
      },
    ],
  },
  {
    id: "5",
    slug: "spiritual-formation",
    title: "Spiritual Formation & Prayer",
    description: "Deepening your interior life and prayer practice",
    icon: "📖",
    price: 9.99,
    articles: [
      {
        id: 13,
        slug: "prayer-foundation",
        title: "Prayer: The Foundation of Ministry",
        excerpt: "Why prayer must come before programs.",
        pillar: "Leadership Formation",
        readTime: 8,
        author: "James Bell",
      },
      {
        id: 14,
        slug: "scripture-meditation",
        title: "Scripture Meditation: Slow Reading",
        excerpt: "Encountering God through careful, contemplative reading.",
        pillar: "Leadership Formation",
        readTime: 6,
        author: "PCN",
      },
      {
        id: 15,
        slug: "solitude-silence",
        title: "Solitude & Silence: Essential Practices",
        excerpt: "Creating space to hear God's voice.",
        pillar: "Leadership Formation",
        readTime: 7,
        author: "James Bell",
      },
    ],
  },
];

export function ArticleCollections() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card py-12">
        <div className="container">
          <Link href="/resources">
            <Button variant="ghost" className="mb-6 -ml-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Button>
          </Link>

          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Article Collections
          </h1>
          <p className="text-lg text-muted-foreground">
            Curated collections of articles on specific topics, available for purchase as downloadable guides
          </p>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {COLLECTIONS.map((collection) => (
            <div
              key={collection.id}
              className="rounded-lg border border-border bg-card p-8 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="mb-6">
                <div className="mb-4 text-5xl">{collection.icon}</div>
                <h2 className="mb-2 text-2xl font-bold text-foreground">
                  {collection.title}
                </h2>
                <p className="text-muted-foreground">
                  {collection.description}
                </p>
              </div>

              {/* Articles Preview */}
              <div className="mb-6 space-y-2 border-t border-border pt-6">
                <p className="text-sm font-semibold text-foreground">
                  Includes {collection.articles.length} articles:
                </p>
                <ul className="space-y-1">
                  {collection.articles.map((article) => (
                    <li
                      key={article.id}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-[#B8963E] mt-1">•</span>
                      <span>{article.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="mb-6 flex items-center justify-between border-t border-border pt-6">
                <div className="text-sm text-muted-foreground">
                  {Math.round(
                    collection.articles.reduce((sum, a) => sum + (a.readTime || 5), 0) / 5
                  )}{" "}
                  hours of reading
                </div>
                <div className="text-2xl font-bold text-[#B8963E]">
                  ${collection.price.toFixed(2)}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <Button className="flex-1" variant="outline">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Buy Now
                </Button>
                <Button className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 rounded-lg border border-border bg-card p-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            What You Get
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-[#B8963E] font-bold">✓</span>
              <span>Curated articles on a specific topic</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#B8963E] font-bold">✓</span>
              <span>Professional PDF formatting for easy reading</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#B8963E] font-bold">✓</span>
              <span>Discussion questions for small groups</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#B8963E] font-bold">✓</span>
              <span>Lifetime access to download anytime</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
