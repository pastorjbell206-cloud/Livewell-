import AdminLayout from "@/components/AdminLayout";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminBookEditor() {
  const [location, navigate] = useLocation();
  const bookIdMatch = location.match(/\/admin\/books\/(\d+)\/edit/);
  const bookId = bookIdMatch ? parseInt(bookIdMatch[1]) : null;

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    coverImage: "",
    purchaseUrl: "",
    bookType: "recommended" as "authored" | "recommended",
    sortOrder: 0,
    published: false,
  });

  const getBookQuery = trpc.books.getById.useQuery(
    { id: bookId! },
    { enabled: !!bookId }
  );

  const createBookMutation = trpc.books.create.useMutation();
  const updateBookMutation = trpc.books.update.useMutation();

  useEffect(() => {
    if (getBookQuery.data) {
      setForm({
        title: getBookQuery.data.title,
        author: getBookQuery.data.author || "",
        description: getBookQuery.data.description || "",
        coverImage: getBookQuery.data.coverImage || "",
        purchaseUrl: getBookQuery.data.purchaseUrl || "",
        bookType: getBookQuery.data.bookType,
        sortOrder: getBookQuery.data.sortOrder,
        published: getBookQuery.data.published,
      });
    }
  }, [getBookQuery.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("Title is required");
      return;
    }

    try {
      if (bookId) {
        await updateBookMutation.mutateAsync({ id: bookId, ...form });
        toast.success("Book updated");
      } else {
        await createBookMutation.mutateAsync(form);
        toast.success("Book created");
      }
      navigate("/admin/books");
    } catch (err) {
      toast.error("Failed to save book");
    }
  };

  const isLoading = getBookQuery.isLoading || createBookMutation.isPending || updateBookMutation.isPending;

  return (
    <AdminLayout>
      <div>
        <h1 className="font-display text-4xl font-bold mb-8" style={{ color: "#1A1A1A" }}>
          {bookId ? "Edit Book" : "New Book"}
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
              placeholder="Book title"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              Author
            </label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="w-full px-4 py-2 rounded border font-body"
              style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
              placeholder="Author name"
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
              placeholder="Book summary"
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

          {/* Purchase URL */}
          <div>
            <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              Purchase/Link URL
            </label>
            <input
              type="text"
              value={form.purchaseUrl}
              onChange={(e) => setForm({ ...form, purchaseUrl: e.target.value })}
              className="w-full px-4 py-2 rounded border font-body"
              style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
              placeholder="https://amazon.com/..."
            />
          </div>

          {/* Book Type */}
          <div>
            <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              Book Type
            </label>
            <select
              value={form.bookType}
              onChange={(e) => setForm({ ...form, bookType: e.target.value as "authored" | "recommended" })}
              className="w-full px-4 py-2 rounded border font-body"
              style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
            >
              <option value="authored">My Book (Authored)</option>
              <option value="recommended">Recommendation</option>
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              Display Order
            </label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 rounded border font-body"
              style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
              placeholder="0"
            />
            <p className="font-ui text-xs mt-1" style={{ color: "#6B7280" }}>
              Lower numbers appear first
            </p>
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
              style={{ backgroundColor: "#B8963E", color: "#1A1A1A" }}
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {bookId ? "Update Book" : "Create Book"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/books")}
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
