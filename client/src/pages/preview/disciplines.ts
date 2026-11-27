/**
 * The eight disciplines of James's platform brief (2026-11-26), each made of
 * pages the site already has: `doors` are ids in the site catalogue
 * (lib/siteCatalog.ts). Read by the homepage preview and by each discipline's
 * preview page.
 */
import type { PlateName } from "@/components/art/Plate";

/** Six essays to read for each discipline, chosen from the public shelf (lib/shelf.json); one that is not public is skipped. */
export const DISCIPLINE_ESSAYS: Record<string, string[]> = {
  bible: ["the-bible-assumes-you-will-be-wrong", "how-the-bible-gets-translated-by", "what-the-original-audience-heard", "who-decided-what-books-are-in-the-bible", "is-the-bible-reliable-enough-to-build-a-life-on", "why-didnt-the-bible-ban-slavery"],
  theology: ["did-god-choose-who-would-be-saved", "can-a-christian-lose-their-salvation", "babies-or-believers-why-christians-baptize-differently", "what-is-the-lords-supper", "do-the-gifts-of-the-spirit-still-happen", "is-hell-real-and-is-it-forever"],
  history: ["the-early-church-under-rome", "the-council-of-nicaea-what-was-decided-in-325", "christianity-was-never-western", "women-in-church-history", "the-children-rome-threw-away", "why-are-there-so-many-denominations"],
  apologetics: ["did-jesus-really-rise-from-the-dead", "the-historical-jesus", "does-science-disprove-god", "did-christianity-copy-pagan-myths", "can-you-be-good-without-god", "is-jesus-the-only-way"],
  culture: ["every-generation-was-sure-it-was", "what-christian-nationalism-is-and-is-not", "why-jesus-wont-fit-in-either-party", "what-post-christian-means", "the-rise-of-the-nones", "what-the-church-got-wrong-about-race"],
  questions: ["why-does-god-allow-suffering", "why-does-god-let-children-suffer", "is-hell-real-and-is-it-fair", "why-does-god-feel-far-away", "do-people-who-die-by-suicide-go-to-heaven", "is-it-wrong-to-be-angry-at-god"],
  living: ["is-anxiety-a-sign-of-weak-faith", "if-i-forgive-them-do-i-have-to-trust-them-again", "is-it-wrong-to-live-together-before-marriage", "does-god-have-a-plan-for-my-life", "is-money-the-root-of-all-evil", "should-christians-drink-alcohol"],
  church: ["do-i-have-to-go-to-church-to-be-a-christian", "should-women-preach", "what-a-christian-owes-the-city", "should-the-church-stay-out-of-politics", "doubt-after-church-abuse", "are-catholics-and-protestants-both-christians"],
};

/** The picture on each essay's card: an emblem from the Bible Explorer's films (pages/explorer/art.tsx). */
export const ESSAY_EMBLEM: Record<string, string> = {
  "the-bible-assumes-you-will-be-wrong": "the-bible",
  "how-the-bible-gets-translated-by": "sixty-six-books",
  "what-the-original-audience-heard": "land",
  "who-decided-what-books-are-in-the-bible": "bible-in-a-minute",
  "is-the-bible-reliable-enough-to-build-a-life-on": "is-the-bible-true",
  "why-didnt-the-bible-ban-slavery": "exile",
  "did-god-choose-who-would-be-saved": "grace",
  "can-a-christian-lose-their-salvation": "how-salvation-works",
  "babies-or-believers-why-christians-baptize-differently": "baptism-and-supper",
  "what-is-the-lords-supper": "table",
  "do-the-gifts-of-the-spirit-still-happen": "spirit-in-a-believer",
  "is-hell-real-and-is-it-forever": "life-to-come",
  "the-early-church-under-rome": "church",
  "the-council-of-nicaea-what-was-decided-in-325": "who-god-is",
  "christianity-was-never-western": "all-nations",
  "women-in-church-history": "the-church",
  "the-children-rome-threw-away": "rescue",
  "why-are-there-so-many-denominations": "so-many-churches",
  "did-jesus-really-rise-from-the-dead": "the-resurrection",
  "the-historical-jesus": "jesus",
  "does-science-disprove-god": "science-and-the-bible",
  "did-christianity-copy-pagan-myths": "light-and-darkness",
  "can-you-be-good-without-god": "does-god-exist",
  "is-jesus-the-only-way": "never-heard",
  "every-generation-was-sure-it-was": "fall",
  "what-christian-nationalism-is-and-is-not": "the-king",
  "why-jesus-wont-fit-in-either-party": "kingdom-of-god",
  "what-post-christian-means": "exile-and-home",
  "the-rise-of-the-nones": "god-silent",
  "what-the-church-got-wrong-about-race": "all-nations",
  "why-does-god-allow-suffering": "why-bad-things-happen",
  "why-does-god-let-children-suffer": "the-lamb",
  "is-hell-real-and-is-it-fair": "life-to-come",
  "why-does-god-feel-far-away": "why-cant-i-see-god",
  "do-people-who-die-by-suicide-go-to-heaven": "when-we-die",
  "is-it-wrong-to-be-angry-at-god": "god-silent",
  "is-anxiety-a-sign-of-weak-faith": "psalm-23",
  "if-i-forgive-them-do-i-have-to-trust-them-again": "love-when-i-do-wrong",
  "is-it-wrong-to-live-together-before-marriage": "covenant",
  "does-god-have-a-plan-for-my-life": "romans-8-28",
  "is-money-the-root-of-all-evil": "seed",
  "should-christians-drink-alcohol": "table",
  "do-i-have-to-go-to-church-to-be-a-christian": "the-church",
  "should-women-preach": "spirit-in-a-believer",
  "what-a-christian-owes-the-city": "exile",
  "should-the-church-stay-out-of-politics": "the-king",
  "doubt-after-church-abuse": "rescue",
  "are-catholics-and-protestants-both-christians": "so-many-churches",
};

