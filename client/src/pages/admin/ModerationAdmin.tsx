import { useState } from "react";
import { AdminTestimonialsPanel } from "@/components/AdminTestimonialsPanel";
import { AdminCommentsPanel } from "@/components/AdminCommentsPanel";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export function ModerationAdmin() {
  const [activeTab, setActiveTab] = useState<"testimonials" | "comments">("testimonials");

  const testimonialsQuery = trpc.community.testimonials.listAll.useQuery();
  const commentsQuery = trpc.community.comments.listAll.useQuery();

  const testimonialsPending = testimonialsQuery.data?.pending?.length ?? 0;
  const commentsPending = commentsQuery.data?.pending?.length ?? 0;

  const tabs = [
    { id: "testimonials" as const, label: "Testimonials", count: testimonialsPending, loading: testimonialsQuery.isLoading },
    { id: "comments" as const, label: "Comments", count: commentsPending, loading: commentsQuery.isLoading },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Tabs */}
        <div className="flex gap-4 border-b" style={{ borderColor: "var(--adm-line)" }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2 font-medium transition-colors"
                style={{
                  borderBottom: isActive ? "2px solid var(--adm-gold)" : "2px solid transparent",
                  color: isActive ? "var(--charcoal)" : "var(--adm-gray)",
                }}
              >
                {tab.label}
                {tab.loading ? (
                  <Loader2 size={14} className="animate-spin" style={{ color: "var(--adm-gray)" }} />
                ) : tab.count > 0 ? (
                  <span
                    className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: "var(--adm-gold)", color: "var(--adm-bg)" }}
                  >
                    {tab.count}
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: "var(--adm-line-soft)", color: "var(--adm-gray)" }}
                  >
                    0
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div>
          {activeTab === "testimonials" && <AdminTestimonialsPanel />}
          {activeTab === "comments" && <AdminCommentsPanel />}
        </div>
      </div>
    </AdminLayout>
  );
}
