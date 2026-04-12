import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Trash2, Check, Star, AlertCircle } from "lucide-react";

export function AdminTestimonialsPanel() {
  const [activeTab, setActiveTab] = useState<"pending" | "approved">("pending");

  const { data: testimonialsData, refetch } = trpc.community.testimonials.listAll.useQuery();
  const approveMutation = trpc.community.testimonials.approve.useMutation({
    onSuccess: () => refetch(),
  });
  const deleteMutation = trpc.community.testimonials.delete.useMutation({
    onSuccess: () => refetch(),
  });
  const toggleFeaturedMutation = trpc.community.testimonials.toggleFeatured.useMutation({
    onSuccess: () => refetch(),
  });

  const pending = testimonialsData?.pending || [];
  const approved = testimonialsData?.approved || [];
  const currentList = activeTab === "pending" ? pending : approved;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
          Testimonials Management
        </h2>
        <p style={{ color: "#6B7280" }}>
          Manage reader testimonials and social proof for your site
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
              ? "No pending testimonials"
              : "No approved testimonials"}
          </p>
        </div>
      )}

      {/* Testimonials List */}
      <div className="space-y-4">
        {currentList.map((testimonial) => (
          <div
            key={testimonial.id}
            className="p-6 rounded-lg border"
            style={{
              backgroundColor: "#F7F5F0",
              borderColor: "#D1C9BB",
            }}
          >
            {/* Header with Featured Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold" style={{ color: "#1A1A1A" }}>
                    {testimonial.authorName}
                  </h3>
                  {testimonial.featured && (
                    <span
                      className="px-2 py-1 text-xs font-medium rounded"
                      style={{ backgroundColor: "#B8963E", color: "#F7F5F0" }}
                    >
                      Featured
                    </span>
                  )}
                </div>
                {testimonial.authorRole && (
                  <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>
                    {testimonial.authorRole}
                  </p>
                )}
              </div>
            </div>

            {/* Content */}
            <p
              className="mb-4 leading-relaxed"
              style={{ color: "#2C3E50" }}
            >
              "{testimonial.content}"
            </p>

            {/* Actions */}
            <div className="flex gap-2 flex-wrap">
              {activeTab === "pending" && (
                <Button
                  onClick={() => approveMutation.mutate({ testimonialId: testimonial.id })}
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

              {activeTab === "approved" && (
                <Button
                  onClick={() =>
                    toggleFeaturedMutation.mutate({
                      testimonialId: testimonial.id,
                      featured: !testimonial.featured,
                    })
                  }
                  disabled={toggleFeaturedMutation.isPending}
                  className="flex items-center gap-2"
                  style={{
                    backgroundColor: testimonial.featured ? "#B8963E" : "#D1C9BB",
                    color: testimonial.featured ? "#F7F5F0" : "#1A1A1A",
                  }}
                >
                  <Star size={16} />
                  {testimonial.featured ? "Unfeature" : "Feature"}
                </Button>
              )}

              <Button
                onClick={() => deleteMutation.mutate({ testimonialId: testimonial.id })}
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
