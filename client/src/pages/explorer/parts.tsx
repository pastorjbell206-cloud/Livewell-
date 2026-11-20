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
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  RotateCcw,
  X,
} from "lucide-react";
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
  fall: () => import("./scenes/fall"),
  sinai: () => import("./scenes/sinai"),
  land: () => import("./scenes/land"),
  kingdom: () => import("./scenes/kingdom"),
  exile: () => import("./scenes/exile"),
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
  const named = spots.some(s => s.label);

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
            {last.label && <b>{last.label}. </b>}
            {last.text} <VerseRef reference={last.ref} />
            {last.mend && (
              <span className="ex-found__mend">
                <b>How God begins to mend it.</b> {last.mend}{" "}
                {last.mendRef && <VerseRef reference={last.mendRef} />}
              </span>
            )}
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
          ? (activity.finish ??
            `You found all ${count}. That is the whole week of creation.`)
          : `${found.length} of ${count} found.`}
      </p>
      <ol
        className={`ex-days${named ? " ex-days--named" : ""}`}
        aria-label="What you have found"
      >
        {listed.map((s, i) => {
          const on = found.includes(s.id);
          return (
            <li key={s.id}>
              <b>{s.label ?? (s.day ? `Day ${s.day}` : `${i + 1}.`)}</b>
              <span className={on ? undefined : "is-empty"}>
                {on ? s.text.replace(/^Day \d+\.\s*/, "") : "Not found yet"}
                {on && s.mend && (
                  <span className="ex-days__mend">{s.mend}</span>
                )}
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
      setSaid(
        activity.finish ?? "All three promises, kept. God does what he says."
      );
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

/**
 * Walk through the picture: numbered marks on the drawing, taken in order
 * with Previous and Next (or tapped directly). Each step says what the part
 * was and where the Bible takes it up. Seeing every step is done.
 */
export function WalkActivity({
  activity,
  onDone,
  doneBefore,
  scene,
  sceneLabel,
}: Props<"walk"> & { scene: string; sceneLabel: string }) {
  const id = useId();
  const steps = activity.steps;
  const n = steps.length;
  const [at, setAt] = useState<number | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const next = useRef<HTMLButtonElement | null>(null);
  const all = seen.length === n;
  const reported = useRef(false);

  useEffect(() => {
    if (all && !reported.current) {
      reported.current = true;
      onDone();
    }
  }, [all, onDone]);

  const go = (i: number) => {
    setAt(i);
    setSeen(s => (s.includes(steps[i].id) ? s : [...s, steps[i].id]));
  };
  const step = at === null ? null : steps[at];

  return (
    <Shell activity={activity} doneBefore={doneBefore} id={id}>
      <Scene name={scene} label={sceneLabel}>
        {steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`ex-spot ex-spot--step${seen.includes(s.id) ? " is-seen" : ""}`}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            aria-current={at === i ? "step" : undefined}
            aria-label={`Step ${i + 1}: ${s.name}`}
            onClick={() => go(i)}
          >
            <span className="ex-spot__ring" aria-hidden="true">
              {i + 1}
            </span>
          </button>
        ))}
      </Scene>
      <div
        className={`ex-walk${at === null ? "" : " ex-walk--open"}`}
        aria-live="polite"
      >
        {step && at !== null ? (
          <>
            <p className="ex-walk__count">
              Step {at + 1} of {n}
            </p>
            <h3 className="ex-walk__name">{step.name}</h3>
            <p>
              {step.what} <VerseRef reference={step.whatRef} />
            </p>
            {step.asked && (
              <p className="ex-walk__asked">
                <b>What people said.</b> {step.asked}{" "}
                {step.askedRef && <VerseRef reference={step.askedRef} />}
              </p>
            )}
            <p className="ex-walk__later">
              <b>{activity.laterLabel ?? "Where the Bible takes it up."}</b>{" "}
              {step.later} <RefText text={step.laterRef} />
            </p>
          </>
        ) : (
          <p>
            {activity.intro ??
              `There are ${n} steps, from the gate of the courtyard to the ark. Start at the gate.`}
          </p>
        )}
      </div>
      <div className="ex-act__row ex-walk__nav">
        {at !== null && (
          <button
            type="button"
            className="btn btn--quiet"
            disabled={at === 0}
            onClick={() => {
              if (!at) return;
              go(at - 1);
              if (at - 1 === 0)
                requestAnimationFrame(() => next.current?.focus());
            }}
          >
            <ArrowLeft
              size={16}
              strokeWidth={1.75}
              aria-hidden="true"
              style={{ marginRight: 8 }}
            />
            Back a step
          </button>
        )}
        <button
          type="button"
          className="btn"
          ref={next}
          onClick={() => go(at === null || at === n - 1 ? 0 : at + 1)}
        >
          {at === null
            ? `Start: ${steps[0].name}`
            : at === n - 1
              ? (activity.restart ?? "Back to the gate")
              : `Next: ${steps[at + 1].name}`}
          <ArrowRight
            size={16}
            strokeWidth={1.75}
            aria-hidden="true"
            style={{ marginLeft: 8 }}
          />
        </button>
      </div>
      <p
        className={`ex-act__result${all ? " ex-act__result--ok" : ""}`}
        aria-live="polite"
      >
        {all ? activity.finish : `${seen.length} of ${n} seen.`}
      </p>
    </Shell>
  );
}

/**
 * Round the wheel: the stages of a cycle drawn in a ring, taken one at a time
 * with Next; after the last stage the wheel turns again, and then the reader
 * is told where the cycle leads. Reaching that end is done.
 */
export function CycleActivity({
  activity,
  onDone,
  doneBefore,
}: Props<"cycle">) {
  const id = useId();
  const { stages, again, end } = activity;
  const n = stages.length;
  // 0 .. n-1: a stage; n: round again; n + 1: where it leads.
  const [at, setAt] = useState(0);
  const next = useRef<HTMLButtonElement | null>(null);
  const reported = useRef(false);
  const finished = at === n + 1;

  useEffect(() => {
    if (finished && !reported.current) {
      reported.current = true;
      onDone();
    }
  }, [finished, onDone]);

  const here = at < n ? at : at === n ? 0 : -1;
  const stage = at < n ? stages[at] : null;

  return (
    <Shell activity={activity} doneBefore={doneBefore} id={id}>
      <div className="ex-wheel">
        <svg
          className="ex-wheel__ring"
          viewBox="0 0 100 100"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            className="pl-l"
            cx="50"
            cy="50"
            r="36"
            vectorEffect="non-scaling-stroke"
          />
          {stages.map((_, i) => {
            const a = ((i + 0.5) / n) * 2 * Math.PI - Math.PI / 2;
            const x = 50 + 36 * Math.cos(a);
            const y = 50 + 36 * Math.sin(a);
            const deg = (a * 180) / Math.PI + 90;
            return (
              <path
                key={i}
                className="pl-k"
                d="M-2,-2.4L2.4,0L-2,2.4Z"
                transform={`translate(${x.toFixed(2)},${y.toFixed(2)}) rotate(${deg.toFixed(1)})`}
              />
            );
          })}
        </svg>
        <ol className="ex-wheel__list" aria-label="The circle of the judges">
          {stages.map((s, i) => {
            const a = (i / n) * 2 * Math.PI - Math.PI / 2;
            return (
              <li
                key={s.id}
                className={i === here ? "is-here" : undefined}
                aria-current={i === here ? "step" : undefined}
                style={{
                  left: `${(50 + 36 * Math.cos(a)).toFixed(2)}%`,
                  top: `${(50 + 36 * Math.sin(a)).toFixed(2)}%`,
                }}
              >
                <span className="ex-wheel__n" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="ex-wheel__name">{s.name}</span>
              </li>
            );
          })}
        </ol>
        <p className="ex-wheel__hub" aria-hidden="true">
          {at === n ? "And round again" : finished ? "Waiting for a king" : "Round it goes"}
        </p>
      </div>
      <div className="ex-walk ex-walk--open" aria-live="polite">
        {stage ? (
          <>
            <p className="ex-walk__count">
              Step {at + 1} of {n}
            </p>
            <h3 className="ex-walk__name">{stage.name}</h3>
            <p>
              {stage.text} <VerseRef reference={stage.ref} />
            </p>
          </>
        ) : at === n ? (
          <>
            <h3 className="ex-walk__name">And round again</h3>
            <p>
              {again.text} <VerseRef reference={again.ref} />
            </p>
          </>
        ) : (
          <>
            <h3 className="ex-walk__name">{end.title}</h3>
            <p>
              {end.text} <RefText text={end.ref} />
            </p>
          </>
        )}
      </div>
      <div className="ex-act__row ex-walk__nav">
        <button
          type="button"
          className="btn btn--quiet"
          disabled={at === 0}
          onClick={() => {
            if (at === 0) return;
            setAt(at - 1);
            if (at - 1 === 0) requestAnimationFrame(() => next.current?.focus());
          }}
        >
          <ArrowLeft
            size={16}
            strokeWidth={1.75}
            aria-hidden="true"
            style={{ marginRight: 8 }}
          />
          Back a step
        </button>
        <button
          type="button"
          className="btn"
          ref={next}
          onClick={() => setAt(finished ? 0 : at + 1)}
        >
          {finished
            ? "Go round from the start"
            : at === n
              ? "Where does it lead?"
              : at === n - 1
                ? "Round again"
                : `Next: ${stages[at + 1].name}`}
          {finished ? (
            <RotateCcw
              size={16}
              strokeWidth={1.75}
              aria-hidden="true"
              style={{ marginLeft: 8 }}
            />
          ) : (
            <ArrowRight
              size={16}
              strokeWidth={1.75}
              aria-hidden="true"
              style={{ marginLeft: 8 }}
            />
          )}
        </button>
      </div>
    </Shell>
  );
}

/**
 * Trust or grab: a moment from a king's story at a time, each with two
 * buttons. Choosing shows whether that is what the Bible says and why, with
 * the verse; a choice can be changed. When every moment has an answer, the
 * end says where the story goes next. Choosing every moment is done.
 */
export function ChooseActivity({
  activity,
  onDone,
  doneBefore,
}: Props<"choose">) {
  const id = useId();
  const { moments, options, end } = activity;
  const [chosen, setChosen] = useState<Record<string, "trust" | "grasp">>({});
  const reported = useRef(false);
  const answered = moments.filter(m => chosen[m.id]).length;
  const right = moments.filter(m => chosen[m.id] === m.answer).length;
  const all = answered === moments.length;

  useEffect(() => {
    if (all && !reported.current) {
      reported.current = true;
      onDone();
    }
  }, [all, onDone]);

  return (
    <Shell activity={activity} doneBefore={doneBefore} id={id}>
      <ol className="ex-choose">
        {moments.map((m, n) => {
          const pick = chosen[m.id];
          const head = `${id}-${m.id}`;
          return (
            <li key={m.id}>
              <p className="ex-choose__who" id={head}>
                <span aria-hidden="true">{n + 1}. </span>
                {m.who}
              </p>
              <p className="ex-choose__text">{m.text}</p>
              <div
                className="ex-choose__options"
                role="group"
                aria-labelledby={head}
              >
                {(["trust", "grasp"] as const).map(k => (
                  <button
                    key={k}
                    type="button"
                    className="ex-choose__btn"
                    aria-pressed={pick === k}
                    onClick={() => setChosen(c => ({ ...c, [m.id]: k }))}
                  >
                    {options[k]}
                  </button>
                ))}
              </div>
              <div aria-live="polite">
                {pick && (
                  <p className="ex-choose__why">
                    <b>
                      {pick === m.answer ? (
                        <>
                          <Check
                            size={16}
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />{" "}
                          Yes. {options[m.answer]}.
                        </>
                      ) : (
                        <>
                          <X size={16} strokeWidth={1.75} aria-hidden="true" />{" "}
                          Not quite. {options[m.answer]}.
                        </>
                      )}
                    </b>{" "}
                    {m.why} <RefText text={m.ref} />
                  </p>
                )}
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
          ? `You chose for all ${moments.length}, and ${right} matched what the Bible says.`
          : `${answered} of ${moments.length} chosen.`}
      </p>
      {all && (
        <div className="ex-walk ex-walk--end">
          <h3 className="ex-walk__name">{end.title}</h3>
          <p>
            {end.text} <RefText text={end.ref} />
          </p>
        </div>
      )}
    </Shell>
  );
}