/** The picture on each room's card: a plate of the art kit (components/art/plates.tsx). */
export const ROOM_PLATE: Record<string, PlateName> = {
  "bible.read": "book",
  "bible.films": "lantern",
  "bible.background": "jars",
  "bible.how-to-study": "lens",
  "questions.believe": "lectern",
  "questions.differ": "compass",
  "questions.glossary": "quill",
  "history.creeds": "letter",
  "history.course": "quill",
  "history.people": "tree",
  "history.traditions": "arch",
  "history.timeline": "sundial",
  "questions.case": "lens",
  "questions.skeptics": "lantern",
  "questions.claims": "compass",
  "history.reading": "books",
  "questions.nation": "arch",
  "history.injustice": "tomb",
  "questions.answers": "lantern",
  "questions.more": "letter",
  "questions.life": "house",
  "questions.wisdom": "tree",
  "questions.how-tos": "compass",
  "tools.groups": "table",
  "tools.booklets": "books",
  "tools.plans": "sundial",
};

/**
 * The thing to touch on each discipline's page, one of the live homepage's
 * pieces, and the film group its reel opens on (client/public/explorer/index.json).
 */
export const DISCIPLINE_PIECE: Record<string, { piece: "shelf" | "history" | "ask" | "paths"; paths?: string; films: string }> = {
  bible: { piece: "shelf", films: "books" },
  theology: { piece: "ask", films: "beliefs" },
  history: { piece: "history", films: "ideas" },
  apologetics: { piece: "ask", films: "questions" },
  culture: { piece: "history", films: "questions" },
  questions: { piece: "ask", films: "questions" },
  living: { piece: "paths", paths: "new-to-this", films: "verses" },
  church: { piece: "paths", paths: "deeper", films: "beliefs" },
};

export const DISCIPLINES: { id: string; name: string; line: string; plate: PlateName; doors: string[] }[] = [
  { id: "bible", name: "Bible", line: "Every book with notes beside the text, the films, the atlas, and the world the Bible was written in.", plate: "book", doors: ["bible.read", "bible.films", "bible.background", "bible.how-to-study"] },
  { id: "theology", name: "Theology", line: "What Christians confess, where faithful churches differ, and the words the church has used for both.", plate: "lectern", doors: ["questions.believe", "questions.differ", "questions.glossary", "history.creeds"] },
  { id: "history", name: "Church history", line: "Two thousand years told in order, with the people, the councils and the quarrels that shaped them.", plate: "basilica", doors: ["history.course", "history.people", "history.traditions", "history.timeline"] },
  { id: "apologetics", name: "Apologetics", line: "The case for the faith, weighed fairly, with the objections stated at full strength first.", plate: "lens", doors: ["questions.case", "questions.skeptics", "questions.claims"] },
  { id: "culture", name: "Christianity and culture", line: "How every age and place has read the Bible, and what the nation asks of the church.", plate: "arch", doors: ["history.reading", "questions.nation", "history.injustice"] },
  { id: "questions", name: "Difficult questions", line: "Suffering, hell, doubt and the silence of God, answered honestly and without hurry.", plate: "lantern", doors: ["questions.answers", "questions.more"] },
  { id: "living", name: "Christian living", line: "Marriage, work, money, grief and prayer, by subject and in practice.", plate: "house", doors: ["questions.life", "questions.wisdom", "questions.how-tos"] },
  { id: "church", name: "Church and leadership", line: "Group studies with leader guides, and booklets on elders, government and change.", plate: "table", doors: ["tools.groups", "tools.booklets", "tools.plans"] },
];

