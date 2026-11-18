/**
 * SectionHead: the top of a section inside a page. An icon (lucide-react,
 * stroke 1.75), a small label, the section's title (an H2 on the shared
 * scale, --fs-h2), and an optional link to the rest. On a charcoal band it
 * takes the band's colours from its parent (.lw-sec-head inside .home-sec--dark
 * or any element with the --dark modifier).
 */
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function SectionHead({
  icon: Icon,
  label,
  title,
  id,
  link,
  dark = false,
}: {
  icon?: LucideIcon;
  label?: string;
  title: string;
  /** The H2's id, for the section's aria-labelledby. */
  id?: string;
  link?: { href: string; label: string };
  dark?: boolean;
}) {
  return (
    <div className={`lw-sec-head${dark ? " lw-sec-head--dark" : ""}`}>
      <div>
        {label && (
          <p className="lw-sec-head__label">
            {Icon && <Icon aria-hidden="true" size={18} strokeWidth={1.75} />}
            {label}
          </p>
        )}
        <h2 id={id} className="lw-sec-head__title">
          {title}
        </h2>
      </div>
      {link && (
        <Link href={link.href} className="lw-sec-head__link">
          {link.label} <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
        </Link>
      )}
    </div>
  );
}
