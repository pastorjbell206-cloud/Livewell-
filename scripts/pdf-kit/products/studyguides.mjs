/**
 * Study-guide toolkits: a Leader's Guide, a Participant Handout, and the
 * Group leader packet (both in one file) per series in client/public/studyguides.
 */
import { C } from "../index.mjs";

function leaderBody(k, g) {
  k.setRunningHead(`${g.title} · Leader's Guide`);
  k.titled("About this study", g.title, { bookmark: true, bookmarkTitle: "About this study", bookmarkLevel: 1 });
  k.paras(g.summary);
  if (g.audience) k.labelled("Who it is for", g.audience);

  if (g.leaderPrimer) {
    k.newPage();
    k.titled("Before you begin", "Leader training primer", { bookmark: true, bookmarkLevel: 1 });
    k.paras(g.leaderPrimer);
  }

  for (const s of g.sessions) {
    k.newPage();
    k.titled(`Session ${s.n}`, s.title, { bookmark: true, bookmarkTitle: `Session ${s.n}: ${s.title}`, bookmarkLevel: 1 });
    k.labelled("Aim", s.aim);
    if (s.timing?.length) k.labelled("Timing", s.timing.map((t) => `${t.segment} ${t.minutes} min`).join("   ·   "));
    if (s.teaching) {
      k.eyebrow("Teaching notes", { after: 3 });
      k.paras(s.teaching);
    }
    if (s.keyScripture) k.labelled("Key Scripture", `**${s.keyScripture.ref}.** ${s.keyScripture.why || ""}`);
    if (s.scriptureStudy?.length) {
      k.ensure(70);
      k.eyebrow("The passage, worked through", { after: 4 });
      for (const v of s.scriptureStudy) k.p(`**${v.ref}.** ${v.note}`);
    }
    if (s.discussion?.length) {
      k.ensure(80);
      k.h3("Discussion", { after: 6 });
      s.discussion.forEach((d, i) => {
        k.ensure(60);
        k.p(`**${i + 1}. ${d.q}**`, { after: 3 });
        if (d.behind) k.p(`Behind it: ${d.behind}`, { italic: true, color: C.muted, size: k.bodySize - 0.75, x: k.left + 14, after: 9 });
      });
    }
    if (s.quietRoomQuestion) {
      k.panel(({ x, width }) => {
        k.eyebrow("If the room goes quiet", { x, width, after: 4 });
        k.p(s.quietRoomQuestion, { x, width, after: 0 });
      }, { accent: true });
    }
    if (s.objections?.length) {
      k.ensure(80);
      k.h3("Anticipated objections", { after: 6 });
      for (const o of s.objections) {
        k.ensure(60);
        k.p(`**“${o.objection}”**`, { after: 3 });
        k.p(o.response);
      }
    }
    if (s.caseStudy) {
      k.ensure(80);
      k.h3("A scenario for the room", { after: 6 });
      k.paras(s.caseStudy);
    }
    if (s.goingDeeper) {
      k.ensure(80);
      k.h3("Going deeper", { after: 6 });
      k.paras(s.goingDeeper);
    }
    if (s.memoryVerse) k.quote(s.memoryVerse.text, s.memoryVerse.ref);
    if (s.closingPrayer) k.labelled("Closing prayer", s.closingPrayer, { italic: true });
  }

  if (g.faq?.length) {
    k.newPage();
    k.titled("Reference", "Hard questions", { bookmark: true, bookmarkLevel: 1 });
    for (const f of g.faq) {
      k.ensure(60);
      k.p(`**${f.q}**`, { after: 3 });
      k.p(f.a);
    }
  }

  if (g.cadences?.length) {
    k.newPage();
    k.titled("Reference", "Three ways to run it", { bookmark: true, bookmarkLevel: 1 });
    for (const c of g.cadences) {
      k.ensure(70);
      k.eyebrow(c.name, { after: 4 });
      k.list(c.plan || []);
    }
  }
  if (g.bibliography?.length) {
    k.ensure(120);
    k.titled("Reference", "Bibliography", { bookmark: true, bookmarkLevel: 1 });
    for (const b of g.bibliography) {
      k.p(`*${b.title}*, ${b.author}. ${b.note || ""}`, { size: k.bodySize - 0.5 });
    }
  }
  k.space(6);
  k.linkLine(`The full study online: livewellbyjamesbell.co/studyguides/${g.slug}`, `/studyguides/${g.slug}`);
}

