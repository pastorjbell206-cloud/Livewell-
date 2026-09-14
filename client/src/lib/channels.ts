/**
 * Where James publishes, outside this site.
 *
 * One source of truth. The Facebook URL was previously hardcoded in three
 * separate files (SEOMeta's Person schema, AuthorProfile, About), which is how
 * a moved account ends up half-updated. Everything external now points here.
 *
 * ADDING A CHANNEL: fill in the url and set `live: true`. A channel with
 * `live: false` renders nowhere — it is a placeholder for a platform James has
 * mentioned but not yet given a link for. Never guess a URL: a wrong link to a
 * real person's account is worse than no link.
 */
export interface Channel {
  id: string;
  /** What the reader sees. */
  label: string;
  /** One line: what they get by following here. */
  blurb: string;
  url: string;
  /** false → not rendered anywhere. Awaiting a real URL from James. */
  live: boolean;
}

export const CHANNELS: Channel[] = [
  {
    id: "substack",
    label: "The newsletter",
    blurb: "New essays in your inbox, plus thinking that never makes it to the site.",
    url: "https://substack.com/@jamesbell333289",
    live: true,
  },
  {
    id: "facebook",
    label: "Facebook",
    blurb: "Short pastoral notes, most days. The largest room James writes into.",
    url: "https://www.facebook.com/james.bell.609252",
    live: true,
  },
  {
    id: "ends",
    label: "ENDS",
    blurb: "The initiative equipping pastors in remote regions around the world.",
    // Given by James as "ends initiative dot org". Outbound requests are
    // blocked in this environment, so it could not be opened to confirm.
    url: "https://endsinitiative.org",
    live: true,
  },
  {
    id: "podcast",
    label: "Following the Way",
    blurb: "The podcast. Conversations on theology and the weight of everyday life.",
    // Given by James as http. Left exactly as provided: an http link follows a
    // redirect to https where the host offers one, whereas guessing https
    // breaks outright if it does not. Upgrade when the host is confirmed.
    url: "http://followingthewaypodcast.com/",
    live: true,
  },
];

/** The channels with a real URL, in display order. */
export function liveChannels(): Channel[] {
  return CHANNELS.filter((c) => c.live && c.url.trim().length > 0);
}

/** Canonical external profiles, for the Person schema's sameAs. */
export const SAME_AS: string[] = [
  "https://pastorsconnectionnetwork.com",
  ...liveChannels().map((c) => c.url),
];
