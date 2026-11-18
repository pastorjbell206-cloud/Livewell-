/**
 * ConfirmOnSubstack: what every signup form shows once this site has saved
 * the email. The essays are sent by Substack, which has no signup API, so a
 * saved address here is not yet a subscription. The form says so and hands
 * the reader the one link that finishes it (lib/site substackSubscribeUrl,
 * with the email filled in).
 */
import { substackSubscribeUrl } from "@/lib/site";

export function ConfirmOnSubstack({
  email,
  source,
  onDark = false,
  style,
}: {
  email: string;
  /** Where the form sat; carried to Substack as a tracking tag only. */
  source?: string;
  onDark?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <p
      role="status"
      style={{
        fontFamily: "var(--B)",
        fontSize: "15px",
        lineHeight: 1.6,
        color: onDark ? "var(--charcoal-fg-muted)" : "var(--ink-muted)",
        margin: 0,
        ...style,
      }}
    >
      One more step. Your email is saved here, and the essays are sent from Substack.{" "}
      <a
        href={substackSubscribeUrl(email, source)}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: onDark ? "var(--mustard)" : "var(--ink)",
          textDecoration: "underline",
          textDecorationColor: "var(--mustard)",
          textUnderlineOffset: "3px",
          fontWeight: 600,
        }}
      >
        Confirm on Substack
      </a>{" "}
      to start getting them.
    </p>
  );
}

export default ConfirmOnSubstack;
