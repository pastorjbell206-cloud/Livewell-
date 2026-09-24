import { Component, ReactNode } from "react";
import { reportClientError } from "@/lib/report-error";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    // The reader gets a calm line; the console keeps the real error; and the
    // owner gets a record in the admin Errors panel so a broken page is visible.
    console.error(error);
    reportClientError({ message: error?.message || "React render error", stack: error?.stack ?? null, kind: "react" });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bone)",
            padding: "var(--s-4)",
          }}
        >
          <div style={{ maxWidth: "560px", textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(26px, 4vw, 34px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                color: "var(--ink)",
                marginBottom: "12px",
              }}
            >
              Something broke on our side — not yours.
            </h2>
            <p
              style={{
                fontFamily: "var(--B)",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "var(--ink-muted)",
                marginBottom: "var(--s-4)",
              }}
            >
              Reload the page. If it keeps happening, email{" "}
              <a
                href="mailto:Pastorjbell206@gmail.com"
                style={{ color: "var(--mustard-text)" }}
              >
                Pastorjbell206@gmail.com
              </a>{" "}
              and we'll fix it.
            </p>

            {import.meta.env.DEV && this.state.error?.stack && (
              <pre
                style={{
                  textAlign: "left",
                  fontSize: "12px",
                  lineHeight: 1.5,
                  color: "var(--ink-muted)",
                  background: "var(--bone-warm)",
                  padding: "16px",
                  marginBottom: "var(--s-4)",
                  overflow: "auto",
                  maxHeight: "240px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {this.state.error.stack}
              </pre>
            )}

            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: "var(--charcoal)",
                  color: "var(--charcoal-fg)",
                  border: "none",
                  borderBottom: "2px solid var(--mustard)",
                  borderRadius: "var(--radius-sm)",
                  padding: "13px 28px",
                  fontFamily: "var(--U)",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Reload the page
              </button>
              <a
                href="/"
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--ink)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--mustard)",
                  paddingBottom: "2px",
                }}
              >
                Back to the front page
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
