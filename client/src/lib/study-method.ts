/**
 * The seven steps of "Study this chapter": one source for the guided study
 * on every chapter (pages/study-bible/ChapterWalk.tsx), the page that teaches
 * the method (/study/how-to-study), and that page's prerendered text
 * (scripts/prerender-heads.mjs bundles this file, so it imports nothing).
 *
 * The words say what a reader does at each step and why, in plain words.
 * They make no claim about what any passage means: every step shows only what
 * the chapter's own files hold (docs/work/elite/desk.md).
 */

export type StudyStepId = "read" | "notice" | "setting" | "words" | "scripture" | "hard" | "respond";

export interface StudyStep {
  id: StudyStepId;
  /** The step's name, as the walk and the page both show it. */
  title: string;
  /** The lucide-react icon the step is drawn with (mapped in each component). */
  icon: "BookOpen" | "Eye" | "Compass" | "Languages" | "Link2" | "CircleHelp" | "Footprints";
  /** One or two plain sentences: what to do, and why. */
  what: string;
}

export const STUDY_STEPS: StudyStep[] = [
  {
    id: "read",
    title: "Read it",
    icon: "BookOpen",
    what: "Read the whole chapter once before anything else. Go slowly, and let it say what it says before you ask what it means.",
  },
  {
    id: "notice",
    title: "Notice",
    icon: "Eye",
    what: "Ask the questions a careful reader asks of any page: who is speaking, to whom, what comes back again, and what surprises you. Write down what you see.",
  },
  {
    id: "setting",
    title: "Its setting",
    icon: "Compass",
    what: "Learn who wrote the book, when, and why, from the book's introduction. A chapter is easier to follow when you know the world it was written in.",
  },
  {
    id: "words",
    title: "Its key words",
    icon: "Languages",
    what: "Look closely at the few words the notes mark as important. See the Hebrew or Greek word behind the English, what it means, and where else it is used.",
  },
  {
    id: "scripture",
    title: "Where else Scripture says this",
    icon: "Link2",
    what: "Read the other verses that each verse points to. They open right where you are, so you never lose your place.",
  },
  {
    id: "hard",
    title: "The hard question",
    icon: "CircleHelp",
    what: "Face the question a thoughtful reader might ask of this chapter. Think it through yourself first. An answer waits one tap away.",
  },
  {
    id: "respond",
    title: "What it asks of you",
    icon: "Footprints",
    what: "Answer the study questions and write down what you want to carry with you. Then take one next step.",
  },
];

/** The four questions of step 2, asked of any passage. */
export const NOTICE_QUESTIONS = [
  "Who is speaking?",
  "Who is listening, or who is it written to?",
  "What words or ideas come back more than once?",
  "What surprises you, or seems strange?",
];

/** The one line that says where a reader's own words are kept. */
export const KEPT_HERE = "What you write is kept on this device only. There is no account, and nothing is sent anywhere.";

/** The address that opens the guided study on a chapter. */
export const walkHref = (slug: string, chapter: number) => `/study/bible/${slug}/${chapter}?study=walk`;
