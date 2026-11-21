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
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Download,
  LifeBuoy,
  Link2,
  MessageCircle,
  Scale,
} from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import { LoadFailed } from "@/components/LoadFailed";
import { RefText } from "@/components/VerseRef";
import { copyToClipboard } from "@/lib/clipboard";
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
  type Level,
} from "@/lib/explorer";
import { Roundel } from "./art";
import { LevelSwitch } from "./parts";
import FilmPlayer from "./films/FilmPlayer";
import { WATCH_ID } from "./Watch";
import type { ExportShape } from "./films/FilmExport";
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
    "god-with-his-people": {
      title: "God with his people: Bible Explorer",
      description:
        "One light followed through the whole Bible in nine moving pictures: the garden, the tent, the temple, Jesus, the Spirit in God's people, and the city where God lives with them for ever.",
    },
    "who-god-is": {
      title: "Who God is: Father, Son and Holy Spirit: Bible Explorer",
      description:
        "One God in three persons, in eight moving pictures: what the Bible shows of the Father, the Son and the Holy Spirit, why the usual pictures break, and why Christians keep the Bible's words.",
    },
    "why-jesus-died": {
      title: "Why did Jesus die?: Bible Explorer",
      description:
        "What happened at the cross, and the Bible's own pictures of what it did, in eight moving pictures: the Passover lamb, a ransom, in our place, victory, love shown, and enemies made friends.",
    },
    "how-salvation-works": {
      title: "How salvation works: Bible Explorer",
      description:
        "The good news of Jesus in nine moving pictures: made for God, turned away, unable to mend it, and brought back by God's own act in Christ, a gift received by faith.",
    },
    "bible-in-a-minute": {
      title: "The Bible in a minute: Bible Explorer",
      description:
        "One book, one story: the whole Bible from creation to the new creation, short enough to share, in eight pictures along one road.",
    },
    "gospel-in-a-minute": {
      title: "The gospel in a minute: Bible Explorer",
      description:
        "The gospel in seven pictures, short enough to share: made for God, broken from him, and brought back by God's own act in Christ, a gift received by faith.",
    },
    "does-god-exist": {
      title: "Does God exist?: Bible Explorer",
      description:
        "The argument from why anything exists at all, in six pictures: what it shows, what it does not, and where to weigh the case against.",
    },
    "sixty-six-books": {
      title: "How the 66 books fit together: Bible Explorer",
      description:
        "The Bible as a library of sixty-six books in seven moving pictures: two testaments, the kinds of writing on each shelf, and the one story that runs through them all.",
    },
    "the-church": {
      title: "What the church is: Bible Explorer",
      description:
        "What the church is, in seven moving pictures: a people, one body, living stones, a family, gathered and sent, and what churches share where they differ.",
    },
    "did-jesus-come-back-to-life": {
      title: "Did Jesus really come back to life?: Bible Explorer",
      description:
        "The historical case for the resurrection in seven pictures: the facts nearly every historian grants, the other explanations, and what history can and cannot show.",
    },
    "who-made-god": {
      title: "Who made God?: Bible Explorer",
      description:
        "A child's honest question, taken seriously in six moving pictures: why anything is here at all, and why the Bible says God has no beginning.",
    },
    "why-bad-things-happen": {
      title: "Why do bad things happen?: Bible Explorer",
      description:
        "An honest answer for children and teenagers, in eight moving pictures: what the Bible says about pain, what nobody can explain, the cross, and the promise that every tear will be wiped away.",
    },
    "is-the-bible-true": {
      title: "Is the Bible true?: Bible Explorer",
      description:
        "Can we trust a book copied by hand for centuries? Eight moving pictures on the copies, the Dead Sea Scrolls, what can be checked, and what that does and does not prove.",
    },
    "image-of-god": {
      title: "Creation and the image of God: Bible Explorer",
      description:
        "Creation out of nothing, a world called very good, and every person made in God's image, in seven moving pictures: what it means, why it is a gift, and what Christians leave open.",
    },
    "what-sin-is": {
      title: "What sin is: Bible Explorer",
      description:
        "What sin is at its root, the four things it breaks, why it touches everyone, and the God who comes looking, in six moving pictures for children and teenagers.",
    },
    "who-jesus-is": {
      title: "Who Jesus is: Bible Explorer",
      description:
        "Jesus, the Word with God from the beginning, born as a man, fully God and fully man in one person, in seven moving pictures, and the question he asked his friends.",
    },
    "spirit-in-a-believer": {
      title: "The Holy Spirit in a believer: Bible Explorer",
      description:
        "What Christians confess about the Holy Spirit living in a believer, in seven moving pictures: joined to Christ, children of God, fruit and gifts, help to pray, and where churches differ.",
    },
    prayer: {
      title: "Prayer: Bible Explorer",
      description:
        "What prayer is, in seven moving pictures for children and teenagers: talking with God as Father, the Lord's Prayer, thanks, asking, saying sorry, waiting, and the Spirit's help.",
    },
    "baptism-and-supper": {
      title: "Baptism and the Lord's Supper: Bible Explorer",
      description:
        "The two signs Jesus gave his church, in seven moving pictures: what every church shares in baptism and the Lord's Supper, and where faithful churches differ, without taking a side.",
    },
    "life-to-come": {
      title: "The life to come: Bible Explorer",
      description:
        "What Christians believe about death and what comes after, in seven gentle moving pictures: not the end, with Christ, the body raised, every wrong put right, and all things new.",
    },
    "so-many-churches": {
      title: "Why are there so many churches?: Bible Explorer",
      description:
        "How one church became many, in seven moving pictures of one tree: East and West, the Reformation, the many branches since, and the one root they still share.",
    },
    "the-bible": {
      title: "The Bible: how we got it: Bible Explorer",
      description:
        "How the Bible came to us, in seven moving pictures: many writers over many centuries, words spoken and written down, scrolls copied by hand, the first books, and translation.",
    },
    "the-king": {
      title: "The king: Bible Explorer",
      description:
        "The king through the whole Bible, in seven moving pictures: God's rule, the shepherd king, the promise to David, the empty throne, the son of David, the King on a cross, and the kingdom.",
    },
    "love-when-i-do-wrong": {
      title: "Does God still love me when I do wrong?: Bible Explorer",
      description:
        "An honest question for children and teenagers, answered with Jesus' story of the lost son in seven moving pictures: grace that runs ahead, and wrong that still matters.",
    },
    "the-resurrection": {
      title: "The resurrection: Bible Explorer",
      description:
        "What Christians believe happened on the third day, and what it means, in seven moving pictures: buried, raised in his body, never to die again, and the firstfruits of a harvest.",
    },
    covenant: {
      title: "Promises that build: the covenants: Bible Explorer",
      description:
        "The covenants through the whole Bible, in seven moving pictures: Noah's rainbow, Abraham's stars, Sinai, David's throne, the new covenant promised, the cup at the supper, and every promise kept in Christ.",
    },
    "the-lamb": {
      title: "Sacrifice and the Lamb: Bible Explorer",
      description:
        "Sacrifice through the whole Bible, in seven moving pictures: a covering in the garden, the ram in Isaac's place, the Passover, the Day of Atonement, the Lamb of God, and the Lamb on the throne.",
    },
    "exile-and-home": {
      title: "Exile and coming home: Bible Explorer",
      description:
        "Far from home and brought back, through the whole Bible in seven moving pictures: the garden, Egypt, Babylon, the return, Jesus, believers on the way, and the city whose gates are never shut.",
    },
    "kingdom-of-god": {
      title: "The kingdom of God: Bible Explorer",
      description:
        "The kingdom of God in seven moving pictures, from a tiny seed to a great tree: God's rule, the kingdom come near in Jesus, its signs, not of this world, and already and not yet.",
    },
    "why-cant-i-see-god": {
      title: "Why can't I see God?: Bible Explorer",
      description:
        "An honest question in seven moving pictures: why no one can see God with their eyes, and how he has made himself known in what he made, in his word, and most clearly in Jesus.",
    },
    "when-we-die": {
      title: "What happens when we die?: Bible Explorer",
      description:
        "A gentle answer in seven moving pictures: death is real and sad, not the end for those who belong to Jesus, and Christians can grieve with hope.",
    },
    "god-silent": {
      title: "Why does God seem silent sometimes?: Bible Explorer",
      description:
        "When prayer feels unanswered, in seven moving pictures: David's How long?, Elijah and the still, small voice, and Jesus' own cry from the cross.",
    },
    "science-and-the-bible": {
      title: "Are science and the Bible enemies?: Bible Explorer",
      description:
        "Faith and science in seven moving pictures: the old war story, two kinds of question, a God who is not in the gaps, and where Christians disagree.",
    },
  };

