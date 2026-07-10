/**
 * Sermon Series Library — /sermon-series
 *
 * Turns the 60 post-Christian articles into structured 4–8 week
 * preaching plans. Grid of series cards → detail view with weekly
 * breakdown → expandable outlines with texts, illustrations, and
 * application questions.
 */
import { useState, useRef, useCallback } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SERMON_SERIES } from "@/data/sermon-series";
import type { SermonSeriesData, SermonWeek } from "@/data/sermon-series";
import {
  ChevronDown,
  ChevronLeft,
  BookOpen,
  Users,
  Calendar,
  Printer,
  FileText,
  ArrowRight,
} from "lucide-react";

/* ─── Shared inline-style constants ─────────────────────────────── */
const WRAP = { maxWidth: "var(--w-default)", margin: "0 auto", padding: "0 32px" } as const;
const WRAP_NARROW = { maxWidth: "880px", margin: "0 auto", padding: "0 32px" } as const;

/* ─── Main component ────────────────────────────────────────────── */
export default function SermonSeriesPage() {
  const [activeSeries, setActiveSeries] = useState<SermonSeriesData | null>(null);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const openSeries = useCallback((s: SermonSeriesData) => {
    setActiveSeries(s);
    setExpandedWeek(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const closeSeries = useCallback(() => {
    setActiveSeries(null);
    setExpandedWeek(null);
  }, []);

  const toggleWeek = useCallback((week: number) => {
    setExpandedWeek((prev) => (prev === week ? null : week));
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <Layout>
      <SEOMeta
        title="Sermon Series Library — Ready-to-Preach Series for Pastors"
        description="Structured 4-8 week preaching plans built from 60 post-Christian articles. Real Scripture, genuine outlines, concrete illustrations. Ready for your pulpit."
        keywords="sermon series, preaching plans, sermon outlines, post-Christian preaching, pastoral resources, church sermon series"
        url="https://www.livewellbyjamesbell.co/sermon-series"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Sermon Series Library",
          description:
            "Structured preaching plans for pastors, built from post-Christian theological articles.",
          url: "https://www.livewellbyjamesbell.co/sermon-series",
        }}
      />

      <div ref={topRef}>
        {activeSeries ? (
          <SeriesDetail
            series={activeSeries}
            expandedWeek={expandedWeek}
            onToggleWeek={toggleWeek}
            onBack={closeSeries}
            onPrint={handlePrint}
          />
        ) : (
          <SeriesIndex onSelect={openSeries} />
        )}
      </div>
    </Layout>
  );
}

/* ─── Index view: hero + grid ───────────────────────────────────── */
function SeriesIndex({ onSelect }: { onSelect: (s: SermonSeriesData) => void }) {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "96px 32px 72px",
          color: "var(--bone)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 80% at 80% 40%, rgba(212,160,23,0.06), transparent)",
            pointerEvents: "none",
          }}
        />
        <div style={{ ...WRAP, maxWidth: "780px", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              fontFamily: "var(--U)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "var(--mustard)",
              marginBottom: "20px",
            }}
          >
            <span
              style={{ width: "32px", height: "1px", background: "var(--mustard)", display: "inline-block" }}
            />
            For Pastors
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(34px, 5.5vw, 60px)",
              fontWeight: 300,
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              marginBottom: "20px",
            }}
          >
            Sermon Series{" "}
            <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>Library</em>
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "18px",
              lineHeight: 1.75,
              color: "rgba(245,240,230,0.8)",
              maxWidth: "60ch",
              marginBottom: "28px",
            }}
          >
            Ready-to-preach series for pastors. Each plan maps 4 to 8 weeks of
            sermons with real Scripture references, genuine three-point outlines,
            concrete illustration suggestions, and application questions your
            congregation can take home. Built from 60 deeply researched articles
            on post-Christian faith.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(245,240,230,0.1)",
              flexWrap: "wrap" as const,
            }}
          >
            <Stat n={SERMON_SERIES.length.toString()} label="Series" />
            <StatDiv />
            <Stat
              n={SERMON_SERIES.reduce((a, s) => a + s.weeks, 0).toString()}
              label="Total Weeks"
            />
            <StatDiv />
            <Stat n="60" label="Source Articles" />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ background: "var(--bone)", padding: "64px 32px 80px" }}>
        <div style={WRAP}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))",
              gap: "28px",
            }}
          >
            {SERMON_SERIES.map((s) => (
              <SeriesCard key={s.slug} series={s} onSelect={onSelect} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--bone-warm)", padding: "56px 32px", textAlign: "center" as const }}>
        <div style={WRAP_NARROW}>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "28px",
              fontWeight: 400,
              color: "var(--ink)",
              marginBottom: "12px",
            }}
          >
            More pastoral tools
          </h2>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "16px",
              color: "var(--ink-muted)",
              lineHeight: 1.7,
              maxWidth: "50ch",
              margin: "0 auto 24px",
            }}
          >
            Sermon outlines, illustration libraries, leadership formation
            guides, and more — built for working pastors.
          </p>
          <Link
            href="/leadership"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--U)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--ink)",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderBottom: "2px solid var(--mustard)",
              padding: "12px 24px",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "all 240ms var(--ease)",
            }}
          >
            Leadership Formation Hub <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}

