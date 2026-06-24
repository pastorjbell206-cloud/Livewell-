# Content Roadmap — The Full Curriculum

The master production roadmap for livewellbyjamesbell.co. James approved the complete
curriculum across the five pillars. This document tracks every approved item, marks what
already exists (with its actual route), and sequences the rest into six waves.

**Status key:** `done` ships today at the listed route. `partial` exists at survey, data,
or article level and needs the approved deep treatment. `todo` does not exist yet.

**Wave logic (dependency first, SEO second):**

| Wave | Focus |
|------|-------|
| 1 | Doctrine of Scripture, Doctrine of God, Creeds/Confessions/Classics Library, Unifying Framework, editorial standard |
| 2 | Creation/Providence, Humanity/Sin, Christ/Spirit, Justice foundations, early reader-feedback tools |
| 3 | Salvation, Church/Last Things, Church History eras 1–8, Justice contested questions, hermeneutics tooling |
| 4 | Cross-cutting theology, Church History eras 9–16, book-by-book theology, Justice history, study tools |
| 5 | Prophetic Disruption captivities, Leadership Formation pillars 0–2, Integrated Life core domains, formation tools |
| 6 | Leadership Formation pillars 3–4, Integrated Life remainder, life-stage tools |

---

## Theological Depth

Survey pages exist for every locus at `/theology/doctrine/:slug` (data in
`client/public/theology/*.json`, index in `client/src/lib/theology.ts`). The approved
curriculum expands each survey into a deep series.

### Doctrine of Scripture

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| Survey: What Is the Bible, and Can We Trust It? | done | — | /theology/doctrine/scripture |
| What revelation is (general and special) | partial | 1 | Deepen from /theology/doctrine/scripture → /theology/doctrine/revelation |
| Models of inspiration | partial | 1 | /theology/doctrine/inspiration |
| The inerrancy spectrum, positions steelmanned | partial | 1 | /theology/doctrine/inerrancy |
| How the OT canon formed | partial | 1 | /theology/doctrine/ot-canon |
| How the NT canon formed | partial | 1 | /theology/doctrine/nt-canon |
| The Apocrypha: why the canons differ | todo | 1 | /theology/doctrine/apocrypha |
| Sufficiency and clarity of Scripture | todo | 1 | /theology/doctrine/sufficiency-clarity |
| Textual criticism without panic | todo | 1 | /theology/doctrine/textual-criticism (links /resources/context/septuagint-and-scripture) |
| Translations: how to choose, how they differ | todo | 1 | /theology/doctrine/translations |
| Apparent contradictions handled honestly | partial | 1 | /theology/questions (Q&A level) + /resources/context/did-the-gospels-get-jesus-right → dedicated piece |

### Doctrine of God

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| Survey: Who Is God? The Trinity | done | — | /theology/doctrine/god-and-trinity |
| Trinity: the biblical data, text by text | partial | 1 | Deepen from survey + /theology/questions → /theology/doctrine/trinity-biblical-data |
| Nicaea to Constantinople: how the church said it | partial | 1 | Councils data live at /theology/history → narrative essay |
| East and West: the filioque and the Schism | partial | 1 | Great Schism entry in church-history-councils.json → essay |
| The attributes of God (series) | partial | 1 | Sermon series exists at /leadership/sermon-series → reader-facing series under /theology/doctrine/ |
| Impassibility: does God suffer? | todo | 1 | /theology/doctrine/impassibility |
| Open theism and Molinism, steelmanned | todo | 1 | /theology/doctrine/foreknowledge-debates |
| The problem of evil | partial | 1 | /theology/questions (two Q&A entries) → full treatment |
| The theodicies, each steelmanned | todo | 1 | /theology/doctrine/theodicies |

### Creation and Providence

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| Survey: Creation and Providence | done | — | /theology/doctrine/creation |
| Four origins views, EACH steelmanned (4 essays) | partial | 2 | Survey names the debate; views get full essays + /theology/compare rows |
| Providence and concurrence | partial | 2 | Deepen from survey |
| Sovereignty and human freedom | todo | 2 | /theology/doctrine/sovereignty-freedom |
| Miracles | partial | 2 | /resources/context/miracles-and-the-ancient-mind + Q&A → doctrine piece |
| Science beyond origins | todo | 2 | /theology/doctrine/faith-and-science |

