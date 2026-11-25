/**
 * /support: "Support this work" (James, 2026-11-21: "let's do the Bible
 * Project way", everything free and supporters give; "gifts go to keep the
 * work going").
 *
 * BUILT AND HELD. The page is whole and its checkout works, but it stays out
 * of every menu, the sitemap, the search index and llms.txt, says noindex,
 * and cannot start a gift until the one switch in lib/giving.json is turned
 * (docs/work/elite/giving.md). Who receives a gift is settled (James,
 * 2026-11-21: "gifts go to me personally"); what waits is the payment
 * account, the Stripe key set in Vercel.
 *
 * The four states of the give card:
 *   held      the switch is off: the controls can be tried, the note is at
 *             the top of the page, the give button is disabled.
 *   checking  the switch is on and the server has not answered yet.
 *   closed    the switch is on but the server has no Stripe key (or cannot
 *             be reached): "Giving isn't open yet.", and no button at all.
 *   ready     a gift can start: the button sends the giver to Stripe's page.
 *
 * Nothing about a giver is kept here. Stripe asks for the card, the name and
 * the email on its own page and holds the record. The amounts and the one
 * check are shared with both server runtimes (shared/giving.ts).
 *
 * The page says only what can be checked on the site: no numbers of readers,
 * no promises, nothing written in James's own voice.
 */
import { useId, useRef, useState, type FormEvent } from "react";
import { Link, useSearch } from "wouter";
import { BookOpen, HandHeart, HeartHandshake, Library, Map as MapIcon, MessageCircleQuestion, Moon, Send, Server, Share2, Users } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import SectionHead from "@/components/art/SectionHead";
import IconTile from "@/components/art/IconTile";
import { trpc } from "@/lib/trpc";
import { ADVICE_LINE, GIVING, HELD_NOTE, SUPPORT_PATH, type GivingFacts } from "@/lib/giving";
import { entryById } from "@/lib/siteCatalog";
import {
  GIFT_MAX_USD,
  GIFT_MIN_USD,
  GIFT_MONTHLY_PRESETS_USD,
  GIFT_ONCE_PRESETS_USD,
  GIVING_CLOSED_MESSAGE,
  checkGift,
  describeGift,
  type GiftFrequency,
} from "@shared/giving";
import "./support/support.css";

export type GiveState = "held" | "checking" | "closed" | "ready";

const FAILED = "The gift could not be started. Nothing was charged. Try again in a moment, or write through the Contact page.";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/** What is on the site today, each under its catalogue name and line, with its own page. */
const KEPT = [
  { id: "bible.read", icon: BookOpen },
  { id: "bible.explorer", icon: MapIcon },
  { id: "questions.answers", icon: MessageCircleQuestion },
  { id: "questions.case", icon: Library },
  { id: "family.devotions", icon: Moon },
] as const;

const FREE_WAYS = [
  { icon: Share2, name: "Share a page", line: "Send one page that helped you to one person who could use it." },
  { icon: HandHeart, name: "Pray", line: "Pray for the people who read here, and for James as he writes." },
  { icon: Users, name: "Tell a pastor", line: "If a page would serve your church, tell your pastor it is here and free." },
];

