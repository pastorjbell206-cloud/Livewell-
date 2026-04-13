import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

export default function MinimalNav() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { label: "Writing", href: "/writing" },
    { label: "Books", href: "/books" },
    { label: "Resources", href: "/resources" },
    { label: "Membership", href: "/membership" },
    { label: "About", href: "/about" },
  ];

  const isActive = (href: string) => location === href || location.startsWith(href + "/");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = "/writing?q=" + encodeURIComponent(searchQuery.trim());
    }
    setSearchOpen(false);
  };

  return (
    <>
      {/* Search Overlay */}
      {searchOpen && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(26,51,40,0.96)", zIndex: 500, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "120px" }}
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
        >
          <div style={{ width: "100%", maxWidth: "680px", padding: "0 32px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "16px" }}>SEARCH ARTICLES</p>
            <form onSubmit={handleSearch}>
              <input
                autoFocus
                type="text"
                placeholder="Search 880+ essays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "100%", background: "transparent", border: "none", borderBottom: "2px solid #B8963E", fontSize: "clamp(28px,4vw,48px)", color: "white", outline: "none", padding: "8px 0 16px", caretColor: "#B8963E", fontFamily: "Georgia, serif" }}
              />
            </form>
            <div style={{ display: "flex", gap: "10px", marginTop: "24px", flexWrap: "wrap" }}>
              {["Pastoral Ministry", "Marriage", "Theology", "Justice", "Parenting"].map((tag) => (
                <Link
                  key={tag}
                  href={"/writing?topic=" + tag.toLowerCase().replace(/ /g, "-")}
                  onClick={() => setSearchOpen(false)}
                  style={{ fontSize: "12px", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)", padding: "6px 14px", borderRadius: "20px", textDecoration: "none" }}
                >
                  {tag}
                </Link>
              ))}
            </div>
            <button onClick={() => setSearchOpen(false)} style={{ position: "fixed", top: "32px", right: "40px", color: "rgba(255,255,255,0.45)", fontSize: "30px", background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}>×</button>
          </div>
        </div>
      )}

      {/* Main Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 200, background: "#1A1A1A", borderBottom: "1px solid #2D4A3E", width: "100%" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "64px" }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#B8963E", cursor: "pointer", fontFamily: "Georgia, serif" }}>LiveWell</div>
          </Link>

          {/* Desktop Nav Links */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                <span style={{
                  color: isActive(link.href) ? "#B8963E" : "#F7F5F0",
                  fontSize: "13.5px",
                  padding: "8px 14px",
                  borderRadius: "3px",
                  display: "block",
                  transition: "color 0.2s",
                  fontWeight: isActive(link.href) ? "600" : "400",
                  borderBottom: isActive(link.href) ? "2px solid #B8963E" : "2px solid transparent"
                }}>
                  {link.label}
                </span>
              </Link>
            ))}

            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              style={{ background: "none", border: "none", color: "#F7F5F0", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center" }}
              aria-label="Search essays"
            >
              <Search size={18} />
            </button>

            {/* CTA */}
            <Link href="/membership" style={{ textDecoration: "none" }}>
              <button style={{ background: "#B8963E", color: "#1A1A1A", border: "none", padding: "9px 20px", fontSize: "13px", fontWeight: "bold", borderRadius: "3px", cursor: "pointer", marginLeft: "8px" }}>
                Join Free
              </button>
            </Link>
          </div>

          {/* Mobile: search + hamburger */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }} className="mobile-nav">
            <button onClick={() => setSearchOpen(true)} style={{ background: "none", border: "none", color: "#F7F5F0", cursor: "pointer", padding: "8px" }} aria-label="Search">
              <Search size={20} />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", color: "#F7F5F0", cursor: "pointer", padding: "8px" }} aria-label="Menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{ background: "#1A1A1A", borderTop: "1px solid #2D4A3E", padding: "16px 20px 24px" }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{ textDecoration: "none" }}>
                <div style={{ color: isActive(link.href) ? "#B8963E" : "#F7F5F0", fontSize: "16px", padding: "12px 0", borderBottom: "1px solid #2D4A3E", fontWeight: isActive(link.href) ? "600" : "400" }}>
                  {link.label}
                </div>
              </Link>
            ))}
            <Link href="/membership" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none" }}>
              <button style={{ background: "#B8963E", color: "#1A1A1A", border: "none", padding: "12px 24px", fontSize: "14px", fontWeight: "bold", borderRadius: "3px", cursor: "pointer", width: "100%", marginTop: "16px" }}>
                Join Free
              </button>
            </Link>
          </div>
        )}
      </nav>

      <style>{
        "@media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-nav { display: flex !important; } }" +
        "@media (min-width: 769px) { .mobile-nav { display: none !important; } .desktop-nav { display: flex !important; } }"
      }</style>
    </>
  );
}
