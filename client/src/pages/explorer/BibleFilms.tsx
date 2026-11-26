/**
 * /study/films: Bible films. Every finished Bible Explorer film, for every
 * reader, by its group (the big story, Bible stories, books of the Bible,
 * big ideas, what we believe, verses to know, good questions), with the maps
 * that move. James, 2026-11-25: "I want also the videos for the Bible to be
 * on the drop-down menu ... the main part of what drops down." So this is the
 * Bible door's first room (lib/siteCatalog.ts).
 *
 * The films and their groups are the Explorer's own (client/public/explorer/
 * index.json); this page lists them and changes none of them. Each opens its
 * own page, /study/explorer/watch/<slug>. The lines shown are the older
 * reading level's, since this page is for adults as much as children.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { LoadFailed } from "@/components/LoadFailed";
import { fetchExplorerIndex } from "@/lib/explorer";
import { Status, useLoad } from "../study-bible/shared";
import { Watch } from "./Watch";
import "./explorer.css";
import "./films/film.css";

export default function BibleFilms() {
  const { data, retry } = useLoad("films", fetchExplorerIndex);
  return (
    <Layout>
      <SEOMeta
        title="Bible Films: The Story, the Books and the Big Ideas"
        description="Short narrated films on the whole story of the Bible, its books, its big ideas, what Christians believe and the hard questions people ask. Press Play, or step through by hand."
        url="https://www.livewellbyjamesbell.co/study/films"
      />
      <InnerHead
        path="/study/films"
        title="Bible films"
        line="Short narrated films on the Bible's story, its books, its big ideas and its hard questions. Press Play, or step through by hand; every word is under the picture."
        plate="book"
      />
      {data === undefined && (
        <div data-lw-loading>
          <Status>Loading the films…</Status>
        </div>
      )}
      {data === null && <LoadFailed what="The films" onRetry={retry} backHref="/study" backLabel="Back to Study the Bible" />}
      {data && (
        <Watch
          index={data}
          level="older"
          title="Every film"
          lede="Each is a few minutes long and drawn in the site's own engraved hand. Choose Listen on a film to hear it read aloud."
        />
      )}
    </Layout>
  );
}
