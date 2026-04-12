import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface ExitIntentModalProps {
  articlePillar?: string;
  articleTitle?: string;
}

export function ExitIntentModal({ articlePillar = "Leadership Formation", articleTitle = "" }: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Map pillars to lead magnets
  const pillarToLeadMagnet: Record<string, { title: string; description: string; cta: string; href: string }> = {
    "Prophetic Disruption": {
      title: "Prophetic Manifesto",
      description: "5 principles for speaking truth in a compromised culture",
      cta: "Get the Manifesto",
      href: "/lead-magnets/prophetic-manifesto",
    },
    "Theological Depth": {
      title: "Theology Workbook",
      description: "Deep dive into biblical foundations for Christian living",
      cta: "Download Workbook",
      href: "/lead-magnets/theology-workbook",
    },
    "Prophetic Justice": {
      title: "Community Action Roadmap",
      description: "Practical steps for justice-oriented ministry",
      cta: "Get the Roadmap",
      href: "/lead-magnets/community-action-roadmap",
    },
    "Integrated Life": {
      title: "Life Diagnostic",
      description: "Assess your spiritual, relational, and vocational health",
      cta: "Take the Diagnostic",
      href: "/lead-magnets/life-diagnostic",
    },
    "Leadership Formation": {
      title: "Leadership Audit",
      description: "Evaluate your leadership effectiveness and growth areas",
      cta: "Start the Audit",
      href: "/lead-magnets/leadership-audit",
    },
  };

  const leadMagnet = pillarToLeadMagnet[articlePillar] || pillarToLeadMagnet["Leadership Formation"];

  useEffect(() => {
    if (hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from top of page
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full shadow-2xl">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X size={20} style={{ color: "#6B7280" }} />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Headline */}
          <h2 className="font-display font-bold text-2xl mb-3" style={{ color: "#1A1A1A" }}>
            Wait! Don't Go Yet
          </h2>

          {/* Subheading */}
          <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
            Before you leave, grab this free resource tailored to what you're reading:
          </p>

          {/* Lead magnet offer */}
          <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: "#F7F5F0" }}>
            <h3 className="font-bold mb-2" style={{ color: "#1A1A1A" }}>
              {leadMagnet.title}
            </h3>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              {leadMagnet.description}
            </p>
          </div>

          {/* CTA Button */}
          <Link
            href={leadMagnet.href}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded transition-all hover:opacity-90 mb-3"
            style={{ backgroundColor: "#B8963E", color: "#F7F5F0" }}
          >
            {leadMagnet.cta}
            <ArrowRight size={18} />
          </Link>

          {/* Alternative CTA */}
          <button
            onClick={() => setIsVisible(false)}
            className="w-full px-6 py-3 font-medium rounded text-sm transition-colors hover:bg-gray-100"
            style={{ color: "#6B7280" }}
          >
            No thanks, I'll continue reading
          </button>
        </div>
      </div>
    </div>
  );
}
