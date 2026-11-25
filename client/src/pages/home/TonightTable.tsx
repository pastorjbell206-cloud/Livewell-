/**
 * Tonight at the table (Home): this week's family devotion, opened on Home in
 * four tabs (Read, Talk, Do, Pray), and this week's catechism question on a
 * card that turns over to its answer.
 *
 * Tonight is the same night the tonight line and /family/tonight name
 * (lib/familyTable, tonightOn), so the title paints from the year map with no
 * fetch; the devotion itself comes from the family library (useDevotion), the
 * same data the devotion page reads. Off the map it offers the family page.
 */
import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, HandHeart, MessageCircle, Sprout } from "lucide-react";

import { catechismThisWeek, devotionHref, tonightOn, tonightTitle } from "@/lib/familyTable";
import { localISODate } from "@/lib/familyYear";
import { useDevotion, type Devotion } from "../family/useFamilyData";

type Tab = "read" | "talk" | "do" | "pray";

const TABS: { id: Tab; label: string; Icon: typeof BookOpen }[] = [
  { id: "read", label: "Read", Icon: BookOpen },
  { id: "talk", label: "Talk", Icon: MessageCircle },
  { id: "do", label: "Do", Icon: Sprout },
  { id: "pray", label: "Pray", Icon: HandHeart },
];

function Talk({ devotion }: { devotion: Devotion }) {
  const bands = devotion.bands;
  const [band, setBand] = useState<"younger" | "older">("younger");
  const [n, setN] = useState(0);
  const list = bands ? bands[band] : devotion.questions;
  if (list.length === 0) return null;
  const at = n % list.length;
  return (
    <>
      {bands && (
        <div className="ht-seg" role="group" aria-label="Who is at the table">
          {(["younger", "older"] as const).map((b) => (
            <button
              key={b}
              type="button"
              aria-pressed={band === b}
              onClick={() => {
                setBand(b);
                setN(0);
              }}
            >
              {b === "younger" ? "Younger kids" : "Teens"}
            </button>
          ))}
        </div>
      )}
      <p className="ht-q">{list[at]}</p>
      {list.length > 1 && (
        <div className="ht-qn">
          <button type="button" className="home-step" aria-label="Previous question" onClick={() => setN((x) => (x + list.length - 1) % list.length)}>
            <ChevronLeft aria-hidden="true" size={18} />
          </button>
          <button type="button" className="home-step" aria-label="Next question" onClick={() => setN((x) => (x + 1) % list.length)}>
            <ChevronRight aria-hidden="true" size={18} />
          </button>
          <span>
            Question {at + 1} of {list.length}
          </span>
        </div>
      )}
    </>
  );
}

function Pane({ tab, devotion }: { tab: Tab; devotion: Devotion }) {
  if (tab === "talk") return <Talk devotion={devotion} />;
  if (tab === "do")
    return (
      <>
        <p className="ht-ref ht-ref--top">One thing to do this week</p>
        <p className="ht-q">{devotion.activity}</p>
      </>
    );
  if (tab === "pray")
    return (
      <>
        <p className="ht-ref ht-ref--top">Pray it together</p>
        <p className="ht-big">{devotion.prayer}</p>
      </>
    );
  return (
    <>
      <p className="ht-big">“{devotion.passageText}”</p>
      <p className="ht-ref">{devotion.row.passage}</p>
    </>
  );
}

export default function TonightTable() {
  const [tonight] = useState(() => tonightOn(localISODate()));
  const title = tonight ? tonightTitle(tonight) : null;
  const { state, retry } = useDevotion(tonight?.id ?? "");
  const [tab, setTab] = useState<Tab>("read");
  const [turned, setTurned] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (!tonight || !title) {
    return (
      <>
        <h2 id="home-table-title" className="ht-title">
          A devotion for every week of the year.
        </h2>
        <p className="ht-actions">
          <Link href="/family" className="home-btn">
            Open the family page <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
          </Link>
        </p>
      </>
    );
  }

  const devotion = state.status === "ready" ? state.devotion : null;
  const tabs = TABS.filter((t) => t.id !== "do" || devotion?.activity);
  const cat = state.status === "ready" ? catechismThisWeek(state.index.catechism) : null;

  const onKey = (e: KeyboardEvent, i: number) => {
    const to = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
    if (to === null) return;
    e.preventDefault();
    const next = (to + tabs.length) % tabs.length;
    setTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <h2 id="home-table-title" className="ht-title">
        {title}
      </h2>
      <div className="ht-tabs" role="tablist" aria-label="Tonight's devotion">
        {tabs.map(({ id, label, Icon }, i) => (
          <button
            key={id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`ht-tab-${id}`}
            aria-selected={tab === id}
            aria-controls="ht-pane"
            tabIndex={tab === id ? 0 : -1}
            className="home-chip"
            onClick={() => setTab(id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <Icon aria-hidden="true" size={16} strokeWidth={1.75} />
            {label}
          </button>
        ))}
      </div>
      <div className="ht-pane" id="ht-pane" role="tabpanel" aria-labelledby={`ht-tab-${tab}`}>
        {devotion ? (
          <Pane tab={tab} devotion={devotion} />
        ) : state.status === "loading" ? null : (
          <p className="home-failed">
            Tonight's devotion didn't load.
            <button type="button" onClick={retry}>
              Try again
            </button>
          </p>
        )}
      </div>
      {cat && (
        <button type="button" className="ht-flip" aria-pressed={turned} onClick={() => setTurned((t) => !t)}>
          {turned ? (
            <>
              <small>The answer</small>
              <b>{cat.kidsAnswer}</b>
            </>
          ) : (
            <>
              <small>Catechism, question {cat.number} · tap to turn</small>
              <b>{cat.question}</b>
            </>
          )}
        </button>
      )}
      {/* Holds the card's place while the family library loads, so the links below stay put. */}
      {!cat && state.status === "loading" && <div className="ht-flip ht-flip--slot" aria-hidden="true" />}
      <div className="home-row ht-actions">
        <Link href={devotionHref(tonight.id)} className="home-btn">
          Open tonight's devotion <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
        </Link>
        <Link href="/family/devotions" className="home-tlink">
          A year of them
        </Link>
      </div>
    </>
  );
}
