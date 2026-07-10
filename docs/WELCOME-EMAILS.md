# Welcome emails — one per audience

Paste-ready welcome copy for the four signup segments the site now records
(skeptic / Christian / pastor / seeker). Drop each into your Substack welcome
automation, or a Mailchimp welcome sequence keyed off the `source` tag
(`…:skeptic`, `…:pastor`, and so on). Nothing here fabricates a statistic, a
testimonial, or a discount. Every line is in the short-form register: direct,
pastoral, self-implicating, no forbidden language, exclamation points only
inside quoted Scripture.

The site captures the segment at signup but no sender is wired in the code yet,
so these are meant to be used from Substack/Mailchimp until an in-app sender
exists. Send the matching one first; after it, everyone can flow into the same
weekly essay.

---

## 1. The skeptic — subject: *You didn't have to sign up. I know.*

You put in an email for a religion you may not believe. That is not nothing,
and I am not going to waste it trying to close you.

Here is what you can expect. One essay a week. No altar call at the end, no
manufactured urgency, no pretending the hard questions are easy. I came to
faith from atheism, so I know the difference between an answer that respects
you and an answer that handles you. I will try never to hand you the second.

If you want a place to start, read *The Atheist in the Pulpit*. It is the
closest thing I have to a statement of why this exists.

You are allowed to disagree with every word and keep reading. That is the only
deal I am offering.

— James

---

## 2. The Christian with real questions — subject: *The question is allowed to stay.*

Somewhere along the way you were handed the idea that a serious question is a
threat to your faith. It is not. The church has sat in the dark before —
longer and harder than the news cycle remembers — and come out with the faith
intact and deeper.

One essay a week, from a working pastor, written slow. I am not going to
resolve every question too fast, because the fast resolution is usually the
false one. I would rather give you the history, name the thing honestly, and
trust you to carry the tension inside the faith instead of leaving to keep it.

Start wherever your own question is loudest. If you are not sure, *When the
Church Is the Thing That Hurt You* is a place many people have started.

Glad you are here.

— James

---

## 3. The pastor — subject: *You weren't meant to carry it alone.*

You already know the weight. You carry the congregation, the family, and the
questions you cannot ask inside your own denomination, usually with no one who
understands what that weight actually feels like.

So two things. First, the writing: one essay a week, plus the resources you can
hand to your people — study guides with a leader's copy and a participant
handout, ready-to-preach series, a disciple-making curriculum, all free to use
in your church. Take what serves them.

Second, the room. The Pastors Connection Network exists because too many of us
lead in isolation. When you are ready, that is the second step — other pastors,
monthly calls, a place you do not have to perform.

For this week, here is something you can put in someone's hands:
livewellbyjamesbell.co/studyguides.

You are not the only one wrestling with these things. Grateful you are here.

— James

---

## 4. The seeker — subject: *You came for the Tuesday afternoon.*

You did not come here for ecclesiology. You came because a marriage, a kid, a
job, or a season is heavier than anyone told you it would be, and you are
looking for something with more weight than a tip.

That is exactly the right reason. One essay a week that meets the actual
Tuesday afternoon — marriage, money, parenting, doubt — and refuses to leave it
merely practical, because the practical thing was never small to begin with.

Start with whatever is pressing on you now. If it is your marriage, read
*Covenant vs. Contract*. If it is your kids, *How to Raise Children in the Faith
Without Crushing Them*. If it is just the weight, subscribe and let the next one
find you.

Glad you came.

— James

---

## Notes for the sender

- **Segment tag.** The signup form writes `source` as `<page>:<segment>`
  (e.g. `for-pastors:pastor`). Route the welcome on the last token.
- **Fallback.** If a subscriber has no segment (many will not), send #4 (the
  seeker) — it assumes the least and offends no one.
- **Links.** Swap in the live URLs for the essays named above if a slug has
  changed; each title maps to a real published piece.
- **Cadence.** After the welcome, everyone can merge into the single weekly
  essay. The segment only changes the first email, not the truth of any of
  them.
