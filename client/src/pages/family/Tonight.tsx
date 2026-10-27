/**
 * /family/tonight: one address that always means tonight's family devotion,
 * so a printed card's code, a phone reminder, and Home can all point at it.
 * It works out tonight from the static year map and the reader's own
 * calendar (lib/familyTable, no network) and moves on, replacing itself in
 * history, to that devotion's page; ?mode=table is carried along, so a link
 * can open tonight's devotion straight at the table.
 */
import { useEffect, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { PageHead } from "@/components/editorial/PageHead";
import { localISODate } from "@/lib/familyYear";
import { devotionHref, tonightOn } from "@/lib/familyTable";

export default function Tonight() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const [tonight] = useState(() => tonightOn(localISODate()));

  useEffect(() => {
    if (!tonight) return;
    const mode = new URLSearchParams(search).get("mode") === "table" ? "?mode=table" : "";
    navigate(`${devotionHref(tonight.id)}${mode}`, { replace: true });
  }, [tonight, search, navigate]);

  return (
    <Layout>
      <SEOMeta
        title="Tonight at the Table: A Family Devotion"
        description="Tonight's family devotion: a passage to read, one idea to talk about, questions for the table, and a prayer, in about ten minutes."
        url="https://www.livewellbyjamesbell.co/family/tonight"
      />
      <PageHead
        eyebrow={
          <Link href="/family" style={{ color: "inherit" }}>
            Family
          </Link>
        }
        title="Tonight at the table"
        lede={tonight ? "Opening tonight's devotion." : "No devotion is set for this date yet. Choose one from the library."}
        actions={
          <Link href="/family/devotions" className="pg-action pg-action--quiet">
            All family devotions
          </Link>
        }
      />
    </Layout>
  );
}
