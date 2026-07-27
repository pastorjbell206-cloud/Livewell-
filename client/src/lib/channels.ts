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
    id: "youtube",
    label: "YouTube",
    blurb: "Teaching and talks.",
    url: "",
    live: false,
  },
  {
    id: "podcast",
    label: "The podcast",
    blurb: "Conversations on theology and the weight of everyday life.",
    url: "",
    live: false,
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
