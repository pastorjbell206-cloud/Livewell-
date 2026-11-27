/**
 * The picture beside each room in the menu's panels (James, 2026-11-27: "I
 * want you to have those pictures drop down for all of those"): a plate of
 * the art kit (components/art/plates.tsx) for every room of the catalogue's
 * doors, and for each essay section. A room not listed shows its door's plate.
 */
import type { PlateName } from "../art/Plate";

export const ROOM_PICTURE: Record<string, PlateName> = {
  "bible.films": "lantern",
  "bible.read": "book",
  "bible.how-to-study": "lens",
  "bible.search": "compass",
  "bible.background": "jars",
  "bible.plans": "sundial",
  "history.course": "quill",
  "history.timeline": "sundial",
  "history.people": "tree",
  "history.creeds": "letter",
  "history.traditions": "arch",
  "history.reading": "books",
  "questions.answers": "lantern",
  "questions.skeptics": "lens",
  "questions.case": "compass",
  "questions.believe": "lectern",
  "questions.differ": "arch",
  "questions.life": "house",
  "family.tonight": "table",
  "family.devotions": "house",
  "family.catechism": "quill",
  "family.plans": "sundial",
  "tools.study": "lens",
  "tools.checks": "compass",
  "tools.practise": "lantern",
  "tools.plans": "sundial",
  "tools.groups": "table",
  "tools.downloads": "books",
  "about.books": "books",
  "about.speaking": "lectern",
  "about.connect": "letter",
  "about.contact": "quill",
  "about.subscribe": "jar",
  "about.support": "tree",
};

/** The essay shelf's sections (lib/shelf.json), by slug. */
export const SECTION_PICTURE: Record<string, PlateName> = {
  "the-mirror": "lens",
  "faith-and-power": "arch",
  "after-christendom": "tree",
  "american-church": "basilica",
  "ancient-church": "jars",
  "bible-in-its-world": "book",
  doubt: "lantern",
  "ordinary-faithfulness": "house",
};
