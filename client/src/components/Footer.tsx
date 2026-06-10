import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { PILLARS_BY_MOVEMENT, pillarUrl } from "@/lib/taxonomy";

const footerLink = { color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" } as const;

export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  return (
    <footer style={{ background: "var(--ink)", color: "#ffffff", padding: "60px 20px 20px", marginTop: "60px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "40px" }}>
          {/* Column 1 - Brand */}
          <div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: "var(--gold)", marginBottom: "12px", fontFamily: "var(--F)" }}>LiveWell</div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: "1.7", marginBottom: "16px" }}>Theology that carries the weight of everyday life.</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="https://substack.com/@jamesbell333289" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", fontSize: "12px", textDecoration: "none", fontWeight: "600" }}>Substack →</a>
            </div>
          </div>

          {/* Column 2 - Diagnosis (canonical pillars) */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "16px", color: "#ffffff", textTransform: "uppercase", letterSpacing: "1px" }}>Diagnosis</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {PILLARS_BY_MOVEMENT.diagnosis.map(p => (
                <Link key={p.slug} href={pillarUrl(p.slug)} style={footerLink}>{p.name}</Link>
              ))}
            </div>
          </div>

          {/* Column 3 - Formation */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "16px", color: "#ffffff", textTransform: "uppercase", letterSpacing: "1px" }}>Formation</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href={pillarUrl("living-well-after-christendom")} style={footerLink}>Living Well After Christendom</Link>
              <Link href="/marriage" style={footerLink}>Marriage</Link>
              <Link href="/parenting" style={footerLink}>Parenting</Link>
              <Link href="/writing?pillar=living-well-after-christendom&subTheme=practices" style={footerLink}>Devotionals</Link>
            </div>
          </div>

          {/* Column 4 - Resources */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "16px", color: "#ffffff", textTransform: "uppercase", letterSpacing: "1px" }}>Resources</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/books" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Books</Link>
              <Link href="/resources/context" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Reading Scripture in Context</Link>
              <Link href="/reading-paths" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Reading Paths</Link>
              <Link href="/tools" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Ministry Tools</Link>
              <Link href="/tools/verse-finder" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Bible Verse Finder</Link>
              <Link href="/tools/prayer-generator" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Prayer Generator</Link>
              <Link href="/quiz" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Theology Quiz</Link>
              <Link href="/work-with-james" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Work With James</Link>
            </div>
          </div>

          {/* Column 5 - For Pastors */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "16px", color: "#ffffff", textTransform: "uppercase", letterSpacing: "1px" }}>For Pastors</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href={pillarUrl("the-pastoral-angle")} style={footerLink}>The Pastoral Angle</Link>
              <Link href="/pastors" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Pastors Connection Network</Link>
              <Link href="/leadership" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>The Leadership Hub</Link>
              <Link href="/leadership/library" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Leadership Library</Link>
              <Link href="/leadership/sermon-series" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Sermon Series Library</Link>
              <Link href="/for-leaders" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Church Leadership</Link>
              <Link href="/resources" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Sermon Resources</Link>
            </div>
          </div>

          {/* Column 6 - Connect */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "16px", color: "#ffffff", textTransform: "uppercase", letterSpacing: "1px" }}>Connect</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/about" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>About James Bell</Link>
              <Link href="/membership" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Membership</Link>
              <a href="https://pastorsconnectionnetwork.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Pastors Network</a>
              <a href="https://substack.com/@jamesbell333289" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Substack Newsletter</a>
              <a href="mailto:Pastorjbell206@gmail.com" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}>Contact</a>
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
