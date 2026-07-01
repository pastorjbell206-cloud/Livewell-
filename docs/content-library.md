# LiveWell Content Library — The Definitive Build-Out

> A working library, not a finished plan. Every proposed title below is a
> starting point in James's voice, meant to be reshaped, cut, or renamed. The
> point is to make the reading experience **definitive**: no dead paths, no
> "articles pending," no thin pillar. Built from an audit of all 161 existing
> essays so nothing here duplicates what you've already written.

---

## Part 1 — The audit: where it's thin, and why

### The structural problem (why you saw "articles pending")
There are **two disconnected reading-path systems**:

- `server/seed-reading-paths.ts` seeds **21 paths** into the database (`new-to-livewell`, `justice-mercy`, `pastoral-leadership`…), each declaring an article count of 5–15 — **with no actual articles assigned.**
- `client/src/pages/ReadingPathDetail.tsx` hardcodes **7 different paths** (`pastors-guide`, `cultural-engagement`…) and fills them by matching `post.topic`, a field most essays don't have set.

The slugs don't match between the two. So clicking most paths lands on "not found" or "No articles found… Check back soon." **The paths are real in the UI and empty underneath.** Fixing this is half wiring (assign real essays to each path) and half writing (fill the gaps below).

### Coverage by pillar (what exists today)
The existing 161 essays, by their stored pillar:

| Existing pillar | Essays | Maps to new pillar | Health |
|---|---:|---|---|
| Prophetic Justice | 45 | Reading Scripture past politics | **Strong** |
| Pastoral Ministry | 38 | The pastoral angle | **Strong** |
| Living Well | 29 | The pastoral angle | **Strong** |
| Theological Depth | 20 | Reading Scripture past politics | Solid |
| Leadership Formation | 16 | The pastoral angle | Solid |
| Faith & Theology | 10 | After Christendom (partly) | Thin |
| Prophetic Disruption | 3 | Capture (right/left) | **Bare** |

### The headline finding
The **abundant** content is pastoral care and biblical justice. The **scarce** content is the exact argument the homepage now leads with — *American Christianity has been captured by the right and the left.* The flagship thesis has the least supporting writing. That's the gap to close, in priority order:

1. **Capture by the right** — a handful of essays; needs a deep bench.
2. **Capture by the left** — the thinnest pillar on the site; needs the most net-new work.
3. **After Christendom** — has the serialized series (on Substack, pending import) but lacks the historical-arc essays around it.
4. **Reading Scripture past our politics** — strong, but missing the *lens* essays that name how tribe edits the text.
5. **The pastoral angle** — strong; needs only the bridge essays that connect pastoring to the capture thesis.

---

## Part 2 — The recommended architecture

Collapse the 21 broken, old-taxonomy paths into reading paths that mirror the **five pillars + the book**. Each becomes a real, ordered sequence with assigned essays. The old broad paths (spiritual warfare, prayer, finances, church history) either fold into the pillars or move to a clearly secondary "More from the archive" shelf — kept, not foregrounded.

**The definitive paths:**
1. **Start Here — Blind Spots** (the book, in order) — already built; needs the 11 imports.
2. **Capture by the Right**
3. **Capture by the Left**
4. **Reading Scripture Past Our Politics**
5. **The Church After Christendom**
6. **The Pastoral Angle** (pastoring through all of it)

Each path below lists the essays that already fill it and the net-new essays to write.

---

## Part 3 — The library, pillar by pillar

### Pillar 1 — Capture by the Right
**Role:** Name the fusion of cross and flag without caricature, and trace it to its root.
**Already written:** *When God Bless America Replaces Thy Kingdom Come · Not Persecuted—Seduced · When the Church Becomes a Political Brand.*
**Importing from the book:** *When Patriotism Becomes a Gospel · When Fear Becomes Theology · The Conservative Blind Spot · How American Individualism Distorts the Bible.*
**Write next:**
- **The Flag in the Sanctuary: How It Got There** — the historical arc from Constantine's bargain (312–325) through 1950s civil religion to now. Roots, not headlines.
- **Two Kingdoms, One Pledge** — what allegiance to a crucified King costs when the nation asks for it first.
- **The Persecution We Invented** — how comfort learned to call itself a cross.
- **Strongman Theology** — why a frightened church wants a king, read through Israel's demand in 1 Samuel 8.
- **Nostalgia Is Not the Kingdom** — the Christian America that never was, and why grief for it is misplaced.
- **The Third Temptation** — Matthew 4 and the offer of all the kingdoms; power was always the bait.
- **Six Verses We Memorized, Sixty We Skipped** — the selective canon of the political right.
- **When the Pulpit Became a Precinct** — the mechanics of a church turned voting bloc.

