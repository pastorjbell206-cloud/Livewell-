#!/usr/bin/env node
/**
 * Lighthouse on one address, three runs, judged on the median.
 *
 * A single run on a shared runner swings by more than any threshold's margin
 * (the same commit has scored 54 and 91), so one slow machine could turn the
 * job red with no code change. Each run gets one retry: headless Chrome on
 * the runner sometimes crashes the tab (TARGET_CRASHED) before scoring.
 *
 * Usage:
 *   node scripts/lighthouse-median.mjs <url> <name>
 *     [--min performance=90,accessibility=90,best-practices=95,seo=95]
 *     [--max-cls 0.1]
 * Writes lh-<name>-<run>.json beside the working directory and exits 1 when a
 * median misses its threshold.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";

const [url, name] = process.argv.slice(2);
if (!url || !name) {
  console.error("usage: lighthouse-median.mjs <url> <name> [--min k=v,...] [--max-cls n]");
  process.exit(2);
}
const arg = (flag) => {
  const i = process.argv.indexOf(flag);
  return i > -1 ? process.argv[i + 1] : undefined;
};
const mins = Object.fromEntries(
  (arg("--min") ?? "")
    .split(",")
    .filter(Boolean)
    .map((pair) => pair.split("="))
    .map(([k, v]) => [k, Number(v)])
);
const maxCls = arg("--max-cls") === undefined ? undefined : Number(arg("--max-cls"));

const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];

const runs = [];
for (let i = 1; i <= 3; i++) {
  const out = `./lh-${name}-${i}.json`;
  let ok = false;
  for (let attempt = 1; attempt <= 2 && !ok; attempt++) {
    const r = spawnSync(
      "npx",
      [
        "--yes",
        "lighthouse",
        url,
        "--chrome-flags=--headless --no-sandbox",
        "--only-categories=performance,accessibility,best-practices,seo",
        "--output=json",
        `--output-path=${out}`,
        "--quiet",
      ],
      { stdio: "inherit" }
    );
    ok = r.status === 0 && fs.existsSync(out);
    if (!ok) console.log(`${name} run ${i}, attempt ${attempt}: Lighthouse did not finish${attempt === 1 ? "; retrying once" : ""}`);
  }
  if (!ok) {
    console.error(`${name}: run ${i} never finished`);
    process.exit(1);
  }
  const report = JSON.parse(fs.readFileSync(out, "utf8"));
  const run = {
    ...Object.fromEntries(Object.entries(report.categories).map(([k, c]) => [k, Math.round((c.score ?? 0) * 100)])),
    cls: report.audits["cumulative-layout-shift"]?.numericValue ?? 0,
    lcp: report.audits["largest-contentful-paint"]?.numericValue ?? 0,
  };
  runs.push(run);
  console.log(
    `${name} run ${i}: performance ${run.performance}, accessibility ${run.accessibility}, best-practices ${run["best-practices"]}, seo ${run.seo}, CLS ${run.cls.toFixed(3)}, LCP ${(run.lcp / 1000).toFixed(1)} s`
  );
}

const mid = (k) => median(runs.map((r) => r[k]));
console.log(
  `${name} median: performance ${mid("performance")}, accessibility ${mid("accessibility")}, best-practices ${mid("best-practices")}, seo ${mid("seo")}, CLS ${mid("cls").toFixed(3)}, LCP ${(mid("lcp") / 1000).toFixed(1)} s`
);

let bad = 0;
for (const [k, min] of Object.entries(mins)) {
  const score = mid(k);
  const ok = score >= min;
  console.log(`${ok ? "ok  " : "FAIL"} ${name} ${k.padEnd(15)} ${score} (min ${min})`);
  if (!ok) bad++;
}
if (maxCls !== undefined) {
  const cls = mid("cls");
  const ok = cls <= maxCls;
  console.log(`${ok ? "ok  " : "FAIL"} ${name} ${"CLS".padEnd(15)} ${cls.toFixed(3)} (max ${maxCls})`);
  if (!ok) bad++;
}
if (bad) {
  console.error(`${name}: ${bad} Lighthouse measure(s) missed the threshold`);
  process.exit(1);
}
