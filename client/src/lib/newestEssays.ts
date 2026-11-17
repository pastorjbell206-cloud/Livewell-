/**
 * The newest essays on the shelf, known without a network call.
 *
 * Read from the committed index of essay files (essayOverrides.generated.ts,
 * built from client/public/essays), newest first by each file's `updated`
 * date. Only essays the shelf makes public are returned. Used where a page
 * says "the newest essay" before any API answers: /connect and the home page.
 */
import { ESSAY_OVERRIDES } from "./essayOverrides.generated";
import { isPublicEssay } from "./shelf";

export interface NewestEssay {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date. */
  updated: string;
}

export function newestEssays(limit = 3): NewestEssay[] {
  return ESSAY_OVERRIDES.filter((e) => isPublicEssay(e.slug))
    .slice()
    .sort((a, b) => b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title))
    .slice(0, limit);
}
