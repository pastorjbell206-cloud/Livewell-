/**
 * /tools: the Tools door, "Tools and resources", built the way a door's page
 * is built (components/art/README.md, "How a door's page is built";
 * pages/Study.tsx is the model).
 *
 * 1. PageHead at the door size, with the Tools door's plate.
 * 2. The one thing to do first: a find box, on a charcoal band, that narrows
 *    the tiles as you type by what a person wants to do, and says so when
 *    nothing matches. Under it, the four groups, one tap each.
 * 3. The groups of James's map (docs/work/elite/PROJECT-PROMPT.md): Study,
 *    Tools for hard questions, Check yourself, Pray and practice. Every tool
 *    once, under its one name, from lib/toolsList.ts. Each group is linkable:
 *    /tools#study, /tools#hard-questions, /tools#check-yourself,
 *    /tools#pray-and-practise (the older hashes are followed too).
 * 4. Leading on: eight-week plans for a hard season, the study guides for
 *    groups and churches, and the downloads, as picture cards; then one line
 *    pointing families to the family page.
 */
import { lazy, Suspense } from "react";

import Layout from "@/components/Layout";
import DoorInside from "@/components/art/DoorInside";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import "./home/home.css";

/** Everything below the page top, as its own chunk (pages/ToolsBody.tsx). */
const ToolsBody = lazy(() => import("./ToolsBody"));

export default function ToolsHub() {
  return (
    <Layout>
      <SEOMeta
        title="Free Bible Study, Prayer, and Family Tools"
        description="Free tools for Bible study, prayer, marriage, and family life: a verse finder, written prayers, a family devotion builder, and self-checks."
        keywords="Bible verse finder, prayer generator, family devotions, Christian tools, marriage tools, parenting tools"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Free Bible Study, Prayer, and Family Tools",
          description: "Free tools for families and anyone practicing the faith.",
          url: "https://www.livewellbyjamesbell.co/tools",
        }}
      />

      <PageHead
        size="door"
        door="Tools"
        title="Tools and resources"
        line="Every tool on LiveWell, free, and each one works on a phone."
        plate="compass"
        action={
          <a href="#tl-find" className="btn">
            Find a tool
          </a>
        }
      />

      {/* The band holds the find box's place until the list arrives. */}
      <Suspense fallback={<div className="home-sec home-sec--dark tl-find-band tl-hold" aria-hidden="true" />}>
        <ToolsBody />
      </Suspense>

      {/* What sits inside the rooms the list above does not name, from the catalogue. */}
      <DoorInside door="tools" title="Inside the rooms." />
    </Layout>
  );
}
