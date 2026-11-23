/**
 * The History and Questions doors (unit hq): the history door's ages on one
 * line, a lesson's illustrated top, the people of church history, the
 * answers index, an Honest Answer's own page (and old /answers#<slug> links
 * opening it), and /skeptics. Rendered from the committed data files.
 */
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { screen, fireEvent, within, waitFor } from "@testing-library/react";
import { Route, Switch } from "wouter";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { ANSWERS, type AnswerSteps } from "@/data/answers";
import { QUESTION_GROUPS, ROWS_HELD_ELSEWHERE } from "@/data/questionGroups";
import { AGE_ID_BY_NAME, ageOfPerson, peopleOfAge } from "@/lib/historyAges";
import { answerCandidates, ask, toAnswerPage, type AskCandidate } from "@/lib/askQuestion";
import { rowTarget } from "@/lib/topics";
import { ASK_MORE } from "@/components/questions/AskBox";
import { entryHref, type Era, type Figure } from "@/lib/historyCourse";
import { entryById } from "@/lib/siteCatalog";
import TheologyHistory from "./TheologyHistory";
import HistoryEssay from "./history/HistoryEssay";
import HistoryPeople from "./history/HistoryPeople";
import Answers from "./Answers";
import AnswerPage from "./AnswerPage";
import Skeptics from "./Skeptics";

const PUBLIC = path.resolve(__dirname, "../../public");
const read = (name: string) => fs.readFileSync(path.join(PUBLIC, name), "utf8");
const ERAS: Era[] = JSON.parse(read("theology/church-history-timeline.json")).eras;
const FIGURES: Figure[] = JSON.parse(read("theology/church-history-figures.json")).figures;
const ROWS: { href: string }[] = JSON.parse(read("topics/index.json")).rows;

beforeEach(() => {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const name = String(input).replace(/^\//, "").split("?")[0];
      if (name.endsWith(".json") && fs.existsSync(path.join(PUBLIC, name))) {
        return new Response(read(name), { status: 200, headers: { "Content-Type": "application/json" } });
      }
      return base(input, init);
    }),
  );
});
afterEach(() => {
  vi.unstubAllGlobals();
  window.history.pushState({}, "", "/");
});

function renderAt(url: string) {
  window.history.pushState({}, "", url);
  return renderWithProviders(
    <Switch>
      <Route path="/theology/history/people" component={HistoryPeople} />
      <Route path="/theology/history/:slug" component={HistoryEssay} />
      <Route path="/theology/history" component={TheologyHistory} />
      <Route path="/answers/:slug" component={AnswerPage} />
      <Route path="/answers" component={Answers} />
      <Route path="/skeptics" component={Skeptics} />
    </Switch>,
  );
}

