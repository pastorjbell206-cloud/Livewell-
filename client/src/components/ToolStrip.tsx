import { EditorialIndex } from "@/components/editorial/EditorialIndex";

/**
 * ToolStrip — surfaces the working instruments inside the room they serve
 * (the audit's "re-attachment rule": a tool drawer at /tools is not a
 * workflow). Renders on light sections, usually inside a prose column, so the
 * tools read as a one-column index (the whole row is the link) rather than
 * boxes squeezed two across. The eyebrow is the strip's heading, so each tool
 * title sits under it in the outline.
 */
export interface ToolStripItem {
  href: string;
  label: string;
  blurb: string;
}

export default function ToolStrip({
  heading = "The instruments",
  intro,
  tools,
}: {
  heading?: string;
  intro?: string;
  tools: ToolStripItem[];
}) {
  if (!tools.length) return null;
  return (
    <div>
      <h2 className="eyebrow" style={{ marginBottom: "0.75rem" }}>{heading}</h2>
      {intro && (
        <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "1.4rem" }}>
          {intro}
        </p>
      )}
      <EditorialIndex
        columns={1}
        label={heading}
        items={tools.map((t) => ({ href: t.href, title: t.label, dek: t.blurb }))}
      />
    </div>
  );
}
