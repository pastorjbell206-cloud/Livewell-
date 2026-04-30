import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(100, (scrollTop / docHeight) * 100));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (progress < 1) return null;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "3px", zIndex: 9999, background: "var(--border)" }}>
      <div style={{ height: "100%", width: `${progress}%`, background: "var(--gold)", transition: "width 0.1s linear" }} />
    </div>
  );
}
