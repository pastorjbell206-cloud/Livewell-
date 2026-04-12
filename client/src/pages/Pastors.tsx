import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { trpc } from "@/lib/trpc";
import { ExternalLink, Loader2 } from "lucide-react";

const PASTORS_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/pastors-network-DhRzFbE8YzSg9o7MLtigko.webp";

export default function Pastors() {
  const settingQuery = trpc.settings.get.useQuery({ key: "pastorsConnectionUrl" });

  return (
    <>
      <SEOMeta
        title="Pastors Connection Network"
        description="A network connecting pastors across denominational lines around the gospel and kingdom advancement. Community for isolated pastors and church leaders."
        keywords="pastors, church leadership, community, network, ministry"
      />
      <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "55vh" }}>
        <div className="absolute inset-0">
          <img src={PASTORS_IMAGE} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.65) 50%, rgba(26,26,26,0.35) 100%)" }} />
        </div>
        <div className="relative container flex items-end" style={{ minHeight: "55vh" }}>
          <div className="max-w-2xl pb-16">
            <div className="font-ui text-xs font-medium uppercase tracking-[0.15em] mb-4" style={{ color: "#B8963E" }}>
              Pastors Connection Network
            </div>
            <h1 className="font-display font-bold mb-4" style={{ color: "#F7F5F0", fontSize: "clamp(2.25rem, 4vw, 3rem)" }}>
              You weren't meant to lead alone
            </h1>
            <p className="font-body text-lg" style={{ color: "#D1C9BB", lineHeight: 1.8 }}>
              Connecting pastors across denominational and background lines around the gospel and kingdom advancement — not around theological tribalism or institutional loyalty.
            </p>
          </div>
        </div>
      </section>

      {/* What the Network Is */}
      <section className="py-24" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-bold mb-8" style={{ color: "#1A1A1A", fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
              What the Pastors Connection is
            </h2>

            <div className="font-body text-lg" style={{ color: "#2C3E50", lineHeight: 1.85 }}>
              <p>
                The Pastors Connection Network exists because too many pastors lead in isolation. They carry the weight of congregations, families, and communities without anyone who understands what that weight actually feels like.
              </p>
              <p>
                This isn't a membership programme with perks. It's not a conference circuit or a networking event. It's a network built around one conviction: pastors need other pastors who will tell them the truth, sit with them in the hard seasons, and remind them why they started.
              </p>
              <p>
                The network connects pastors who serve in megachurches with pastors who serve in living rooms, because the work is the same work.
              </p>
            </div>

            <div className="gold-rule" style={{ maxWidth: "120px" }} />

            {/* Who It's For */}
            <h2 className="font-display font-bold mb-8 mt-16" style={{ color: "#1A1A1A", fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
              Who this is for
            </h2>

            <div className="font-body text-lg" style={{ color: "#2C3E50", lineHeight: 1.85 }}>
              <p>
                If you're a pastor who feels isolated. If you lead in a context where there's no peer community. If you're carrying questions you can't ask in your denomination. If you're wondering whether you're the only one wrestling with these things.
              </p>
              <p>
                You're not alone. This network is for you.
              </p>
            </div>

            <div className="gold-rule" style={{ maxWidth: "120px" }} />

            {/* What Happens When You Join */}
            <h2 className="font-display font-bold mb-8 mt-16" style={{ color: "#1A1A1A", fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
              What happens when you join
            </h2>

            <div className="space-y-6 mb-12">
              <div>
                <h3 className="font-display font-semibold mb-3" style={{ color: "#2C3E50" }}>
                  Monthly Peer Calls
                </h3>
                <p className="font-body" style={{ color: "#2C3E50", lineHeight: 1.8 }}>
                  Connect with other pastors in intimate group settings where real conversations happen. No agenda, no performance — just pastors being honest about the work.
                </p>
              </div>
              <div>
                <h3 className="font-display font-semibold mb-3" style={{ color: "#2C3E50" }}>
                  Peer Mentorship & Accountability
                </h3>
                <p className="font-body" style={{ color: "#2C3E50", lineHeight: 1.8 }}>
                  Get paired with other leaders who understand your context and will ask the hard questions. Real mentorship that helps you lead better and live better.
                </p>
              </div>
              <div>
                <h3 className="font-display font-semibold mb-3" style={{ color: "#2C3E50" }}>
                  Private Community Access
                </h3>
                <p className="font-body" style={{ color: "#2C3E50", lineHeight: 1.8 }}>
                  Join a private community of pastors where you can ask questions, share struggles, and find resources from leaders who've walked similar paths.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16">
              <h2 className="font-display font-bold mb-8" style={{ color: "#1A1A1A", fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
                Join the network
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">
                {settingQuery.isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 size={24} className="animate-spin" style={{ color: "#B8963E" }} />
                  </div>
                ) : settingQuery.data ? (
                  <>
                    <a
                      href={settingQuery.data}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-ui font-medium no-underline transition-colors"
                      style={{ backgroundColor: "#2D4A3E", color: "#F7F5F0" }}
                    >
                      <ExternalLink size={18} /> Join the Network
                    </a>
                    <a
                      href="mailto:james@thelivewell.com"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-ui font-medium no-underline transition-colors border"
                      style={{ borderColor: "#2D4A3E", color: "#2D4A3E", backgroundColor: "transparent" }}
                    >
                      Email James Directly
                    </a>
                  </>
                ) : (
                  <p className="font-body" style={{ color: "#6B7280" }}>
                    Network link not configured yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
    </>
  );
}
