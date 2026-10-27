/**
 * Family devotions (/family/devotions): the library. Every devotion has its
 * own page (/family/devotions/:id), so this is a list of doors, by strand and
 * theme (U21): the weekly strands (Foundations, 72 devotions, more than a year
 * at one a week, set out by theme; the world and church strands join as their
 * files land), then the daily sets for Thanksgiving week, Advent, and Holy
 * Week. The tab is in the URL (?tab=), and so is the theme (?theme=), so a
 * link can open the Advent list or the devotions on hard days; &day=N opens
 * that day's page (Home's and /family's Advent links, lib/familyAdvent.ts
 * adventHref, use both). A devotion done on this device carries a quiet mark,
 * and tonight's day of a daily set is marked Tonight. The Advent tab says when
 * Advent itself begins, since the set is a December 1 to 25 calendar. Data:
 * the family index (client/public/family/index.json,
 * scripts/build-family-index.mjs); the list shows references, not verse text.
 * scripts/validate-family.mjs checks the counts this page states. A strand
 * beside Foundations (The world we live in, ?tab=world, U11) gets its tab only
 * once its file is live and the index lists it; until then the tab is not
 * there and ?tab=world opens Foundations.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { PageHead } from "@/components/editorial/PageHead";
import { EditorialIndex, type IndexItem } from "@/components/editorial/EditorialIndex";
import LoadFailed from "@/components/LoadFailed";
import { devotionHref, readFamilyProgress, type FamilyIndex, type FamilyIndexRow } from "@/lib/familyTable";
import { familySetDayOn, localISODate, type FamilySetKey } from "@/lib/familyYear";
import { adventSeasonFor, longDate } from "@/lib/familyAdvent";
import { useFamilyIndex } from "./family/useFamilyData";

/** The daily sets, each with its address and the booklet files scripts/lib/help-printables.mjs builds for it. */
const SET_TABS: { id: FamilySetKey; param: string; file: string }[] = [
  { id: "thanksgiving", param: "thanksgiving", file: "thanksgiving" },
  { id: "advent", param: "advent", file: "advent" },
  { id: "holyWeek", param: "holy-week", file: "holy-week" },
];

/** The first strand is the library's default tab, with no ?tab= (older links say ?tab=weekly). */
const FIRST_STRAND = "foundations";

interface Tab {
  kind: "strand" | "set";
  id: string;
  param: string;
  label: string;
  count: number;
  file?: string;
}

/** The tabs this index has: its weekly strands, then its daily sets. */
function tabsOf(index: FamilyIndex): Tab[] {
  const strands = index.strands?.length ? index.strands : [{ key: FIRST_STRAND, label: "Weekly", count: index.weekly }];
  return [
    ...strands.map((s) => ({ kind: "strand" as const, id: s.key, param: s.key, label: s.label, count: s.count })),
    ...SET_TABS.map((t) => ({ kind: "set" as const, id: t.id, param: t.param, file: t.file, label: index.sets[t.id]?.label ?? t.param, count: index.sets[t.id]?.days ?? 0 })),
  ].filter((t) => t.count > 0);
}

const urlFor = (tab: string | null, theme: string | null = null) => {
  const q = new URLSearchParams();
  if (tab) q.set("tab", tab);
  if (theme) q.set("theme", theme);
  const s = q.toString();
  return `/family/devotions${s ? `?${s}` : ""}`;
};

