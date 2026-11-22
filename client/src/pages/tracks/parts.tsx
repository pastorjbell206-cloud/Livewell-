/**
 * The parts the three track pages share: the loader, the progress bar, the
 * "Continue where you left off" line, and this device's progress as state.
 */
import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";
import { RotateCcw } from "lucide-react";

import { readTracks, saveTracks, type TrackProgress, type TrackToContinue, type TracksProgress } from "@/lib/tracks";

/**
 * Load one thing for one key. `data` is undefined while loading and null when
 * it failed; `retry` asks again (components/LoadFailed).
 */
export function useLoad<T>(key: string | null, load: () => Promise<T>): { data: T | null | undefined; retry: () => void } {
  const [state, setState] = useState<{ key: string; data: T | null } | null>(null);
  const [nonce, setNonce] = useState(0);
  useEffect(() => {
    if (key === null) return;
    let stale = false;
    load()
      .then((d) => {
        if (!stale) setState({ key, data: d });
      })
      .catch(() => {
        if (!stale) setState({ key, data: null });
      });
    return () => {
      stale = true;
    };
    // `load` is recreated every render; the key names what it loads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, nonce]);
  return {
    data: key !== null && state?.key === key ? state.data : undefined,
    retry: () => {
      setState(null);
      setNonce((n) => n + 1);
    },
  };
}

/** This device's progress, and a `keep` that saves it and says whether the browser took it. */
export function useTracksProgress(): { progress: TracksProgress; keep: (next: TracksProgress) => void; kept: boolean } {
  const [progress, setProgress] = useState<TracksProgress>(() => readTracks());
  const [kept, setKept] = useState(true);
  const keep = useCallback((next: TracksProgress) => {
    setProgress(next);
    setKept(saveTracks(next));
  }, []);
  return { progress, keep, kept };
}

/** One segment a session: done, the one to do now, or still ahead. */
export function ProgressBar({ total, entry, now }: { total: number; entry?: TrackProgress; now?: number | null }) {
  const done = entry?.done.filter((n) => n >= 1 && n <= total).length ?? 0;
  return (
    <div className="tk-progress">
      <p className="tk-progress__words">{done === 0 ? `${total} sessions` : done >= total ? `All ${total} sessions done` : `${done} of ${total} sessions done`}</p>
      <ol className="tk-bar" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <li key={i} data-state={entry?.done.includes(i + 1) ? "done" : now === i + 1 ? "now" : "ahead"} />
        ))}
      </ol>
    </div>
  );
}

/** "Continue where you left off", as one ruled line. */
export function ContinueLine({ next }: { next: TrackToContinue }) {
  return (
    <p className="tk-resume" data-testid="track-continue">
      <RotateCcw aria-hidden="true" size={20} strokeWidth={1.75} />
      <span>
        Continue where you left off:{" "}
        <Link href={next.href}>
          {next.title}, session {next.n} of {next.total}
        </Link>
      </span>
    </p>
  );
}
