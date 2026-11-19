/**
 * The Bible Explorer's shared parts: the reading-level switch, a stop's
 * scene in its frame, and the four activities (tap the picture, put in
 * order, match, think then look). Every activity works by touch, by
 * keyboard and with a screen reader: buttons, radio buttons and a polite
 * live region; nothing has to be dragged.
 */
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowDown, ArrowUp, Check, X } from "lucide-react";
import PlateFrame from "@/components/art/PlateFrame";
import { PlateSvg, type Drawing } from "@/components/art/PlateSvg";
import { RefText, VerseRef } from "@/components/VerseRef";
import {
  LEVEL_LABELS,
  LEVELS,
  type Activity,
  type Level,
} from "@/lib/explorer";

/** "Ages 7 to 11" or "Ages 12 to 16": one tap, kept on this device. */
export function LevelSwitch({
  level,
  onLevel,
  saveFailed,
}: {
  level: Level;
  onLevel: (l: Level) => void;
  saveFailed: boolean;
}) {
  const name = useId();
  return (
    <fieldset className="ex-level">
      <legend className="ex-panel__title">Reading level</legend>
      <div className="ex-level__options">
        {LEVELS.map(l => (
          <label key={l} className="ex-level__opt">
            <input
              type="radio"
              name={name}
              value={l}
              checked={level === l}
              onChange={() => onLevel(l)}
            />
            <span>{LEVEL_LABELS[l]}</span>
          </label>
        ))}
      </div>
      <p className="ex-note" aria-live="polite">
        {saveFailed
          ? "This browser would not keep your choice, so it lasts only while this page is open."
          : "Each stop is written for both ages. This device will remember your choice."}
      </p>
    </fieldset>
  );
}

const SCENES: Record<string, () => Promise<{ default: Drawing }>> = {
  creation: () => import("./scenes/creation"),
  abraham: () => import("./scenes/abraham"),
  rescue: () => import("./scenes/rescue"),
  cross: () => import("./scenes/cross"),
};

export const hasScene = (name: string | undefined) => !!name && name in SCENES;

/** A stop's drawing in its frame. The frame holds its 4:3 shape while the drawing loads. */
export function Scene({
  name,
  label,
  children,
}: {
  name: string;
  label: string;
  children?: ReactNode;
}) {
  const [drawing, setDrawing] = useState<Drawing | null>(null);
  useEffect(() => {
    let live = true;
    SCENES[name]?.()
      .then(m => live && setDrawing(m.default))
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, [name]);
  return (
    <PlateFrame className="ex-scene" ratio={null}>
      <div className="ex-scene__box">
        {drawing && <PlateSvg drawing={{ ...drawing, label }} />}
        {children}
      </div>
    </PlateFrame>
  );
}

// ── The activities ────────────────────────────────────────────────────────

type Props<K extends Activity["kind"]> = {
  activity: Extract<Activity, { kind: K }>;
  onDone: () => void;
  doneBefore: boolean;
};

function Shell({
  activity,
  doneBefore,
  children,
  id,
}: {
  activity: Activity;
  doneBefore: boolean;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section className="ex-act" aria-labelledby={id}>
      <h2 className="ex-act__title" id={id}>
        {activity.title}
      </h2>
      {doneBefore && (
        <p className="ex-act__done">
          <Check size={16} strokeWidth={1.75} aria-hidden="true" /> You have
          finished this one before. Try it again any time.
        </p>
      )}
      <p className="ex-act__prompt">{activity.prompt}</p>
      {children}
    </section>
  );
}

/** Tap the picture: each spot reveals what it shows; the list below fills in as they are found. */
export function TapActivity({
  activity,
  onDone,
  doneBefore,
  scene,
  sceneLabel,
}: Props<"tap"> & { scene: string; sceneLabel: string }) {
  const id = useId();
  const [found, setFound] = useState<string[]>([]);
  const [latest, setLatest] = useState<string | null>(null);
  const spots = activity.spots;
  const listed = useMemo(
    () => [...spots].sort((a, b) => (a.day ?? 0) - (b.day ?? 0)),
    [spots]
  );
  const all = found.length === spots.length;
  const reported = useRef(false);

  useEffect(() => {
    if (all && !reported.current) {
      reported.current = true;
      onDone();
    }
  }, [all, onDone]);

  const tap = (spotId: string) => {
    setFound(f => (f.includes(spotId) ? f : [...f, spotId]));
    setLatest(spotId);
  };
  const last = spots.find(s => s.id === latest);
  const count = spots.length;

  return (
    <Shell activity={activity} doneBefore={doneBefore} id={id}>
      <Scene name={scene} label={sceneLabel}>
        {spots.map(s => {
          const on = found.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              className="ex-spot"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              aria-pressed={on}
              aria-label={s.name}
              onClick={() => tap(s.id)}
            >
              <span className="ex-spot__ring" aria-hidden="true">
                {on ? (s.day ?? "") || <Check size={14} /> : "+"}
              </span>
            </button>
          );
        })}
      </Scene>
      <p className="ex-found" aria-live="polite">
        {last ? (
          <>
            {last.text} <VerseRef reference={last.ref} />
          </>
        ) : (
          `Tap a + on the picture. There are ${count} to find.`
        )}
      </p>
      <p
        className={`ex-act__result${all ? " ex-act__result--ok" : ""}`}
        aria-live="polite"
      >
        {all
          ? `You found all ${count}. That is the whole week of creation.`
          : `${found.length} of ${count} found.`}
      </p>
      <ol className="ex-days" aria-label="What you have found">
        {listed.map((s, i) => {
          const on = found.includes(s.id);
          return (
            <li key={s.id}>
              <b>{s.day ? `Day ${s.day}` : `${i + 1}.`}</b>
              <span className={on ? undefined : "is-empty"}>
                {on ? s.text.replace(/^Day \d+\.\s*/, "") : "Not found yet"}
              </span>
            </li>
          );
        })}
      </ol>
      {found.length > 0 && (
        <div className="ex-act__row">
          <button
            type="button"
            className="btn btn--quiet"
            onClick={() => {
              setFound([]);
              setLatest(null);
            }}
          >
            Start again
          </button>
        </div>
      )}
    </Shell>
  );
}

