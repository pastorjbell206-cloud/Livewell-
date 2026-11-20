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
};

export const hasFilmScene = (slug: string) => slug in FILM_SCENES;