/** The give card: how often, how much, and the one button. */
export function GiveForm({ state, facts, cancelled = false }: { state: GiveState; facts: GivingFacts; cancelled?: boolean }) {
  const [frequency, setFrequency] = useState<GiftFrequency>("once");
  const [amount, setAmount] = useState<number | "other">(25);
  const [other, setOther] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const otherRef = useRef<HTMLInputElement | null>(null);
  const ids = useId();
  const checkout = trpc.giving.createCheckout.useMutation();

  const presets: readonly number[] = frequency === "monthly" ? GIFT_MONTHLY_PRESETS_USD : GIFT_ONCE_PRESETS_USD;
  const otherTrimmed = other.trim().replace(/^\$/, "").replace(/,/g, "");
  const amountUsd = amount === "other" ? (/^\d+$/.test(otherTrimmed) ? Number(otherTrimmed) : NaN) : amount;
  const checked = checkGift({ frequency, amountUsd });
  // While the other-amount box is still empty there is nothing to correct yet.
  const typing = amount === "other" && otherTrimmed === "";
  const fieldError = amount === "other" && !typing && !checked.ok ? checked.error : null;

  function choose(next: GiftFrequency) {
    setFrequency(next);
    setError(null);
    const list: readonly number[] = next === "monthly" ? GIFT_MONTHLY_PRESETS_USD : GIFT_ONCE_PRESETS_USD;
    // A monthly gift is one of its listed amounts; keep the choice when both lists hold it.
    if (amount === "other" || !list.includes(amount)) setAmount(next === "monthly" ? 10 : 25);
  }

  async function give(e: FormEvent) {
    e.preventDefault();
    if (state !== "ready" || sending) return;
    setError(null);
    if (!checked.ok) {
      setError(checked.error);
      if (amount === "other") otherRef.current?.focus();
      return;
    }
    setSending(true);
    try {
      const res = await checkout.mutateAsync(checked.gift);
      if (res?.sessionUrl && /^https:\/\//.test(res.sessionUrl)) {
        window.location.assign(res.sessionUrl);
        return;
      }
      setError(FAILED);
    } catch {
      setError(FAILED);
    }
    setSending(false);
  }

  // The facts stay on the card in every state, the closed one included.
  const factsBlock = (
    <div className="sp-facts">
      <p>The next page belongs to Stripe, the company that handles the payment. You enter your card there. LiveWell never sees your card number and keeps no record of who gives.</p>
      <p data-fact="recipient">{facts.recipientLine}</p>
      <p data-fact="tax">{facts.taxLine}</p>
      <p data-fact="advice">{ADVICE_LINE}</p>
      <p>
        To stop or change a monthly gift, write through the <Link href="/contact">Contact page</Link>. LiveWell has no account to sign in to, so that is the way to do it.
      </p>
    </div>
  );

  if (state === "closed") {
    return (
      <div className="sp-card" data-give-state="closed">
        <p className="sp-closed" role="status">
          {GIVING_CLOSED_MESSAGE}
        </p>
        <p className="sp-small">Everything on LiveWell is free to read, now and after giving opens.</p>
        {factsBlock}
      </div>
    );
  }

  const label = checked.ok
    ? checked.gift.frequency === "monthly"
      ? `Give ${usd(checked.gift.amountUsd)} each month`
      : `Give ${usd(checked.gift.amountUsd)}`
    : "Give";

  return (
    <form className="sp-card" onSubmit={give} noValidate data-give-state={state}>
      {cancelled && (
        <p className="sp-notice" role="status">
          No gift was made and nothing was charged.
        </p>
      )}

      <div role="group" aria-labelledby={`${ids}-how`} className="sp-group">
        <p id={`${ids}-how`} className="sp-legend">
          How often
        </p>
        <div className="sp-choices sp-choices--two">
          <button type="button" className="sp-choice" aria-pressed={frequency === "once"} onClick={() => choose("once")}>
            One time
          </button>
          <button type="button" className="sp-choice" aria-pressed={frequency === "monthly"} onClick={() => choose("monthly")}>
            Each month
          </button>
        </div>
      </div>

      <div role="group" aria-labelledby={`${ids}-amt`} className="sp-group">
        <p id={`${ids}-amt`} className="sp-legend">
          Amount, in US dollars
        </p>
        <div className="sp-choices">
          {presets.map((n) => (
            <button
              key={n}
              type="button"
              className="sp-choice"
              aria-pressed={amount === n}
              onClick={() => {
                setAmount(n);
                setError(null);
              }}
            >
              {usd(n)}
            </button>
          ))}
          {frequency === "once" && (
            <button
              type="button"
              className="sp-choice"
              aria-pressed={amount === "other"}
              onClick={() => {
                setAmount("other");
                setError(null);
              }}
            >
              Another amount
            </button>
          )}
        </div>
        {frequency === "once" && amount === "other" && (
          <div className="sp-other">
            <label htmlFor={`${ids}-other`} className="sp-other__label">
              Another amount, in whole dollars
            </label>
            <div className="sp-other__row">
              <span className="sp-other__sign" aria-hidden="true">
                $
              </span>
              <input
                ref={otherRef}
                id={`${ids}-other`}
                className="sp-other__input"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={other}
                onChange={(e) => {
                  setOther(e.target.value);
                  setError(null);
                }}
                aria-describedby={`${ids}-other-hint`}
                aria-invalid={fieldError ? true : undefined}
              />
            </div>
            <p id={`${ids}-other-hint`} className="sp-small">
              {fieldError ?? `From ${usd(GIFT_MIN_USD)} to ${usd(GIFT_MAX_USD)}.`}
            </p>
          </div>
        )}
      </div>

      <p className="sp-summary" aria-live="polite">
        {checked.ok ? `${describeGift(checked.gift)}.` : " "}
      </p>

      <button type="submit" className="btn sp-give" disabled={state !== "ready" || sending} aria-describedby={state === "held" ? "sp-held-note" : undefined}>
        <HeartHandshake size={20} strokeWidth={1.75} aria-hidden="true" />
        {sending ? "Opening Stripe" : label}
      </button>
      {state === "held" && <p className="sp-small">This button is off until the page opens.</p>}
      {state === "checking" && (
        <p className="sp-small" role="status">
          Checking that giving is open.
        </p>
      )}
      {error && (
        <p className="sp-error" role="alert">
          {error}
        </p>
      )}

      {factsBlock}
    </form>
  );
}

