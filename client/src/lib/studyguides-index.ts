/**
 * Index of the study guides (Leader's Toolkits) that live as JSON in
 * client/public/studyguides/<slug>.json. This is the manifest the
 * /studyguides index page renders. Add a new guide here when its JSON and
 * its built PDFs (scripts/build-pdfs.mjs) ship. The full guide content is in
 * the JSON; this is only the card-level metadata for the listing.
 */
export interface StudyGuideEntry {
  slug: string;
  title: string;
  /** One-line topical label for the card (shorter than the JSON subtitle). */
  eyebrow: string;
  blurb: string;
  audience: string;
  sessionsLabel: string;
}

export const STUDY_GUIDES: StudyGuideEntry[] = [
  {
    slug: "anxiety",
    title: "Consider the Birds",
    eyebrow: "Anxiety and the peace of Christ",
    blurb:
      "What Scripture says about anxiety, and the peace Christ gives instead. Honest about the kind that needs a doctor; pastoral about the kind that needs the Father. Companion to the book.",
    audience: "Small groups, adult Sunday school, and individuals",
    sessionsLabel: "5 sessions (run as 5, 8, or 4 weeks)",
  },
  {
    slug: "money",
    title: "Where Your Treasure Is",
    eyebrow: "Money and the heart",
    blurb:
      "Greed, contentment, debt, and generosity — what the heart does with treasure, and the freedom Christ offers the worried and the wealthy alike. Companion to the book.",
    audience: "Small groups, adult Sunday school, and individuals",
    sessionsLabel: "5 sessions (run as 5, 8, or 4 weeks)",
  },
  {
    slug: "marriage",
    title: "Covenant",
    eyebrow: "Marriage, past the tips",
    blurb:
      "Marriage as covenant, not contract — conflict and forgiveness, faithfulness, and the gospel shape of staying. Written from inside a marriage, not above one.",
    audience: "Married couples, engaged couples, and small groups",
    sessionsLabel: "5 sessions (run as 5, 8, or 4 weeks)",
  },
  {
    slug: "doubt",
    title: "When Faith Has Questions",
    eyebrow: "Doubt and deconstruction",
    blurb:
      "Suffering, the hiddenness of God, the reliability of Scripture, the wounds of the church. Every hard question taken at full strength before any answer. A safe room for the doubter.",
    audience: "Skeptics, Christians with questions, small groups, and individuals",
    sessionsLabel: "5 sessions (run as 5, 8, or 4 weeks)",
  },
  {
    slug: "christian-nationalism",
    title: "Christian Nationalism",
    eyebrow: "Faith and the flag",
    blurb:
      "A pastoral, even-handed study that names what Christian nationalism is and is not, indicts every tribe, and keeps the cross over the flag.",
    audience: "Small groups, adult Sunday school, and individuals",
    sessionsLabel: "5 sessions (run as 5, 8, or 4 weeks)",
  },
  {
    slug: "church-and-empire",
    title: "Church and Empire",
    eyebrow: "The church and political power",
    blurb:
      "How the church relates to political power, from a denarius in a trap to the end of Christendom, keeping the crucified King above every throne.",
    audience: "Small groups, adult Sunday school, and individuals",
    sessionsLabel: "5 sessions (run as 5, 8, or 4 weeks)",
  },
  {
    slug: "economic-justice",
    title: "Economic Justice",
    eyebrow: "The gospel and money",
    blurb:
      "Refusing both the preacher who blesses your portfolio and the politics that swallows the gospel, and keeping the cross at the center of money.",
    audience: "Small groups, adult Sunday school, and individuals",
    sessionsLabel: "5 sessions (run as 5, 8, or 4 weeks)",
  },
  {
    slug: "pastoral-health",
    title: "The Health of the Pastor",
    eyebrow: "For leaders and those who love them",
    blurb:
      "The exhaustion, hiddenness, and quiet despair of the people who shepherd us — built for boards and leadership teams to read alongside their pastor.",
    audience: "Pastors, elder boards, and church leadership teams",
    sessionsLabel: "5 sessions (run as 5, 8, or 4 weeks)",
  },
];
