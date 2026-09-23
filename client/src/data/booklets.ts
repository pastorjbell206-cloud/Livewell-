/**
 * The Hard Issues booklets — ten free PDF + EPUB booklets on eldership and
 * church governance, rendered at /resources/hard-issues-series.
 *
 * Kept as pure data (no imports) so the page and the build-time catalogue
 * (scripts/build-catalogue.mjs) read one list and can never drift.
 */
export type BookletGroup = "eldership" | "governing";

export interface Booklet {
  group: BookletGroup;
  slug: string;
  title: string;
  subtitle: string;
  note: string;
  pdf: string;
  epub: string;
}

export const BOOKLETS: Booklet[] = [
  {
    group: "eldership",
    slug: "what-elders-are-for",
    title: "What Elders Are For",
    subtitle: "A Biblical Job Description for the Men Who Lead the Church",
    note: "Before a team can lead well, it has to know what it was made to do.",
    pdf: "/ebook/what-elders-are-for/What-Elders-Are-For.pdf",
    epub: "/ebook/what-elders-are-for/What-Elders-Are-For.epub",
  },
  {
    group: "eldership",
    slug: "qualified-elder",
    title: "Qualified",
    subtitle:
      "Understanding the Elder Qualifications of 1 Timothy 3 and Titus 1 in Real Church Life",
    note: "The qualifications are not a checklist. They are a portrait of a man you would follow.",
    pdf: "/ebook/qualified-elder/Qualified.pdf",
    epub: "/ebook/qualified-elder/Qualified.epub",
  },
  {
    group: "eldership",
    slug: "finding-installing-elders",
    title: "Finding and Installing Elders",
    subtitle: "A Process for Identifying, Developing, and Commissioning Men to Lead",
    note: "Character is grown, not discovered. Here is how a church does the growing.",
    pdf: "/ebook/finding-installing-elders/Finding-and-Installing-Elders.pdf",
    epub: "/ebook/finding-installing-elders/Finding-and-Installing-Elders.epub",
  },
  {
    group: "eldership",
    slug: "when-elders-disagree",
    title: "When Elders Disagree",
    subtitle: "Handling Conflict, Dissent, and Division on the Elder Team",
    note: "A board that never disagrees is not unified. It is asleep.",
    pdf: "/ebook/when-elders-disagree/When-Elders-Disagree.pdf",
    epub: "/ebook/when-elders-disagree/When-Elders-Disagree.epub",
  },
  {
    group: "eldership",
    slug: "removing-an-elder",
    title: "Removing an Elder",
    subtitle: "The Most Difficult Act of Church Leadership — Done Biblically",
    note: "The work no one wants. Done wrong, it splits a church. Here it is done right.",
    pdf: "/ebook/removing-an-elder/Removing-an-Elder.pdf",
    epub: "/ebook/removing-an-elder/Removing-an-Elder.epub",
  },
  {
    group: "governing",
    slug: "deacon-qualifications",
    title: "Deacon Qualifications and Selection",
    subtitle: "Raising the Standard for Servant Leadership",
    note: "The men who serve set the tone of a church. Choosing them is not a formality.",
    pdf: "/ebook/deacon-qualifications/Deacon-Qualifications-and-Selection.pdf",
    epub: "/ebook/deacon-qualifications/Deacon-Qualifications-and-Selection.epub",
  },
  {
    group: "governing",
    slug: "church-governance",
    title: "Church Governance That Works",
    subtitle: "Polity, Structure, and Decision-Making for the Local Church",
    note: "Structure does not save a church. But the wrong structure can slowly bleed one dry.",
    pdf: "/ebook/church-governance/Church-Governance-That-Works.pdf",
    epub: "/ebook/church-governance/Church-Governance-That-Works.epub",
  },
  {
    group: "governing",
    slug: "the-patient-pastor",
    title: "The Patient Pastor",
    subtitle: "How to Lead Change Without Losing Your Church or Your Mind",
    note: "Most damage is done by men who were right and in a hurry. Patience is a skill.",
    pdf: "/ebook/the-patient-pastor/The-Patient-Pastor.pdf",
    epub: "/ebook/the-patient-pastor/The-Patient-Pastor.epub",
  },
  {
    group: "governing",
    slug: "change-without-casualties",
    title: "Change Without Casualties",
    subtitle: "A Playbook for Introducing Major Ministry Decisions",
    note: "A good decision delivered badly still costs you people. Here is how to deliver it.",
    pdf: "/ebook/change-without-casualties/Change-Without-Casualties.pdf",
    epub: "/ebook/change-without-casualties/Change-Without-Casualties.epub",
  },
  {
    group: "governing",
    slug: "changing-the-unchangeable",
    title: "Changing the Unchangeable",
    subtitle: "Leading Reform When 'We've Always Done It This Way'",
    note: "Every church has a wall marked do not touch. Some of those walls have to come down.",
    pdf: "/ebook/changing-the-unchangeable/Changing-the-Unchangeable.pdf",
    epub: "/ebook/changing-the-unchangeable/Changing-the-Unchangeable.epub",
  },
];
