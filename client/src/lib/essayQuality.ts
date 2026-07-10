/**
 * Essay quality gate. The corpus audit (docs/audit-corpus/) found ~150 essays
 * that are catalog stubs — a title and a live URL over a 20–60 word abstract
 * with no essay behind them. A reader who follows a shared link into one of
 * those is the exact reader the platform is built to keep, and loses. This is
 * the one place that decides whether a post is a real essay or a stub, so the
 * listings, the "keep reading" rails, and the sitemap all agree.
 *
 * The guard is conservative: it only hides a post when we can SEE that its body
 * is too short. Slim list endpoints omit the body; in that case there is nothing
 * to measure, so the post is shown (a real essay must never be hidden because
 * the payload didn't include its text).
 */

/** Minimum body length, in characters, for a post to count as a full essay. */
export const MIN_ESSAY_CHARS = 600;

interface PostLike {
  body?: string | null;
}

/**
 * True unless the post carries a body we can measure and it falls under the
 * threshold. A post with no `body` field present is treated as a full essay
 * (we can't judge what we can't see).
 */
export function isFullEssay(post: PostLike): boolean {
  const body = post?.body;
  if (typeof body !== "string") return true;
  return body.trim().length >= MIN_ESSAY_CHARS;
}
