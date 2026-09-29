/**
 * The Creeds Reader: every document in client/public/creeds, with the site's
 * introduction, the text as stored, and the site's notes on its phrases.
 */
import { C } from "../index.mjs";

const GROUP_ORDER = ["The Ecumenical Creeds", "Reformation Confessions", "Baptist and Free Church", "Modern Confessions"];
const year = (date) => Number((String(date).match(/\d{3,4}/) || ["9999"])[0]);

export function orderCreeds(docs) {
  const groupRank = (g) => {
    const i = GROUP_ORDER.indexOf(g);
    return i < 0 ? GROUP_ORDER.length : i;
  };
  return docs.slice().sort((a, b) => groupRank(a.group) - groupRank(b.group) || year(a.date) - year(b.date));
}

export function creedsReader(docs) {
  const ordered = orderCreeds(docs);
  return {
    title: "The Creeds Reader",
    subject: `${ordered.length} creeds, confessions and catechisms with introductions and notes on the phrases that carried the weight.`,
    keywords: ["creeds", "confessions", "catechism", "church history", ...ordered.map((d) => d.title)],
    runningHead: "The Creeds Reader",
    render(k) {
      k.cover({
        kicker: "Creeds, Confessions, and Classics",
        title: "The Creeds Reader",
        subtitle: "The church's memory, in the words it chose, with notes on what the loaded phrases meant to the people who wrote them.",
      });
      k.titled("Contents", "What is in this reader", { keep: 200 });
      let group = null;
      for (const doc of ordered) {
        if (doc.group !== group) {
          group = doc.group;
          k.space(6);
          k.eyebrow(group, { after: 4 });
        }
        k.p(`${doc.title} *(${doc.date})*`, { after: 3 });
      }
      group = null;
      for (const doc of ordered) {
        k.newPage();
        if (doc.group !== group) {
          group = doc.group;
          k.bookmark(group, 1);
        }
        k.setRunningHead(doc.title);
        k.titled(`${doc.group} · ${doc.date}`, doc.title, { bookmark: true, bookmarkLevel: 2 });
        if (doc.subtitle) k.p(doc.subtitle, { family: "display", italic: true, size: 14, color: C.muted, leading: 1.35, after: 14 });
        k.h3("Introduction", { after: 5 });
        k.paras(doc.intro);
        k.space(6);
        k.h2("The text", { after: 10 });
        const x = k.left + 16;
        const width = k.width - 16;
        for (const para of String(doc.text).split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)) {
          k.p(para.replace(/\n/g, " "), { family: "display", size: 13, leading: 1.4, x, width, after: 8 });
        }
        if (doc.annotations?.length) {
          k.space(8);
          k.h2("Notes on the text", { after: 8 });
          for (const a of doc.annotations) {
            k.ensure(60);
            k.p(`**“${a.phrase}”**`, { after: 3 });
            k.p(a.note);
          }
        }
        k.linkLine(`Online: livewellbyjamesbell.co/resources/creeds/${doc.slug}`, `/resources/creeds/${doc.slug}`, { after: 0 });
      }
    },
  };
}