function participantBody(k, g) {
  k.setRunningHead(`${g.title} · Participant Handout`);
  g.sessions.forEach((s, idx) => {
    if (idx > 0) k.newPage();
    k.titled(`Session ${s.n}`, s.title, { bookmark: true, bookmarkTitle: `Session ${s.n}: ${s.title}`, bookmarkLevel: 1 });
    k.paras(s.summary);
    if (s.keyScripture) k.labelled("Key Scripture", s.keyScripture.ref);
    if (s.memoryVerse) k.quote(s.memoryVerse.text, s.memoryVerse.ref);
    if (s.reflection?.length) {
      k.ensure(90);
      k.h3("Reflect", { after: 6 });
      s.reflection.forEach((r, i) => {
        k.ensure(90);
        k.p(`**${i + 1}.** ${r}`, { after: 0 });
        k.lines(3);
        k.space(4);
      });
    }
    if (s.practice) {
      k.panel(({ x, width }) => {
        k.eyebrow("This week, try this", { x, width, after: 4 });
        k.p(s.practice, { x, width, after: 0 });
      }, { accent: true });
    }

    if (s.devotional?.length) {
      k.newPage();
      k.titled(`Session ${s.n} · the week between`, "Five days in the text");
      for (const d of s.devotional) {
        k.ensure(130);
        k.eyebrow(`Day ${d.day} · ${d.passage}`, { after: 3 });
        k.h3(d.title, { after: 5, keep: false });
        k.paras(d.body);
        if (d.prayer) k.p(d.prayer, { italic: true, color: C.muted });
        k.space(6);
      }
    }
  });
  k.space(18);
  k.titled("Keep going", "The full study online", { keep: 110 });
  k.p("Every session, the essays behind it, and the leader's notes live on the site, free.");
  k.linkLine(`livewellbyjamesbell.co/studyguides/${g.slug}`, `/studyguides/${g.slug}`);
}

const meta = (g, what) => ({
  title: `${g.title}: ${what}`,
  subject: `${what} for ${g.title}${g.subtitle ? ": " + g.subtitle : ""}. A small-group study from LiveWell by James Bell.`,
  keywords: ["study guide", "small group", g.title, what],
  runningHead: g.title,
});

export function studyGuideLeader(g) {
  return {
    ...meta(g, "Leader's Guide"),
    render(k) {
      k.cover({ kicker: `Leader's Guide · ${g.sessionsLabel}`, title: g.title, subtitle: g.subtitle || `${g.audience}.` });
      leaderBody(k, g);
    },
  };
}

export function studyGuideParticipant(g) {
  return {
    ...meta(g, "Participant Handout"),
    render(k) {
      k.cover({ kicker: `Participant Handout · ${g.sessionsLabel}`, title: g.title, subtitle: g.subtitle || `${g.audience}.` });
      participantBody(k, g);
    },
  };
}

/** Leader guide + participant handout in one file, for whoever runs the group. */
export function studyGuidePacket(g) {
  return {
    ...meta(g, "Group Leader Packet"),
    render(k) {
      k.cover({
        kicker: `Group Leader Packet · ${g.sessionsLabel}`,
        title: g.title,
        subtitle: g.subtitle || `${g.audience}.`,
        note: "Part one is the leader's guide. Part two is the participant handout, ready to copy for the room.",
      });
      k.bookmark("Part one: Leader's Guide", 0);
      leaderBody(k, g);
      k.newPage();
      k.hideChrome();
      k.y = k.page.height * 0.38;
      k.eyebrow("Part two", { after: 8 });
      k.bookmark("Part two: Participant Handout", 0);
      k.h1("Participant Handout", { keep: false });
      k.rule({ length: 44 });
      k.p("Copy these pages for each person in the group, one session at a time or all at once.", { color: C.muted });
      k.newPage();
      participantBody(k, g);
    },
  };
}
