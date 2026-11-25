/**
 * Each moving picture's drawing, one lazy chunk per film, by the film's slug
 * (client/public/explorer/films/<slug>.json). A film's page loads only its own.
 */
import type { FilmDrawing } from "../motion";

export const FILM_SCENES: Record<
  string,
  () => Promise<{ default: FilmDrawing }>
> = {
  "bible-two-minutes": () => import("./bible-two-minutes"),
  "holy-spirit": () => import("./holy-spirit"),
  "god-with-his-people": () => import("./god-with-his-people"),
  "who-god-is": () => import("./who-god-is"),
  "why-jesus-died": () => import("./why-jesus-died"),
  "how-salvation-works": () => import("./how-salvation-works"),
  "who-made-god": () => import("./who-made-god"),
  "gospel-in-a-minute": () => import("./gospel-in-a-minute"),
  "bible-in-a-minute": () => import("./bible-in-a-minute"),
  "does-god-exist": () => import("./does-god-exist"),
  "did-jesus-come-back-to-life": () => import("./did-jesus-come-back-to-life"),
  "sixty-six-books": () => import("./sixty-six-books"),
  "the-church": () => import("./the-church"),
  "why-bad-things-happen": () => import("./why-bad-things-happen"),
  "is-the-bible-true": () => import("./is-the-bible-true"),
  "spirit-in-a-believer": () => import("./spirit-in-a-believer"),
  "image-of-god": () => import("./image-of-god"),
  "what-sin-is": () => import("./what-sin-is"),
  "who-jesus-is": () => import("./who-jesus-is"),
  prayer: () => import("./prayer"),
  "baptism-and-supper": () => import("./baptism-and-supper"),
  "life-to-come": () => import("./life-to-come"),
  "so-many-churches": () => import("./so-many-churches"),
  "the-resurrection": () => import("./the-resurrection"),
  "the-bible": () => import("./the-bible"),
  "the-king": () => import("./the-king"),
  "love-when-i-do-wrong": () => import("./love-when-i-do-wrong"),
  covenant: () => import("./covenant"),
  "the-lamb": () => import("./the-lamb"),
  "exile-and-home": () => import("./exile-and-home"),
  "kingdom-of-god": () => import("./kingdom-of-god"),
  "why-cant-i-see-god": () => import("./why-cant-i-see-god"),
  "when-we-die": () => import("./when-we-die"),
  "god-silent": () => import("./god-silent"),
  "science-and-the-bible": () => import("./science-and-the-bible"),
  "why-blood": () => import("./why-blood"),
  grace: () => import("./grace"),
  faith: () => import("./faith"),
  "david-and-goliath": () => import("./david-and-goliath"),
  "the-exodus": () => import("./the-exodus"),
  "john-3-16": () => import("./john-3-16"),
  "psalm-23": () => import("./psalm-23"),
  "romans-8-28": () => import("./romans-8-28"),
  "all-nations": () => import("./all-nations"),
  "light-and-darkness": () => import("./light-and-darkness"),
  "never-heard": () => import("./never-heard"),
  "temple-destroyed": () => import("./temple-destroyed"),
};

export const hasFilmScene = (slug: string) => slug in FILM_SCENES;
