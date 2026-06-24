/**
 * Articles hidden from the public listing + nav because they are duplicate
 * "stub" versions of a fuller essay (see docs/content-audit.md, §3). Hiding
 * here removes them from the reader experience immediately, with no admin
 * action. They can also be formally unpublished from the duplicate tool.
 */
export const HIDDEN_SLUGS = new Set<string>([
  "justice-not-political",        // → justice-is-not-political-it-is-theological
  "poor-not-ministry",            // → the-poor-are-not-a-ministry-category-test-of-the-church
  "your-city-is-mission-field",   // → your-city-is-your-mission-field-biblical-theology-of-place
  "consistent-ethic-life",        // → consistent-pro-life-ethic
]);
