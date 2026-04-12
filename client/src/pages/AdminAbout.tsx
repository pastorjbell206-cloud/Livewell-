import AdminLayout from "@/components/AdminLayout";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminAbout() {
  const [location, navigate] = useLocation();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getSettingQuery = trpc.settings.get.useQuery({ key: "aboutContent" });
  const setSettingMutation = trpc.settings.set.useMutation();

  useEffect(() => {
    if (getSettingQuery.data) {
      setContent(getSettingQuery.data || "");
    }
  }, [getSettingQuery.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await setSettingMutation.mutateAsync({ key: "aboutContent", value: content });
      toast.success("About page updated");
    } catch (err) {
      toast.error("Failed to save about page");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="font-display text-4xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
          About Page
        </h1>
        <p className="font-body mb-8" style={{ color: "#6B7280" }}>
          Edit the content that appears on your About page. Use Markdown for formatting.
        </p>

        <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
          {/* Content Editor */}
          <div>
            <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              About Content (Markdown)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded border font-mono text-sm"
              style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
              rows={16}
              placeholder="Write your about page content here in Markdown..."
            />
            <p className="font-ui text-xs mt-2" style={{ color: "#6B7280" }}>
              Supports Markdown formatting: **bold**, *italic*, # headings, - lists, [links](url), etc.
            </p>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading || getSettingQuery.isLoading}
              className="flex items-center gap-2 px-6 py-3 rounded font-ui font-medium transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "#1A1A1A", color: "#F7F5F0" }}
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save About Page
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
