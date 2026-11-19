# Bible Explorer: the pilot, and the plan for the rest

James asked (2026-11-19) for a way to explain the whole Bible to young people aged 7 to 16 through pictures: the overarching story, the core doctrines, why Christians believe what they believe, something to click on and work through. This is the pilot of that room, at `/study/explorer`. The drawings, wording and structure are the site's own, in the engraved hand of the art kit; nothing is modelled on another ministry's videos, diagrams or scripts.

## What is built

- **The map** (`/study/explorer`): one road drawn down the page, from the garden to the city, with a roundel for each of thirteen stops. Every stop is named, placed and summed up in one line at both reading levels, so the whole arc can be read end to end today. A finished stop opens its own page; a stop still being drawn says so and has no link.
- **Four finished stops**, each with a drawn scene, the story at both levels, "What this shows us about God", one or two verses quoted exactly from the BSB (each opens the site's verse panel), "Read it yourself" (Study Bible chapters), and one activity:
  - `/study/explorer/creation`: tap the picture to find the seven days.
  - `/study/explorer/abraham`: match each of God's three promises to where the Bible shows it kept.
  - `/study/explorer/rescue`: put four events of the rescue in order.
  - `/study/explorer/cross`: think, then look (four questions, each answer behind its own button).
- **Two reading levels**, "Ages 7 to 11" and "Ages 12 to 16" (the Family door's younger and older bands, `lib/familyTable.ts`), one tap, kept on the device. The older level adds the why, an honest hard question with its answer, and links to go deeper (Honest Answers, context guides).
- **One thread**, "God with his people", lit across the whole map: a solid line where God lives among his people, a broken line where the closeness is lost or waited for (the fall, the exile, the return), and one line with its verse at each of the thirteen stops. Four more threads are named as coming.
- **"Why we believe"**: two finished cards (The Bible; Jesus, God and man) with a picture, a plain statement at both levels, a quoted verse, the passages it rests on, a question people ask, the stops that teach it, and the family catechism questions that say the same. Eight more are named as coming, without links.
- **Progress** on the device (`livewell-progress-explorer-v1`, through `lib/storage.ts`): stops visited, activities done, the level, and "You are here" on the map. No account, no API procedure.

## The stops, and why there are thirteen

The site's Bible's Story (`/study/bible/story`, the eleven acts in `client/public/theology/biblical-theology-storyline.json`) is the spine; every stop is filed under one act, and the map shows the act's name. Two acts are split into two stops each, because a young reader needs them as places of their own:

- **Act Four (Exodus and Sinai)** becomes *The Rescue from Egypt* and *Sinai and the Tent*: the rescue and the law are two different lessons, and the tabernacle is where the thread of God dwelling with his people turns.
- **Act Nine (Christ, the Center)** becomes *Jesus Comes* and *The Cross and the Empty Tomb*, as the brief asked: the cross and the resurrection need a stop of their own.

| # | Stop | Act | Status |
|---|---|---|---|
| 1 | Creation | One | finished |
| 2 | The Fall | Two | drawing |
| 3 | Abraham and the Promise | Three | finished |
| 4 | The Rescue from Egypt | Four (added split) | finished |
| 5 | Sinai and the Tent | Four (added split) | drawing |
| 6 | The Land and the Judges | Five | drawing |
| 7 | The Kingdom | Six | drawing |
| 8 | The Prophets and Exile | Seven | drawing |
| 9 | The Return and the Waiting | Eight ("the Silence" in the storyline; "the Waiting" for a child) | drawing |
| 10 | Jesus Comes | Nine (added split) | drawing |
| 11 | The Cross and the Empty Tomb | Nine (added split) | finished |
| 12 | The Church and the Spirit | Ten | drawing |
| 13 | The New Creation | Eleven | drawing |

## The plan for the nine stops still to draw

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

Each is data in `threads.json` (`status: "finished"`, a line and a verse at each stop it runs through): **The promise** (Noah, Abraham, Sinai, David, the new covenant); **The lamb** (garments, Isaac and the ram, Passover, the altar, Isaiah 53, the Lamb of God, the Lamb on the throne); **The king** (Adam's rule, the judges' "no king", David, the exile's lost throne, Jesus the son of David, the throne in the city); **A blessing for every nation** (Babel, Abraham, Rahab and Ruth, Jonah, the wise men, Pentecost, every tribe and tongue).

## The cards still to write

God (one God, Father, Son and Spirit); People made in God's image; Sin; The cross; The resurrection; The Holy Spirit; The church (with baptism and the Supper: what all Christians share, and that churches differ); The life to come (with the end times: what all confess, and that churches differ). Each follows the catechism (`client/public/family-catechism.json`) and the confessional floor in CLAUDE.md, and links the catechism question that words it.

## What to add next

1. The nine stops above, two at a time (the drawing is the long part).
2. **How the Bible fits together**: one picture of the 66 books as a library on shelves (Law, History, Wisdom, Prophets, Gospels, Acts, Letters, Revelation), tap a shelf, see where its books sit on the map.
3. **A timeline strip** under the map, with the few dates the site already holds (`client/public/bible/story.json`), shown only at the older level.
4. **Printable pages**: one sheet per stop (the drawing in outline to colour, the story at the younger level, the activity on paper), built like the existing PDFs (`scripts/build-pdfs.mjs`).
5. **A parent and youth-leader guide**: a page with a six-week or thirteen-week plan through the stops, questions for a group, and how to handle the hard stops.

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
