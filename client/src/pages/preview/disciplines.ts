/**
 * The eight disciplines of James's platform brief (2026-11-26), each made of
 * pages the site already has: `doors` are ids in the site catalogue
 * (lib/siteCatalog.ts). Read by the homepage preview and by each discipline's
 * preview page.
 */
import type { PlateName } from "@/components/art/Plate";

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

