/** Types for giving.mjs, for the client tests that read the build's side of the switch. */
export const SUPPORT_PATH: string;
export const SUPPORT_HEAD: { path: string; title: string; description: string; type: string };
export function givingOpen(): boolean;
export function supportNoindex(open?: boolean): boolean;
export function supportSitemapPages(open?: boolean): { url: string; priority: string; changefreq: string }[];
export function supportSearchPages(open?: boolean): { title: string; href: string; blurb: string; keywords: string }[];
export function llmsWithSupport(text: string, open?: boolean): string;
export function writeBuiltLlms(distDir: string, open?: boolean): boolean;
