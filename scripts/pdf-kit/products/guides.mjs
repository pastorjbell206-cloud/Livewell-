/**
 * Reading Scripture in Context guides and the reading-path lead magnets.
 */
import { C } from "../index.mjs";

export function contextGuide(guide) {
  return {
    title: guide.title,
    subject: `${guide.title}${guide.subtitle ? ": " + guide.subtitle : ""}. From the Reading Scripture in Context library.`,
    keywords: ["Reading Scripture in Context", guide.group || guide.kicker || "", "Bible background"].filter(Boolean),
    runningHead: guide.title,
    render(k) {
      k.cover({ kicker: `Reading Scripture in Context · ${guide.kicker || guide.group || ""}`, title: guide.title, subtitle: guide.subtitle });
      for (const section of guide.sections || []) {
        k.titled(section.kicker, section.title, { bookmark: true, bookmarkLevel: 1, level: 2 });
        k.paras(section.body || "");
        k.space(8);
      }
      if (guide.keyTexts?.length) {
        k.ensure(110);
        k.hairline({ after: 16 });
        k.h3("Key texts", { bookmark: true, bookmarkLevel: 1, after: 6 });
        k.list(guide.keyTexts);
      }
      if (guide.sources?.length) {
        k.ensure(90);
        k.h3("Sources", { bookmark: true, bookmarkLevel: 1, after: 6 });
        k.list(guide.sources.map((s) => `*${s.title}*, ${s.author}`), { size: k.bodySize - 0.5 });
      }
      k.space(6);
      k.linkLine(`Read it online: livewellbyjamesbell.co/resources/context/${guide.slug}`, `/resources/context/${guide.slug}`);
    },
  };
}

export function readingPath(rp) {
  return {
    title: `${rp.title}: A Reading Path`,
    subject: rp.subtitle || rp.title,
    keywords: ["reading path", rp.title],
    runningHead: rp.title,
    render(k) {
      k.cover({ kicker: rp.kicker || "A Reading Path", title: rp.title, subtitle: rp.subtitle });
      k.paras(rp.intro);
      k.hairline({ after: 18 });
      for (const stop of rp.stops || []) {
        k.ensure(120);
        k.eyebrow(`Stop ${stop.n}`, { after: 4 });
        k.h2(stop.guide, { bookmark: true, bookmarkLevel: 1, keep: false, after: 6 });
        k.p(stop.why);
        if (stop.url) {
          const href = stop.url.replace(/^https?:\/\//, "").replace(/^(www\.)?livewellbyjamesbell\.co/, "");
          k.linkLine(stop.url.replace(/^https?:\/\//, ""), href || "/", { after: 16 });
        }
      }
      if (rp.closing) {
        k.ensure(90);
        k.hairline({ after: 16 });
        k.p(rp.closing, { family: "display", italic: true, size: 14, color: C.ink });
      }
    },
  };
}