type Loaded = { film: Film; index: ExplorerIndex };

/** The video layout, opened only by scripts/export-film-video.mjs (?export=square|vertical|wide). */
const FilmExport = lazy(() => import("./films/FilmExport"));

/** What ?export= asks for, if anything. */
function exportAsk(): {
  shape: ExportShape;
  level: Level;
  cut: boolean;
} | null {
  try {
    const q = new URLSearchParams(window.location.search);
    const shape = q.get("export");
    if (shape !== "square" && shape !== "vertical" && shape !== "wide")
      return null;
    return {
      shape,
      level: q.get("level") === "older" ? "older" : "younger",
      cut: q.get("cut") === "share",
    };
  } catch {
    return null;
  }
}

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
  const [ask] = useState(exportAsk);

  if (ask && data)
    return (
      <Suspense fallback={null}>
        <FilmExport film={data.film} {...ask} />
      </Suspense>
    );

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
  const prev = at > 0 ? films[at - 1] : undefined;
  const stops = film.stops
    .map(s => index.stops.find(x => x.slug === s))
    .filter(s => s && s.status === "finished");

  return (
    <>
      <SEOMeta
        title={meta?.title ?? `${film.title}: Bible Explorer`}
        description={meta?.description ?? film.line.older}
        url={url}
        image={`https://www.livewellbyjamesbell.co/explorer/video/${film.slug}-poster.jpg`}
      />
      <PageHead
        door="Bible Explorer"
        doorHref={EXPLORER_PATH}
        title={film.title}
        line={film.line[level]}
        art={
          <Roundel
            slug={
              film.mark === "road" ? (film.stops[0] ?? "creation") : film.mark
            }
            className="ex-headmark"
          />
        }
      >
        <p className="ex-note" style={{ marginTop: 0 }}>
          Watch and learn. A moving picture in {film.frames.length} parts. Every
          word is under the picture, and Listen reads it aloud.
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
          <ShareFilm url={url} video={film.video} />
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
                  {film.differ.links.map((l, n, all) => (
                    <span key={l.href}>
                      {n > 0 && (n === all.length - 1 ? " and " : ", ")}
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
        {(next || prev) && (
          <div
            className="ex-wrap"
            style={{
              marginTop: "var(--s-2)",
              display: "flex",
              flexWrap: "wrap",
              gap: "4px 24px",
            }}
          >
            {prev && (
              <Link
                href={filmHref(prev.slug)}
                rel="prev"
                className="ex-link"
                style={{ fontFamily: "var(--U)", fontSize: 15 }}
              >
                Before this: {prev.title}
              </Link>
            )}
            {next && (
              <Link
                href={`${EXPLORER_PATH}#${WATCH_ID}`}
                className="ex-link"
                style={{ fontFamily: "var(--U)", fontSize: 15 }}
              >
                Everything in Watch and learn
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

/**
 * Share: copy the film's address (the one clipboard helper), and, where the
 * film's video file is kept on the site, download it to post elsewhere.
 */
function ShareFilm({ url, video }: { url: string; video: Film["video"] }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const files = (["square", "vertical"] as const)
    .map(k => (video?.[k] ? { shape: k, ...video[k]! } : null))
    .filter(Boolean) as { shape: string; href: string; mb: number }[];
  return (
    <div className="fp-share">
      <button
        type="button"
        className="btn btn--quiet"
        onClick={async () =>
          setState((await copyToClipboard(url)) ? "copied" : "failed")
        }
      >
        <Link2 size={18} strokeWidth={1.75} aria-hidden="true" />
        Share
      </button>
      {files.map(f => (
        <a key={f.shape} className="btn btn--quiet" href={f.href} download>
          <Download size={18} strokeWidth={1.75} aria-hidden="true" />
          Download the video
          <span className="fp-share__meta">
            {f.shape === "square" ? "square" : "tall, for a phone"}, MP4, {f.mb}{" "}
            MB
          </span>
        </a>
      ))}
      <p className="fp-share__note" aria-live="polite">
        {state === "copied"
          ? "Link copied. Paste it anywhere to share this moving picture."
          : state === "failed"
            ? `This browser would not copy it. The address is ${url}`
            : ""}
      </p>
    </div>
  );
}