### Humanity and Sin

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| Survey: What Is a Human Being? | done | — | /theology/doctrine/anthropology |
| Survey: Sin and the Fall | done | — | /theology/doctrine/sin |
| The image of God | partial | 2 | Deepen from anthropology survey (cross-link /justice/topic/race-and-image) |
| Dualism and monism: body and soul | partial | 2 | Deepen from anthropology survey |
| The origin of sin | partial | 2 | Deepen from sin survey |
| The fall and its reach | partial | 2 | Deepen from sin survey |
| Free will after the fall | todo | 2 | /theology/doctrine/free-will |

### Christ and the Spirit

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| Survey: Who Is Jesus? | done | — | /theology/doctrine/christology |
| Survey: The Holy Spirit and His Gifts | done | — | /theology/doctrine/holy-spirit |
| The incarnation | partial | 2 | Deepen from christology survey |
| The councils and the heresies they answered | partial | 2 | Data live (church-history-councils.json, church-history-heresies.json at /theology/history) → narrative essays |
| The atonement theories, each presented fairly | partial | 2 | Q&A entry exists → /theology/doctrine/atonement-theories |
| The person and work of the Spirit | partial | 2 | Deepen from holy-spirit survey |
| Cessationism and continuationism, steelmanned | partial | 2 | Survey names the debate → full two-view treatment |

### Salvation

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| Survey: How Are We Saved? | done | — | /theology/doctrine/soteriology |
| Calvinism, Arminianism, Provisionism steelmanned | partial | 3 | Survey + /theology/compare → three-view deep treatment |
| The ordo salutis | todo | 3 | /theology/doctrine/ordo-salutis |
| Justification | partial | 3 | Q&A entry exists → full doctrine piece |
| The New Perspective on Paul | todo | 3 | /theology/doctrine/new-perspective |
| Sanctification | todo | 3 | /theology/doctrine/sanctification |
| Assurance | partial | 3 | /theology/questions entry → full piece |
| Perseverance and apostasy | partial | 3 | /theology/questions entry → full piece |

### Church and Last Things

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| Survey: What Is the Church? | done | — | /theology/doctrine/church |
| Survey: How Does It End? | done | — | /theology/doctrine/last-things |
| The marks of a true church | partial | 3 | Deepen from church survey |
| Polity: four views steelmanned | done | — | /leadership/formation/church-government (cross-list under /theology) |
| Baptism: both sides at full strength | partial | 3 | Survey names it → two-view deep treatment |
| The Lord's Supper: the views | partial | 3 | Survey names it → multi-view treatment |
| The millennium: four views | partial | 3 | Survey names it → four-view treatment + /theology/compare rows |
| Rapture positions | todo | 3 | /theology/doctrine/rapture |
| The intermediate state | partial | 3 | Q&A entry → full piece |
| Hell: three views, honestly | partial | 3 | Two Q&A entries → full three-view treatment |

### Cross-cutting

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| Doctrinal triage: how to weigh disagreements | partial | 4 | Triage taxonomy runs through every hub + /theology/how-to-use → standalone essay |
| The creeds, annotated line by line | partial | 1 | /theology/creeds (4 creeds + 9 confessions live; annotations to add) |
| Other religions, described fairly | partial | 4 | Q&A entry → full series |

---

## Church History

