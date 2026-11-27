/**
 * The questions, grouped by what people ask (data/questionGroups.ts), each
 * group a card with its icon. Used on the Questions door (/topics), where a
 * group shows its first four and opens the rest in place, and on the answers
 * index (/answers), where every question is listed. A question links to the
 * page that answers it: an Honest Answer's own page, or the page a topics row
 * opens today (lib/topics rowTarget). A row is never listed twice.
 */
import { useState } from "react";
import { Link } from "wouter";
import type { LucideIcon } from "lucide-react";
import { Briefcase, BookOpen, Church, CloudRain, House, Landmark, LifeBuoy, Scale, Signpost } from "lucide-react";

import { ANSWERS } from "@/data/answers";
import { QUESTION_GROUPS } from "@/data/questionGroups";
import { answerHref, toAnswerPage } from "@/lib/askQuestion";
import { kindLabel, rowTarget, type TopicsIndexRow } from "@/lib/topics";

const ICONS: Record<string, LucideIcon> = {
  true: Scale,
  evil: CloudRain,
  others: Signpost,
  believe: BookOpen,
  church: Church,
  nation: Landmark,
  home: House,
  life: Briefcase,
  hard: LifeBuoy,
};

export interface GroupItem {
  question: string;
  href: string;
  /** What the link opens, when it is not an Honest Answer ("Topic", "Guide", "Find Help"). */
  kind?: string;
  slug?: string;
}

/** Each group's questions: its answers, then its rows, none twice. */
export function groupItems(rows: TopicsIndexRow[]): { id: string; name: string; icon: LucideIcon; items: GroupItem[] }[] {
  const seen = new Set<string>();
  return QUESTION_GROUPS.map((g) => {
    const items: GroupItem[] = [];
    for (const slug of g.answers) {
      const a = ANSWERS.find((x) => x.slug === slug);
      if (!a || seen.has(answerHref(slug))) continue;
      seen.add(answerHref(slug));
      items.push({ question: a.question, href: answerHref(slug), slug });
    }
    for (const want of g.rows) {
      const row = rows.find((r) => r.href === want);
      if (!row) continue;
      const href = toAnswerPage(rowTarget(row));
      if (seen.has(href)) continue;
      seen.add(href);
      items.push({ question: row.askedAs, href, kind: href.startsWith("/answers/") ? undefined : kindLabel(href) || undefined });
    }
    return { id: g.id, name: g.name, icon: ICONS[g.id] ?? Scale, items };
  }).filter((g) => g.items.length > 0);
}

const SHOWN = 4;

function Group({ name, icon: Icon, items, all, id, first = SHOWN }: { name: string; icon: LucideIcon; items: GroupItem[]; all: boolean; id: string; first?: number }) {
  const [open, setOpen] = useState(all);
  const shown = open ? items : items.slice(0, first);
  const listId = `qa-group-${id}`;
  return (
    <section className="qa-group" aria-labelledby={`${listId}-h`}>
      <h3 className="qa-group__head" id={`${listId}-h`}>
        <span className="qa-group__icon" aria-hidden="true">
          <Icon size={22} strokeWidth={1.75} />
        </span>
        {name}
      </h3>
      <ul className="qa-group__list" id={listId}>
        {shown.map((it) => (
          <li key={it.href} id={all && it.slug ? it.slug : undefined}>
            <Link href={it.href}>
              <span>{it.question}</span>
              {it.kind && <small>{it.kind}</small>}
            </Link>
          </li>
        ))}
      </ul>
      {!all && items.length > first && (
        <button type="button" className="qa-group__more" aria-expanded={open} aria-controls={listId} onClick={() => setOpen((x) => !x)}>
          {open ? "Fewer" : `All ${items.length}`}
        </button>
      )}
    </section>
  );
}

export default function QuestionGroups({ rows, all = false, shown = SHOWN }: { rows: TopicsIndexRow[]; all?: boolean; /** How many each group shows before "All" (the Questions door shows two). */ shown?: number }) {
  const groups = groupItems(rows);
  return (
    <div className="qa-groups">
      {groups.map((g) => (
        <Group key={g.id} id={g.id} name={g.name} icon={g.icon} items={g.items} all={all} first={shown} />
      ))}
    </div>
  );
}
