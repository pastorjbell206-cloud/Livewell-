import AdminLayout from "@/components/AdminLayout";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Trash2, Edit2, Plus, Loader2, Eye, EyeOff, Star } from "lucide-react";
import { toast } from "sonner";

export default function AdminPosts() {
  const [location, navigate] = useLocation();
  const postsQuery = trpc.posts.listAll.useQuery();
  const deletePostMutation = trpc.posts.delete.useMutation();
  const updatePostMutation = trpc.posts.update.useMutation();

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    try {
      await deletePostMutation.mutateAsync({ id });
      toast.success("Post deleted");
      postsQuery.refetch();
    } catch (err) {
      toast.error("Failed to delete post");
    }
  };

  const handleTogglePublish = async (post: any) => {
    try {
      await updatePostMutation.mutateAsync({
        id: post.id,
        published: !post.published,
      });
      toast.success(post.published ? "Post unpublished" : "Post published");
      postsQuery.refetch();
    } catch (err) {
      toast.error("Failed to update post");
    }
  };

  const handleToggleFeatured = async (post: any) => {
    try {
      await updatePostMutation.mutateAsync({
        id: post.id,
        featured: !post.featured,
      });
      toast.success(post.featured ? "Removed from featured" : "Set as featured");
      postsQuery.refetch();
    } catch (err) {
      toast.error("Failed to update post");
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
              Writing Posts
            </h1>
            <p className="font-body" style={{ color: "#6B7280" }}>
              Manage your blog posts and articles
            </p>
          </div>
          <Link
            href="/admin/posts/new"
            className="flex items-center gap-2 px-4 py-2 rounded font-ui font-medium no-underline"
            style={{ backgroundColor: "#1A1A1A", color: "#F7F5F0" }}
          >
            <Plus size={16} /> New Post
          </Link>
        </div>

        {postsQuery.isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="animate-spin" style={{ color: "#B8963E" }} />
          </div>
        ) : postsQuery.data?.length === 0 ? (
          <div className="text-center py-12" style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
            <p className="font-body mb-4" style={{ color: "#6B7280" }}>
              No posts yet. Create your first post to get started.
            </p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded font-ui font-medium no-underline"
              style={{ backgroundColor: "#1A1A1A", color: "#F7F5F0" }}
            >
              <Plus size={16} /> Create Post
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {postsQuery.data?.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: "#FFFFFF", borderLeft: `4px solid ${post.published ? "#2C3E50" : "#D1C9BB"}` }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-lg font-bold" style={{ color: "#1A1A1A" }}>
                      {post.title}
                    </h3>
                    {post.featured && <Star size={16} style={{ color: "#B8963E" }} fill="#B8963E" />}
                  </div>
                  <div className="flex items-center gap-3 font-ui text-sm" style={{ color: "#6B7280" }}>
                    <span>{post.pillar || "Uncategorized"}</span>
                    <span>•</span>
                    <span>{post.readTime || "—"}</span>
                    <span>•</span>
                    <span>{post.published ? "Published" : "Draft"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePublish(post)}
                    className="p-2 rounded transition-colors"
                    style={{ backgroundColor: "#F0F0F0", color: "#6B7280" }}
                    title={post.published ? "Unpublish" : "Publish"}
                  >
                    {post.published ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>

                  <button
                    onClick={() => handleToggleFeatured(post)}
                    className="p-2 rounded transition-colors"
                    style={{ backgroundColor: post.featured ? "#B8963E" : "#F0F0F0", color: post.featured ? "#FFFFFF" : "#6B7280" }}
                    title={post.featured ? "Remove featured" : "Set featured"}
                  >
                    <Star size={16} />
                  </button>

                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="p-2 rounded transition-colors no-underline"
                    style={{ backgroundColor: "#F0F0F0", color: "#6B7280" }}
                  >
                    <Edit2 size={16} />
                  </Link>

                  <button
                    onClick={() => handleDelete(post.id)}
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
