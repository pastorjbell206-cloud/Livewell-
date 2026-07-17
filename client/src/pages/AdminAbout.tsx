import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Loader2, Save, Check, Circle } from "lucide-react";
import { toast } from "sonner";
import { Markdown } from "@/components/Markdown";

type SaveState = "saved" | "unsaved" | "saving";

export default function AdminAbout() {
  const [content, setContent] = useState("");
  const [savedContent, setSavedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getSettingQuery = trpc.settings.get.useQuery({ key: "aboutContent" });
  const setSettingMutation = trpc.settings.set.useMutation();

  // Hydrate the editor from the loaded setting (guarded state adjustment
  // during render — see react.dev "You Might Not Need an Effect").
  const [hydratedFrom, setHydratedFrom] = useState<string | null>(null);
  if (getSettingQuery.data && getSettingQuery.data !== hydratedFrom) {
    setHydratedFrom(getSettingQuery.data);
    setContent(getSettingQuery.data || "");
    setSavedContent(getSettingQuery.data || "");
  }

  const saveState: SaveState = isLoading
    ? "saving"
    : content === savedContent
      ? "saved"
      : "unsaved";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await setSettingMutation.mutateAsync({ key: "aboutContent", value: content });
      setSavedContent(content);
      toast.success("About page updated");
    } catch {
      toast.error("Failed to save about page");
    } finally {
      setIsLoading(false);
    }
  };

  const saveIndicator: Record<SaveState, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
    saved: { label: "Saved", color: "var(--adm-ok-text)", bg: "var(--adm-ok-bg)", icon: <Check size={14} /> },
    unsaved: { label: "Unsaved changes", color: "var(--adm-warn-text)", bg: "var(--adm-warn-bg)", icon: <Circle size={10} stroke="none" style={{ fill: "var(--adm-warn)" }} /> },
    saving: { label: "Saving", color: "var(--adm-gray-strong)", bg: "var(--adm-gray-bg)", icon: <Loader2 size={14} className="animate-spin" /> },
  };
  const indicator = saveIndicator[saveState];

  return (
    <AdminLayout>
      <div>
        <h1 className="font-display text-4xl font-bold mb-2" style={{ color: "var(--charcoal)" }}>
          About Page
        </h1>
        <p className="font-body mb-8" style={{ color: "var(--adm-gray)" }}>
          Edit the content that appears on your About page. Use Markdown for formatting.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Editor + live preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Editor */}
            <div>
              <label className="block font-ui text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>
                About Content (Markdown)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 rounded border font-mono text-sm"
                style={{ borderColor: "var(--adm-line)", backgroundColor: "var(--card)", color: "var(--charcoal)" }}
                rows={20}
                placeholder="Write your about page content here in Markdown…"
              />
              <p className="font-ui text-xs mt-2" style={{ color: "var(--adm-gray)" }}>
                Supports Markdown formatting: **bold**, *italic*, # headings, - lists, [links](url), etc.
              </p>
            </div>

            {/* Preview */}
            <div>
              <label className="block font-ui text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>
                Live Preview
              </label>
              <div
                className="w-full px-4 py-3 rounded border overflow-auto prose prose-sm max-w-none"
                style={{ borderColor: "var(--adm-line)", backgroundColor: "var(--card)", color: "var(--charcoal)", minHeight: "0", height: "calc(20 * 1.5rem + 1.5rem)" }}
              >
                {content.trim() ? (
                  <Markdown>{content}</Markdown>
                ) : (
                  <p className="font-body text-sm" style={{ color: "var(--adm-gray)" }}>
                    Nothing to preview yet. Start typing on the left.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit + save state */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isLoading || getSettingQuery.isLoading || saveState === "saved"}
              className="flex items-center gap-2 px-6 py-3 rounded font-ui font-medium transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "var(--charcoal)", color: "var(--adm-bg)" }}
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save About Page
            </button>
            <span
              role="status"
              className="flex items-center gap-2 px-3 py-1.5 rounded font-ui text-sm font-medium"
              style={{ backgroundColor: indicator.bg, color: indicator.color }}
            >
              {indicator.icon}
              {indicator.label}
            </span>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