Timeline, councils, heresies, and figures exist as data rendered at `/theology/history`
(7 eras, 11 councils, 10 heresies, 36 figures). The approved curriculum adds ~16 narrative
era essays plus deep heresy and figure treatments.

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| Timeline survey (7 eras, interactive) | done | — | /theology/history (church-history-timeline.json) |
| Councils reference (Nicaea I through Vatican II) | done | — | /theology/history (church-history-councils.json) |
| Era essay: The apostolic age | todo | 3 | /theology/history/apostolic-age |
| Era essay: The persecuted church and the martyrs | todo | 3 | /theology/history/persecuted-church |
| Era essay: Constantine and the great reversal | todo | 3 | /theology/history/constantine (cross-link /disruption/topic/church-and-empire) |
| Era essay: The age of the councils | todo | 3 | /theology/history/age-of-councils |
| Era essay: The fathers, East and West | todo | 3 | /theology/history/the-fathers |
| Era essay: The fall of Rome and the early medieval church | todo | 3 | /theology/history/early-medieval |
| Era essay: Monasticism and the keepers of the flame | todo | 3 | /theology/history/monasticism |
| Era essay: The Great Schism of 1054 | todo | 3 | /theology/history/great-schism |
| Era essay: The high medieval church and scholasticism | todo | 4 | /theology/history/high-medieval |
| Era essay: Crusades and inquisition, told honestly | todo | 4 | /theology/history/crusades-inquisition |
| Era essay: The pre-reformers (Wycliffe, Hus) | todo | 4 | /theology/history/pre-reformers |
| Era essay: The Reformation | todo | 4 | /theology/history/reformation |
| Era essay: Post-reformation, Puritans, and orthodoxy | todo | 4 | /theology/history/post-reformation |
| Era essay: Awakenings and the missions movement | todo | 4 | /theology/history/awakenings-missions |
| Era essay: Liberalism, fundamentalism, and the modern fracture | todo | 4 | /theology/history/modern-fracture |
| Era essay: The shift to the global South | todo | 4 | /theology/history/global-south |
| Heresies series (deep treatment of each) | partial | 3 | 10 entries live as reference at /theology/history → essay per heresy |
| Figure profiles (deep treatment of key figures) | partial | 3 | 36 profiles live at /theology/history → long-form profiles for the load-bearing figures |

---

## Biblical Theology

This column is the furthest along. Data and pages live at `/theology/biblical`.

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| Three frameworks (covenant, dispensational, progressive) | done | — | /theology/doctrine/covenant-frameworks |
| Tracing the Kingdom of God | done | — | /theology/biblical (biblical-theology-themes.json) |
| Tracing Temple and presence | done | — | /theology/biblical |
| Tracing Covenant | done | — | /theology/biblical (+ /leadership/article/the-biblical-covenants) |
| Tracing Exile and homecoming | done | — | /theology/biblical |
| Tracing Sacrifice and atonement | done | — | /theology/biblical |
| NT use of OT (6 methods) | done | — | /theology/biblical (biblical-theology-nt-ot.json) |
| The storyline in 11 acts | done | — | /theology/biblical (biblical-theology-storyline.json) |
| Theology of each Bible book | partial | 4 | 66 book profiles live (bible-books.json + books-ot/nt.json at /theology/biblical); upgrade to theological essays per book |
| Hermeneutics (12 principles, 9 errors) | done | — | /theology/hermeneutics (+ 21 exegesis articles at /leadership/article/:slug) |

---

## Prophetic Justice

Topic pages live at `/justice/topic/:slug` (data in `client/src/lib/prophetic.ts`, all
ready). Posture, glossary, witnesses, and timeline pages exist.

### Foundations

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| Mishpat and tsedaqah: the words themselves | done | — | /resources/context/what-justice-meant + /justice/glossary |
| Justice in the Law of Moses | partial | 2 | /nation/policy works the civil laws → dedicated foundations essay |
| Justice in the Prophets | todo | 2 | /justice/foundations/prophets |
| Justice in the Wisdom literature | todo | 2 | /justice/foundations/wisdom |
| Jesus and justice | todo | 2 | /justice/foundations/jesus |
| The early church and justice | todo | 2 | /justice/foundations/early-church |

