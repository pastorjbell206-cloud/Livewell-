export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
// Manus OAuth portal is no longer used; if the env var is missing, fall back
// to a safe same-origin URL so the admin UI does not crash on /admin load.
export const getLoginUrl = () => {
    const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
    const appId = import.meta.env.VITE_APP_ID;

    // Manus is decommissioned. If either env var is missing, return a harmless
    // same-origin URL so accidental navigation does not throw "Invalid URL".
    if (!oauthPortalUrl || !appId) {
          return `${window.location.origin}/admin`;
    }

    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const state = btoa(redirectUri);

    try {
          const url = new URL(`${oauthPortalUrl}/app-auth`);
          url.searchParams.set("appId", appId);
          url.searchParams.set("redirectUri", redirectUri);
          url.searchParams.set("state", state);
          url.searchParams.set("type", "signIn");
          return url.toString();
    } catch {
          // Defensive fallback if oauthPortalUrl is somehow malformed.
      return `${window.location.origin}/admin`;
    }
};
