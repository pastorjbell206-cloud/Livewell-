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
    "why-blood": {
      title: "Sacrifice: why blood?: Bible Explorer",
      description:
        "Why the Bible speaks so much of blood, in seven moving pictures: life given for life, the first altars, the Passover door, the offerings that never stopped, the cup, and one sacrifice for all time.",
    },
    grace: {
      title: "Grace: the gift no one earns: Bible Explorer",
      description:
        "What grace is, in seven moving pictures: a gift and not a wage, the late workers in the vineyard, the cross, empty hands, a changed life, grace enough for each day, and grace passed on.",
    },
    faith: {
      title: "Faith: trusting the one who promised: Bible Explorer",
      description:
        "What the Bible means by faith, in seven moving pictures: Abraham under the stars, a mustard seed, a father's honest prayer, faith that comes by hearing, and faith that walks on without seeing.",
    },
    "psalm-23": {
      title: "Psalm 23: the LORD is my shepherd: Bible Explorer",
      description:
        "Psalm 23 line by line, in seven moving pictures: the shepherd, green pastures, the dark valley, the rod and the staff, the host's table, the house at the end, and the good shepherd.",
    },
    "romans-8-28": {
      title:
        "Romans 8:28: what it promises, and what it does not: Bible Explorer",
      description:
        "Romans 8:28 read in its own chapter, in seven moving pictures: what the verse does not say, what it does, what the good is, room to groan, and the love nothing can separate us from.",
    },
    "john-3-16": {
      title: "John 3:16 in its chapter: Bible Explorer",
      description:
        "John 3:16 read where it was said, in seven moving pictures: Nicodemus at night, born again, the bronze snake lifted up, God's love for the world, and the man who came out of the dark.",
    },
    "the-exodus": {
      title: "The Exodus: out of Egypt: Bible Explorer",
      description:
        "The rescue the whole Bible points back to, in seven moving pictures: slavery in Egypt, the burning bush, Pharaoh, the Passover, the sea, Miriam's song, and the greater rescue it became the pattern for.",
    },
    "david-and-goliath": {
      title: "David and Goliath: Bible Explorer",
      description:
        "1 Samuel 17 as the text tells it, in seven moving pictures: two armies, a champion, a shepherd boy, a speech in the name of the LORD, one stone, and who we are in the story.",
    },
    "all-nations": {
      title: "A blessing for all nations: Bible Explorer",
      description:
        "God's promise to bless every family on earth, in seven moving pictures: Babel, Abraham under the stars, Rahab and Ruth, Jonah and Nineveh, the Magi, Pentecost, and a crowd no one can count.",
    },
    "light-and-darkness": {
      title: "Light and darkness: Bible Explorer",
      description:
        "One light followed through the whole Bible, in seven moving pictures: the first word of creation, light in Egypt's darkness, the pillar of fire, the lamp in the tent, Isaiah's great light, the light of the world, and the city with no night.",
    },
    "never-heard": {
      title: "What about people who never heard?: Bible Explorer",
      description:
        "A hard question in seven moving pictures: what all Christians confess, what the Bible says and does not say about those who never heard of Jesus, and the three main answers Christians give, with no side taken.",
    },
    "temple-destroyed": {
      title: "Why did God let his temple be destroyed?: Bible Explorer",
      description:
        "The prophets' own answer, in seven moving pictures: a temple that never held God, prophet after prophet, Jeremiah at the gate, the glory leaving, the day it fell, grief kept in Scripture, and a promise larger than what was lost.",
    },
    "book-genesis": {
      title: "Genesis: the book of beginnings: Bible Explorer",
      description:
        "The whole book of Genesis in seven moving pictures: what it is, its two halves, the image of God, the first sin, the promise to Abraham, a faithful God with a flawed family, and where to start reading.",
    },
    "book-psalms": {
      title: "Psalms: the prayer book of the Bible: Bible Explorer",
      description:
        "The whole book of Psalms in seven moving pictures: what it is, its gateway and five books, honest prayer, praise, the LORD as king, the prayers Jesus prayed, and where to start reading.",
    },
    "book-john": {
      title: "John: the Word made flesh: Bible Explorer",
      description:
        "The whole Gospel of John in seven moving pictures: what it is, how it is built, the signs, the seven I am sayings, believing and life, the last evening and the glory of the cross, and where to start reading.",
    },
    "book-romans": {
      title: "Romans: the good news, set out: Bible Explorer",
      description:
        "The whole letter to the Romans in seven moving pictures: what it is, its large blocks, what is wrong, what God has done, the new life, one people from Jew and Gentile, and where to start reading.",
    },
    "book-exodus": {
      title: "Exodus: out of slavery, to God: Bible Explorer",
      description:
        "The whole book of Exodus in seven moving pictures: what it is, its two halves, the name of God, the Passover and the sea, a law given to people already rescued, the tent where God comes to live, and where to start reading.",
    },
    "book-proverbs": {
      title: "Proverbs: skill for ordinary days: Bible Explorer",
      description:
        "The whole book of Proverbs in seven moving pictures: what it is, a collection of collections, two ways, Wisdom's call, words, work and the poor, and how to read a proverb.",
    },
    "book-isaiah": {
      title: "Isaiah: the Holy One who comforts: Bible Explorer",
      description:
        "The whole book of Isaiah in seven moving pictures: what it is, its three parts, the Holy One of Israel, trust or ruin, judgment and a remnant, the king and the Servant, a world made new, and where to start reading.",
    },
    "book-matthew": {
      title: "Matthew: God with us: Bible Explorer",
      description:
        "The whole Gospel of Matthew in seven moving pictures: what it is, its five great blocks of teaching, promises kept, the kingdom of heaven, who Jesus is, Israel and all nations, and where to start reading.",
    },
    "book-mark": {
      title: "Mark: the story at a run: Bible Explorer",
      description:
        "The whole Gospel of Mark in seven moving pictures: what it is, its two halves, the question of who Jesus is, the way of the cross, friends who fail, the centurion at the cross, and where to start reading.",
    },
    "book-luke": {
      title: "Luke: good news for the lost: Bible Explorer",
      description:
        "The whole Gospel of Luke in seven moving pictures: what it is, the long road to Jerusalem, people others passed over, the lost found, prayer, salvation today and joy, and where to start reading.",
    },
    "book-acts": {
      title: "Acts: to the ends of the earth: Bible Explorer",
      description:
        "The whole book of Acts in seven moving pictures: what it is, the road from Jerusalem to Rome, the Holy Spirit, witnesses and what it cost, every line crossed, Saul who became Paul, and where to start reading.",
    },
    "book-revelation": {
      title: "Revelation: the Lamb on the throne: Bible Explorer",
      description:
        "The whole book of Revelation in seven moving pictures, with nothing to frighten: what it is, how it is laid out, the throne, the Lamb, the ways Christians read its visions, all things made new, and where to start reading.",
    },
    "book-ruth": {
      title: "Ruth: loyal love in a hard time: Bible Explorer",
      description:
        "The whole book of Ruth in seven moving pictures: what it is, how its four scenes are laid out, loyal love, God at work in ordinary days, the redeemer, the surprise at the end, and where to start reading.",
    },
    "book-jonah": {
      title: "Jonah: the prophet who ran from mercy: Bible Explorer",
      description:
        "The whole book of Jonah in seven moving pictures: what it is, how its four chapters are laid out, a God whom wind and sea obey, down and up again, the city that turned, the question at the end, and where to start reading.",
    },
    "book-daniel": {
      title: "Daniel: the Most High rules: Bible Explorer",
      description:
        "The whole book of Daniel in seven moving pictures, told gently: what it is, how it is laid out, the Most High who rules the kingdoms, faith that will not bow, Daniel at his window, one like a son of man, and where to start reading.",
    },
    "book-1-corinthians": {
      title: "1 Corinthians: a gifted church, coming apart: Bible Explorer",
      description:
        "The whole of 1 Corinthians in seven moving pictures: a real letter to a real church, its two halves, the wisdom of the cross, one body with many parts, the way of love, raised from the dead, and where to start reading.",
    },
    "book-ephesians": {
      title: "Ephesians: one new people in Christ: Bible Explorer",
      description:
        "The whole letter to the Ephesians in seven moving pictures: what it is, its two halves, grace, one new people from Jew and Gentile, a worthy walk, standing firm, and where to start reading, with the household passages as churches read them.",
    },
    "book-philippians": {
      title: "Philippians: joy in chains: Bible Explorer",
      description:
        "The whole letter to the Philippians in seven moving pictures: a thank-you letter from prison, its four chapters, joy, the mind of Christ, all counted as loss, contentment in want and in plenty, and where to start reading.",
    },
    "book-hebrews": {
      title: "Hebrews: hold on to Jesus: Bible Explorer",
      description:
        "The whole book of Hebrews in seven moving pictures: a sermon for tired believers, how it is laid out, the Son, the old covenant honored as a gift that pointed ahead, the great high priest, hold on and run, and where to start reading.",
    },
    "book-james": {
      title: "James: faith that works: Bible Explorer",
      description:
        "The whole letter of James in seven moving pictures: sharp, practical sayings, the threads it keeps returning to, trials, faith that is alive and how it fits with Paul, the poor and the rich, the power of words, and where to start reading.",
    },
    "book-joshua": {
      title: "Joshua: a promise kept: Bible Explorer",
      description:
        "The whole book of Joshua in seven moving pictures: the promised land, its four movements, the river crossed, the hardest chapters faced plainly, who belongs, rest and a choice, and where to start reading.",
    },
    "book-judges": {
      title: "Judges: a people coming apart: Bible Explorer",
      description:
        "The whole book of Judges in seven moving pictures: the dark years after Joshua, how it is laid out, the wheel that runs downhill, unlikely deliverers, gifts that are not goodness, no king in Israel, and where to start reading.",
    },
    "book-1-samuel": {
      title: "1 Samuel: the heart God sees: Bible Explorer",
      description:
        "The whole of 1 Samuel in seven moving pictures: three lives, seven stages, the boy who listens, a people asking for a king, the heart God sees, loyal love, and where to start reading.",
    },
    "book-jeremiah": {
      title: "Jeremiah: the prophet who wept: Bible Explorer",
      description:
        "The whole book of Jeremiah in seven moving pictures: a prophet in the last days of Judah, how the book is laid out, false safety, honest prayer, a letter to the exiles, the new covenant, and where to start reading.",
    },
    "book-galatians": {
      title: "Galatians: nothing added to Christ: Bible Explorer",
      description:
        "The whole letter to the Galatians in seven moving pictures: an urgent letter, how it is laid out, who belongs, Abraham and the law, one table, what freedom is for, and where to start reading.",
    },
    "book-colossians": {
      title: "Colossians: complete in Christ: Bible Explorer",
      description:
        "The whole letter to the Colossians in seven moving pictures: a letter to a church Paul never saw, how it is laid out, the song of Christ, fullness, new clothes, life in the Lord, and where to start reading.",
    },
    "book-1-peter": {
      title: "1 Peter: hope for strangers: Bible Explorer",
      description:
        "The whole of 1 Peter in seven moving pictures: strangers in their own towns, how it is laid out, a living hope, God's own people, doing good without striking back, God's care, and where to start reading.",
    },
    "book-1-john": {
      title: "1 John: so that you may know: Bible Explorer",
      description:
        "The whole of 1 John in seven moving pictures: churches that had been shaken, how it is laid out, hands that touched, three marks of knowing God, sin and forgiveness, God is love, and where to start reading.",
    },
    "book-leviticus": {
      title: "Leviticus: living near a holy God: Bible Explorer",
      description:
        "The whole book of Leviticus in seven moving pictures: the question it answers, how it is laid out, gifts brought near, holy and clean, the Day of Atonement, love of neighbor, and where to start reading.",
    },
    "book-numbers": {
      title: "Numbers: forty years in the wilderness: Bible Explorer",
      description:
        "The whole book of Numbers in seven moving pictures: the wilderness, two generations, God at the center of the camp, the refusal at Kadesh, Balaam's blessing, the new generation, and where to start reading.",
    },
    "book-deuteronomy": {
      title: "Deuteronomy: love the LORD with all your heart: Bible Explorer",
      description:
        "The whole book of Deuteronomy in seven moving pictures: Moses' farewell, three addresses, the Shema, chosen in love, laws that take the side of the weak, the call to choose life, and where to start reading.",
    },
    "book-2-samuel": {
      title: "2 Samuel: the king and the promise: Bible Explorer",
      description:
        "The whole of 2 Samuel in seven moving pictures: King David, five parts, a crown not seized, the promise of a house, Nathan's word to the king, the sword in David's house, and where to start reading.",
    },
    "book-nehemiah": {
      title: "Nehemiah: rebuilding the walls, and a people: Bible Explorer",
      description:
        "The whole book of Nehemiah in seven moving pictures: the king's cupbearer, how it is laid out, pray and keep watch, justice for the poor, the law read with joy, an ending without triumph, and where to start reading.",
    },
    "book-amos": {
      title: "Amos: let justice roll on like a river: Bible Explorer",
      description:
        "The whole book of Amos in seven moving pictures: a herdsman sent north, how it is laid out, the trap, justice like a river, the plumb line, the fallen tent restored, and where to start reading.",
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
  spoken: boolean;
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
      // A video with a voice: frames last as long as their words.
      spoken: q.get("pace") === "spoken",
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
