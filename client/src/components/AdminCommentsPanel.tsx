import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Trash2, Check, AlertCircle } from "lucide-react";

export function AdminCommentsPanel() {
  const [activeTab, setActiveTab] = useState<"pending" | "approved">("pending");

  const { data: commentsData, refetch } = trpc.community.comments.listAll.useQuery();
  const approveMutation = trpc.community.comments.approve.useMutation({
    onSuccess: () => refetch(),
  });
  const deleteMutation = trpc.community.comments.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const pending = commentsData?.pending || [];
  const approved = commentsData?.approved || [];
  const currentList = activeTab === "pending" ? pending : approved;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
          Comments Moderation
        </h2>
        <p style={{ color: "#6B7280" }}>
          Review and moderate reader comments on your articles
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b" style={{ borderColor: "#D1C9BB" }}>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "pending"
              ? "border-b-2"
              : "text-gray-500"
          }`}
          style={{
            borderColor: activeTab === "pending" ? "#B8963E" : "transparent",
            color: activeTab === "pending" ? "#1A1A1A" : "#6B7280",
          }}
        >
          Pending ({pending.length})
        </button>
        <button
          onClick={() => setActiveTab("approved")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "approved"
              ? "border-b-2"
              : "text-gray-500"
          }`}
          style={{
            borderColor: activeTab === "approved" ? "#B8963E" : "transparent",
            color: activeTab === "approved" ? "#1A1A1A" : "#6B7280",
          }}
        >
          Approved ({approved.length})
        </button>
      </div>

      {/* Empty State */}
      {currentList.length === 0 && (
        <div
          className="text-center py-12 rounded-lg"
          style={{ backgroundColor: "#F7F5F0" }}
        >
          <AlertCircle size={48} style={{ color: "#B8963E", margin: "0 auto 1rem" }} />
          <p style={{ color: "#6B7280" }}>
            {activeTab === "pending"
              ? "No pending comments"
              : "No approved comments"}
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {currentList.map((comment) => (
          <div
            key={comment.id}
            className="p-6 rounded-lg border"
            style={{
              backgroundColor: "#F7F5F0",
              borderColor: "#D1C9BB",
            }}
          >
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold" style={{ color: "#1A1A1A" }}>
                  {comment.authorName}
                </h3>
                <span style={{ color: "#6B7280", fontSize: "0.875rem" }}>
                  on Article #{comment.postId}
                </span>
              </div>
              <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>
                {comment.authorEmail}
              </p>
            </div>

            {/* Content */}
            <p
              className="mb-4 leading-relaxed"
              style={{ color: "#2C3E50" }}
            >
              {comment.content}
            </p>

            {/* Actions */}
            <div className="flex gap-2 flex-wrap">
              {activeTab === "pending" && (
                <Button
                  onClick={() => approveMutation.mutate({ commentId: comment.id })}
                  disabled={approveMutation.isPending}
                  className="flex items-center gap-2"
                  style={{
                    backgroundColor: "#10B981",
                    color: "#F7F5F0",
                  }}
                >
                  <Check size={16} />
                  Approve
                </Button>
              )}

              <Button
                onClick={() => deleteMutation.mutate({ commentId: comment.id })}
                disabled={deleteMutation.isPending}
                className="flex items-center gap-2"
                style={{
                  backgroundColor: "#EF4444",
                  color: "#F7F5F0",
                }}
              >
                <Trash2 size={16} />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
