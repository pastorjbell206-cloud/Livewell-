/**
 * IconTile: a small tile for a page that sits one step past a door's rooms.
 * An icon (lucide-react, stroke 1.75) in a ruled square, the page's name, and
 * one short line. The whole tile is one link, at least 44px tall. Lay several
 * out in a list with class "lw-tiles".
 */
import type { LucideIcon } from "lucide-react";
import { Link } from "wouter";

export default function IconTile({ href, icon: Icon, name, line }: { href: string; icon: LucideIcon; name: string; line?: string }) {
  return (
    <Link href={href} className="lw-tile">
      <span className="lw-tile__icon" aria-hidden="true">
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <span className="lw-tile__text">
        <span className="lw-tile__name">{name}</span>
        {line && <span className="lw-tile__line">{line}</span>}
      </span>
    </Link>
  );
}
