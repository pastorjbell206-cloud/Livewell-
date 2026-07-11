# Email Tracks — the formation sequences

> Next-Ten #3. A subscriber who picks a track should enter a designed path,
> not a list. Each track is six weekly emails, one essay each, in an order
> that forms: complete on its own, handing off to the essay, ending at the
> book and /answers as standing offers with no clock. Every quoted line is
> character-exact to its essay (machine-verified); voice sweeps clean; no
> pressure anywhere — the doubter track carries explicit exits.

- `skeptic-track.md` — for the "skeptic" segment. Arc: the table-setter →
  the wager → the resurrection → the Bible → suffering → faith & science.
  Ends at *Born Again From Atheism* and /answers.
- `doubter-track.md` — for the "Christian with questions" segment. Arc:
  permission → anger → the silence → the church wound → the coal → the
  rebuild. Ends at *Faith After Deconstruction* and /answers. Care posture:
  no attendance asks, no timelines, explicit permission to delete.

## Wiring (owner steps, ~10 minutes per track)

The site's segmented signup already captures the track choice; these
sequences load into whichever sender owns email:

**Mailchimp:** Audience → Signup response drives a tag per track →
Automations → "Customer Journey": trigger = tag added, then six "Send email"
steps with a 7-day delay between each. Paste each week's subject and body;
replace `[link: /writing/<slug>]` with the full URL
(https://www.livewellbyjamesbell.co/writing/<slug>).

**Substack:** Substack has no per-segment drip; use it for the weekly
broadcast and keep the tracks in Mailchimp — or send the tracks manually to
the segment once a week from the doc.

Keep the send order fixed; the sequences build. If an essay is ever
retitled, update the email that carries it — each email quotes its essay.