export default function FamilyDevotions() {
  const { state, retry } = useFamilyIndex();
  const index = state.status === "ready" ? state.value : null;
  const search = useSearch();
  const [, navigate] = useLocation();
  const query = new URLSearchParams(search);
  const param = query.get("tab");
  const day = Number(query.get("day"));
  const tabs = useMemo(() => (index ? tabsOf(index) : []), [index]);
  const set = SET_TABS.find((t) => t.param === param);
  // A daily set by its address; a strand by its key; anything else, the first strand.
  const tabId: string = set?.id ?? tabs.find((t) => t.kind === "strand" && t.param === param)?.id ?? FIRST_STRAND;
  const tab = tabs.find((t) => t.id === tabId);
  // The theme groups are the first strand's (scripts/lib/family-index.mjs GROUPS).
  const groups = (tabId === FIRST_STRAND && index?.groups?.filter((g) => g.count > 0)) || [];
  const theme = groups.find((g) => g.key === query.get("theme"))?.key ?? null;
  const [done] = useState(() => new Set(readFamilyProgress().done.map((d) => d.id)));
  // Tonight's day of a daily set, and this year's Advent Sunday, from the
  // reader's own clock and the static year map (no network).
  const [today] = useState(() => localISODate());
  const tonight = familySetDayOn(today);
  const advent = adventSeasonFor(today);

  // ?tab=advent&day=6 names one day of a set (U13's Advent links use it):
  // open that day's own page in place of the list.
  useEffect(() => {
    if (!index || !set || !Number.isInteger(day) || day < 1) return;
    const row = index.devotions.find((r) => r.set === set.id && r.day === day);
    if (row) navigate(devotionHref(row.id), { replace: true });
  }, [index, set, day, navigate]);

  const rows = useMemo(() => {
    if (!index) return [];
    if (set) return index.devotions.filter((r) => r.set === set.id);
    // Rows from before strands were named belong to the first one.
    return index.devotions.filter((r) => r.kind === "weekly" && (r.strand ?? FIRST_STRAND) === tabId);
  }, [index, set, tabId]);

  // Numbered as a place in the strand, not as weeks of a year: there are
  // more devotions than weeks.
  const item = (r: FamilyIndexRow): IndexItem => ({
    href: devotionHref(r.id),
    kicker:
      r.kind === "weekly"
        ? `${r.n} of ${tab?.count ?? index?.weekly} · ${r.theme}`
        : tonight && tonight.set === r.set && tonight.day === r.day
          ? `${r.label} · Tonight`
          : r.label,
    title: r.title,
    meta: (
      <>
        <span>{r.passage}</span>
        {done.has(r.id) && <span>Done on this device</span>}
      </>
    ),
  });

  // The weekly strand set out by theme: every group under its own heading,
  // or the one the reader chose. Rows with no group (a strand that has none) list plainly.
  const shelves: { key: string; label: string; rows: FamilyIndexRow[] }[] =
    !set && groups.length
      ? [
          ...groups.filter((g) => !theme || g.key === theme).map((g) => ({ key: g.key, label: g.label, rows: rows.filter((r) => r.group === g.key) })),
          ...(theme ? [] : [{ key: "", label: "", rows: rows.filter((r) => !groups.some((g) => g.key === r.group)) }]),
        ].filter((s) => s.rows.length > 0)
      : [{ key: "", label: "", rows }];

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

      {/* TABS: the weekly strands, then the daily sets */}
      <section style={{ background: "var(--bone)", padding: "var(--s-4) 16px 0" }}>
        <div role="group" aria-label="Which devotions" style={{ maxWidth: "var(--w-default)", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={tabId === t.id}
              onClick={() => navigate(urlFor(t.id === FIRST_STRAND ? null : t.param), { replace: true })}
              style={{
                fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, minHeight: "44px", padding: "10px 16px", borderRadius: "999px", cursor: "pointer",
                border: `1px solid ${tabId === t.id ? "var(--mustard)" : "var(--border)"}`, background: tabId === t.id ? "var(--bone-warm)" : "transparent", color: "var(--ink)",
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
              {!set ? (
                <>
                  {tabId === FIRST_STRAND && (
                    <p style={{ fontFamily: "var(--U)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink)", margin: "0 0 var(--s-3)" }}>
                      Print every weekly devotion as a card for the table, two to a page, each passage in full and a code that opens its page:{" "}
                      <a href="/downloads/tools/family-cards-letter.pdf" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>US Letter</a>{" · "}
                      <a href="/downloads/tools/family-cards-a4.pdf" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>A4</a>
                    </p>
                  )}
                  {groups.length > 0 && (
                    <label className="tb-lib__theme">
                      <span>Theme</span>
                      <select value={theme ?? ""} onChange={(e) => navigate(urlFor(null, e.target.value || null), { replace: true })}>
                        <option value="">All themes · {tab?.count}</option>
                        {groups.map((g) => (
                          <option key={g.key} value={g.key}>
                            {g.label} · {g.count}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                </>
              ) : (
                tab?.file && (
                  <>
                    {/* The set is a December 1 to 25 calendar; Advent itself begins on
                        Advent Sunday. Say both, so no one reads December 1 as Advent's start. */}
                    {set.id === "advent" && (
                      <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", margin: "0 0 var(--s-2)", maxWidth: "68ch" }}>
                        Advent begins on the fourth Sunday before Christmas{advent ? ` (${longDate(advent.adventSunday, { weekday: false, year: true })})` : ""}. This calendar has a reading for each day from December 1 to Christmas Day.
                      </p>
                    )}
                    <p style={{ fontFamily: "var(--U)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink)", margin: "0 0 var(--s-3)" }}>
                      Print the whole {tab.label} booklet, one day to a page, with each passage in full from the Berean Standard Bible:{" "}
                      <a href={`/downloads/seasonal/${tab.file}-family-letter.pdf`} style={{ color: "var(--mustard-text)", fontWeight: 600 }}>US Letter</a>{" · "}
                      <a href={`/downloads/seasonal/${tab.file}-family-a4.pdf`} style={{ color: "var(--mustard-text)", fontWeight: 600 }}>A4</a>
                    </p>
                  </>
                )
              )}
              {shelves.map((s) =>
                s.label ? (
                  <section key={s.key} className="tb-lib__shelf" aria-labelledby={`tb-theme-${s.key}`}>
                    <h2 id={`tb-theme-${s.key}`} className="tb-lib__heading">
                      {s.label}
                    </h2>
                    <EditorialIndex label={s.label} items={s.rows.map(item)} compact />
                  </section>
                ) : (
                  <EditorialIndex key="all" label={set ? `${tab?.label} devotions` : `${tab?.label ?? "Weekly"} devotions`} items={s.rows.map(item)} compact />
                ),
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
