import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Lock } from "lucide-react";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  magnetId: string;
  cta?: string;
}

export function EmailCaptureModal({
  isOpen,
  onClose,
  title,
  description,
  magnetId,
  cta = "Get Instant Access",
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/lead-magnets/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, magnetId }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setEmail("");
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-md w-full shadow-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-4">
              <p className="text-green-600 font-semibold mb-2">✓ Check your email!</p>
              <p className="text-sm text-muted-foreground">
                We've sent your guide to {email}
              </p>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-4">{description}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Sending..." : cta}
                </Button>
                <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  Your email is safe. No spam.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