### Contested questions, steelmanned

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| Charity vs structures | partial | 3 | /justice/topic/systemic-sin covers structural sin → dedicated both-sides piece |
| Wealth and the poor | done | — | /justice/topic/the-poor + /justice/topic/the-wage + /resources/context/money-texts-we-explain-away |
| Postures toward the state | done | — | /nation essay suite (christian-nation, theocracy, empire, which-party, render) |
| Race | done | — | /justice/topic/race-and-image |
| Immigration | done | — | /justice/topic/the-immigrant |
| Life across the lifespan | done | — | /justice/topic/unborn-and-edges |
| Criminal justice | done | — | /justice/topic/the-prisoner |
| Creation care | done | — | /justice/topic/creation-care |
| War and peace | done | — | /disruption/topic/war-and-peace |
| The vulnerable (orphan, widow, disabled, trafficked) | done | — | /justice/topic/the-vulnerable |
| Abuse and the church's silence | done | — | /justice/topic/abuse-and-vulnerable |
| The gospel and social action | todo | 3 | /justice/topic/gospel-and-social-action |
| Principle vs prudence: how to disagree | partial | 3 | /nation/policy + /nation/scorecard frame it → dedicated essay (pairs with the Sorter tool) |

### History of Christian justice

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| Justice timeline (survey) | done | — | /justice/timeline |
| The early church and the poor | partial | 4 | Timeline entry → full essay |
| Abolition: both Bibles in the same century | partial | 4 | /resources/context/the-slavery-texts → full historical essay |
| The social gospel and its critics | todo | 4 | /justice/history/social-gospel |
| The civil rights movement and the church | todo | 4 | /justice/history/civil-rights |
| Liberation theology, fairly weighed | todo | 4 | /justice/history/liberation-theology |

---

## Prophetic Disruption

Topic pages live at `/disruption/topic/:slug`. The standard for every piece: equal-force
critique of left and right captivities.

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| Consumerism | done | — | /disruption/topic/consumer-comfort |
| Truth and tribe | done | — | /disruption/topic/truth-and-tribe |
| Individualism | todo | 5 | /disruption/topic/individualism |
| Mammon | partial | 5 | /life/money-and-the-heart + money-texts guide → disruption-register piece |
| Celebrity | done | — | /disruption/topic/celebrity-platform |
| The prosperity and platform gospels | done | — | /disruption/topic/prosperity-success |
| The therapeutic captivity | done | — | /disruption/topic/therapeutic-gospel |
| Partisan media and the outrage cycle | done | — | /disruption/topic/outrage-machine |
| Nostalgia as captivity | todo | 5 | /disruption/topic/nostalgia |
| Constantine: when the church married the power | done | — | /disruption/topic/church-and-empire |
| Christian nationalism | done | — | /disruption/topic/christian-nation-myth + /disruption/topic/power-and-nation + /nation suite |
| The body and the sexual revolution | done | — | /disruption/topic/sexuality-and-body |
| Race and the captive church | todo | 5 | /disruption/topic/race-and-the-captive-church (cross-link /justice/topic/race-and-image) |

---

## Leadership Formation

