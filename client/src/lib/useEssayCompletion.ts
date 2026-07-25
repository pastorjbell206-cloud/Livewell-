import { useEffect, useRef } from "react";
import { trackEssayComplete, trackPathStep } from "@/lib/telemetry";
import { recordReadEvent } from "@/components/ReadDepthBeacon";
import { markEssayRead } from "@/lib/readProgress";

/**
 * useEssayCompletion — the platform's shared "true read" measurement for any
 * long-form template. Attach the returned ref to a zero-chrome sentinel <div>
 * at the foot of the essay body; when it scrolls into view the hook fires a
 * completion exactly ONCE per mount:
 *
 *   - essay_read_complete (the north-star depth signal)
 *   - path_step_complete, when the reader arrived via a pathway (?path=<slug>)
 *   - the read-events log (recordReadEvent) and the device's "pick up here"
 *     memory (markEssayRead) that the reading paths consult.
 *
 * Firing on a foot sentinel — not on mount — measures a real read, not a click.
 * `enabled` gates arming until the content has loaded (so the sentinel exists in
 * the DOM); the effect re-arms on navigation. This is the same behavior the
 * /writing essays use, factored out so every template measures identically.
 *
 * @param slug    identifies the piece (the essay/topic slug)
 * @param path    the piece's URL path, for the read-events log (e.g. /nation/x)
 * @param enabled arm only once the content is present
 */
export function useEssayCompletion(
  slug: string | undefined,
  path: string,
  enabled: boolean
) {
  const bodyEndRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);
  useEffect(() => {
    doneRef.current = false;
    const sentinel = bodyEndRef.current;
    if (!enabled || !slug || !sentinel || typeof IntersectionObserver === "undefined") {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !doneRef.current) {
          doneRef.current = true;
          trackEssayComplete(slug);
          const pathSlug = new URLSearchParams(window.location.search).get("path");
          if (pathSlug) trackPathStep(pathSlug, slug);
          recordReadEvent(path);
          markEssayRead(slug);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [slug, path, enabled]);
  return bodyEndRef;
}
