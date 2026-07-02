/**
 * fetchJson — fetch + res.ok + parse + optional shape guard in one throwing
 * seam (roadmap HS-4, audit 15 H2 / audit 07 R4).
 *
 * The point is what call sites DO with the throw: instead of
 * `.catch(() => {})` and an infinite "Loading…", the loader keys its effect
 * on [slug, nonce], sets an error state in the catch, and renders the
 * <LoadFailed> panel with a Retry that bumps the nonce. Loading, failed, and
 * loaded-but-empty become three distinguishable states.
 */
export async function fetchJson<T = unknown>(
  url: string,
  validate?: (x: unknown) => x is T,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`fetch ${url} → ${res.status}`);
  const data: unknown = await res.json();
  if (validate && !validate(data)) throw new Error(`fetch ${url} → unexpected shape`);
  return data as T;
}
