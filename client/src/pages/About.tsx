import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowRight } from "lucide-react";
import { Streamdown } from "streamdown";
import { Link } from "wouter";

const PORTRAIT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/about-portrait-g9MmXvPzi8UsUT7TiPbn9U.webp";

const CREDENTIALS = [
  { label: "Lead Pastor", detail: "First Baptist Church of Fenton, Michigan (since 2016)" },
  { label: "Founder", detail: "Pastors Connection Network â connecting pastors globally" },
  { label: "Author", detail: "25 published books on pastoral ministry, theology, marriage, and faith" },
  { label: "Trainer", detail: "Global pastoral training with focus on remote regions and indigenous tribes" },
  { label: "Speaker", detail: "National and international conferences on leadership, theology, and pastoral care" },
  { label: "Husband & Father", detail: "Married to Susanna; father of five sons" },
];

const TESTIMONIALS = [
  { quote: "James doesn't just write about theology â he lives it. His work has shaped how I lead my church and how I pastor my own family.", author: "Pastor R.M.", role: "Lead Pastor, Ohio" },
  { quote: "The most important voice in evangelical Christianity right now. Prophetic, pastoral, and deeply biblical.", author: "Dr. T.K.", role: "Seminary Professor" },
  { quote: "James has the rare gift of making complex theology accessible without dumbing it down. His writing changed my faith.", author: "S.W.", role: "Church Member, California" },
  { quote: "I've been in ministry 30 years. James's insights on pastoral burnout and calling saved my ministry and my marriage.", author: "Rev. J.L.", role: "Senior Pastor, Texas" },
];

export default function About() {
  const contentQuery = trpc.settings.get.useQuery({ key: "aboutContent" });
  const imageQuery = trpc.settings.get.useQuery({ key: "aboutImage" });

  const defaultContent = `# The short version is: I couldn't keep quiet.

I grew up in the kind of church where the rules were clear and the questions were discouraged. Fundamentalism gave me structure, but it also gave me a version of God who was more interested in my behavior than my heart. It took me years to realize that the system I was defending was the very thing keeping me from the Jesus I claimed to follow.

Leaving that world cost me. It cost relationships, positions, and the kind of certainty that makes life feel manageable. But it gave me something I didn't know I was missing: freedom. Not the reckless kind â the kind that comes from finally being honest about what you believe and why.

## What I do now

I write. I teach. I lead. But always from one conviction: behavior modification was never the point. Heart transformation is.

This site is the intellectual and pastoral home of that voice. It's where I think out loud about theology, justice, leadership, and what it looks like to follow Jesus in a world that's forgotten what his kingdom actually stands for.

## Why I Write

There was a momentâI can still see it clearlyâwhen I realized that the American church had made a catastrophic mistake. We had confused our political preferences with our theological convictions. We had baptized nationalism as if it were gospel. We had prioritized institutional protection over prophetic witness. And most painfully, we had done it all while quoting Scripture.

That moment broke something open in me. I couldn't unsee it. I couldn't go back to the comfortable certainty that had defined so much of my faith life. I realized that silence was complicity, and complicity was a kind of betrayalânot just of my own conscience, but of the Jesus I actually believed in.

So I started writing. Not because I have all the answersâI don't. But because I believe the church needs voices willing to ask the hard questions, to name the uncomfortable truths, and to insist that following Jesus means something radically different than what we've been sold. I write because I love the church enough to grieve what she's become, and I believe she can become something better. I write because someone needs to say the things that are being whispered in coffee shops and small group meetings but never from the pulpit. And I write because I genuinely believe that heart transformationâreal, deep, costly transformationâis still possible.

## What You'll Find Here

This is a space for serious theological thinking that doesn't require a seminary degree to understand. You'll find essays organized around five core convictions: **Prophetic Disruption** (what needs to be challenged), **Theological Depth** (what needs to be understood), **Prophetic Justice** (what needs to be named), **Integrated Life** (what needs to be lived), and **Leadership Formation** (what leaders need to face). Some articles will comfort you. Some will challenge you. Some might make you angry. All of them are written by someone who believes that faith should be intellectually honest, pastorally compassionate, and prophetically courageous.`;

  const content = contentQuery.data || defaultContent;
  const portraitUrl = imageQuery.data || PORTRAIT;

  return (
    <>
      <SEOMeta
        title="About James Bell"
        description="Learn about James Bell's journey, theology, and mission. Exploring prophetic disruption, theological depth, and authentic Christian faith."
        keywords="James Bell, theology, faith, Christian leadership, about"
        type="website"
      />
      <Layout>
        {/* Hero Section */}
        <section className="py-20" style={{ backgroundColor: "#F7F5F0" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
              {/* Portrait */}
              <div >
                <div className="relative">
                  <img
                    src={portraitUrl}
                    alt="James Bell"
                    className="w-full object-cover"
                    style={{ maxHeight: "600px" }}
                  />
                  <div
                    className="absolute -bottom-3 -right-3 w-full h-full -z-10"
                    style={{ border: "2px solid #B8963E" }}
                  />
                </div>
              </div>

              {/* Story */}
              <div >
                <div className="font-ui text-xs font-medium uppercase tracking-[0.15em] mb-4" style={{ color: "#B8963E" }}>
                  About
                </div>

                {(contentQuery.isLoading || imageQuery.isLoading) ? (
                  <div className="flex justify-center py-16">
                    <Loader2 size={32} className="animate-spin" style={{ color: "#B8963E" }} />
                  </div>
                ) : (
                  <div className="font-body text-lg" style={{ color: "#1C1510", lineHeight: 1.85 }}>
                    <Streamdown>{content}</Streamdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16" style={{ backgroundColor: "#1A1A1A" }}>
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <p className="font-body text-lg mb-8" style={{ color: "#F7F5F0", lineHeight: 1.85 }}>
                Whatever brought you here â a ministry on the edge, a marriage under strain, a faith that needs more room than it has been given â there is something here for you. Start reading.
              </p>
              <Link href="/writing">
                <a className="inline-flex items-center gap-3 px-8 py-4 font-ui font-semibold uppercase tracking-[0.1em] transition-all duration-300"
                   style={{
                     backgroundColor: "#B8963E",
                     color: "#1A1A1A",
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.backgroundColor = "#D4A574";
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.backgroundColor = "#B8963E";
                   }}
                >
                  Start Reading â
                  <ArrowRight size={18} />
                </a>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
