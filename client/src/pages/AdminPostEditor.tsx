import AdminLayout from "@/components/AdminLayout";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminPostEditor() {
  const [location, navigate] = useLocation();
  const postIdMatch = location.match(/\/admin\/posts\/(\d+)\/edit/);
  const postId = postIdMatch ? parseInt(postIdMatch[1]) : null;

  const [form, setForm] = useState({
    title: "",
    slug: "",
    body: "",
    excerpt: "",
    pillar: "",
    readTime: "",
    coverImage: "",
    published: false,
    featured: false,
  });

  const getPostQuery = trpc.posts.getById.useQuery(
    { id: postId! },
    { enabled: !!postId }
  );

  const createPostMutation = trpc.posts.create.useMutation();
  const updatePostMutation = trpc.posts.update.useMutation();

  useEffect(() => {
    if (getPostQuery.data) {
      setForm({
        title: getPostQuery.data.title,
        slug: getPostQuery.data.slug,
        body: getPostQuery.data.body,
        excerpt: getPostQuery.data.excerpt || "",
        pillar: getPostQuery.data.pillar || "",
        readTime: getPostQuery.data.readTime || "",
        coverImage: getPostQuery.data.coverImage || "",
        published: getPostQuery.data.published,
        featured: getPostQuery.data.featured,
      });
    }
  }, [getPostQuery.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.body) {
      toast.error("Title, slug, and body are required");
      return;
    }

    try {
      if (postId) {
        await updatePostMutation.mutateAsync({ id: postId, ...form });
        toast.success("Post updated");
      } else {
        await createPostMutation.mutateAsync(form);
        toast.success("Post created");
      }
      navigate("/admin/posts");
    } catch (err) {
      toast.error("Failed to save post");
    }
  };

  const isLoading = getPostQuery.isLoading || createPostMutation.isPending || updatePostMutation.isPending;

  return (
    <AdminLayout>
      <div>
        <h1 className="font-display text-4xl font-bold mb-8" style={{ color: "#1A1A1A" }}>
          {postId ? "Edit Post" : "New Post"}
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
              placeholder="Post title"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              URL Slug
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-4 py-2 rounded border font-body"
              style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
              placeholder="url-friendly-slug"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              Excerpt
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full px-4 py-2 rounded border font-body"
              style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
              rows={3}
              placeholder="Short summary for cards"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              Body (Markdown)
            </label>
            <textarea
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              className="w-full px-4 py-2 rounded border font-body"
              style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
              rows={12}
              placeholder="Write your post in Markdown..."
            />
          </div>

          {/* Pillar */}
          <div>
            <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              Content Pillar
            </label>
            <select
              value={form.pillar}
              onChange={(e) => setForm({ ...form, pillar: e.target.value })}
              className="w-full px-4 py-2 rounded border font-body"
              style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
            >
              <option value="">Select a pillar...</option>
              <option value="Prophetic Disruption">Prophetic Disruption</option>
              <option value="Theological Depth">Theological Depth</option>
              <option value="Prophetic Justice">Prophetic Justice</option>
              <option value="Integrated Life">Integrated Life</option>
              <option value="Leadership Formation">Leadership Formation</option>
            </select>
          </div>

          {/* Read Time */}
          <div>
            <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              Read Time
            </label>
            <input
              type="text"
              value={form.readTime}
              onChange={(e) => setForm({ ...form, readTime: e.target.value })}
              className="w-full px-4 py-2 rounded border font-body"
              style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
              placeholder="e.g., 8 min read"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              Cover Image URL
            </label>
            <input
              type="text"
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              className="w-full px-4 py-2 rounded border font-body"
              style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
              placeholder="https://..."
            />
          </div>

          {/* Checkboxes */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer font-ui text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              <span style={{ color: "#1A1A1A" }}>Published</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-ui text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              <span style={{ color: "#1A1A1A" }}>Featured</span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 rounded font-ui font-medium transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "#1A1A1A", color: "#F7F5F0" }}
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {postId ? "Update Post" : "Create Post"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/posts")}
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
