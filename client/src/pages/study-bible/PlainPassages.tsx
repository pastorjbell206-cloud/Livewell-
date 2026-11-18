/**
 * A chapter in plain words, passage by passage (notes/<slug>/plain/<n>.json):
 * for each passage, what is happening, what the first hearers would have
 * caught, the Old Testament behind it, the hard verse faced, and what it asks.
 *
 * Its own chunk, with its file fetched only when the section nears the
 * screen; ChapterNotes holds its space until then. Only chapters whose note
 * says `plain: true` have one (Mark 1 to 3 first).
 */
import { BookOpenText, Ear, HelpCircle, MessageCircleQuestion, ScrollText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { fetchPlain, verseRange, type PlainPassage } from "@/lib/bible-notes";
import { LoadFailed } from "@/components/LoadFailed";
import { Prose, useLoad } from "./shared";
import "./plain.css";

const PARTS: { key: keyof PlainPassage; label: string; icon: LucideIcon }[] = [
  { key: "happening", label: "What is happening", icon: BookOpenText },
  { key: "hearers", label: "What the first hearers would catch", icon: Ear },
  { key: "ot", label: "The Old Testament behind it", icon: ScrollText },
  { key: "hard", label: "The hard verse", icon: HelpCircle },
  { key: "asks", label: "What it asks", icon: MessageCircleQuestion },
];

export default function PlainPassages({ slug, chapter, label }: { slug: string; chapter: number; label: string }) {
  const { data, retry } = useLoad<PlainPassage[]>(`plain-${slug}-${chapter}`, () => fetchPlain(slug, chapter));
  if (data === undefined) return <div className="pp-hold" />;
  if (data === null) return <LoadFailed what={`the plain notes on ${label}`} onRetry={retry} />;
  return (
    <div className="pp">
      <nav aria-label={`Passages in ${label}`} className="pp-jump">
        {data.map((p) => (
          <a key={p.v} href={`#pp-${chapter}-${p.v}`}>
            {chapter}:{p.v.replace("-", "–")}
          </a>
        ))}
      </nav>
      {data.map((p) => {
        const [a] = verseRange(p.v);
        return (
          <article key={p.v} id={`pp-${chapter}-${p.v}`} className="pp-passage">
            <h3>
              <a href={`#v${a}`} className="pp-ref">
                {chapter}:{p.v.replace("-", "–")}
              </a>{" "}
              {p.t}
            </h3>
            {PARTS.map(({ key, label: l, icon: Icon }) => {
              const text = p[key];
              if (!text) return null;
              return (
                <div key={key} className="pp-part">
                  <h4>
                    <Icon aria-hidden="true" size={17} strokeWidth={1.75} />
                    {l}
                  </h4>
                  <Prose text={text} size={16.5} />
                </div>
              );
            })}
          </article>
        );
      })}
    </div>
  );
}
