import { ArrowRight, BookOpen, Mail, Share2 } from "lucide-react";
import { Link } from "wouter";

interface PostArticleCTAProps {
  articleTitle: string;
  articleSlug: string;
  pillar: string;
}

export function PostArticleCTA({ articleTitle, articleSlug, pillar }: PostArticleCTAProps) {
  return (
    <div className="my-16 py-12 border-t border-b" style={{ borderColor: "#D1C9BB" }}>
      {/* Main CTA Section */}
      <div className="mb-12">
        <h3 className="font-display font-bold text-2xl mb-4" style={{ color: "#1A1A1A" }}>
          Continue Your Journey
        </h3>
        <p className="text-lg mb-6" style={{ color: "#6B7280" }}>
          Ready to explore more on {pillar}? Discover our curated reading paths and deepen your understanding.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/reading-paths"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded transition-all hover:opacity-90"
            style={{ backgroundColor: "#B8963E", color: "#F7F5F0" }}
          >
            <BookOpen size={18} />
            Explore Reading Paths
            <ArrowRight size={18} />
          </Link>
          
          <a
            href="#subscribe"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded border transition-all hover:opacity-90"
            style={{ borderColor: "#B8963E", color: "#B8963E" }}
          >
            <Mail size={18} />
            Get Weekly Essays
          </a>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-t" style={{ borderColor: "#D1C9BB" }}>
        <div className="text-center">
          <div className="text-2xl font-bold mb-1" style={{ color: "#B8963E" }}>
            225+
          </div>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Articles Across 5 Pillars
          </p>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold mb-1" style={{ color: "#B8963E" }}>
            1,200+
          </div>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Substack Subscribers
          </p>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold mb-1" style={{ color: "#B8963E" }}>
            12+
          </div>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Countries Represented
          </p>
        </div>
      </div>

      {/* Share Section */}
      <div className="mt-8 pt-8 border-t" style={{ borderColor: "#D1C9BB" }}>
        <p className="text-sm font-medium mb-4" style={{ color: "#6B7280" }}>
          Share this article:
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text="${articleTitle}" by James Bell&url=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all hover:opacity-75"
            style={{ backgroundColor: "#F7F5F0", color: "#1A1A1A" }}
          >
            <Share2 size={16} />
            Twitter
          </a>
          
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all hover:opacity-75"
            style={{ backgroundColor: "#F7F5F0", color: "#1A1A1A" }}
          >
            <Share2 size={16} />
            LinkedIn
          </a>
          
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all hover:opacity-75"
            style={{ backgroundColor: "#F7F5F0", color: "#1A1A1A" }}
          >
            <Share2 size={16} />
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
