/**
 * Money-path contract for /support ("Support this work"), in both states of
 * the one switch (lib/giving.json), rendered with facts passed in so the test
 * does not depend on what is committed.
 *
 * HELD (open: false)
 *  - the note is at the top, the page says noindex, the give button is disabled
 *  - the controls can still be tried by keyboard, and the server is never asked
 *
 * OPEN (open: true)
 *  - no note, no noindex
 *  - server says open       → the button works and the giver is sent to Stripe
 *  - server says not open   → "Giving isn't open yet.", and no button at all
 *  - server cannot be reached (the static preview) → the same, with no error shown
 *  - Stripe fails           → "Nothing was charged.", never a raw error
 *
 * Both states carry the recipient line, the tax line and the line that
 * nothing on the page is tax or financial advice. No secret is in any file
 * the browser loads.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import superjson from "superjson";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { renderWithProviders } from "@/test/harness";
import { ADVICE_LINE, HELD_NOTE, type GivingFacts } from "@/lib/giving";
import { GIVING_CLOSED_MESSAGE } from "@shared/giving";
import { SupportPage } from "./Support";
import SupportThanks from "./SupportThanks";

const HELD: GivingFacts = { open: false, recipientLine: "Recipient line, held.", taxLine: "Tax line, held." };
const OPEN: GivingFacts = { open: true, recipientLine: "Recipient line, open.", taxLine: "Tax line, open." };
const CHECKOUT_URL = "https://checkout.stripe.com/c/pay/cs_test_gift";

const robots = () => document.head.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "";
const giveButton = () => screen.getByRole("button", { name: /^Give/ });

type Answer = { data: unknown } | { error: string; status?: number };

/**
 * A fetch that answers the page's tRPC calls by procedure name, in the batch
 * shape both runtimes use, and records each call. Every other request (the
 * layout's own) gets an offline 503.
 */
function trpcFetch(answers: Record<string, Answer>) {
  const calls: { proc: string; input: unknown }[] = [];
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
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
  });
  vi.stubGlobal("fetch", fetchMock);
  return { calls, fetchMock };
}

const givingCalls = (calls: { proc: string }[]) => calls.filter((c) => c.proc.startsWith("giving."));

const originalLocation = window.location;

beforeEach(() => {
  window.history.pushState({}, "", "/support");
  // jsdom's Location throws on href writes; a plain recorder stands in for the redirect.
  const fake = {
    ...originalLocation,
    href: "http://localhost/support",
    search: "",
    pathname: "/support",
    assign(to: string) {
      fake.href = to;
    },
  };
  Object.defineProperty(window, "location", { value: fake, writable: true, configurable: true });
});

afterEach(() => {
  Object.defineProperty(window, "location", { value: originalLocation, writable: true, configurable: true });
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.history.pushState({}, "", "/");
});

