/**
 * One-page summaries of the 66 books from the Study Bible's book
 * introductions (client/public/bible/notes/<book>/intro.json). The sheet
 * carries the introduction's own words: tagline, purpose, outline, themes and
 * key chapters, trimmed to their first sentences only when a book will not
 * fit on one page.
 */
import { C, firstSentence, fitLevel } from "../index.mjs";

const OPTIONS = { title: "Book summary", margins: { top: 58, bottom: 60, left: 78, right: 78 } };

// Trim steps, applied cumulatively until the sheet fits on one page.
const TRIMS = ["structureSummaries", "christ", "fewerChapters", "chapterReasons", "shortPurpose", "smallType"];

function drawBook(k, b, intro, i, level) {
  const cut = new Set(TRIMS.slice(0, level));
  const testament = b.testament === "OT" ? "Old Testament" : "New Testament";
  k.hideHead();
  k.eyebrow(`Books of the Bible · ${testament} · ${i + 1} of 66 · ${b.chapters} ${b.chapters === 1 ? "chapter" : "chapters"}`, { after: 6 });
  k.h1(b.name, { bookmark: true, bookmarkLevel: 0, keep: false, after: 6, size: 30 });
  if (intro.tagline) k.p(intro.tagline, { family: "display", italic: true, size: 14, color: C.muted, leading: 1.3, after: 10 });
  k.rule({ length: 36, after: 12 });
  const small = k.bodySize - (cut.has("smallType") ? 1.75 : 1);
  if (intro.purpose) k.labelled("Why it was written", cut.has("shortPurpose") ? firstSentence(intro.purpose) : intro.purpose, { size: small });
  if (intro.structure?.length) {
    k.ensure(40);
    k.eyebrow("The shape of the book", { after: 4 });
    const rows = intro.structure.map((s) =>
      cut.has("structureSummaries") || !s.summary ? `**${s.range}** ${s.title}` : `**${s.range}** ${s.title}. ${firstSentence(s.summary)}`
    );
    k.list(rows, { marker: "", indent: 0, size: small - 0.25, itemGap: 2, after: 8 });
  }
  if (intro.themes?.length) {
    k.labelled("Themes", intro.themes.map((t) => t.title).join(" · "), { size: small });
  }
  if (intro.keyChapters?.length) {
    k.ensure(40);
    k.eyebrow("Chapters to start with", { after: 4 });
    const kc = intro.keyChapters.slice(0, cut.has("fewerChapters") ? 4 : 6);
    k.list(
      kc.map((c) => (cut.has("chapterReasons") ? `**${b.name} ${c.ch}**` : `**${b.name} ${c.ch}.** ${firstSentence(c.why)}`)),
      { marker: "", indent: 0, size: small - 0.25, itemGap: 2, after: 8 }
    );
  }
  if (intro.christ && !cut.has("christ")) k.labelled(`Christ in ${b.name}`, firstSentence(intro.christ), { size: small });
  k.linkLine(`Read ${b.name} with notes: livewellbyjamesbell.co/study/bible/${b.slug}`, `/study/bible/${b.slug}`, { after: 0 });
}

export function bookSummary(b, intro, i) {
  return {
    title: `${b.name}: A One-Page Summary`,
    subject: intro.tagline || b.name,
    keywords: ["Bible", b.name, b.testament === "OT" ? "Old Testament" : "New Testament", "book summary"],
    runningHead: b.name,
    margins: OPTIONS.margins,
    render(k) {
      const lv = fitLevel({ ...OPTIONS }, (trial, l) => drawBook(trial, b, intro, i, l), TRIMS.length);
      drawBook(k, b, intro, i, lv);
    },
  };
}

export function bookSummariesAll(books, intros) {
  return {
    title: "The Books of the Bible: 66 One-Page Summaries",
    subject: "A one-page summary of every book of the Bible, from the Study Bible's introductions.",
    keywords: ["Bible", "book summaries", "study bible"],
    runningHead: "The Books of the Bible",
    margins: OPTIONS.margins,
    render(k) {
      books.forEach((b, i) => {
        if (i > 0) k.newPage();
        const lv = fitLevel({ ...OPTIONS }, (trial, l) => drawBook(trial, b, intros[i], i, l), TRIMS.length);
        drawBook(k, b, intros[i], i, lv);
      });
    },
  };
}
