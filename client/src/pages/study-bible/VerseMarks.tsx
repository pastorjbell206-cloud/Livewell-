/**
 * Highlights and notes on a verse (TOOLS-PLAN unit 3), kept on this device
 * (lib/bible-desk.ts, livewell-marks-v1). Two pieces, loaded only when they
 * are needed:
 *
 * - VerseMarks (default): in the verse panel, three quiet colours, a note,
 *   and one tap to remove.
 * - ChapterMarksList: under the chapter's text in the Study view, "My notes
 *   on this chapter", every marked verse with its note, each opening its verse
 *   and each removed in one tap.
 *
 * Marks show in the Study view only, never in Read. The colours are tokens
 * (--mark-a, --mark-b, --mark-c in index.css), day and night.
 */
import { useId, useState } from "react";
import { Link } from "wouter";
import { NotebookPen, PencilLine, Trash2 } from "lucide-react";

import { MARK_COLORS, type Mark, type MarkColor } from "@/lib/bible-desk";

const KEPT = "Kept on this device only. Nothing you write here leaves it.";
const SAVE_FAILED = "Couldn't save to this browser — your work here will not survive a reload.";

export interface VerseMarksProps {
  /** "John 3:16". */
  label: string;
  mark: Mark | undefined;
  /** Sets the colour and the note together; false when the device would not keep it. */
  onSave: (change: { color?: MarkColor; note?: string }) => boolean;
  saveFailed: boolean;
}

export default function VerseMarks({ label, mark, onSave, saveFailed }: VerseMarksProps) {
  const [editing, setEditing] = useState<{ label: string; text: string } | null>(null);
  const noteId = useId();
  const open = editing?.label === label ? editing : null;
  const color = mark?.color;
  const note = mark?.note;

  const pick = (c: MarkColor) => onSave({ color: color === c ? undefined : c, note });
  const keep = () => {
    if (!open) return;
    if (onSave({ color, note: open.text })) setEditing(null);
  };

  return (
    <div className="sb-marks">
      <div className="sb-marks__row">
        <div role="group" aria-label={`Highlight ${label}`} className="sb-marks__colors">
          {MARK_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              className="sb-swatch"
              data-color={c.id}
              aria-pressed={color === c.id}
              aria-label={color === c.id ? `${c.name} highlight, on. Tap to clear it` : `Highlight in ${c.name.toLowerCase()}`}
              onClick={() => pick(c.id)}
            >
              <span aria-hidden />
            </button>
          ))}
        </div>
        <button type="button" className="sb-marks__btn" aria-expanded={!!open} aria-controls={noteId} onClick={() => setEditing(open ? null : { label, text: note ?? "" })}>
          <PencilLine size={16} strokeWidth={1.75} aria-hidden /> {note ? "Edit note" : "Note"}
        </button>
        {mark && (
          <button type="button" className="sb-marks__btn sb-marks__btn--quiet" onClick={() => { setEditing(null); onSave({}); }} aria-label={`Remove your highlight and note on ${label}`}>
            <Trash2 size={16} strokeWidth={1.75} aria-hidden /> Remove
          </button>
        )}
      </div>
      {open ? (
        <div id={noteId} className="sb-marks__edit">
          <label htmlFor={`${noteId}-t`} className="sb-marks__label">Your note on {label}</label>
          <textarea id={`${noteId}-t`} className="sb-marks__area" rows={3} value={open.text} onChange={(e) => setEditing({ label, text: e.target.value })} />
          <div className="sb-marks__row">
            <button type="button" className="sb-marks__btn sb-marks__btn--ink" onClick={keep}>Keep</button>
            <button type="button" className="sb-marks__btn sb-marks__btn--quiet" onClick={() => setEditing(null)}>Cancel</button>
          </div>
          <p className="sb-marks__kept">{KEPT}</p>
        </div>
      ) : note ? (
        <p className="sb-marks__note">{note}</p>
      ) : null}
      {saveFailed && <p role="alert" className="sb-marks__alert">{SAVE_FAILED}</p>}
    </div>
  );
}

/** "My notes on this chapter": every marked verse, each opened or removed in one tap. */
export function ChapterMarksList({ marks, onOpen, onRemove }: { marks: Mark[]; onOpen: (verse: number) => void; onRemove: (ref: string) => void }) {
  const sorted = [...marks].sort((a, b) => a.verse - b.verse);
  return (
    <details className="sb-mynotes" open>
      <summary>
        <NotebookPen size={18} strokeWidth={1.75} aria-hidden />
        <span>My notes on this chapter</span>
        <span className="sb-mynotes__n">{sorted.length}</span>
      </summary>
      <ul>
        {sorted.map((m) => (
          <li key={m.ref}>
            <span className="sb-mynotes__sw" data-color={m.color ?? "none"} aria-hidden />
            <button type="button" className="sb-mynotes__open" onClick={() => onOpen(m.verse)}>
              <span className="sb-mynotes__ref">{m.label}</span>
              <span className="sb-mynotes__text">{m.note ?? (m.color ? `${MARK_COLORS.find((c) => c.id === m.color)?.name} highlight` : "")}</span>
            </button>
            <button type="button" className="sb-mynotes__rm" aria-label={`Remove your mark on ${m.label}`} onClick={() => onRemove(m.ref)}>
              <Trash2 size={18} strokeWidth={1.75} aria-hidden />
            </button>
          </li>
        ))}
      </ul>
      <p className="sb-marks__kept">{KEPT} They are listed in <Link href="/my-library">My Library</Link> too.</p>
    </details>
  );
}
