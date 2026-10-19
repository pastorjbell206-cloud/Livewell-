/**
 * Reminders in the reader's own calendar, built in the browser.
 *
 * A plan, a reading plan, or a daily tool can offer "Remind me": a repeating
 * event the reader adds to their own calendar, so their phone reminds them
 * to come back. Nothing is sent to LiveWell. Two doors:
 *   - googleCalendarUrl(): opens Google Calendar with the event filled in
 *     (works on any phone or computer with a Google account);
 *   - openIcs(): a standard .ics file for Apple Calendar, Outlook, and the
 *     rest (on iPhone and iPad, Safari opens it straight into Calendar).
 *
 * Times are "floating" local times (no time zone), so 8:00 PM means 8:00 PM
 * wherever the reader is.
 */

export interface Reminder {
  title: string;
  /** One or two plain sentences; the page's address is added after it. */
  details: string;
  /** The page to come back to (a full https address). */
  url: string;
  freq: "DAILY" | "WEEKLY";
  /** How many times it repeats. */
  count: number;
  /** Local time of day, 24-hour. */
  hour: number;
  minute?: number;
  /** The first day (local); defaults to tomorrow. */
  start?: Date;
}

const pad = (n: number) => String(n).padStart(2, "0");

function firstDay(r: Reminder): Date {
  const d = r.start ? new Date(r.start) : new Date();
  if (!r.start) d.setDate(d.getDate() + 1);
  d.setHours(r.hour, r.minute ?? 0, 0, 0);
  return d;
}

/** 20261020T200000 (local, no zone). */
function localStamp(d: Date): string {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
}

function utcStamp(d: Date): string {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

/** RFC 5545 text escaping. */
export function icsText(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

/** Fold a content line at 75 octets, continuing with CRLF and one space. */
export function foldLine(line: string): string {
  const enc = new TextEncoder();
  if (enc.encode(line).length <= 75) return line;
  const parts: string[] = [];
  let current = "";
  let bytes = 0;
  for (const ch of line) {
    const n = enc.encode(ch).length;
    const limit = parts.length === 0 ? 75 : 74; // continuation lines start with a space
    if (bytes + n > limit) {
      parts.push(current);
      current = "";
      bytes = 0;
    }
    current += ch;
    bytes += n;
  }
  parts.push(current);
  return parts.join("\r\n ");
}

function rrule(r: Reminder): string {
  return `FREQ=${r.freq};COUNT=${Math.max(1, Math.min(400, Math.round(r.count)))}`;
}

/** The .ics text for a repeating reminder. */
export function buildIcs(r: Reminder, now: Date = new Date(), uid?: string): string {
  const start = firstDay(r);
  const id = uid ?? `${now.getTime().toString(36)}-${Math.random().toString(36).slice(2, 10)}@livewellbyjamesbell.co`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//LiveWell by James Bell//Reminders//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${id}`,
    `DTSTAMP:${utcStamp(now)}`,
    `DTSTART:${localStamp(start)}`,
    "DURATION:PT15M",
    `RRULE:${rrule(r)}`,
    `SUMMARY:${icsText(r.title)}`,
    `DESCRIPTION:${icsText(`${r.details}\n\n${r.url}`)}`,
    `URL:${r.url}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${icsText(r.title)}`,
    "TRIGGER:PT0M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(foldLine).join("\r\n") + "\r\n";
}

/** Google Calendar's "add event" page, with the reminder filled in. */
export function googleCalendarUrl(r: Reminder): string {
  const start = firstDay(r);
  const end = new Date(start.getTime() + 15 * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: r.title,
    details: `${r.details}\n\n${r.url}`,
    dates: `${localStamp(start)}/${localStamp(end)}`,
    recur: `RRULE:${rrule(r)}`,
  });
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (zone) params.set("ctz", zone);
  } catch {
    /* Google falls back to the calendar's own zone */
  }
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function isAppleMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const iPadOS = navigator.platform === "MacIntel" && ((navigator as Navigator & { maxTouchPoints?: number }).maxTouchPoints ?? 0) > 1;
  return /iPhone|iPad|iPod/.test(ua) || iPadOS;
}

/**
 * Hand the reminder to the device's calendar. On iPhone and iPad, Safari opens
 * a calendar data address straight into Calendar; elsewhere the .ics file is
 * downloaded, and opening it adds the event. Returns false if the browser
 * refused.
 */
export function openIcs(r: Reminder, filename = "livewell-reminder.ics"): boolean {
  if (typeof window === "undefined") return false;
  const ics = buildIcs(r);
  try {
    if (isAppleMobile()) {
      window.location.href = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
      return true;
    }
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(href), 10_000);
    return true;
  } catch {
    return false;
  }
}
