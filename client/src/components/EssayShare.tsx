/**
 * EssayShare: the two plain share actions at the end of an essay.
 *
 * "Share on Facebook" is Facebook's own sharer address in a new tab: a link,
 * with no script from Facebook loaded on this site. "Copy link" goes through
 * lib/clipboard and says "Copied" only when the copy happened.
 */
import { useEffect, useRef, useState } from "react";
import { Facebook, Link2 } from "lucide-react";
import { shareTrigger } from "@/components/AudienceShare";
import { copyToClipboard } from "@/lib/clipboard";

/** Facebook's sharer address for a page. */
export function facebookShareUrl(url: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

export function EssayShare({ url }: { url: string }) {
  const [copy, setCopy] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const onCopy = async () => {
    const ok = await copyToClipboard(url);
    setCopy(ok ? "copied" : "failed");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopy("idle"), 2400);
  };

  return (
    <>
      <a
        href={facebookShareUrl(url)}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...shareTrigger, color: "var(--ink)" }}
      >
        <Facebook size={16} aria-hidden />
        Share on Facebook
      </a>
      <button type="button" onClick={onCopy} style={shareTrigger}>
        <Link2 size={16} aria-hidden />
        <span aria-live="polite">
          {copy === "copied" ? "Copied" : copy === "failed" ? "Couldn't copy" : "Copy link"}
        </span>
      </button>
    </>
  );
}

export default EssayShare;
