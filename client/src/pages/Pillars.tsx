import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { PillarsEmailSignup } from "@/components/PillarsEmailSignup";

const PILLARS = [
  {
    id: "prophetic-disruption",
    name: "Prophetic Disruption",
    color: "#1A1A1A",
    description: "What needs to be challenged. The comfortable assumptions, the unexamined traditions, the systems that serve institutions more than people. This pillar exposes the places where the church has adopted the world's values and called it Christianity.",
    keyThemes: ["Cultural critique", "Challenging assumptions", "Biblical clarity", "Prophetic witness", "Uncomfortable truths"],
  },
  {
    id: "theological-depth",
    name: "Theological Depth",
    description: "What needs to be understood. Greek and Hebrew, church fathers, and serious theology—translated into language anyone can grasp on the first read. This pillar builds theological literacy and grounds faith in Scripture and tradition.",
    color: "#2C3E50",
    keyThemes: ["Biblical languages", "Church history", "Systematic theology", "Scriptural foundation", "Doctrinal clarity"],
  },
  {
    id: "prophetic-justice",
    name: "Prophetic Justice",
    description: "What needs to be named. The places where the church has been silent when it should have spoken, complicit when it should have resisted. This pillar calls the church to prophetic action on behalf of the vulnerable and marginalized.",
    color: "#2D4A3E",
    keyThemes: ["Social justice", "Racial reconciliation", "Economic justice", "Systemic injustice", "Prophetic action"],
  },
  {
    id: "integrated-life",
    name: "Integrated Life",
    description: "What needs to be lived. Marriage, parenting, finances, daily existence—theology that doesn't stay theoretical but walks through your front door. This pillar helps you apply faith to every dimension of life.",
    color: "#B8963E",
    keyThemes: ["Marriage and family", "Personal finance", "Work and calling", "Spiritual disciplines", "Practical faith"],
  },
  {
    id: "leadership-formation",
    name: "Leadership Formation",
    description: "What leaders need to face. Not management techniques or growth strategies, but the interior work that makes a leader worth following. This pillar develops leaders who lead from conviction, not just competence.",
    color: "#2C3E50",
    keyThemes: ["Character development", "Spiritual leadership", "Vision and strategy", "Team building", "Pastoral care"],
  },
];

export default function Pillars() {
  const [showEmailSignup, setShowEmailSignup] = useState(false);

  return (
    <Layout>
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-5xl font-bold mb-6" style={{ color: "#1A1A1A" }}>
              The Five Pillars of LiveWell
            </h1>
            <p className="text-xl" style={{ color: "#6B7280" }}>
              Everything at LiveWell is organized around five core pillars. Understanding these will help you navigate the content and find what matters most to you.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="space-y-12">
            {PILLARS.map((pillar, index) => (
              <div
                key={pillar.id}
                className="border-l-4 pl-8 py-6 rounded-r-lg hover:shadow-md transition-shadow"
                style={{ borderColor: pillar.color, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-2" style={{ color: pillar.color }}>
                      {pillar.name}
                    </h2>
                    <p className="text-lg" style={{ color: "#6B7280" }}>
                      Pillar {index + 1} of 5
                    </p>
                  </div>
                </div>

                <p className="text-lg mb-6" style={{ color: "#1A1A1A", lineHeight: 1.8 }}>
                  {pillar.description}
                </p>

                <div className="mb-6">
                  <h3 className="font-semibold mb-3" style={{ color: pillar.color }}>
                    Key Themes:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pillar.keyThemes.map((theme) => (
                      <span
                        key={theme}
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: pillar.color, color: "#F7F5F0" }}
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/writing?pillar=${pillar.id}`}
                  className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
                  style={{ color: pillar.color }}
                >
                  Read articles on this pillar
                  <ArrowRight size={20} />
                </Link>
              </div>
            ))}
          </div>

          {/* How to Use */}
          <div className="mt-16 p-8 rounded-lg" style={{ backgroundColor: "#F7F5F0" }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#1A1A1A" }}>
              How to Use These Pillars
            </h2>
            <ul className="space-y-3" style={{ color: "#1A1A1A" }}>
              <li className="flex gap-3">
                <span style={{ color: "#B8963E" }} className="font-bold">
                  1.
                </span>
                <span>
                  <strong>Start with your need:</strong> Are you looking for prophetic challenge? Theological grounding? Practical life application? Find the pillar that matches.
                </span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: "#B8963E" }} className="font-bold">
                  2.
                </span>
                <span>
                  <strong>Explore systematically:</strong> Each pillar has dozens of articles. Use the filters to dive deep into one pillar or explore across all five.
                </span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: "#B8963E" }} className="font-bold">
                  3.
                </span>
                <span>
                  <strong>Follow reading paths:</strong> Our curated reading paths combine articles from multiple pillars to take you on a spiritual journey.
                </span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: "#B8963E" }} className="font-bold">
                  4.
                </span>
                <span>
                  <strong>Subscribe for more:</strong> Get weekly articles delivered to your inbox, filtered by the pillars you care most about.
                </span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/writing"
              className="inline-block px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-shadow"
              style={{ backgroundColor: "#B8963E", color: "#F7F5F0" }}
            >
              Start Reading
            </Link>
          </div>

          {/* Email Signup CTA */}
          <div className="mt-20 py-12 rounded-lg" style={{ backgroundColor: "#F7F5F0" }}>
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold mb-4" style={{ color: "#1A1A1A" }}>
                Ready to Transform Your Life?
              </h2>
              <p className="font-body text-lg mb-8" style={{ color: "#6B7280" }}>
                Get a free PDF guide explaining all 5 pillars and how to use them to deepen your faith and impact.
              </p>
              <button
                onClick={() => setShowEmailSignup(true)}
                className="px-8 py-3 rounded font-ui font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "#B8963E" }}
              >
                Get Free Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      <PillarsEmailSignup isOpen={showEmailSignup} onClose={() => setShowEmailSignup(false)} />
    </Layout>
  );
}
