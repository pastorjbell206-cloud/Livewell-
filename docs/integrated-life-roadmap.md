# Integrated Life — Content Audit and Build Library

> A full audit of the Integrated Life pillar: what exists, where the gaps are,
> and a prioritized library of domains, tools, and family content to build it
> out to elite, comprehensive coverage. Slugs are proposed build targets.

## How this pillar is built (the vehicles)

| Vehicle | Where | Format | Gate |
|---|---|---|---|
| **Deep domains** | `client/public/life/domains/*.json` → `/life/<slug>` | eight-part method | `scripts/validate-life.mjs` |
| **Family catechism** | `client/public/family-catechism.json` → `/family/catechism` | Q&A + parent commentary | none (JSON) |
| **Family devotions** | `client/public/family-devotions*.json`, `family-seasonal.json` → `/family/devotions` | themed studies | none (JSON) |
| **Family reading plans** | `client/public/family-reading-plans.json` → `/family/reading-plans` | reading plans | none (JSON) |
| **Tools** | `client/src/pages/tools/*` → `/tools/<name>` | interactive | typecheck |
| **Articles** | DB `posts` (topic-tagged) → `/writing/<slug>` | prose | DB seed required |

## Current state (after this PR)

**Domains (10), by pillar group:**
- **The Integrated Vision** — `wisdom-for-all-of-life`, `discipleship-following-jesus`
- **The Inner Life** — `the-anxious-mind`
- **The Body and the Rhythms** — `the-body-and-the-rhythms`
- **The Home and Relationships** — `marriage-the-long-covenant`, `raising-children-in-grace`, `the-home-and-the-family`, `friendship-against-isolation`
- **Work, Money, and Calling** — `money-and-the-heart`
- **The Seasons and the Crises** — `grief-and-loss`
- **The Life in the World** — *(empty)*

**Family content:** catechism 64 Q&As (5 parts), devotions 60 studies (12 + 48) plus seasonal (Advent, Holy Week), reading plans.

**Tools (6):** `marriage-assessment`, `parenting-guide`, `parenting-verses`, `life-audit`, `emotional-health`, `family-devotions` (builder).

## Structural gaps (the headline findings)

1. **One pillar group is completely empty** — *The Life in the World* has zero domains. The pillar teaches the inner and domestic life well and says almost nothing about the Christian in society, politics, justice, vocation-in-public, neighbor, and creation.
2. **Several groups rest on a single domain** — *The Inner Life* (only anxiety), *The Body* (only one), *Seasons and Crises* (only grief), *Work/Money* (only money). Each needs 3–5 to feel like a real library.
3. **Marriage and parenting are deep but narrow** — one flagship each. The most-requested practical subtopics (singleness, dating, sex, conflict, the wayward child, the teen years, blended families, infertility) have no home yet.
4. **Tools are thin relative to the content** — six tools for a pillar this size; most teaching has no interactive companion (rule-of-life builders, assessments, planners, topical guides).
5. **No "what the Bible says about ___" topical layer** — the wisdom flagship invites it; there is no Proverbs/topical index tool to deliver it.

---

## Proposed domain library (the full build-out)

Priority: **P1** fills an empty/thin group or a top practical request; **P2** rounds out a group; **P3** is depth beyond core.

### The Integrated Vision
- `the-integrated-life` (P1) — the capstone: refusing the sacred/secular split; the through-line of the whole pillar.
- `time-and-the-examined-life` (P2) — numbering our days, calendar, hurry, attention.
- `the-story-we-live-in` (P3) — creation, fall, redemption, restoration as the frame for everything.

### The Inner Life
- `the-heavy-mind` (P1) — depression and despair (companion to anxiety).
- `anger-and-the-hot-heart` (P1) — anger, resentment, the slow and the quick fuse.
- `shame-and-the-hiding-self` (P1) — guilt vs. shame, the gospel for the self that hides.
- `identity-and-worth` (P2) — who am I, performance, the approval hunger.
- `contentment-against-envy` (P2) — comparison, envy, the discontent heart.
- `desire-and-temptation` (P2) — lust, appetite, the disordered want (pairs with the body).
- `pride-and-humility` (P3) — the root sin and its undoing.
- `the-dry-season` (P3) — spiritual dryness, the dark night, when God feels absent.

