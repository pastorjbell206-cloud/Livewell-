import { Share2, MessageCircle, Send } from "lucide-react";

interface MobileDeepLinksProps {
  articleTitle: string;
  articleUrl: string;
  articleExcerpt?: string;
}

export function MobileDeepLinks({ articleTitle, articleUrl, articleExcerpt = "" }: MobileDeepLinksProps) {
  const encodedTitle = encodeURIComponent(articleTitle);
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedExcerpt = encodeURIComponent(articleExcerpt);

  const deepLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedTitle}%0A${encodedUrl}`,
      color: "#25D366",
    },
    {
      name: "Telegram",
      icon: Send,
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: "#0088cc",
    },
    {
      name: "iMessage",
      icon: MessageCircle,
      url: `sms:?body=${encodedTitle}%0A${encodedUrl}`,
      color: "#34C759",
    },
  ];

  return (
    <div className="my-8 p-6 rounded-lg border bg-white" style={{ borderColor: "#D1C9BB" }}>
      <div className="flex items-center gap-2 mb-4">
        <Share2 size={18} style={{ color: "#B8963E" }} />
        <h4 className="font-bold" style={{ color: "#1A1A1A" }}>
          Share to Apps
        </h4>
      </div>

      <div className="flex flex-wrap gap-3">
        {deepLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all hover:opacity-80"
              style={{ backgroundColor: link.color, color: "#FFFFFF" }}
              title={`Share to ${link.name}`}
            >
              <Icon size={16} />
              {link.name}
            </a>
          );
        })}
      </div>

      <p className="text-xs mt-4" style={{ color: "#6B7280" }}>
        Share this article directly to messaging apps on your phone
      </p>
    </div>
  );
}
