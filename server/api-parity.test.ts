import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// ---------------------------------------------------------------------------
// Dev/prod tRPC parity guard.
//
// The app has two server implementations of the same API: the real tRPC
// `appRouter` (used in dev, server/routers.ts) and a hand-rolled re-implementation
// in the Vercel serverless function (api/index.ts). They can drift: a procedure
// the client calls may exist in dev but not in production, where it 404s.
//
// This test does NOT change any behaviour. It scans the client for the tRPC
// procedures it actually invokes, scans api/index.ts for the procedures it
// handles, and fails if the client calls something production does not
// implement — UNLESS that gap is already recorded in KNOWN_PROD_GAPS below.
//
// The ratchet: new drift fails CI; and a gap that gets fixed must be removed
// from the list (the second test enforces that). The goal is to drive
// KNOWN_PROD_GAPS to empty over time (see docs/ARCHITECTURE.md §6, Stage 2).
// ---------------------------------------------------------------------------

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

// Client-called procedures that api/index.ts does not (yet) implement.
// These currently 404 in production (or, for membership, are gracefully handled
// client-side as "disabled"). This is the Stage-2 backlog — shrink it to empty.
//
// Stage 2 paused here: the files.* and teamCollab.* groups below depend on a
// real per-user identity (ctx.user.id) for file ownership and team
// membership/roles. Production's auth is a single shared "admin" session — there
// is no multi-user login — so they cannot be ported safely until prod gains real
// per-user auth. stripe.* already has a working REST fallback (/api/checkout).
const KNOWN_PROD_GAPS = new Set<string>([
  // Generic book cart checkout via tRPC — superseded by the per-ebook REST flow
  // (/api/checkout) and backed only by placeholder prices. Pending a cleanup
  // decision on the legacy shopping cart (BooksStore/ShoppingCart).
  "stripe.createCheckoutSession",
  // Team collaboration (PCN/leadership) — per-user membership + roles; blocked
  // on prod multi-user auth.
  "teamCollab.announcement.create",
  "teamCollab.announcement.list",
  "teamCollab.channel.create",
  "teamCollab.channel.list",
  "teamCollab.post.create",
  "teamCollab.post.list",
  "teamCollab.task.create",
  "teamCollab.task.list",
  "teamCollab.task.updateStatus",
  "teamCollab.team.create",
  "teamCollab.team.joinByCode",
  "teamCollab.team.listMine",
  "teamCollab.team.members",
  "teamCollab.team.setRole",
]);

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

/** Procedures the client SPA invokes via the tRPC client. */
function clientInvokedProcedures(): Set<string> {
  const files = walk(path.join(repoRoot, "client/src")).filter((f) => /\.tsx?$/.test(f));
  const procs = new Set<string>();
  const re =
    /\btrpc\.([A-Za-z0-9_.]+?)\.(?:useQuery|useSuspenseQuery|useInfiniteQuery|useMutation|query|mutate|fetch)\b/g;
  for (const f of files) {
    const src = readFileSync(f, "utf8");
    let m: RegExpExecArray | null;
    while ((m = re.exec(src))) procs.add(m[1]);
  }
  return procs;
}

/** Procedures the production serverless function handles (switch case labels). */
function prodHandledProcedures(): Set<string> {
  const src = readFileSync(path.join(repoRoot, "api/index.ts"), "utf8");
  const procs = new Set<string>();
  const re = /case\s+"([A-Za-z0-9_]+(?:\.[A-Za-z0-9_]+)+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) procs.add(m[1]);
  return procs;
}

// api/index.ts's default case returns [] for any unhandled *.listPublished /
// *.listAll, so those degrade gracefully (empty) rather than 404 — not drift.
function gracefullyDegrades(proc: string): boolean {
  return proc.endsWith(".listPublished") || proc.endsWith(".listAll");
}

function currentMissing(): string[] {
  const called = clientInvokedProcedures();
  const handled = prodHandledProcedures();
  return [...called].filter((p) => !handled.has(p) && !gracefullyDegrades(p)).sort();
}

describe("dev/prod tRPC parity", () => {
  it("no new procedures are called by the client but missing from production", () => {
    const newGaps = currentMissing().filter((p) => !KNOWN_PROD_GAPS.has(p));
    expect(
      newGaps,
      "These procedures are called by the client but NOT implemented in api/index.ts " +
        "(they will 404 in production). Implement them in the serverless function, or " +
        "if the gap is intentional add them to KNOWN_PROD_GAPS:\n  " +
        newGaps.join("\n  "),
    ).toEqual([]);
  });

  it("KNOWN_PROD_GAPS has no stale entries", () => {
    const missing = new Set(currentMissing());
    const stale = [...KNOWN_PROD_GAPS].filter((p) => !missing.has(p)).sort();
    expect(
      stale,
      "These are listed as known gaps but are now handled in prod (or no longer called " +
        "by the client). Remove them from KNOWN_PROD_GAPS:\n  " +
        stale.join("\n  "),
    ).toEqual([]);
  });
});
