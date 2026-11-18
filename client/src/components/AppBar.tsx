/**
 * AppBar: the bar at the foot of the screen when LiveWell is opened from its
 * icon on a phone (display-mode: standalone, so there is no browser bar). It
 * holds the five things a returning reader does: Home, the Bible, tonight's
 * devotion, Search, and My Library. The header's Back button
 * (components/AppBack.tsx) gives every page a way back.
 *
 * Loaded on its own (App.tsx), only once the page is known to be running
 * from the icon, so a reader in a browser pays nothing for it. While it
 * shows, the html element carries `lw-standalone` and --lw-appbar-h, and the
 * site's own bottom bars and panels sit above it (index.css, app-bar.css).
 */
import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, BookmarkCheck, Flame, House, Search } from "lucide-react";
import "./app-bar.css";

const ITEMS = [
  { name: "Home", href: "/", icon: House, match: (p: string) => p === "/" },
  { name: "Bible", href: "/study/bible", icon: BookOpen, match: (p: string) => p === "/study" || p.startsWith("/study/") },
  { name: "Tonight", href: "/family/tonight", icon: Flame, match: (p: string) => p.startsWith("/family/tonight") },
  { name: "Search", href: "/search", icon: Search, match: (p: string) => p.startsWith("/search") },
  { name: "My Library", href: "/my-library", icon: BookmarkCheck, match: (p: string) => p.startsWith("/my-library") },
];

export default function AppBar() {
  const [location] = useLocation();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("lw-standalone");
    return () => html.classList.remove("lw-standalone");
  }, []);

  return (
    <nav className="lw-appbar" aria-label="App">
      <ul className="lw-appbar__list">
        {ITEMS.map(({ name, href, icon: Icon, match }) => {
          const current = match(location);
          return (
            <li key={href}>
              <Link href={href} className="lw-appbar__item" aria-current={current ? "page" : undefined}>
                <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                <span>{name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
