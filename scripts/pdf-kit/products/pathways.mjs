/**
 * Pathway readers: each topical pathway (client/public/pathways/<slug>.json)
 * as a printed reader. Every stop keeps the pathway's own note and blurb;
 * essays add their excerpt and, where the essay has a discussion guide, its
 * reflection questions; studies add their summary and session list.
 */
import { C, smart } from "../index.mjs";

export function pathwayReader(p, ctx) {
  return {
    title: `${p.title}: A Pathway Reader`,
    subject: p.subtitle || p.title,
    keywords: ["pathway", "reading guide", p.title],
    runningHead: p.title,
    render(k) {
      k.cover({ kicker: "A Pathway Reader", title: p.title, subtitle: p.subtitle, note: p.forWhom });
      p.movements.forEach((m, mi) => {
        if (mi > 0) k.space(14);
        k.titled(`Part ${mi + 1}`, m.heading, { bookmark: true, bookmarkLevel: 1, keep: 150 });
        if (m.note) k.p(m.note, { family: "display", italic: true, size: 14, color: C.muted, leading: 1.4, after: 14 });
        for (const it of m.items) {
          const slug = it.href.startsWith("/writing/") ? it.href.slice(9) : null;
          const essay = slug ? ctx.essay(slug) : null;
          const sg = it.href.startsWith("/studyguides/") ? ctx.studyguide(it.href.slice(13)) : null;
          k.ensure(150);
          k.hairline({ after: 14 });
          k.eyebrow(m.kind === "read" ? "Read" : m.kind === "study" ? "Study" : m.kind === "book" ? "Book" : m.kind, { after: 4 });
          k.h2(essay ? essay.title : it.label, { bookmark: true, bookmarkLevel: 2, keep: false, after: 6 });
          if (it.blurb) k.p(it.blurb, { after: 8 });
          if (essay?.excerpt) k.quote(essay.excerpt, "From the essay", { family: "display", size: 13.5 });
          if (sg) {
            if (sg.summary) k.paras(sg.summary);
            if (sg.sessions?.length) {
              k.eyebrow(sg.sessionsLabel || "Sessions", { after: 4 });
              k.list(sg.sessions.map((s) => `**${s.n}.** ${s.title}`), { marker: "", indent: 0, itemGap: 2 });
            }
          }
          const g = slug ? ctx.guide(slug) : null;
          if (g?.personalReflection?.length) {
            k.ensure(90);
            k.eyebrow("Questions to carry", { after: 4 });
            g.personalReflection.forEach((q, i) => {
              k.ensure(70);
              k.p(`**${i + 1}.** ${q}`, { after: 0 });
              k.lines(2);
              k.space(4);
            });
          }
          k.linkLine(smart(`Open it online: livewellbyjamesbell.co${it.href}`), it.href, { after: 12 });
        }
      });
      k.space(10);
      k.linkLine(`The whole pathway online: livewellbyjamesbell.co/pathways/${p.slug}`, `/pathways/${p.slug}`);
    },
  };
}
