/**
 * Family devotions (/family/devotions): the library. Every devotion has its
 * own page (/family/devotions/:id), so this is a list of doors: 72 weekly
 * devotions (more than a year at one a week), plus the daily sets for
 * Thanksgiving week, Advent, and Holy Week. The tab is in the URL (?tab=), so
 * a link can open the Advent list, and &day=N opens that day's page; a
 * devotion done on this device carries a quiet mark. Data: the family index (client/public/family/index.json,
 * scripts/build-family-index.mjs); the list shows references, not verse text.
 * scripts/validate-family.mjs checks the counts this page states.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { PageHead } from "@/components/editorial/PageHead";
import { EditorialIndex, type IndexItem } from "@/components/editorial/EditorialIndex";
import LoadFailed from "@/components/LoadFailed";
import { devotionHref, readFamilyProgress, type FamilyIndexRow } from "@/lib/familyTable";
import type { FamilySetKey } from "@/lib/familyYear";
import { useFamilyIndex } from "./family/useFamilyData";

type Tab = "weekly" | FamilySetKey;

/** Each tab's address, and the booklet files scripts/lib/help-printables.mjs builds for each daily set. */
const TABS: { id: Tab; param: string; file?: string }[] = [
  { id: "weekly", param: "weekly" },
  { id: "thanksgiving", param: "thanksgiving", file: "thanksgiving" },
  { id: "advent", param: "advent", file: "advent" },
  { id: "holyWeek", param: "holy-week", file: "holy-week" },
];

export default function FamilyDevotions() {
  const { state, retry } = useFamilyIndex();
  const index = state.status === "ready" ? state.value : null;
  const search = useSearch();
  const [, navigate] = useLocation();
  const query = new URLSearchParams(search);
  const param = query.get("tab");
  const tab: Tab = TABS.find((t) => t.param === param)?.id ?? "weekly";
  const day = Number(query.get("day"));
  const [done] = useState(() => new Set(readFamilyProgress().done.map((d) => d.id)));

  // ?tab=advent&day=6 names one day of a set (U13's Advent links use it):
  // open that day's own page in place of the list.
  useEffect(() => {
    if (!index || tab === "weekly" || !Number.isInteger(day) || day < 1) return;
    const row = index.devotions.find((r) => r.set === tab && r.day === day);
    if (row) navigate(devotionHref(row.id), { replace: true });
  }, [index, tab, day, navigate]);

  const rows = useMemo(() => {
    if (!index) return [];
    return index.devotions.filter((r) => (tab === "weekly" ? r.kind === "weekly" : r.set === tab));
  }, [index, tab]);

  const tabs = index
    ? TABS.map((t) => ({
        ...t,
        label: t.id === "weekly" ? "Weekly" : index.sets[t.id]?.label ?? t.param,
        count: t.id === "weekly" ? index.weekly : index.sets[t.id]?.days ?? 0,
      })).filter((t) => t.count > 0)
    : [];

  // Numbered as a place in the set, not as weeks of a year: there are more
  // devotions than weeks.
  const item = (r: FamilyIndexRow): IndexItem => ({
    href: devotionHref(r.id),
    kicker: r.kind === "weekly" ? `${r.n} of ${index?.weekly} · ${r.theme}` : r.label,
    title: r.title,
    meta: (
      <>
        <span>{r.passage}</span>
        {done.has(r.id) && <span>Done on this device</span>}
      </>
    ),
  });

  const current = TABS.find((t) => t.id === tab);
  const setLabel = tab !== "weekly" ? index?.sets[tab]?.label : undefined;

  return (
    <Layout>
      <SEOMeta
        title="Family Devotions: Weekly, Thanksgiving, Advent, and Holy Week"
        description="Seventy-two weekly family devotions, more than a year of them, plus daily devotionals for Thanksgiving week, Advent, and Holy Week, each with a passage, a question, and a prayer."
        url="https://www.livewellbyjamesbell.co/family/devotions"
      />

      <PageHead
        eyebrow={
          <>
            <Link href="/family" style={{ color: "inherit" }}>
              Family
            </Link>
            <span>· Devotions</span>
          </>
        }
        title="A devotion a week, together."
        lede="Seventy-two weekly devotions, more than a year of them, plus daily readings for Thanksgiving week, Advent, and Holy Week."
        actions={
          <Link href="/family/tonight" className="pg-action">
            Tonight's devotion
          </Link>
        }
      />

      {/* TABS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-4) 16px 0" }}>
        <div role="group" aria-label="Which devotions" style={{ maxWidth: "var(--w-default)", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={tab === t.id}
              onClick={() => navigate(t.id === "weekly" ? "/family/devotions" : `/family/devotions?tab=${t.param}`, { replace: true })}
              style={{
                fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, minHeight: "44px", padding: "10px 16px", borderRadius: "999px", cursor: "pointer",
                border: `1px solid ${tab === t.id ? "var(--mustard)" : "var(--border)"}`, background: tab === t.id ? "var(--bone-warm)" : "transparent", color: "var(--ink)",
              }}
            >
              {t.label} · {t.count}
            </button>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-4) 16px var(--s-7)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          {state.status === "failed" && <LoadFailed what="The family devotions" onRetry={retry} backHref="/family" backLabel="Back to Family" />}
          {state.status === "loading" && (
            <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }} role="status">
              Loading…
            </p>
          )}
          {index && (
            <>
              {tab === "weekly" ? (
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink)", margin: "0 0 var(--s-3)" }}>
                  Print every weekly devotion as a card for the table, two to a page, each passage in full:{" "}
                  <a href="/downloads/tools/family-cards-letter.pdf" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>US Letter</a>{" · "}
                  <a href="/downloads/tools/family-cards-a4.pdf" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>A4</a>
                </p>
              ) : (
                current?.file && (
                  <p style={{ fontFamily: "var(--U)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink)", margin: "0 0 var(--s-3)" }}>
                    Print the whole {setLabel} booklet, one day to a page, with each passage in full from the Berean Standard Bible:{" "}
                    <a href={`/downloads/seasonal/${current.file}-family-letter.pdf`} style={{ color: "var(--mustard-text)", fontWeight: 600 }}>US Letter</a>{" · "}
                    <a href={`/downloads/seasonal/${current.file}-family-a4.pdf`} style={{ color: "var(--mustard-text)", fontWeight: 600 }}>A4</a>
                  </p>
                )
              )}
              <EditorialIndex label={tab === "weekly" ? "Weekly devotions" : `${setLabel} devotions`} items={rows.map(item)} compact />
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