/** Put in order: move each line up or down with its buttons, then check. */
export function OrderActivity({
  activity,
  onDone,
  doneBefore,
}: Props<"order">) {
  const id = useId();
  const byId = useMemo(
    () => new Map(activity.items.map(it => [it.id, it])),
    [activity.items]
  );
  const want = activity.items.map(it => it.id);
  const [order, setOrder] = useState<string[]>(activity.start);
  const [checked, setChecked] = useState<boolean[] | null>(null);
  const [said, setSaid] = useState("");
  const buttons = useRef(new Map<string, HTMLButtonElement | null>());

  const move = (i: number, by: -1 | 1) => {
    const j = i + by;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[i], next[j]] = [next[j], next[i]];
    setOrder(next);
    setChecked(null);
    const it = byId.get(next[j])!;
    setSaid(`Moved to place ${j + 1}: ${it.text}`);
    // Keep focus on the line that moved, on the same button if it can still move that way.
    const edge = (by === -1 && j === 0) || (by === 1 && j === next.length - 1);
    requestAnimationFrame(() =>
      buttons.current.get(`${next[j]}:${edge ? -by : by}`)?.focus()
    );
  };

  const check = () => {
    const marks = order.map((x, i) => x === want[i]);
    setChecked(marks);
    const right = marks.filter(Boolean).length;
    if (right === want.length) {
      setSaid("That is the order it happened.");
      onDone();
    } else
      setSaid(
        `Not yet: ${right} of ${want.length} are in the right place. Keep moving them and check again.`
      );
  };

  return (
    <Shell activity={activity} doneBefore={doneBefore} id={id}>
      <ol className="ex-order">
        {order.map((x, i) => {
          const it = byId.get(x)!;
          const right = checked?.[i];
          return (
            <li key={x} className={right ? "is-right" : undefined}>
              <span className="ex-order__n" aria-hidden="true">
                {i + 1}
              </span>
              <span className="ex-order__text">
                {it.text}
                {right && (
                  <>
                    {" "}
                    <VerseRef reference={it.ref} />
                  </>
                )}
              </span>
              <span className="ex-order__moves">
                <button
                  type="button"
                  className="ex-move"
                  ref={el => {
                    buttons.current.set(`${x}:-1`, el);
                  }}
                  aria-label={`Move up: ${it.text}`}
                  disabled={i === 0}
                  onClick={() => move(i, -1)}
                >
                  <ArrowUp size={18} strokeWidth={1.75} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="ex-move"
                  ref={el => {
                    buttons.current.set(`${x}:1`, el);
                  }}
                  aria-label={`Move down: ${it.text}`}
                  disabled={i === order.length - 1}
                  onClick={() => move(i, 1)}
                >
                  <ArrowDown size={18} strokeWidth={1.75} aria-hidden="true" />
                </button>
              </span>
            </li>
          );
        })}
      </ol>
      <div className="ex-act__row">
        <button type="button" className="btn" onClick={check}>
          Check my order
        </button>
      </div>
      <p
        className={`ex-act__result${checked?.every(Boolean) ? " ex-act__result--ok" : ""}`}
        aria-live="polite"
      >
        {said}
      </p>
    </Shell>
  );
}

