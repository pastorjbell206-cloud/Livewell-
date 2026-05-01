import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  return (
    <footer style={{ background: "#1A1A1A", color: "#F7F5F0", padding: "60px 20px 20px", marginTop: "60px", borderTop: "4px solid #B8963E" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "40px" }}>
          {/* Column 1 - Brand */}
          <div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: "#B8963E", marginBottom: "12px", fontFamily: "Georgia, serif" }}>LiveWell</div>
            <p style={{ fontSize: "13px", color: "#D1C9BB", lineHeight: "1.7", marginBottom: "16px" }}>Theology that carries the weight of everyday life.</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="https://substack.com/@jamesbell333289" target="_blank" rel="noopener noreferrer" style={{ color: "#B8963E", fontSize: "12px", textDecoration: "none", fontWeight: "600" }}>Substack →</a>
            </div>
          </div>

          {/* Column 2 - Marriage & Family */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "16px", color: "#F7F5F0", textTransform: "uppercase", letterSpacing: "1px" }}>Marriage & Family</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/marriage" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Marriage</Link>
              <Link href="/parenting" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Parenting</Link>
              <Link href="/writing?topic=devotionals" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Family Devotionals</Link>
            </div>
          </div>

          {/* Column 3 - Faith & Theology */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "16px", color: "#F7F5F0", textTransform: "uppercase", letterSpacing: "1px" }}>Faith & Theology</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/doubt" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Doubt & Questions</Link>
              <Link href="/writing?topic=theology" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Theological Depth</Link>
              <Link href="/writing?topic=justice" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Justice & Culture</Link>
              <Link href="/writing?topic=devotionals" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Devotionals</Link>
            </div>
          </div>

          {/* Column 4 - Resources */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "16px", color: "#F7F5F0", textTransform: "uppercase", letterSpacing: "1px" }}>Resources</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/books" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Books</Link>
              <Link href="/reading-paths" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Reading Paths</Link>
              <Link href="/tools" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Ministry Tools</Link>
              <Link href="/tools/verse-finder" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Bible Verse Finder</Link>
              <Link href="/tools/prayer-generator" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Prayer Generator</Link>
              <Link href="/quiz" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Theology Quiz</Link>
              <Link href="/work-with-james" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Work With James</Link>
            </div>
          </div>

          {/* Column 5 - For Pastors */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "16px", color: "#F7F5F0", textTransform: "uppercase", letterSpacing: "1px" }}>For Pastors</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/writing?topic=pastoral-ministry" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Pastoral Ministry</Link>
              <Link href="/pastors" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Pastors Connection Network</Link>
              <Link href="/for-leaders" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Church Leadership</Link>
              <Link href="/resources" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Sermon Resources</Link>
            </div>
          </div>

          {/* Column 6 - Connect */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "16px", color: "#F7F5F0", textTransform: "uppercase", letterSpacing: "1px" }}>Connect</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/about" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>About James Bell</Link>
              <Link href="/membership" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Membership</Link>
              <a href="https://pastorsconnectionnetwork.com" target="_blank" rel="noopener noreferrer" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Pastors Network</a>
              <a href="https://substack.com/@jamesbell333289" target="_blank" rel="noopener noreferrer" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Substack Newsletter</a>
              <a href="mailto:contact@livewellbyjamesbell.com" style={{ color: "#D1C9BB", textDecoration: "none", fontSize: "13px" }}>Contact</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid #B8963E", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", fontSize: "12px", color: "#D1C9BB" }}>
          <span>&copy; 2026 LiveWell by James Bell. All rights reserved.</span>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="/privacy" style={{ color: "#D1C9BB", textDecoration: "none" }}>Privacy Policy</a>
            <a href="/terms" style={{ color: "#D1C9BB", textDecoration: "none" }}>Terms of Service</a>
            {toggleTheme && (
              <button onClick={toggleTheme} style={{ color: "#D1C9BB", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px" }} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
