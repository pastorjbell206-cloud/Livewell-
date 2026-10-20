/**
 * AudienceShare: "Send to…" a skeptic, a pastor, or a spouse.
 *
 * Bell's three-audience model (skeptic / pastor / spouse) is unique in the
 * theology field. The share menu honors it: each choice opens the reader's
 * own email app with a note suited to that relationship, and the subject
 * line names the essay.
 *
 * The menu here and CitationCopy's share one behavior (useShareMenu): it
 * opens under its button but always inside the screen, because on a phone
 * the button can land at either end of a wrapped row; and it closes on
 * Escape, on a tap or click outside it, and when focus moves on.
 */
import { useEffect, useId, useRef, useState, type CSSProperties, type FocusEvent, type RefObject } from "react";
import { Mail, Send, Users } from "lucide-react";

interface AudienceShareProps {
  title: string;
  url: string;
}

type Recipient = "skeptic" | "pastor" | "spouse";

const NOTES: Record<Recipient, { label: string; icon: typeof Mail; subject: string; body: string }> = {
  skeptic: {
    label: "Send to a skeptic",
    icon: Send,
    subject: "Saw this and thought of you",
    body: "Not trying to convert you, but this essay takes the questions seriously. Curious what you'd push back on.\n\n",
  },
  pastor: {
    label: "Send to a pastor",
    icon: Users,
    subject: "Thought you might want to read this",
    body: "I read this and thought of you. From a pastor who knows the work.\n\n",
  },
  spouse: {
    label: "Send to your spouse",
    icon: Mail,
    subject: "Read this when you have ten quiet minutes",
    body: "I want to talk about this when we get a minute.\n\n",
  },
};

/** The email a reader sends to one of the three: the note, the essay's title and link. */
export function audienceMailto(recipient: Recipient, title: string, url: string): string {
  const { subject, body } = NOTES[recipient];
  const fullBody = `${body}"${title}"\n${url}\n\nForwarded from LiveWell by James Bell`;
  return `mailto:?subject=${encodeURIComponent(`${subject}: "${title}"`)}&body=${encodeURIComponent(fullBody)}`;
}

// ── The shared menu behavior ──────────────────────────────────────────────

/** Space kept between a menu and the edge of the screen. */
const EDGE = 16;
const MENU_WIDTH = 280;

/**
 * Where a menu sits under its button: as wide as the screen allows (up to
 * 280px), starting at the button's left edge unless that would run past
 * either side of the screen. `left` is relative to the button.
 */
export function menuPlacement(buttonLeft: number, screenWidth: number): { left: number; width: number } {
  const width = Math.max(0, Math.min(MENU_WIDTH, screenWidth - EDGE * 2));
  const left = Math.min(Math.max(buttonLeft, EDGE), screenWidth - EDGE - width);
  return { left: Math.round(left - buttonLeft), width };
}

function placeUnder(button: HTMLElement | null) {
  const screen = document.documentElement.clientWidth || window.innerWidth;
  return menuPlacement(button?.getBoundingClientRect().left ?? 0, screen);
}

/**
 * Open, close, and placement for a share menu: a button and the panel it
 * discloses, both inside `wrapRef` (the positioned wrapper). The caller owns
 * the refs and puts them on the elements.
 */
export function useShareMenu(wrapRef: RefObject<HTMLElement | null>, buttonRef: RefObject<HTMLButtonElement | null>) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState({ left: 0, width: MENU_WIDTH });
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onResize = () => setPlacement(placeUnder(buttonRef.current));
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointer = (e: Event) => {
      if (wrapRef.current && e.target instanceof Node && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, wrapRef, buttonRef]);

  const toggle = () => {
    if (!open) setPlacement(placeUnder(buttonRef.current));
    setOpen(!open);
  };

  // Tabbing past the last item closes the menu. A blur with nowhere to go
  // (Safari does not focus a clicked button) is left to the outside-tap rule,
  // or the menu would vanish before the click inside it landed.
  const onBlur = (e: FocusEvent<HTMLElement>) => {
    const next = e.relatedTarget;
    if (next instanceof Node && !e.currentTarget.contains(next)) setOpen(false);
  };

  const menuStyle: CSSProperties = {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: `${placement.left}px`,
    width: `${placement.width}px`,
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    boxShadow: "var(--shadow-modal)",
    padding: "6px",
    zIndex: 20,
    textAlign: "left",
  };

  return { open, setOpen, toggle, onBlur, menuId, menuStyle };
}

/** The button that opens a share menu: a 44px target, quieter than the primary action beside it. */
export const shareTrigger: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  minHeight: "44px",
  padding: "10px 16px",
  background: "transparent",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  fontFamily: "var(--U)",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: 1.2,
  color: "var(--ink-muted)",
  cursor: "pointer",
  textDecoration: "none",
};

/** One choice inside a share menu, a full-width 44px row. */
export const shareMenuItem: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  width: "100%",
  minHeight: "44px",
  padding: "10px 12px",
  background: "transparent",
  border: "none",
  borderRadius: "var(--radius-sm)",
  fontFamily: "var(--U)",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: 1.3,
  color: "var(--ink)",
  textAlign: "left",
  textDecoration: "none",
  cursor: "pointer",
};

export function AudienceShare({ title, url }: AudienceShareProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menu = useShareMenu(wrapRef, buttonRef);

  return (
    <div ref={wrapRef} onBlur={menu.onBlur} style={{ position: "relative", display: "inline-block" }}>
      <button
        ref={buttonRef}
        type="button"
        onClick={menu.toggle}
        aria-expanded={menu.open}
        aria-controls={menu.open ? menu.menuId : undefined}
        style={shareTrigger}
      >
        <Mail size={16} aria-hidden />
        Send to…
      </button>
      {menu.open && (
        <div id={menu.menuId} style={menu.menuStyle}>
          {(Object.keys(NOTES) as Recipient[]).map((recipient) => {
            const Icon = NOTES[recipient].icon;
            return (
              <a
                key={recipient}
                href={audienceMailto(recipient, title, url)}
                onClick={() => menu.setOpen(false)}
                style={shareMenuItem}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bone-warm)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <Icon size={16} aria-hidden style={{ color: "var(--mustard-text)", flexShrink: 0 }} />
                {NOTES[recipient].label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AudienceShare;
