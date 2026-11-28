/**
 * The homepage's one-minute welcome film (James, 2026-11-27: "I want it to be on
 * the front page"). It works like NarratedFilmBody: a poster with a play button,
 * no <video> element until play is pressed, and every spoken line under the film
 * so nobody needs sound. The film and its words are client/src/data/site-intro.json,
 * made from film/livewell-intro/ (uploaded with publish-narrated-films.mjs --upload-only).
 */
import { useId, useState } from "react";
import { Play } from "lucide-react";
import intro from "@/data/site-intro.json";
import { lengthLabel } from "@/components/NarratedFilmBody";

export default function HomeIntro() {
  const [playing, setPlaying] = useState(false);
  const titleId = useId();
  const label = lengthLabel(intro.seconds);

  return (
    <section className="home-sec home-sec--warm" aria-labelledby={titleId} data-home-intro>
      <div className="home-wrap" style={{ maxWidth: "var(--w-content)" }}>
        <div className="eyebrow" style={{ marginBottom: "10px" }}>
          Welcome
        </div>
        <h2
          id={titleId}
          style={{ fontFamily: "var(--F)", fontSize: "var(--fs-h2)", fontWeight: 400, lineHeight: 1.15, color: "var(--ink)", margin: "0 0 6px" }}
        >
          LiveWell in a minute
        </h2>
        <p style={{ fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "0 0 var(--s-2)" }}>
          {label}. Read aloud by a computer-made voice, not a person. Every word is under the film.
        </p>

        <div
          style={{
            position: "relative",
            aspectRatio: "16 / 9",
            background: "var(--bone-muted)",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
          }}
        >
          {playing ? (
            <video
              controls
              autoPlay
              playsInline
              poster={intro.poster}
              aria-label={intro.title}
              style={{ display: "block", width: "100%", height: "100%" }}
            >
              <source src={intro.video} type="video/mp4" />
              <a href={intro.video}>Download the film</a>
            </video>
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play the film: ${intro.title} (${label})`}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", padding: 0, border: "none", background: "none", cursor: "pointer" }}
            >
              <img
                src={intro.poster}
                alt=""
                width={1920}
                height={1080}
                loading="lazy"
                decoding="async"
                style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 22px",
                  minHeight: "48px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--charcoal)",
                  color: "var(--charcoal-fg)",
                  fontFamily: "var(--U)",
                  fontSize: "15px",
                  fontWeight: 600,
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <Play size={18} fill="currentColor" />
                Play the welcome
              </span>
            </button>
          )}
        </div>

        <details style={{ marginTop: "var(--s-2)" }}>
          <summary style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", cursor: "pointer", minHeight: "44px", display: "flex", alignItems: "center" }}>
            Read the words
          </summary>
          <ol style={{ margin: "var(--s-1) 0 0", paddingLeft: "1.4em", maxWidth: "68ch", fontFamily: "var(--font-reading)", fontSize: "var(--fs-lede)", lineHeight: 1.65, color: "var(--ink)" }}>
            {intro.lines.map((line, i) => (
              <li key={i} style={{ marginBottom: "0.5em" }}>
                {line}
              </li>
            ))}
          </ol>
        </details>
      </div>
    </section>
  );
}
