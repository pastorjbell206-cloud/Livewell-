/**
 * The gift sheet on a download (James, 2026-11-22), in both states of the
 * giving switch. The host is given the switch as a prop, so the test does not
 * depend on what is committed in lib/giving.json.
 *
 * HELD (switch off)
 *  - a download link is the plain link it always was: no sheet, the click is
 *    not stopped, and the server is never asked
 *
 * OPEN, but the server has no Stripe key
 *  - the same: a plain download
 *
 * OPEN
 *  - the first click on a download raises the sheet: the title, "Suggested
 *    gift: $2.99", the amounts, and the plain link "Download without giving"
 *    to the very file that was asked for
 *  - "Give" sends the download's id and the amount, and nothing else, then
 *    goes to Stripe; the file is remembered for the thank-you page
 *  - the same download does not ask twice; small things ask once a day
 *  - the Find Help printables never ask
 *  - Stripe failing says "Nothing was charged." and leaves the plain link
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import superjson from "superjson";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { renderWithProviders } from "@/test/harness";
import DownloadGiftHost from "./DownloadGiftHost";
import { FAILED_MESSAGE, SKIP_LABEL } from "./DownloadGiftSheet";
import DownloadThanks from "@/pages/DownloadThanks";
import { ASKED_KEY, PENDING_KEY, forgetAsked, isDownloadOf, markAsked, pendingFor, rememberPending, shouldAsk } from "@/lib/downloadGift";
import { ADVICE_LINE, GIVING } from "@/lib/giving";

const CHECKOUT_URL = "https://checkout.stripe.com/c/pay/cs_test_download_gift";
const GUIDE = "/downloads/studyguides/lament-leader.pdf";
const GUIDE_HANDOUT = "/downloads/studyguides/lament-participant.pdf";
const SHEET_A = "/downloads/tools/prayer-list-letter.pdf";
const SHEET_B = "/downloads/tools/worry-log-a4.pdf";
const FAMILY = "/downloads/tools/family-cards-letter.pdf";
const BOOK = "/ebook/believe/Believe.pdf";
const CARE = "/downloads/help/grief-guide-letter.pdf";

type Answer = { data: unknown } | { error: string; status?: number };

function trpcFetch(answers: Record<string, Answer>) {
  const calls: { proc: string; input: unknown }[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = new URL(String(input), "http://localhost");
      const procs = url.pathname.replace(/^\/api\/trpc\//, "").split(",");
      if (!url.pathname.startsWith("/api/trpc/") || !procs.some((p) => p in answers)) {
        return new Response(JSON.stringify({ error: "offline test stub" }), { status: 503, headers: { "Content-Type": "application/json" } });
      }
      const body = init?.body ? JSON.parse(String(init.body)) : {};
      let worst = 200;
      const out = procs.map((proc, i) => {
        calls.push({ proc, input: body?.[String(i)]?.json });
        const a = answers[proc];
        if (!a) return { error: { message: "not in this test", code: -32603, data: { code: "NOT_FOUND", httpStatus: 404 } } };
        if ("error" in a) {
          worst = a.status ?? 500;
          return { error: { message: a.error, code: -32603, data: { code: "BAD_REQUEST", httpStatus: worst } } };
        }
        return { result: { data: superjson.serialize(a.data) } };
      });
      return new Response(JSON.stringify(out), { status: worst, headers: { "Content-Type": "application/json" } });
    })
  );
  return calls;
}

/** A page with the kinds of download link the site has, and the host beside it. */
function Page({ switchOn }: { switchOn: boolean }) {
  return (
    <>
      <a href={GUIDE} target="_blank" rel="noopener">Leader's guide</a>
      <a href={GUIDE_HANDOUT} target="_blank" rel="noopener">Participant handout</a>
      <a href={SHEET_A}>Prayer list</a>
      <a href={SHEET_B}>Worry log</a>
      <a href={FAMILY}>Family cards</a>
      <a href={BOOK} download>Believe</a>
      <a href={CARE} target="_blank" rel="noopener">Grief guide</a>
      <a href="/about">About</a>
      <DownloadGiftHost switchOn={switchOn} />
    </>
  );
}

/** Click a link and report whether the click was stopped. jsdom does not navigate, so the page stays. */
async function click(name: string) {
  let stopped = false;
  const watch = (e: Event) => {
    stopped = e.defaultPrevented;
    e.preventDefault(); // keep jsdom from trying to navigate; read after the host has had its turn
  };
  window.addEventListener("click", watch);
  await userEvent.click(screen.getByRole("link", { name }));
  window.removeEventListener("click", watch);
  return stopped;
}

const sheet = () => screen.queryByRole("dialog");
const originalLocation = window.location;

