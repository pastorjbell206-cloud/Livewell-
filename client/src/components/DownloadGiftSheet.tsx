/**
 * The gift sheet: raised once when a reader asks for a download while giving
 * is open (components/DownloadGiftHost.tsx). The suggested gift is filled in;
 * the reader can pick another amount, type one, or take the plain link
 * beneath, "Download without giving". No one is blocked.
 *
 * Giving goes to Stripe's own page through `giving.createDownloadCheckout`,
 * which takes the download's id and the amount and nothing else. The file the
 * reader was fetching is remembered on this device, so /downloads/thanks can
 * start it when they come back.
 */
import { useId, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { GiftAsk } from "./DownloadGiftHost";
import { coverForDownload } from "@/lib/covers";
import { rememberPending } from "@/lib/downloadGift";
import { ADVICE_LINE, GIVING } from "@/lib/giving";
import { trpc } from "@/lib/trpc";
import ITEMS from "@shared/download-items.json";
import { DOWNLOAD_GIFT_MAX_CENTS, DOWNLOAD_GIFT_MIN_CENTS, DOWNLOAD_KINDS, downloadKind, formatUsd, giftPresetsCents, parseUsdToCents, suggestedCents } from "@shared/downloads";
import "../pages/support/support.css";
import "./download-gift.css";

const TITLES = ITEMS as Record<string, string>;

export const SKIP_LABEL = "Download without giving";
export const FAILED_MESSAGE = "The gift could not be started. Nothing was charged.";

export default function DownloadGiftSheet({ ask, onClose }: { ask: GiftAsk; onClose: () => void }) {
  const suggested = suggestedCents(ask.itemId);
  const presets = useMemo(() => giftPresetsCents(suggested), [suggested]);
  const title = TITLES[ask.itemId] ?? "This download";
  const kind = downloadKind(ask.itemId);
  const noun = kind ? DOWNLOAD_KINDS[kind].noun : "download";
  const cover = coverForDownload(ask.itemId);
  const otherId = useId();
  const errorId = useId();

  const [chosen, setChosen] = useState<number | "other">(suggested);
  const [other, setOther] = useState("");
  const [error, setError] = useState("");
  const checkout = trpc.giving.createDownloadCheckout.useMutation();

  const typed = parseUsdToCents(other);
  const amount = chosen === "other" ? typed : chosen;

  async function give() {
    if (amount === null) return setError("Enter an amount in dollars and cents, such as 5 or 8.99.");
    if (amount < DOWNLOAD_GIFT_MIN_CENTS) return setError(`The smallest gift this page takes is ${formatUsd(DOWNLOAD_GIFT_MIN_CENTS)}.`);
    if (amount > DOWNLOAD_GIFT_MAX_CENTS) return setError(`The largest gift this page takes is ${formatUsd(DOWNLOAD_GIFT_MAX_CENTS)}.`);
    setError("");
    rememberPending({ itemId: ask.itemId, href: ask.href, title });
    try {
      const res = await checkout.mutateAsync({ itemId: ask.itemId, amountCents: amount });
      if (res?.sessionUrl && /^https:\/\//.test(res.sessionUrl)) {
        window.location.assign(res.sessionUrl);
        return;
      }
      setError(FAILED_MESSAGE);
    } catch {
      setError(FAILED_MESSAGE);
    }
  }

  return (
    <Dialog.Root open onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dg-overlay" />
        <Dialog.Content className="dg-sheet" aria-describedby={undefined}>
          <div className="dg-head">
            {cover && <img className="dg-cover" src={cover.src} alt="" width={cover.width} height={cover.height} decoding="async" />}
            <div>
              <p className="eyebrow dg-eyebrow">Your download</p>
              <Dialog.Title className="dg-title">{title}</Dialog.Title>
              <p className="dg-suggest">
                Suggested gift: <strong>{formatUsd(suggested)}</strong>
              </p>
            </div>
          </div>

          <p className="dg-line">A gift with this {noun} keeps LiveWell going and helps plant churches around the world. Give what you like, or nothing.</p>

          <div className="sp-group" role="group" aria-label="Amount">
            <div className="sp-choices">
              {presets.map((cents) => (
                <button key={cents} type="button" className="sp-choice" aria-pressed={chosen === cents} onClick={() => { setChosen(cents); setError(""); }}>
                  {formatUsd(cents)}
                </button>
              ))}
            </div>
            <div className="sp-other">
              <label className="sp-other__label" htmlFor={otherId}>
                Another amount
              </label>
              <div className="sp-other__row">
                <span className="dg-dollar" aria-hidden="true">$</span>
                <input
                  id={otherId}
                  className="dg-input"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={other}
                  aria-describedby={error ? errorId : undefined}
                  aria-invalid={chosen === "other" && error ? true : undefined}
                  onChange={(e) => { setOther(e.target.value); setChosen("other"); setError(""); }}
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="dg-error" id={errorId} role="alert">
              {error}
            </p>
          )}

          <div className="dg-actions">
            <button type="button" className="btn dg-give" onClick={give} disabled={checkout.isPending}>
              {checkout.isPending ? "Opening the payment page" : amount ? `Give ${formatUsd(amount)} and download` : "Give and download"}
            </button>
            <a
              className="dg-skip"
              href={ask.href}
              data-gift-skip=""
              {...(ask.newTab ? { target: "_blank", rel: "noopener" } : {})}
              {...(ask.save ? { download: "" } : {})}
              onClick={onClose}
            >
              {SKIP_LABEL}
            </a>
          </div>

          <p className="dg-small">
            You give on Stripe's payment page, then come back here and the download starts. {GIVING.recipientLine} {GIVING.taxLine} {ADVICE_LINE}
          </p>

          <Dialog.Close className="dg-close" aria-label="Close">
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
