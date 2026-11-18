/**
 * Self-checks (/assessments). The address stays live, and what it shows is
 * the tools page's "Check yourself" group (TOOLS-PLAN unit 6: the self-checks
 * are listed once, on /tools#check-yourself). Every tile reads its name, job,
 * time and what it keeps from lib/toolsList.ts, so a self-check has the same
 * name here as everywhere else. Routing only: every self-check keeps its own
 * page and logic.
 */
import { Link } from "wouter";
import { ListChecks, Wrench } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import SectionHead from "@/components/art/SectionHead";
import ToolTile from "@/components/art/ToolTile";
import { TOOL_GROUPS } from "@/lib/toolsList";
import { followHash } from "@/lib/followHash";
import "./home/home.css";

const CHECKS = TOOL_GROUPS.find((g) => g.id === "check-yourself")!;

// ItemList so the self-checks are indexed as one collection, each pointing at its own page.
const assessmentsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Assessments",
  description: "Honest self-checks: where you are with God, the whole of life, marriage, emotional and financial health, spiritual gifts, and belief.",
  url: "https://www.livewellbyjamesbell.co/assessments",
  itemListElement: CHECKS.tools.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    url: `https://www.livewellbyjamesbell.co${t.href}`,
  })),
};

export default function Assessments() {
  return (
    <Layout>
      <SEOMeta
        title="Self-Checks for Faith, Marriage, and Daily Life"
        description="Every self-check on the site in one place: faith, the whole of life, marriage, emotional and financial health, and belief. None of them grades you."
        url="https://www.livewellbyjamesbell.co/assessments"
        structuredData={assessmentsSchema}
      />

      <PageHead
        door="Tools"
        doorHref="/tools"
        title="Self-checks"
        line="Short, honest self-checks. None of them grades you, and what you answer stays on this device."
        action={
          <Link href="/tools" className="btn btn--quiet">
            Every tool
          </Link>
        }
      />

      <section className="home-sec" aria-labelledby="checks-title">
        <div className="home-wrap">
          <SectionHead icon={ListChecks} label={`${CHECKS.tools.length} self-checks`} title="Pick the one for what you are carrying." id="checks-title" />
          <ul className="lw-tools">
            {CHECKS.tools.map((t) => (
              <li key={t.id}>
                <ToolTile tool={t} />
              </li>
            ))}
          </ul>
          <p className="lw-newline">
            <Wrench aria-hidden="true" size={22} strokeWidth={1.75} />
            <span>
              Want to test how you read the Bible, or how fair you are to the other side? Those are under{" "}
              <Link href="/tools#hard-questions" onClick={() => followHash("/tools#hard-questions")}>{TOOL_GROUPS.find((g) => g.id === "hard-questions")!.name}</Link>.
            </span>
          </p>
        </div>
      </section>
    </Layout>
  );
}
