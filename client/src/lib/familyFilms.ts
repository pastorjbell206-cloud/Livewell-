/**
 * "Watch first": the Bible Explorer film a family devotion or a catechism
 * question offers (client/public/family/films.json, written by
 * scripts/build-family-films.mjs from the films' own data; never a list typed
 * into a page). A devotion or question the map does not name offers nothing.
 * The map is an extra: when it cannot be read the page is whole without it,
 * so a failed fetch shows no offer and no error.
 */
import { useEffect, useState } from "react";
import { fetchJson } from "./fetch-json";

export const FAMILY_FILMS_URL = "/family/films.json";

export interface FamilyFilm {
  slug: string;
  title: string;
  /** The film's length read aloud at the younger level, in whole minutes. */
  minutes: number;
}

export interface FamilyFilms {
  devotions: Record<string, FamilyFilm>;
  catechism: Record<string, FamilyFilm>;
}

const isObject = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x);

function isFilmRow(x: unknown): x is FamilyFilm {
  return isObject(x) && typeof x.slug === "string" && /^[a-z0-9-]+$/.test(x.slug) && typeof x.title === "string" && typeof x.minutes === "number" && x.minutes >= 1;
}

export function isFamilyFilms(x: unknown): x is FamilyFilms {
  return isObject(x) && isObject(x.devotions) && isObject(x.catechism) && Object.values(x.devotions).every(isFilmRow) && Object.values(x.catechism).every(isFilmRow);
}

/** "about 2 minutes", "about 1 minute". */
export function aboutMinutes(minutes: number): string {
  return `about ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
}

/** The film for one devotion, or null. */
export function filmForDevotion(films: FamilyFilms | null, id: string): FamilyFilm | null {
  return (films && Object.prototype.hasOwnProperty.call(films.devotions, id) && films.devotions[id]) || null;
}

/** The film for one catechism question, or null. */
export function filmForQuestion(films: FamilyFilms | null, number: number): FamilyFilm | null {
  const key = String(number);
  return (films && Object.prototype.hasOwnProperty.call(films.catechism, key) && films.catechism[key]) || null;
}

let cache: Promise<FamilyFilms> | null = null;

/** For tests: forget the map, so the next page fetches it again. */
export function forgetFamilyFilms() {
  cache = null;
}

/** The map, fetched once for the whole visit; null until it arrives, and null if it never does. */
export function useFamilyFilms(): FamilyFilms | null {
  const [films, setFilms] = useState<FamilyFilms | null>(null);
  useEffect(() => {
    let live = true;
    cache ??= fetchJson(FAMILY_FILMS_URL, isFamilyFilms);
    cache
      .then((value) => live && setFilms(value))
      .catch(() => {
        cache = null;
      });
    return () => {
      live = false;
    };
  }, []);
  return films;
}
