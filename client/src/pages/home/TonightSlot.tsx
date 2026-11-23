/**
 * Home's tonight slot while the line's own module loads (Home.tsx).
 *
 * On a first visit to "/", the static shell has already worked out what
 * tonight's line will say and written it into its own slot, unseen
 * (scripts/lib/home-tonight-slot.mjs), leaving the lines on the slot as
 * data-lines. Home reads them once, as its module runs and before the app
 * replaces the shell, and this slot draws the same lines in the same elements
 * and classes, still unseen, so it holds the same room as the shell's and as
 * the line itself: nothing under it moves when the line arrives (the walk's
 * polish, 2026-11-23; finding 22). On an ordinary week's night the lines
 * carry no title and the CSS holds the room, as before. With no shell to read
 * (a later visit to "/" in the same session), it is the plain slot.
 */
export interface ShellLines {
  /** Tonight's line; null for an ordinary week's (its title is not in the shell), false for none. */
  row: { lead: string; title: string; after: string } | null | false;
  /** The Advent line beneath it. */
  quiet: { lead: string; link: string } | null;
}

const isText = (x: unknown): x is string => typeof x === "string";
const isObject = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object";

function isShellLines(x: unknown): x is ShellLines | null {
  if (x === null) return true;
  if (!isObject(x)) return false;
  const { row, quiet } = x;
  const rowOk = row === null || row === false || (isObject(row) && isText(row.lead) && isText(row.title) && isText(row.after));
  const quietOk = quiet === null || (isObject(quiet) && isText(quiet.lead) && isText(quiet.link));
  return rowOk && quietOk;
}

/** The lines the static shell left on its slot: null when tonight's line says nothing, undefined with no shell. */
export function readShellLines(doc: Document = document): ShellLines | null | undefined {
  try {
    const raw = doc.querySelector("#lw-shell .home-tonight--slot")?.getAttribute("data-lines");
    if (raw == null) return undefined;
    const lines: unknown = JSON.parse(raw);
    return isShellLines(lines) ? lines : undefined;
  } catch {
    return undefined;
  }
}

export default function TonightSlot({ lines }: { lines: ShellLines | null | undefined }) {
  if (lines === null) return null;
  if (!lines) return <div className="home-tonight home-tonight--slot" aria-hidden="true" />;
  const { row, quiet } = lines;
  return (
    <div className="home-tonight home-tonight--slot" aria-hidden="true">
      {row !== false && (row || quiet) && (
        <div className={row ? "home-tonight__row" : "home-tonight__row home-tonight__row--held"}>
          {row && (
            <p className="home-tonight__line">
              {row.lead} <span className="home-tonight__link">{row.title}</span>
              {row.after}
              {/[.?!]$/.test(row.after || row.title) ? "" : "."}
            </p>
          )}
        </div>
      )}
      {quiet && (
        <p className="home-tonight__line home-tonight__line--quiet">
          {quiet.lead} <span className="home-tonight__link">{quiet.link}</span>.
        </p>
      )}
    </div>
  );
}
