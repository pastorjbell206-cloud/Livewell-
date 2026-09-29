/**
 * Printable essay editions: the canon (client/src/data/canon.json) and the
 * front-page flagships (client/src/data/featured.json), set from the essay
 * bodies in content/static-library.generated.json. The pull quote is the
 * first sentence of the essay's own excerpt; the questions at the end are the
 * essay's discussion guide (client/src/data/discussion-guides.ts) when it has
 * one.
 */
import { C, firstSentence, smart } from "../index.mjs";
import { parseBlocks } from "../markdown.mjs";

export function essayEdition(e, { guide, kicker }) {
  return {
    title: e.title,
    subject: e.excerpt || e.title,
    keywords: ["essay", "James Bell", e.pillar || ""].filter(Boolean),
    runningHead: e.title,
    render(k) {
      const d = k.doc;
      k.hideHead();
      d.y = 120;
      k.eyebrow(kicker, { after: 10 });
      k.bookmark(e.title, 0);
      k.tag("H1", () => {
        d.font("display").fontSize(34).fillColor(C.ink)
          .text(smart(e.title), k.left, d.y, { width: k.width, lineGap: 1, characterSpacing: -0.68 });
      });
      d.y += 14;
      const mins = e.readingTimeMinutes ? ` · ${e.readingTimeMinutes} min read` : "";
      k.eyebrow(`James Bell${mins}`, { color: C.muted, after: 10 });
      k.rule({ length: 44, after: 22 });

      const blocks = parseBlocks(e.body);
      const paraCount = blocks.filter((b) => b.type === "p").length;
      const pull = e.excerpt ? firstSentence(e.excerpt) : null;
      let seen = 0;
      let pulled = false;
      for (const b of blocks) {
        if (b.type === "p") {
          k.p(b.text);
          seen++;
          if (pull && !pulled && paraCount >= 6 && seen === 3) {
            pulled = true;
            k.ensure(110);
            k.space(4);
            k.rule({ center: true, length: 40, after: 12 });
            k.tag("BlockQuote", () => k.rich(pull, { family: "display", italic: true, size: 17, align: "center", leading: 1.3, x: k.left + 30, width: k.width - 60 }));
            k.space(10);
            k.rule({ center: true, length: 40, after: 18 });
          }
        } else if (b.type === "h2") {
          k.space(8);
          k.h2(b.text, { bookmark: true, bookmarkLevel: 1 });
        } else if (b.type === "h3") {
          k.space(4);
          k.h3(b.text);
        } else if (b.type === "quote") {
          k.quote(b.text, b.ref);
        } else if (b.type === "ul" || b.type === "ol") {
          k.list(b.items, { numbered: b.type === "ol" });
        } else if (b.type === "hr") {
          k.rule({ center: true, length: 30, after: 16 });
        }
      }

      if (guide) {
        k.newPage();
        k.titled("For reflection and discussion", "Questions", { bookmark: true, bookmarkLevel: 1 });
        if (guide.personalReflection?.length) {
          k.h3("On your own", { after: 5 });
          guide.personalReflection.forEach((q, i) => {
            k.ensure(80);
            k.p(`**${i + 1}.** ${q}`, { after: 0 });
            k.lines(2);
            k.space(4);
          });
        }
        if (guide.groupDiscussion?.length) {
          k.space(8);
          k.h3("With a group", { after: 5 });
          k.list(guide.groupDiscussion, { numbered: true });
        }
        if (guide.actionStep) k.labelled("This week", guide.actionStep);
      }
      k.space(12);
      k.hairline({ after: 12 });
      k.linkLine(`Read it online: livewellbyjamesbell.co/writing/${e.slug}`, `/writing/${e.slug}`);
    },
  };
}
