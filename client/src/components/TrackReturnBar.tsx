/**
 * TrackReturnBar: the way back to a track's session, shown on the page the
 * session sent the reader to ("Back to session 3 of 12"). The session notes
 * where the reader came from as they leave (lib/tracks setReturn, kept for
 * the sitting in sessionStorage); this draws that note as a small bar fixed
 * in a corner of whatever page they are on, so that page's own content is
 * never moved or changed. It goes when the reader comes back to the tracks,
 * or hides it.
 *
 * Its own chunk: App.tsx asks for it only when a way back is set.
 */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, X } from "lucide-react";

import { RETURN_EVENT, clearReturn, offersReturn, readReturn, returnLabel, type TrackReturn } from "@/lib/trackReturn";
import "./track-return.css";

export default function TrackReturnBar() {
  const [location] = useLocation();
  const [back, setBack] = useState<TrackReturn | null>(() => readReturn());
  const was = useRef(location);

  useEffect(() => {
    const on = () => setBack(readReturn());
    window.addEventListener(RETURN_EVENT, on);
    return () => window.removeEventListener(RETURN_EVENT, on);
  }, []);

  // Arriving back on the tracks' own pages from somewhere else: the reader has returned.
  useEffect(() => {
    if (offersReturn(was.current) && !offersReturn(location)) clearReturn();
    was.current = location;
  }, [location]);

  if (!back || !offersReturn(location)) return null;
  return (
    <nav className="tr-back no-print" aria-label="Your track" data-testid="track-return">
      <Link href={`/tracks/${back.slug}/${back.n}`} className="tr-back__link">
        <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.75} />
        {returnLabel(back)}
      </Link>
      <button type="button" className="tr-back__hide" aria-label="Hide the way back to your session" onClick={clearReturn}>
        <X aria-hidden="true" size={18} strokeWidth={1.75} />
      </button>
    </nav>
  );
}
