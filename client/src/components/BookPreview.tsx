import { X } from "lucide-react";

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
      >
        {/* Modal Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b" style={{ borderColor: "#E5E7EB" }}>
          <h2 className="font-display text-xl font-bold" style={{ color: "#1A1A1A" }}>
            Sample Chapter
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
          >
            <X size={24} style={{ color: "#1A1A1A" }} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8">
          <h3 className="font-display text-lg font-bold mb-6" style={{ color: "#1A1A1A" }}>
            {title}
          </h3>

          {excerpt ? (
            <div
              className="font-body text-base leading-relaxed"
              style={{ color: "#2C3E50" }}
            >
              {excerpt.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-body text-base" style={{ color: "#6B7280" }}>
                Sample chapter coming soon. Check back later for a preview of this book.
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: "#E5E7EB" }}>
            <p className="font-ui text-sm" style={{ color: "#6B7280" }}>
              This is a sample excerpt. Purchase the full book to read the complete content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
