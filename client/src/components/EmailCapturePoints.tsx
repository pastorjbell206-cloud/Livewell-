import { useState } from "react";
import { EmailCaptureModal } from "./EmailCaptureModal";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface EmailCapturePointProps {
  location: "reading-path" | "article-detail" | "exit-intent" | "inline";
  magnetId?: string;
  title?: string;
  description?: string;
}

export function EmailCapturePoint({
  location,
  magnetId = "leadership-audit",
  title = "Get our free guide",
  description = "Join 5,000+ readers getting weekly insights",
}: EmailCapturePointProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Exit intent trigger
  if (location === "exit-intent") {
    return (
      <EmailCaptureModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        description={description}
        magnetId={magnetId}
      />
    );
  }

  // Inline capture (sidebar or section)
  if (location === "inline") {
    return (
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2C3E50] rounded-lg p-6 text-white">
        <div className="flex items-start gap-3 mb-4">
          <Mail className="w-6 h-6 text-[#B8963E] flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            <p className="text-sm text-gray-300">{description}</p>
          </div>
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="w-full bg-[#B8963E] hover:bg-[#9d7d35] text-white"
        >
          Get Free Access
        </Button>
        <EmailCaptureModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={title}
          description={description}
          magnetId={magnetId}
        />
      </div>
    );
  }

  // Reading path or article detail
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full"
      >
        <Mail className="w-4 h-4 mr-2" />
        {title}
      </Button>
      <EmailCaptureModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        description={description}
        magnetId={magnetId}
      />
    </>
  );
}

/**
 * Hook to track email capture events
 */
export function useEmailCapture() {
  const trackCapture = (magnetId: string, location: string) => {
    // Track analytics event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "email_capture", {
        magnet_id: magnetId,
        location: location,
      });
    }
  };

  return { trackCapture };
}