### Pillar 2 — Capture by the Left
**Role:** Name the quieter idolatries of the progressive church with the same honesty — the harder essay to write for this audience, which is exactly why it matters.
**Already written:** *Justice Without Love Is Ideology · Why Racial Reconciliation Without Repentance Is Just Branding.*
**Importing from the book:** *The Progressive Blind Spot.*
**Write next:**
- **The Right Side of History Is Not the Right Side of Scripture** — the pillar's thesis essay.
- **When Justice Becomes a Gospel of Its Own** — what happens when a good thing takes God's place.
- **The Sin We Stopped Naming** — the missing doctrine of sin in progressive Christianity.
- **Affirmation Is Not Love** — therapeutic culture and the love that tells the truth.
- **Deconstruction Without Reconstruction Is Demolition** — for the reader taking the faith apart.
- **Cheap Grace Has a Left Hand Too** — Bonhoeffer's indictment, turned where it's rarely turned.
- **The Authority We Traded for Authenticity** — Scripture's claim versus the sovereign self.
- **The Conscience We Outsourced to the Party** — the left mirror of the political-brand church.

### Pillar 3 — Reading Scripture Past Our Politics
**Role:** Teach the reader to see the lenses before they read — the method under the whole project.
**Already written (deep):** *Mishpat and Tsedaqah · What Micah 6:8 Actually Demands · What Leviticus 19 Demands in a Border Crisis · What the Good Samaritan Is Actually Arguing · What the Jubilee Means · The Widow, the Orphan, the Stranger · What the Greek Actually Says · The Kingdom of God Is Not What You Think It Is*, and ~30 more.
**Write next (the missing lens essays):**
- **Six Lenses That Distort the Bible Before You Read a Word** — the cultural-lenses spine from *The Monster in the Mirror*, made into a standalone.
- **Proof-Texting Is How Both Sides Win and the Text Loses.**
- **What the Original Audience Heard** — and why it wasn't addressed to you first.
- **The Whole Counsel** — why cherry-picking is the American hermeneutic.
- **Reading in Community, Not in a Tribe** — the difference, and why it's not the same as your group chat.

### Pillar 4 — The Church After Christendom
**Role:** Explain the civilizational shift — why your faith feels different now — and hold hope without nostalgia.
**Already written:** *The Church Has a Credibility Problem · Where the Church Was Silent · Engaging the 'Nones' · How to Lead When Trust in Institutions Is Low · What the Global South Can Teach the Church in America About Suffering.*
**Importing from the book (the series):** *How Christian America Was Built · Why Your Faith Doesn't Feel the Way It Used To · What Is Actually Causing the Decline · What Comes Next.*
**Write next:**
- **Christendom: A 1,700-Year Story That Is Ending** — from Theodosius (380) to the present, the arc named.
- **Exile Is Not the End** — Jeremiah 29 and the work of a displaced church.
- **Witness Without Power** — the only Christianity that was ever actually real.
- **What Dies When Christendom Dies — and What Doesn't.**
- **The Numbers Behind the Decline, and the Ones That Lie** — sociology read carefully (Smith, Burge, Taylor).

### Pillar 5 — The Pastoral Angle
**Role:** Pastor real people through all of the above. Strong already; needs the bridge essays.
**Already written (deep):** *The Hidden Pain of the Successful Pastor · The Slow Burn · How to Pastor a Congregation That Is Politically Divided · The Loneliness of Leadership*, and ~35 more.
**Write next (bridges to the capture thesis):**
- **How to Pastor a Congregation Captured by a Cable Network.**
- **Preaching the Whole Counsel to a Room That Will Hear Politics.**
- **The Last Nonpartisan in the Room** — the cost and calling of the pastor who won't pick a tribe.
- **Discipling People Out of Fear** — the formation work under the politics.
- **When Your Elders Are More Loyal to a Party Than a Pulpit.**

---

## Part 4 — Blind Spots (the book): import before you write
Eleven chapters are published on Substack and not yet on the site (only *The Monster in the Mirror* is live). **Import these first** — they instantly turn the Start Here guide from one live link into a complete book, and they seed three of the five pillars above. The reading order and slugs are already set in `client/src/lib/blindSpots.ts`.

---

## Part 5 — Reading paths, rebuilt
For each definitive path, the build is: **assign the existing essays in reading order, then slot the net-new titles where the sequence has gaps.** The wiring fix (one mapping of path → ordered essay slugs, replacing the two broken systems) is a small engineering task I can do alongside the writing — say the word and I'll design the single source of truth so a path is "complete" the moment its essays exist.

---

## Part 6 — Production order (highest leverage first)
1. **Import the 11 Blind Spots chapters** (no writing — just migration).
2. **Capture by the Left** — 8 essays. Thinnest pillar; biggest credibility payoff (you critique your own side).
3. **Capture by the Right** — 8 essays, anchored by the historical-arc piece.
4. **The lens essays** for Reading Scripture Past Our Politics — 5 essays; they unify the whole project.
5. **After Christendom arc essays** — 5 essays around the imported series.
6. **Pastoral bridge essays** — 5 essays.
7. **Wire the reading paths** to one mapping and retire the broken scaffolding.

That's ~31 net-new essays plus 11 imports to make every pillar and path definitive — roughly two to three quarters at a weekly cadence.