describe("/support, held", () => {
  it("shows the note at the top, says noindex, and keeps the give button off", async () => {
    const { calls } = trpcFetch({ "giving.status": { data: { open: true } } });
    renderWithProviders(<SupportPage facts={HELD} />);

    expect(screen.getByRole("heading", { level: 1, name: "Support this work" })).toBeInTheDocument();
    expect(screen.getByRole("note")).toHaveTextContent(HELD_NOTE);
    expect(HELD_NOTE).toBe("Not yet open: giving opens when the payment account is connected.");
    await waitFor(() => expect(robots()).toBe("noindex, follow"));

    const button = giveButton();
    expect(button).toBeDisabled();
    expect(button).toHaveAccessibleDescription(HELD_NOTE);

    // Even with a server that would say yes, a held page never asks it and never starts a gift.
    await userEvent.click(button);
    expect(givingCalls(calls)).toEqual([]);
    expect(window.location.href).toBe("http://localhost/support");
  });

  it("carries the recipient line, the tax line and the advice line", () => {
    trpcFetch({});
    renderWithProviders(<SupportPage facts={HELD} />);
    expect(screen.getByText(HELD.recipientLine)).toBeInTheDocument();
    expect(screen.getByText(HELD.taxLine)).toBeInTheDocument();
    expect(screen.getByText(ADVICE_LINE)).toBeInTheDocument();
    expect(ADVICE_LINE).toBe("Nothing on this page is tax or financial advice.");
  });

  it("lets the amount controls be tried by keyboard", async () => {
    trpcFetch({});
    renderWithProviders(<SupportPage facts={HELD} />);
    const user = userEvent.setup();

    const how = screen.getByRole("group", { name: "How often" });
    const once = within(how).getByRole("button", { name: "One time" });
    const monthly = within(how).getByRole("button", { name: "Each month" });
    // Monthly comes first and is chosen, at $10.
    expect(within(how).getAllByRole("button").map((b) => b.textContent)).toEqual(["Each month", "One time"]);
    expect(monthly).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("A gift of $10 each month.")).toBeInTheDocument();

    once.focus();
    await user.keyboard("{Enter}");
    expect(once).toHaveAttribute("aria-pressed", "true");
    expect(monthly).toHaveAttribute("aria-pressed", "false");
    // $10 is on both lists, so the choice is kept.
    expect(screen.getByRole("button", { name: "$10" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Another amount" })).toBeInTheDocument();

    monthly.focus();
    await user.keyboard("{Enter}");
    expect(screen.getByText("A gift of $10 each month.")).toBeInTheDocument();
    // A monthly gift is one of its listed amounts: no box for another.
    expect(screen.queryByRole("button", { name: "Another amount" })).not.toBeInTheDocument();

    const amounts = screen.getByRole("group", { name: "Amount, in US dollars" });
    const fifty = within(amounts).getByRole("button", { name: "$50" });
    fifty.focus();
    await user.keyboard(" ");
    expect(fifty).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("A gift of $50 each month.")).toBeInTheDocument();
    expect(giveButton()).toHaveTextContent("Give $50 each month");
  });
});

describe("/support, open", () => {
  it("has no note and no noindex, and sends a one-time gift to Stripe", async () => {
    const { calls } = trpcFetch({ "giving.status": { data: { open: true } }, "giving.createCheckout": { data: { sessionUrl: CHECKOUT_URL } } });
    renderWithProviders(<SupportPage facts={OPEN} />);

    expect(screen.queryByRole("note")).not.toBeInTheDocument();
    expect(screen.queryByText(HELD_NOTE)).not.toBeInTheDocument();
    await waitFor(() => expect(giveButton()).toBeEnabled());
    expect(robots()).toBe("");
    expect(screen.getByText(OPEN.recipientLine)).toBeInTheDocument();
    expect(screen.getByText(OPEN.taxLine)).toBeInTheDocument();
    expect(screen.getByText(ADVICE_LINE)).toBeInTheDocument();

    // Monthly is chosen first; a one-time gift is one tap away.
    expect(giveButton()).toHaveTextContent("Give $10 each month");
    await userEvent.click(screen.getByRole("button", { name: "One time" }));
    await userEvent.click(screen.getByRole("button", { name: "$25" }));
    expect(giveButton()).toHaveTextContent("Give $25");
    await userEvent.click(giveButton());
    await waitFor(() => expect(window.location.href).toBe(CHECKOUT_URL));
    const sent = calls.find((c) => c.proc === "giving.createCheckout");
    // Only the gift is sent: no address to come back to, and nothing about the giver.
    expect(sent?.input).toEqual({ frequency: "once", amountUsd: 25 });
  });

  it("sends a monthly gift as monthly", async () => {
    const { calls } = trpcFetch({ "giving.status": { data: { open: true } }, "giving.createCheckout": { data: { sessionUrl: CHECKOUT_URL } } });
    renderWithProviders(<SupportPage facts={OPEN} />);
    await waitFor(() => expect(giveButton()).toBeEnabled());

    await userEvent.click(screen.getByRole("button", { name: "Each month" }));
    await userEvent.click(screen.getByRole("button", { name: "$5" }));
    await userEvent.click(giveButton());
    await waitFor(() => expect(window.location.href).toBe(CHECKOUT_URL));
    expect(calls.find((c) => c.proc === "giving.createCheckout")?.input).toEqual({ frequency: "monthly", amountUsd: 5 });
  });

  it("takes another amount in whole dollars, and holds one outside the limits", async () => {
    const { calls } = trpcFetch({ "giving.status": { data: { open: true } }, "giving.createCheckout": { data: { sessionUrl: CHECKOUT_URL } } });
    renderWithProviders(<SupportPage facts={OPEN} />);
    await waitFor(() => expect(giveButton()).toBeEnabled());
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "One time" }));
    await user.click(screen.getByRole("button", { name: "Another amount" }));
    const box = screen.getByLabelText("Another amount, in whole dollars");
    expect(screen.getByText("From $1 to $5,000.")).toBeInTheDocument();

    // Nothing typed yet: the button gives nothing away, and a press sends nothing.
    await user.click(giveButton());
    expect(calls.filter((c) => c.proc === "giving.createCheckout")).toEqual([]);
    expect(screen.getByRole("alert")).toHaveTextContent("Enter the amount in whole dollars.");

    for (const [typed, message] of [
      ["0", "The smallest gift this page takes is $1."],
      ["5001", "The largest gift this page takes is $5,000."],
      ["12.50", "Enter the amount in whole dollars."],
      ["abc", "Enter the amount in whole dollars."],
    ] as const) {
      await user.clear(box);
      await user.type(box, typed);
      expect(box).toHaveAccessibleDescription(message);
      expect(box).toHaveAttribute("aria-invalid", "true");
      await user.click(giveButton());
    }
    expect(calls.filter((c) => c.proc === "giving.createCheckout")).toEqual([]);
    expect(window.location.href).toBe("http://localhost/support");

    await user.clear(box);
    await user.type(box, "37");
    expect(box).not.toHaveAttribute("aria-invalid");
    expect(giveButton()).toHaveTextContent("Give $37");
    await user.click(giveButton());
    await waitFor(() => expect(window.location.href).toBe(CHECKOUT_URL));
    expect(calls.find((c) => c.proc === "giving.createCheckout")?.input).toEqual({ frequency: "once", amountUsd: 37 });
  });

  it("when the server has no Stripe key, says giving isn't open yet and shows no button", async () => {
    trpcFetch({ "giving.status": { data: { open: false } } });
    renderWithProviders(<SupportPage facts={OPEN} />);
    expect(await screen.findByText(GIVING_CLOSED_MESSAGE)).toBeInTheDocument();
    expect(GIVING_CLOSED_MESSAGE).toBe("Giving isn't open yet.");
    expect(screen.queryByRole("button", { name: /^Give/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    // The facts stay on the page whatever the card shows.
    expect(screen.getByText(OPEN.recipientLine)).toBeInTheDocument();
    expect(screen.getByText(OPEN.taxLine)).toBeInTheDocument();
    expect(screen.getByText(ADVICE_LINE)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Free to read, and it stays free." })).toBeInTheDocument();
  });

  it("when the server cannot be reached, shows the same plain state and no error", async () => {
    trpcFetch({}); // every request answers 503, as the static preview does
    renderWithProviders(<SupportPage facts={OPEN} />);
    expect(await screen.findByText(GIVING_CLOSED_MESSAGE)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^Give/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("when Stripe fails, says nothing was charged and never shows the raw error", async () => {
    trpcFetch({ "giving.status": { data: { open: true } }, "giving.createCheckout": { error: "StripeAuthenticationError: raw words", status: 500 } });
    renderWithProviders(<SupportPage facts={OPEN} />);
    await waitFor(() => expect(giveButton()).toBeEnabled());
    await userEvent.click(giveButton());
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Nothing was charged.");
    expect(alert).not.toHaveTextContent("raw words");
    expect(window.location.href).toBe("http://localhost/support");
    // The button comes back, so the giver can try again.
    await waitFor(() => expect(giveButton()).toBeEnabled());
  });

  it("will not follow an address that is not https", async () => {
    trpcFetch({ "giving.status": { data: { open: true } }, "giving.createCheckout": { data: { sessionUrl: "javascript:alert(1)" } } });
    renderWithProviders(<SupportPage facts={OPEN} />);
    await waitFor(() => expect(giveButton()).toBeEnabled());
    await userEvent.click(giveButton());
    expect(await screen.findByRole("alert")).toHaveTextContent("Nothing was charged.");
    expect(window.location.href).toBe("http://localhost/support");
  });

  it("says so, calmly, when the giver comes back without giving", async () => {
    (window.location as { search: string }).search = "?cancelled=1";
    trpcFetch({ "giving.status": { data: { open: true } } });
    renderWithProviders(<SupportPage facts={OPEN} />);
    expect(await screen.findByText("No gift was made and nothing was charged.")).toBeInTheDocument();
    await waitFor(() => expect(giveButton()).toBeEnabled());
  });
});

describe("/support/thanks", () => {
  it("thanks the giver, says how to stop a monthly gift, and is never indexed", async () => {
    trpcFetch({});
    renderWithProviders(<SupportThanks />);
    expect(screen.getByRole("heading", { level: 1, name: "Thank you" })).toBeInTheDocument();
    expect(screen.getByText(/To stop or change a monthly gift/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact page" })).toHaveAttribute("href", "/contact");
    expect(screen.getByText(ADVICE_LINE)).toBeInTheDocument();
    await waitFor(() => expect(robots()).toBe("noindex, follow"));
  });
});

describe("what the page says", () => {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const read = (rel: string) => fs.readFileSync(path.resolve(here, rel), "utf8");
  const FILES = ["./Support.tsx", "./SupportThanks.tsx", "./support/support.css", "../lib/giving.ts", "../lib/giving.json", "../../../shared/giving.ts"];

  /** The words a reader sees: string literals and JSX text, without the comments. */
  const copy = FILES.filter((f) => !f.endsWith(".css"))
    .map((f) => read(f).replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, ""))
    .join("\n");

  it("uses none of the forbidden words or phrases, no em-dash and no exclamation mark", () => {
    const FORBIDDEN = [
      "delve", "leverage", "unlock", "transformative", "navigate", "tapestry", "foster", "unpack", "landscape", "nuanced",
      "multifaceted", "authentic", "journey", "holistic", "in today's world", "now more than ever", "here's the thing",
      "i want to be real with you", "god's got this", "blessed", "gospel-centered", "hold space", "your truth", "do the work",
      "your feelings are valid", "lean into", "showing up", "impact",
    ];
    const lower = copy.toLowerCase();
    for (const word of FORBIDDEN) expect(lower.includes(word), word).toBe(false);
    expect(copy).not.toMatch(/[—–]/);
    // An exclamation mark may only be code (!x, !==), never a sentence's end.
    expect(copy).not.toMatch(/[A-Za-z]!(\s|"|<|$)/m);
  });

  it("names no organization but LiveWell and Stripe, and promises no number", () => {
    expect(copy).not.toMatch(/Pastors Connection|PCN|First Baptist|501\(c\)/);
    expect(copy).not.toMatch(/\b\d[\d,]* (readers|people|families|churches|pastors)\b/);
  });

  it("holds no secret, and no file the browser loads reads one", () => {
    for (const f of FILES) {
      const src = read(f);
      expect(src, f).not.toMatch(/sk_(live|test)_|whsec_|STRIPE_SECRET|WEBHOOK_SECRET|process\.env/);
      expect(src, f).not.toMatch(/import\.meta\.env\.[A-Z_]*(SECRET|KEY)/);
    }
    // And across the whole client: no real Stripe key, and no secret asked of the build.
    const walk = (dir: string): string[] =>
      fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
    for (const file of walk(path.resolve(here, "..")).filter((f) => /\.(ts|tsx|json|css)$/.test(f))) {
      const src = fs.readFileSync(file, "utf8");
      expect(src, file).not.toMatch(/\bsk_live_[A-Za-z0-9]{8,}|\bwhsec_[A-Za-z0-9]{8,}/);
      expect(src, file).not.toMatch(/import\.meta\.env\.VITE_[A-Z_]*(SECRET|PRIVATE)/);
    }
  });
});
