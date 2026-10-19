/**
 * Listen: the essay read aloud by the device's own voice, one passage per
 * utterance, with Pause / Resume / Stop, silent when the reader leaves, and
 * absent where the browser has no voice. speechSynthesis is stubbed: jsdom
 * has none, and the test drives each utterance's end by hand.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useRef } from "react";

import { ListenButton, passagesOf } from "./ListenButton";

class FakeUtterance {
  text: string;
  lang = "";
  onend: (() => void) | null = null;
  onerror: ((e: { error: string }) => void) | null = null;
  constructor(text: string) {
    this.text = text;
  }
}

function installVoice() {
  const spoken: FakeUtterance[] = [];
  const synth = {
    speak: vi.fn((u: FakeUtterance) => {
      spoken.push(u);
    }),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    paused: false,
    speaking: false,
    getVoices: () => [],
  };
  vi.stubGlobal("speechSynthesis", synth);
  vi.stubGlobal("SpeechSynthesisUtterance", FakeUtterance);
  return { synth, spoken, last: () => spoken[spoken.length - 1] };
}

afterEach(() => {
  vi.unstubAllGlobals();
  document.documentElement.removeAttribute("lang");
});

function Essay() {
  const body = useRef<HTMLDivElement>(null);
  return (
    <>
      <nav>Study Essays Books Resources About</nav>
      <ListenButton target={body} title="When the Church Married Empire" byline="By James Bell" />
      <div ref={body}>
        <h2>The Long Arc</h2>
        <p>
          First paragraph with <em>emphasis</em> and a note<sup>1</sup>.
        </p>
        <blockquote>
          <div>
            <p>A quoted line.</p>
          </div>
          <button type="button">Share this quote</button>
        </blockquote>
        <ul>
          <li>One item</li>
          <li>
            Two <a href="#x">items</a>
          </li>
        </ul>
        <p>Last paragraph.</p>
      </div>
    </>
  );
}

const PASSAGES = [
  "When the Church Married Empire. By James Bell.",
  "The Long Arc",
  "First paragraph with emphasis and a note.",
  "A quoted line.",
  "One item",
  "Two items",
  "Last paragraph.",
];

describe("passagesOf", () => {
  it("reads the body in order, a passage per block, without buttons or footnote marks", () => {
    const root = document.createElement("div");
    root.innerHTML =
      '<h2>Heading</h2><p>Some <strong>bold</strong> text<sup><a href="#fn1">1</a></sup>.</p>' +
      "<blockquote><p>Line one</p><p>Line two</p></blockquote>" +
      "<ul><li>Outer<ul><li>Inner</li></ul></li></ul><p>  Spaced \n  out  </p><p></p>" +
      '<section class="footnotes"><ol><li><p>A note. <a href="#fnref1" data-footnote-backref="">↩</a></p></li></ol></section>';
    expect(passagesOf(root)).toEqual(["Heading", "Some bold text.", "Line one", "Line two", "Outer", "Inner", "Spaced out", "A note."]);
  });
});

describe("ListenButton", () => {
  it("is not shown where the browser has no voice", () => {
    render(<Essay />);
    expect(screen.queryByRole("button", { name: /Listen/ })).not.toBeInTheDocument();
  });

  it("reads the title and then the essay body, one passage per utterance, and never the navigation", () => {
    const voice = installVoice();
    // The site's index.html says <html lang="en">; the voice reads in that language.
    document.documentElement.lang = "en";
    render(<Essay />);

    fireEvent.click(screen.getByRole("button", { name: /Listen/ }));
    expect(screen.getByText("Reading aloud")).toBeInTheDocument();
    expect(voice.synth.speak).toHaveBeenCalledTimes(1);
    expect(voice.last().text).toBe(PASSAGES[0]);
    expect(voice.last().lang).toBe("en");

    for (let i = 1; i < PASSAGES.length; i++) {
      act(() => voice.last().onend?.());
      expect(voice.last().text).toBe(PASSAGES[i]);
    }
    expect(voice.spoken.map((u) => u.text)).toEqual(PASSAGES);
    expect(voice.spoken.some((u) => /Study Essays|Share this quote/.test(u.text))).toBe(false);

    // The last passage ends: back to Listen.
    act(() => voice.last().onend?.());
    expect(screen.getByRole("button", { name: /Listen/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Stop/ })).not.toBeInTheDocument();
  });

  it("pauses, resumes at the top of the same passage, and stops", () => {
    const voice = installVoice();
    render(<Essay />);

    fireEvent.click(screen.getByRole("button", { name: /Listen/ }));
    act(() => voice.last().onend?.());
    const second = voice.last();
    expect(second.text).toBe("The Long Arc");

    voice.synth.cancel.mockClear();
    fireEvent.click(screen.getByRole("button", { name: /Pause/ }));
    expect(voice.synth.cancel).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: /Resume/ })).toBeInTheDocument();
    expect(screen.getByText("Paused")).toBeInTheDocument();

    // The cancelled utterance ending late must not start the next passage.
    const count = voice.spoken.length;
    act(() => second.onend?.());
    expect(voice.spoken.length).toBe(count);

    fireEvent.click(screen.getByRole("button", { name: /Resume/ }));
    expect(voice.last().text).toBe("The Long Arc");
    expect(voice.last()).not.toBe(second);

    voice.synth.cancel.mockClear();
    fireEvent.click(screen.getByRole("button", { name: /Stop/ }));
    expect(voice.synth.cancel).toHaveBeenCalled();
    const listen = screen.getByRole("button", { name: /Listen/ });
    expect(listen).toHaveFocus();

    // Listen again starts from the top.
    fireEvent.click(listen);
    expect(voice.last().text).toBe(PASSAGES[0]);
  });

  it("stops the voice when the reader leaves the page", () => {
    const voice = installVoice();
    const view = render(<Essay />);
    fireEvent.click(screen.getByRole("button", { name: /Listen/ }));

    voice.synth.cancel.mockClear();
    view.unmount();
    expect(voice.synth.cancel).toHaveBeenCalled();
  });

  it("stops on pagehide (closing the tab, going back)", () => {
    const voice = installVoice();
    render(<Essay />);
    fireEvent.click(screen.getByRole("button", { name: /Listen/ }));
    const speaking = voice.last();

    voice.synth.cancel.mockClear();
    act(() => {
      window.dispatchEvent(new Event("pagehide"));
    });
    expect(voice.synth.cancel).toHaveBeenCalled();
    const count = voice.spoken.length;
    act(() => speaking.onend?.());
    expect(voice.spoken.length).toBe(count);
  });

  it("says so plainly when the browser cannot read aloud", () => {
    const voice = installVoice();
    render(<Essay />);
    fireEvent.click(screen.getByRole("button", { name: /Listen/ }));

    act(() => voice.last().onerror?.({ error: "synthesis-failed" }));
    expect(screen.getByText("This browser couldn't read the essay aloud.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Listen/ })).toBeInTheDocument();
  });

  it("gives every control a 44px target", () => {
    installVoice();
    render(<Essay />);
    fireEvent.click(screen.getByRole("button", { name: /Listen/ }));
    for (const name of [/Pause/, /Stop/]) {
      expect(screen.getByRole("button", { name }).style.minHeight).toBe("44px");
    }
  });
});