### The Body and the Rhythms
- `rest-and-the-sabbath` (P1) — sabbath, hurry, the unforced rhythms.
- `food-and-the-table` (P2) — eating, feasting, fasting, the body's appetites.
- `sex-and-the-body` (P1) — a theology of the body, desire, chastity, the goodness of the physical.
- `sleep-and-limits` (P3) — finitude, sleep, the creature who must lie down.
- `aging-and-the-body` (P2) — the body's decline, finitude, dignity.
- `health-illness-and-pain` (P2) — chronic illness, the suffering body, stewardship of health.

### The Home and Relationships
- `singleness-and-the-full-life` (P1) — singleness as calling and gift, not a waiting room.
- `dating-and-discernment` (P1) — courtship, choosing a spouse, wisdom before the covenant.
- `the-marriage-bed` (P2) — sex within marriage (subtopic depth beyond the marriage flagship).
- `conflict-and-reconciliation` (P1) — fighting fair, repair, the ministry of reconciliation.
- `forgiveness-the-hardest-grace` (P1) — the mechanics and cost of forgiving.
- `the-wayward-child` (P1) — the prodigal, the adult child who left the faith.
- `caring-for-aging-parents` (P2) — the sandwich generation, honoring father and mother at the end.
- `the-blended-family` (P2) — step-parenting, remarriage, the complex household.
- `infertility-and-childlessness` (P2) — the ache of the empty arms, hope without children.
- `the-church-as-family` (P2) — belonging, membership, the body as household.

### Work, Money, and Calling
- `work-as-worship` (P1) — vocation, calling, the dignity and idolatry of work.
- `generosity-and-the-open-hand` (P1) — giving, tithing, the cure for greed.
- `ambition-and-rest` (P2) — drive, success, hustle vs. faithfulness.
- `debt-and-provision` (P2) — debt, anxiety, daily bread, trusting provision.
- `success-and-failure` (P2) — identity in outcomes, the gospel for the winner and the loser.
- `unemployment-and-the-lost-job` (P3) — work taken away, worth without a title.
- `retirement-and-the-last-third` (P3) — finishing well, purpose past the career.

### The Life in the World *(currently empty — highest structural priority)*
- `the-neighbor-and-the-stranger` (P1) — love of neighbor, hospitality to the outsider, who is my neighbor.
- `justice-and-the-poor` (P1) — the Bible on the poor, mercy and justice, the church and the vulnerable.
- `faith-and-politics` (P1) — the Christian and the public square, two kingdoms, idolatry of the nation.
- `money-and-possessions-in-society` (P2) — wealth, consumerism, enough, the global neighbor.
- `creation-and-our-keeping` (P2) — stewardship of the earth, the body and the soil.
- `technology-and-attention` (P1) — the formation of the phone, the colonized mind, digital wisdom.
- `witness-without-weirdness` (P2) — evangelism, the ordinary Christian among neighbors.
- `the-common-good-and-citizenship` (P3) — the Christian as citizen, the city of God in the city of man.

### The Seasons and the Crises
- `suffering-and-the-silence-of-god` (P1) — the problem of pain, lament, faith in the dark.
- `the-diagnosis` (P1) — illness, the body's betrayal, facing serious illness with faith.
- `divorce-and-its-aftermath` (P1) — the broken covenant, grief, hope, the church's care.
- `addiction-and-the-long-road-back` (P1) — addiction, recovery, the gospel for the enslaved will.
- `betrayal-and-broken-trust` (P2) — being wronged, rebuilding or releasing.
- `waiting-and-unanswered-prayer` (P2) — the long wait, the closed door, hope deferred.
- `the-empty-nest-and-midlife` (P2) — the children gone, the second half, reorientation.
- `facing-death` (P1) — dying well, the fear of death, the Christian hope.
- `caring-for-the-dying` (P2) — accompanying someone to the end, the ministry of presence.
- `disability-and-the-different-body` (P3) — disability, dignity, the body that does not conform.

**Domain total proposed:** ~50 new (current 10 → ~60), a genuinely comprehensive library where a reader can find nearly any arena of life treated with the eight-part depth.

---

## Proposed tools

Each pairs an interactive companion to the teaching. P1 = highest leverage.

