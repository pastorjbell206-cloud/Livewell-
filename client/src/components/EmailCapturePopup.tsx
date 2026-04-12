import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Mail } from "lucide-react";

interface EmailCapturePopupProps {
  triggerAfterSeconds?: number;
  articleTitle?: string;
}

export function EmailCapturePopup({
  triggerAfterSeconds = 120,
  articleTitle,
}: EmailCapturePopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const addSubscriberMutation = trpc.subscribers.subscribe.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
      }, 2000);
    },
    onError: () => {
      setIsSubmitting(false);
    },
  });

  useEffect(() => {
    // Check if user has already seen this popup
    const hasSeenPopup = localStorage.getItem("emailCapturePopupSeen");
    if (hasSeenPopup) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      localStorage.setItem("emailCapturePopupSeen", "true");
    }, triggerAfterSeconds * 1000);

    return () => clearTimeout(timer);
  }, [triggerAfterSeconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    await addSubscriberMutation.mutateAsync({ email });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="relative w-full max-w-md rounded-lg shadow-xl p-8"
        style={{ backgroundColor: "#F7F5F0" }}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1 hover:bg-gray-200 rounded-full transition"
        >
          <X size={20} style={{ color: "#6B7280" }} />
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className="mb-6 text-center">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                style={{ backgroundColor: "#B8963E" }}
              >
                <Mail size={24} style={{ color: "#F7F5F0" }} />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
                Join the Community
              </h2>
              <p style={{ color: "#6B7280" }}>
                Get weekly essays on faith, culture, and the Christian life delivered to your inbox.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  style={{
                    borderColor: "#D1C9BB",
                    backgroundColor: "white",
                  }}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="w-full"
                style={{
                  backgroundColor: "#1A1A1A",
                  color: "#F7F5F0",
                }}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>

              <p style={{ color: "#6B7280", fontSize: "0.875rem", textAlign: "center" }}>
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div style={{ flex: 1, height: "1px", backgroundColor: "#D1C9BB" }} />
              <span style={{ color: "#6B7280", fontSize: "0.875rem" }}>or</span>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#D1C9BB" }} />
            </div>

            {/* Close option */}
            <button
              onClick={() => setIsOpen(false)}
              style={{ color: "#6B7280" }}
              className="w-full text-center text-sm hover:underline"
            >
              Maybe later
            </button>
          </>
        ) : (
          /* Success message */
          <div className="text-center py-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ backgroundColor: "#ECFDF5" }}
            >
              <Mail size={32} style={{ color: "#10B981" }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
              Welcome!
            </h3>
            <p style={{ color: "#6B7280" }}>
              Check your email for a welcome message. See you in your inbox!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
