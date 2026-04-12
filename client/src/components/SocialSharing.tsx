import { Twitter, Linkedin, Facebook, Copy, Check } from "lucide-react";
import { useState } from "react";

interface SocialSharingProps {
  title: string;
  url: string;
  excerpt?: string;
}

export function SocialSharing({ title, url, excerpt }: SocialSharingProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    const text = `${title} - ${excerpt || ""}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
  };

  const shareLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, "_blank", "width=550,height=420");
  };

  const shareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, "_blank", "width=550,height=420");
  };

  return (
    <div className="flex items-center gap-3 py-4">
      <span style={{ color: "#6B7280", fontSize: "14px", fontWeight: 500 }}>Share:</span>
      
      <button
        onClick={shareTwitter}
        className="p-2 rounded hover:bg-gray-100 transition-colors"
        title="Share on Twitter"
        aria-label="Share on Twitter"
      >
        <Twitter size={18} style={{ color: "#1A1A1A" }} />
      </button>

      <button
        onClick={shareLinkedIn}
        className="p-2 rounded hover:bg-gray-100 transition-colors"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={18} style={{ color: "#1A1A1A" }} />
      </button>

      <button
        onClick={shareFacebook}
        className="p-2 rounded hover:bg-gray-100 transition-colors"
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <Facebook size={18} style={{ color: "#1A1A1A" }} />
      </button>

      <button
        onClick={handleCopyLink}
        className="p-2 rounded hover:bg-gray-100 transition-colors"
        title="Copy link"
        aria-label="Copy link"
      >
        {copied ? (
          <Check size={18} style={{ color: "#B8963E" }} />
        ) : (
          <Copy size={18} style={{ color: "#1A1A1A" }} />
        )}
      </button>
    </div>
  );
}
