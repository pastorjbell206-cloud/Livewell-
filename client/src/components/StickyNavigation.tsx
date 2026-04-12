import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import "./StickyNavigation.css";

export default function StickyNavigation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className="sticky-nav">
      <div className="sticky-nav__container">
        {/* Logo/Brand */}
        <Link href="/" className="sticky-nav__logo">
          <span>LiveWell</span>
        </Link>

        {/* Main Navigation */}
        <ul className="sticky-nav__menu">
          {/* Writing Dropdown */}
          <li className="sticky-nav__item">
            <button
              className="sticky-nav__link sticky-nav__link--dropdown"
              onClick={() => toggleDropdown("writing")}
              onMouseEnter={() => setOpenDropdown("writing")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              Writing
              <ChevronDown size={16} />
            </button>
            {openDropdown === "writing" && (
              <div
                className="sticky-nav__dropdown"
                onMouseEnter={() => setOpenDropdown("writing")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link href="/writing" onClick={closeDropdown} className="sticky-nav__dropdown-item">
                  All Articles
                </Link>
                <Link href="/reading-paths" onClick={closeDropdown} className="sticky-nav__dropdown-item">
                  Reading Paths
                </Link>
                <a
                  href="https://substack.com/@jamesbell333289"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sticky-nav__dropdown-item"
                  onClick={closeDropdown}
                >
                  Substack Newsletter
                </a>
              </div>
            )}
          </li>

          {/* Books Dropdown */}
          <li className="sticky-nav__item">
            <button
              className="sticky-nav__link sticky-nav__link--dropdown"
              onClick={() => toggleDropdown("books")}
              onMouseEnter={() => setOpenDropdown("books")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              Books
              <ChevronDown size={16} />
            </button>
            {openDropdown === "books" && (
              <div
                className="sticky-nav__dropdown"
                onMouseEnter={() => setOpenDropdown("books")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link href="/books" onClick={closeDropdown} className="sticky-nav__dropdown-item">
                  All Books
                </Link>
                <Link href="/books-store" onClick={closeDropdown} className="sticky-nav__dropdown-item">
                  Book Store
                </Link>
                <a
                  href="https://www.amazon.com/s?k=james+bell+author"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sticky-nav__dropdown-item"
                  onClick={closeDropdown}
                >
                  Amazon
                </a>
              </div>
            )}
          </li>

          {/* Resources */}
          <li className="sticky-nav__item">
            <Link href="/resources" className="sticky-nav__link" onClick={closeDropdown}>
              Resources
            </Link>
          </li>

          {/* Membership */}
          <li className="sticky-nav__item">
            <Link href="/membership" className="sticky-nav__link" onClick={closeDropdown}>
              Membership
            </Link>
          </li>

          {/* About Dropdown */}
          <li className="sticky-nav__item">
            <button
              className="sticky-nav__link sticky-nav__link--dropdown"
              onClick={() => toggleDropdown("about")}
              onMouseEnter={() => setOpenDropdown("about")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              About
              <ChevronDown size={16} />
            </button>
            {openDropdown === "about" && (
              <div
                className="sticky-nav__dropdown"
                onMouseEnter={() => setOpenDropdown("about")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link href="/about" onClick={closeDropdown} className="sticky-nav__dropdown-item">
                  About James Bell
                </Link>
                <a
                  href="https://pastorsconnectionnetwork.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sticky-nav__dropdown-item"
                  onClick={closeDropdown}
                >
                  Pastors Connection Network
                </a>
                <a
                  href="https://www.firstbaptistfenton.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sticky-nav__dropdown-item"
                  onClick={closeDropdown}
                >
                  First Baptist Fenton
                </a>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
