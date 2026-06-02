import { useState } from "react";
import { AdminTestimonialsPanel } from "@/components/AdminTestimonialsPanel";
import { AdminCommentsPanel } from "@/components/AdminCommentsPanel";
import AdminLayout from "@/components/AdminLayout";

export function ModerationAdmin() {
  const [activeTab, setActiveTab] = useState<"testimonials" | "comments">("testimonials");

  return (
    <AdminLayout>
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex gap-4 border-b" style={{ borderColor: "var(--line)" }}>
        <button
          onClick={() => setActiveTab("testimonials")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "testimonials" ? "border-b-2" : "text-gray-500"
          }`}
          style={{
            borderColor: activeTab === "testimonials" ? "var(--mustard)" : "transparent",
            color: activeTab === "testimonials" ? "var(--ink)" : "var(--ink-muted)",
          }}
        >
          Testimonials
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "comments" ? "border-b-2" : "text-gray-500"
          }`}
          style={{
            borderColor: activeTab === "comments" ? "var(--mustard)" : "transparent",
            color: activeTab === "comments" ? "var(--ink)" : "var(--ink-muted)",
          }}
        >
          Comments
        </button>
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
