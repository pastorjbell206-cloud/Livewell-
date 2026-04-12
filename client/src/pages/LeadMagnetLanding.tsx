import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Star, Lock } from "lucide-react";

interface LeadMagnetConfig {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverUrl: string;
  pillar: string;
  readingPathSlug: string;
  expectedConversionRate: number;
}

const LEAD_MAGNETS: Record<string, LeadMagnetConfig> = {
  "leadership-audit": {
    id: "leadership-audit",
    title: "The Leadership Audit: 15 Questions to Assess Your Leadership Health",
    subtitle: "Discover Your Leadership Blind Spots",
    description: "Most leaders have no idea if they're actually good at leadership. This 15-question audit reveals your blind spots, your strengths, and exactly what you need to improve.",
    coverUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/leadmagnet-leadership-audit-RBJACizR9S5nzjLwh9nkox.webp",
    pillar: "Leadership Formation",
    readingPathSlug: "church-leadership-essentials",
    expectedConversionRate: 0.18,
  },
  "prophetic-manifesto": {
    id: "prophetic-manifesto",
    title: "The Prophetic Manifesto: 7 Beliefs That Will Change Your Life",
    subtitle: "7 Core Beliefs for Living Prophetically",
    description: "Most people live by beliefs they've never examined. This manifesto reveals 7 core beliefs that separate people who just exist from people who actually live.",
    coverUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/leadmagnet-prophetic-manifesto-4kXoEV8Fh52rBUzcT9DQjc.webp",
    pillar: "Prophetic Disruption",
    readingPathSlug: "cultural-engagement-justice",
    expectedConversionRate: 0.15,
  },
  "theology-workbook": {
    id: "theology-workbook",
    title: "The Theology Workbook: 10 Essential Beliefs Explained Simply",
    subtitle: "Understand Faith Without the Jargon",
    description: "Theology doesn't have to be complicated. This workbook explains 10 essential beliefs in plain English, with real-life examples and discussion questions.",
    coverUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/leadmagnet-theology-workbook-7kafG6z5SUZ6TMQMY6FgDH.webp",
    pillar: "Theological Depth",
    readingPathSlug: "spiritual-formation-prayer",
    expectedConversionRate: 0.16,
  },
  "life-diagnostic": {
    id: "life-diagnostic",
    title: "The Life Diagnostic: 20 Questions About Your Marriage, Parenting & Personal Health",
    subtitle: "Assess the Health of Your Most Important Relationships",
    description: "Your marriage, parenting, and personal health are connected. This diagnostic reveals the real health of your life in these three areas—and what to do about it.",
    coverUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/leadmagnet-life-diagnostic-gXNiCnwGXCDEF2cB7u2bj.webp",
    pillar: "Integrated Life",
    readingPathSlug: "marriage-family-ministry",
    expectedConversionRate: 0.22,
  },
  "community-roadmap": {
    id: "community-roadmap",
    title: "The Community Action Roadmap: 7 Steps to Make a Real Difference",
    subtitle: "From Passion to Impact in 30 Days",
    description: "Most people want to change the world but don't know where to start. This roadmap gives you 7 concrete steps to make a real difference in your community—starting this week.",
    coverUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/leadmagnet-community-roadmap-KCRw7SuKppH4vgbhRYg3q2.webp",
    pillar: "Prophetic Justice",
    readingPathSlug: "cultural-engagement-justice",
    expectedConversionRate: 0.15,
  },
};

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Church Planter",
    quote: "This audit completely changed how I see my leadership. I discovered blind spots I didn't know I had.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Senior Pastor",
    quote: "The insights were immediately actionable. I've already made changes based on what I learned.",
    rating: 5,
  },
  {
    name: "Lisa Martinez",
    role: "Ministry Leader",
    quote: "Finally, a resource that speaks to the real challenges we face. Highly recommended.",
    rating: 5,
  },
];

export function LeadMagnetLanding({ magnetId }: { magnetId: string }) {
  const magnet = LEAD_MAGNETS[magnetId];
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!magnet) {
    return <div className="text-center py-20">Lead magnet not found</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Track signup and send email
      const response = await fetch("/api/lead-magnets/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          magnetId: magnet.id,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Check Your Email!</h1>
          <p className="text-lg text-muted-foreground mb-6">
            We've sent {magnet.title} to <strong>{email}</strong>
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Check your inbox (and spam folder) for your download link. You'll also receive our email series with insights and next steps.
          </p>
          <Button asChild className="w-full">
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <div className="inline-block px-3 py-1 bg-accent/10 rounded-full text-sm font-semibold text-accent mb-4">
              {magnet.pillar}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {magnet.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {magnet.subtitle}
            </p>
            <p className="text-lg mb-8 leading-relaxed">
              {magnet.description}
            </p>

            {/* Email Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 text-base"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base font-semibold"
              >
                {loading ? "Sending..." : "Get Instant Access"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                <Lock className="w-3 h-3 inline mr-1" />
                Your email is safe. No spam, ever.
              </p>
            </form>
          </div>

          {/* Right: Cover Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <img
                src={magnet.coverUrl}
                alt={magnet.title}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Get</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Instant Self-Assessment",
                description: "Get personalized insights about your current state in minutes, not weeks.",
              },
              {
                title: "Actionable Next Steps",
                description: "Don't just diagnose the problem—get specific, implementable solutions.",
              },
              {
                title: "Exclusive Email Series",
                description: "Receive 5 follow-up emails with interpretation guides and resources.",
              },
            ].map((item, i) => (
              <Card key={i} className="p-6">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What People Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <Card key={i} className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "What format is it?",
                a: "It's a beautiful, interactive PDF that you can download immediately after signing up.",
              },
              {
                q: "How long does it take?",
                a: "Most people complete it in 5-10 minutes. You can work through it at your own pace.",
              },
              {
                q: "What will I learn?",
                a: "You'll get personalized insights, discover your blind spots, and receive actionable next steps.",
              },
              {
                q: "Is there a catch?",
                a: "Nope! It's completely free. We'll send you follow-up emails with resources, but no spam.",
              },
            ].map((item, i) => (
              <div key={i}>
                <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of people who've already downloaded this guide.
          </p>
          <Button size="lg" className="px-8 py-3 text-base">
            Get Your Free Guide Now
          </Button>
        </div>
      </section>
    </div>
  );
}
