import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Mail, Twitter, Instagram, Globe } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";

interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  longBio: string;
  image?: string;
  role: string;
  email?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  articles: Array<{
    id: number;
    slug: string;
    title: string;
    excerpt?: string;
    pillar: string;
    readTime?: number;
    createdAt?: Date;
  }>;
}

const AUTHORS: Record<string, Author> = {
  "james-bell": {
    id: "1",
    name: "James Bell",
    slug: "james-bell",
    bio: "Pastor, author, and theological voice for the thinking Christian",
    longBio: "James Bell writes, teaches, and leads from one conviction: behavior modification was never the point. Heart transformation is. With decades of pastoral experience and a passion for theological depth, James brings both intellectual rigor and pastoral compassion to every piece of writing. He is the founder of LiveWell and the Pastors Connection Network.",
    role: "Founder & Primary Author",
    email: "james@livewellblog.com",
    twitter: "https://twitter.com/jamesbell",
    instagram: "https://instagram.com/jamesbell",
    website: "https://livewellblog.com",
    articles: [
      {
        id: 1,
        slug: "the-calling",
        title: "The Calling",
        excerpt: "Understanding your pastoral calling and how to stay faithful to it.",
        pillar: "Leadership Formation",
        readTime: 8,
      },
      {
        id: 2,
        slug: "burnout-warning-signs",
        title: "Burnout: Warning Signs and Recovery",
        excerpt: "Recognizing the signs of burnout before it's too late.",
        pillar: "Leadership Formation",
        readTime: 7,
      },
    ],
  },
  "pcn": {
    id: "2",
    name: "Pastors Connection Network",
    slug: "pcn",
    bio: "Collective wisdom from pastoral leaders across the globe",
    longBio: "The Pastors Connection Network is a community of pastoral leaders committed to theological depth, spiritual formation, and prophetic witness. Through collaborative writing and shared resources, PCN provides a platform for voices that challenge the church to think deeply and act faithfully.",
    role: "Contributing Authors",
    website: "https://pastorsconnectionnetwork.com",
    articles: [
      {
        id: 3,
        slug: "prayer-discipline",
        title: "Prayer as Discipline",
        excerpt: "Building a sustainable prayer life in the midst of ministry demands.",
        pillar: "Leadership Formation",
        readTime: 6,
      },
    ],
  },
};

export function AuthorProfile() {
  const [match, params] = useRoute("/authors/:slug");

  if (!match) {
    return (
      <div className="container py-12 text-center">
        <p className="text-muted-foreground">Author not found</p>
      </div>
    );
  }

  const author = AUTHORS[params?.slug as string];

  if (!author) {
    return (
      <div className="container py-12">
        <Link href="/writing">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </Link>
        <p className="text-muted-foreground">Author not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card py-12">
        <div className="container">
          <Link href="/writing">
            <Button variant="ghost" className="mb-6 -ml-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Button>
          </Link>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Author Info */}
            <div className="md:col-span-2">
              <h1 className="mb-2 text-4xl font-bold text-foreground">
                {author.name}
              </h1>
              <p className="mb-4 text-lg font-semibold text-[#B8963E]">
                {author.role}
              </p>
              <p className="mb-6 text-lg text-muted-foreground">
                {author.longBio}
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3">
                {author.email && (
                  <a href={`mailto:${author.email}`}>
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                  </a>
                )}
                {author.twitter && (
                  <a href={author.twitter} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter
                    </Button>
                  </a>
                )}
                {author.instagram && (
                  <a href={author.instagram} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Instagram className="mr-2 h-4 w-4" />
                      Instagram
                    </Button>
                  </a>
                )}
                {author.website && (
                  <a href={author.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Globe className="mr-2 h-4 w-4" />
                      Website
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="rounded-lg border border-border bg-background p-6">
              <div className="mb-6">
                <div className="text-3xl font-bold text-[#B8963E]">
                  {author.articles.length}
                </div>
                <p className="text-sm text-muted-foreground">Articles Published</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#B8963E]">
                  {Math.round(
                    author.articles.reduce((sum, a) => sum + (a.readTime || 5), 0) / 5
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Hours of Reading</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="container py-12">
        <h2 className="mb-8 text-3xl font-bold text-foreground">
          Articles by {author.name}
        </h2>

        {author.articles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {author.articles.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                slug={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                pillar={article.pillar}
                readTime={article.readTime}
                author={author.name}
                date={
                  article.createdAt
                    ? new Date(article.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : undefined
                }
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              No articles published yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