Per `docs/leadership-formation-hub.md` waves 2–5, minus what `formation-index.json` shows
as shipped. Six deep topics are live at `/leadership/formation/:slug`; the 131-article
library at `/leadership/library` covers many remaining themes at article level (noted as
partial), but the eight-part deep-topic treatment is the deliverable.

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| The Hidden Temptations of Power | done | — | /leadership/formation/the-hidden-temptations-of-power |
| Church Government (4 views) | done | — | /leadership/formation/church-government |
| Men, Women, and the Office (2 views) | done | — | /leadership/formation/men-women-and-the-office |
| The Call and Its Testing | done | — | /leadership/formation/the-call-and-its-testing |
| Burnout and the Theology of Rest | done | — | /leadership/formation/burnout-and-the-theology-of-rest |
| The Leader's Marriage and Family | done | — | /leadership/formation/the-leaders-marriage-and-family |
| Pillar 0 orientation essay (formation before function) | todo | 5 | /leadership/formation/orientation |
| The character qualifications read closely | todo | 5 | /leadership/formation/character-qualifications |
| The hidden life and the rule of life | todo | 5 | /leadership/formation/the-hidden-life (pairs with Rule of Life Builder) |
| Identity not rooted in role | todo | 5 | /leadership/formation/identity-and-role |
| Money and sex safeguards (companion to power) | todo | 5 | /leadership/formation/money-and-sex-safeguards |
| Servant leadership vs the slogan | partial | 5 | Library articles (spiritual-leadership, humility-in-leadership) → deep topic |
| Authority without domineering | todo | 5 | /leadership/formation/authority-without-domineering |
| Staff: hiring, shepherding, releasing | partial | 5 | Articles (how-to-hire-church-staff, leading-staff, how-to-fire-with-grace) → deep topic |
| Multiplying leaders | partial | 5 | Articles (building-a-leadership-pipeline, raising-leaders) → deep topic |
| Conflict | partial | 5 | Articles (managing-church-conflict, handling-conflict) → deep topic + Conflict Navigator tool |
| Criticism and betrayal | partial | 5 | Article (handling-criticism) → deep topic |
| Congregational anxiety systems (Friedman, tested) | partial | 5 | Article (leading-from-rest) touches it → deep topic |
| Accountability structures | partial | 5 | Article (accountability-for-church-leaders) → deep topic |
| Vision and change without manipulation | partial | 6 | Articles (how-to-cast-vision, leading-change) → deep topic |
| Revitalization | partial | 6 | Articles (revitalization, leading-through-decline) → deep topic |
| Corporate discernment | todo | 6 | /leadership/formation/corporate-discernment |
| Money and transparency | partial | 6 | Article (money-and-the-church) + /leadership/budget → deep topic |
| Abuse-prevention governance | partial | 6 | /justice/topic/abuse-and-vulnerable + /leadership/governance → deep topic (cross-checked with Langberg) |
| Culture-building | partial | 6 | Article (healthy-staff-culture) → deep topic |
| The arc: entering a call through finishing | partial | 6 | Articles (first-ninety-days-new-church, how-to-finish-well-in-ministry) → deep topic |
| Succession | partial | 6 | Articles (pastoral-succession, succession-planning-church) → deep topic |
| Stepping down and life after the role | todo | 6 | /leadership/formation/after-the-role |

---

## Integrated Life

Five deep domains are live at `/life/:slug` (`domains-index.json`). The hub's seven-pillar
frame (`LifeIndex.tsx`, `WholeLifeAssessment.tsx`) defines the remaining map. Marriage and
parenting have standalone hubs that the domain format should absorb or cross-link.

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| The Anxious Mind (faith and mental health) | done | — | /life/the-anxious-mind |
| The Body and the Rhythms | done | — | /life/the-body-and-the-rhythms |
| Friendship Against Isolation | done | — | /life/friendship-against-isolation |
| Money and the Heart | done | — | /life/money-and-the-heart |
| Grief and Loss | done | — | /life/grief-and-loss |
| The Integrated Vision (orientation domain) | todo | 5 | /life/the-integrated-vision |
| Prayer and the interior life | todo | 5 | /life/prayer-and-the-interior-life |
| Doubt and the long faith | partial | 5 | /doubt + /faith-crisis exist → domain treatment at /life/doubt |
| Marriage as covenant (domain) | partial | 5 | /marriage hub exists → domain treatment, cross-linked |
| Parenting (domain) | partial | 5 | /parenting + /family hubs exist → domain treatment, cross-linked |
| Vocation and work | todo | 5 | /life/vocation-and-work |
| Desire, habit, and formation | todo | 6 | /life/desire-and-habit |
| Technology and attention | todo | 6 | /life/technology-and-attention |
| Singleness | todo | 6 | /life/singleness |
| The life in the world (neighbor, witness, public life) | todo | 6 | /life/the-life-in-the-world |
| Suffering and chronic illness | todo | 6 | /life/suffering-and-illness |
| Aging and dying | todo | 6 | /life/aging-and-dying |

---

## Tools to Build

