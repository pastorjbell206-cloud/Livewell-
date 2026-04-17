import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

export default function Tools() {
  return (
    <Layout>
      <SEOMeta
        title="Tools | LiveWell by James Bell"
        description="Practices, inventories, and guides for marriage, parenting, doubt, and pastoral ministry. Released one at a time. Built to cost something."
        keywords="Christian practices, marriage inventory, rule of life, pastoral tools, LiveWell, James Bell"
        url="https://www.livewellbyjamesbell.co/tools"
        type="webpage"
      />
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "64px 24px" }}>
        <p style={{ fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", color: "#8B6B3E", marginBottom: "24px" }}>
          Tools
        </p>
        <h1 style={{ fontSize: "44px", lineHeight: 1.15, color: "#1A1A1A", marginBottom: "32px", fontWeight: 700 }}>
          No tool fixes what only practice can.
        </h1>
        <div style={{ fontSize: "18px", lineHeight: 1.7, color: "#333" }}>
          <p>
            People come to pages like this looking for the thing that will make faith easier. The clean checklist. The five-minute habit that unblocks everything. I have wanted that thing too. It does not exist.
          </p>
          <p>
            What does exist is practice. A set of honest questions you ask yourself every Friday for a year. A rule of life you keep, even on the weeks you do not want to. A marriage inventory you finish even when it costs the evening. An examen that refuses to let you off the hook.
          </p>
          <p>
            Those are coming. I am writing them the way I write everything: slowly, with the reader in the indictment, and only when the piece is ready to ask something real of you.
          </p>
          <p style={{ color: "#6B6B6B", fontStyle: "italic", marginTop: "40px" }}>
            First releases, in order:
          </p>
          <ul style={{ paddingLeft: "20px", marginTop: "12px", color: "#333" }}>
            <li style={{ marginBottom: "10px" }}>The Marriage Distance Inventory &mdash; 24 questions most couples will not answer out loud.</li>
            <li style={{ marginBottom: "10px" }}>A Rule of Life for People Who Have Already Burned Out Once.</li>
            <li style={{ marginBottom: "10px" }}>The Resentment Examen &mdash; a weekly practice for the thing you are pretending not to feel.</li>
            <li style={{ marginBottom: "10px" }}>Pastor&rsquo;s Week-Ending Questions &mdash; the short list I use on Fridays before I go home.</li>
          </ul>
          <p style={{ marginTop: "40px", color: "#1A1A1A", fontWeight: 600 }}>
            When a tool goes up here, it will already have cost me something to write. It will ask the same of you.
          </p>
        </div>
      </section>
    </Layout>
  );
}
