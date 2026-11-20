/**
 * /study/explorer/watch/:slug: one moving picture of the Bible Explorer's
 * "Watch and learn" (client/public/explorer/films/<slug>.json, drawn by
 * films/scenes/<slug>.tsx and played by films/FilmPlayer.tsx).
 *
 * In order: the film's name and its one line at the reader's level; the
 * reading level switch (the Explorer's one switch, kept on this device); the
 * player; "Think about it"; where churches differ, where the film touches
 * that; a calm line toward a trusted adult and Find Help where the film
 * touches death or fear; "Where the Bible says it" (Study Bible chapters); and
 * the way on: back to the stop it belongs to, the next moving picture, and
 * the whole list.
 */
import { useCallback, useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  LifeBuoy,
  MessageCircle,
  Scale,
} from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import { LoadFailed } from "@/components/LoadFailed";
import { RefText } from "@/components/VerseRef";
import {
  EXPLORER_PATH,
  fetchExplorerIndex,
  fetchFilm,
  filmHref,
  stopHref,
  useExplorerProgress,
  SAVE_FAILED,
  type ExplorerIndex,
  type Film,
} from "@/lib/explorer";
import { Roundel } from "./art";
import { LevelSwitch } from "./parts";
import FilmPlayer from "./films/FilmPlayer";
import { FilmMark, WATCH_ID } from "./Watch";
import "./explorer.css";
import "./films/film.css";

/**
 * Each finished film's search title and description, written out so the
 * page's head is plain text (scripts/prerender-heads.mjs writes the same
 * from the film's file; explorer.test.tsx holds the two together).
 */
export const FILM_META: Record<string, { title: string; description: string }> =
  {
    "bible-two-minutes": {
      title: "The whole Bible in two minutes: Bible Explorer",
      description:
        "The whole story of the Bible, from creation to the new creation, drawn as one road in nine pictures.",
    },
    "holy-spirit": {
      title: "The Holy Spirit through the Bible: Bible Explorer",
      description:
        "The Holy Spirit from the first page of the Bible to the last, in eight moving pictures: the waters, the judges and kings, the promise, the Jordan, Pentecost, God's temple, and the last invitation.",
    },
    "who-made-god": {
      title: "Who made God?: Bible Explorer",
      description:
        "A child's honest question, taken seriously in six moving pictures: why anything is here at all, and why the Bible says God has no beginning.",
    },
  };

type Loaded = { film: Film; index: ExplorerIndex };

function useFilm(slug: string) {
  const [res, setRes] = useState<{ key: string; data: Loaded | null } | null>(
    null
  );
  const [nonce, setNonce] = useState(0);
  const key = `${slug}:${nonce}`;
  useEffect(() => {
    let live = true;
    Promise.all([fetchFilm(slug), fetchExplorerIndex()])
      .then(([film, index]) => live && setRes({ key, data: { film, index } }))
      .catch(() => live && setRes({ key, data: null }));
    return () => {
      live = false;
    };
  }, [slug, key]);
  const data = res?.key === key ? res.data : undefined;
  return { data, retry: useCallback(() => setNonce(n => n + 1), []) };
}

export default function ExplorerFilm() {
  const [, params] = useRoute("/study/explorer/watch/:slug");
  const slug = params?.slug ?? "";
  const { data, retry } = useFilm(slug);
  const explorer = useExplorerProgress();

  return (
    <Layout>
      {data === null ? (
        <div style={{ padding: "var(--s-6) var(--gutter)" }}>
          <SEOMeta
            title="Bible Explorer"
            description="The whole Bible as one story, on one map, for ages 7 to 16."
            url={`https://www.livewellbyjamesbell.co${EXPLORER_PATH}`}
            noindex
          />
          <LoadFailed
            what="This moving picture"
            onRetry={retry}
            backHref={`${EXPLORER_PATH}#${WATCH_ID}`}
            backLabel="Back to Watch and learn"
          />
        </div>
      ) : data === undefined ? (
        <div
          className="ex-sec"
          data-lw-loading
          aria-busy="true"
          style={{ minHeight: "80vh" }}
        >
          <p className="ex-note" style={{ textAlign: "center" }}>
            Opening the moving picture…
          </p>
        </div>
      ) : (
        <FilmPage key={data.film.slug} {...data} explorer={explorer} />
      )}
    </Layout>
  );
}

