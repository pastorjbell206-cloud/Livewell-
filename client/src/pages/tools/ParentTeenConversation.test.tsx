/**
 * The Parent and Teen Conversation keeps its promises: the code carries only
 * the side and four area totals, a code from the same side is refused, and
 * the conversation opens where parent and teen see home differently.
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { TestProviders } from "@/test/harness";
import ParentTeenConversation, { ITEMS, AREAS, QUESTIONS, encodePT, decodePT } from "./ParentTeenConversation";

function renderIt() {
  const { hook } = memoryLocation({ path: "/tools/parent-teen-conversation" });
  return render(
    <TestProviders>
      <Router hook={hook}>
        <ParentTeenConversation />
      </Router>
    </TestProviders>,
  );
}

describe("parent and teen codes", () => {
  it("round-trips the side and four totals", () => {
    const code = encodePT("teen", [9, 12, 6, 15]);
    expect(code).toBe("PT1-T9C6F");
    expect(decodePT(code)).toEqual({ side: "teen", scores: [9, 12, 6, 15] });
    expect(decodePT("PT1-X9C6F")).toBeNull();
    expect(decodePT("PT1-T9C6")).toBeNull();
  });

  it("has three statements and three questions for every area", () => {
    for (const a of AREAS) {
      expect(ITEMS.filter((i) => i.area === a)).toHaveLength(3);
      expect(QUESTIONS[a]).toHaveLength(3);
    }
  });
});

describe("ParentTeenConversation", () => {
  function answerAll(value: string) {
    for (const item of ITEMS) {
      const group = screen.getByRole("group", { name: new RegExp(item.parent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) });
      fireEvent.click(group.querySelector(`input[value="${value}"]`)!);
    }
  }

  it("gives a code after all twelve answers, then compares with the teen's", () => {
    renderIt();
    fireEvent.click(screen.getByRole("button", { name: "I'm the parent" }));
    answerAll("4"); // every area 12
    fireEvent.click(screen.getByRole("button", { name: "See my code" }));
    expect(screen.getByText("PT1-PCCCC")).toBeInTheDocument();

    // A code from another parent is refused.
    fireEvent.change(screen.getByLabelText(/The code from your teen/), { target: { value: "PT1-P9999" } });
    fireEvent.click(screen.getByRole("button", { name: "Compare" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/another parent/);

    // The teen sees Talking at 6 (gap 6) and the rest the same.
    fireEvent.change(screen.getByLabelText(/The code from your teen/), { target: { value: "PT1-T6CCC" } });
    fireEvent.click(screen.getByRole("button", { name: "Compare" }));
    expect(screen.getByText(/Talking: you see this differently/)).toBeInTheDocument();
    expect(screen.getByText(QUESTIONS.Talking[0])).toBeInTheDocument();
    expect(screen.getByText(/Trust: you see this much the same/)).toBeInTheDocument();
  });
});
