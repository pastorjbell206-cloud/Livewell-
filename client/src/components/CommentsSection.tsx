import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send } from "lucide-react";

interface CommentsSectionProps {
  postId: number;
}

export function CommentsSection({ postId }: CommentsSectionProps) {
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data: commentsData, isLoading } = trpc.community.comments.getByPost.useQuery({
    postId,
  });

  const submitMutation = trpc.community.comments.submit.useMutation({
    onSuccess: () => {
      setAuthorName("");
      setAuthorEmail("");
      setContent("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !authorEmail.trim() || !content.trim()) {
      return;
    }

    submitMutation.mutate({
      postId,
      authorName: authorName.trim(),
      authorEmail: authorEmail.trim(),
      content: content.trim(),
    });
  };

  return (
    <div className="mt-12 pt-8 border-t" style={{ borderColor: "#D1C9BB" }}>
      {/* Comments Header */}
      <div className="flex items-center gap-2 mb-8">
        <MessageCircle size={24} style={{ color: "#B8963E" }} />
        <h3
          className="font-display text-2xl font-bold"
          style={{ color: "#1A1A1A" }}
        >
          Comments
        </h3>
      </div>

      {/* Comments List */}
      {isLoading ? (
        <div style={{ color: "#6B7280" }}>Loading comments...</div>
      ) : commentsData?.comments && commentsData.comments.length > 0 ? (
        <div className="space-y-6 mb-12">
          {commentsData.comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-lg"
              style={{ backgroundColor: "#F7F5F0" }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div
                    className="font-semibold"
                    style={{ color: "#1A1A1A" }}
                  >
                    {comment.authorName}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "#6B7280" }}
                  >
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#2C3E50" }}
              >
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="text-center py-8"
          style={{ color: "#6B7280" }}
        >
          No comments yet. Be the first to share your thoughts!
        </div>
      )}

      {/* Comment Form */}
      <div
        className="p-6 rounded-lg"
        style={{ backgroundColor: "#F7F5F0" }}
      >
        <h4
          className="font-semibold mb-4"
          style={{ color: "#1A1A1A" }}
        >
          Leave a Comment
        </h4>

        {submitted && (
          <div
            className="mb-4 p-3 rounded text-sm"
            style={{
              backgroundColor: "#ECFDF5",
              color: "#065F46",
              borderLeft: "4px solid #10B981",
            }}
          >
            ✓ Thank you! Your comment has been submitted for moderation.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: "#D1C9BB",
                color: "#1A1A1A",
              }}
              required
            />
            <input
              type="email"
              placeholder="Your email"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: "#D1C9BB",
                color: "#1A1A1A",
              }}
              required
            />
          </div>

          <textarea
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
            style={{
              borderColor: "#D1C9BB",
              color: "#1A1A1A",
            }}
            required
          />

          <Button
            type="submit"
            disabled={submitMutation.isPending}
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all"
            style={{
              backgroundColor: "#B8963E",
              color: "#F7F5F0",
            }}
          >
            <Send size={16} />
            {submitMutation.isPending ? "Submitting..." : "Post Comment"}
          </Button>
        </form>

        <p
          className="text-xs mt-4"
          style={{ color: "#6B7280" }}
        >
          Comments are moderated and will appear after approval.
        </p>
      </div>
    </div>
  );
}
