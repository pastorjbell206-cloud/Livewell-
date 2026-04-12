import AdminLayout from "@/components/AdminLayout";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminResourceEditor() {
  const [location, navigate] = useLocation();
  const resourceIdMatch = location.match(/\/admin\/resources\/(\d+)\/edit/);
  const resourceId = resourceIdMatch ? parseInt(resourceIdMatch[1]) : null;

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    url: "",
    fileType: "",
    published: false,
  });

  const getResourceQuery = trpc.resources.getById.useQuery(
    { id: resourceId! },
    { enabled: !!resourceId }
  );

  const createResourceMutation = trpc.resources.create.useMutation();
  const updateResourceMutation = trpc.resources.update.useMutation();

  useEffect(() => {
    if (getResourceQuery.data) {
      setForm({
        title: getResourceQuery.data.title,
        description: getResourceQuery.data.description || "",
        category: getResourceQuery.data.category || "",
        url: getResourceQuery.data.url || "",
        fileType: getResourceQuery.data.fileType || "",
        published: getResourceQuery.data.published,
      });
    }
  }, [getResourceQuery.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("Title is required");
      return;
    }

    try {
      if (resourceId) {
        await updateResourceMutation.mutateAsync({ id: resourceId, ...form });
        toast.success("Resource updated");
      } else {
        await createResourceMutation.mutateAsync(form);
        toast.success("Resource created");
      }
      navigate("/admin/resources");
    } catch (err) {
      toast.error("Failed to save resource");
    }
  };

  const isLoading = getResourceQuery.isLoading || createResourceMutation.isPending || updateResourceMutation.isPending;

  return (
    <AdminLayout>
      <div>
        <h1 className="font-display text-4xl font-bold mb-8" style={{ color: "#1A1A1A" }}>
          {resourceId ? "Edit Resource" : "New Resource"}
        </h1>

        <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
          {/* Title */}
          <div>
            <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 rounded border font-body"
              style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
              placeholder="Resource title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 rounded border font-body"
              style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
              rows={4}
              placeholder="What is this resource about?"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2 rounded border font-body"
              style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
            >
              <option value="">Select a category...</option>
              <option value="Study Guides">Study Guides</option>
              <option value="Sermon Series">Sermon Series</option>
              <option value="Discussion Guides">Discussion Guides</option>
              <option value="Worksheets">Worksheets</option>
              <option value="Videos">Videos</option>
              <option value="Audio">Audio</option>
            </select>
          </div>

          {/* File Type */}
          <div>
            <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              File Type
            </label>
            <select
              value={form.fileType}
              onChange={(e) => setForm({ ...form, fileType: e.target.value })}
              className="w-full px-4 py-2 rounded border font-body"
              style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
            >
              <option value="">Select a type...</option>
              <option value="PDF">PDF</option>
              <option value="Video">Video</option>
              <option value="Audio">Audio</option>
              <option value="Document">Document</option>
              <option value="Link">Link</option>
            </select>
          </div>

          {/* URL */}
          <div>
            <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              Download/Access URL
            </label>
            <input
              type="text"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="w-full px-4 py-2 rounded border font-body"
              style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
              placeholder="https://..."
            />
          </div>

          {/* Published */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            <label htmlFor="published" className="font-ui text-sm cursor-pointer" style={{ color: "#1A1A1A" }}>
              Published
            </label>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 rounded font-ui font-medium transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "#2D4A3E", color: "#F7F5F0" }}
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {resourceId ? "Update Resource" : "Create Resource"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/resources")}
              className="px-6 py-3 rounded font-ui font-medium"
              style={{ backgroundColor: "#D1C9BB", color: "#1A1A1A" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
