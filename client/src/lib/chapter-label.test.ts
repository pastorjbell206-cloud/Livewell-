import { describe, expect, it } from "vitest";
import { chapterLabel } from "./chapter-label";

describe("chapterLabel", () => {
  it("numbers every chapter, digit or word, the same way", () => {
    expect(chapterLabel("1")).toBe("Chapter 1");
    expect(chapterLabel("Two")).toBe("Chapter Two");
    expect(chapterLabel("Three")).toBe("Chapter Three");
    expect(chapterLabel("Fourteen")).toBe("Chapter Fourteen");
  });
  it("lets front and back matter stand alone", () => {
    expect(chapterLabel("Introduction")).toBe("Introduction");
    expect(chapterLabel("Conclusion")).toBe("Conclusion");
    expect(chapterLabel("Afterword")).toBe("Afterword");
  });
});
