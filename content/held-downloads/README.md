# Held ebooks

These seven PDFs are off the site. Each one names the Pastors Connection
Network inside the file, and James's word (2026-11-17) is that the network
stays off this site. On 2026-11-18 he made every other ebook free and said to
hold these back until he sends corrected files.

| File | Where it names the network |
|---|---|
| alone-in-a-crowded-church.pdf | in the text |
| consider-the-birds.pdf | in the text |
| heaven-is-not-your-reward.pdf | in the text |
| marriage-in-ministry.pdf | in the text |
| prophetic-justice-101.pdf | in the text |
| the-loneliness-of-the-pastor.pdf | in the text |
| where-your-treasure-is.pdf | in the text |

What still reads them: the paid download in `api/index.ts` (`EBOOKS`,
`/api/download`). Someone who bought one before 2026-11-18 can still open
their old thank-you page (`/<slug>/thank-you?session_id=...`) and download
their copy after the Stripe check. Nothing else serves them, and no page
lists them. `vercel.json` bundles this folder into the API function
(`functions["api/index.ts"].includeFiles`).

Each book's old address (`/<slug>`) shows a short page saying the book is
being revised, with a way on to the free ebooks (`pages/HeldEbook.tsx`).

To bring one back: put the corrected PDF at
`client/public/ebook/<slug>/<slug>.pdf`, move its entry from `HELD_EBOOKS` to
`FREE_EBOOKS` in `client/src/data/ebooks.ts`, point its `EBOOKS` entry in
`api/index.ts` at the served file (`href`, no `file`), route `/<slug>` to the
free download page again (vercel.json and App.tsx), and delete the file here.
