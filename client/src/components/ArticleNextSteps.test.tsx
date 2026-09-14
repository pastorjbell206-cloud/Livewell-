/**
 * The end-of-essay contract: exactly one prominent ask.
 *
 * A reader who has just finished an essay is at peak intent, and that intent
 * is spent by stacking competing calls to action. The panel therefore leads
 * with a single next step chosen by where the reader actually is:
 *
 *  - mid reading path → the next essay in that path, alone
 *  - not on a path    → nothing prominent here; the book (KeepReadingBook)
 *                       carries the lead, and this drops to quiet links
 *
 * These tests guard that rule so a future "just one more CTA" cannot quietly
 * rebuild the wall.
 */
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "@/test/harness";
import ArticleNextSteps, { isArticleOnPath } from "./ArticleNextSteps";

/** First two essays of "The Story of Christianity" reading path. */
const ON_PATH_SLUG = "how-christianity-became-an-empire";
const NEXT_ON_PATH_TITLE = /The Great Schism/i;

/** Not a member of any reading path. */
const OFF_PATH_SLUG = "a-slug-that-is-on-no-reading-path-whatsoever";

describe("isArticleOnPath", () => {
  it("recognises an essay that sits inside a reading path", () => {
    expect(isArticleOnPath(ON_PATH_SLUG)).toBe(true);
  });

  it("reports an unfiled essay as off-path", () => {
    expect(isArticleOnPath(OFF_PATH_SLUG)).toBe(false);
  });
});

describe("ArticleNextSteps — mid reading path", () => {
  it("leads with the next essay in the path", () => {
    renderWithProviders(
      <ArticleNextSteps articleSlug={ON_PATH_SLUG} articlePillar="" />
    );

    expect(screen.getByText(/read next/i)).toBeInTheDocument();
    expect(screen.getByText(NEXT_ON_PATH_TITLE)).toBeInTheDocument();
  });

  it("does not stack a competing tool card or a second path CTA", () => {
    renderWithProviders(
      <ArticleNextSteps articleSlug={ON_PATH_SLUG} articlePillar="" />
    );

    // The tool card CTA and the rival "start a path" ask are both gone.
    expect(screen.queryByText(/open tool/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/start the path/i)).not.toBeInTheDocument();
  });
});

describe("ArticleNextSteps — not on a path", () => {
  it("cedes the lead to the book, keeping no prominent ask of its own", () => {
    renderWithProviders(
      <ArticleNextSteps articleSlug={OFF_PATH_SLUG} articlePillar="" />
    );

    // No "Read next" heading competing with the book that follows it.
    expect(screen.queryByText(/read next/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/open tool/i)).not.toBeInTheDocument();
  });

  it("still offers a path as a quiet line rather than a card", () => {
    renderWithProviders(
      <ArticleNextSteps articleSlug={OFF_PATH_SLUG} articlePillar="" />
    );

    expect(screen.getByText(/start the path/i)).toBeInTheDocument();
  });
});
