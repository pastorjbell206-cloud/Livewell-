/**
 * RemindMe: a repeating reminder in the reader's own calendar (lib/calendar),
 * so their phone brings them back to a plan, a reading plan, or a daily tool.
 * The reader picks a time of day, then Google Calendar or the device's own
 * calendar. Nothing is sent to LiveWell.
 */
import { useId, useState } from "react";
import { CalendarPlus } from "lucide-react";
import { googleCalendarUrl, openIcs, type Reminder } from "@/lib/calendar";
import { absoluteUrl } from "@/components/TakeItWithYou";

interface RemindMeProps {
  /** The event's name in the reader's calendar. */
  title: string;
  /** One or two plain sentences for the event's notes. */
  details: string;
  /** The page to come back to; defaults to the current page. */
  href?: string;
  freq: "DAILY" | "WEEKLY";
  /** How many reminders in all (eight for a plan's weeks, thirty for a month of evenings). */
  count: number;
  /** Plain words for the schedule: "every week for eight weeks". */
  schedule: string;
  /** Which time to suggest first. */
  defaultTime?: "morning" | "midday" | "evening";
  /** Use cream text on a dark section. */
  onDark?: boolean;
}

const TIMES = [
  { id: "morning", label: "Morning, 7:00", hour: 7 },
  { id: "midday", label: "Midday, 12:00", hour: 12 },
  { id: "evening", label: "Evening, 8:00", hour: 20 },
] as const;

export function RemindMe({ title, details, href, freq, count, schedule, defaultTime = "evening", onDark = false }: RemindMeProps) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<(typeof TIMES)[number]["id"]>(defaultTime);
  const [status, setStatus] = useState<"" | "sent" | "failed">("");
  const groupId = useId();
  const fg = onDark ? "var(--charcoal-fg)" : "var(--ink)";
  const muted = onDark ? "var(--charcoal-fg-muted)" : "var(--ink-muted)";
  const line = onDark ? "var(--charcoal-line)" : "var(--border)";
  const path = href ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const reminder: Reminder = { title, details, url: absoluteUrl(path), freq, count, hour: TIMES.find((t) => t.id === time)!.hour };

  const button: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", minHeight: "44px", padding: "10px 16px",
    border: `1px solid ${line}`, borderRadius: "var(--radius-sm)", background: "transparent", color: fg,
    fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, cursor: "pointer", textDecoration: "none",
  };

  return (
    <div className="no-print" style={{ margin: "12px 0 0" }}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls={open ? groupId : undefined} style={button}>
        <CalendarPlus size={16} aria-hidden /> Remind me
      </button>
      {open && (
        <div id={groupId} style={{ marginTop: "10px", padding: "14px", border: `1px solid ${line}`, borderRadius: "var(--radius-sm)", maxWidth: "520px" }}>
          <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
            <legend style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: fg, marginBottom: "8px" }}>
              A reminder in your own calendar, {schedule}. When?
            </legend>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>
              {TIMES.map((t) => (
                <label key={t.id} style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "44px", fontFamily: "var(--U)", fontSize: "14px", color: fg, cursor: "pointer" }}>
                  <input type="radio" name={`${groupId}-time`} value={t.id} checked={time === t.id} onChange={() => setTime(t.id)} style={{ width: "18px", height: "18px", accentColor: "var(--mustard)" }} />
                  {t.label}
                </label>
              ))}
            </div>
          </fieldset>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
            <a href={googleCalendarUrl(reminder)} target="_blank" rel="noopener noreferrer" style={button}>
              Google Calendar
            </a>
            <button type="button" onClick={() => setStatus(openIcs(reminder) ? "sent" : "failed")} style={button}>
              Apple, Outlook, or other
            </button>
          </div>
          <p aria-live="polite" style={{ fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.5, color: muted, margin: "10px 0 0" }}>
            {status === "sent"
              ? "If your calendar didn't open, look in your downloads for livewell-reminder.ics and open it."
              : status === "failed"
                ? "Your browser wouldn't make the calendar file. Try Google Calendar instead."
                : "It goes into your calendar, not to LiveWell. Delete it there any time."}
          </p>
        </div>
      )}
    </div>
  );
}
