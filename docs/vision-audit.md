# Vision, Direction & Clarity Audit — LiveWell by James Bell

A strategic audit of the live site against one bar: does it communicate a clear
vision, hold a coherent direction, and let each visitor understand — in seconds —
what this is, who it is for, and what to do next. Grounded in the actual repo
(Home, nav, footer, taxonomy, the hubs, the conversion surfaces) and the governing
docs (`CLAUDE.md`, `docs/EDITORIAL-CONSTITUTION.md`, `client/src/lib/positioning.ts`).

---

## The one-sentence diagnosis

The vision is strong and the writing is deep. The problem is not the vision. It is
that the site expresses that one vision through **seven different organizing
systems at once**, so the reader has to reverse-engineer the architecture instead
of being carried by it. Elite is not more content. Elite is one spine, stated out
loud, that every page hangs on.

---

## 1. VISION — is it clear?

**The vision itself is excellent and already written down.** The Editorial
Constitution states the central question cleanly: *how can Christians live
faithfully in a post-Christian America while recovering the depth of historic
Christianity.* The core thesis is sharp: *the future does not belong to stronger
tribes; it belongs to deeper disciples.* That is a world-class North Star.

**The gap: that North Star is never said on the site.** It lives in
`docs/EDITORIAL-CONSTITUTION.md`, where no reader will ever look. The homepage
leads with a different line ("Theology that carries the weight of everyday life"),
the About page with a third ("for the reader whose faith has outgrown the answers
they were given"), and the tagline ("Connecting the depth of theology to the
weight of everyday life") appears only in `CLAUDE.md`. Each is good. None is
wrong. But a visitor meets four different answers to "what is this," and the
strongest one — the thesis about deeper disciples — is the one they never see.

**Verdict:** Vision: 9/10 as written, 5/10 as expressed. The fix is articulation,
not invention.

---

## 2. DIRECTION — is it coherent?

This is the weakest dimension, and it is fixable. The site currently presents
**seven competing organizing schemes**, each legitimate, none reconciled:

| Scheme | Count | Where the reader meets it |
|---|---|---|
| Five Pillars (old) | 5 | Nav, footer, homepage pillar section |
| Six Pillars / "two movements" (new) | 6 | `/pillars` page only |
| Tracks | 13 | Writing filters, nav dropdowns |
| Sub-pathways | ~15 | Nav dropdowns |
| Mission doors | 4 | Homepage only ("Become a Disciple / Make Disciples / Leadership Training / Prophetic Justice") |
| Felt-need categories | 12+ | `/help` only |
| Life domains | 7+ | `/life` only |

A reader who clicks "Prophetic Justice" meets it as a homepage door, a pillar
card, a nav fold ("Post-Christian World"), and a standalone hub — with different
names and scopes each time. The Editorial Constitution itself flags this as an
unresolved open decision. It is the central direction problem.

### Redundant hub clusters (same job, many doors)
- **"Start here" — five front doors:** `/start` (quiz), `/help` (felt-needs),
  `/diagnostic` (health check), `/start-here` (legacy), plus the homepage doors.
- **"Make disciples" — three hubs, three different UX models:** `/discipleship`
  (checkbox tracker), `/disciple-making` (article pathway), `/table` (home
  studies). The homepage "Make Disciples" door points at a fourth thing
  (`/resources`).
- **"The Library" — three different things:** `/pillars` (titled "The Library"),
  `/library` (a commonplace quote book), `/read` (online books).
- **"Pastors" — four hubs:** `/leadership`, `/for-pastors`, `/pastors` (PCN),
  `/pastors-resource-wall`.
- **"Everyday life" — four overlapping homes:** `/life`, `/marriage`,
  `/parenting`, `/family`.

### Orphans (published, but unreachable from nav/footer/content)
`/framework`, `/library`, `/skeptic-track`, `/roadmap`, `/exile`,
`/article-collections`, `/book-bundles`, and the ~10 `/landing/*` crisis pages.
A reader cannot find these without typing the URL.

**Verdict:** Direction: 4/10. Tremendous depth, fragmented map.

---

## 3. CLARITY — the first-time visitor

Rated on the only test that matters in the first five seconds:

| Question | Score | Why |
|---|---|---|
| What IS this? | 6/10 | Evocative headline, but is it a blog, a platform, a course, a church? Never stated. |
| Who is it FOR? | 5/10 | Four doors imply role-based routing; the stated priority audiences (skeptics, then Christians, then pastors) don't match the doors. |
| What do I DO next? | 7/10 | CTAs exist, but five of them compete on the homepage, and there is no single "I don't know where to start" answer surfaced above the fold. |

Specific clarity costs:
- **Identity unstated.** It is a personal brand ("by James Bell") wearing the
  clothes of an institution (five pillars, tracks, study guides, a network). True,
  but the reader is left to guess which, and a skeptic reads "one guy's takes."
- **"Post-Christian America" is assumed, never defined** on arrival — the
  diagnosis the whole project rests on.
- **Doors demand self-identification before exploration.** "Become a Disciple" vs
  "Make Disciples" asks the reader to already know their role.
- **The emotional brief is half-delivered.** The visual ("a serious book in a
  quiet room") lands. The copy underneath is crisis-and-rebuild language —
  contemplative design, clarion words. Choose one register for arrival.

**Verdict:** Clarity: 6/10. A confident reader finds gold; a first-timer hits
friction in ten seconds — from architecture, not design.

---

## 4. CONVERSION & GROWTH — does the vision turn into a relationship?

The segmentation idea (capture audience at signup, send a tailored welcome) is
genuinely world-class. It is also barely used.

- **Two email components, two different outcomes.** `SegmentedSignup` (records
  audience type) is on 2 pages. `NewsletterSignup` (records email only, **no
  segment**) is on ~26. So most subscribers can never receive the segment-specific
  welcome the system was built for. The best mechanic is shadowed by the lesser one.
- **The pastor funnel — the stated highest-leverage channel — is the most broken.**
  Three disconnected pastor hubs; the PCN join is an external link with no on-site
  email capture and no segment recorded; no path from reader → PCN → membership.
- **The highest-converting lead magnet (the life diagnostic) is orphaned** — never
  linked from `/marriage` or `/parenting`, the exact readers it converts.
- **Membership reads as an exit, not a progression.** No path carries a newsletter
  reader toward it; its copy speaks to pastors and skeptics but not to the ordinary
  Christian or the marriage/parenting reader.
- **Substack appears with no introduction** — the handoff ("confirm in Substack")
  surprises a reader who was never told the letter lives there.

**Verdict:** Growth: 5/10. Excellent instincts, incomplete funnels.

---

## 5. THE RECOMMENDATIONS — to make this elite and world-class

Ordered by leverage. "Now" items are high-impact and mostly low-effort; they buy
the most clarity per hour. Each is concrete.

### NOW — the spine (do these first; they fix 80% of the confusion)

1. **Pick ONE taxonomy and make every surface obey it.** Decide between the five
   old pillars and the six new "two movements" pillars. Then update nav, footer,
   homepage, and `/pillars` to the same names, same order, same count. Today they
   disagree. This single decision resolves the deepest direction problem. (Per the
   Constitution, this is an explicit open decision — make it.)

2. **Say the vision out loud, above the fold.** Put the thesis on the homepage in
   one line a stranger understands: e.g. *"The future of the church will not belong
   to stronger tribes. It will belong to deeper disciples. This is where that depth
   is taught."* One promise, stated, before the doors.

3. **Collapse the four homepage "doors" into the chosen taxonomy — or drop them.**
   Right now doors (intent) and pillars (content) are two maps of the same
   territory shown side by side. Keep one. If you keep doors, make each door lead
   into the pillar structure, not a separate silo.

4. **One "Start here," not five.** Make `/start` the single front door (a short
   "what brought you here" router). Redirect `/start-here`; fold `/diagnostic` and
   `/help` in as branches *of* `/start`, not rival entrances. Surface it above the
   fold for the undecided visitor.

5. **Define "post-Christian America" in one sentence where the phrase first
   appears.** The whole project rests on this diagnosis; do not assume it.

6. **Name things what they are.** "The Library" should mean exactly one thing
   (recommend: `/read`, the books). Rename `/pillars` to "The Writing" and
   `/library` to "The Commonplace." "Resources," "Framework," and "Wisdom" each
   need a one-line "what this is" header.

### NEXT — the funnels (turn clarity into relationship)

7. **Unify email capture on segmentation.** Replace `NewsletterSignup` with
   `SegmentedSignup` on every high-intent page (skeptic pages, pastor pages,
   marriage/parenting), or have context pages pre-set the audience. Goal: the large
   majority of new subscribers carry a segment so the welcome series actually fires.

8. **Build the pastor funnel on-site (highest leverage).** On `/pastors`: capture
   the email *before* the external PCN handoff, record audience = pastor, and frame
   the progression (free essays → the Pastor's Letter → the PCN community →
   membership). Make "Join the PCN" the single primary CTA on `/for-pastors`;
   subordinate the resource wall. Merge the four pastor hubs into two: a content
   hub (`/leadership`) and a community page (`/pastors`).

8b. **Consolidate the three "make disciples" hubs** into one `/discipleship` page
   with three clearly-labeled rooms: the personal pathway, the home-table studies,
   and the leader's guide — each with "use this when…".

9. **Surface the lead magnets where their readers already are.** Link the life
   diagnostic from `/marriage` and `/parenting`; link the leadership audit from
   `/leadership`. Stop hiding the highest-converting offers.

10. **Make membership a progression, not a door.** Add a light, periodic "what
    members get" beat to the newsletter; add a membership line to the end of
    long essays; write one FAQ answer each for the ordinary Christian and the
    marriage/parenting reader. Keep the honest "waitlist vs live" behavior.

11. **Introduce Substack in one line** ("the weekly letter goes out on Substack")
    and update the post-signup message so the handoff is expected, not jarring.

### LATER — the polish that signals "serious publisher"

12. **Give every detail page a next step.** Articles, tools, study guides, and book
    chapters currently dead-end. Add "read next" / "back to the hub" so no page is
    a cul-de-sac.

13. **Resolve the orphans.** Either link `/framework`, `/skeptic-track`,
    `/reading-paths`, `/exile`, and the `/landing/*` pages from nav/footer/`/start`,
    or retire them. No published page should be reachable only by URL.

14. **Decide reader-facing filtering: tracks or sub-pathways, not both.** Pick one
    filter model for `/writing` and the nav dropdowns.

15. **Pick one register for arrival.** Either lead contemplative (match the "quiet
    room" design) or lead clarion (match the "rebuild the faith" copy). Right now
    the design and the words pull against each other.

16. **Tighten the homepage to one primary CTA per section.** Today the front page
    makes five asks at once (read / find your track / skeptic / subscribe / pick a
    pillar). Give each section a single dominant action.

---

## 6. The single highest-leverage move

If only one thing happens: **choose one taxonomy, state the thesis on the homepage,
and make the pastor funnel run on-site.** The first two give the whole site a
spine a stranger can feel in five seconds. The third turns the stated growth
channel (PCN) from a leak into an engine. Everything else compounds off those.

---

*Prepared as a strategic companion to `docs/WORLD-CLASS-BRIEF.md` and the
Editorial Constitution. This audit recommends direction; it changes no code.*
