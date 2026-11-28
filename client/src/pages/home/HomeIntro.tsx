/**
 * The one-minute welcome film, the first thing on the front page, right under
 * the menu (James, 2026-11-27: "the first thing they will see is the menu ...
 * and then the video ... make it like the main thing"). It sits at the top of
 * the hero, so scripts/prerender-heads.mjs paints the same poster, button and
 * note into the static "/" (homeHeroHtml) and React's mount moves nothing.
 *
 * Before the tap the frame is a title card drawn in type, not a picture: the
 * hero carries no image (lib/static-hero.ts: an image would hold the front
 * page's largest paint until it downloaded). The film itself opens on the same
 * cream with "Welcome to LiveWell" fading in, so the tap moves from card to
 * film without a flash; the <video> has no poster for the same reason.
 *
 * The <video> waits under the card with preload="none", so the page loads
 * nothing heavy until someone asks. The tap on the card starts it inside the
 * tap itself (James: "I want the video to be okay, there's no glitch"): a phone
 * browser only lets a film play with sound from inside the tap, so a film that
 * mounted after the tap needed a second one on an iPhone. Every spoken line is
 * under the film, so nobody needs sound. The film and its words are
 * client/src/data/site-intro.json, made from film/livewell-intro/.
 */
import { useRef, useState } from "react";
import intro from "@/data/site-intro.json";
import { lengthLabel } from "@/components/NarratedFilmBody";

/** The note under the film; the static hero writes the same words. */
export function introNote(seconds: number): string {
  return `Welcome to LiveWell, in ${lengthLabel(seconds)}. Read aloud by a computer-made voice, not a person.`;
}

export default function HomeIntro() {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const label = lengthLabel(intro.seconds);

  const play = () => {
    const v = video.current;
    setStarted(true);
    if (!v) return;
    v.controls = true;
    try {
      // Called inside the tap, so phones allow sound. If a browser still refuses,
      // the film's own controls are showing and one press starts it.
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } catch {
      /* the controls are showing */
    }
  };

  return (
    <div className="home-film" data-home-intro>
      <div className="home-film__frame">
        <video ref={video} className="home-film__video" preload="none" playsInline controls={started} aria-label={intro.title}>
          <source src={intro.video} type="video/mp4" />
          <a href={intro.video}>Download the film</a>
        </video>
        {!started && (
          <button type="button" className="home-film__play" onClick={play} aria-label={`Play the film: ${intro.title} (${label})`}>
            <span className="home-film__card" aria-hidden="true">
              <span className="home-film__kicker">Start here</span>
              <span className="home-film__title">{intro.title}</span>
              <span className="home-film__sub">The whole site in one minute</span>
              <span className="home-film__pill">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14z" />
                </svg>
                Play the welcome
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="home-film__under">
        <p className="home-film__note">{introNote(intro.seconds)}</p>
        <details className="home-film__words">
          <summary>Read the words</summary>
          <ol>
            {intro.lines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ol>
        </details>
      </div>
    </div>
  );
}
