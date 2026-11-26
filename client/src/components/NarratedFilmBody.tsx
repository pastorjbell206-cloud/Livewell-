/**
 * The film block NarratedFilm shows: a poster with a play button, then the
 * video, then "Read the words".
 *
 * Nothing of the video is asked for until play is pressed: before that there
 * is no <video> element at all, only the poster image. Every spoken line is
 * listed under the film, with its verse reference, so nobody needs sound.
 */
import { useId, useState } from "react";
import { Play } from "lucide-react";
import data from "@/data/narrated-films.json";

type Line = { text: string; ref?: string; shown?: boolean };
type FilmData = {
  slug: string;
  title: string;
  page: string;
  video: string;
  poster: string;
  seconds: number;
  translation: string;
  lines: Line[];
};
const FILMS = (data as { films: FilmData[] }).films;

/** "1 minute 25 seconds", said plainly. */
export function lengthLabel(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const mins = m ? `${m} minute${m === 1 ? "" : "s"}` : "";
  const secs = s ? `${s} second${s === 1 ? "" : "s"}` : "";
  return [mins, secs].filter(Boolean).join(" ");
}

export default function NarratedFilmBody({
  slug,
  band,
}: {
  slug: string;
  band: "bone" | "warm";
}) {
  const film = FILMS.find((f) => f.slug === slug);
  const [playing, setPlaying] = useState(false);
  const titleId = useId();
  if (!film) return null;

  return (
    <section
      aria-labelledby={titleId}
      data-narrated-film={film.slug}
      style={{
        background: band === "warm" ? "var(--bone-warm)" : "var(--bone)",
        padding: "var(--s-5) var(--gutter)",
      }}
    >
      <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
        <div className="eyebrow" style={{ marginBottom: "10px" }}>
          A short film
        </div>
        <h2
          id={titleId}
          style={{
            fontFamily: "var(--F)",
            fontSize: "var(--fs-h2)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: "var(--ink)",
            margin: "0 0 6px",
          }}
        >
          {film.title}
        </h2>
        <p
          style={{
            fontFamily: "var(--U)",
            fontSize: "14px",
            lineHeight: 1.6,
            color: "var(--ink-muted)",
            margin: "0 0 var(--s-2)",
          }}
        >
          {lengthLabel(film.seconds)}. Read aloud by a computer-made voice, not
          a person. Every word is under the film.
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
              poster={film.poster}
              aria-label={film.title}
              style={{ display: "block", width: "100%", height: "100%" }}
            >
              <source src={film.video} type="video/mp4" />
              <a href={film.video}>Download the film</a>
            </video>
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play the film: ${film.title} (${lengthLabel(film.seconds)})`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                padding: 0,
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              <img
                src={film.poster}
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
                Play the film
              </span>
            </button>
          )}
        </div>

        <details style={{ marginTop: "var(--s-2)" }}>
          <summary
            style={{
              fontFamily: "var(--U)",
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--ink)",
              cursor: "pointer",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Read the words
          </summary>
          <ol
            style={{
              margin: "var(--s-1) 0 0",
              paddingLeft: "1.4em",
              maxWidth: "68ch",
              fontFamily: "var(--font-reading)",
              fontSize: "var(--fs-lede)",
              lineHeight: 1.65,
              color: "var(--ink)",
            }}
          >
            {film.lines.map((line, i) => (
              <li key={i} style={{ marginBottom: "0.5em" }}>
                {line.shown ? "On screen: " : ""}
                {line.ref ? `“${line.text.replace(/^“|”$/g, "")}”` : line.text}
                {line.ref && (
                  <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>
                    {" "}
                    ({line.ref}, {film.translation})
                  </span>
                )}
              </li>
            ))}
          </ol>
        </details>
      </div>
    </section>
  );
}