beforeEach(() => {
  forgetAsked();
  window.localStorage.clear();
  const fake = {
    ...originalLocation,
    href: "http://localhost/downloads",
    search: "",
    pathname: "/downloads",
    assign(to: string) {
      fake.href = to;
    },
  };
  Object.defineProperty(window, "location", { value: fake, writable: true, configurable: true });
});

afterEach(() => {
  Object.defineProperty(window, "location", { value: originalLocation, writable: true, configurable: true });
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("held: a download is the plain link it always was", () => {
  it("no sheet, the click is not stopped, and the server is never asked", async () => {
    const calls = trpcFetch({ "giving.status": { data: { open: true } } });
    renderWithProviders(<Page switchOn={false} />);
    for (const name of ["Leader's guide", "Prayer list", "Believe", "Family cards"]) {
      expect(await click(name), name).toBe(false);
      expect(sheet()).toBeNull();
    }
    expect(calls.filter((c) => c.proc.startsWith("giving."))).toHaveLength(0);
    expect(window.localStorage.getItem(ASKED_KEY)).toBeNull();
  });

  it("the committed switch is on (James, 2026-11-25), so the sheet is what ships", () => {
    expect(GIVING.open).toBe(true);
  });
});

describe("the switch is on but the server has no Stripe key", () => {
  it("a download is still a plain link", async () => {
    const calls = trpcFetch({ "giving.status": { data: { open: false } } });
    renderWithProviders(<Page switchOn />);
    await waitFor(() => expect(calls.some((c) => c.proc === "giving.status")).toBe(true));
    expect(await click("Believe")).toBe(false);
    expect(sheet()).toBeNull();
  });

  it("and when the server cannot be reached at all", async () => {
    trpcFetch({});
    renderWithProviders(<Page switchOn />);
    expect(await click("Leader's guide")).toBe(false);
    expect(sheet()).toBeNull();
  });
});

describe("open: the sheet", () => {
  async function ready(answers: Record<string, Answer> = {}) {
    const calls = trpcFetch({ "giving.status": { data: { open: true } }, "giving.createDownloadCheckout": { data: { sessionUrl: CHECKOUT_URL } }, ...answers });
    renderWithProviders(<Page switchOn />);
    await waitFor(() => expect(document.querySelector("[data-gift-listening]")).not.toBeNull());
    return calls;
  }

  it("the first click raises it: the title, the suggested gift, the amounts, and the plain link to the same file", async () => {
    await ready();
    expect(await click("Leader's guide")).toBe(true);
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAccessibleName(/lament/i);
    expect(dialog).toHaveTextContent("Suggested gift: $2.99");
    expect(screen.getByRole("button", { name: "$2.99" })).toHaveAttribute("aria-pressed", "true");
    for (const amount of ["$2", "$5", "$10"]) expect(screen.getByRole("button", { name: amount })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: "Give $2.99 and download" })).toBeEnabled();
    const skip = screen.getByRole("link", { name: SKIP_LABEL });
    expect(skip).toHaveAttribute("href", GUIDE);
    expect(skip).toHaveAttribute("target", "_blank");
    expect(dialog).toHaveTextContent(GIVING.recipientLine);
    expect(dialog).toHaveTextContent(GIVING.taxLine);
    expect(dialog).toHaveTextContent(ADVICE_LINE);
  });

  it("a book's sheet suggests $8.99 and keeps the link a saved download", async () => {
    await ready();
    expect(await click("Believe")).toBe(true);
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent("Suggested gift: $8.99");
    const skip = screen.getByRole("link", { name: SKIP_LABEL });
    expect(skip).toHaveAttribute("href", BOOK);
    expect(skip).toHaveAttribute("download");
    expect(skip).not.toHaveAttribute("target");
  });

  it("\"Download without giving\" is a plain link: the host lets it through and the sheet closes", async () => {
    await ready();
    await click("Leader's guide");
    await screen.findByRole("dialog");
    expect(await click(SKIP_LABEL)).toBe(false);
    await waitFor(() => expect(sheet()).toBeNull());
  });

  it("the same download does not ask twice, by either of its files", async () => {
    await ready();
    expect(await click("Leader's guide")).toBe(true);
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(sheet()).toBeNull());
    expect(await click("Leader's guide")).toBe(false);
    expect(await click("Participant handout")).toBe(false);
    expect(sheet()).toBeNull();
  });

  it("small things ask once a day: after one worksheet, the next sheet and the family cards download at once", async () => {
    await ready();
    expect(await click("Prayer list")).toBe(true);
    await userEvent.click(await screen.findByRole("button", { name: "Close" }));
    await waitFor(() => expect(sheet()).toBeNull());
    expect(await click("Worry log")).toBe(false);
    expect(await click("Family cards")).toBe(false);
    // A book is not a small thing: it still asks, once.
    expect(await click("Believe")).toBe(true);
  });

  it("a parent printing tonight's devotion is two taps from the file at most", async () => {
    await ready();
    expect(await click("Family cards")).toBe(true);
    const skip = await screen.findByRole("link", { name: SKIP_LABEL });
    expect(skip).toHaveAttribute("href", FAMILY);
    expect(await click(SKIP_LABEL)).toBe(false);
    expect(await click("Family cards")).toBe(false);
  });

  it("yesterday's asking is forgotten", async () => {
    window.localStorage.setItem(ASKED_KEY, JSON.stringify({ day: "2001-01-01", items: ["ebook:believe"], small: true }));
    expect(shouldAsk("ebook:believe")).toBe(true);
    expect(shouldAsk("worksheet:prayer-list")).toBe(true);
    markAsked("worksheet:prayer-list");
    expect(shouldAsk("worksheet:worry-log")).toBe(false);
    expect(shouldAsk("ebook:believe")).toBe(true);
  });

  it("the Find Help printables never ask, and other links are left alone", async () => {
    await ready();
    expect(await click("Grief guide")).toBe(false);
    expect(await click("About")).toBe(false);
    expect(sheet()).toBeNull();
  });

  it("a click meant for a new tab or a save passes through", async () => {
    await ready();
    const link = screen.getByRole("link", { name: "Believe" });
    const event = new MouseEvent("click", { bubbles: true, cancelable: true, ctrlKey: true });
    const stop = (e: Event) => e.preventDefault();
    link.addEventListener("click", (e) => { expect(e.defaultPrevented).toBe(false); stop(e); }, { once: true });
    link.dispatchEvent(event);
    expect(sheet()).toBeNull();
  });

  it("Give sends the download's id and the amount, nothing else, and goes to Stripe", async () => {
    const calls = await ready();
    await click("Leader's guide");
    await userEvent.click(await screen.findByRole("button", { name: "Give $2.99 and download" }));
    await waitFor(() => expect(window.location.href).toBe(CHECKOUT_URL));
    const sent = calls.filter((c) => c.proc === "giving.createDownloadCheckout");
    expect(sent).toHaveLength(1);
    expect(sent[0].input).toEqual({ itemId: "study-guide:lament", amountCents: 299 });
    expect(pendingFor("study-guide:lament")).toMatchObject({ itemId: "study-guide:lament", href: GUIDE });
  });

  it("another amount, by keyboard, in dollars and cents", async () => {
    const calls = await ready();
    await click("Believe");
    await userEvent.click(await screen.findByRole("button", { name: "$15" }));
    expect(screen.getByRole("button", { name: "Give $15 and download" })).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Another amount"), "12.5");
    await userEvent.click(screen.getByRole("button", { name: "Give $12.50 and download" }));
    await waitFor(() => expect(window.location.href).toBe(CHECKOUT_URL));
    expect(calls.find((c) => c.proc === "giving.createDownloadCheckout")?.input).toEqual({ itemId: "ebook:believe", amountCents: 1250 });
  });

  it("an amount that is not money, or is out of range, is refused on the page", async () => {
    const calls = await ready();
    await click("Believe");
    const input = await screen.findByLabelText("Another amount");
    await userEvent.type(input, "lots");
    await userEvent.click(screen.getByRole("button", { name: "Give and download" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Enter an amount in dollars and cents");
    await userEvent.clear(input);
    await userEvent.type(input, "0.50");
    await userEvent.click(screen.getByRole("button", { name: /^Give/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent("The smallest gift this page takes is $1.");
    await userEvent.clear(input);
    await userEvent.type(input, "9000");
    await userEvent.click(screen.getByRole("button", { name: /^Give/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent("The largest gift this page takes is $5,000.");
    expect(calls.filter((c) => c.proc === "giving.createDownloadCheckout")).toHaveLength(0);
  });

  it("when the gift cannot be started it says so, shows none of the server's words, and the plain link is still there", async () => {
    await ready({ "giving.createDownloadCheckout": { error: "stripe exploded: sk_live_detail", status: 500 } });
    await click("Believe");
    await userEvent.click(await screen.findByRole("button", { name: "Give $8.99 and download" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(FAILED_MESSAGE);
    expect(screen.getByRole("dialog")).not.toHaveTextContent(/stripe exploded|sk_live/);
    expect(screen.getByRole("link", { name: SKIP_LABEL })).toHaveAttribute("href", BOOK);
    expect(window.location.href).toBe("http://localhost/downloads");
  });
});

describe("what the device hands back after a gift", () => {
  it("only one of this site's own files for that download", () => {
    expect(isDownloadOf(GUIDE, "study-guide:lament")).toBe(true);
    expect(isDownloadOf(BOOK, "study-guide:lament")).toBe(false);
    expect(isDownloadOf("//elsewhere.example/ebook/believe/Believe.pdf", "ebook:believe")).toBe(false);
    expect(isDownloadOf("https://elsewhere.example/ebook/believe/Believe.pdf", "ebook:believe")).toBe(false);
    window.localStorage.setItem(PENDING_KEY, JSON.stringify({ itemId: "ebook:believe", href: "https://elsewhere.example/x.pdf", title: "x" }));
    expect(pendingFor("ebook:believe")).toBeNull();
    rememberPending({ itemId: "ebook:believe", href: BOOK, title: "Believe" });
    expect(pendingFor("ebook:believe")).toEqual({ itemId: "ebook:believe", href: BOOK, title: "Believe" });
    expect(pendingFor("ebook:the-reliability-of-scripture")).toBeNull();
  });
});

describe("/downloads/thanks", () => {
  const robots = () => document.head.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "";

  function arrive(search: string) {
    (window.location as unknown as { search: string }).search = search;
    trpcFetch({});
    renderWithProviders(<DownloadThanks />);
  }

  it("after a gift: thanks, the download started, and a plain link to it", async () => {
    rememberPending({ itemId: "ebook:believe", href: BOOK, title: "Believe" });
    const clicked: string[] = [];
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
      clicked.push(this.getAttribute("href") ?? "");
    });
    arrive("?item=ebook%3Abelieve");
    expect(await screen.findByRole("heading", { level: 1, name: "Thank you" })).toBeInTheDocument();
    const link = await screen.findByRole("link", { name: "Download Believe" });
    expect(link).toHaveAttribute("href", BOOK);
    expect(clicked).toEqual([BOOK]);
    expect(screen.getByText(/LiveWell keeps no list of who gives/)).toBeInTheDocument();
    expect(screen.getByText(ADVICE_LINE)).toBeInTheDocument();
    await waitFor(() => expect(robots()).toMatch(/noindex/));
    expect(window.localStorage.getItem(PENDING_KEY)).toBeNull();
  });

  it("after backing out: nothing was charged, the file is still offered, and nothing starts by itself", async () => {
    rememberPending({ itemId: "study-guide:lament", href: GUIDE, title: "Lament" });
    const clicked: string[] = [];
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
      clicked.push(this.getAttribute("href") ?? "");
    });
    arrive("?item=study-guide%3Alament&cancelled=1");
    expect(await screen.findByRole("heading", { level: 1, name: "Nothing was charged" })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: "Download Lament" })).toHaveAttribute("href", GUIDE);
    expect(clicked).toEqual([]);
    expect(screen.queryByText(/holds the record of your gift/)).toBeNull();
  });

  it("on another device, or with a made-up address: the way back to the Downloads page, and no file", async () => {
    arrive("?item=ebook%3Ababylon");
    expect(await screen.findByRole("heading", { level: 1, name: "Thank you" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Downloads page" })).toHaveAttribute("href", "/downloads");
    expect(screen.queryByRole("link", { name: /^Download / })).toBeNull();
  });
});

describe("the words", () => {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const files = ["DownloadGiftSheet.tsx", "DownloadGiftHost.tsx", "../pages/DownloadThanks.tsx"].map((f) => fs.readFileSync(path.join(here, f), "utf8"));
  /** The text a reader can see: string literals and JSX text, comments dropped. */
  const shown = files.map((src) => src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "")).join("\n");

  it("says \"Suggested gift\", never a price, and never boasts that it is free", () => {
    expect(shown).toContain("Suggested gift");
    expect(shown).not.toMatch(/\bprice\b|\bfree\b|\bbuy\b|\bpurchase\b/i);
  });

  it("no pressure: no count, no deadline, no \"most people\"", () => {
    expect(shown).not.toMatch(/most (people|readers)|only \d|hurry|today only|limited|\d+ (people|readers|supporters)/i);
  });

  it("no em-dash, no exclamation, none of the forbidden words", () => {
    expect(shown).not.toMatch(/—/);
    expect(shown.replace(/!==?|!\w|!\(|=>|\(!|\s!\s?[a-z(]/g, "")).not.toMatch(/!/);
    expect(shown).not.toMatch(/\b(delve|leverage|unlock|transformative|navigate|tapestry|foster|unpack|landscape|nuanced|multifaceted|authentic|journey|holistic|blessed)\b/i);
  });
});