**Marriage**
- `marriage-rule-of-life` (P1) — build the rhythms (weekly time, money talk, repair ritual, yearly reckoning).
- `state-of-our-union` (P1) — a guided weekly/monthly marriage check-in.
- `conflict-repair-guide` (P2) — walk a couple through a repair after a fight.
- `premarital-prep` (P2) — a structured premarital conversation guide.
- `the-apology-builder` (P3) — confession and forgiveness, done well.

**Parenting / Family**
- `family-discipleship-roadmap` (P1) — age-by-age: what to teach and walk through at each stage.
- `family-rule-of-life` (P1) — build the household's rhythms, table, worship, screens, seasons.
- `screen-and-tech-covenant` (P1) — a family agreement builder for devices.
- `discipline-that-reaches-the-heart` (P2) — a guide for heart-level correction by age/temperament.
- `milestones-and-blessings` (P2) — liturgies and blessings for birthdays, baptism, leaving home.

**Wisdom**
- `proverbs-in-31-days` (P1) — a guided month through Proverbs, a chapter a day with prompts.
- `what-the-bible-says-about` (P1) — a topical index: money, words, anger, sex, friendship, work, drink, worry.
- `the-decision-guide` (P2) — run a real decision through the three Proverbial tests.

**Discipleship / Inner Life**
- `rule-of-life-builder` (P1) — design a sustainable personal rule (the keystone discipleship tool).
- `spiritual-health-check` (P1) — an honest examen/assessment of the inner life (companion to emotional-health).
- `how-is-it-with-your-soul` (P2) — a Wesley-band small-group guide.
- `the-disciplines-guide` (P2) — a practical primer on each spiritual discipline.

**Home / Whole life**
- `sabbath-planner` (P1) — build a weekly day of rest your household can actually keep.
- `hospitality-planner` (P2) — make the open door a rhythm.
- `the-church-year-for-families` (P2) — keep Advent, Lent, Easter, ordinary time at home.

---

## Family content expansion

**Catechism** (currently 64, 5 parts) — add:
- A **teen/older track**: deeper answers to the same questions for ages 12+ (the `answer`/`kidsAnswer` split already supports a third tier).
- A **"hard questions kids ask"** supplement: why does God allow suffering, is the Bible true, what about other religions, why do bad things happen, what happens when we die.
- A **church-year catechism**: short seasonal sets for Advent, Lent, Easter.

**Devotions** (currently 60 + seasonal) — add:
- A **third volume** to complete a two-year cycle of weekly devotions.
- **Topical mini-series**: 5–7 day arcs on a single theme (forgiveness, fear, identity) for a focused family week.
- A **chronological "story of the Bible"** devotion track, creation to new creation.
- **Church-calendar devotions** tied to each season.

**Reading plans** — add age-tiered Bible reading plans and a "whole story" chronological plan for families.

---

## Article library (DB path — requires a seed)

The Marriage/Parenting pages link to `/writing/<slug>` posts. A how-to article library would round out the practical layer the domains anchor. Proposed clusters (each 6–12 articles):
- **Marriage how-tos**: the weekly check-in, fighting fair, the money conversation, rekindling desire, marriage in the baby years, when you married an unbeliever, recovering after an affair, the empty-nest marriage.
- **Parenting how-tos / walk-throughs**: starting family worship, the screen conversation by age, talking about sex, the strong-willed child, the anxious child, the teen pulling away, when your child doubts, leaving-home blessing.
- **Singleness, dating, in-laws, caregiving**: practical guides for the relationship arenas the domains open.

These ship only through a DB seed (separate from the static domains/tools above).

---

## Recommended build order

1. **Fill the empty group** — 3–4 *Life in the World* domains (it is the one visibly bare shelf).
2. **Double the thin groups** — add the P1 domains in Inner Life, Body, Work/Money, Seasons.
3. **Marriage & parenting subtopics** — the most-requested P1s (singleness, dating, conflict, forgiveness, the wayward child, work-as-worship).
4. **Keystone tools** — `rule-of-life-builder`, `family-rule-of-life`, `proverbs-in-31-days`, `what-the-bible-says-about`, `marriage-rule-of-life`, `sabbath-planner`.
5. **Family content** — catechism teen track + hard-questions; devotions volume 3 + topical series.
6. **Article library** — marriage and parenting how-to clusters (DB seed).

Every domain and family item above passes through the same validators and voice rules already in place, so the bar holds as the library grows.
