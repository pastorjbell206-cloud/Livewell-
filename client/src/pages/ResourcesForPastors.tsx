import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Download, FileText, BookOpen } from "lucide-react";

const RESOURCES_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/pastors-network-DhRzFbE8YzSg9o7MLtigko.webp";

export default function ResourcesForPastors() {
  const resources = [
    {
      title: "Trench Work Series — Complete Collection",
      description: "The complete Trench Work series (Volumes 1-15) — practical, biblical guidance for pastors navigating real challenges in ministry. Essays on leadership, theology, culture, and the Christian life.",
      icon: BookOpen,
      downloads: [
        {
          label: "PDF Version",
          url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/TWCompleteCollectionVol01-15_ecae02c3.pdf",
          format: "PDF",
          size: "1.5 MB",
        },
      ],
    },
  ];

  return (
    <>
      <SEOMeta
        title="Resources for Pastors"
        description="Free downloadable resources for pastors — guides, collections, and tools to support your ministry leadership."
        keywords="pastor resources, ministry tools, leadership guides, church leadership"
      />
      <Layout>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ minHeight: "50vh" }}>
          <div className="absolute inset-0">
            <img src={RESOURCES_IMAGE} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.65) 50%, rgba(26,26,26,0.35) 100%)" }} />
          </div>
          <div className="relative container flex items-end" style={{ minHeight: "50vh" }}>
            <div className="max-w-2xl pb-16">
              <div className="font-ui text-xs font-medium uppercase tracking-[0.15em] mb-4" style={{ color: "#B8963E" }}>
                Resources for Pastors
              </div>
              <h1 className="font-display font-bold mb-4" style={{ color: "#F7F5F0", fontSize: "clamp(2.25rem, 4vw, 3rem)" }}>
                Tools for the work
              </h1>
              <p className="font-body text-lg" style={{ color: "#D1C9BB", lineHeight: 1.8 }}>
                Free resources to support your ministry — guides, essays, and collections from James Bell and the Livewell community.
              </p>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-24" style={{ backgroundColor: "#F7F5F0" }}>
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-16">
                {resources.map((resource, idx) => {
                  const Icon = resource.icon;
                  return (
                    <div key={idx} className="bg-white rounded-lg p-8 border" style={{ borderColor: "#E5DDD0" }}>
                      <div className="flex gap-6 mb-6">
                        <div style={{ color: "#B8963E" }}>
                          <Icon size={32} />
                        </div>
                        <div className="flex-1">
                          <h2 className="font-display font-bold mb-3" style={{ color: "#1A1A1A", fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}>
                            {resource.title}
                          </h2>
                          <p className="font-body text-lg" style={{ color: "#2C3E50", lineHeight: 1.8 }}>
                            {resource.description}
                          </p>
                        </div>
                      </div>

                      {/* Download Buttons */}
                      <div className="space-y-3">
                        {resource.downloads.map((download, didx) => (
                          <a
                            key={didx}
                            href={download.url}
                            download
                            className="flex items-center justify-between p-4 rounded border transition-colors"
                            style={{
                              borderColor: "#D1C9BB",
                              backgroundColor: "#FAFAF8",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#F0EBE3";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "#FAFAF8";
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <FileText size={20} style={{ color: "#B8963E" }} />
                              <div>
                                <p className="font-ui font-medium" style={{ color: "#1A1A1A" }}>
                                  {download.label}
                                </p>
                                <p className="font-ui text-xs" style={{ color: "#6B7280" }}>
                                  {download.format} • {download.size}
                                </p>
                              </div>
                            </div>
                            <Download size={20} style={{ color: "#B8963E" }} />
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coming Soon */}
              <div className="mt-16 pt-16 border-t" style={{ borderColor: "#E5DDD0" }}>
                <h2 className="font-display font-bold mb-8" style={{ color: "#1A1A1A", fontSize: "clamp(1.5rem, 2vw, 1.75rem)" }}>
                  Coming soon
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-6 rounded" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5DDD0" }}>
                    <h3 className="font-display font-semibold mb-3" style={{ color: "#2C3E50" }}>
                      Sermon Study Guides
                    </h3>
                    <p className="font-body text-sm" style={{ color: "#6B7280" }}>
                      Downloadable guides to help you teach through key passages and theological topics with your congregation.
                    </p>
                  </div>
                  <div className="p-6 rounded" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5DDD0" }}>
                    <h3 className="font-display font-semibold mb-3" style={{ color: "#2C3E50" }}>
                      Leadership Curriculum
                    </h3>
                    <p className="font-body text-sm" style={{ color: "#6B7280" }}>
                      Multi-week curriculum for developing leaders in your congregation around biblical theology and ministry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