/* ─── Series card ───────────────────────────────────────────────── */
function SeriesCard({
  series,
  onSelect,
}: {
  series: SermonSeriesData;
  onSelect: (s: SermonSeriesData) => void;
}) {
  return (
    <button
      onClick={() => onSelect(series)}
      style={{
        textAlign: "left" as const,
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderTop: "2px solid var(--mustard)",
        borderRadius: "2px",
        padding: "28px 24px",
        cursor: "pointer",
        transition: "all 240ms cubic-bezier(0.22,1,0.36,1)",
        display: "flex",
        flexDirection: "column" as const,
        gap: "12px",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 8px 24px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = "none";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap" as const,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontFamily: "var(--U)",
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--mustard-text)",
          }}
        >
          <Calendar size={13} /> {series.weeks} weeks
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontFamily: "var(--U)",
            fontSize: "12px",
            color: "var(--ink-muted)",
          }}
        >
          <Users size={13} /> {series.audience}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--F)",
          fontSize: "22px",
          fontWeight: 500,
          color: "var(--ink)",
          lineHeight: 1.2,
        }}
      >
        {series.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--B)",
          fontSize: "14px",
          lineHeight: 1.7,
          color: "var(--ink-muted)",
          flex: 1,
        }}
      >
        {series.description}
      </p>
      <span
        style={{
          fontFamily: "var(--U)",
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--mustard-text)",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "4px",
        }}
      >
        View series plan <ArrowRight size={13} />
      </span>
    </button>
  );
}

