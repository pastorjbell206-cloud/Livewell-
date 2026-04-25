export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
// Hardened: returns a safe local fallback if VITE_OAUTH_PORTAL_URL or VITE_APP_ID
// are missing at build time, so a missing env var never crashes the app.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;

  if (!oauthPortalUrl || !appId) {
    if (typeof console !== "undefined") {
      console.error(
        "[getLoginUrl] Missing VITE_OAUTH_PORTAL_URL or VITE_APP_ID at build time. Falling back to /admin/login."
      );
    }
    return "/admin/login";
  }

  try {
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const state = btoa(redirectUri);

    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");

    return url.toString();
  } catch (err) {
    console.error("[getLoginUrl] Failed to build login URL:", err);
    return "/admin/login";
  }
};
