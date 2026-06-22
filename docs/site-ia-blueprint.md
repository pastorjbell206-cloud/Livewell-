# Site IA Unification Blueprint — FOR APPROVAL BEFORE IMPLEMENTATION

Nothing in this document has been implemented. It resolves the four structural
problems James named: the double meaning of "Resources," the inconsistent tool
URLs, the header/footer taxonomy mismatch, and the three overlapping ways of
slicing content.

## 1. One canonical taxonomy: the five pillars

The five pillars are the spine. Everything else is a *facet* of a pillar, not
a parallel taxonomy:

| Pillar | Canonical hub | Absorbs |
|---|---|---|
| Theological Depth | /theology | doctrine, history, questions, traditions |
| Prophetic Justice | /justice | — |
| Prophetic Disruption | /disruption | diagnosis themes (below) |
| Leadership Formation | /leadership | formation, library, sermon series, inventory, pastors content |
| Integrated Life | /life | family, marriage, parenting, discipleship pathway |

**Diagnosis themes** (After Christendom, Reading Scripture Past Our Politics,
Capture by Right/Left, The Pastoral Angle) stop being a sibling taxonomy and
become labeled *series within pillars* (`?series=` facets on /writing), shown
as series chips on pillar listing pages. No URLs change for essays.

## 2. "Resources" gets one meaning

- **/resources stays the Resource Hub** (it is one now: context library,
  libraries, downloads). It is the only thing called "Resources."
- The footer's For Pastors column renames its `/resources` link from "Sermon
  Resources" to "Downloads & Study Guides" — same destination, no ambiguity.
- The footer column currently titled "Resources" is renamed **"Libraries &
  Tools"** so the word appears exactly once in the navigation.

## 3. One tool namespace: /tools/*

Moves (all with permanent redirects in vercel.json, zero broken links):

| Old | New |
|---|---|
| /quiz | /tools/theology-quiz |
| (alias kept) /leadership/inventory | also listed in /tools |
| (alias kept) /life/assessment | also listed in /tools |

/tools becomes the single tool directory listing every interactive tool with
its pillar tag. Deep-hub tools keep their hub URLs (they belong to their hubs)
but are *listed* in /tools, so there is one place to find everything.

## 4. Header and footer share one model

**Header (unchanged structure):** the five pillar dropdowns + Books + About.
Each pillar dropdown leads with its canonical hub (already true for four;
Integrated Life's dropdown gains "The Integrated Life Hub" → /life).

**Footer (reorganized to mirror the header):**
1. The Five Pillars — one link per pillar hub
2. Write & Read — Writing, Books, Reading Paths, Start Here
3. Libraries & Tools — Resource Hub, Reading Scripture in Context,
   Leadership Library, Sermon Series, All Tools, Discipleship Pathway
4. For Pastors — PCN, Leadership Hub, Downloads & Study Guides
5. Connect — About, Membership, Substack, Contact

Same five-column shape it has today; only labels and grouping change.

## 5. Implementation plan (after approval)

1. vercel.json redirects (/quiz → /tools/theology-quiz).
2. ToolsHub: add the full tool registry with pillar tags.
3. Footer relabel/regroup; Integrated Life dropdown hub entry.
4. Writing page: diagnosis themes rendered as series chips under their pillar.
5. Sitemap regenerated; no essay/book/guide URL changes anywhere.

Risk: low. No content moves; one route moves (with redirect); everything else
is labeling and grouping.
