/**
 * Sheet: a panel that opens over the page without leaving it. On a phone it
 * rises from the bottom, where the thumb already is; from 1024 px it opens as
 * a panel at the right edge, so the page stays readable beside it. The first
 * use is the verse sheet (VerseRef); history entities and other short lookups
 * follow.
 *
 * Built on the Radix dialog already installed (vendor-ui chunk): focus is
 * trapped inside while it is open, Escape and the Close button close it, the
 * page behind is hidden from assistive technology and does not scroll, and
 * focus goes back to whatever opened it. On open, focus lands on the panel
 * itself rather than its first button, so a screen reader starts at the title
 * and Tab reaches Close next.
 *
 * Controlled (`open` + `onOpenChange`) or self-contained with a `trigger`
 * element. Styles live in index.css (.st-sheet*), tokens only.
 */
import { useRef, type ReactElement, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export function Sheet({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  closeLabel = "Close",
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** One element (a button) that opens the sheet; omit when `open` is controlled. */
  trigger?: ReactElement;
  /** The sheet's name: the heading at its top and its accessible name. */
  title: ReactNode;
  /** One short line under the title, read out with the name. */
  description?: ReactNode;
  children?: ReactNode;
  /** Actions pinned below the scrolling body ("Open in the Study Bible"). */
  footer?: ReactNode;
  closeLabel?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  // Where focus was when the sheet opened. A controlled sheet has no Radix
  // trigger to return to, so it goes back here instead of to the page body.
  const returnTo = useRef<HTMLElement | null>(null);

  return (
    <Dialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="st-sheet-overlay" />
        <Dialog.Content
          ref={panelRef}
          className="st-sheet"
          aria-modal="true"
          {...(description ? {} : { "aria-describedby": undefined })}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            const active = document.activeElement;
            returnTo.current = active instanceof HTMLElement && active !== document.body ? active : null;
            panelRef.current?.focus();
          }}
          onCloseAutoFocus={(e) => {
            const back = returnTo.current;
            returnTo.current = null;
            if (back && back.isConnected) {
              e.preventDefault();
              back.focus();
            }
          }}
        >
          <div className="st-sheet__head">
            <div className="st-sheet__heading">
              <Dialog.Title className="st-sheet__title">{title}</Dialog.Title>
              {description && <Dialog.Description className="st-sheet__desc">{description}</Dialog.Description>}
            </div>
            <Dialog.Close className="st-sheet__close">{closeLabel}</Dialog.Close>
          </div>
          <div className="st-sheet__body">{children}</div>
          {footer && <div className="st-sheet__foot">{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
