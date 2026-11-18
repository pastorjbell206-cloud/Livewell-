# C. Organized systems: how the best-organized sites keep a large library findable, a hard task in order, and a crisis page calm

Research for the LiveWell redesign, cluster C ("organized-systems"), prepared
2026-10-27. James's brief asks for "the most organized, well-designed website
that helps people to study the Bible, to understand doctrine ... tools and
resources available ... elite and world-class ... very critical of what
currently is." This file looks at the sites the design world holds up as the
most organized (government, health, reference, documentation, museums,
libraries) and asks what LiveWell should take from them without betraying
"Unhurried. Weighted. Grown-up."

It goes beyond `docs/work/plan/benchmark.md`, which studied Christian products
and long-form reading and did not touch information architecture, content
design, search, or crisis-page design. It assumes `MASTER-PLAN.md` sections 0
to 3 (the doors, Find, Tonight, Topics, the integrity rules) and avoids the
patterns already ranked in this folder: the text-study apparatus of wave A
(`A-SYNTHESIS.md`), the church history teaching of `B-church-history-teaching.md`
(including the Met's Heilbrunn Timeline and *Reading Like a Historian*), the
editorial apparatus of `C-editorial-design.md` (notes beside the text, the
honest foot, `/how-we-write`, link previews, a contents page for the shelf) and
the learning patterns of `C-learning-ux.md`. Where a pattern here touches one of
those, it says so and adds only the part that is new.

**Method and limits.** Direct page fetches fail in this sandbox, so no live
page of any product was seen and nothing here is a screenshot or a measurement.
The evidence is of three kinds, and each claim below says which:

1. **Code and guidance read directly** from open-source repositories cloned
   into the scratchpad (`design-src/`): the GOV.UK Design System
   (`alphagov/govuk-design-system`, every pattern and component page as
   Markdown), GOV.UK Publishing Components (`alphagov/govuk_publishing_components`,
   the step by step component and its UI strings), GOV.UK Smart Answers
   (`alphagov/smart-answers`, flows, views and an architecture decision record),
   the NHS service manual (`nhsuk/nhsuk-service-manual`, the NHS design system
   patterns and the content guide), Wikipedia's Vector 2022 skin
   (`wikimedia/mediawiki-skins-Vector`, UI strings and search config), and
   MDN's current front end (`mdn/fred`, the quick search, recently visited,
   footer, feedback and curriculum components).
2. **The product's own words** in blog posts, policy pages and announcements,
   reached through search excerpts.
3. **Reviews and secondary descriptions**, marked as such.

38 web searches were used. Nothing is described that was not seen described;
unknowns are listed in section 4.

**What LiveWell already has, so the patterns are calibrated.** More than most
sites its size, and the patterns below are sized against it (read in the repo
on `claude/todo-implementation-hhp4bm`):

- *The doors.* `client/src/lib/siteNav.ts` is one committed map for header and
  footer: five doors (Study, Essays, Books, Resources, About) beside Find Help,
  search and Subscribe. Resources holds ten links grouped by kind (downloads,
  tools, self-checks, how-tos, help, plans, family).
- *Find Help* (`pages/Help.tsx`) starts with a line of crisis numbers above the
  title, a search box that reads the reader's own words against each need's
  `askedAs` phrases, chips for the needs people bring most, the full
  `CrisisBlock`, and a "Where are you?" switch (carrying something, wanting to
  grow, helping someone, leading a group). 40 care pages, 15 marked `high`
  sensitivity.
- *Care pages* (`pages/help/CarePage.tsx`) follow a fixed order from
  `docs/grow/CARE-PAGE-SPEC.md`. "When to get more help" renders one flat list
  of "Signs it is time to call someone", then "What to say when you call" and
  "What it costs". Each need's JSON carries a `reviewed` record (date and a
  long review note) and a `sources` list; **neither is shown on the page.**
- *Crisis lines* come from one data file with each line's official source and
  the date it was checked, and CI fails when that date goes stale. A
  `QuickExit` button (fixed, bottom right) appears on abuse pages and the
  Connection Planner; it replaces the page with weather.gov and says honestly
  that it does not clear history.
- *Search* (`lib/siteSearch.ts`) puts a Scripture reference first, drops small
  words, requires every remaining word, ranks titles over `askedAs` phrasings,
  and detects crisis words in a query. It has no hand-edited synonyms or pinned
  results.
- *Tools* (28 in `ToolsHub.tsx`) mostly say up front how long they take, that
  they are "not a diagnosis", and that answers "stay on this device".
  Results screens offer "Change my answers" (the Elevation standard).
- *Telemetry* (`lib/telemetry.ts`) records only slugs and counts, never text.

What LiveWell lacks is what the organized systems below are best at: graded
urgency on its crisis pages instead of one list; ordered help for tasks that
have an order; a visible review date on pages that make claims about care;
search that teaches the shape of the site; hub pages ordered by the reader's
need rather than by format; and a written pattern library that keeps 180 pages
and many agents building the same thing the same way.

---

## 0. The short verdict

The most organized sites in the world share six convictions, and each is
stated in their own documentation rather than inferred.

**Order by the reader's task, never by the organization's chart.** GOV.UK
merged the websites of hundreds of agencies into one and organized it by what
a person is trying to do; its taxonomy work found "no evidence from user
research to suggest that users need to navigate by audience, or other facets
like format." The step by step pattern exists because a single task (learning
to drive, employing someone, what to do when someone dies) is spread across
many departments. NHS hub pages put at most three "top task" cards above
everything else.

**Say the hard thing in the heading.** NHS care cards put one call to action in
the heading ("Speak to a GP if:"), grade urgency in three levels, and hide the
level in text for screen readers. Tested, users "scanning the page stopped to
read the care cards and understood what action to take." The NHS says just as
plainly: "We want to give essential information and reassure people, not to
scare them."

**Tell the reader what will happen before it happens.** GOV.UK start pages
give "just enough information to help them understand what the service does
and whether it will meet their need," how long it takes, what you'll need, and
other ways to do it. The Exit this page pattern explains the button on its own
page first and says what it cannot do: "This pattern is not a complete solution
to eliminating all possible risk to the user."

**Show your working and your date.** NHS pages carry "Page last reviewed" and
"Next review due"; the NHS standard for health content asks every publisher to
"display the date the content was last checked and when it will be checked
again." Mayo Clinic publishes its process (100+ physicians as medical editors,
disclosures shown with the content, a review "at least every two years"). The
Stanford Encyclopedia of Philosophy has been "a dynamic reference work" since
1995, refereed, with fixed quarterly editions for citation. MDN signs every
page "last modified on [date]."

**Write the rules down where everyone can see them.** Every GOV.UK and NHS
pattern page has the same anatomy: when to use, when not to use, how it works,
research, known issues and gaps, next steps. Apple merged its platform
guidelines into one document with change logs. Stripe put documentation on
its engineering career ladder. This is how a site with many hands stays one
site.

**Calm is a design decision, not an absence of design.** Are.na forgoes likes,
favorites and shares. Wikipedia narrowed its column after research found its
line length "more than three times the recommended value," with no loss of
pageviews or edits. MDN and GOV.UK both tried generative answers on top of
their trusted pages; MDN pulled "AI Explain" within days after a community
issue drew more than a thousand upvotes, and GOV.UK's own pilot reached 90%
accuracy against its guidance after two years, which still means one answer
in ten is wrong.

None of these sites serves LiveWell's reader, and none of them is about God.
That is the opening. A theological site that is organized like GOV.UK, as
careful in a crisis as the NHS, as honest about its own dates as the Stanford
Encyclopedia, and as calm as Are.na would be unlike anything in its field. Most
of what it needs is content LiveWell already holds, presented in the forms
these sites have already tested.

---

## 1. The products

Each entry: who it serves; how it is organized; signature features and the
interaction behind them; visual and typographic choices where described; how
it holds attention without cheapening; what is stealable and what is weak.

### 1.1 GOV.UK: the design system, content design, step by step, start pages, smart answers

*Code and guidance read: the GOV.UK Design System repository (patterns and
components as Markdown), GOV.UK Publishing Components (docs and locale
strings), Smart Answers (flows, views, ADR 002). Searches: six.*

**Who it serves.** Everyone in the United Kingdom who has to do something with
the government, including people with low digital skills, disabled people, and
people in distress (bereavement, domestic abuse, money trouble). The
Government Design Principles open with "Start with user needs" and include "Do
less," "Design with data," "Do the hard work to make it simple," "This is for
everyone," and "Be consistent, not uniform" (gov.uk/guidance/government-design-principles,
via search excerpt).

**How it is organized.** Two structures that the team has spent a decade
reconciling. "Mainstream browse," per Inside GOV.UK (2018), is for "people who
just need to get in, do something, and get out"; topic pages served
specialists. A 2021 GDS post said "aligning and de-duplicating these systems
will provide a better experience." The 2025 topic page update renamed a link
section from "Popular tasks" to "Most viewed" "based on feedback from our user
research." Search uses synonyms (spelling variants, informal terms, former
names, acronyms, common typos) applied "cautiously" because they act across the
whole index, plus a "best bets" tool that lets an editor pin a result to the
top for a term (Inside GOV.UK, 2014).

