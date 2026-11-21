/**
 * The apologetics library (client/public/questions/): its manifest and its
 * pieces, the shapes scripts/build-questions-index.mjs writes and
 * scripts/validate-questions.mjs gates.
 *
 * Pending and live (scripts/lib/questions.mjs): a piece is live when it and
 * its area are; the room is live when any area is. A live page lists only
 * live things. A pending page (open by its address, for review on the
 * preview) lists the pending things beside it too, says noindex, and carries
 * the review line.
 */
import { fetchJson } from "@/lib/fetch-json";

export type QStatus = "pending" | "live";

export interface QIndexPiece {
  slug: string;
  question: string;
  blurb?: string;
  status: QStatus;
  live: boolean;
}

export interface QIndexArea {
  slug: string;
  n: number;
  title: string;
  /** One line saying what the area holds, shown in the room. */
  line?: string;
  planned: number;
  status: QStatus;
  live: boolean;
  hasPage: boolean;
  pieces: QIndexPiece[];
}

export interface QClaim {
  claim: string;
  proponent: string;
  work: string;
  year: number;
  area: string;
  slug: string;
  question: string;
  live: boolean;
}

export interface QIndex {
  roomLive: boolean;
  areas: QIndexArea[];
  claims: QClaim[];
  answers: Record<string, string>;
}

export interface QArea {
  slug: string;
  title: string;
  intro: string;
  pieces: { slug: string; question: string; blurb: string }[];
  words: { term: string; meaning: string }[];
  elsewhere: string[];
}

export type QSection =
  | { role: "objection" | "concessions" | "evidence" | "reply" | "unresolved" | "differ"; heading: string; body: string }
  | { role: "argument"; heading: string; intro: string; steps: string[]; conclusion: string; after: string; weightStep: number };

export interface QPiece {
  area: string;
  slug: string;
  status: QStatus;
  question: string;
  objectionSource: { author: string; title: string; year: number };
  shortAnswer: string;
  sections: QSection[];
  otherSide: string[];
  further: string[];
  onSite: string[];
  links: { studyNotes?: { book: string; chapter: number }[]; answers?: string[]; explorer?: string };
}

export const QUESTIONS_ROOM = "/questions";
export const QUESTIONS_CLAIMS = "/questions/claims";
export const areaHref = (area: string) => `/questions/${area}`;
export const pieceHref = (area: string, slug: string) => `/questions/${area}/${slug}`;

/** The line a pending page shows under its title. */
export const REVIEW_LINE = "This page is being reviewed and is not yet published.";

const isIndex = (x: unknown): x is QIndex => !!x && typeof x === "object" && Array.isArray((x as QIndex).areas) && Array.isArray((x as QIndex).claims);
const isArea = (x: unknown): x is QArea => !!x && typeof x === "object" && typeof (x as QArea).intro === "string" && Array.isArray((x as QArea).pieces);
const isPiece = (x: unknown): x is QPiece => !!x && typeof x === "object" && typeof (x as QPiece).shortAnswer === "string" && Array.isArray((x as QPiece).sections);

export const fetchQuestionsIndex = () => fetchJson("/questions/index.json", isIndex);
export const fetchQuestionsArea = (area: string) => fetchJson(`/questions/${area}/_area.json`, isArea);
export const fetchQuestionPiece = (area: string, slug: string) => fetchJson(`/questions/${area}/${slug}.json`, isPiece);

/** The pieces a page may list: live ones always; pending ones only on a pending page. */
export const visiblePieces = (area: QIndexArea, pagePending: boolean) => area.pieces.filter((p) => p.live || pagePending);

/**
 * A site path written in the prose as "(/answers/...)" becomes a link whose
 * text is the same path, so the wording on the page does not change.
 */
export const linkPaths = (md: string) => md.replace(/(?<!\])\((\/[a-z0-9][^)\s]*)\)/g, "([$1]($1))");

/** A plain id for a heading, for the in-page contents list. */
export const sectionId = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
