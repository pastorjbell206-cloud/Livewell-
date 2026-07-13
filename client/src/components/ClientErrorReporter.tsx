/**
 * ClientErrorReporter — mounts global handlers for errors React can't catch:
 * uncaught runtime errors (window "error") and unhandled promise rejections.
 * React render errors are reported by ErrorBoundary instead. Mounted once at
 * the app root; renders nothing. Every path is best-effort via reportClientError.
 */
import { useEffect } from "react";
import { reportClientError } from "@/lib/report-error";

export function ClientErrorReporter() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onError = (e: ErrorEvent) => {
      reportClientError({
        message: e.message || String(e.error?.message || "window error"),
        stack: e.error?.stack ?? (e.filename ? `${e.filename}:${e.lineno}:${e.colno}` : null),
        kind: "window",
      });
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const reason: any = e.reason;
      reportClientError({
        message: reason?.message ? String(reason.message) : String(reason || "unhandled rejection"),
        stack: reason?.stack ?? null,
        kind: "promise",
      });
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}

export default ClientErrorReporter;
