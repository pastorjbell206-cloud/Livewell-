/**
 * Which essays owe Crossway's notice: a rewrite (held to the ESV) once it
 * quotes Scripture, and an older essay only where its text names the ESV.
 */
import { describe, it, expect } from "vitest";
import { ESV_NOTICE, owesEsvNotice, quotesScripture } from "./esv";

describe("ESV_NOTICE", () => {
  it("is Crossway's line, with no em-dash and no exclamation", () => {
    expect(ESV_NOTICE).toMatch(/^Scripture quotations are from the ESV® Bible/);
    expect(ESV_NOTICE).toContain("© 2001 by Crossway, a publishing ministry of Good News Publishers.");
    expect(ESV_NOTICE).not.toMatch(/[—!]/);
  });
});

describe("quotesScripture", () => {
  it("finds a quotation with its reference beside it, in the forms the essays use", () => {
    for (const md of [
      'He told them, "Within two years I will bring back to this place all the vessels of the LORD\'s house" (Jeremiah 28:3).',
      "“Honor everyone. Love the brotherhood. Fear God. Honor the emperor.” (1 Peter 2:17)",
      '*"For here we have no lasting city, but we seek the city that is to come."* (Hebrews 13:14)',
      '"Arise, my love, my beautiful one, and come away" (Song of Songs 2:10)',
      "> Thus says the LORD of hosts, the God of Israel, to all the exiles. (Jeremiah 29:4–7)",
    ]) {
      expect(quotesScripture(md), md).toBe(true);
    }
  });

  it("does not take a bare reference, or a quotation of someone else, for a Scripture quotation", () => {
    for (const md of [
      "Paul's letter to Rome (Romans 13) has been read many ways.",
      'Augustine wrote, "You have made us for yourself" in the Confessions.',
      "The council met in 325 (see the creed).",
    ]) {
      expect(quotesScripture(md), md).toBe(false);
    }
  });
});

describe("owesEsvNotice", () => {
  const QUOTED = '"Seek the welfare of the city" (Jeremiah 29:7).';

  it("holds a rewrite to the house rule: it quotes Scripture, so it quotes the ESV", () => {
    expect(owesEsvNotice(QUOTED, { rewrite: true })).toBe(true);
    expect(owesEsvNotice("No quotations of Scripture here.", { rewrite: true })).toBe(false);
  });

  it("does not claim the ESV for an older essay that does not name it", () => {
    expect(owesEsvNotice(QUOTED, { rewrite: false })).toBe(false);
  });

  it("gives the notice to any essay whose text names the ESV", () => {
    expect(owesEsvNotice("The word the ESV translates as welfare.", { rewrite: false })).toBe(true);
    expect(owesEsvNotice("From the English Standard Version.", { rewrite: false })).toBe(true);
  });
});