/** The whole page, for a given set of facts (the tests render both states). */
export function SupportPage({ facts = GIVING }: { facts?: GivingFacts }) {
  const cancelled = new URLSearchParams(useSearch()).get("cancelled") === "1";
  const status = trpc.giving.status.useQuery(undefined, { enabled: facts.open, staleTime: 60_000 });
  const state: GiveState = !facts.open ? "held" : status.isLoading ? "checking" : status.data?.open === true ? "ready" : "closed";

  return (
    <Layout>
      <SEOMeta
        title="Support This Work"
        description="LiveWell is free to read and stays free. Readers who want to help keep it going can give once or each month."
        url="https://www.livewellbyjamesbell.co/support"
        noindex={!facts.open}
      />

      <InnerHead
        path={SUPPORT_PATH}
        title="Support this work"
        line="LiveWell is free to read and stays free. Gifts from readers keep it going."
        plate="jar"
        width="var(--w-content)"
      >
        {!facts.open && (
          <p id="sp-held-note" className="sp-held" role="note">
            {HELD_NOTE}
          </p>
        )}
      </InnerHead>

      <section className="home-sec sp-sec" aria-labelledby="sp-free-title">
        <div className="sp-wrap">
          <SectionHead icon={BookOpen} label="Free" title="Free to read, and it stays free." id="sp-free-title" />
          <div className="sp-prose">
            <p>Everything on LiveWell is free: the Study Bible, the tools, the essays and the ebooks. There is no membership, no paywall and no account to open.</p>
            <p>A gift buys nothing. Every page is already open to you, and it stays open whether you give or not.</p>
          </div>
        </div>
      </section>

      <section className="home-sec home-sec--warm sp-sec" aria-labelledby="sp-give-title">
        <div className="sp-wrap">
          <SectionHead icon={HeartHandshake} label="Give" title="Give once, or each month." id="sp-give-title" />
          <GiveForm state={state} facts={facts} cancelled={cancelled} />
        </div>
      </section>

      <section className="home-sec sp-sec" aria-labelledby="sp-kept-title">
        <div className="sp-wrap">
          <SectionHead icon={Server} label="What gifts keep going" title="The work is what you see here." id="sp-kept-title" />
          <div className="sp-prose">
            <p>Gifts go to keep the work going. That is the pages below and the rest of the site, and the hosting that keeps all of it online. What is left after those costs goes to planting churches around the world.</p>
          </div>
          <ul className="lw-tiles sp-tiles">
            {KEPT.map(({ id, icon }) => {
              const e = entryById(id);
              return e ? (
                <li key={id}>
                  <IconTile href={e.href} icon={icon} name={e.name} line={e.line} />
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </section>

      <section className="home-sec home-sec--dark sp-sec" aria-labelledby="sp-ways-title">
        <div className="sp-wrap">
          <SectionHead icon={Send} label="Without money" title="Other ways to help that cost nothing." id="sp-ways-title" dark />
          <ul className="sp-ways">
            {FREE_WAYS.map(({ icon: Icon, name, line }) => (
              <li key={name} className="sp-way">
                <span className="sp-way__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <span>
                  <span className="sp-way__name">{name}</span>
                  <span className="sp-way__line">{line}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}

export default function Support() {
  return <SupportPage />;
}
