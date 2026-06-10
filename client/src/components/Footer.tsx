import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { pillarUrl } from "@/lib/taxonomy";

const footerLink = { color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" } as const;
const colTitle = { fontSize: "13px", fontWeight: "bold", marginBottom: "16px", color: "#ffffff", textTransform: "uppercase", letterSpacing: "1px" } as const;
const col = { display: "flex", flexDirection: "column", gap: "10px" } as const;

/**
 * Footer mirrors the header's mental model (the five pillars are the spine),
 * per docs/site-ia-blueprint.md: The Five Pillars / Write & Read /
 * Libraries & Tools / For Pastors / Connect. "Resources" appears exactly once
 * in navigation (the Resource Hub, labeled Downloads & Study Guides here).
 */
export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  return (
    <footer style={{ background: "var(--ink)", color: "#ffffff", padding: "clamp(36px, 7vw, 60px) clamp(16px, 4vw, 20px) 20px", marginTop: "60px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))", gap: "clamp(20px, 4vw, 40px)", marginBottom: "40px" }}>
          {/* Brand */}
          <div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: "var(--gold)", marginBottom: "12px", fontFamily: "var(--F)" }}>LiveWell</div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: "1.7", marginBottom: "16px" }}>Theology that carries the weight of everyday life.</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="https://substack.com/@jamesbell333289" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", fontSize: "12px", textDecoration: "none", fontWeight: "600" }}>Substack →</a>
            </div>
          </div>

          {/* The Five Pillars */}
          <div>
            <h3 style={colTitle}>The Five Pillars</h3>
            <div style={col}>
              <Link href="/theology" style={footerLink}>Theological Depth</Link>
              <Link href="/justice" style={footerLink}>Prophetic Justice</Link>
              <Link href="/disruption" style={footerLink}>Prophetic Disruption</Link>
              <Link href="/leadership" style={footerLink}>Leadership Formation</Link>
              <Link href="/life" style={footerLink}>Integrated Life</Link>
            </div>
          </div>

          {/* Write & Read */}
          <div>
            <h3 style={colTitle}>Write &amp; Read</h3>
            <div style={col}>
              <Link href="/writing" style={footerLink}>The Writing</Link>
              <Link href="/books" style={footerLink}>Books</Link>
              <Link href="/reading-paths" style={footerLink}>Reading Paths</Link>
              <Link href="/start" style={footerLink}>Start Here</Link>
              <Link href="/marriage" style={footerLink}>Marriage</Link>
              <Link href="/parenting" style={footerLink}>Parenting</Link>
            </div>
          </div>

          {/* Libraries & Tools */}
          <div>
            <h3 style={colTitle}>Libraries &amp; Tools</h3>
            <div style={col}>
              <Link href="/resources" style={footerLink}>The Resource Hub</Link>
              <Link href="/resources/context" style={footerLink}>Reading Scripture in Context</Link>
              <Link href="/leadership/library" style={footerLink}>Leadership Library</Link>
              <Link href="/leadership/sermon-series" style={footerLink}>Sermon Series Library</Link>
              <Link href="/discipleship" style={footerLink}>The Discipleship Pathway</Link>
              <Link href="/tools" style={footerLink}>All Tools</Link>
              <Link href="/tools/theology-quiz" style={footerLink}>Theology Quiz</Link>
            </div>
          </div>

          {/* For Pastors */}
          <div>
            <h3 style={colTitle}>For Pastors</h3>
            <div style={col}>
              <Link href="/pastors" style={footerLink}>Pastors Connection Network</Link>
              <Link href={pillarUrl("the-pastoral-angle")} style={footerLink}>The Pastoral Angle</Link>
              <Link href="/leadership" style={footerLink}>The Leadership Hub</Link>
              <Link href="/leadership/formation" style={footerLink}>Deep Formation</Link>
              <Link href="/for-leaders" style={footerLink}>Church Leadership</Link>
              <Link href="/resources" style={footerLink}>Downloads &amp; Study Guides</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 style={colTitle}>Connect</h3>
            <div style={col}>
              <Link href="/about" style={footerLink}>About James Bell</Link>
              <Link href="/membership" style={footerLink}>Membership</Link>
              <Link href="/work-with-james" style={footerLink}>Work With James</Link>
              <a href="https://pastorsconnectionnetwork.com" target="_blank" rel="noopener noreferrer" style={footerLink}>Pastors Network</a>
              <a href="https://substack.com/@jamesbell333289" target="_blank" rel="noopener noreferrer" style={footerLink}>Substack Newsletter</a>
              <a href="mailto:Pastorjbell206@gmail.com" style={footerLink}>Contact</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>
          <span>&copy; 2026 LiveWell by James Bell. All rights reserved.</span>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="/privacy" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>Privacy Policy</a>
            <a href="/terms" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>Terms of Service</a>
            {toggleTheme && (
              <button onClick={toggleTheme} style={{ color: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px" }} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
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
