/**
 * /family/tonight: one address that always means tonight's family devotion,
 * so a printed card's code, a phone reminder, and Home can all point at it.
 * It works out tonight from the static year map and the reader's own
 * calendar (lib/familyTable, no network) and moves on, replacing itself in
 * history, to that devotion's page; ?mode=table is carried along, so a link
 * can open tonight's devotion straight at the table. When this device has
 * the week's devotion marked done, the page stays put and shows "Done this
 * week" (DoneThisWeek) instead of opening the same devotion again.
 */
import { useEffect, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import { adventWaitingLine } from "@/components/AdventAtTheTable";
import { localISODate } from "@/lib/familyYear";
import { devotionHref, doneThisWeek, readFamilyProgress, tonightOn, tonightTitle } from "@/lib/familyTable";
import DoneThisWeek from "./DoneThisWeek";
import { useFamilyIndex } from "./useFamilyData";
import "../home/home.css";

export default function Tonight() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const [today] = useState(() => localISODate());
  const [tonight] = useState(() => tonightOn(today));
  // Advent Sunday to November 30 has no devotion of its own: say when the calendar starts, as Home does.
  const [waiting] = useState(() => (tonight ? null : adventWaitingLine(today)));
  // A family that has done this week's devotion is not sent back into it
  // (audit 2026-11, F3): the page stays and says what the other nights hold.
  const [done] = useState(() => (tonight ? doneThisWeek(readFamilyProgress(), tonight.id, today) : null));
  const { state } = useFamilyIndex();
  const index = state.status === "ready" ? state.value : null;
  const row = tonight ? index?.devotions.find((r) => r.id === tonight.id) : undefined;

  useEffect(() => {
    if (!tonight || done) return;
    const mode = new URLSearchParams(search).get("mode") === "table" ? "?mode=table" : "";
    navigate(`${devotionHref(tonight.id)}${mode}`, { replace: true });
  }, [tonight, done, search, navigate]);

  return (
    <Layout>
      <SEOMeta
        title="Tonight's Family Devotion"
        description="Tonight's family devotion: a passage to read, one idea to talk about, questions for the table, and a prayer, in about ten minutes."
        url="https://www.livewellbyjamesbell.co/family/tonight"
      />
      <PageHead
        door="Family"
        doorHref="/family"
        title="Tonight's family devotion"
        line={
          done ? undefined : tonight ? (
            "Opening tonight's devotion."
          ) : waiting ? (
            <>
              {waiting.lead}{" "}
              <Link href={waiting.href} className="tb-inline-link">
                {waiting.link}
              </Link>
              .
            </>
          ) : (
            "No devotion is set for this date yet. Choose one from the library."
          )
        }
        plate="table"
        action={
          <Link href="/family/devotions" className="btn btn--quiet">
            All family devotions
          </Link>
        }
      />
      {tonight && done && (
        <section className="home-sec home-sec--warm fm-tonight">
          <div className="home-wrap">
            <div className="tb-tonight">
              <DoneThisWeek
                id={tonight.id}
                title={row?.title ?? tonightTitle(tonight) ?? "this week's devotion"}
                passage={row?.passage}
                done={done}
                today={today}
                index={index}
                chooseHref="/family#choose"
              />
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
