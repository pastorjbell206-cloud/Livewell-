import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const heroHeight = window.innerHeight;
      if (y < heroHeight) { setVisible(false); return; }
      setVisible(y > lastY);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  if (!visible) return null;

  return (
    <div className="md:hidden" style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: "var(--charcoal)", borderTop: "1px solid var(--charcoal-soft)",
      padding: "0.75rem 1rem", display: "flex", justifyContent: "center",
      transition: "transform 240ms cubic-bezier(0.22,1,0.36,1)",
    }}>
      <Link href="/writing" style={{ textDecoration: "none", flex: 1, maxWidth: "400px" }}>
        <button style={{
          width: "100%", background: "var(--bone)", color: "var(--charcoal)",
          border: "none", padding: "0.75rem", fontFamily: "var(--U)",
          fontSize: "0.875rem", fontWeight: 500, borderRadius: "2px",
          cursor: "pointer", display: "flex", alignItems: "center",
          justifyContent: "center", gap: "0.5rem",
        }}>
          Read the Writing <ArrowRight size={14} />
        </button>
      </Link>
    </div>
  );
}