describe("the question groups", () => {
  it("hold every Honest Answer exactly once, and every row of the topics index", () => {
    const listed = QUESTION_GROUPS.flatMap((g) => g.answers);
    expect([...listed].sort()).toEqual(ANSWERS.map((a) => a.slug).sort());
    const rows = new Set(QUESTION_GROUPS.flatMap((g) => g.rows));
    for (const r of ROWS) if (!ROWS_HELD_ELSEWHERE.has(r.href)) expect(rows.has(r.href), r.href).toBe(true);
  });

  it("opens an old answer anchor on the answer's own page", () => {
    expect(toAnswerPage("/answers#is-jesus-the-only-way")).toBe("/answers/is-jesus-the-only-way");
    expect(toAnswerPage("/answers#not-an-answer")).toBe("/answers#not-an-answer");
  });

  it("matches questions as a stranger would type them", () => {
    const top = (q: string) => ask(answerCandidates(), q)[0]?.href;
    expect(top("is there a god")).toBe("/answers/does-god-actually-exist");
    expect(top("why does god let people suffer")).toBe("/answers/if-god-is-good-why-suffering");
    expect(top("can I trust the bible")).toBe("/answers/why-would-anyone-trust-the-bible");
    expect(top("is hell eternal")).toBe("/answers/is-hell-forever-or-does-it-end");
    expect(ask(answerCandidates(), "zzqx flurb")).toEqual([]);
  });

  // The ten plain questions of the site review (docs/work/elite/REVIEW.md),
  // over everything the ask box on /topics matches: the answers, the topics
  // index rows (as Topics.tsx builds them) and the two pages it adds.
  it("puts the right page first for ten plain questions", () => {
    const index = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../public/topics/index.json"), "utf8"));
    const rows: AskCandidate[] = index.rows
      .filter((r: { href: string }) => !ROWS_HELD_ELSEWHERE.has(r.href))
      .map((r: Parameters<typeof rowTarget>[0]) => ({ r, href: toAnswerPage(rowTarget(r)) }))
      .filter(({ href }: { href: string }) => !href.startsWith("/answers"))
      .map(({ r, href }: { r: { askedAs: string; line: string }; href: string }) => ({ question: r.askedAs, href, keywords: "", body: r.line }));
    const all = [...answerCandidates(), ...rows, ...ASK_MORE];
    const first = (q: string, crisis = false) => ask(all, q, crisis)[0]?.href;
    expect(first("Why does God allow suffering?")).toBe("/answers/if-god-is-good-why-suffering");
    expect(first("Did the resurrection happen?")).toBe("/answers/did-the-resurrection-actually-happen");
    expect(first("Does God exist?")).toBe("/answers/does-god-actually-exist");
    expect(first("Is the Bible true?")).toBe("/answers/why-would-anyone-trust-the-bible");
    expect(first("Is Jesus the only way?")).toBe("/answers/is-jesus-the-only-way");
    expect(first("Is hell real?")).toBe("/answers/is-hell-forever-or-does-it-end");
    expect(first("Why are there so many denominations?")).toBe("/theology/traditions");
    expect(first("Can I trust the church?")).toBe("/help/church-hurt");
    expect(first("How do I pray?")).toBe("/help/prayer");
    expect(first("Why do Christians disagree about baptism?")).toBe("/theology/compare");
    // When the words call for help, the Find Help page of the same name keeps its place.
    expect(first("Why does God allow suffering?", true)).toBe("/help/suffering");
  });
});

describe("the ages", () => {
  it("names each age by the essays index's own names", () => {
    expect(Object.fromEntries(ERAS.map((e) => [e.name, e.id]))).toEqual(AGE_ID_BY_NAME);
  });
  it("files each person under an age, and finds the living in each", () => {
    for (const f of FIGURES) expect(ageOfPerson(ERAS, f, 2026), f.name).not.toBeNull();
    expect(peopleOfAge(ERAS[0], FIGURES, 2026).map((f) => f.name)).toContain("Ignatius of Antioch");
  });
  it("sends a person's name to the people page", () => {
    expect(entryHref("person", "Augustine of Hippo")).toBe("/theology/history/people#person-augustine-of-hippo");
    expect(entryHref("council", "Council of Chalcedon")).toBe("/theology/history#council-council-of-chalcedon");
  });
});

describe("/theology/history", () => {
  it("leads with the course, then the ages on one line: three ages moved through by touch and keys", async () => {
    renderAt("/theology/history");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Church history");
    const ages = await screen.findByRole("list", { name: "The seven ages of the church" });
    const buttons = within(ages).getAllByRole("button");
    expect(buttons).toHaveLength(ERAS.length);
    expect(buttons[0].getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("link", { name: "Start at lesson 1" }).getAttribute("href")).toBe("/theology/history/the-apostolic-age");
    // Touch the Councils age: its lessons, its councils, its people.
    fireEvent.click(buttons[2]);
    expect(screen.getByRole("heading", { level: 3, name: "The Age of the Councils" })).toBeTruthy();
    const panel = document.querySelector(".hl-panel") as HTMLElement;
    expect(within(panel).getByRole("link", { name: /Lesson 6/ }).getAttribute("href")).toBe("/theology/history/the-great-councils");
    expect(screen.getByRole("button", { name: /First Council of Nicaea/ })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Augustine of Hippo" }).getAttribute("href")).toBe("/theology/history/people#person-augustine-of-hippo");
    // Arrow keys move on; Later and End too.
    fireEvent.keyDown(buttons[2], { key: "ArrowRight" });
    expect(buttons[3].getAttribute("aria-pressed")).toBe("true");
    fireEvent.keyDown(buttons[3], { key: "End" });
    expect(buttons[ERAS.length - 1].getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: /Earlier/ }));
    expect(buttons[ERAS.length - 2].getAttribute("aria-pressed")).toBe("true");
  });

  it("keeps every old tab reachable: the councils and heresies open in place, the stepper under the line", async () => {
    renderAt("/theology/history#council-council-of-chalcedon");
    expect(await screen.findByRole("heading", { level: 3, name: "Council of Chalcedon" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /The heresies/ }));
    expect(screen.getByRole("heading", { level: 3, name: "Arianism" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Step through year by year/ }));
    expect(await screen.findByRole("group", { name: "The timeline, year by year" })).toBeTruthy();
  });
});

