import { Link, useLocation } from "wouter";
import { useState, useRef, useEffect } from "react";
import { Search, Menu, X, ChevronDown } from "lucide-react";

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavLink {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

// Design token: gold = var(--gold) / #D4A017 — keep in sync with index.css :root
export default function MinimalNav() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks: NavLink[] = [
    {
      label: "Marriage & Family",
      dropdown: [
        { label: "Marriage", href: "/marriage", description: "Covenant, conflict, and costly love" },
        { label: "Parenting", href: "/parenting", description: "Raising kids who think and believe" },
        { label: "Family Devotions", href: "/writing?topic=devotionals", description: "Daily readings for your family" },
        { label: "All Family Articles", href: "/writing?topic=marriage", description: "Browse all marriage & family writing" },
      ]
    },
    {
      label: "Faith & Theology",
      dropdown: [
        { label: "Doubt & Questions", href: "/doubt", description: "When the questions won't stop" },
        { label: "Theological Depth", href: "/writing?topic=theology", description: "Greek, Hebrew, and hard questions" },
        { label: "Spiritual Growth", href: "/writing?topic=devotionals", description: "Devotionals and formation" },
        { label: "All Theology Articles", href: "/writing?topic=theology", description: "Browse all theology writing" },
      ]
    },
    {
      label: "Justice & Culture",
      dropdown: [
        { label: "Prophetic Justice", href: "/writing?topic=justice", description: "Where the church must speak" },
        { label: "Faith & Politics", href: "/writing?topic=justice", description: "When flag and cross compete" },
        { label: "Cultural Analysis", href: "/writing?topic=justice", description: "Reading the moment theologically" },
      ]
    },
    {
      label: "For Pastors",
      dropdown: [
        { label: "Pastoral Ministry", href: "/writing?topic=pastoral-ministry", description: "Burnout, preaching, and the soul beneath the calling" },
        { label: "Pastors Connection Network", href: "/pastors", description: "You don't have to lead alone" },
        { label: "Church Leadership", href: "/for-leaders", description: "Vision, governance, and team health" },
        { label: "Sermon Resources", href: "/resources", description: "Frameworks, guides, and tools" },
        { label: "Pastor Toolkit", href: "/resources", description: "Practical ministry resources" },
      ]
    },
    { label: "Books", href: "/books" },
  ];

  const isActive = (href: string) => location === href || location.startsWith(href + "/");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = "/writing?q=" + encodeURIComponent(searchQuery.trim());
    }
    setSearchOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Search Overlay */}
      {searchOpen && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(255,255,255,0.98)", zIndex: 500, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "120px" }}
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
                style={{ width: "100%", background: "transparent", border: "none", borderBottom: "2px solid #D4A017", fontSize: "clamp(28px,4vw,48px)", color: "white", outline: "none", padding: "8px 0 16px", caretColor: "#D4A017", fontFamily: "Georgia, serif" }}
              />
            </form>
            <div style={{ display: "flex", gap: "10px", marginTop: "24px", flexWrap: "wrap" }}>
              {["Marriage", "Parenting", "Faith & Doubt", "Theology", "Justice", "Pastoral Ministry"].map((tag) => (
                <Link
                  key={tag}
                  href={"/writing?topic=" + tag.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}
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
      <nav style={{ position: "sticky", top: 0, zIndex: 200, background: "#ffffff", borderBottom: "1px solid #e5e5e5", width: "100%" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "64px" }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#D4A017", cursor: "pointer", fontFamily: "Georgia, serif", lineHeight: 1 }}>LiveWell</div>
              <div style={{ fontSize: "9px", color: "#D1C9BB", letterSpacing: "0.5px" }}>by James Bell</div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div ref={dropdownRef} style={{ display: "flex", gap: "2px", alignItems: "center" }} className="desktop-nav">
            {navLinks.map((link) => (
              <div key={link.label} style={{ position: "relative" }}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      style={{
                        display: "flex", alignItems: "center", gap: "4px",
                        color: openDropdown === link.label ? "#D4A017" : "#F7F5F0",
                        fontSize: "13px", padding: "8px 12px", borderRadius: "3px",
                        background: "none", border: "none", cursor: "pointer",
                        transition: "color 0.2s", fontWeight: "400"
                      }}
                    >
                      {link.label}
                      <ChevronDown size={14} style={{ opacity: 0.6, transform: openDropdown === link.label ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                    </button>

                    {/* Dropdown Menu */}
                    {openDropdown === link.label && (
                      <div
                        onMouseLeave={() => setOpenDropdown(null)}
                        style={{
                          position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
                          background: "#ffffff", border: "1px solid #e5e5e5", borderRadius: "8px",
                          padding: "8px", minWidth: "280px", boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                          marginTop: "4px", zIndex: 300
                        }}
                      >
                        {link.dropdown.map((item) => (
                          <Link key={item.href + item.label} href={item.href} onClick={() => setOpenDropdown(null)} style={{ textDecoration: "none" }}>
                            <div style={{
                              padding: "10px 14px", borderRadius: "6px", cursor: "pointer",
                              transition: "background 0.15s"
                            }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(45,74,62,0.4)")}
                              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                              <div style={{ fontSize: "13px", fontWeight: "600", color: "#111111", marginBottom: "2px" }}>{item.label}</div>
                              {item.description && (
                                <div style={{ fontSize: "11px", color: "#D1C9BB", lineHeight: "1.4" }}>{item.description}</div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={link.href!} style={{ textDecoration: "none" }}>
                    <span style={{
                      color: isActive(link.href!) ? "#D4A017" : "#F7F5F0",
                      fontSize: "13px", padding: "8px 12px", borderRadius: "3px",
                      display: "block", transition: "color 0.2s",
                      fontWeight: isActive(link.href!) ? "600" : "400",
                    }}>
                      {link.label}
                    </span>
                  </Link>
                )}
              </div>
            ))}

            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              style={{ background: "none", border: "none", color: "#111111", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", marginLeft: "4px" }}
              aria-label="Search essays"
            >
              <Search size={18} />
            </button>

            {/* Subscribe CTA */}
            <Link href="/start" style={{ textDecoration: "none" }}>
              <button style={{ background: "#D4A017", color: "#1A1A1A", border: "none", padding: "9px 20px", fontSize: "13px", fontWeight: "bold", borderRadius: "3px", cursor: "pointer", marginLeft: "8px" }}>
                Start Here
              </button>
            </Link>
          </div>

          {/* Mobile: search + hamburger */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }} className="mobile-nav">
            <button onClick={() => setSearchOpen(true)} style={{ background: "none", border: "none", color: "#111111", cursor: "pointer", padding: "8px" }} aria-label="Search">
              <Search size={20} />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", color: "#111111", cursor: "pointer", padding: "8px" }} aria-label="Menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{ background: "#ffffff", borderTop: "1px solid #e5e5e5", padding: "8px 20px 24px", maxHeight: "80vh", overflowY: "auto" }}>
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.dropdown ? (
                  <>
                    <div
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      style={{ color: "#D4A017", fontSize: "14px", padding: "12px 0", borderBottom: "1px solid #2D4A3E", fontWeight: "600", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                      {link.label}
                      <ChevronDown size={16} style={{ transform: openDropdown === link.label ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                    </div>
                    {openDropdown === link.label && (
                      <div style={{ paddingLeft: "16px", paddingBottom: "8px" }}>
                        {link.dropdown.map((item) => (
                          <Link key={item.href + item.label} href={item.href} onClick={() => { setMobileOpen(false); setOpenDropdown(null); }} style={{ textDecoration: "none" }}>
                            <div style={{ padding: "10px 0", borderBottom: "1px solid rgba(45,74,62,0.3)" }}>
                              <div style={{ color: "#111111", fontSize: "14px" }}>{item.label}</div>
                              {item.description && <div style={{ color: "#D1C9BB", fontSize: "12px", marginTop: "2px" }}>{item.description}</div>}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={link.href!} onClick={() => setMobileOpen(false)} style={{ textDecoration: "none" }}>
                    <div style={{ color: isActive(link.href!) ? "#D4A017" : "#F7F5F0", fontSize: "14px", padding: "12px 0", borderBottom: "1px solid #2D4A3E", fontWeight: isActive(link.href!) ? "600" : "400" }}>
                      {link.label}
                    </div>
                  </Link>
                )}
              </div>
            ))}
            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              <Link href="/start" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none", flex: 1 }}>
                <button style={{ background: "#D4A017", color: "#1A1A1A", border: "none", padding: "12px 24px", fontSize: "14px", fontWeight: "bold", borderRadius: "3px", cursor: "pointer", width: "100%" }}>
                  Start Here
                </button>
              </Link>
              <Link href="/membership" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none", flex: 1 }}>
                <button style={{ background: "transparent", color: "#D4A017", border: "1px solid #D4A017", padding: "12px 24px", fontSize: "14px", fontWeight: "bold", borderRadius: "3px", cursor: "pointer", width: "100%" }}>
                  Membership
                </button>
              </Link>
            </div>
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
