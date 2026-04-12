import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { trpc } from "@/lib/trpc";
import { ExternalLink, Loader2 } from "lucide-react";

const WRITING_DESK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/writing-desk-d9eNkpzhZohiGsNBBgopDv.webp";

export default function SubstackPage() {
  const settingQuery = trpc.settings.get.useQuery({ key: "substackUrl" });

  return (
    <>
      <SEOMeta
        title="Newsletter"
        description="Subscribe to James Bell's Substack newsletter for longer-form writing, personal reflections, and deep theological insights."
        keywords="newsletter, Substack, theology, faith, writing"
      />
      <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "45vh" }}>
        <div className="absolute inset-0">
          <img src={WRITING_DESK} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,26,26,0.9) 0%, rgba(26,26,26,0.7) 50%, rgba(26,26,26,0.4) 100%)" }} />
        </div>
        <div className="relative container flex items-center" style={{ minHeight: "45vh" }}>
          <div className="max-w-2xl py-16">
            <div className="font-ui text-xs font-medium uppercase tracking-[0.15em] mb-4" style={{ color: "#B8963E" }}>
              Substack
            </div>
            <h1 className="font-display font-bold mb-4" style={{ color: "#F7F5F0", fontSize: "clamp(2.25rem, 4vw, 3rem)" }}>
              The thinking behind the thinking
            </h1>
            <p className="font-body text-lg" style={{ color: "#D1C9BB", lineHeight: 1.8 }}>
              Longer writing. More personal. The pieces that don't fit neatly into a blog post — the ones that require more space, more honesty, and a reader willing to sit with them.
            </p>
          </div>
        </div>
      </section>

      {/* What Subscribers Get */}
      <section className="py-24" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-bold mb-8" style={{ color: "#1A1A1A", fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
              What you get
            </h2>

            <div className="space-y-6 mb-12">
              <div className="p-6 rounded-lg" style={{ backgroundColor: "#FFFFFF" }}>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: "#1A1A1A" }}>
                  Essays that go deeper
                </h3>
                <p className="font-body" style={{ color: "#6B7280" }}>
                  Pieces that explore theology, justice, leadership, and faith in ways that require more space than a blog post allows.
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: "#FFFFFF" }}>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: "#1A1A1A" }}>
                  Personal reflections
                </h3>
                <p className="font-body" style={{ color: "#6B7280" }}>
                  Stories from my own journey — the kind of honesty that's harder to share publicly, but matters deeply.
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: "#FFFFFF" }}>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: "#1A1A1A" }}>
                  Early access
                </h3>
                <p className="font-body" style={{ color: "#6B7280" }}>
                  Subscribers see new essays first, before they appear anywhere else.
                </p>
              </div>
            </div>

            {settingQuery.isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 size={24} className="animate-spin" style={{ color: "#B8963E" }} />
              </div>
            ) : settingQuery.data ? (
              <a
                href={settingQuery.data}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded font-ui font-medium no-underline transition-colors"
                style={{ backgroundColor: "#B8963E", color: "#1A1A1A" }}
              >
                <ExternalLink size={18} /> Subscribe on Substack
              </a>
            ) : (
              <p className="font-body" style={{ color: "#6B7280" }}>
                Substack link not configured yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </Layout>
    </>
  );
}
