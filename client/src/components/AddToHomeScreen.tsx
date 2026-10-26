/**
 * AddToHomeScreen: put LiveWell on the reader's phone like an app, so their
 * library, plans, and tools are one tap away. Uses the browser's own install
 * dialog where there is one (lib/install), and plain steps where there isn't.
 */
import { useState } from "react";
import { Smartphone } from "lucide-react";
import { installHow, promptInstall, useInstallPrompt } from "@/lib/install";

export function AddToHomeScreen() {
  const hasPrompt = useInstallPrompt();
  const how = installHow(hasPrompt);
  const [result, setResult] = useState<"" | "added" | "not-now">("");

  return (
    <div style={{ border: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", background: "var(--card)", padding: "var(--s-4)" }}>
      <p style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--F)", fontSize: "24px", lineHeight: 1.2, color: "var(--ink)", margin: "0 0 8px" }}>
        <Smartphone size={20} aria-hidden /> Put LiveWell on your home screen
      </p>
      {/* Once added, the card says so and nothing else (the browser's prompt is
          spent by then, so the steps below would read as if it had not worked). */}
      {result !== "added" && how === "installed" && (
        <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", margin: 0 }}>
          It's already there. You're reading LiveWell from your home screen.
        </p>
      )}
      {result !== "added" && how === "prompt" && (
        <>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", margin: "0 0 14px" }}>
            Add it like an app, and LiveWell opens with one tap. It takes no space to speak of and asks for nothing.
          </p>
          <button
            type="button"
            onClick={async () => setResult((await promptInstall()) ? "added" : "not-now")}
            style={{ minHeight: "44px", padding: "10px 18px", border: "1px solid var(--ink)", borderRadius: "var(--radius-sm)", background: "var(--ink)", color: "var(--bone)", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
          >
            Add to my home screen
          </button>
        </>
      )}
      {result !== "added" && how === "ios" && (
        <>
          <ol style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", margin: 0, paddingLeft: "22px" }}>
            <li>In Safari, tap the Share button (the square with an arrow pointing up).</li>
            <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
            <li>Tap <strong>Add</strong>. LiveWell appears with your other apps.</li>
          </ol>
          {/* iOS keeps a home-screen site's storage apart from Safari's. */}
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink-muted)", margin: "10px 0 0" }}>
            On iPhone and iPad, LiveWell on the home screen keeps its own library, apart from Safari's. Email your saved list to yourself first, or save things again there.
          </p>
        </>
      )}
      {result !== "added" && how === "menu" && (
        <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", margin: 0 }}>
          On your phone, open LiveWell in your browser, then choose <strong>Add to Home screen</strong> (or <strong>Install app</strong>) from the browser's menu. On an iPhone it's in Safari's Share menu.
        </p>
      )}
      <p aria-live="polite" style={{ fontFamily: result === "added" ? "var(--B)" : "var(--U)", fontSize: result === "added" ? "16px" : "14px", color: result === "added" ? "var(--ink)" : "var(--ink-muted)", margin: result === "not-now" ? "10px 0 0" : 0 }}>
        {result === "added" && "It's on your home screen now."}
        {result === "not-now" && "Not added. You can do it any time from your browser's menu."}
      </p>
    </div>
  );
}
