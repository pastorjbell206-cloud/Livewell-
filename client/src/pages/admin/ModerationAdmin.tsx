import { useState } from "react";
import { AdminTestimonialsPanel } from "@/components/AdminTestimonialsPanel";
import { AdminCommentsPanel } from "@/components/AdminCommentsPanel";

export function ModerationAdmin() {
  const [activeTab, setActiveTab] = useState<"testimonials" | "comments">("testimonials");

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex gap-4 border-b" style={{ borderColor: "#D1C9BB" }}>
        <button
          onClick={() => setActiveTab("testimonials")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "testimonials" ? "border-b-2" : "text-gray-500"
          }`}
          style={{
            borderColor: activeTab === "testimonials" ? "#B8963E" : "transparent",
            color: activeTab === "testimonials" ? "#1A1A1A" : "#6B7280",
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
            borderColor: activeTab === "comments" ? "#B8963E" : "transparent",
            color: activeTab === "comments" ? "#1A1A1A" : "#6B7280",
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
  );
}
