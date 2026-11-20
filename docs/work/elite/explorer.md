# Bible Explorer: the pilot, and the plan for the rest

James asked (2026-11-19) for a way to explain the whole Bible to young people aged 7 to 16 through pictures: the overarching story, the core doctrines, why Christians believe what they believe, something to click on and work through. This is the pilot of that room, at `/study/explorer`. The drawings, wording and structure are the site's own, in the engraved hand of the art kit; nothing is modelled on another ministry's videos, diagrams or scripts.

## What is built

- **The map** (`/study/explorer`): one road drawn down the page, from the garden to the city, with a roundel for each of thirteen stops. Every stop is named, placed and summed up in one line at both reading levels, so the whole arc can be read end to end today. A finished stop opens its own page; a stop still being drawn says so and has no link.
- **All thirteen stops finished** (four in the pilot, three added on 2026-11-19, six more on 2026-11-20), each with a drawn scene, the story at both levels, "What this shows us about God", one or two verses quoted exactly from the BSB (each opens the site's verse panel), "Read it yourself" (Study Bible chapters), and one activity:
  - `/study/explorer/creation`: tap the picture to find the seven days.
  - `/study/explorer/abraham`: match each of God's three promises to where the Bible shows it kept.
  - `/study/explorer/rescue`: put four events of the rescue in order.
  - `/study/explorer/cross`: think, then look (four questions, each answer behind its own button).
  - `/study/explorer/fall`: "What broke", tap the picture to find four broken relationships (with God, with each other, with ourselves, with the ground), each with its place in Genesis 3 and a line on how God begins to mend it.
  - `/study/explorer/sinai`: "Walk into the tent", eight numbered marks on a plan of the tabernacle, from the gate of the courtyard to the ark, taken with Next (or tapped); each says what the part was and where the Bible takes it up.
  - `/study/explorer/land`: "Round and round", the judges' cycle as a wheel stepped round with Next, round again, ending with why the story needs a better king.
  - `/study/explorer/kingdom`: "What makes a good king?", five moments from the stories of Saul, David and Solomon; for each the reader taps "He trusted God" or "He grabbed for himself" and sees what the Bible says and the verse; it ends on the promise of a king who will not fail (2 Samuel 7:16; Luke 1:32-33).
  - `/study/explorer/exile`: "Promises in the dark", four promises from Jeremiah, Ezekiel and Isaiah matched to where the New Testament takes each up (Luke 22:20; Acts 2:1-4; Acts 8:32-35; Luke 1:32-33).
  - `/study/explorer/jesus`: "Who is this?", five things Jesus did by the Sea of Galilee in Mark's order, marked on the picture and taken with Next (or tapped); each says what he did, what people said, and who the Gospel says he is, ending on Peter's answer and handing on to the Cross.
  - `/study/explorer/return`: "From the decree to the voice in the wilderness", five events put in order (Cyrus's decree, the temple finished, Nehemiah's wall, the first Hanukkah, John the Baptist); each shows its date and one line once it is in place.
  - `/study/explorer/church`: "Out to the ends of the earth", Acts 1:8 as three faint rings on the picture and five numbered places walked with Next (the upper room, Samaria, the desert road, Caesarea, Antioch and the ship); each says what happened there and which ring it is.
  - `/study/explorer/new-creation`: "The end of the road is the beginning, made new", four pictures from Genesis 2 and 3 (the guarded tree of life, the river, God walking in the garden, the curse) matched to what Revelation 21 and 22 say of each. Its foot leads to the whole map and to "Why we believe".
- **Two reading levels**, "Ages 7 to 11" and "Ages 12 to 16" (the Family door's younger and older bands, `lib/familyTable.ts`), one tap, kept on the device. The older level adds the why, an honest hard question with its answer, and links to go deeper (Honest Answers, context guides).
- **Two threads**, lit across the whole map, each with one line and its verse at each of the thirteen stops. "God with his people": a solid line where God lives among his people, a broken line where the closeness is lost or waited for (the fall, the exile, the return). "The king" (2026-11-20): solid where God's rule is shown or his king is on the throne (creation, the sea, Sinai, David, Jesus, the cross, the right hand, the throne in the city), broken where the king is promised or the throne stands empty (the fall, Abraham, the judges, the exile, the return). A thread now names its own states in its key, and `broken` lists the states drawn broken (default "apart"), so the first thread renders exactly as before. Three more threads are named as coming.
- **"Why we believe"**: two finished cards (The Bible; Jesus, God and man) with a picture, a plain statement at both levels, a quoted verse, the passages it rests on, a question people ask, the stops that teach it, and the family catechism questions that say the same. Eight more are named as coming, without links.
- **Progress** on the device (`livewell-progress-explorer-v1`, through `lib/storage.ts`): stops visited, activities done, the level, and "You are here" on the map. No account, no API procedure.

## The stops, and why there are thirteen

The site's Bible's Story (`/study/bible/story`, the eleven acts in `client/public/theology/biblical-theology-storyline.json`) is the spine; every stop is filed under one act, and the map shows the act's name. Two acts are split into two stops each, because a young reader needs them as places of their own:

- **Act Four (Exodus and Sinai)** becomes *The Rescue from Egypt* and *Sinai and the Tent*: the rescue and the law are two different lessons, and the tabernacle is where the thread of God dwelling with his people turns.
- **Act Nine (Christ, the Center)** becomes *Jesus Comes* and *The Cross and the Empty Tomb*, as the brief asked: the cross and the resurrection need a stop of their own.

| # | Stop | Act | Status |
|---|---|---|---|
| 1 | Creation | One | finished |
| 2 | The Fall | Two | finished |
| 3 | Abraham and the Promise | Three | finished |
| 4 | The Rescue from Egypt | Four (added split) | finished |
| 5 | Sinai and the Tent | Four (added split) | finished |
| 6 | The Land and the Judges | Five | finished |
| 7 | The Kingdom | Six | finished |
| 8 | The Prophets and Exile | Seven | finished |
| 9 | The Return and the Waiting | Eight ("the Silence" in the storyline; "the Waiting" for a child) | finished |
| 10 | Jesus Comes | Nine (added split) | finished |
| 11 | The Cross and the Empty Tomb | Nine (added split) | finished |
| 12 | The Church and the Spirit | Ten | finished |
| 13 | The New Creation | Eleven | finished |

## The plan the stops were drawn from (all finished; kept as the record of each stop's first idea)

Each needs: a scene (an 800 by 600 drawing in `client/src/pages/explorer/scenes/`, one line in `SCENES` in `parts.tsx`), the story at both levels, God, one or two verses, chapters, an older-level question with its answer and deeper links, a talk prompt, a care line where it touches death, fear or guilt, and one activity. All of it is data in `client/public/explorer/stops/<slug>.json`; only the drawing is code.

| Stop | Scene idea (what a child learns by looking) | Activity | Verses (BSB) | Threads |
|---|---|---|---|---|
| The Fall | The garden at its edge: the tree, the two hiding among the trees, garments of skin on a branch, the closed way east with the flaming sword; outside, thorns in the ground | Tap the picture: hiding, the garments God made, the thorns, the guarded way (Genesis 3:8, 21, 18, 24). Older: the promise in 3:15 | Genesis 3:8; 3:15 | God with his people (apart); the lamb (garments, 3:21); the promise (3:15) |
| Sinai and the Tent | The camp round the tabernacle, tribes in their places, the cloud over the tent, the mountain behind | Tap the picture: the ark, the lampstand, the altar, the curtain, the cloud; each with what it taught | Exodus 20:2-3; Exodus 25:8 | God with his people; the promise (covenant at Sinai); the lamb (the altar) |
| The Land and the Judges | A hill country of terraces and villages, the tent at Shiloh, a threshing floor (Ruth) | Put in order: the cycle of the judges (turn away, trouble, cry out, a judge, peace) as a loop the reader completes | Judges 2:18; Ruth 1:16 | God with his people; the king ("no king in Israel", Judges 21:25); every nation (Ruth the Moabite) |
| The Kingdom | Jerusalem with the temple on its hill, a shepherd's sling and harp in the foreground | Match: a king to what he did (Saul, David, Solomon); older: the promise to David | 2 Samuel 7:16; 1 Kings 8:10-11 | God with his people; the king; the promise |
| The Prophets and Exile | A broken city wall and a road east; by a river, harps hung on the willows | Think, then look: why the prophets spoke, what the new covenant promised (Jeremiah 31:31-33) | Jeremiah 31:33; Psalm 137:1 | God with his people (apart); the promise; the king |
| The Return and the Waiting | Builders on the wall with a trowel and a sword (Nehemiah 4:17), a small temple, a lamp in a window | Put in order: return, altar, temple finished, walls rebuilt | Nehemiah 8:8; Malachi 3:1 | God with his people (waiting); the king (no son of David on the throne) |
| Jesus Comes | Galilee: a fishing boat, nets, a hillside crowd, a jar of water turned to wine | Tap the picture: signs and what each showed about who Jesus is | John 1:14; Mark 4:41 | God with his people; the king; every nation |
| The Church and the Spirit | Flames over many people of many lands in a Jerusalem street; roads out to the cities of Paul's letters | Match: a place to who heard the news there (Jerusalem, Samaria, Rome) from Acts 1:8 | Acts 1:8; Acts 2:4 | God with his people; every nation; the promise (new covenant) |
| The New Creation | The city with the river and the tree of life on both banks, open gates, no lamp needed | Think, then look: what is gone (tears, death, pain) and what is there (God with his people). Older: Christians read Revelation's pictures in different ways; what all confess together | Revelation 21:3-4; 22:1-2 | God with his people (the end of the thread); every nation (7:9) |

## The threads still to light

Each is data in `threads.json` (`status: "finished"`, a key naming its own states, `broken` for the states drawn as a broken line, a line and a verse at each stop it runs through). **The king** is finished (2026-11-20). Still to light: **The promise** (Noah, Abraham, Sinai, David, the new covenant); **The lamb** (garments, Isaac and the ram, Passover, the altar, Isaiah 53, the Lamb of God, the Lamb on the throne); **The king** (Adam's rule, the judges' "no king", David, the exile's lost throne, Jesus the son of David, the throne in the city); **A blessing for every nation** (Babel, Abraham, Rahab and Ruth, Jonah, the wise men, Pentecost, every tribe and tongue).

## The cards still to write

God (one God, Father, Son and Spirit); People made in God's image; Sin; The cross; The resurrection; The Holy Spirit; The church (with baptism and the Supper: what all Christians share, and that churches differ); The life to come (with the end times: what all confess, and that churches differ). Each follows the catechism (`client/public/family-catechism.json`) and the confessional floor in CLAUDE.md, and links the catechism question that words it.

## What to add next

1. ~~The nine stops above~~ (finished 2026-11-20).
2. **How the Bible fits together**: one picture of the 66 books as a library on shelves (Law, History, Wisdom, Prophets, Gospels, Acts, Letters, Revelation), tap a shelf, see where its books sit on the map.
3. **A timeline strip** under the map, with the few dates the site already holds (`client/public/bible/story.json`), shown only at the older level.
4. **Printable pages**: one sheet per stop (the drawing in outline to colour, the story at the younger level, the activity on paper), built like the existing PDFs (`scripts/build-pdfs.mjs`).
5. **A parent and youth-leader guide**: a page with a six-week or thirteen-week plan through the stops, questions for a group, and how to handle the hard stops.

## James's further direction (2026-11-19): six kinds of interactive picture

> "I want you to continue the Bible Explorer and develop that, and like interactive maps with like people could look at the missionary journeys of Paul and see where he traveled, and like interactive maps of churches being planted, interactive themes of the Bible, like the Holy Spirit ... interactive maps or images or illustrations that show how the book works, the Bible works, how salvation works ... make it simple for people to be able to click this and read through the Bible and understand it." And: "finish the bible project to help teenagers understand what they belive and something that will keep there attention as the study the bible".

The pilot is not widened; these are planned so the pilot's shapes do not block them. Each is its own room inside the Explorer (`/study/explorer/<room>`), its own data file in `client/public/explorer/`, built from the same parts: the level switch and progress (`lib/explorer.ts`, one storage key), `PlateFrame` and the engraved hand, `VerseRef`/`RefText`, and the activity kinds in `pages/explorer/parts.tsx`. Every one is drawn in the site's hand; none borrows another ministry's look, diagrams or wording.

### 1. Paul's travels (an interactive map)

The site already has the frame and the places: the "mediterranean" frame in `client/src/pages/study-bible/BookMap.tsx` (`MAP_FRAMES` in `lib/bible-notes.ts`) and 24 checked places with cards in `client/public/bible/notes/acts/intro.json` (`teaching.map[1]`, "Paul's travels and the road to Rome"), with their ledger in `docs/work/elite/wmap-ledger.md`. What a stepper adds:

- **Data** `client/public/explorer/travels.json`: trips, each an ordered list of steps `{ place: <id from intro.json>, refs: ["Acts 13:4-5"], younger, older, by: "sea" | "land" }`. Places are referenced by id, never copied, so a card is checked once.
- **Route lines**: BookMap draws marks and labels but no routes. Add an optional `route` layer: a path through the step points in the frame's own projection, sea legs dashed, land legs solid, the walked part inked and the rest faint. Where the way between two towns is not known, a straight dotted line and a note saying so; no invented roads.
- **The stepper**: "Previous" and "Next" buttons (44px), a step counter ("Step 4 of 11"), the current town ringed, its card below with what happened there and the Acts reference opening the verse panel; arrow keys move too; the trip chooser is a set of radio buttons (first trip, second, third, the road to Rome). The map is a picture, the stepper is the control, so a keyboard or screen reader reader follows the steps as a list.
- **Wording**: the forbidden-word gate rejects "journeys" even in "missionary journeys" (checked: `forbiddenRe` matches it; only "journey to Jerusalem" is set aside). So the room is called **Paul's travels**, and the trips "Paul's first trip" and so on. If James wants the searched-for phrase used once, it needs an entry in `ALLOWED` in `scripts/lib/forbidden-language.mjs`, his call.
- Reuses: BookMap's frame and projection, `intro.json` places, `VerseRef`, the order activity's button pattern.

### 2. Churches being planted (the same map, over time)

- **Data** `client/public/explorer/churches.json`: one entry per church (Jerusalem, Samaria, Antioch, the Galatian towns, Philippi, Thessalonica, Corinth, Ephesus, Rome), each with its place id, the Acts reference where it begins, a `when` taken only from the Acts book page's timeline (`intro.json` `teaching.timeline`, "about" or "disputed" carried over word for word where it says so), and the letters written to it (Galatians, Philippians, 1 and 2 Thessalonians, 1 and 2 Corinthians, Ephesians, Romans), each linking its Study Bible book page.
- **The picture**: the mediterranean frame with a slider of steps in time (buttons, not a drag): at each step the churches begun so far are marked, the newest ringed; a letter icon beside a church that received one. A second view, "Letters to churches", lists the letters and lights their church.
- Reuses: BookMap, the timeline already on the Acts page, the thread "lit" pattern from the map.

### 3. Themes through the whole Bible (the Holy Spirit first)

The thread shape in `threads.json` already holds this: a theme is a thread with a line and a verse at each stop. Two changes, both small:

- Let a thread's `state` be one of a short set named by the thread (the dwelling thread uses near and apart; the Spirit could use "promised", "comes on a few", "poured on all"), with the key in the data. The validator's fixed list (`near`, `apart`) becomes "a state the thread's key names".
- A theme's own page, `/study/explorer/themes/<id>`: the map's road redrawn short, only the lit stops, each with its line, its verse, and a small picture.

**The Holy Spirit**, as James named it: hovering over the waters (Genesis 1:2); on the judges (Judges 6:34), on Saul and David (1 Samuel 16:13), on the prophets (2 Peter 1:21); the promise of a new heart and spirit (Ezekiel 36:26-27) and of the Spirit poured on all people (Joel 2:28); at Jesus' baptism (Mark 1:10); at Pentecost (Acts 2:4); living in the believer and the church (Romans 8:9-11; 1 Corinthians 3:16); the Spirit and the bride in the last chapter (Revelation 22:17). On the gifts today: state what all Christians confess (the Spirit is God, gives new life, lives in every believer, gives gifts to build up the church), and say plainly that churches differ on whether some gifts (tongues, prophecy, healing) continue as in Acts; take no side. Then the promise, the lamb, the king and every nation, as listed above.

### 4. How the Bible works (the 66 books as a library)

- **The picture**: a bookcase drawn in the hand, two cases (Old and New Testaments), shelves by kind of writing (Law, History, Wisdom and Poetry, Prophets; Gospels, Acts, Letters, Revelation). Tap a shelf: what that kind of writing is and how to read it (linking the Study Bible's guides to reading each kind, `/study/bible/guides`). Tap a book: one line, who wrote it and when in broad honest strokes (from the site's book introductions, with "traditionally" and "debated" kept where they say so), and where it sits on the Explorer's map.
- **How we got it**: a second, short strip of pictures: spoken and written down, copied by hand, gathered and recognized, translated; linking the site's pages on the canon and on translations (`client/public/theology/ot-canon.json`, `nt-canon.json`, `translations.json`).
- **Data** `client/public/explorer/library.json`, built from `client/public/bible/books.json` and the book introductions by `build-explorer-index.mjs`, so it never drifts. Activity: "Find the shelf" (match a book to its kind of writing).
- Reuses: `books.json`, the guides, the match activity, the shelf idea of Home's `BibleShelf`.

### 5. How salvation works (one careful interactive picture)

- **The picture**: one engraved panel in seven scenes along a single line: made for God (creation), turned away (sin), God comes (Jesus), the cross, the empty tomb, trusting him (faith and turning), new life now and the life to come. Tap a scene: one plain sentence at each level, the verse it rests on (Genesis 1:27; Romans 3:23; John 1:14; Romans 5:8; 1 Corinthians 15:3-4; Ephesians 2:8-9; Revelation 21:3-4), and the catechism question that says the same (questions 14 to 40).
- **What it states** is what the creeds and all Christians confess (CLAUDE.md's confessional floor). **Where churches differ**, a quiet "Where Christians differ" note says so plainly and takes no side: baptism (who and how), how God's choosing and our choosing fit (linking the Honest Answer that lays out both), whether salvation can be lost (linking that Honest Answer).
- **No pressure**: no prayer to repeat, no button to "decide", no urgency. The end is an invitation to wonder and to talk with a parent, a pastor or a leader, with Find Help visible.
- Reuses: the scene frame, the reveal activity, `VerseRef`, the catechism anchors.

### 6. Simplicity: Next, all the way through

A young reader must be able to start at the first stop and tap "Next" to the last without being lost. How the design holds that:

- **One order.** Every stop has a number (1 to 13) and one "Next stop" and "Previous stop" at the foot, in the map's order, always in the same place; the stop's head says "Stop 4 of 13". Today, while stops are still being drawn, "Next" skips to the next finished stop (a stop being drawn has no link); when all thirteen are drawn, Next walks every stop. A test will hold that the chain from stop 1 reaches stop 13.
- **One way home.** Every page in the Explorer has "The whole map" and the "Bible Explorer" label at the top, both to the map, and the map marks "You are here".
- **One place kept.** The map and "Continue where you left off" read `last` from the one progress key.
- **The other rooms hang off the road, not beside it.** Paul's travels opens from the Church and the Spirit stop; the library and salvation pictures open from the map's foot and from the stops that teach them; each has "Back to the road" and returns to the stop it was opened from.

### The order to build, and what each needs

1. Finish the remaining nine stops, two at a time (the road is the spine; everything else hangs off it), with the Next chain test: about nine to eleven days.
2. How salvation works: about three days (one long drawing, careful wording, James reads it first).
3. Paul's travels: about four days (route layer in BookMap, the stepper, the trips' data and ledger).
4. The Holy Spirit theme, with the thread-state change: about two days; each further theme about a day.
5. How the Bible works (the library): about three days.
6. Churches being planted: about two days once Paul's travels exists.
7. The eight remaining cards: about three days. Printable pages and a parent or leader guide after that.

In all, about six weeks for one person working steadily, more if James wants to read each room before the next begins.

## An honest estimate

Each further stop is about a day of careful work: half a day to draw a scene that teaches and reads at a phone's width (and to check it by day and night), a few hours to write both levels and the question and check every verse and claim into the ledger, and an hour for the activity and its test. Nine stops: about nine to eleven days. Each further thread: about half a day (lines, verses, a look at the map). The eight cards: about three days. The 66-books picture and the printable pages: two to three days each. The parent guide: one to two days. In all, roughly four weeks for one person working steadily, with James reading samples as each pair of stops lands.

## The room question for James

The Bible door already lists six rooms (`client/src/lib/siteCatalog.ts`), so Bible Explorer is not a seventh. It is listed inside "The Bible's story" room (so it appears on "Everything on LiveWell" and in search), with a line on the Bible door's page (`/study`) and on the Family door's page (`/family`). If James wants it in the Bible door's menu, the suggestion is that it take the place of **Search the Bible**, which is already offered from the Study Bible's front page and from every chapter, so it would lose the least by moving one tap in.

## Questions only James can answer

1. Is "Bible Explorer" the name he wants, everywhere?
2. Should it be a room in the Bible door's menu (taking Search the Bible's place, or another), or stay one tap inside?
3. The two levels are "Ages 7 to 11" and "Ages 12 to 16", as he said. The Family door's devotions say "about 4 to 10" and "about 11 to 17". Should the two be brought into line?
4. Is he content with the one sentence at the older level of Creation that says Christians read the days of Genesis 1 differently, with the link to the Honest Answer?
5. Which stops should come next, in what order?

## What was run for the second three (2026-11-19)

- `pnpm check` clean; ESLint on every changed file clean.
- All 38 commands of the content-gates step in `.github/workflows/ci.yml`: exit 0.
- `pnpm test`: 147 files passed, 7 skipped (1,698 tests passed, 73 skipped); the Explorer file has 19 tests (each new activity's contract, Next through every finished stop in order, no link to a stop being drawn).
- `pnpm build`, sitemap, prerender (7 Explorer stop pages), `audit:canonicals`: every audited page canonicalises to itself.
- On the served build (port 4622): every new activity completed by touch (phone emulation) and by keyboard alone; the map links all three; no console errors; no sideways scroll at 390 or 1440, day and night, both levels.
- Lighthouse on `/study/explorer/sinai` (median of three): performance 92, accessibility 100, best practices 96, SEO 100, CLS 0.000.
- Screenshots in `/home/user/elite-shots/explorer/`; `fall-390.png`, `sinai-390.png`, `land-390.png` in `docs/work/elite/explorer-shots/`.

## What was run (2026-11-19)

- `pnpm check`: clean. ESLint on every changed file: clean.
- Every command of the content-gates step in `.github/workflows/ci.yml`, including the new `node scripts/build-explorer-index.mjs --check` and `node scripts/validate-explorer.mjs`: all exit 0.
- `pnpm test`: 147 files passed, 7 skipped (1,693 tests passed, 73 skipped), including the 14 new Explorer tests, the route smoke net, site-structure and the catalogue tests.
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (4 Explorer stop pages written; the map's head extracted from its SEOMeta), `pnpm run audit:canonicals`: every audited page canonicalises to itself.
- On the served build (`scripts/serve-like-vercel.mjs`, port 4621): every activity completed by touch (phone emulation) and by keyboard alone; the level kept across a reload; the thread lit at 13 stops by tap and by Enter; "You are here" after a reload; no sideways scroll at 390 or 1440; no console errors.
- Lighthouse (`scripts/lighthouse-median.mjs`, three runs, median): `/study/explorer` performance 90, accessibility 100, best practices 96, SEO 100, CLS 0.000; `/study/explorer/rescue` performance 90, accessibility 100, best practices 96, SEO 100, CLS 0.000.
- Screenshots: `/home/user/elite-shots/explorer/` (every finished stop at 390 and 1440, day and night, both levels); six chosen ones in `docs/work/elite/explorer-shots/`.

## The second three (2026-11-19): the Fall, Sinai and the Tent, the Land and the Judges

- **Shared code changed only where a stop needed it.** The tap activity takes an optional `label` (shown in place of "Day N"), `mend` and `mendRef` per spot, and an optional `finish` line (Creation keeps its own sentence by default). Two new activity kinds in `parts.tsx`: `walk` (numbered marks on the picture, Back a step and Next, the picture is the activity as with tap) and `cycle` (a ring of stages in an ordered list, Next round, then "round again", then where it leads). `validate-explorer.mjs` checks both shapes. The four pilot stops render as before (compared by screenshot).
- **Wording on the hard places.** The Fall's older level says Christians read some of Genesis 3 differently and names what all confess; no position on a historical Adam's details or the flood's extent. Sinai says at both levels that the law comes after the rescue (Exodus 20:2 before 20:3); on the law for Christians it states what all share and names three ways churches explain it, without a side, and speaks of Jewish practice with respect. The Land's conquest is told briefly with no celebration; the older question reuses the Honest Answer's own sentences and links it. Care lines on the Fall and the Land.
- **The thread** "God with his people" at Sinai was already right (the tent so that he could dwell among them) and was left as it was.
- **Ranges** now read "Exodus 19 to 40, and Leviticus" (Sinai) and "Numbers to Ruth" (the Land), as the stops tell them.

## The third three (2026-11-20): the Kingdom, the Prophets and Exile, Jesus Comes

- **Next now runs unbroken from Creation to the Cross**: Creation, the Fall, Abraham, the Rescue, Sinai, the Land, the Kingdom, the Exile, (the Return, still being drawn, is skipped) Jesus Comes, the Cross. The Explorer test names that chain.
- **One new activity kind, `choose`** (the Kingdom): a moment at a time, two buttons with `aria-pressed`, the Bible's answer and its verse under them in a polite live region; a choice can be changed; every moment answered is done, and then the end card appears. Validator support (both answers present, each moment's reference readable) and a test. The Exile reuses `match` and Jesus Comes reuses `walk`; each kind took optional wording (`finish` for match; `intro`, `laterLabel`, `restart` and a per-step `asked`/`askedRef` for walk), so Abraham and Sinai read exactly as before (re-shot and compared).
- **Why match for the Exile, not the timeline.** The five dates are in the story; the match teaches the thing the stop is for, that the promises made in the dark are taken up in the New Testament, and each pairing is checked in the BSB.
- **The scenes.** Kingdom: Jerusalem on its hill, the temple going up (two pillars, an unfinished side with a ladder, cut stones and cedar beams), sheep on the slope, a shepherd's staff with the crown hung on its crook (the mustard mark), a harp against a rock. Exile: a river in Babylon, two exiles sitting with heads bowed under a willow with two harps hung in it, Jerusalem's broken walls on the far horizon, a cut stump with one green shoot (the mustard mark). Jesus Comes: the Sea of Galilee gathering what Mark tells there (the teacher in the boat with no face, the crowd on the beach, the sower on the slope, the house in Capernaum with its opened roof, the man walking home with his mat, Levi's booth, the wind rising on the lake), the sun rising over the far hills (the mustard mark, Matthew 4:16).
- **Wording on the hard places.** David's sin is told plainly at both levels with the guilt on David (“the thing that David had done was evil in the sight of the LORD”), nothing that shifts it to Bathsheba, forgiveness and lasting harm both stated, and a care line. Isaiah 53's two readings are stated in two sentences at the older level, with the Study Bible note linked. The opposition to Jesus is named as some of the Pharisees and the Herodians (Mark 3:6), with the Acts note's sentence that Jesus, his disciples and the crowds who welcomed him were Jews. The honest question on Jesus reuses the Honest Answer's sentences, not a new argument. Care lines on David's sin, on losing a home, and on prayer for healing that did not come.

## What was run for the third three (2026-11-20)

- `pnpm check` clean; ESLint on every changed file clean.
- All 38 commands of the content-gates step in `.github/workflows/ci.yml`: exit 0.
- `pnpm test`: 147 files passed, 7 skipped (1,701 tests passed, 73 skipped); the Explorer file has 22 tests.
- `pnpm build`, sitemap, prerender (10 Explorer stop pages), `audit:canonicals`: every audited page canonicalises to itself.
- On the served build (port 4623): every new activity completed by touch (phone emulation) and by keyboard alone; the map links all three; no console errors; no sideways scroll at 390 or 1440, day and night, both levels.
- Lighthouse on `/study/explorer/jesus` (median of three): performance 93, accessibility 100, best practices 96, SEO 100, CLS 0.000.
- Screenshots in `/home/user/elite-shots/explorer/`; `kingdom-390.png`, `exile-390.png`, `jesus-390.png` in `docs/work/elite/explorer-shots/`.

## The last three (2026-11-20): the Return and the Waiting, the Church and the Spirit, the New Creation

- **Next now walks all thirteen stops** from Creation to the New Creation with nothing skipped, and every stop's head says "Stop N of 13" in the same place (the test walks the chain and reads the label on each). The last stop's foot offers "The whole map" and "Why we believe". The map's "This stop is being drawn" state is no longer shown (no stop needs it); its code path stays, kept by a test that serves one stop as being drawn, and Next skips such a stop.
- **Shared code changed only where a stop needed it.** The order activity takes an optional `when` and `then` per item, shown once the item is in its place (the Return); match takes an optional `noun` (the New Creation's "pictures"; Abraham and the Exile still say "Promise"). A thread names its own states (`key`, `broken`), with validator support (every state a stop uses must be one the key names; `broken` must name key states) and the validator's quotation rule now runs over the threads too. The crown marks the king thread, the tent the dwelling thread.
- **The scenes.** The Return: the new wall going up in courses, unfinished on the right; a builder with a basket of stones on his shoulder and a spear in his other hand (Nehemiah 4:17 as the BSB words it), another laying a stone with his sword at his side; a small, plain temple on the hill with smoke from its altar; a house by the wall with one clay lamp burning in its window (the mustard mark). The Church: the upper room open to the street, full of people sitting close, one flame above them (the mustard mark); three faint dotted rings spreading from that room (Acts 1:8); the road out of the gate past a village on a hill, a chariot with its reader, to a port with a colonnade and a tower, and a ship with a full sail. The New Creation: Creation's frame come home, larger: the same horizon, but no sea and no sun or moon; the city wall with its gate standing open and its doors swung back; the river from the gate toward us with a tree of life on each bank; people walking in along the roads carrying gifts; the light (the mustard mark) shining from the open gate and every window, its rays across the sky. A first try drew the light as a star above the city, which read as a sun, and then behind the gate tower, which read as a crown; both were cut.
- **Wording on the hard places.** The years between the Testaments are told in five plain sentences drawn from the storyline and the Jewish-life portrait, and the name "the silent years" is given as a Christian name, with the Jewish years "anything but silent". The glory: only that Ezra reports no cloud. The church's failures: named as kinds of wrong without a list, with the New Testament's own rebukes, reusing the Honest Answers' sentences. Baptism, the gifts and leadership: what churches share, then three differences, "This stop does not choose between them." The end times: what the creeds confess together; the thousand years, the rapture and the order of the last events named as differences, no side, no dates, no news. Judgment: told as hope that wrongs will be named, with the Honest Answer on hell quoted for "a real judgment, and they differ on how to understand" it. No altar call: an invitation to wonder and to talk with a parent, a pastor or a leader. Care lines on waiting, on being hurt in or by a church, and on grief and fear of death or judgment.
- **The button fix.** On a phone, a tap leaves `:hover` stuck on a button, and the site's press feedback (`:active` at 0.68 opacity) sat on top of the hover mix: the walk's "Next" read as a grey, disabled button. Under `(hover: none)` the walk and cycle's primary button keeps its ink, and it is set at weight 600; it stays the one button family (`.btn`, ink with the mustard rule). Measured after taps: day ink on bone, night bone on ink.

## What was run for the last three (2026-11-20)

- `pnpm check` clean; ESLint on every changed file clean.
- All 38 commands of the content-gates step in `.github/workflows/ci.yml`: exit 0 (each read directly).
- `pnpm test`: 147 files passed, 7 skipped (1,708 tests passed, 73 skipped); the Explorer file has 29 tests.
- `pnpm build`, sitemap (13 Explorer stops), prerender (13 Explorer stop pages), `audit:canonicals`: every audited page canonicalises to itself.
- On the served build (`scripts/serve-like-vercel.mjs`, port 4621): each new stop at 390 and 1440, day and night, both levels (24 pages), no sideways scroll and no console errors; each new activity completed by touch emulation and by keyboard alone; Next walked from stop 1 to 13 by keyboard, "Stop N of 13" read on each; both threads lit at all thirteen stops by Enter.
- Lighthouse (`scripts/lighthouse-median.mjs`, median of three): `/study/explorer` performance 90, accessibility 100, best practices 96, SEO 100, CLS 0.000; `/study/explorer/new-creation` performance 91, accessibility 100, best practices 96, SEO 100, CLS 0.000.
- Screenshots in `/home/user/elite-shots/explorer/`; `return-390.png`, `church-390.png`, `newcreation-390.png`, `king-thread-1440.png`, a fresh `sinai-390.png` and `map-390.png` in `docs/work/elite/explorer-shots/`. The Kingdom and the Exile were re-shot and match their earlier shots.

## What to make next

The road is walkable end to end. Next, in the order of the plan above: How salvation works (James reads it first); Paul's travels, opened from the Church and the Spirit (its stop already points ahead in one line, with no link); the Holy Spirit theme and the three threads still to light (the thread shape now allows their own states); the library of the 66 books; the eight remaining cards; printable pages and a parent or leader guide.

## Not done in the pilot

Three threads (the promise, the lamb, a blessing for every nation) and eight cards, as planned above. James has not yet read any of the writing. No printable pages, no parent guide. Axe was not run separately (Lighthouse's accessibility audit is axe-based and scored 100 on both pages).