Verified in `App.tsx` and `/tools` (ToolsHub): Passage Context, Whole-Life Assessment,
Formation Inventory, and the comparison tool all exist.

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| Passage Context tool | done | — | /theology/passage |
| Whole-Life Assessment | done | — | /life/assessment |
| Leadership Formation Inventory | done | — | /leadership/inventory |
| Doctrine comparison tool | done | — | /theology/compare |
| Creeds/Confessions/Classics Library | partial | 1 | /theology/creeds (4 creeds + 9 confessions live; add annotations + public-domain classics shelf) |
| Reader Question Intake | partial | 2 | /theology/questions is curated display → add intake form (feeds the curriculum) |
| Spaced-Repetition Memory | partial | 2 | /tools/scripture-memory exists; add review intervals + localStorage decks |
| Socratic Companion | todo | 2 | /tools/socratic (curated question trees in JSON, per leadership-formation-hub.md spec) |
| Hermeneutics Trainer | partial | 3 | /theology/hermeneutics is content → interactive trainer at /tools/hermeneutics-trainer |
| Timeline + Geography Visualizer | partial | 3 | /theology/history + /justice/timeline exist → add map layer, unify |
| Cross-Reference Explorer | todo | 4 | /tools/cross-references |
| Principle-vs-Prudence Sorter | partial | 4 | /nation/policy + /nation/scorecard adjacent → dedicated sorter at /tools/principle-or-prudence |
| Captivity Self-Audit | partial | 5 | /disruption/consistency (Consistency Check) exists → full captivity audit across all seven captivities |
| Rule of Life Builder | todo | 5 | /tools/rule-of-life (PDF export via existing build-pdfs pipeline) |
| Conflict Navigator | partial | 5 | /tools/conflict-guide exists → Matthew 18 / Acts 15 / Proverbs 19:11 / abuse-safeguard decision tree per hub spec |
| Examen Journal | todo | 5 | /tools/examen |
| Sabbath Planner | todo | 5 | /tools/sabbath-planner |
| Vocation Discernment | todo | 6 | /tools/vocation (lay companion to the calling-discernment spec) |
| Grief Companion | partial | 6 | /grief landing exists → interactive companion at /tools/grief-companion |
| Digital-Life Audit | partial | 6 | /leadership/before-you-post + /tools/life-audit adjacent → dedicated audit at /tools/digital-life |

---

## Cross-Site

| Item | Status | Wave | Where it lives or will live |
|------|--------|------|------------------------------|
| Unifying Framework page (know it / trace it / renounce idols / do justice / lead and live it) | todo | 1 | /framework — the page that names how the five pillars are one curriculum |
| Editorial standard, published | partial | 1 | docs/VOICE.md + CLAUDE.md + validators exist internally → public page at /editorial-standard |
| Philosophy page | partial | 2 | /theology/how-to-use covers method for one pillar → site-wide page at /philosophy |

---

## Counts

| Column | Done | Partial | Todo | Total |
|--------|------|---------|------|-------|
| Theological Depth | 11 | 36 | 14 | 61 |
| Church History | 2 | 2 | 16 | 20 |
| Biblical Theology | 9 | 1 | 0 | 10 |
| Prophetic Justice | 12 | 5 | 8 | 25 |
| Prophetic Disruption | 9 | 1 | 3 | 13 |
| Leadership Formation | 6 | 14 | 8 | 28 |
| Integrated Life | 5 | 3 | 9 | 17 |
| Tools | 4 | 10 | 6 | 20 |
| Cross-Site | 0 | 2 | 1 | 3 |
| **Total** | **58** | **74** | **65** | **197** |

---

## Build process

Content ships as validated JSON waves produced by background agents. Each wave: agents
write topic JSON against the fixed schema for its hub (formation eight-part, doctrine,
domain, or topic schema), the hub's validator runs (`scripts/validate-*.mjs` — steelman
length parity, secular-source testing, house mechanics, forbidden-word list), the index
builder regenerates the manifest, and the sitemap generator picks up the manifest.
Validators gate CI: a topic that fails validation does not merge, and a wave is not
done until every item in it renders at its route with the validator green.
