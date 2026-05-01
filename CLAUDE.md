# CLAUDE.md — LiveWell by James Bell

> Read this file first. Do not deviate from voice or palette.

---

## Platform & Founder

**LiveWell by James Bell** is the digital home of James Bell — Lead Pastor of First Baptist Church of Fenton (Michigan), founder of the Pastors Connection Network (PCN), author of 25 books. He came to faith from atheism. He was raised without a father. He has five sons. Those last two facts shape everything he writes.

**Tagline:** Connecting the depth of theology to the weight of everyday life.

**Domain:** livewellbyjamesbell.co

**Stack:** React + Vite + tRPC + Drizzle ORM + MySQL, deployed on Vercel.

---

## Audiences (in order of weight)

1. **Skeptics** — the hardest case, the one Bell writes toward
2. **Christians** — carrying real questions the church avoids
3. **Pastors** — the strategic distribution channel via PCN
4. **People seeking to live well** — marriage, parenting, vocation

---

## Positioning Statement

For the reader whose faith has outgrown the answers they were given — whose marriage needs more than tips, whose doubts deserve more than platitudes, whose calling costs more than anyone told them — LiveWell by James Bell is the theological writing platform that refuses to separate intellectual depth from lived experience, unlike the devotional mills that offer comfort without cost and the academic journals that offer rigor without warmth, because Bell writes from inside the room where people fall apart, not from a safe distance — as a working pastor with 15 years of ministry, five sons, and 25 books that prove theology can carry the weight of a Tuesday afternoon.

---

## Voice & Tone

### Long-form register (essays, books, sermons published as prose)

Prophetic and pastoral simultaneously, never one without the other. Intellectual anchors: Tim Keller (architecture), Walter Brueggemann (prophetic imagination), Eugene Peterson (pastoral texture), Dietrich Bonhoeffer (willingness to name the thing at cost).

Requirements:
- Named scholars as structural witnesses (Bellah, James K.A. Smith, Newbigin, Taylor, Haidt)
- Specific historical dates and events
- Technical theological vocabulary used naturally, never defined condescendingly
- The full historical arc — never starting at the proximate cause
- Self-implication: the writer is always inside the indictment
- Verdicts, not summaries
- Endings that leave weight, never resolve it

### Short-form register (Facebook, brief notes, captions)

Direct, pastoral, emotionally precise. No academic apparatus. The same voice stripped to its bones — a sentence that lands in someone's feed and stops them. Still refuses the forbidden language. Still self-implicating.

---

## Forbidden Language

### Words
delve, leverage, unlock, transformative, navigate, tapestry, foster, unpack, landscape, nuanced, multifaceted, authentic, journey (as metaphor), holistic

### Phrases
"in today's world," "now more than ever," "here's the thing," "I want to be real with you," "God's got this," "blessed" (as adjective), "gospel-centered" (without earning it), "authentic community"

### Therapy-speak
"hold space," "your truth," "do the work," "your feelings are valid," "lean into," "showing up"

### Structural moves to avoid
Signposting ("here is what I mean," "let me explain"). Clean application turns. Comfortable closings. Bullet lists where prose belongs.

---

## Structural Moves (the Bell patterns)

1. **"Not X. Y."** — ground-clearing with a hard period, never a comma. "This is not about politics. It is about the cross."
2. **Short-Long-Short** — sentence rhythm. A short declaration. A longer sentence that builds the evidence, names the history, implicates the reader. Then the verdict: three to eight words.
3. **The building triplet** — but only when the thinking actually produces three elements of equal weight. Never forced.
4. **Self-implication** — the writer is always inside the indictment, never pointing from outside. "We did this. I did this."
5. **Verdicts** — short, final, after the evidence. Not summaries. Verdicts.
6. **Endings that leave weight** — the last paragraph does not resolve. It names what remains. The reader carries it out.

---

## Color Palette

| Color | Hex | Role | Never used for |
|-------|-----|------|----------------|
| **Black** | `#1A1A1A` | Primary surface (hero, dark sections, footer), primary type on cream | Full-page background in bone-dominant layout |
| **Cream** | `#F5F0E6` | Default page background, the room you read in | Cards that need to feel lifted (use white) |
| **Cream warm** | `#EDE8DC` | Alternating section background | — |
| **Mustard** | `#D4A017` | Accent only. CTAs, dividers, kicker labels, link underlines, the weight of important moments | Large background fills, body text, decorative use |
| **White** | `#FFFFFF` | Cards that must feel set apart, input fields | Page background (always cream) |
| **Ink** | `#14110C` | Body text on cream | Text on dark sections (use cream/white) |
| **Ink muted** | `#5A5448` | Secondary text, captions, metadata | Primary body text |

**Rules:**
- Mustard appears on less than 8% of any viewport. It is punctuation, not a paragraph.
- Cream and black alternate as section backgrounds. No three consecutive sections share a background.
- Pure white (#FFFFFF) is never a page background. Cream is the room.

---

## Typography

| Role | Family | Weight | Notes |
|------|--------|--------|-------|
| Display (H1) | Cormorant Garamond | 400 | `letter-spacing: -0.02em`. Size carries weight, not boldness. |
| Section titles (H2) | Cormorant Garamond | 400 | — |
| Subheadings (H3) | Cormorant Garamond | 500 | — |
| Body | Inter | 400 | `line-height: 1.7`, `max-width: 68ch` |
| UI / buttons | Inter | 500 | — |
| Eyebrow labels | Inter | 500 | 0.75rem, uppercase, `letter-spacing: 0.18em`, mustard color |
| Mono (code, ISBNs) | JetBrains Mono | 400 | Data labels only |

**Justification:** Cormorant Garamond has the editorial gravitas of a hardcover spine and the confidence to carry a 7rem headline without becoming decorative. Inter is the most legible sans-serif at small sizes shipped to the web — it does not call attention to itself, which is exactly what body type should do.

---

## Emotional Brief

The first three seconds of arrival on livewellbyjamesbell.co:

**Unhurried. Weighted. Grown-up.**

Not warm in the coffee-shop sense. Not dark in the luxury-brand sense. The feeling of opening a serious book in a quiet room where the light is good.

---

## Strategic Reminders

- The PCN network (thousands of pastors) is the highest-leverage growth channel. Every feature that serves pastors has distribution built in.
- Stripe integration is pending for membership/book purchases.
- The homepage is strong; inner pages need the same design system applied.
- Facebook following (facebook.com/james.bell.609252) is the existing audience. Substack is the newsletter channel.
- Contact forms send to Pastorjbell206@gmail.com.
- The site has 161+ articles and 21 books in the database. Content is the product.
- All components use inline styles with CSS variable references. Brand changes flow through `:root` tokens in `index.css`.
