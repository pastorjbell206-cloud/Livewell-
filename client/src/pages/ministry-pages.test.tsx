/**
 * The ministry pages: /about (James as the ministry), /speaking (which absorbs
 * /work-with-james), and /contact. The form on both posts the same body the
 * old Work with James form did to /api/contact (a production-only handler in
 * api/index.ts), so the admin inbox reads the same before and after the fold.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, within, fireEvent, waitFor } from "@testing-library/react";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import About from "./About";
import Speaking from "./Speaking";
import Contact from "./Contact";

afterEach(() => {
  vi.unstubAllGlobals();
});

function stubContact(response: Response) {
  const calls: { url: string; body: unknown }[] = [];
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "/api/contact") {
        calls.push({ url, body: JSON.parse(String(init?.body)) });
        return response;
      }
      return base(input, init);
    })
  );
  return calls;
}

const main = () => screen.getByRole("main");

describe("/about", () => {
  it("leads with the person and carries his story under its own heading", () => {
    stubContact(new Response("{}"));
    renderWithProviders(<About />);
    expect(screen.getByRole("heading", { level: 1, name: "James Bell" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "My story in my own words" })).toBeTruthy();
    expect(screen.getByText(/I was an atheist before I was a Christian/, { selector: "section p" })).toBeTruthy();
    // The long version links only once the essay is on the shelf; today it is not.
    expect(screen.queryByText(/Read the long version/)).toBeNull();
  });

  it("links Speaking, Contact, the newsletter, PCN, and ENDS", () => {
    stubContact(new Response("{}"));
    renderWithProviders(<About />);
    const reach = within(screen.getByRole("region", { name: "Reach James" }));
    expect(reach.getByRole("link", { name: /^Speaking/ }).getAttribute("href")).toBe("/speaking");
    expect(reach.getByRole("link", { name: /^Contact/ }).getAttribute("href")).toBe("/contact");
    expect(reach.getByRole("link", { name: /^The newsletter/ }).getAttribute("href")).toBe("/subscribe");
    const elsewhere = within(screen.getByRole("region", { name: "Everywhere James is" }));
    expect(elsewhere.getByRole("link", { name: /^Pastors Connection Network/ }).getAttribute("href")).toBe("https://pastorsconnectionnetwork.com");
    expect(elsewhere.getByRole("link", { name: /^ENDS/ }).getAttribute("href")).toBe("https://endsinitiative.org");
  });
});

describe("/speaking", () => {
  it("posts a speaking request to /api/contact and confirms it", async () => {
    const calls = stubContact(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    renderWithProviders(<Speaking />);
    expect(screen.getByRole("heading", { level: 1, name: "Speaking and preaching" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Coaching and consulting" })).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ruth" } });
    fireEvent.change(screen.getByLabelText("Email (required)"), { target: { value: "ruth@example.com" } });
    fireEvent.change(screen.getByLabelText("Message (required)"), { target: { value: "A retreat in May." } });
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    await waitFor(() => expect(screen.getByRole("status").textContent).toContain("Message sent"));
    expect(calls).toEqual([
      { url: "/api/contact", body: { name: "Ruth", email: "ruth@example.com", subject: "Speaking", message: "A retreat in May." } },
    ]);
  });

  it("says what went wrong and offers the email when the message does not save", async () => {
    stubContact(new Response(JSON.stringify({ ok: false, error: "We couldn't save your message. Please try again." }), { status: 500 }));
    renderWithProviders(<Speaking />);
    fireEvent.change(screen.getByLabelText("Email (required)"), { target: { value: "ruth@example.com" } });
    fireEvent.change(screen.getByLabelText("Message (required)"), { target: { value: "Hello" } });
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("We couldn't save your message.");
    expect(within(alert).getByRole("link").getAttribute("href")).toBe("mailto:Pastorjbell206@gmail.com");
  });
});

describe("/contact", () => {
  it("has the form, the email, and a path to real help", () => {
    stubContact(new Response("{}"));
    renderWithProviders(<Contact />);
    expect(screen.getByRole("heading", { level: 1, name: "Write to James" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Send message" })).toBeTruthy();
    expect(within(main()).getAllByRole("link", { name: "Pastorjbell206@gmail.com" })[0].getAttribute("href")).toBe("mailto:Pastorjbell206@gmail.com");
    expect(within(main()).getByRole("link", { name: "Find Help" }).getAttribute("href")).toBe("/help");
    expect(within(main()).getByRole("link", { name: "The speaking page" }).getAttribute("href")).toBe("/speaking");
  });
});