describe("a lesson", () => {
  it("shows its age's roundel and its place in the course", async () => {
    renderAt("/theology/history/the-great-councils");
    expect(await screen.findByRole("heading", { level: 1, name: /Councils/ })).toBeTruthy();
    await waitFor(() => expect(screen.getByText(/Lesson 6 of 14/)).toBeTruthy());
    const nav = screen.getByRole("navigation", { name: "Your place in the course" });
    expect(within(nav).getByRole("link", { name: /Previous/ })).toBeTruthy();
    expect(within(nav).getByRole("link", { name: /Next/ })).toBeTruthy();
    expect(document.querySelector(".hx-lesson-head .lw-roundel")).not.toBeNull();
  });
});

describe("/theology/history/people", () => {
  it("lists every person A to Z and by age, and lands on one opened", async () => {
    renderAt("/theology/history/people#person-augustine-of-hippo");
    const list = await screen.findByRole("list", { name: "People, A to Z" });
    // The people arrive after the list mounts, so wait for them.
    await waitFor(() =>
      expect(within(list).getAllByRole("heading", { level: 3 })).toHaveLength(FIGURES.length),
    );
    const card = document.getElementById("person-augustine-of-hippo")!;
    await waitFor(() => expect(within(card).getByText(/Why they matter/)).toBeTruthy());
    fireEvent.click(screen.getByRole("button", { name: "By age" }));
    expect(screen.getByRole("heading", { level: 3, name: /The Reformation/ })).toBeTruthy();
    expect(document.querySelectorAll(".hp-card")).toHaveLength(FIGURES.length);
  });
});

