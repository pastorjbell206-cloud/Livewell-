import AdminLayout from "@/components/AdminLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Trash2, Edit2, Plus, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function AdminBooks() {
  const booksQuery = trpc.books.listAll.useQuery();
  const deleteBookMutation = trpc.books.delete.useMutation();
  const updateBookMutation = trpc.books.update.useMutation();

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this book?")) return;
    try {
      await deleteBookMutation.mutateAsync({ id });
      toast.success("Book deleted");
      booksQuery.refetch();
    } catch (err) {
      toast.error("Failed to delete book");
    }
  };

  const handleTogglePublish = async (book: any) => {
    try {
      await updateBookMutation.mutateAsync({
        id: book.id,
        published: !book.published,
      });
      toast.success(book.published ? "Book unpublished" : "Book published");
      booksQuery.refetch();
    } catch (err) {
      toast.error("Failed to update book");
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
              Books
            </h1>
            <p className="font-body" style={{ color: "#6B7280" }}>
              Manage your authored books and reading recommendations
            </p>
          </div>
          <Link
            href="/admin/books/new"
            className="flex items-center gap-2 px-4 py-2 rounded font-ui font-medium no-underline"
            style={{ backgroundColor: "#B8963E", color: "#1A1A1A" }}
          >
            <Plus size={16} /> New Book
          </Link>
        </div>

        {booksQuery.isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="animate-spin" style={{ color: "#B8963E" }} />
          </div>
        ) : booksQuery.data?.length === 0 ? (
          <div className="text-center py-12" style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
            <p className="font-body mb-4" style={{ color: "#6B7280" }}>
              No books yet. Add your first book.
            </p>
            <Link
              href="/admin/books/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded font-ui font-medium no-underline"
              style={{ backgroundColor: "#B8963E", color: "#1A1A1A" }}
            >
              <Plus size={16} /> Add Book
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {booksQuery.data?.map((book) => (
              <div
                key={book.id}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: "#FFFFFF", borderLeft: `4px solid ${book.published ? "#B8963E" : "#D1C9BB"}` }}
              >
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold mb-1" style={{ color: "#1A1A1A" }}>
                    {book.title}
                  </h3>
                  <div className="flex items-center gap-3 font-ui text-sm" style={{ color: "#6B7280" }}>
                    <span>{book.author || "Unknown Author"}</span>
                    <span>•</span>
                    <span className="capitalize">{book.bookType}</span>
                    <span>•</span>
                    <span>{book.published ? "Published" : "Draft"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePublish(book)}
                    className="p-2 rounded transition-colors"
                    style={{ backgroundColor: "#F0F0F0", color: "#6B7280" }}
                  >
                    {book.published ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>

                  <Link
                    href={`/admin/books/${book.id}/edit`}
                    className="p-2 rounded transition-colors no-underline"
                    style={{ backgroundColor: "#F0F0F0", color: "#6B7280" }}
                  >
                    <Edit2 size={16} />
                  </Link>

                  <button
                    onClick={() => handleDelete(book.id)}
                    className="p-2 rounded transition-colors"
                    style={{ backgroundColor: "#F0F0F0", color: "#DC2626" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
