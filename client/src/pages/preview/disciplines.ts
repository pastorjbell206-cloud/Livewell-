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

