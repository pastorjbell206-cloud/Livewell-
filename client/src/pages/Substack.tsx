import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { trpc } from "@/lib/trpc";
import { ExternalLink, Loader2 } from "lucide-react";

const WRITING_DESK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/writing-desk-d9eNkpzhZohiGsNBBgopDv.webp";

export default function SubstackPage() {
  const settingQuery = trpc.settings.get.useQuery({ key: "substackUrl" });
  // Always have a working destination: fall back to James's Substack if the
  // site setting hasn't been configured, so the button is never a dead end.
  const substackUrl = settingQuery.data || "https://jamesbell333289.substack.com";

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
          <img width={1200}
          height={800}
          src={WRITING_DESK} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,26,26,0.9) 0%, rgba(26,26,26,0.7) 50%, rgba(26,26,26,0.4) 100%)" }} />
        </div>
        <div className="relative container flex items-center" style={{ minHeight: "45vh" }}>
          <div className="max-w-2xl py-16">
            <div className="font-ui text-xs font-medium uppercase tracking-[0.15em] mb-4" style={{ color: "var(--gold)" }}>
              Substack
            </div>
            <h1 className="font-display font-bold mb-4" style={{ color: "var(--bone)", fontSize: "clamp(2.25rem, 4vw, 3rem)" }}>
              The thinking behind the thinking
            </h1>
            <p className="font-body text-lg" style={{ color: "rgba(244,241,234,0.7)", lineHeight: 1.8 }}>
              Longer writing. More personal. The pieces that don't fit neatly into a blog post — the ones that require more space, more honesty, and a reader willing to sit with them.
            </p>
          </div>
        </div>
      </section>

      {/* What Subscribers Get */}
      <section className="py-24" style={{ backgroundColor: "var(--bone)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-bold mb-8" style={{ color: "var(--ink)", fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
              What you get
            </h2>

            <div className="space-y-6 mb-12">
              <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--card)" }}>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: "var(--ink)" }}>
                  One serious essay a week
                </h3>
                <p className="font-body" style={{ color: "var(--ink-muted)" }}>
                  The same writing this site is built on — the church and the flag, Scripture read past the tribe, marriage after the tips run out, doubt taken seriously. Written slow, sent once.
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--card)" }}>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: "var(--ink)" }}>
                  From inside the room
                </h3>
                <p className="font-body" style={{ color: "var(--ink-muted)" }}>
                  Not commentary from a safe distance. A working pastor writing around hospital visits and funerals, from a church in Fenton, Michigan — with five sons at the table.
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--card)" }}>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: "var(--ink)" }}>
                  No noise
                </h3>
                <p className="font-body" style={{ color: "var(--ink-muted)" }}>
                  No hot takes, no outrage cycle, no daily drip. One email a week that assumes you are an adult, and nothing else in your inbox.
                </p>
              </div>
            </div>

            {settingQuery.isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 size={24} className="animate-spin" style={{ color: "var(--gold)" }} />
              </div>
            ) : (
              <a
                href={substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded font-ui font-medium no-underline transition-colors"
                style={{ backgroundColor: "var(--gold)", color: "var(--ink)" }}
              >
                <ExternalLink size={18} /> Subscribe on Substack
              </a>
            )}
          </div>
        </div>
      </section>
    </Layout>
    </>
  );
}
