import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface BookPreviewProps {
  title: string;
  excerpt?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookPreview({
  title,
  excerpt,
  isOpen,
  onClose,
}: BookPreviewProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Dialog keyboard contract (house pattern, see CommandPalette): Escape
  // closes; focus moves to the close button on open and returns to the
  // opener on close (the browser restores it to the previously focused
  // element once the dialog unmounts and we blurred into it).
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-in zoom-in-95 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Sample chapter: ${title}`}
      >
        {/* Modal Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--bone-muted)" }}>
          <h2 className="font-display text-xl font-bold" style={{ color: "var(--ink)", fontFamily: "var(--F)" }}>
            Sample Chapter
          </h2>
          <button
            ref={closeRef}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            aria-label="Close sample chapter"
          >
            <X size={24} style={{ color: "var(--ink)" }} aria-hidden="true" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8">
          <h3 className="font-display text-lg font-bold mb-6" style={{ color: "var(--ink)", fontFamily: "var(--F)" }}>
            {title}
          </h3>

          {excerpt ? (
            <div
              className="font-body text-base leading-relaxed"
              style={{ color: "var(--ink)", fontFamily: "var(--B)" }}
            >
              {excerpt.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-body text-base" style={{ color: "var(--ink-muted)", fontFamily: "var(--B)" }}>
                Sample chapter coming soon. Check back later for a preview of this book.
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--bone-muted)" }}>
            <p className="font-ui text-sm" style={{ color: "var(--ink-muted)", fontFamily: "var(--U)" }}>
              This is a sample excerpt. Purchase the full book to read the complete content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