/** Match: for each promise, choose where the Bible shows it kept, then check. */
export function MatchActivity({
  activity,
  onDone,
  doneBefore,
}: Props<"match">) {
  const id = useId();
  const name = useId();
  // The answers are offered in one fixed order that never lines up with the promises.
  const options = useMemo(() => {
    const p = activity.pairs;
    return p.map((_, i) => p[(i + 1) % p.length]);
  }, [activity.pairs]);
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [said, setSaid] = useState("");

  const check = () => {
    const missing = activity.pairs.filter(p => !chosen[p.id]).length;
    if (missing) {
      setChecked(false);
      setSaid(
        `Choose an answer for every promise first (${missing} still to choose).`
      );
      return;
    }
    setChecked(true);
    const right = activity.pairs.filter(p => chosen[p.id] === p.id).length;
    if (right === activity.pairs.length) {
      setSaid("All three promises, kept. God does what he says.");
      onDone();
    } else
      setSaid(
        `${right} of ${activity.pairs.length} are right. Look again at the ones marked "Not this one".`
      );
  };

  return (
    <Shell activity={activity} doneBefore={doneBefore} id={id}>
      <div className="ex-match">
        {activity.pairs.map((p, n) => {
          const pick = chosen[p.id];
          const ok = checked && pick === p.id;
          return (
            <fieldset key={p.id}>
              <legend>
                Promise {n + 1}: “{p.promise}” <small>({p.promiseRef})</small>
              </legend>
              {options.map(o => (
                <label key={o.id} className="ex-choice">
                  <input
                    type="radio"
                    name={`${name}-${p.id}`}
                    value={o.id}
                    checked={pick === o.id}
                    onChange={() => {
                      setChosen(c => ({ ...c, [p.id]: o.id }));
                      setChecked(false);
                    }}
                  />
                  <span>{o.kept}</span>
                </label>
              ))}
              {checked && (
                <p className="ex-mark">
                  {ok ? (
                    <>
                      <Check size={16} strokeWidth={1.75} aria-hidden="true" />{" "}
                      Kept: <VerseRef reference={p.keptRef} />
                    </>
                  ) : (
                    <>
                      <X size={16} strokeWidth={1.75} aria-hidden="true" /> Not
                      this one
                    </>
                  )}
                </p>
              )}
            </fieldset>
          );
        })}
      </div>
      <div className="ex-act__row">
        <button type="button" className="btn" onClick={check}>
          Check my answers
        </button>
      </div>
      <p className="ex-act__result" aria-live="polite">
        {said}
      </p>
    </Shell>
  );
}

/** Think, then look: a question at a time, each with "Show the answer". */
export function RevealActivity({
  activity,
  onDone,
  doneBefore,
}: Props<"reveal">) {
  const id = useId();
  const [shown, setShown] = useState<string[]>([]);
  const reported = useRef(false);
  const all = shown.length === activity.questions.length;
  useEffect(() => {
    if (all && !reported.current) {
      reported.current = true;
      onDone();
    }
  }, [all, onDone]);
  return (
    <Shell activity={activity} doneBefore={doneBefore} id={id}>
      <ol className="ex-reveal">
        {activity.questions.map(q => {
          const open = shown.includes(q.id);
          const panel = `${id}-${q.id}`;
          return (
            <li key={q.id}>
              <p className="ex-reveal__q">{q.q}</p>
              <button
                type="button"
                className="btn btn--quiet"
                aria-expanded={open}
                aria-controls={panel}
                onClick={() =>
                  setShown(s =>
                    open ? s.filter(x => x !== q.id) : [...s, q.id]
                  )
                }
              >
                {open ? "Hide the answer" : "Show the answer"}
              </button>
              <div id={panel} hidden={!open}>
                <p className="ex-reveal__a">
                  {q.a} <RefText text={q.ref} />
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      <p
        className={`ex-act__result${all ? " ex-act__result--ok" : ""}`}
        aria-live="polite"
      >
        {all
          ? "You have looked at every answer."
          : `${shown.length} of ${activity.questions.length} answers shown.`}
      </p>
    </Shell>
  );
}