/* ─── Detail view ───────────────────────────────────────────────── */
function SeriesDetail({
  series,
  expandedWeek,
  onToggleWeek,
  onBack,
  onPrint,
}: {
  series: SermonSeriesData;
  expandedWeek: number | null;
  onToggleWeek: (w: number) => void;
  onBack: () => void;
  onPrint: () => void;
}) {
  return (
    <>
      {/* Detail hero */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "56px 32px 48px",
          color: "var(--bone)",
        }}
      >
        <div style={WRAP_NARROW}>
          <button
            onClick={onBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--U)",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--mustard)",
              background: "none",
              border: "none",
              cursor: "pointer",
              marginBottom: "24px",
              padding: 0,
            }}
          >
            <ChevronLeft size={16} /> All Series
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
              flexWrap: "wrap" as const,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontFamily: "var(--U)",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--mustard)",
              }}
            >
              <Calendar size={13} /> {series.weeks} weeks
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontFamily: "var(--U)",
                fontSize: "12px",
                color: "rgba(245,240,230,0.6)",
              }}
            >
              <Users size={13} /> {series.audience}
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(28px, 4.5vw, 46px)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            {series.title}
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "rgba(245,240,230,0.75)",
              maxWidth: "60ch",
              marginBottom: "24px",
            }}
          >
            {series.description}
          </p>
          <button
            onClick={onPrint}
            className="no-print"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--U)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--ink)",
              background: "var(--bone)",
              borderBottom: "2px solid var(--mustard)",
              border: "none",
              padding: "12px 24px",
              borderRadius: "2px",
              cursor: "pointer",
              transition: "all 240ms var(--ease)",
            }}
          >
            <Printer size={14} /> Download Series Guide
          </button>
        </div>
      </section>

      {/* Weekly breakdown */}
      <section style={{ background: "var(--bone)", padding: "48px 32px 80px" }}>
        <div style={WRAP_NARROW}>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "28px",
              fontWeight: 400,
              color: "var(--ink)",
              marginBottom: "8px",
            }}
          >
            Weekly Breakdown
          </h2>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "15px",
              color: "var(--ink-muted)",
              lineHeight: 1.7,
              marginBottom: "32px",
              maxWidth: "60ch",
            }}
          >
            Each week includes a primary text, supporting passages, a three-point
            outline, a suggested illustration, and an application question.
            Expand any week to see the full plan.
          </p>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "12px" }}>
            {series.series.map((week) => (
              <WeekCard
                key={week.week}
                week={week}
                isExpanded={expandedWeek === week.week}
                onToggle={() => onToggleWeek(week.week)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Week card (expandable) ────────────────────────────────────── */
function WeekCard({
  week,
  isExpanded,
  onToggle,
}: {
  week: SermonWeek;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "2px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        style={{
          width: "100%",
          textAlign: "left" as const,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
          padding: "18px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span>
          <span
            style={{
              fontFamily: "var(--U)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "var(--mustard-text)",
            }}
          >
            Week {week.week}
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "var(--F)",
              fontSize: "20px",
              fontWeight: 500,
              color: "var(--ink)",
              lineHeight: 1.2,
              marginTop: "4px",
            }}
          >
            {week.title}
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "var(--U)",
              fontSize: "13px",
              color: "var(--ink-muted)",
              marginTop: "4px",
            }}
          >
            {week.mainText}
          </span>
        </span>
        <ChevronDown
          size={18}
          aria-hidden
          style={{
            flexShrink: 0,
            color: "var(--ink-muted)",
            marginTop: "6px",
            transform: isExpanded ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
          }}
        />
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div
          style={{
            padding: "0 24px 24px",
            borderTop: "1px solid var(--border)",
          }}
        >
          {/* Big Idea */}
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <SectionLabel>The Big Idea</SectionLabel>
            <p
              style={{
                fontFamily: "var(--F)",
                fontSize: "19px",
                fontStyle: "italic",
                lineHeight: 1.5,
                color: "var(--ink)",
                borderLeft: "2px solid var(--mustard)",
                paddingLeft: "16px",
                maxWidth: "60ch",
              }}
            >
              {week.bigIdea}
            </p>
          </div>

          {/* Scripture */}
          <div style={{ marginBottom: "20px" }}>
            <SectionLabel>Scripture</SectionLabel>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap" as const,
                gap: "8px",
                alignItems: "center",
              }}
            >
              <ScriptureChip primary>{week.mainText}</ScriptureChip>
              {week.secondaryTexts.map((t) => (
                <ScriptureChip key={t}>{t}</ScriptureChip>
              ))}
            </div>
          </div>

          {/* Outline */}
          <div style={{ marginBottom: "20px" }}>
            <SectionLabel>Three-Point Outline</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px" }}>
              <OutlinePoint n={1} text={week.outline.point1} />
              <OutlinePoint n={2} text={week.outline.point2} />
              <OutlinePoint n={3} text={week.outline.point3} />
            </div>
          </div>

          {/* Illustration */}
          <div style={{ marginBottom: "20px" }}>
            <SectionLabel>Suggested Illustration</SectionLabel>
            <p
              style={{
                fontFamily: "var(--B)",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--ink)",
                background: "var(--bone-warm)",
                padding: "16px 20px",
                borderRadius: "2px",
                maxWidth: "62ch",
              }}
            >
              {week.illustration}
            </p>
          </div>

          {/* Application */}
          <div style={{ marginBottom: "16px" }}>
            <SectionLabel>Application Question</SectionLabel>
            <p
              style={{
                fontFamily: "var(--B)",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--ink)",
                fontWeight: 500,
                maxWidth: "62ch",
              }}
            >
              {week.applicationQuestion}
            </p>
          </div>

          {/* Related article link */}
          <div style={{ paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
            <Link
              href={`/writing/${week.relatedArticle}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--U)",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--mustard-text)",
                textDecoration: "none",
              }}
            >
              <FileText size={14} /> Read the source article <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Small UI pieces ───────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--U)",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
        color: "var(--mustard-text)",
        marginBottom: "10px",
      }}
    >
      {children}
    </div>
  );
}

function ScriptureChip({
  children,
  primary,
}: {
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "var(--U)",
        fontSize: "13px",
        fontWeight: primary ? 700 : 500,
        color: primary ? "var(--charcoal)" : "var(--ink-muted)",
        background: primary ? "var(--mustard)" : "var(--bone)",
        border: primary ? "none" : "1px solid var(--border)",
        padding: "5px 12px",
        borderRadius: "999px",
      }}
    >
      {primary && <BookOpen size={12} />}
      {children}
    </span>
  );
}

function OutlinePoint({ n, text }: { n: number; text: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
      }}
    >
      <span
        style={{
          fontFamily: "var(--U)",
          fontSize: "12px",
          fontWeight: 700,
          color: "var(--mustard-text)",
          minWidth: "20px",
          marginTop: "2px",
        }}
      >
        {n}.
      </span>
      <p
        style={{
          fontFamily: "var(--B)",
          fontSize: "15px",
          lineHeight: 1.65,
          color: "var(--ink)",
          maxWidth: "58ch",
        }}
      >
        {text}
      </p>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--F)",
          fontSize: "28px",
          fontWeight: 600,
          color: "var(--mustard)",
          lineHeight: 1,
          marginBottom: "2px",
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontFamily: "var(--U)",
          fontSize: "10px",
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
          color: "rgba(245,240,230,0.45)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function StatDiv() {
  return (
    <div
      style={{
        width: "1px",
        height: "32px",
        background: "rgba(245,240,230,0.1)",
      }}
    />
  );
}
