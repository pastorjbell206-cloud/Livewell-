import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import "./StickyNavigation.css";

export default function StickyNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="sticky-nav">
      <div className="sticky-nav__container">
        <Link href="/" className="sticky-nav__logo" onClick={closeMobile}>
          <span className="sticky-nav__logo-primary">LiveWell</span>
          <span className="sticky-nav__logo-sub">by James Bell</span>
        </Link>

        <ul className="sticky-nav__menu">
          <li className="sticky-nav__item">
            <Link href="/writing" className="sticky-nav__link">
              Articles
            </Link>
          </li>
          <li className="sticky-nav__item">
            <Link href="/books" className="sticky-nav__link">
              Books
            </Link>
          </li>
          <li className="sticky-nav__item">
            <Link href="/for-families" className="sticky-nav__link">
              For Families
            </Link>
          </li>
          <li className="sticky-nav__item">
            <a
              href="https://pastorsconnectionnetwork.com"
              target="_blank"
              rel="noopener noreferrer"
              className="sticky-nav__link"
            >
              For Pastors
            </a>
          </li>
          <li className="sticky-nav__item">
            <Link href="/work-with-james" className="sticky-nav__link">
              Work With James
            </Link>
          </li>
        </ul>

        <button
          className="sticky-nav__hamburger"
          onClick={toggleMobile}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="sticky-nav__mobile">
          <ul className="sticky-nav__mobile-menu">
            <li>
              <Link href="/writing" className="sticky-nav__mobile-link" onClick={closeMobile}>
                Articles
              </Link>
            </li>
            <li>
              <Link href="/books" className="sticky-nav__mobile-link" onClick={closeMobile}>
                Books
              </Link>
            </li>
            <li>
              <Link href="/for-families" className="sticky-nav__mobile-link" onClick={closeMobile}>
                For Families
              </Link>
            </li>
            <li>
              <a
                href="https://pastorsconnectionnetwork.com"
                target="_blank"
                rel="noopener noreferrer"
                className="sticky-nav__mobile-link"
                onClick={closeMobile}
              >
                For Pastors
              </a>
            </li>
            <li>
              <Link href="/work-with-james" className="sticky-nav__mobile-link" onClick={closeMobile}>
                Work With James
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
