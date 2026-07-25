# SEO Title Rewrites — the whole-site pass

**What this is.** A search-intent rewrite of the essay titles that read as
literary or cryptic, so each names the question people actually type. Same
standard as the two draft essays: the title is the search query, the poetry
moves to a subtitle/kicker.

**Scope (measured, not guessed).** Of 349 essays, **201 already read
search-facing** (75 are already questions) and **148 are candidates.** This file
covers the candidates. The other 201 are left alone on purpose.

**The one hard constraint — slugs do not change.** The URL of every published
essay stays exactly as it is. Changing a slug would break inbound links and
throw away the search authority the page has already earned. So this pass
changes only the visible **title** and the `<title>`/OG meta, never the address.

**Application is owner-gated.** Live essay titles come from the MySQL `posts`
table (the static library is only the fallback). I cannot write to the database
from here. Two ways to apply this list:
1. **You grant admin/DB access** and I bulk-apply every row (fastest), or
2. you paste them into the admin, or
3. I write a one-shot update script you run with the DB URL.

Nothing below is live yet. Every rewrite keeps James's voice: a real question, no
clickbait, no manufactured urgency.

**Legend:** *Kicker* = the old literary line, kept as an optional subtitle.

---

## Batch 1 — Pastoral / Leadership (PCN library)

| # | Slug (unchanged) | Current title | Proposed SEO title | Target query | Kicker |
|---|---|---|---|---|---|
| 1 | `the-monster-in-the-mirror` | The Monster in the Mirror | **Why Does Every Generation Get the Bible Wrong?** | why do people misinterpret the bible | The Monster in the Mirror |
| 2 | `not-persecuted-seduced-crisis-american-christianity` | Not Persecuted, Seduced: The Crisis of American Christianity | **Is American Christianity in Crisis?** | what is wrong with the american church | Not Persecuted, Seduced |
| 3 | `you-are-not-the-exception` | You Are Not the Exception: Understanding Biblical Interpretation | **What Are the Rules for Reading the Bible Well?** | how to interpret the bible correctly | You Are Not the Exception |
| 4 | `the-theology-of-time` | The Theology of Time | **What Does the Bible Say About Time and Productivity?** | christian view of time management | The Theology of Time |
| 5 | `hidden-pain-successful-pastor` | The Hidden Pain of the Successful Pastor | **Why Are Successful Pastors So Lonely?** | pastor loneliness | The Hidden Pain of the Successful Pastor |
| 6 | `church-needs-you-healthy-not-busy` | Your Church Needs You Healthy More Than It Needs You Busy | **Why Do Pastors Burn Out From Staying Busy?** | pastor burnout busyness | — |
| 7 | `personal-board-accountability` | Building a Personal Board of Accountability | **How Do You Build Accountability as a Pastor?** | accountability for pastors | — |
| 8 | `five-biggest-mistakes-new-pastors` | The 5 Biggest Mistakes New Pastors Make | *(keep — already search-facing)* | mistakes new pastors make | — |
| 9 | `art-of-saying-no-without-guilt` | The Art of Saying No Without Guilt | **How Do You Say No Without Guilt?** | how to say no as a pastor | The Art of Saying No |
| 10 | `slow-burn-ministry-exhaustion` | The Slow Burn: How Ministry Exhaustion Sneaks Up on You | **How Does Ministry Burnout Sneak Up on You?** | signs of ministry burnout | The Slow Burn |
| 11 | `return-ministry-after-burnout` | The Second Commission | **How Do You Return to Ministry After Burnout?** | returning to ministry after burnout | The Second Commission |
| 12 | `difference-tired-and-done` | The Difference Between Being Tired and Being Done | **Are You Just Tired, or Are You Done?** | am i burned out or just tired | — |
| 13 | `protecting-marriage-ministry-demands` | Protecting Your Marriage When Ministry Demands Everything | **How Do You Protect Your Marriage in Ministry?** | protecting marriage in ministry | — |
| 14 | `okay-to-see-counselor` | It's Okay to See a Counselor, Why Pastors Resist and Why They Shouldn't | **Should Pastors See a Counselor?** | should pastors go to therapy | — |
| 15 | `anxiety-perfectionism-pastor-breaking-cycle` | Anxiety, Perfectionism, and the Pastor: Breaking the Cycle | **Why Are So Many Pastors Anxious Perfectionists?** | pastor anxiety perfectionism | — |
| 16 | `not-your-churchs-attendance-numbers` | You Are Not Your Church's Attendance Numbers | **Is Your Worth Tied to Your Church's Attendance?** | measuring ministry success | You Are Not Your Attendance Numbers |
| 17 | `five-sermon-habits-shrinking-faith` | Five Sermon Habits That Are Slowly Shrinking Your Congregation's Faith | **Which Sermon Habits Are Shrinking Your Church's Faith?** | common preaching mistakes | — |
| 18 | `preaching-to-room-not-there-yet` | Preaching to the Room That's Not There Yet, How to Reach the Unchurched | **How Do You Preach to the Unchurched?** | how to preach to unchurched | Preaching to the Room That's Not There Yet |
| 19 | `metrics-tell-church-healthy` | The Metrics That Actually Tell You if Your Church Is Healthy | **How Do You Know if Your Church Is Healthy?** | signs of a healthy church | — |
| 20 | `most-dangerous-person-church-staff` | The Most Dangerous Person on a Church Staff (It Might Surprise You) | **Who Is the Most Dangerous Person on Your Church Staff?** | toxic church staff | — |
| 21 | `staff-culture-no-burnout` | Building a Staff Culture Where People Don't Burn Out and Leave | **How Do You Build a Church Staff Culture Without Burnout?** | reduce church staff turnover | — |
| 22 | `gen-z-wants-from-church` | The Smoke Machine Is Not the Problem | **What Does Gen Z Actually Want From Church?** | what does gen z want from church | The Smoke Machine Is Not the Problem |
| 23 | `reformed-charismatic-pastors-same-table` | The Same Table | **Can Reformed and Charismatic Christians Worship Together?** | reformed vs charismatic | The Same Table |
| 24 | `before-launch-ministry-ask-other-church` | Before You Launch That Ministry, Ask If Another Church in Town Is Already Doing It | **Should You Start a Ministry Another Church Already Runs?** | church collaboration vs competition | — |

*Batches 2+ (the remaining ~124 candidates) continue below as I work through them.*
