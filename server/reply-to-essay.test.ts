import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { REPLY_COPY, REPLY_EMAIL, REPLY_LINK, replyMailto } from "@/components/ReplyToEssay";

// The reply channel under every essay: two sentences in James's register and
// one mailto link whose subject is the essay's title. The copy lives in
// client/src/data/reply.json and is rendered twice, by the component after
// the app mounts and by scripts/prerender-heads.mjs into the static essay
// HTML. These pin the address, the subject, the register, and (when a
// prerendered build exists) the static block itself.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

// CLAUDE.md, Forbidden Language: the words, the phrases, the therapy-speak.
const FORBIDDEN = [
  /\b(delve\w*|leverag\w*|unlock\w*|transformative|navigat\w*|tapestry|foster\w*|unpack\w*|landscape\w*|nuanced|multifaceted|authentic\w*|journey\w*|holistic)\b/i,
  /in today.s world|now more than ever|here.s the thing|I want to be real with you|God.s got this|gospel-centered|authentic community/i,
  /hold space|your truth|do the work|your feelings are valid|lean into|showing up/i,
  /here is what I mean|let me explain/i,
];

describe("the reply channel under every essay", () => {
  it("writes to the site's contact address with the essay title as the subject and nothing else", () => {
    expect(REPLY_EMAIL).toBe("Pastorjbell206@gmail.com");
    const href = replyMailto("Is Jesus Really the Only Way?");
    expect(href).toBe("mailto:Pastorjbell206@gmail.com?subject=Is%20Jesus%20Really%20the%20Only%20Way%3F");
    expect(href).not.toMatch(/body=/);
    // A title with an ampersand or a hash must not break the query string.
    expect(replyMailto("Faith & Doubt #1")).toBe("mailto:Pastorjbell206@gmail.com?subject=Faith%20%26%20Doubt%20%231");
  });

  it("is one or two sentences in the register, with no forbidden language and no exclamation", () => {
    const sentences = REPLY_COPY.split(/(?<=[.?])\s+/).filter(Boolean);
    expect(sentences.length).toBeGreaterThanOrEqual(1);
    expect(sentences.length).toBeLessThanOrEqual(2);
    expect(REPLY_COPY).not.toMatch(/!/);
    expect(REPLY_COPY).not.toMatch(/—/);
    for (const re of FORBIDDEN) expect(REPLY_COPY).not.toMatch(re);
    // An invitation to disagree, not a marketing ask.
    expect(REPLY_COPY).not.toMatch(/subscribe|sign up|newsletter|buy|book/i);
    expect(REPLY_LINK).toBe("Write to James");
  });

  it("is rendered into the prerendered essay HTML, before the app mounts", () => {
    const file = path.join(repoRoot, "dist/public/writing/is-jesus-really-the-only-way/index.html");
    if (!existsSync(file)) return; // no prerendered build here; CI's build step produces one
    const html = readFileSync(file, "utf8");
    if (!html.includes("prerender-content")) return; // built without the prerender pass
    expect(html).toContain('class="pre-reply"');
    expect(html).toContain('href="mailto:Pastorjbell206@gmail.com?subject=Is%20Jesus%20Really%20the%20Only%20Way%3F"');
    expect(html).toContain("tell me where");
  });
});
