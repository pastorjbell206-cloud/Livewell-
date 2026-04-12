import { useState } from "react";
import { Mail, X, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface PillarsEmailSignupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PillarsEmailSignup({ isOpen, onClose }: PillarsEmailSignupProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const subscribeMutation = trpc.email.subscribe.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await subscribeMutation.mutateAsync({ email });
      setSubmitted(true);
      setTimeout(() => {
        setEmail("");
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 relative"
        style={{ backgroundColor: "#F7F5F0" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X size={20} style={{ color: "#6B7280" }} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <Mail size={24} style={{ color: "#B8963E" }} />
          <h2 className="font-display text-2xl font-bold" style={{ color: "#1A1A1A" }}>
            Understanding the 5 Pillars
          </h2>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle size={48} style={{ color: "#B8963E" }} className="mx-auto mb-4" />
            <p className="font-body text-lg mb-2" style={{ color: "#2D4A3E" }}>
              Check your email!
            </p>
            <p className="font-body text-sm" style={{ color: "#6B7280" }}>
              Your free guide is on the way.
            </p>
          </div>
        ) : (
          <>
            <p className="font-body text-base mb-6" style={{ color: "#6B7280" }}>
              Get a free PDF guide explaining all 5 pillars of LiveWell and how to use them to transform your spiritual life.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded border font-body"
                style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
              />
              <button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="w-full py-3 rounded font-ui font-medium transition-all text-white disabled:opacity-50"
                style={{ backgroundColor: "#B8963E" }}
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Get Free Guide"}
              </button>
              {subscribeMutation.isError && (
                <p className="text-red-600 text-sm text-center">
                  {subscribeMutation.error?.message || "Failed to subscribe"}
                </p>
              )}
            </form>

            <p className="font-ui text-xs text-center mt-4" style={{ color: "#6B7280" }}>
              We respect your privacy. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
