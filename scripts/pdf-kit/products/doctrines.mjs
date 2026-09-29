/**
 * Doctrine sheets: one page per doctrine in the Study Bible's vocabulary
 * (client/public/bible/doctrines.json). The summary is the Study Bible's;
 * where the site has a full treatment (client/public/theology/<page>.json)
 * the sheet adds its question, its triage, each position in one line, and
 * the passages it weighs; the chapter list is the Study Bible notes index.
 */
import { C, fitLevel } from "../index.mjs";

const TRIAGE = {
  "first-order": "First-order: what the creeds bind",
  "second-order": "Second-order: divides faithful churches, not the faith",
  "third-order": "Third-order: genuinely open among the faithful",
};

function chapterRef(ref, books) {
  const [slug, ch] = ref.split("/");
  const b = books.get(slug);
  return `${b ? b.name : slug} ${ch}`;
}

/** Draw one sheet on the current page. level trims content to fit. */
function drawSheet(k, doc, i, total, t, chapters, books, level) {
  const maxChapters = [40, 24, 14, 8][Math.min(level, 3)];
  const withLines = level < 2;
  k.hideHead();
  k.eyebrow(`Doctrine sheet · ${i + 1} of ${total}`, { after: 8 });
  k.h1(doc.name, { bookmark: true, bookmarkLevel: 0, keep: false, after: 10 });
  k.p(doc.summary, { family: "display", size: 14.5, leading: 1.4, after: 12 });
  k.rule({ length: 36, after: 14 });
  if (t) {
    k.eyebrow("The question the church still asks", { after: 3 });
    k.h3(t.title, { keep: false, after: 3 });
    if (t.subtitle && level < 3) k.p(t.subtitle, { italic: true, color: C.muted, after: 6 });
    if (TRIAGE[t.triage]) k.p(`**${TRIAGE[t.triage]}.**`, { family: "sans", size: 8.5, color: C.muted, after: 8 });
    const positions = t.positions || [];
    if (positions.length) {
      k.list(positions.map((p) => (withLines ? `**${p.name}.** ${p.inOneLine}` : `**${p.name}**`)), { size: k.bodySize - 0.75, itemGap: 3 });
    }
    const passages = (t.biblicalEvidence || []).map((b) => b.passage);
    if (passages.length && level < 3) k.labelled("Passages it weighs", passages.join("; "), { size: k.bodySize - 0.75 });
  }
  if (chapters?.length) {
    const shown = chapters.slice(0, maxChapters).map((r) => chapterRef(r, books));
    const more = chapters.length - shown.length;
    k.labelled(
      "Where the Study Bible teaches it",
      shown.join(" · ") + (more > 0 ? ` · and ${more} more` : ""),
      { family: "sans", size: 8.5 }
    );
  }
  k.linkLine(`The chapters: livewellbyjamesbell.co/study/bible/doctrines/${doc.id}`, `/study/bible/doctrines/${doc.id}`, { after: 2 });
  if (t) k.linkLine(`The full treatment: livewellbyjamesbell.co/theology/doctrine/${doc.page}`, `/theology/doctrine/${doc.page}`, { after: 0 });
}

const OPTIONS = { title: "Doctrine sheet", margins: { top: 64, bottom: 64, left: 84, right: 84 } };

export function doctrineSheet(doc, i, total, ctx) {
  const t = doc.page ? ctx.theology(doc.page) : null;
  const chapters = ctx.doctrineChapters(doc.id);
  return {
    title: `${doc.name}: A Doctrine Sheet`,
    subject: doc.summary,
    keywords: ["doctrine", "theology", doc.name],
    runningHead: doc.name,
    margins: OPTIONS.margins,
    render(k) {
      const lv = fitLevel({ ...OPTIONS }, (trial, l) => drawSheet(trial, doc, i, total, t, chapters, ctx.books, l), 4);
      drawSheet(k, doc, i, total, t, chapters, ctx.books, lv);
    },
  };
}

export function doctrineSheetsAll(docs, ctx) {
  return {
    title: "Doctrine Sheets: All in One",
    subject: `All ${docs.length} doctrine sheets from the Study Bible's vocabulary, one page each.`,
    keywords: ["doctrine", "theology", "study bible"],
    runningHead: "Doctrine Sheets",
    margins: OPTIONS.margins,
    render(k) {
      docs.forEach((doc, i) => {
        if (i > 0) k.newPage();
        const t = doc.page ? ctx.theology(doc.page) : null;
        const chapters = ctx.doctrineChapters(doc.id);
        const lv = fitLevel({ ...OPTIONS }, (trial, l) => drawSheet(trial, doc, i, docs.length, t, chapters, ctx.books, l), 4);
        drawSheet(k, doc, i, docs.length, t, chapters, ctx.books, lv);
      });
    },
  };
}
