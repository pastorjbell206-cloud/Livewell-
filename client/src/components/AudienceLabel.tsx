/**
 * Small label that appears at the top of every article saying who it's for.
 * James's three-audience model (skeptic / Christian / pastor) is the
 * positioning. Surface it on every essay so readers self-select fast.
 */

interface AudienceLabelProps {
  audience: string | null | undefined;
  readingTimeMinutes?: number | null;
}

const AUDIENCE_TEXT: Record<string, string> = {
  individuals: "For: anyone",
  couples: "For: couples",
  pastors: "For: pastors",
  "church-leaders": "For: church leaders",
  "small-groups": "For: small groups",
};

export function AudienceLabel({
  audience,
  readingTimeMinutes,
}: AudienceLabelProps) {
  const audienceText = audience
    ? (AUDIENCE_TEXT[audience] ?? `For: ${audience.replace(/-/g, " ")}`)
    : "For: anyone";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        fontFamily: "var(--U)",
        fontSize: "11px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.16em",
        color: "var(--ink-muted)",
      }}
    >
      {readingTimeMinutes && (
        <>
          <span>{readingTimeMinutes} min read</span>
          <span aria-hidden style={{ color: "var(--mustard-text)" }}>·</span>
        </>
      )}
      <span>{audienceText}</span>
    </div>
  );
}

export default AudienceLabel;
