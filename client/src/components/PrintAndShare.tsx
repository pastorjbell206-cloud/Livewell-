/**
 * PrintAndShare — the "Print & share" section of the /resources hub: every
 * PDF the build makes, by category, read from the manifest scripts/build-pdfs.mjs
 * writes (/downloads/index.json). Email-gated toolkits (study guides, reading
 * paths) link to the page that carries their gate instead of the raw file.
 * Loading, failed (with retry), and loaded are three distinct states.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Download } from "lucide-react";
import { fetchJson } from "@/lib/fetch-json";
import { LoadFailed } from "@/components/LoadFailed";

interface DownloadFile {
  title: string;
  file: string;
  category: string;
  pages: number;
  bytes: number;
  page?: string;
  gated?: boolean;
}
interface Manifest {
  categories: { name: string; blurb: string }[];
  files: DownloadFile[];
}

const isManifest = (x: unknown): x is Manifest =>
  !!x &&
  typeof x === "object" &&
  Array.isArray((x as Manifest).files) &&
  Array.isArray((x as Manifest).categories);

// Categories longer than this open with the first few rows and a "show all".
const PREVIEW = 6;

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

function size(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function Row({ f }: { f: DownloadFile }) {
  const meta = `${f.pages} ${f.pages === 1 ? "page" : "pages"} · ${size(f.bytes)}`;
  return (
    <li style={{ display: "flex", gap: "12px", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", padding: "10px 0", borderTop: "1px solid var(--line)" }}>
      <span style={{ flex: "1 1 240px", minWidth: 0, fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.5, color: "var(--ink)" }}>{f.title}</span>
      <span style={{ fontFamily: "var(--M, monospace)", fontSize: "11px", letterSpacing: "0.04em", color: "var(--ink-muted)", whiteSpace: "nowrap" }}>{meta}</span>
      {f.gated && f.page ? (
        <Link href={f.page} style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", textDecoration: "none", whiteSpace: "nowrap" }}>
          Get it on its page →
        </Link>
      ) : (
        <a
          href={f.file}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Download ${f.title} (PDF, ${meta})`}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", textDecoration: "none", whiteSpace: "nowrap" }}
        >
          <Download size={13} /> PDF
        </a>
      )}
    </li>
  );
}

function Category({ name, blurb, files }: { name: string; blurb: string; files: DownloadFile[] }) {
  const [all, setAll] = useState(false);
  const shown = all ? files : files.slice(0, PREVIEW);
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--line)", padding: "var(--s-3) var(--s-3) var(--s-2)" }}>
      <h3 style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)", margin: "0 0 6px" }}>{name}</h3>
      <p style={{ fontFamily: "var(--B)", fontSize: "13.5px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "0 0 10px" }}>
        {blurb} <span style={{ whiteSpace: "nowrap" }}>{files.length} {files.length === 1 ? "file" : "files"}.</span>
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {shown.map((f) => (
          <Row key={f.file} f={f} />
        ))}
      </ul>
      {files.length > PREVIEW && (
        <button
          onClick={() => setAll((v) => !v)}
          aria-expanded={all}
          style={{ marginTop: "6px", padding: "8px 0", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}
        >
          {all ? "Show fewer" : `Show all ${files.length}`}
        </button>
      )}
    </div>
  );
}

export function PrintAndShare() {
  const [nonce, setNonce] = useState(0);
  const [state, setState] = useState<{ nonce: number; data: Manifest | null; failed: boolean } | null>(null);

  useEffect(() => {
    let live = true;
    fetchJson<Manifest>("/downloads/index.json", isManifest)
      .then((data) => live && setState({ nonce, data, failed: false }))
      .catch(() => live && setState({ nonce, data: null, failed: true }));
    return () => {
      live = false;
    };
  }, [nonce]);

  const current = state && state.nonce === nonce ? state : null;
  const groups = useMemo(() => {
    const data = current?.data;
    if (!data) return [];
    return data.categories
      .map((c) => ({ ...c, files: data.files.filter((f) => f.category === c.name) }))
      .filter((c) => c.files.length);
  }, [current]);

  return (
    <section id="print" aria-labelledby="print-and-share" style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
      <div style={wrap}>
        <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>Print & share</div>
        <h2 id="print-and-share" style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 8px" }}>
          For the table, the group, and the fridge door
        </h2>
        <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", margin: "0 0 var(--s-3)" }}>
          Everything here is set for paper: Letter size unless it says otherwise, free to print and hand on.
        </p>
        {!current ? (
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)" }}>Loading the print library…</p>
        ) : current.failed ? (
          <LoadFailed what="The print library" onRetry={() => setNonce((n) => n + 1)} />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "var(--s-3)", alignItems: "start" }}>
            {groups.map((g) => (
              <Category key={g.name} name={g.name} blurb={g.blurb} files={g.files} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