**Step by step navigation** (pattern page read in full). An end-to-end task in
numbered steps, each step collapsed by default ("User research suggested that
each step should be collapsed by default so that users are not overwhelmed"),
each holding one or more links to the pages and services that do the work. It
appears two ways: as a standalone page, and in the right sidebar of every page
that belongs to it, with a header link at the top of those pages ("Part of"
in the locale file; screen readers hear "This page is part of"). Steps can be
joined by "and" (do these together) or "or" (do one, depending on your
circumstances). A cost goes after the link text. Text inside a step only when
it gives "essential context that the user needs before they click" or "the
conditions the user needs to meet." The UI strings are plain: "Show all steps,"
"Hide all steps," "Show," "Hide." Without JavaScript the whole thing expands.
GOV.UK's rule for when to use it: a task "that ha[s] a specific start and end
point," that needs several pages or services, "where it's helpful for the user
to complete tasks in a specific order." Not "when the user only needs to read
guidance and not take an action," and not "when there's no logical or helpful
order." Live examples include *Learn to drive a car*, *Employ someone*, and
*What to do when someone dies*. It came out of "8 rounds of research with
users, including those with disabilities and people with low digital literacy,"
and a remote study found "a significant increase in users' successful task
completion" (search summary of the GDS blog). Known gaps, stated on the page:
"Users rarely use the step by step navigation header," and "Users get
frustrated when looping back and forth between step by steps. It's OK to link
from one step by step to another, but not to link from the second step by step
back to the first." An OECD case study counted 18 live at the time it was
written.

**Start pages** (pattern read). A service begins on a content page that gives
"just enough information to help them understand what the service does and
whether it will meet their need," a button whose words match the action
("Start now"), what most users need to know first ("how much it costs ... and
roughly how long it will take"), what documents they will need, and "other
ways to access the service – for example, by phone or by completing a paper
form." Complex eligibility belongs inside the service as questions, not on the
start page.

**Question pages and check answers** (patterns read). "Start by asking one
question per page." Every question page has a back link, because "some users
do not trust browser back buttons." Allow "'I do not know' or 'I'm not sure' if
they are valid responses." A check answers page lists every answer with a
"Change" link; after changing one, "the 'Continue' button should return them to
the check answers page. They should not need to go through the rest of the
transaction again."

**Smart Answers** (code read). "A tool for content designers to present
complex information as a flow of questions, leading to an outcome." A landing
page with "Start now," question pages, and an outcome page titled "Information
based on your answers" with a "Next steps" section, marked `noindex`. Above the
outcome sits "Your answers": every question and answer with its own "Change"
link, and "Start again." The *Register a death* flow is three questions
(where, at home or hospital, was it expected) and four outcomes. An
architecture decision record explains that answers were stored in the URL
path, but a sensitive flow stores them in the session instead, both to keep
them out of the address bar and "to support the `Leave this site` component,
which allowed users to quick erase their responses."

**Exit this page** (component and pattern read in full). For pages "with
sensitive information that could put someone at risk of abuse or retaliation."
A button at the top of the page that takes the reader to a neutral site (BBC
Weather by default; avoid sites that show personalized pages); a hidden
secondary skip link for assistive technology; pressing Shift three times within
five seconds also activates it, with three dots under the button filling as
the key is pressed; and a loading overlay that "immediately clear[s] any
content off the browser until the next website loads." In a service, an
interruption page explains it first and says plainly that "their internet
browsing history will not be erased," and links a "safety content page" (use a
public device such as a library's, private browsing, clearing history and
cookies). Designed with "people with a lived experience of domestic abuse."
The page warns that "seeing this component might discourage certain users ...
If the user does not identify themselves as being at risk, they might see the
button on a service and decide it's not relevant to them."

**Complete multiple tasks** (pattern read). A task list for work done over
several sessions. Status words are adjectives, few in number ("Completed,"
"Incomplete," "In progress," "Cannot start yet"); a completed task is shown in
plain black text "with no background colour," which "will draw more attention
to tasks that require action." Sometimes "it's better to let the user decide
when a task is completed."

**Interruption pages** (pattern read). "Use Interruption pages sparingly, as
they get less effective the more often users see them."

**The pattern pages themselves.** Every page in the design system has the same
anatomy: what it is, when to use, when not to use, how it works, research on
this pattern, known issues and gaps, next steps, and a link to a public
discussion. This is the most stealable thing on GOV.UK, and it is the form of
the site's honesty about itself.

**GOV.UK Chat** (secondary coverage). An AI answer service piloted on GOV.UK
content: about 1,000 invited users in 2023 to 2024 found answers useful (about
70%) but the trial "uncover[ed] issues of accuracy and reliability"; by a 2025
app pilot with 10,000+ participants GDS reported 90% accuracy against its own
guidance, with partial answers "a main source of inaccuracy" (Public
Technology; Civil Service World; The Register, March 2026).

**Visual and typographic choices.** Seen only as described: GOV.UK does not
let prototypes customize the step by step ("When you prototype a step by step
journey, do not customise the design"), and a two-thirds column is used so
"lines of text [do not get] so long that the page becomes difficult to read."
Content design guidance (secondhand, through council style guides built on
it): readers "get through only 20 to 28% of a page," so front-load titles,
headings and bullets with the words people scan for; a reading age of about 9
for public content, which the guides insist "isn't the same as writing for a
9-year-old."

**How it holds attention.** It does not try to. It is used because it is the
only place to do the thing, and trusted because it is consistent everywhere.

**Stealable.** Step by step for tasks with an order; the "Part of" link on
member pages; start pages that say time, needs and other ways; "Your answers"
with a Change link per answer; sensitive answers kept out of URLs; Exit this
page, complete; hand-edited synonyms and best bets; the pattern page anatomy
with "When not to use" and "Known issues and gaps."

**Weak, for LiveWell.** The register: a reading age of 9 is right for a crisis
page and wrong for James's essays. The visual identity is deliberately
anonymous (Transport type, blue links, black header), which is the opposite of
a single author's room. And step by step is explicitly for doing, not reading;
used on a reading list it becomes a syllabus with the wrong grammar.

### 1.2 NHS.uk and the NHS service manual

*Guidance read in full from the NHS service manual repository: the patterns
"Help users decide when and where to get care," "Know that a page is up to
date," "Hub page," "Mini-hub," "A to Z page," the content guide's health
literacy and voice and tone pages, the Standard for creating health content,
and the "What's new" page. Searches: one (NHS 111 mental health option).*

**Who it serves.** The public of England looking for health information, often
frightened, often with low health literacy. The service manual says "more than
4 in 10 adults struggle with health content for the public" and "more than 6
in 10 ... with health content that includes numbers and statistics."

**How it is organized.** Hub pages use three kinds of clickable card: "top
task" cards (small, at the top, "Do not use more than 3"), "primary cards with
chevron" for the important groups, and "secondary cards" for less important
ones. "Do not use this pattern as a substitute for a clear information
architecture." For one complex subject spread over two to eight pages, a
**mini-hub**: the page heading is the page's own name in large type with the
subject as a caption beneath it inside the same `h1` ("What is AMD?" above
"Age-related macular degeneration (AMD)"), a contents list at the top with the
current page marked, and pagination at the bottom. The research note is exact:
when the subject was the main heading, "it was not obvious to them which page
they were on. In some cases they did not realise they had moved between
pages." An **A to Z** list for the Health and Medicines indexes, because "some
users would rather go to an A to Z list of pages than search ... when they
weren't sure how to spell a word like 'appendicitis'." (They write "A to Z,"
not "A-Z," because some screen readers read the dash as "Ay zed.")

**Care cards** (pattern read in full). Three levels: non-urgent (blue: "see a
GP"), urgent (red: "ask for an urgent GP appointment or get help from NHS
111"), emergency (red and dark grey: "call 999 or go to A&E"). The heading is
one call to action in the form "Speak to a GP if:" followed by a bulleted list,
"Even if your care card includes only 1 symptom." Each heading carries hidden
text naming the level ("Non-urgent advice: Speak to a GP if:") so screen reader
users who jump by headings hear the urgency. When two cards sit together,
"order them according to the likelihood and seriousness of symptoms" (for
headaches start non-urgent; for head injury start with emergency). "Do not
include other links in an emergency care card." "Avoid vague or subjective
language. Instead of 'a young child', for example, say 'a child aged 5 years or
younger'." Retested in 2026. The NHS 111 mental health option (2024) adds that
"you can call for yourself or for someone else" (NHS England).

**Review dates** (pattern read). Two dates at the foot of the content: last
reviewed and next review due. Tested in 2018: placed near the footer behind a
rule, "users didn't notice them there. So we removed the rule and brought the
dates closer to the content. Users then read them and said that they were
helpful." Do not use them "when you change something on a page but have not
reviewed the whole page." For health content a review means re-checking the
evidence, and "a clinician must sign them off."

**The Standard for creating health content.** Essential: a documented process
for checking and approval; "a planned review cycle for all content"; "make
clear which organisation has published the content"; be transparent about
conflicts of interest. Best practice: "Display the date the content was last
checked and when it will be checked again"; "Keep a record of sources of
evidence you use"; "Invite feedback from users."

**Voice and tone.** "Neutral and factual. It's authoritative, but also calm and
reassuring ... empowering, rather than patronising." Avoid "should" because "it
can sound patronising." Readability tools are not recommended "except to help
you prioritise your content ... It's best to test it with your users."

**What's new.** The service manual opens a "Latest updates" page by month, as
a two-column table: Section, Update.

**Visual and typographic choices.** Seen only as described: color carries the
care card level, but the heading carries the meaning, because "People with
visual disabilities may not recognise care cards by their colour."

**Stealable.** The care card, almost unchanged; review dates placed where they
are seen; the mini-hub's heading rule; an A to Z for people who would rather
browse than spell; the content standard as a public checklist.

**Weak, for LiveWell.** Clinical authority is the NHS's ground; LiveWell's
pages are pastoral counsel and must say so (they already do). Red and blue
cards would break the palette; the levels have to be carried by words,
weight and the existing tokens.

### 1.3 Stripe documentation

*Searches: three. No code (Markdoc is open source, Stripe's docs are not).*

**Who it serves.** Developers integrating payments, from first test to
production.

**How it is organized and what it does.** Stripe's own account (stripe.com/blog/markdoc):
its docs incorporate the reader's own test API key into code samples, so copied
code runs against their account, and tailor content to the reader, showing or
hiding sections by location or by the Stripe features they use. It built
Markdoc because its old platform mixed HTML, Markdown, Ruby and template
helpers in the same files; Markdoc lets writers add interactivity and simple
page logic without code in the prose. Secondary descriptions (Moesif teardown;
SaaSFrame): three columns, navigation on the left, prose in the middle, runnable
code on the right kept in step with the text, with the paragraph under the
pointer highlighting the code it describes; a persistent sidebar and floating
contents list; collapsible code blocks with copy buttons.

**Culture.** Secondary (Slab; Mintlify; First Round interview with Brie
Wolfson): the CEO's early emails "literally had footnotes"; the documentation
manager added documentation to each level of the engineering career ladder;
engineers' writing is assessed in performance reviews; office hours with
technical writers.

**Stealable.** Content as typed blocks with logic, validated at build;
documentation as a product with an owner; the reader's own context carried
into the page (for LiveWell: the household's band, the translation, the
device's place in a plan, never an account).

**Weak, for LiveWell.** The three-column, code-beside-prose layout is a
developer tool; LiveWell's equivalent (notes beside the text) is already ranked
in `C-editorial-design.md`. Personalization by account is ruled out by the
plan (no reader accounts).

### 1.4 Apple Human Interface Guidelines

*Searches: two. Coverage from 2022.*

**Who it serves.** Designers and developers building for Apple's platforms.

**How it is organized.** In June 2022 Apple merged its separate platform
guidelines into one document with six top-level categories: Foundations,
Patterns, Components, Inputs, Platforms, Technologies (MacStories; 512 Pixels).
Larger sections open on a visual index; each page links related videos,
articles and API documentation. Apple's developer news post promised change
logs "for each updated page and for the full set of guidelines" (quoted by
pxlnv).

**Stealable.** One document instead of many; a visual index at the top of a
large section; change logs at two levels (the page, and the whole).

**Weak, for LiveWell.** A platform vendor's rulebook; its authority comes from
the platform, not the prose.

### 1.5 Wikipedia (the Vector 2022 redesign)

*Code read: Vector 2022's interface strings and search configuration. Searches:
three.*

**Who it serves.** Everyone looking something up; editors second.

**What changed in Vector 2022.** From the Wikimedia Foundation's Desktop
Improvements pages (search excerpts): a limited content width, because
Wikipedia's "character count per line was more than three times the
recommended value"; limiting it "did not show any significant effects on
pageviews, edit count, or account creation," readers said it improved their
experience, and "a significant number" of editors disliked the extra
whitespace. A new search widget raised search sessions by an average of 28.9%
among logged-in users on early-adopter wikis. A sticky header and a table of
contents were user-tested (report of March 2021; findings not read).

From the code: the table of contents is labeled "Contents," begins with an
entry called "Beginning," has collapsible subsections ("Toggle $1 subsection"),
and can be pinned to the sidebar or hidden ("move to sidebar," "hide"; "The
table of contents has moved here"). An "Appearance" menu ("Change the
appearance of the page's font size, width, and color") offers Text (Small,
Standard, Large), Width (Standard, Wide), and Color including Dark, and is
itself pinnable. The search typeahead is configured to show a thumbnail and the
short description under each title.

**Content rules.** The lead section "should identify the topic, establish
context, explain why the topic is notable, and summarize the most important
points, including any prominent controversies," in "no more than four
well-composed paragraphs" (Manual of Style, via mirror). The neutral point of
view policy asks that views be represented fairly and proportionately, and
that coverage "reflect the relative levels of support for those views, and
does not create a false sense of parity" (via mirrors; the live policy page was
not returned).

**Stealable.** A contents list that stays beside you and knows where you are;
one appearance control for every reading page; a short description under every
search result; a lead that names the controversy; due weight.

**Weak, for LiveWell.** Many voices, no voice; the encyclopedia's neutrality is
not James's register, which lands verdicts. Due weight is useful as a
discipline in the steelman, not as a replacement for the verdict.

### 1.6 MDN Web Docs

*Code read: MDN's current front end (`mdn/fred`), the search modal, recently
visited, record visit, article footer, content feedback, Baseline strings,
curriculum module, sidebar filter. Searches: one (AI Explain).*

**Who it serves.** Web developers, from learners (the MDN Curriculum) to
experts checking a reference.

**Quick search** (code read). Pressing "/" or Ctrl or Cmd with K anywhere outside
a text field opens a search dialog; if the reader has selected text on the
page, it becomes the query. The index is a file of page titles and URLs loaded
the first time search opens. Every word typed must appear in the title; an
exact match of the whole title or the page's slug is boosted; ten results; each
shows its place in the site as a breadcrumb under the title; the last row is
always "Site search for *query*," which hands off to full-text search. Arrow
keys move, Enter opens.

**Recently visited** (code read). Each page records its title and path on the
device (localStorage, key `recently-visited`); the home page shows the list
under "Recently visited."

**The foot** (code read). "This page was last modified on [date] by MDN
contributors," a link to the source, and "Was this page helpful to you?" with
reasons if not (outdated, incomplete, code examples, other). Reference pages
open with "In this article." Baseline marks say how widely a feature works in
plain sentences ("This feature is well established and works across many
devices and browser versions. It's been available across browsers since
[date].").

**Curriculum** (code read). Module pages carry "In this module," the topic and
group, and "Previous: [title]" and "Next: [title]" buttons with the actual
titles.

**AI Explain** (MDN's postmortem and press). Launched in mid-2023 to explain
code on reference pages; a community issue opened on June 30 about "incorrect
and misleading" output drew 1,287 upvotes; MDN acknowledged "a misstep in fully
launching the AI Explain feature" and paused it; one example said a grid had
two rows and two columns when the code defined only two rows.

**Stealable.** The quick search exactly (title index, all words, exact boost,
breadcrumb, the escape row, "/" and selection prefill); recently visited on the
device; Previous and Next with titles; plain "how established is this"
statements.

**Weak, for LiveWell.** The AI episode is the lesson: generated explanation
attached to a trusted reference page damages the page, not just the feature.

### 1.7 Linear

*Searches: four.*

**Who it serves.** Software teams tracking work. Its relevance here is its
reputation for craft and its changelog.

**The changelog.** Linear's own post says it "published over 50 changelogs" in
twelve months while building the product, as a way to show that the company
"values execution and shipping things." Secondary (ReleasePad): "each release
gets a dedicated page with a hero image, a clear headline describing the user
benefit," technical detail kept secondary. In 2020 it was weekly (Indie
Hackers thread).

**The redesign.** Linear's 2024 post on redesigning its interface changed the
sidebar, tabs, headers and panels to reduce visual noise and improve hierarchy
and density; a secondary summary says the theme system moved from HSL to LCH
color so colors at the same lightness look equally bright.

**The Linear Method.** Linear's docs: issues need only a title, team and status
so writing one "doesn't take away from your core work"; "Write issues, not user
stories."

**Stealable.** A dated, public record of what changed, written for the reader's
benefit; perceptual color (LCH) for building light and dark from the same
tokens later.

**Weak, for LiveWell.** The "Linear look" (dark canvas, glows, gradients,
dense chrome) has become the default skin of software marketing. It is the
opposite of cream paper in a quiet room.

### 1.8 The Met collection online

*Searches: two. The Heilbrunn Timeline is covered in `B-church-history-teaching.md`
and is not repeated.*

**Who it serves.** Visitors, students, scholars, and anyone reusing images.

**What is described.** More than 450,000 object pages, many "updated nightly
with new information, scholarship, and images," served by a collection API run
by a Collection Product Development team (The Met, "How Does The Met Maintain
Half a Million Web Pages Devoted to Art?"). Open Access (February 2017):
images of public-domain works released under CC0, a search filter that limits
results to them, the CC0 mark on each object page, and each work's "tombstone"
data (title, maker, date, culture, medium, dimensions) published as a file on
GitHub. The site was relaunched in 2011 (Cogapp) and refreshed in 2016.

**Stealable.** A fixed "tombstone" block for every object; a rights mark on
every item and a filter for what is free to reuse.

**Weak, for LiveWell.** Scale. A site that shows 450,000 objects needs facets
and infinite grids; LiveWell's virtue is a curated shelf.

### 1.9 Library of Congress digital collections

*Searches: two.*

**What is described.** "Free to Use and Reuse" (2018): themed sets (travel
posters, presidential portraits, Civil War drawings) of items the Library
"believes ... is either in the public domain, has no known copyright, or has
been cleared by the copyright owner," with each collection's own rights
statement "consulted for guidance on use." For teachers, the Primary Source
Analysis Tool: Observe (facts only, no inference yet), Reflect (purpose,
audience), Question (what else do you wonder), in no fixed order, with
teacher's guides per kind of source (photographs, maps, manuscripts) (secondary,
through teacher-training sites).

**Stealable.** Curated, themed sets as the door to a huge archive; rights
stated per item.

**Weak, for LiveWell.** The analysis routine overlaps *Reading Like a
Historian*, already ranked in B.

### 1.10 Smithsonian Learning Lab

*Searches: two.*

**What is described.** Teachers and students find resources across the
Smithsonian's collections or upload their own, gather them into collections,
and add notes, tags, image "hotspot" annotations, quiz questions, discussion
questions and sorting activities; collections can be private or shared "for
others to adapt"; shared by link or embed (Smithsonian release; Getting Started
guide, 2019; Common Sense Education review, whose main complaint is that the
dashboards need a tutorial). Many collections are built on Harvard Project
Zero thinking routines such as See, Think, Wonder.

**Stealable.** The copy-and-adapt model: a curated collection that a teacher
can take, reorder and annotate for her own class without changing the
original.

**Weak, for LiveWell.** It needs accounts and dashboards, which the plan rules
out; the device and the URL have to carry the copy.

### 1.11 Are.na

*Searches: one.*

**What is described.** Blocks (an image, a link, a note) collected into
channels; a block can sit in many channels; channels connect to one another
(Wikipedia). Built as an ad-free alternative to social networks, "forgoing
'likes,' 'favorites,' or 'shares' in its design" (Wikipedia), letting people
"collect without the intrusion of ads or recommendations" (Upstatement
interview), funded by paying subscribers.

**Stealable.** The refusal: no likes, no favorites, no recommendation feed,
and a business model that does not need them. A saved thing may live on
several of the reader's shelves at once.

**Weak, for LiveWell.** Are.na is a tool for collectors and artists; its
openness to anything is not a reading room.

### 1.12 Mayo Clinic health library

*Searches: two. The current page template was not seen; archived pages from
2013 to 2016 were.*

**What is described.** Mayo's own Health Information Policy: content is made
by a "standard process" (research, writing and editing, medical review, copy
editing, annotation, visual content, publishing); "more than 100" physicians and
scientists serve as medical editors; editors disclose financial interests and
"disclosure statements appear with the content"; staff writers get no bylines,
hence "Mayo Clinic Staff"; statistics, recommendations and shifts in standard
practice are verified specifically; "faster-evolving topics ... are reviewed at
least every two years." Archived condition pages share one sequence of sections
(definition, symptoms, causes, risk factors, complications, preparing for your
appointment, tests and diagnosis, treatments, lifestyle and home remedies,
prevention), with "When to see a doctor" inside symptoms. A symptoms index runs
by letter.

**Stealable.** A published policy that says how pages are made and how often
they are checked; one fixed template across hundreds of conditions;
"Preparing for your appointment."

**Weak, for LiveWell.** The institutional byline. LiveWell is one man's voice
and the opposite choice is right for it.

### 1.13 Added: the Stanford Encyclopedia of Philosophy

*Searches: one.*

Designed "from its inception (September 1995) as a dynamic reference work. In
a dynamic reference work, each entry is maintained and kept up to date by an
expert or group of experts," and "all entries and substantive updates are
refereed by the members of a distinguished Editorial Board before they are
made public" (SEP archive pages). "For citation purposes, fixed editions are
made on a quarterly basis and stored archivally" (UC Davis library guide). It
belongs in this cluster because it shows how a scholarly library can be both
living and citable: the page changes, and the edition a reader cited does not.

### 1.14 Added: Diátaxis

*Searches: one.*

Daniele Procida's framework, adopted by Canonical and others, sorts
documentation into four kinds that "should be kept distinct from the others":
tutorials (a lesson, at study and action), how-to guides (steps for someone
already working, at work and action), reference (facts, at work and knowledge),
explanation (context and the higher view, at study and knowledge). The
"compass" is a test for any paragraph: if it does not clearly belong to one
quadrant, the page is mixing kinds and should be split (Canonical; EBRAINS;
summaries). It is the organizing logic that makes Stripe, MDN and GOV.UK feel
orderly, made explicit.

### 1.15 Added: Chayn's trauma-informed design principles, and Calm Technology

*Searches: two.*

Chayn, a survivor-led nonprofit supporting people after abuse, publishes eight
principles of trauma-informed design: safety, agency, equity, privacy,
accountability, plurality, power sharing, and hope (Catalyst summary); Chayn
says it puts trust and safety ahead of aesthetics or simplicity, and applies the
principles to content writing as well as product design. Amber Case's *Calm
Technology* (2015) extends Weiser and Brown's idea of technology "that informs
but doesn't demand our focus," with principles headed "Technology Should
Require the Smallest Possible Amount of Attention" and "Technology Should
Inform and Create Calm." Both are the theory under "Unhurried. Weighted.
Grown-up." for the pages where readers arrive in pain.

---

## 2. What the best organized systems share

| # | The move | Done best by | Also | LiveWell today |
|---|---|---|---|---|
| 1 | **Organize by the reader's task**, not format or audience | GOV.UK browse and step by step | NHS hub top tasks; Diátaxis | Doors partly by format (Essays, Books, Resources); Find Help by need |
| 2 | **Urgency in the heading**, graded | NHS care cards | GOV.UK warning text | One flat "Signs it is time to call someone" list |
| 3 | **Tell them before it starts** | GOV.UK start pages | Smart Answers landing; Exit this page interruption | Tools state time and privacy; no "this isn't the place to start if" |
| 4 | **A dated, checked page** | NHS review dates | Mayo's two-year cycle; SEP editions; MDN "last modified" | `reviewed` stored, not shown |
| 5 | **Search that teaches the map** | MDN quick search | Wikipedia typeahead; GOV.UK best bets | Strong ranking; no breadcrumbs, recents, synonyms or pins |
| 6 | **Where am I** in a long page or set of pages | Wikipedia's pinned contents | NHS mini-hub; MDN "In this module" | Contents links on care pages; essay contents card |
| 7 | **The rules written down**, with when not to use | GOV.UK Design System | NHS service manual; Apple HIG | Rules in CLAUDE.md and code comments; no pattern library |
| 8 | **Calm by refusal** | Are.na | Wikipedia's width; Calm Technology | Already the brand; guard it |

---

## 3. The patterns most worth bringing to LiveWell, ranked

Ranked by how much each would change a reader's experience of finding,
trusting and acting, weighed against fit with the brand and the effort. Each
names the page, what the reader does, what it retires (the plan's one in, one
out rule), its fit and its effort.

### 1. When to get help, by urgency: care cards on every care page

*Seen in:* NHS care cards (pattern read in full); the NHS 111 mental health
option; Chayn (safety, agency).

*What it is.* The "When to get more help" section on each care page stops
being one list and becomes up to three short cards, each with one action in
its heading and a bulleted list beneath:

- **This week:** "Talk to your pastor or a counselor this week if:"
- **Today:** "Get help today if:" (a doctor, a counselor's crisis
  appointment, the 988 Lifeline by text if talking is too hard)
- **Now:** "Call or text 988 now, or call 911, if:" (no other links in
  this card; the numbers come from `crisis-resources.json` as they do today)

Each heading carries visually hidden text naming the level, so a screen reader
user who jumps by headings hears "Urgent:" or "Emergency:" first. Cards are
ordered by likelihood and seriousness of the subject: the grief page opens
with "this week," a page about thoughts of suicide opens with "now." Concrete
language replaces subjective words ("a child or teenager who talks about
wanting to die," not "a struggling child"). A line under the cards keeps the
NHS's "you can call for yourself or for someone else."

*Why it works.* Today the grief page's single list mixes "You've had thoughts
of ending your life ... call or text 988 now" with "Months have passed and you
still can't get up." A frightened reader has to sort urgency herself. The NHS
tested the heading-as-action form and found scanning readers stop and act. It
also keeps the page from shouting: the emergency card appears only where it
belongs.

*On LiveWell.* `moreHelp.signs` (a string array) becomes `moreHelp.cards`
(`level`, `heading`, `items`) in the 40 need files; `CarePage.tsx` renders
cards with the existing tokens (no red or blue: the level is carried by the
heading, a left rule in `--charcoal` for "now", and weight, so the palette
holds); `validate-needs.mjs` checks that every `high` page has a "now" card,
that no "now" card holds a link other than the crisis lines, and that every
item is a concrete sign. "What to say when you call" and "What it costs" stay.
The content change is pastoral and goes to James as part of a care-page review
(below).

*Retires:* the flat "Signs it is time to call someone" list.

*Fit:* core. *Effort:* M (a component and a validator are S; rewriting 40
lists by urgency is the work).

### 2. A start panel that tells the truth, and "Your answers" with a change link for each

*Seen in:* GOV.UK start pages, question pages and check answers; Smart
Answers' "Your answers," "Start again" and "Information based on your
answers"; Smart Answers ADR 002 (sensitive answers out of the URL); Chayn
(agency, privacy).

*What it is.* One `StartPanel` component above every tool and self-check (28
tools, the assessments), always in the same order: what it does in one line;
how long it takes; what you will need, if anything (your spouse in the room, a
pen); where the answers go ("on this device; nothing is sent"); **when this is
not the place to start**, with the right page ("If you are afraid of your
spouse, start here instead," linking the care page and the Domestic Violence
Hotline; "If you are thinking about ending your life, call or text 988 now");
other ways to do it ("Prefer paper? Print it"); and a Start button whose words
match the act ("Begin the self-check"). On the results screen, above the
results, "Your answers" lists each question and answer with its own "Change"
link that returns to the results after one edit, beside "Start again."
"I'm not sure" is offered wherever it is an honest answer. Answers to
sensitive tools are never written into a shareable URL.

*Why it works.* GOV.UK's rule is to give "just enough information to help them
understand ... whether it will meet their need" before they start. LiveWell's
Marriage self-check already tells a frightened spouse to get help first, but
only in its results, and only when the conflict score is low (the `low` band in
`MarriageAssessment.tsx`), after fifteen questions.
Trauma-informed design puts the exit before the entrance.

*On LiveWell.* `components/StartPanel.tsx` with props for each line; the tools
registry gains `minutes`, `needs`, `notFor` (text and href) and `paper` (PDF
href) fields so the panel and `/tools` read one source; the results views use
the existing "Change my answers" storage, made per-question. Tests: the panel
renders `notFor` before the Start button on every tool marked sensitive.

*Retires:* the hand-written intro paragraphs that each tool phrases differently.

*Fit:* core. *Effort:* S for the component, M to fill 28 tools.

### 3. Exit this page, finished

*Seen in:* GOV.UK Exit this page component and pattern (read in full); Smart
Answers' "Leave this site" with answers kept in the session.

*What it is.* LiveWell's `QuickExit` already does the essential thing and is
honest about history. GOV.UK's tested version adds four things: pressing
**Shift three times** within five seconds activates it, with three small dots
under the button filling as the key is pressed; a **hidden secondary link** at
the top of the page (after "Skip to content") for assistive technology; an
**instant overlay** in `--charcoal` that blanks the page before the neutral
site loads, for slow phones; and, the first time a reader meets the button, a
short **explanation** that says what it does, that it does not erase browsing
history, and links a **"Staying safe online" page** (use a device the other
person does not check, such as a library's; private browsing; clearing
history; that this site saves answers on the device and how to clear them).
Any answers the abuse-related tools hold in `sessionStorage` are cleared as the
button fires. The button moves to the top of the page as GOV.UK places it,
or stays bottom right on phones if James prefers the thumb position; either
way it is in the same place on every page that has it.

*Why it works.* It was designed with survivors of domestic abuse and tested
for accessibility; LiveWell has the same readers on `/help/` pages about abuse
and in the Connection Planner. GOV.UK's own warning applies: the button can
make a reader who does not think of herself as at risk feel the page is not
for her, so it appears only where the subject calls for it, as now.

*On LiveWell.* Extend `components/QuickExit.tsx`; add `/help/staying-safe-online`
(a short care page held to the same review as the others); register the route
by the 9.3 checklist. Tests for the Shift sequence and the reset after five
seconds.

*Retires:* nothing; it completes an existing component.

*Fit:* core. *Effort:* S.

### 4. "Page last reviewed" and "Next review due," shown where they are read

*Seen in:* NHS "Know that a page is up to date" (pattern read) and the
Standard for creating health content; Mayo Clinic's Health Information Policy
(review at least every two years, disclosures with the content); SEP
(refereed, dynamic, fixed editions for citation); MDN's "last modified."

*What it is.* At the foot of each care page, topic page and Honest Answer,
directly under the last section and not behind a rule (the NHS moved it closer
after users missed it): "Page last reviewed: 29 September 2026 · Next review
due: September 2027," and a link "How these pages are made." A review date
appears only after a review of the whole page, never for a small edit (the
NHS's rule). `validate-needs.mjs` fails CI when a next-review date has passed,
as it already does for crisis numbers. The sources a page already stores
(`sources`) are listed under "Where these facts come from," collapsed. The
`/how-we-write` page proposed in `C-editorial-design.md` (pattern 10) gains a
section for care pages modeled on Mayo's policy: the steps a page goes through,
who reads it (James, by name; a licensed counselor only if James names one),
how often it is checked, and that nothing on it is medical, legal or financial
advice.

*Why it works.* The skeptic and the frightened reader ask the same first
question: can I trust this, and is it current? LiveWell already keeps a review
record that would satisfy the NHS standard (the grief page's note runs to
several hundred words) and hides it. Showing the date, and failing the build
when it lapses, turns a private discipline into public trust at almost no
cost.

*On LiveWell.* `reviewed.on` exists; add `reviewed.next`; render in
`CarePage.tsx` and the topic and answer pages. The long review note stays in
the data, not on the page.

*Retires:* nothing on the page; it retires the silent review.

*Fit:* core. *Effort:* S.

### 5. Step by step, for the few tasks that have an order

*Seen in:* GOV.UK step by step navigation (pattern page, component docs and
strings read); *What to do when someone dies* and *Learn to drive a car* as
GOV.UK's own examples.

*What it is.* A small number of standalone pages, each a real task with a
start and an end, laid out as numbered steps that open to links into pages
LiveWell already has, with "and" and "or" joins, "Show all steps," and a line
of text in a step only for what a reader must know before tapping. Each page
that belongs to one shows a line at its top, "Part of: When someone you love
dies, step by step," and on desktop the steps in a side column with the current
step open. Candidates that pass GOV.UK's test (an order, actions, several
pages):

- **When someone you love dies: the first weeks.** Who to call first; asking
  the church for help with the funeral; the service and the readings; the
  first Sunday back; the grief care page; when grief needs more than friends.
  Practical items that are legal or financial say so and send the reader to
  the right professional.
- **Starting to read the Bible.** Choose where to start; the context guide for
  that book; the first week in the Study Bible; the 2027 whole-story plan;
  a group if you want one.
- **Finding a church after a move** (the loneliness evidence in
  `benchmark.md`): what to look for; the first visit; the second; when to
  join; if church has hurt you, the church hurt page first ("or").
- **Leading a group for the first time:** choose a guide; read the leader
  notes; the first night; when someone shares something heavy (the care
  pages' "If you're helping someone").
- **Beginning family devotions:** tonight at the table; table mode; the age
  bands; the year of devotions.

*Why it works.* GOV.UK built it because one task was scattered across many
departments; LiveWell's help for these moments is scattered across care pages,
plans, guides, tools and devotions that do not point to each other in order.
Eight rounds of research and a significant rise in task completion are behind
the pattern. Its rules guard the brand: not for reading lists, never more
steps than the task has, and never two step-by-steps that link back to each
other.

*On LiveWell.* `client/public/steps/<slug>.json` (intro, steps with `title`,
`kind: step|and|or`, `links`, optional `note`), a `StepByStep` component and a
`PartOf` line, `validate-steps.mjs` (every link resolves through
`isPublicEssayHref`, no loops between step-by-steps, at most eight steps), the
9.3 route checklist for `/steps/:slug`. Begin with two (the death of someone
you love, starting to read the Bible); never more than six.

*Retires:* the reading pathway each one replaces, where one exists (the
`TopicPathway` pages), so a task has one ordered home, not two.

*Fit:* core. *Effort:* M.

### 6. Search that teaches the map

*Seen in:* MDN quick search (code read); Wikipedia's typeahead with
description (config read) and its 28.9% rise in search sessions; GOV.UK
synonyms and best bets.

*What it is.* Four additions to the search LiveWell already ranks well:

1. **Under each result, one line of description and its place in the site**
   ("Study › Church history"), so every search quietly teaches the shape of
   the library.
2. **"/" or Ctrl or Cmd with K opens search** on desktop, and text the reader has
   selected becomes the query (select "Chalcedon" in an essay, press "/").
3. **When the field is empty, "Recently visited on this device"**: the last
   eight pages, from `storage.ts`, with a "Clear" link; never on a shared
   address, never synced.
4. **A hand-edited `search-bestbets.json`**: synonyms ("Lord's Supper,"
   "communion," "Eucharist"; "nones," "unaffiliated"; "deconstruction,"
   "deconstructing") and pinned results for the queries that matter most ("is
   the Bible reliable" pins the Honest Answer; "Christian nationalism" pins the
   topic page). A validator checks every pinned target is live. The last row
   of every result list stays "Search everything for 'query'."

*Why it works.* MDN's design is small and fast because it indexes titles, not
text, and lets the full search catch the rest. Wikipedia's description line is
what made its widget used more. GOV.UK's lesson is that a few hand-made pins do
more than any algorithm for the queries a site most needs to answer well. The
source of the queries to pin is the site's own Search Console report
(`benchmark.md` section 5), never logged query text (telemetry stays slugs and
counts).

*On LiveWell.* `lib/siteSearch.ts` reads the best-bets file before ranking;
`SearchEntry` gains `trail`; the header search and `/search` render it;
`lib/recent.ts` on the storage helper. The crisis detection already in search
keeps priority over every pin.

*Retires:* the static `SEARCH_SHORTCUTS` row, replaced by recents and pins.

*Fit:* strong. *Effort:* S to M.

### 7. Doors and hubs ordered by the reader's question, with at most three top tasks

*Seen in:* GOV.UK taxonomy research ("no evidence ... users need to navigate by
audience, or other facets like format"); "Popular tasks" renamed "Most viewed";
NHS hub pages (top task cards, primary cards, secondary cards); NHS A to Z.

*What it is.* Each hub page (`/study`, `/resources`, `/help`, the Family door
if James adds it) opens with **no more than three top tasks** (for `/study`:
"Look up a passage," "Start reading the Bible, step by step," "Church history,
from the beginning"), then **primary cards** for the groups most readers need,
in order of need, then **secondary cards**. Groups are named for what the reader
is trying to do ("Get through a hard season," "Teach your children," "Study
with a group") rather than for format ("Downloads and PDFs," "How-to guides,"
"Self-checks"); a format survives only as a filter inside a group. Beside it,
an **A to Z of every subject** (care needs, topics, doctrines, people in church
history, books of the Bible) generated from the search index, for readers who
would rather browse than spell "Chalcedon."

*Why it works.* `/resources` today is ten links sorted by what kind of file
they are. A parent looking for help with a teenager's phone has to guess
whether that is a tool, a how-to, a plan, a care page or a download. GOV.UK and
the NHS both found readers think in tasks. This also supports the Topics door
the plan proposes: questions are tasks.

*On LiveWell.* A `HubPage` layout with three card weights over the existing
`HubGroup`; `/a-to-z` built from `search-index.json` by letter, with "A to Z"
written out. The doors themselves are James's (question 6 in the plan); this
pattern changes what is behind them, and the picture he is shown for question
6 should use it.

*Retires:* the format-grouped Resources list (formats become filters).

*Fit:* strong. *Effort:* M.

### 8. A contents list that stays with you, and one appearance control

*Seen in:* Wikipedia Vector 2022 (pinned contents with "Beginning,"
collapsible subsections, sticky header, the Appearance menu); MDN "In this
article"; Wikipedia's limited width.

*What it is.* On every long reading page (care pages, history sessions, topic
pages, Study Bible chapter notes, essays over a set length): on desktop, a
contents column beside the text that marks the section in view, begins with
"Beginning," and can be hidden; on phones, a slim bar that appears after the
first screen with the page title and the current section, which opens the
contents as a sheet. One **Appearance** control for the whole site (Text:
Small, Standard, Large; later Color, when dark mode returns), remembered on the
device, replacing per-page text-size controls.

*Why it works.* A care page has eleven sections and a frightened reader wants
"When to get more help" now. Wikipedia's change kept every reading page
consistent and was neutral on pageviews; its width research supports the 68ch
column LiveWell already holds.

*On LiveWell.* A `ContentsRail` component over `IntersectionObserver`; the
essay page's Text size and Focus controls fold into the site Appearance
control (`storage.ts` key). Layout only; no new content.

*Retires:* the essay page's private text-size control and each page's own
contents card.

*Fit:* strong. *Effort:* M.

### 9. One subject across several pages: the mini-hub

*Seen in:* NHS mini-hub (pattern read, with its heading research); MDN
curriculum ("In this module," "Previous: [title]," "Next: [title]").

*What it is.* Where one subject runs across two to eight pages (a topic page
and its sub-pages, a Part of the church history course, a series of Honest
Answers on one question, a care plan's eight weeks): the `h1` is the page's own
name in large type with the subject as a caption beneath it ("The Council of
Nicaea" over "Part I: The church under Rome"); a contents list at the top with
the current page marked; at the foot, "Previous: [title]" and "Next: [title]."

*Why it works.* The NHS found readers did not notice they had moved between
pages when the subject was the heading. The rule is cheap and fixes a confusion
LiveWell will create as the history course and topic pages grow.

*On LiveWell.* A `MiniHub` wrapper (heading, contents, pager) used by the
history sessions (with the plan's "Session 3 of 6"), the care plans, and
multi-page topics. It overlaps `C-learning-ux.md` pattern 12 ("Step through,
never locked") and adds only the heading rule and the titled pager.

*Retires:* bare "Next" and "Previous" links.

*Fit:* strong. *Effort:* S.

### 10. Say how widely a view is held

*Seen in:* Wikipedia's lead section rule ("including any prominent
controversies") and due weight ("does not create a false sense of parity");
MDN's Baseline sentences (how established, since when, where it does not
work).

*What it is.* On the doctrine debate pages, topic pages and Honest Answers,
two small disciplines. The opening summary names where Christians disagree,
in its first paragraph. And each position in a steelman carries one plain line
of weight, written like a Baseline statement: who holds it and since when
("Held by the Catholic and Orthodox churches and by most Protestants until the
nineteenth century"; "A minority view among evangelicals since the 1830s").
CLAUDE.md's first-, second- and third-order sorting stays; this line keeps an
equal-length steelman from implying equal support.

*Why it works.* CLAUDE.md asks that a steelman be fair enough that a reader
cannot tell where the author lands. Fairness in length can still mislead about
weight. The skeptic notices false parity at once, and so does the Christian
from the other side of a second-order question.

*On LiveWell.* A `held` field per position in the doctrine data; validators
require it on contested pages; each line is a claim, so it goes in the claims
ledger with a source, and stays out if it cannot be verified.

*Retires:* nothing; it sharpens the existing steelmans.

*Fit:* strong. *Effort:* S in code, M in content.

### 11. Name the kind of page, keep each kind pure, and author in typed blocks

*Seen in:* Diátaxis (four kinds, kept apart; the compass test); Stripe's
Markdoc (typed tags and page logic in the prose, validated); GOV.UK's "do not
customise."

*What it is.* Every page on LiveWell belongs to one of four kinds, and the site
says so in its kicker and keeps each pure: **lessons** (plans, the history
course, group studies: study by doing), **how-to** (care pages' "What to do
this week," how-tos, step-by-steps, tools: work by doing), **reference** (the
Study Bible, glossary, creeds, context guides, the A to Z: look something up),
**explanation** (essays, topic pages, Honest Answers: understand). A page that
mixes two is split. Inside the prose, the recurring pieces (a care card, a
step, a church witness, a Scripture quotation, a "not the place to start if"
note) are written as typed blocks in the Markdown that the build validates, the
way U16's remark plugin already turns references into links.

*Why it works.* It is the reason MDN, Stripe and GOV.UK feel orderly at
thousands of pages: a reader always knows what kind of thing is in front of
her, and the parts look and behave the same everywhere. For LiveWell, with many
agents writing across 180 pages, typed blocks are what make "the same thing the
same way" enforceable.

*On LiveWell.* A `kind` field on every content index (the essay `kind` from
`C-editorial-design.md` pattern 10 is one case); a small set of remark
directives (`:::care{level=now}`, `:::witness`, `:::step`) rendered by
`Markdown.tsx` and checked by the validators that already exist per library.

*Retires:* hand-built variants of the same box across pages.

*Fit:* strong. *Effort:* M.

### 12. A pattern library with "When not to use" and "Known gaps"

*Seen in:* every GOV.UK Design System and NHS service manual page (when to
use, when not to use, how it works, research, known issues and gaps, next
steps); Apple's single HIG with change logs; Stripe's documentation on the
career ladder.

*What it is.* One page per LiveWell component and pattern (`VerseRef`,
`CrisisBlock`, `QuickExit`, the care card, `StartPanel`, `StepByStep`,
`MiniHub`, `EditorialIndex`, `TakeItWithYou`, the page head), each with the
same headings: what it is, when to use, **when not to use**, how it works (with
a live example), accessibility, what we have seen (research or review notes,
honestly labeled), **known gaps**, and a dated change list. Kept in
`docs/patterns/` as Markdown, and rendered at a `noindex` route for James and
for agents to see in the browser.

*Why it works.* LiveWell's rules live in CLAUDE.md, the master plan and code
comments, and every new agent rediscovers them. GOV.UK's "When not to use" is
the line that stops the wrong component appearing in the wrong place (a step
by step on a reading list; an exit button on a page about prayer). It is also
the most James-legible artifact a design system can have: he can read it and
say no.

*On LiveWell.* Begin with the eight components in this file and the study
primitives (`.st-`); a test that every component in `components/` with a
public export has a page.

*Retires:* the scattered component rules in code comments (they stay, pointing
to the page).

*Fit:* strong. *Effort:* M.

### 13. "What's new," monthly and dated, corrections included

*Seen in:* Linear's changelog (dated, benefit first, one image); the NHS
service manual's "Latest updates" by month (Section, Update); Apple's HIG
change logs; MDN's "last modified."

*What it is.* A page `/whats-new`: one short entry per month, newest first, as
a two-column list (where on the site, what changed), including what was
**corrected** and what was **retired**, in plain sentences (for example, "The care page on grief now sorts the signs by how urgent they
are," or a line beginning "Corrected:" that names the page and the fact). No counts, no "trending," no feed beyond the
months; the newsletter's "what's new" paragraph is drawn from it.

*Why it works.* James wants "a very simple clean site that I continue to add
to." A dated record gives a returning reader a reason to look without a
streak, gives a pastor a place to see what is new for his people, and makes
corrections public, which is the trust the skeptic is looking for. Linear's
lesson is that the record itself shows care.

*On LiveWell.* `client/public/whats-new.json`, edited by hand when a PR lands
(a line in the PR template); a small page; the footer links it.

*Retires:* any "Latest" module that would otherwise grow on Home.

*Fit:* strong. *Effort:* S.

### 14. Make this study your group's

*Seen in:* Smithsonian Learning Lab (copy a collection, add notes, questions,
hotspots; private or shared for others to adapt); Are.na (one item in many
channels).

*What it is.* On each of the 68 group study guides, a "Make this your group's"
mode for the leader: choose which sessions, put them in her order, add her own
questions under each and a note to the group, choose the translation the plan
allows, then print or share a link. The copy says at its head "Adapted from
[guide] on LiveWell by your group's leader," and the original never changes.
State lives in the URL (a compact list of choices and the leader's text,
which is not sensitive) or on the device; no account.

*Why it works.* Pastors are the distribution channel (CLAUDE.md), and every
pastor adapts what he is handed. The Learning Lab built its platform on the
fact that teachers will use a curated collection if they can make it theirs.
Making that easy on LiveWell turns a good guide into the one his church uses.

*On LiveWell.* A `GroupGuide` edit mode over the existing guide data; the
print path through `TakeItWithYou`. Long leader text would make long URLs; the
device holds it then, said plainly ("kept on this device").

*Retires:* nothing; it extends the guides.

*Fit:* strong for pastors, maybe overall. *Effort:* L.

### 15. A tombstone for every source, and a rights line for every resource

*Seen in:* The Met's tombstone data and CC0 mark with a public-domain filter;
the Library of Congress's "Free to Use and Reuse" sets with a rights statement
per collection.

*What it is.* Every primary source quoted in the church history course and on
the creeds shelf opens with a fixed block: author, date, place, original
language, the translation used and its status ("public domain," "used by
permission of ..."). Every download, guide and printable carries one rights
line ("Free to print and use in your church; please do not sell it") and
`/downloads` can be filtered to "Free to reproduce."

*Why it works.* It answers the skeptic's sourcing question and the pastor's
copyright question in the same place every time. B's sourcing questions (who
wrote it, why, for whom) are the reader's work; the tombstone is the site's
part, done once.

*On LiveWell.* Fields in the history source manifest the plan already builds
(U07) and in the downloads registry; one small component.
`C-editorial-design.md` pattern 6 ("Reuse, stated plainly") covers the essay
foot; this adds the per-item mark and the filter.

*Retires:* ad hoc source lines.

*Fit:* maybe. *Effort:* S.

### Also considered, not ranked

- **Complete multiple tasks** (GOV.UK task list) for a leader preparing a
  session or a family preparing for Advent. The plain "Completed" in black
  with no color, so what remains draws the eye, is worth keeping in mind; the
  plan's position-not-performance rule already covers the essence.
- **Interruption pages** for anything but the Exit this page explanation.
  GOV.UK's own evidence is that they weaken with use.
- **"Was this page helpful?"** (GOV.UK, MDN). Useful to them; for LiveWell it
  adds a form, storage and moderation for little gain while the readership is
  small. The contact page and the newsletter reply serve.
- **Personalized docs** (Stripe): LiveWell has no accounts; the device-held
  preferences already in the plan (band, translation, place in a plan) are the
  honest version.
- **Fixed citable editions** (SEP): worth it for the history course once it is
  quoted by pastors; for now the honest foot in `C-editorial-design.md` covers
  essays.

---

## 4. What to avoid

Each of these betrays "Unhurried. Weighted. Grown-up." or the integrity rules,
and most are things the organized systems themselves learned not to do.

- **An AI answer box over the library.** MDN put generated explanations on its
  reference pages and paused them within days after an issue about "incorrect
  and misleading" output drew 1,287 upvotes. GOV.UK's careful pilot reached 90%
  accuracy against its own guidance after two years, so one answer in ten was
  still wrong, and partial answers were the main failure. On a site whose rule
  is "verifiable or gone," one wrong answer about Scripture, or about what to do
  in a crisis, costs more than every right one earns. Search, never answers.
- **Shouting about danger.** The NHS: "We want to give essential information and
  reassure people, not to scare them." No red banners, no more than one card
  per urgency level, an emergency card only where the subject calls for it,
  crisis lines quiet and complete rather than loud and everywhere.
- **Promising safety the page cannot give.** GOV.UK says its own exit pattern
  "is not a complete solution." Never label a button "Hide my visit" or imply
  history is erased. LiveWell's current honesty here is right; keep it.
- **Sensitive answers in a link.** Smart Answers moved sensitive flows out of
  the URL so they could be erased. A self-check about a marriage, abuse,
  addiction or suicide never writes its answers into an address that can be
  shared, bookmarked or found in history.
- **Popularity as a signal.** "Most viewed," view counts, "trending,"
  "readers also liked," numbers of saves. GOV.UK can use "Most viewed" because
  it is a utility; for LiveWell it is social proof, and it rewards the hottest
  page over the deepest. Order by the reader's need and by James's curation.
- **Likes, favorites and shares as counts** (Are.na's refusal is the model).
  Saving to My Library stays private and uncounted.
- **Organizing by format or by audience silo.** GOV.UK found no evidence readers
  need it. A "For pastors" page that duplicates what a pastor needs, separate
  from the pages everyone else reads, splits the library; a pastor's way in
  is fine, a pastor's copy is not.
- **Fake freshness.** A "last reviewed" date on a page that was only edited (the
  NHS forbids it), or "updated" stamps bumped by a build. A date means a whole
  review happened.
- **Interruptions and modals.** GOV.UK: interruption pages "get less effective
  the more often users see them." No pop-ups for the newsletter, no "before you
  go," no cookie-wall theatrics beyond what law requires.
- **Writing every page at a reading age of 9.** Right for a crisis card, a start
  panel and a tool; wrong for James's essays and the history course. Plain
  language where the reader is frightened or acting; James's register where
  the reader is thinking. And no readability score as a goal (the NHS does not
  recommend them).
- **Customized one-off versions of a shared component.** GOV.UK will not let a
  prototype restyle the step by step. A care card that looks different on one
  page teaches the reader that it means something different.
- **Looping guides.** GOV.UK: readers "get frustrated when looping back and
  forth between step by steps." One-way links between any two step-by-steps.
- **The "Linear look."** Dark canvas, neon gradients, glows, dense app chrome,
  keyboard-only power features up front. It reads as software, not as a
  serious book in a quiet room.
- **Infinite grids of a huge archive.** The Met can show 450,000 objects;
  LiveWell's strength is a curated shelf and themed sets (the Library of
  Congress's door into its archive is a handful of themed sets, not the
  catalog).
- **Gamified streak pressure, badges, points, completion percentages** (already
  ruled out by the plan; nothing in this cluster argues otherwise, and GOV.UK's
  task list shows that a finished item can be quiet).

---

## 5. What could not be seen

- **No live page or screenshot** of any product: page fetches are blocked.
  Visual descriptions come from code, design-system guidance and secondary
  accounts.
- **GOV.UK's content design manual** in its own words. The "20 to 28% of a
  page," "front-load," and "reading age of 9" claims came through council
  style guides that cite it.
- **The size of the step by step research result** (the "significant increase
  in task completion"), the current number of live step-by-steps, and the GDS
  "Building a better step by step" post itself.
- **The exact GOV.UK taxonomy post** that says there is "no evidence ... users
  need to navigate by audience, or other facets like format"; seen as a search
  excerpt attributed to Inside GOV.UK, URL not shown.
- **NHS.uk's live crisis page wording** ("Where to get urgent help for mental
  health") and how care cards look on the live site.
- **Stripe's live documentation**: the three-column layout and hover sync come
  from third-party teardowns; the personalization mechanism is Stripe's
  description only.
- **Apple's HIG today**: whether per-page change logs shipped and what each page
  is headed; only 2022 coverage was reached.
- **Wikipedia's sticky header and table of contents test findings** (the
  report exists; its findings were not read) and the live NPOV policy text
  (seen through mirrors).
- **How MDN orders its search index** (popularity or otherwise) and the full
  list of feedback reasons.
- **Linear's changelog structure** (headings such as "Improvements" and
  "Fixes" were not confirmed) and the Linear Method's full text.
- **The Met's current collection search and object page** layout after 2016.
- **The Library of Congress's item page** (rights, citation) and the
  structure of its primary source sets.
- **The Smithsonian Learning Lab's current features**; the most detailed guide
  reached is from 2019. A page describing its features on a jsDelivr mirror of
  unclear origin was not relied on.
- **Are.na's interface** for showing where a block is connected, and its
  current subscriber count.
- **Mayo Clinic's current condition template** (only 2013 to 2016 archives were
  seen).
- **The Stanford Encyclopedia's entry anatomy** ("First published,"
  "substantive revision," "How to cite this entry").
- **Chayn's definitions** of its eight principles (the 2025 white paper was not
  opened).
- **LiveWell's own search and visit data** (Search Console, Vercel analytics),
  which should decide which step-by-steps, pins and top tasks come first and
  would outrank every judgment here.

---

## 6. Evidence

### Code and guidance read directly (cloned into the scratchpad `design-src/`)

- `alphagov_govuk-design-system/src/patterns/step-by-step-navigation/index.md`:
  when to use and not; sidebar and standalone forms; "Part of" header link;
  introduction, steps, tasks; "and" and "or" steps; costs; text within a step;
  8 rounds of research; known gaps (header rarely used; looping frustrates);
  live examples including *What to do when someone dies*.
- `.../patterns/exit-a-page-quickly/index.md` and `.../components/exit-this-page/index.md`:
  sensitive subjects listed; button, secondary link, loading overlay; Shift
  three times in five seconds with progress dots; BBC Weather default; avoid
  personalized destinations; interruption page and safety content page
  contents; "not a complete solution"; research with survivors; the warning
  that the button can discourage some users.
- `.../patterns/start-using-a-service/index.md`: "just enough information,"
  button wording, cost and time, what you'll need, other ways to access,
  eligibility inside the service.
- `.../patterns/question-pages/index.md`: one question per page; back link
  because users distrust browser back; "I do not know" as an answer; page
  heading rules.
- `.../patterns/check-answers/index.md`: Change links per answer; return to
  check answers after a change; "Not provided."
- `.../patterns/interruption-pages/index.md`: use sparingly; less effective
  the more often seen; contributed by the NHS.
- `.../patterns/complete-multiple-tasks/index.md`: few statuses as adjectives;
  completed in plain black text; "Cannot start yet"; let the user mark a task
  complete.
- `alphagov_govuk_publishing_components/app/views/govuk_publishing_components/components/docs/step_by_step_nav*.yml`,
  `metadata.yml`, `feedback.yml`, `emergency_banner.yml`, `intervention.yml`,
  and `config/locales/en.yml`: steps collapsed by default per research; full
  expansion without JavaScript; accessibility criteria; strings "Show all
  steps," "Hide all steps," "Part of," "This page is," "Last updated," "See
  all updates," "Is this page useful?," "Report a problem with this page."
- `alphagov_smart-answers/README.md`, `app/flows/register_a_death_flow.rb` and
  its templates, `app/views/smart_answers/shared/_previous_answers.html.erb`,
  `result.html.erb`, `docs/arch/002-store-responses-in-query-string.md`: the
  landing, question and outcome pages; "Your answers" with Change and "Start
  again"; "Information based on your answers" and "Next steps"; outcomes
  `noindex`; sensitive flows kept in the session to support "Leave this site."
- `nhsuk_nhsuk-service-manual/app/views/design-system/patterns/help-users-decide-when-and-where-to-get-care/index.njk`:
  three care card levels; heading as one call to action; hidden urgency text;
  ordering by likelihood and seriousness; no other links in emergency cards;
  concrete language; "reassure people, not to scare them"; tested, and retested
  in 2026.
- `.../patterns/know-that-a-page-is-up-to-date/index.njk`: two dates; placed
  near content after 2018 testing; not for partial edits; clinician sign-off;
  the experimental "Updated" pattern.
- `.../patterns/hub-page/index.njk`, `.../mini-hub/index.njk`,
  `.../a-to-z-page/index.njk`: top task cards (no more than 3), primary and
  secondary cards; mini-hub heading research; A to Z for unsure spellers,
  "A to Z" written out for screen readers.
- `.../content/health-literacy.njk`, `voice-and-tone.njk`,
  `standard-for-creating-health-content.njk`, `.../whats-new/index.njk`: the
  literacy figures; calm, reassuring, no "should"; readability tools only to
  prioritize; the standard's essentials and best practice (review cycle,
  display dates, record sources); updates by month as Section and Update.
- `wikimedia_mediawiki-skins-Vector/i18n/en.json` and
  `resources/skins.vector.search/searchConfig.json`: Contents with
  "Beginning," collapsible subsections, pin and hide; Appearance (Text, Width,
  Color); typeahead shows thumbnail and description.
- `mdn_fred/components/search-modal/element.js`, `recently-visited/`,
  `record-visit/element.js`, `content-feedback/element.js`,
  `curriculum-module/server.js`, `sidebar-filter/element.js`, and
  `l10n/locales/en-US.ftl`: "/" and Ctrl or Cmd with K; selection prefill;
  title index loaded on first open; every word must match; exact boost; ten
  results; breadcrumb per result; "Site search for"; recently visited in
  localStorage; "This page was last modified on ... by MDN contributors"; "Was
  this page helpful to you?" with reasons; Baseline sentences; "In this
  article"; "Previous:" and "Next:" with titles.

### LiveWell files read (for calibration)

- `CLAUDE.md`; `docs/work/plan/benchmark.md`; `docs/work/plan/MASTER-PLAN.md`
  sections 0 to 3; `docs/work/design/research/C-editorial-design.md` (to avoid
  overlap), `A-SYNTHESIS.md` (head), and headings of the other wave files.
- `client/src/lib/siteNav.ts` (doors, Resources links, `SEARCH_SHORTCUTS`);
  `client/src/pages/Help.tsx` (Find Help); `client/src/pages/help/CarePage.tsx`
  (fixed order; "When to get more help" renders one list); `client/public/needs/grief.json`
  and `index.json` (40 needs, 15 high; `reviewed`, `sources` fields);
  `client/src/components/QuickExit.tsx` and `CrisisBlock.tsx`;
  `client/src/lib/siteSearch.ts` (ranking, crisis detection, no synonyms or
  pins); `client/src/lib/telemetry.ts` (slugs and counts only);
  `client/src/pages/ToolsHub.tsx` (28 tools); `client/src/pages/tools/MarriageAssessment.tsx`
  and `EmotionalHealth.tsx` (time, privacy and "not a diagnosis" stated; the
  fear-of-spouse guidance appears on results); `client/src/pages/Resources.tsx`
  (groups by kind); `client/src/App.tsx` (routes; no `/topics` on this branch).

### Web sources (reached through search; what each showed)

**GOV.UK**
- [Design System: Step by step navigation](https://design-system.service.gov.uk/patterns/step-by-step-navigation), [GDS blog: Building a better GOV.UK step by step](https://gds.blog.gov.uk/2018/10/17/building-a-better-gov-uk-step-by-step/): 8 rounds of research; heavy early traffic; a remote study found a significant increase in task completion (search summary).
- [OECD OPSI case study PDF](https://t4.oecd.org/governance/digital-government/toolkit/goodpractices/united-kingdom-p10-step-by-step.pdf): 18 step-by-steps live at the time; collaborative workshops and reusable components.
- [Inside GOV.UK, 2025: simpler topic pages](https://insidegovuk.blog.gov.uk/2025/01/31/rolling-out-simpler-ways-to-navigate-gov-uks-topic-pages): "Popular tasks" renamed "Most viewed" after research.
- [Inside GOV.UK, 2018: using topic pages](https://insidegovuk.blog.gov.uk/2018/11/01/using-topic-pages-to-organise-content-on-gov-uk/): mainstream browse for people who need to "get in, do something, and get out."
- [Inside GOV.UK navigation tag](https://insidegovuk.blog.gov.uk/tag/navigation), [GDS, 2021: plans to improve navigation](https://gds.blog.gov.uk/2021/05/17/our-plans-to-improve-navigation-on-gov-uk): no evidence users need to browse by audience or format (excerpt; exact post not shown); aligning and de-duplicating the two systems.
- [Inside GOV.UK, 2014: how site search works](https://insidegovuk.blog.gov.uk/2014/06/13/how-gov-uk-site-search-works): synonyms for variants, informal terms, former names, acronyms, typos, applied cautiously; a best bets tool.
- [Government Design Principles](https://gov.uk/guidance/government-design-principles): Do less; Design with data; Do the hard work to make it simple; This is for everyone; Be consistent, not uniform.
- [UXmatters, 2016](https://www.uxmatters.com/mt/archives/2016/01/how-focusing-on-user-experience-helped-govuk-win-design-of-the-year.php): GOV.UK won Design of the Year (title).
- [Suffolk County Council: writing for the web](https://www.suffolk.gov.uk/about/our-website-and-social-media/content-guidelines/writing-for-the-website), [Somerset playbook](https://playbook.somerset.gov.uk/digital-inclusion-and-accessibility/creating-accessible-documents/document-language-and-reading-age), [Buckinghamshire](https://www.buckinghamshire.gov.uk/about/design-resources/writing-for-the-buckinghamshire-council-website/plain-english-and-tone-of-voice), [GOV.WALES](https://www.gov.wales/introduction-writing-govwales): secondhand GOV.UK content design (20 to 28% of a page read; front-load; reading age 9, not writing for a 9-year-old).
- [Public Technology, 2024](https://www.publictechnology.net/2024/01/23/uncategorized/were-not-moving-fast-and-breaking-things-chatgpt-powered-gov-uk-chatbot-trials-show-promise-but-uncover-issues-of-accuracy-and-reliability/), [Civil Service World](https://www.civilserviceworld.com/professions/article/govuk-ai-chatbot-achieves-90-accuracy), [The Register, 2026](https://www.theregister.com/2026/03/19/govuk_chatbot_accuracy/), [Government Transformation](https://www.government-transformation.com/data/gds-reports-improved-accuracy-and-user-satisfaction-in-gov.uk-chat-pilots): GOV.UK Chat pilots; usefulness about 70%; accuracy problems; later 90% against guidance; partial answers the main failure.

**NHS**
- [NHS England, 2024: NHS 111 mental health option](https://england.nhs.uk/2024/08/nhs-111-offering-crisis-mental-health-support-for-the-first-time/), [East Lancashire Hospitals](https://elht.nhs.uk/news-and-media/news/nhs-111-offering-crisis-mental-health-support-first-time): 24/7; call for yourself or someone else; 999 still for immediate danger.

**Stripe**
- [Stripe: How Stripe builds interactive docs with Markdoc](https://stripe.com/blog/markdoc): the reader's test key in samples; content tailored by location and features; why Markdoc.
- [Moesif teardown](https://www.moesif.com/blog/best-practices/api-product-management/the-stripe-developer-experience-and-docs-teardown/), [SaaSFrame](https://saasframe.io/examples/documentation-2eeeb): three columns; paragraph highlights code; floating contents; copy buttons (secondary).
- [API Evangelist, 2016](https://apievangelist.com/2016/08/26/going-the-distance-to-help-api-consumers-find-their-api-keys-and-tokens/): demo keys and a prompt to log in.
- [Slab: How Stripe built a writing culture](https://slab.com/blog/stripe-writing-culture), [Mintlify](https://www.mintlify.com/blog/stripe-docs), [First Round Review](https://review.firstround.com/podcast/episode-82): footnoted emails; documentation on the career ladder; performance reviews; office hours (secondary).

**Apple**
- [pxlnv linklog](https://pxlnv.com/linklog/apple-updates-hig/), [MacStories](https://www.macstories.net/news/apple-updates-its-human-interface-guidelines/), [512 Pixels, June 2022](https://512pixels.net/2022/06/new-hig-who-dis/): unified HIG; six categories; visual index; related videos, articles and API docs; change logs promised per page and overall.

**Wikipedia**
- [MediaWiki: Desktop Improvements features](https://www.mediawiki.org/wiki/Reading/Web/Desktop_Improvements/Features/fr), [Updates](https://www.mediawiki.org/wiki/Reading/Web/Desktop_Improvements/Updates/en): limited width (line length over three times recommended; no significant effect on pageviews or edits); search widget +28.9% sessions; sticky header and TOC testing report listed.
- [Manual of Style: Lead section (mirror)](https://www.wikipedia.com/wiki/MOS:LS): summary including prominent controversies; no more than four paragraphs.
- [Neutral point of view (mirror)](https://de.wikipedia.org/wiki/en:WP:NPOV), [Beutler Ink guide](https://www.beutlerink.com/wiki-resources/policy-guides/neutral-pov): due weight; no false parity.

**MDN**
- [MDN: AI Explain postmortem](https://developer.mozilla.org/en-US/blog/ai-explain-postmortem), [The Register, July 2023](https://www.theregister.com/2023/07/06/mozilla_ai_explain_shift/), [InfoQ](https://www.infoq.com/news/2023/08/mozilla-developer-network-ai): issue of June 30 with 1,287 upvotes; "a misstep in fully launching"; the two-rows example.

**Linear**
- [Linear: Startups write changelogs](https://linear.app/blog/startups-write-changelogs): 50+ changelogs in twelve months; shipping as a value.
- [ReleasePad](https://www.releasepad.io/blog/release-notes-examples-how-10-top-saas-companies-communicate-product-updates/), [Indie Hackers](https://www.indiehackers.com/post/do-you-maintain-release-notes-changelog-for-your-saas-f3c758e0c0): a page per release with image and benefit headline; weekly in 2020 (secondary).
- [Linear: How we redesigned the Linear UI](https://linear.app/blog/how-we-redesigned-the-linear-ui), [Linear changelog, 2024-03-20](https://linear.app/changelog/2024-03-20-new-linear-ui), [Plushcap summary](https://www.plushcap.com/content/linear/blog/linear-how-we-redesigned-the-linear-ui-part-ii): less visual noise in sidebar, tabs, headers, panels; theme generator; LCH (secondary).
- [Linear Method docs](https://linear.app/docs/linear-method), [Write issues, not user stories](https://linear.app/method/write-issues-not-user-stories): title, team and status only; plain-language issues.

**The Met**
- [Introducing Open Access at The Met](https://www.metmuseum.org/perspectives/open-access-at-the-met): CC0 images; public-domain filter; CC0 mark on object pages; tombstone data on GitHub; 375,000+ images.
- [How Does The Met Maintain Half a Million Web Pages](https://www.metmuseum.org/perspectives/met-collection-api): 450,000+ object pages updated nightly; Collection Product Development team; collection API.
- [Met press release, 2011](https://www.metmuseum.org/press/news/2011/website-press-release), [Cogapp](https://www.cogapp.com/work/metropolitan-museum-of-art), [Welcome to our newly designed website](https://www.metmuseum.org/perspectives/welcome-to-our-newly-designed-website): 2011 relaunch (340,000 works); 2016 refresh.

**Library of Congress**
- [LoC blog, 2018: Free to Use and Reuse](https://blogs.loc.gov/loc/2018/02/free-to-use-and-reuse-making-public-domain-and-rights-clear-content-easier-to-find/), [Legal Genealogist](https://www.legalgenealogist.com/?p=15893): themed sets; public domain, no known copyright, or cleared; each collection's rights statement.
- [MTSU Teaching with Primary Sources worksheets](https://library.mtsu.edu/tps/tools/worksheets), [Emerging America](https://www.emergingamerica.org/taxonomy/term/130?page=2): Observe, Reflect, Question; no fixed order; teacher's guides by media type (secondary).

**Smithsonian Learning Lab**
- [Common Sense Education review](https://www.commonsense.org/education/reviews/smithsonian-learning-lab), [Smithsonian release](https://dashboard.si.edu/newsdesk/releases/smithsonian-releases-learning-lab-everyone-discover-and-use-digital-museum-resources), [Getting Started Guide, 2019](https://learninglab.si.edu/cabinet/file/852aad3f-dd43-4748-a5c8-9adb5358d384/20190918_SLL_GettingStartedGuide.pdf), [Campus Technology, 2016](https://campustechnology.com/articles/2016/06/20/smithsonian-launches-learning-lab-to-create-share-resource-collections.aspx): notes, tags, hotspots, quizzes, discussion questions, sorting; private or shared to adapt; embed and link; dashboards need a tutorial.
- [California Educators Together: Project Zero routines](https://www.caeducatorstogether.org/resources/208644/project-zero-thinking-routines): See, Think, Wonder and other routines used in collections.

**Are.na**
- [Wikipedia: Are.na](https://en.wikipedia.org/wiki/Are.na): blocks in many channels; channels connect; ad-free; forgoes likes, favorites, shares.
- [Upstatement interview](https://upstatement.com/blog/interview-with-charles-broskoski), [Public Infrastructure podcast](https://publicinfrastructure.org/podcast/40-arena), [Jackson Dahl](https://jdahl.substack.com/p/cab): collect without ads or recommendations; channel as folder; subscription and no algorithm.

**Mayo Clinic**
- [Mayo Clinic Health Information Policy](https://www.mayoclinic.org/about-this-site/health-information-policy), [Health Education Policy](https://www.mayoclinic.org/about-this-site/health-education-policy): standard process; 100+ medical editors; disclosures with content; no bylines; verification of statistics; review at least every two years.
- [Archived condition pages (court filings)](https://www.lb7.uscourts.gov/documents/3-12-CV-491.9.pdf), [Symptoms index](https://www.mayoclinic.org/symptoms/index?letter=E): shared section sequence including "Preparing for your appointment"; "When to see a doctor" under symptoms; index by letter.

**Added**
- [SEP archive information page](https://plato.stanford.edu/archives/sum2003/info.html), [UC Davis guide](https://guides.library.ucdavis.edu/philosophy/reference-sources): dynamic reference work since September 1995; refereed; quarterly fixed editions for citation.
- [Canonical: Diátaxis](https://canonical.com/blog/diataxis-a-new-foundation-for-canonical-documentation), [EBRAINS handbook](https://handbook.ebrains.eu/about-handbook/documentation-framework/), [Medium summary](https://medium.com/@techwritershub/how-to-structure-documentation-using-the-diataxis-framework-70d4a5a61db7): four kinds kept distinct; the compass.
- [Catalyst / Promo Cymru: trauma-informed principles](https://promo.cymru/?p=18736), [Chayn blog](https://blog.chayn.co/trauma-informed-design-understanding-trauma-and-healing-f289d281495c), [Chayn research](https://org.chayn.co/research): the eight principles; trust and safety ahead of aesthetics; applied to content writing; 2025 white paper.
- [Calm Tech Institute principles](https://calmtech.institute/calm-tech-principles), [Wikipedia: Calm technology](https://en.wikipedia.org/wiki/Calm_technology): "informs but doesn't demand our focus"; smallest possible amount of attention; inform and create calm.
