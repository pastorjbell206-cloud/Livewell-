/**
 * Shared parts of the apologetics library's pages (lib/questions): loading a
 * file with its error state, the review line on a pending page, and the
 * library's Markdown (the site's one renderer, with Scripture references set
 * as verse sheets and site paths as links, the wording untouched).
 */
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { Eye } from "lucide-react";
import type { Components } from "react-markdown";
import { Markdown } from "@/components/Markdown";
import { REVIEW_LINE, linkPaths } from "@/lib/questions";

/** One file, fetched once per key and retried by nonce; failed is distinct from loading. */
export function useQFile<T>(key: string | null, load: () => Promise<T>) {
  const [nonce, setNonce] = useState(0);
  const [state, setState] = useState<{ key: string; nonce: number; data: T | null; failed: boolean } | null>(null);
  useEffect(() => {
    if (!key) return;
    let live = true;
    load()
      .then((data) => { if (live) setState({ key, nonce, data, failed: false }); })
      .catch(() => { if (live) setState({ key, nonce, data: null, failed: true }); });
    return () => { live = false; };
    // `load` is a fresh closure each render; the key names what it loads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, nonce]);
  const here = state && state.key === key && state.nonce === nonce ? state : null;
  return { data: here?.data ?? null, failed: !!here?.failed, loading: !!key && !here, retry: () => setNonce((n) => n + 1) };
}

/** The quiet line a page not yet published carries under its head. */
export function ReviewLine() {
  return (
    <p className="qx-review" role="note">
      <Eye aria-hidden="true" size={16} strokeWidth={1.75} />
      {REVIEW_LINE}
    </p>
  );
}

const components: Components = {
  a: ({ href, children }) =>
    href && href.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href}>{children}</a>,
};

/** The library's prose. `inline` drops the paragraph wrapper (for list items). */
export function QMd({ children, inline }: { children: string; inline?: boolean }) {
  const comps: Components = inline ? { ...components, p: ({ children: c }) => <>{c}</> } : components;
  return (
    <Markdown verseRefs="sheet" components={comps}>
      {linkPaths(children)}
    </Markdown>
  );
}

/** Holds the prerendered text on screen until this page's content is in (lib/prerender-hold). */
export function Waiting({ when }: { when: boolean }): ReactNode {
  return when ? <span hidden data-lw-loading /> : null;
}