function FilmPage({
  film,
  index,
  explorer,
}: Loaded & { explorer: ReturnType<typeof useExplorerProgress> }) {
  const { progress, saveFailed, setLevel } = explorer;
  const level = progress.level;
  const meta = FILM_META[film.slug];
  const url = `https://www.livewellbyjamesbell.co${filmHref(film.slug)}`;
  const films = (index.films ?? []).filter(f => f.status === "finished");
  const at = films.findIndex(f => f.slug === film.slug);
  const next = at >= 0 ? films[at + 1] : undefined;
  const stops = film.stops
    .map(s => index.stops.find(x => x.slug === s))
    .filter(s => s && s.status === "finished");

  return (
    <>
      <SEOMeta
        title={meta?.title ?? `${film.title}: Bible Explorer`}
        description={meta?.description ?? film.line.older}
        url={url}
      />
      <PageHead
        door="Bible Explorer"
        doorHref={EXPLORER_PATH}
        title={film.title}
        line={film.line[level]}
        art={
          film.mark === "road" ? (
            <FilmMark mark="road" />
          ) : (
            <Roundel slug={film.mark} className="ex-headmark" />
          )
        }
      >
        <p className="ex-note" style={{ marginTop: 0 }}>
          Watch and learn. A moving picture in {film.frames.length} parts, with
          no sound: every word is under the picture.
        </p>
      </PageHead>

      <section className="ex-sec ex-sec--tight" aria-label="Reading level">
        <div className="ex-wrap">
          <div style={{ maxWidth: "26rem" }}>
            <LevelSwitch
              level={level}
              onLevel={setLevel}
              saveFailed={saveFailed}
            />
            {saveFailed && <p className="ex-alert">{SAVE_FAILED}</p>}
          </div>
        </div>
      </section>

      <section className="ex-sec ex-sec--warm" aria-label="The moving picture">
        <div className="ex-wrap">
          <FilmPlayer
            scene={film.slug}
            title={film.title}
            poster={film.poster}
            intro={film.line}
            frames={film.frames}
            level={level}
            end={film.end}
          />
        </div>
      </section>

      <section className="ex-sec" aria-labelledby="fp-think-title">
        <div className="ex-wrap ex-cols">
          <div>
            <h2 className="ex-h2" id="fp-think-title">
              Think about it
            </h2>
            <p className="ex-talk">
              <MessageCircle
                size={18}
                strokeWidth={1.75}
                aria-hidden="true"
                style={{ verticalAlign: "-3px", marginRight: 8 }}
              />
              <RefText text={film.think[level]} />
            </p>
            {film.differ && (
              <div className="ex-care">
                <Scale size={18} strokeWidth={1.75} aria-hidden="true" />
                <span>
                  <strong>Where churches differ.</strong> {film.differ.text}{" "}
                  {film.differ.links.map((l, n) => (
                    <span key={l.href}>
                      {n > 0 && " and "}
                      <Link href={l.href} className="ex-link">
                        {l.label}
                      </Link>
                    </span>
                  ))}
                  .
                </span>
              </div>
            )}
            {film.care && (
              <p className="ex-care">
                <LifeBuoy size={18} strokeWidth={1.75} aria-hidden="true" />
                <span>
                  {film.care.replace(
                    / or look at Find Help\.$/,
                    " or look at "
                  )}
                  {/ or look at Find Help\.$/.test(film.care) ? (
                    <>
                      <Link href="/help" className="ex-link">
                        Find Help
                      </Link>
                      .
                    </>
                  ) : null}
                </span>
              </p>
            )}
          </div>
          <div>
            <h2 className="ex-panel__title">Where the Bible says it</h2>
            <ul className="ex-chapters">
              {film.read.map(r => (
                <li key={r.href}>
                  <Link href={r.href}>
                    <BookOpen size={16} strokeWidth={1.75} aria-hidden="true" />
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
            {film.deeper && film.deeper.length > 0 && (
              <>
                <h2
                  className="ex-panel__title"
                  style={{ marginTop: "var(--s-3)" }}
                >
                  {level === "older"
                    ? "Go deeper on LiveWell"
                    : "Read more with a parent or leader"}
                </h2>
                <ul className="ex-deeper">
                  {film.deeper.map(d => (
                    <li key={d.href}>
                      <Link href={d.href}>{d.label}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      <nav className="ex-sec ex-sec--warm" aria-label="More to watch">
        <div className="ex-wrap ex-nav">
          {stops[0] ? (
            <Link href={stopHref(stops[0].slug)} className="btn btn--quiet">
              <ArrowLeft
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
                style={{ marginRight: 8 }}
              />
              Stop {stops[0].n}: {stops[0].title}
            </Link>
          ) : (
            <Link href={EXPLORER_PATH} className="btn btn--quiet">
              <ArrowLeft
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
                style={{ marginRight: 8 }}
              />
              The whole map
            </Link>
          )}
          {next ? (
            <Link href={filmHref(next.slug)} className="btn">
              Next to watch: {next.title}
              <ArrowRight
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
                style={{ marginLeft: 8 }}
              />
            </Link>
          ) : (
            <Link href={`${EXPLORER_PATH}#${WATCH_ID}`} className="btn">
              Everything in Watch and learn
              <ArrowRight
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
                style={{ marginLeft: 8 }}
              />
            </Link>
          )}
        </div>
        {next && (
          <div className="ex-wrap" style={{ marginTop: "var(--s-2)" }}>
            <Link
              href={`${EXPLORER_PATH}#${WATCH_ID}`}
              className="ex-link"
              style={{ fontFamily: "var(--U)", fontSize: 15 }}
            >
              Everything in Watch and learn
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
