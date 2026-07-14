# The Welcome Sequence — the default on-ramp

> Five weekly emails for a brand-new subscriber, before they pick a segment.
> Where the skeptic and doubter tracks are for a chosen path, this is the front
> door: it says what LiveWell is, hands over the best essays in a forming order,
> and sets the expectation for the weekly send — then releases them into it.
>
> **Voice:** James's — prophetic and pastoral, self-implicating, verdicts not
> summaries, no pressure and no clock. **Integrity:** these are *framing* emails
> (my introduction to each essay), not verbatim quotation like the two tracks, so
> nothing here needs a character-exact check — but every essay linked is real and
> verified. Replace each `[essay: /writing/<slug>]` with the full URL
> (`https://www.livewellbyjamesbell.co/writing/<slug>`). Send one a week, in order.
> James should read and approve before sending; this is a draft to use, not to
> ship unread.

---

## Email 1 — The room, not the list

**Subject:** You're in. Here's the room, not the list.

You subscribed, and the reflex is to answer that with a welcome that sells you
something. I am not going to do that.

Here is what this is. One serious essay a week, written slow, for the reader
whose faith has outgrown the answers they were given — whose marriage needs more
than tips, whose doubt deserves more than a platitude. Not a newsletter in the
coffee-shop sense. Closer to a letter from a working pastor who came to faith
from atheism, was raised without a father, is raising five sons, and has no
interest in wasting your Tuesday.

Start here: **[essay: /writing/a-whole-life]**. It is the thesis of the whole
thing — that God does not sit in the religious corner of your week while the
rest of it runs on its own logic. The split is the problem. This is the case
against it.

Read it when the house is quiet. Next week I will send you the next one.

— James

---

## Email 2 — What is forming you

**Subject:** Something is discipling you. It probably isn't the church.

Last week was the thesis. This week, the diagnosis.

You are being formed. Not by argument — by repetition. By the feed you check
before your feet hit the floor, by the outrage that arrives pre-packaged, by a
thousand small liturgies you never agreed to and never noticed. The question is
not whether you are being discipled. It is by what.

This one names the machine: **[essay: /writing/the-machine-that-forms-you]**. I
wrote it as a man it convicts — I have checked my phone more mornings than I have
opened my Bible, and called it staying informed. This is not a scolding. It is
an X-ray.

Read it, and then notice your own morning tomorrow. That noticing is where
everything starts.

— James

---

## Email 3 — The hour that changes the week

**Subject:** You do not have a time problem.

Diagnosis without a way forward is just a lecture, and I am not interested in
lectures. So this week, the wisdom under the ache.

You feel behind. Everyone does. But the exhaustion you are carrying is not
mostly a scheduling failure — it is a formation failure, and the oldest answer
to it is not a productivity system. It is a rhythm the church has kept for three
thousand years and quietly stopped believing in.

Here is the case for it: **[essay: /writing/the-hour-that-forms-the-week]**. Not
a tip about rest. An argument that the hour you give to God is the hour that
reorders the other hundred and sixty-seven.

If you read only one of these five slowly, make it this one.

— James

---

## Email 4 — For the part of you that is not sure

**Subject:** If your faith is coming apart, read this before you decide.

I do not know where you are. Some of you subscribed sure. Some of you subscribed
from the far edge of belief, keeping one hand on the door. This week is for the
second kind, and the first kind should read it too, because you will one day
need it or love someone who does.

There is a way of taking the inherited faith apart that stops there — that names
what is false and never builds. There is a harder, truer thing: taking the same
lenses apart and then digging down to the older faith underneath, and building
there.

That is the whole difference: **[essay: /writing/excavation-not-demolition]**. I
have sat across the table from people who were sure they were losing their
faith, when what they were actually losing was a counterfeit of it. This is
written for that table.

No decision is asked of you here. Only that you not decide too fast.

— James

---

## Email 5 — Where to go from here

**Subject:** The whole library is open. Start where it hurts.

Five weeks, four essays, one standing invitation. This is the last of the
welcome emails; after it, you are simply on the list — one serious essay a week,
and no clock on any of it.

Two things before I let you go.

First, the whole thing is open to you. The writing is organized around the
questions people actually carry — doubt, marriage, money, the church, the life
that is crushing them — and every book on the site can be read free, cover to
cover, before you ever buy it. Start where it hurts, not where it is tidy:
**[link: /pathways]**.

Second, if what you are carrying is heavier than an essay — grief, a marriage in
trouble, a faith in freefall — there is a page that keeps a path to real help
visible, and I would rather you use it than perform being fine:
**[link: /help]**.

That is the platform. Depth over reach, every time. Thank you for reading slowly.
I will see you next week.

— James

---

## Wiring (owner, ~10 minutes)

The default sequence fires for any new subscriber who has *not* chosen the
skeptic or doubter segment (or it can fire for everyone as the on-ramp, with the
two tracks layered on top by segment).

**Mailchimp:** Automations → Customer Journey → trigger = *subscriber added* (or
*tag added: welcome*), then five "Send email" steps with a 7-day delay between
each. Paste each subject + body; swap every `[essay: /writing/<slug>]` and
`[link: /...]` for the full URL.

**Substack:** send the five manually to new subscribers, or keep the sequence in
Mailchimp and use Substack for the weekly broadcast.

Keep the order fixed — the five build (thesis → diagnosis → wisdom → doubt →
release). If an essay is retitled or moved, update the email that carries it.