describe("/answers and /answers/:slug", () => {
  it("is an index of links, one per question, with a find box", () => {
    renderAt("/answers");
    for (const a of ANSWERS) expect(screen.getByRole("link", { name: a.question }).getAttribute("href")).toBe(`/answers/${a.slug}`);
    fireEvent.change(screen.getByRole("searchbox", { name: "Find a question" }), { target: { value: "hell" } });
    expect(within(screen.getByRole("list", { name: "Matching questions" })).getByRole("link", { name: /Is hell forever/ })).toBeTruthy();
  });

  it("opens an old /answers#<slug> link on the answer's own page", async () => {
    renderAt("/answers#is-jesus-the-only-way");
    await waitFor(() => expect(window.location.pathname).toBe("/answers/is-jesus-the-only-way"));
  });

  it("gives each answer a page: the question as H1, the answer word for word, the companions, previous and next", () => {
    const a = ANSWERS.find((x) => x.slug === "can-you-lose-your-salvation")!;
    renderAt(`/answers/${a.slug}`);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(a.question);
    for (const p of a.paragraphs) expect(screen.getByText(p)).toBeTruthy();
    const more = screen.getByRole("list", { name: "Go further" });
    expect(within(more).getByRole("link", { name: /Compare the views/ }).getAttribute("href")).toBe("/theology/compare?doctrine=soteriology");
    expect(within(more).getByRole("link", { name: /Which View Am I/ })).toBeTruthy();
    const turn = screen.getByRole("navigation", { name: "Previous and next question" });
    const i = ANSWERS.indexOf(a);
    expect(within(turn).getByRole("link", { name: new RegExp(ANSWERS[i - 1].question.slice(0, 20)) }).getAttribute("href")).toBe(`/answers/${ANSWERS[i - 1].slug}`);
    expect(screen.getByRole("link", { name: /All the questions/ }).getAttribute("href")).toBe("/answers");
  });

  it("lays out an argued answer: its parts, the numbered steps and the sources; a plain answer has none of them", () => {
    const a = ANSWERS.find((x) => x.slug === "does-god-actually-exist")!;
    renderAt(`/answers/${a.slug}`);
    for (const s of a.sections!) expect(screen.getByRole("heading", { level: 2, name: s.heading })).toBeTruthy();
    const contents = within(screen.getByRole("navigation", { name: "In this answer" })).getAllByRole("link");
    expect(contents.map((l) => l.getAttribute("href"))).toEqual([...a.sections!.map((_, k) => `#part-${k + 1}`), "#sources"]);
    const steps = a.sections!.flatMap((s) => s.body).filter((b): b is AnswerSteps => typeof b !== "string");
    expect(steps.length).toBe(3);
    for (const st of steps) for (const p of st.premises) expect(screen.getByText(p).tagName).toBe("LI");
    expect(screen.getByRole("heading", { level: 2, name: "Sources and further reading" })).toBeTruthy();
    expect(screen.getByText("The Miracle of Theism").tagName).toBe("CITE");
  });

  it("keeps the argued form to the answers rebuilt so far, each with checked sources", () => {
    const argued = ANSWERS.filter((a) => a.sections);
    expect(argued.map((a) => a.slug).sort()).toEqual([
      "are-miracles-believable",
      "can-life-mean-anything-without-god",
      "can-you-be-good-without-god",
      "christianity-and-islam-differences",
      "did-god-command-genocide",
      "did-the-resurrection-actually-happen",
      "do-i-have-to-choose-between-faith-and-science",
      "does-god-actually-exist",
      "how-can-god-be-three-and-one",
      "how-should-a-christian-read-genesis-1",
      "if-god-is-good-why-suffering",
      "is-faith-irrational",
      "is-faith-just-wishful-thinking",
      "is-hell-forever-or-does-it-end",
      "is-jesus-the-only-way",
      "was-jesus-just-a-good-teacher",
      "what-about-those-who-never-heard",
      "what-did-the-new-atheists-get-right",
      "what-if-christianity-is-wrong",
      "what-makes-us-human-in-the-age-of-ai",
      "why-didnt-the-bible-just-ban-slavery",
      "why-does-god-allow-natural-disasters",
      "why-would-anyone-trust-the-bible",
    ]);
    for (const a of argued) {
      expect(a.paragraphs.length).toBeGreaterThan(0);
      expect(a.sources!.length).toBeGreaterThanOrEqual(5);
      for (const s of a.sources!) expect(s.year).toMatch(/\d{4}/);
    }
    renderAt("/answers/can-you-lose-your-salvation");
    expect(screen.queryByRole("heading", { name: "Sources and further reading" })).toBeNull();
  });

  it("says plainly when an answer is not there", () => {
    renderAt("/answers/not-a-question");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("That answer is not here.");
  });
});

describe("/skeptics", () => {
  it("is made of what exists: Test the Case, the first questions, the eight-week plan", () => {
    renderAt("/skeptics");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("For skeptics");
    expect(screen.getByRole("link", { name: /Did the resurrection happen\?/ }).getAttribute("href")).toBe("/tools/test-the-case?case=resurrection");
    expect(screen.getByRole("link", { name: "Does God actually exist?" }).getAttribute("href")).toBe("/answers/does-god-actually-exist");
    expect(screen.getByRole("link", { name: /Eight Weeks for the Curious Skeptic/ }).getAttribute("href")).toBe("/plans/skeptic");
  });

  it("reaches the case for the faith, under the name and line every menu gives it", () => {
    renderAt("/skeptics");
    const room = entryById("questions.case")!;
    const further = screen.getByRole("region", { name: "Take longer." });
    const tile = within(further).getByRole("link", { name: new RegExp(`^${room.name}`) });
    expect(tile.getAttribute("href")).toBe("/questions");
    expect(tile.textContent).toContain(room.line);
  });
});
