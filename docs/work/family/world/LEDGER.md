# Claims ledger: the two after-the-vote devotions (U11)

Pieces: `grown-ups-voted-differently.md` ("When the Grown-Ups Voted
Differently") and `praying-for-leaders.md` ("Praying for Leaders We Did Not
Choose"), in this folder; data in `client/public/family-devotions-world.json`
(`live: false`). Written 2026-10-27 by the U11 agent. Every line says what was
actually done.

## Methods, and what the words below mean

- **"BSB, site text"**: the passage was printed with `node scripts/bsb.mjs
  "<ref>"` (the site's own Berean Standard Bible) and the devotion's
  `passageText` was checked word for word by `quotesPassage` in
  `scripts/lib/bsb.mjs`, the same check `scripts/validate-family.mjs` runs in
  CI. Household surfaces quote the BSB (plan 5.7); no ESV is quoted.
- **"BSB, read"**: a supporting verse was printed with `node scripts/bsb.mjs`
  and read; it is not quoted in the piece.
- **"Search, 2026-10-27"**: one WebSearch call; the result summary is
  recorded. No page was opened beyond the summaries.
- **"Not checked (reference knowledge)"**: no source was opened or searched.
  Kept because the agent judged it standard knowledge. That is not a check.

## Biography

None. Neither piece has a first-person line, a story from James's home, a
congregant, or a number about James. Checked against NOTES.md: nothing to
check.

## Statistics

None.

## When the Grown-Ups Voted Differently

- Matthew 10:2-4, quoted in full as the passage. BSB, site text (match).
- "Matthew had been a tax collector." Matthew 10:3 ("Matthew the tax
  collector"); Matthew 9:9 (sitting at the tax booth). BSB, read.
- "He collected money for the rulers of the land." Search, 2026-10-27
  ("Matthew tax collector Capernaum Herod Antipas Rome ..."): the summaries
  place his booth at Capernaum (Matthew 9:9, Mark 2:14) and agree he worked for
  Herod Antipas's administration, while disagreeing on whether the money went
  finally to Antipas or to Rome. The piece says "the rulers of the land" and
  names neither, so it does not depend on that question.
- "Many people looked down on tax collectors for it." Matthew 9:10-11 (the
  Pharisees: "Why does your Teacher eat with tax collectors and sinners?").
  BSB, read. The search summaries also describe the work as unpopular; the
  stronger charges some sources make (that collectors were all corrupt) are
  not in the piece.
- "Simon was called the Zealot, a name for someone on fire with zeal for God."
  Luke 6:15 and Acts 1:13 ("Simon the Zealot"); Matthew 10:4 in the BSB reads
  "Simon the Zealot". BSB, read. Search, 2026-10-27 ("Simon the Zealot meaning
  ..."): the summaries say Luke and Acts use *zelotes*, Matthew and Mark a form
  (*Kananaios*) from the Hebrew for "zealous", and that the word can describe
  religious or political zeal.
- "In those days that zeal sometimes meant wanting the Romans gone, though we
  don't know exactly what Simon believed." Same search: the organized party
  called the Zealots is most clearly tied to the later revolt against Rome
  (from AD 66), and whether Simon belonged to any such movement is uncertain;
  older reference works (Easton) assume he did, recent caution treats it as
  unproven. Acts 5:37 (Judas the Galilean, who "appeared in the days of the
  census and drew away people after him") shows resistance to Roman rule
  before Jesus's ministry. BSB, read. The sentence is hedged ("sometimes";
  "we don't know") to stay true under either reading.
- "It's hard to picture these two agreeing about much at dinner." An inference,
  stated as one, not a historical claim.
- "Jesus called them both. He didn't ask them to settle their arguments
  first." The Gospel call accounts (Matthew 9:9; Mark 2:14; Luke 6:13-16) give
  no condition of agreement. BSB, read. A reading of the text, not a claim from
  outside it.
- The two sides ("If you are glad..." / "If you are sad..."): pastoral counsel,
  no factual claim. "The people who won can't save anyone; only Jesus can do
  that" and "can't take Jesus off His throne" are confession, not history.
- `grownups.href` `/help/politics`: the care page exists
  (`client/public/needs/politics.json`, `page: true`, title "Politics is
  tearing my family apart"). Checked in the repo.

## Praying for Leaders We Did Not Choose

- 1 Timothy 2:1-4, quoted in full as the passage, including the BSB's own
  dashes. BSB, site text (match).
- "Paul wrote these words to Timothy." 1 Timothy 1:1-2 names Paul as the
  writer and Timothy as the reader. BSB, read. Many scholars hold that the
  pastoral letters were written in Paul's name after his death; the piece
  follows the letter's own claim and makes no point that depends on the date.
  Not searched; reference knowledge.
- "whom he had left in the city of Ephesus to care for the church there."
  1 Timothy 1:3 ("As I urged you on my departure to Macedonia, you should stay
  on at Ephesus to instruct certain men not to teach false doctrines"). BSB,
  read. "To care for the church" is a summary of the letter's charge.
- "In those days the man over everyone was the emperor of Rome. No one in
  Timothy's church had chosen him. He didn't worship Jesus." True of every
  emperor at any date proposed for the letter (from the 60s to the early second
  century). No emperor is named, so the dating question does not touch it. Not
  checked (reference knowledge).
- "the officials under him could make life hard for Christians. Paul himself
  had been beaten and jailed by some of them." Acts 16:22-23 (the magistrates
  at Philippi had Paul and Silas beaten with rods and jailed); Acts 24:27
  (Felix left Paul in prison); 2 Corinthians 11:25 ("Three times I was beaten
  with rods"). BSB, read.
- "Paul tells the church to pray for kings and everyone in authority, and to do
  it first of all. He asks for thanksgiving too ... God wants everyone to be
  saved." The passage itself (1 Timothy 2:1-4). BSB, site text.
- "Paul asked the first Christians to pray for an emperor nobody chose." The
  passage itself, with the line above. Kept to what the passage says; the
  piece does not claim what the early church went on to pray (1 Clement and
  Tertullian were not checked and are not cited).
- The two sides ("If the people you voted for won..." / "...lost"): pastoral
  counsel, no factual claim.
- `grownups.href` `/help/politics`: as above.

## Both directions (plan 2, "the same instrument")

Each piece carries `politics: true` and two `sides`, read aloud in turn: the
glad and the sad (piece one), and those whose candidates won and lost (piece
two). Neither names a party, a candidate, or an issue. `node
scripts/validate-politics.mjs` holds the two sides of each piece within the
same 55 percent word band it applies to the disruption and justice topics, and
checks both pieces for exclamation points and its forbidden words. Word counts
at writing: 47 and 47; 42 and 46.

## Not done

- No second-agent read as the skeptic and as the pastor (plan 9.5).
- James has not read either piece. They stay hidden until he does.
- No ESV check: nothing here quotes the ESV.
