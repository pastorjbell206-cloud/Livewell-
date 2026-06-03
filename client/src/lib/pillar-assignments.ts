/**
 * Per-essay pillar assignments under the two-movement / six-pillar taxonomy.
 * Generated from scripts/classify-pillars.mjs (uses each essay's current pillar
 * as a prior, with keyword overrides). Edit freely to correct a filing — the
 * resolver in taxonomy.ts reads this first, then falls back to the legacy map.
 * confidence "LOW" marks rows still worth your eye (see pillar-review-shortlist.md).
 */
export interface PillarAssignment { pillar: number; subThemes: string[]; confidence: "high" | "med" | "LOW"; }
export const PILLAR_ASSIGNMENTS: Record<string, PillarAssignment> = {
  "when-god-bless-america-replaces-thy-kingdom-come": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "high"
  },
  "the-monster-in-the-mirror": {
    "pillar": 3,
    "subThemes": [],
    "confidence": "high"
  },
  "not-persecuted-seduced-crisis-american-christianity": {
    "pillar": 4,
    "subThemes": [],
    "confidence": "med"
  },
  "you-are-not-the-exception": {
    "pillar": 3,
    "subThemes": [],
    "confidence": "high"
  },
  "the-theology-of-time": {
    "pillar": 6,
    "subThemes": [
      "practices"
    ],
    "confidence": "high"
  },
  "why-pastors-quit-and-how-to-stay": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "hidden-pain-successful-pastor": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "church-needs-you-healthy-not-busy": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "stop-performing-start-pastoring": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "personal-board-accountability": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "five-biggest-mistakes-new-pastors": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "lead-through-church-crisis": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "art-of-saying-no-without-guilt": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "culture-discipleship-not-attendance": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "bivocational-pastors-get-right": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "stopped-competing-church-across-town": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "learned-from-pastor-disagrees": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "slow-burn-ministry-exhaustion": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "sabbatical-why-church-should-require": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "return-ministry-after-burnout": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "difference-tired-and-done": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "when-man-pulpit-falling-apart": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "spouse-wishes-knew-parsonage": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "protecting-marriage-ministry-demands": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "pastors-kids-watching-what-seeing": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "present-at-home-mind-never-leaves": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "okay-to-see-counselor": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "pastors-depression-not-faith-problem": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "anxiety-perfectionism-pastor-breaking-cycle": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "not-your-churchs-attendance-numbers": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "preach-same-gospel-different-people": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "when-preaching-gets-stale": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "five-sermon-habits-shrinking-faith": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "preaching-to-room-not-there-yet": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "eighty-percent-churches-plateaued": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "small-churches-get-right": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "metrics-tell-church-healthy": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "revitalize-or-replant": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "lead-church-decline-without-losing-hope": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "give-feedback-changes-behavior": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "most-dangerous-person-church-staff": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "when-fire-someone-with-integrity": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "staff-culture-no-burnout": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "gen-z-wants-from-church": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "young-adults-coming-back-church": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "scandals-teaching-accountability": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "talk-politics-pulpit-without-destroying": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "church-split-surviving-learning-forward": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "reformed-charismatic-pastors-same-table": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "city-wide-church-together": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "healthy-pastor-referral-network": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "three-small-churches-coplanted": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "before-launch-ministry-ask-other-church": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "white-churches-wrong-about-diversity": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "learned-unity-pastoring-across-cultures": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "church-closures-outpacing-plants": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "talk-global-missions-moves-congregation": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "short-term-mission-trips-help-hurt": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "unreached-people-groups-closest-to-you": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "national-pastors-redefining-missionary": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "global-south-church-teach-suffering": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "mission-sending-culture-never-sent": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "pastor-politically-divided-gospel-central": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "engaging-nones-religiously-unaffiliated": {
    "pillar": 4,
    "subThemes": [],
    "confidence": "med"
  },
  "ai-authenticity-pastor-artificial-intelligence": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "church-political-brand-step-back": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "lead-when-trust-institutions-low": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "17-mobilizing-your-church-for-world-missions-without-a-big-budget": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "where-church-was-silent": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "justice-not-political-theological": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "complicity-not-innocence": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "poor-not-ministry-category": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "creation-care-not-optional": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "widow-orphan-stranger": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "mishpat-tsedaqah": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "micah-6-8-demands": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "church-credibility-problem": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "racial-reconciliation-without-repentance": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "prophetic-tradition-economic-justice": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "what-jubilee-means": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "stranger-at-gate": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "individual-sin-systemic-sin-2": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "why-poverty-political": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "high"
  },
  "church-wealth-world-poverty": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "payday-lending-christians": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "silence-abuse-church": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "high"
  },
  "imago-dei-means-more": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "good-samaritan-arguing": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "solidarity-theological-virtue": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "most-prophetic-live-differently": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "children-poverty-prophetic-indictment": {
    "pillar": 6,
    "subThemes": [
      "parenting",
      "vocation-work"
    ],
    "confidence": "med"
  },
  "symptoms-without-causes-charity": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "church-mental-health-justice": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "church-megaproject-widows-mite": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "white-churches-diversity": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "reaching-rich-comfortable": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "high"
  },
  "theology-of-repair": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "high"
  },
  "hospitality-not-optional": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "disability-justice-theological": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "earth-is-lords": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "ruth-gleaning-laws": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "church-comfort-inequality": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "prophetic-pastor": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "justice-without-love-ideology": {
    "pillar": 2,
    "subThemes": [],
    "confidence": "med"
  },
  "beatitudes-actually-promising": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "black-church-prophetic-justice": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "color-blindness-not-virtue": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "vulnerable-people-not-in-pews": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "prophets-expelled-sanctuary": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "exodus-demands-church-today": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "sabbath-is-resistance": {
    "pillar": 6,
    "subThemes": [
      "vocation-work",
      "practices"
    ],
    "confidence": "med"
  },
  "pastoral-care-wealthy-congregant": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "church-response-poverty-charity": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "leviticus-19-border-crisis": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "church-incarceration-silence": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "church-must-speak-housing": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "what-we-owe-generations": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "the-long-arc": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "greek-original-language-matters": {
    "pillar": 3,
    "subThemes": [],
    "confidence": "high"
  },
  "church-fathers-not-boring": {
    "pillar": 3,
    "subThemes": [],
    "confidence": "high"
  },
  "reformation-actually-about": {
    "pillar": 3,
    "subThemes": [],
    "confidence": "high"
  },
  "atonement-more-than-one-model": {
    "pillar": 3,
    "subThemes": [],
    "confidence": "high"
  },
  "kingdom-of-god-not-what-you-think": {
    "pillar": 3,
    "subThemes": [],
    "confidence": "med"
  },
  "psalms-as-prayer-not-poetry": {
    "pillar": 3,
    "subThemes": [],
    "confidence": "med"
  },
  "holy-spirit-not-feeling": {
    "pillar": 3,
    "subThemes": [],
    "confidence": "med"
  },
  "sin-not-just-what-you-do": {
    "pillar": 3,
    "subThemes": [],
    "confidence": "med"
  },
  "eschatology-matters-end-shapes-now": {
    "pillar": 3,
    "subThemes": [],
    "confidence": "med"
  },
  "incarnation-changes-everything": {
    "pillar": 3,
    "subThemes": [],
    "confidence": "med"
  },
  "when-shepherd-needs-shepherding": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "burnout-nobody-talks-about": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "sabbath-isnt-optional": {
    "pillar": 6,
    "subThemes": [
      "practices"
    ],
    "confidence": "high"
  },
  "your-marriage-is-ministry-too": {
    "pillar": 6,
    "subThemes": [
      "marriage-covenant",
      "family-household"
    ],
    "confidence": "med"
  },
  "weight-of-what-you-cant-say": {
    "pillar": 6,
    "subThemes": [
      "marriage-covenant"
    ],
    "confidence": "med"
  },
  "finding-your-barnabas": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "loneliness-of-leadership": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "delegation-is-not-weakness": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "vision-without-community-fantasy": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "pastors-authority-relational": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "conflict-is-not-failure": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "building-leadership-team": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "danger-pastoral-isolation": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "high"
  },
  "unity-without-uniformity": {
    "pillar": 4,
    "subThemes": [],
    "confidence": "med"
  },
  "courage-to-be-different": {
    "pillar": 4,
    "subThemes": [],
    "confidence": "med"
  },
  "collaboration-across-denominations": {
    "pillar": 4,
    "subThemes": [],
    "confidence": "med"
  },
  "global-church-is-your-church": {
    "pillar": 4,
    "subThemes": [],
    "confidence": "med"
  },
  "mission-is-not-optional": {
    "pillar": 4,
    "subThemes": [],
    "confidence": "med"
  },
  "your-city-is-mission-field": {
    "pillar": 4,
    "subThemes": [],
    "confidence": "med"
  },
  "church-response-to-culture": {
    "pillar": 4,
    "subThemes": [],
    "confidence": "med"
  },
  "truth-in-post-truth-world": {
    "pillar": 4,
    "subThemes": [],
    "confidence": "med"
  },
  "interior-life-of-pastor": {
    "pillar": 5,
    "subThemes": [],
    "confidence": "med"
  },
  "prayer-is-not-optional": {
    "pillar": 6,
    "subThemes": [
      "practices"
    ],
    "confidence": "med"
  },
  "scripture-meditation": {
    "pillar": 3,
    "subThemes": [],
    "confidence": "LOW"
  },
  "spiritual-disciplines-for-pastors": {
    "pillar": 6,
    "subThemes": [],
    "confidence": "med"
  },
  "the-examined-life": {
    "pillar": 6,
    "subThemes": [],
    "confidence": "med"
  },
  "repentance-and-renewal": {
    "pillar": 6,
    "subThemes": [],
    "confidence": "med"
  },
  "hope-of-resurrection": {
    "pillar": 6,
    "subThemes": [],
    "confidence": "med"
  },
  "justice-not-political": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  },
  "poor-not-ministry": {
    "pillar": 1,
    "subThemes": [],
    "confidence": "med"
  }
};
