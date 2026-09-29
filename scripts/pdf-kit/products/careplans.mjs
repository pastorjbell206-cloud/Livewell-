/**
 * Care-plan workbooks: each eight-week plan in client/public/plans as a
 * printed workbook with room to write. Every page carries the same
 * path-to-help band as the site's CrisisHelp note, because a person may open
 * this on the worst day of the month and should never have to look for it.
 */
import { C } from "../index.mjs";

export const HELP_NOTE =
  "If you are in crisis or thinking about ending your life, call or text 988 (Suicide & Crisis Lifeline, US) now, and tell someone who loves you. " +
  "If you are not safe at home, call the National Domestic Violence Hotline at 1-800-799-7233. In an emergency, call 911. " +
  "This workbook supports the work of doctors, counselors, and pastors. It does not replace them. This is not medical advice.";

export function carePlanWorkbook(p) {
  return {
    title: `${p.title}: A Workbook`,
    subject: p.subtitle,
    keywords: ["care plan", "workbook", "eight weeks", p.slug],
    runningHead: p.title,
    pageNote: { text: HELP_NOTE, height: 60 },
    render(k) {
      k.cover({ kicker: "A care plan workbook · Eight weeks", title: p.title, subtitle: p.subtitle });
      k.titled("Before you start", "How this works", { bookmark: true, bookmarkLevel: 1 });
      k.paras(p.intro);
      if (p.careNote) {
        k.panel(({ x, width }) => {
          k.eyebrow("A word of care", { x, width, after: 4 });
          k.p(p.careNote, { x, width, after: 0 });
        }, { accent: true });
      }
      k.panel(({ x, width }) => {
        k.eyebrow("Where to find help now", { x, width, after: 4 });
        k.p("Call or text **988** for the Suicide & Crisis Lifeline (US), any hour. If you are not safe at home, the National Domestic Violence Hotline is **1-800-799-7233**. In an emergency, call **911**.", { x, width, family: "sans", size: 9.5, after: 4 });
        k.linkLine("More places to turn: livewellbyjamesbell.co/help", "/help", { x, width, after: 0 });
      }, { border: C.rule });

      for (const w of p.weeks) {
        k.newPage();
        k.titled(`Week ${w.n}`, w.focus, { bookmark: true, bookmarkTitle: `Week ${w.n}: ${w.focus}`, bookmarkLevel: 1 });
        k.paras(w.why);
        k.panel(({ x, width }) => {
          k.eyebrow("The practice", { x, width, after: 4 });
          k.p(w.practice, { x, width, after: 8 });
          // Seven boxes: one per day the practice is kept. No scorecard.
          const d = k.doc;
          const y = d.y;
          const step = Math.min(52, width / 7);
          for (let i = 0; i < 7; i++) {
            k.checkbox(x + i * step, y, 10);
            k.artifact(() => d.font("sans").fontSize(7).fillColor(C.muted).text(`Day ${i + 1}`, x + i * step + 14, y + 1.5, { lineBreak: false }));
          }
          d.y = y + 14;
        }, { accent: true });
        k.ensure(70);
        k.eyebrow("Read", { after: 3 });
        k.linkLine(w.read.label, w.read.href, { role: "serif", size: k.bodySize, after: 8 });
        k.eyebrow("Use", { after: 3 });
        k.linkLine(w.tool.label, w.tool.href, { role: "serif", size: k.bodySize, after: 14 });
        k.ensure(120);
        k.h3("Reflect", { after: 5 });
        k.p(w.reflection, { italic: true, after: 2 });
        const room = Math.floor((k.bottom - k.y - 8) / 22);
        k.lines(Math.max(4, Math.min(room, 12)));
      }
      k.newPage();
      k.titled("After eight weeks", "Looking back", { bookmark: true, bookmarkLevel: 1 });
      k.p("What changed, what did not, and what you want to carry forward. Write it down while it is still fresh.", { after: 4 });
      k.lines(Math.max(6, Math.floor((k.bottom - k.y - 30) / 22)));
      k.linkLine(`This plan online, with a tracker: livewellbyjamesbell.co/plans/${p.slug}`, `/plans/${p.slug}`);
    },
  };
}
