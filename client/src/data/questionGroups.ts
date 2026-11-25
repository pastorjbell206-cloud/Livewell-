/**
 * The questions on the Questions door (/topics) and the answers index
 * (/answers), grouped by what people ask. Each group names Honest Answers by
 * slug (data/answers.ts) and rows of the topics index by the address they
 * open (client/public/topics/index.json). questionGroups.test.ts checks that
 * every answer sits in exactly one group and every topics row in one group,
 * so a question added to either list cannot go missing from the door.
 *
 * The group names are labels, not claims; the questions keep their own words.
 */
export interface QuestionGroup {
  id: string;
  /** The label over the group. */
  name: string;
  /** Honest Answer slugs, in the order shown. */
  answers: string[];
  /** Topics-index rows by their href, in the order shown after the answers. */
  rows: string[];
}

export const QUESTION_GROUPS: QuestionGroup[] = [
  {
    id: "true",
    name: "Is it true?",
    answers: [
      "does-god-actually-exist",
      "did-the-resurrection-actually-happen",
      "was-jesus-just-a-good-teacher",
      "why-would-anyone-trust-the-bible",
      "are-miracles-believable",
      "is-faith-irrational",
      "is-faith-just-wishful-thinking",
      "what-if-christianity-is-wrong",
      "what-did-the-new-atheists-get-right",
    ],
    rows: ["/help/trust-the-bible"],
  },
  {
    id: "evil",
    name: "God and suffering",
    answers: [
      "if-god-is-good-why-suffering",
      "why-does-god-allow-natural-disasters",
      "is-it-okay-to-be-angry-at-god",
      "did-god-command-genocide",
      "why-didnt-the-bible-just-ban-slavery",
      "is-hell-forever-or-does-it-end",
    ],
    rows: ["/help/suffering"],
  },
  {
    id: "others",
    name: "Jesus and other beliefs",
    answers: [
      "is-jesus-the-only-way",
      "what-about-those-who-never-heard",
      "christianity-and-islam-differences",
      "can-you-be-good-without-god",
      "can-life-mean-anything-without-god",
    ],
    rows: [],
  },
  {
    id: "believe",
    name: "What Christians believe",
    answers: [
      "how-can-god-be-three-and-one",
      "does-god-choose-us-or-do-we-choose-him",
      "can-you-lose-your-salvation",
      "how-should-a-christian-read-genesis-1",
      "do-i-have-to-choose-between-faith-and-science",
      "what-makes-us-human-in-the-age-of-ai",
    ],
    rows: ["/theology/traditions"],
  },
  {
    id: "church",
    name: "Church and doubt",
    answers: [
      "can-you-be-a-christian-without-church",
      "done-with-church-but-not-jesus",
      "what-happens-after-deconstruction",
    ],
    rows: ["/help/church-hurt", "/writing/why-didnt-the-bible-ban-slavery"],
  },
  {
    id: "nation",
    name: "Faith in public",
    answers: ["should-a-christian-follow-a-political-party"],
    rows: ["/topics/living-after-christendom", "/topics/faith-politics-and-the-flag", "/help/fear-of-the-future"],
  },
  {
    id: "home",
    name: "Home and family",
    answers: ["when-your-teenager-says-they-dont-believe", "what-does-the-bible-say-about-divorce-and-remarriage"],
    rows: ["/topics/raising-children-in-a-secular-age", "/studyguides/attention", "/help/marriage"],
  },
  {
    id: "life",
    name: "Worry, money and work",
    answers: ["what-does-the-bible-say-about-anxiety", "is-anxiety-a-spiritual-failure", "what-does-the-bible-say-about-money"],
    rows: ["/help/anxiety", "/help/money"],
  },
  {
    id: "hard",
    name: "A hard season",
    answers: [],
    rows: ["/help/grief", "/help/loneliness"],
  },
];

/**
 * Topics-index rows the door does not list as their own question, with the
 * place that holds them instead: "Is Christianity actually true?" opens the
 * whole of /answers, which the door already offers; the neighbours row asks
 * the same question as the Honest Answer on Jesus as the only way.
 */
export const ROWS_HELD_ELSEWHERE = new Set(["/answers", "/answers/is-jesus-the-only-way"]);
