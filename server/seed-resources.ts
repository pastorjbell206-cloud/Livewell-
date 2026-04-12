import { getDb } from "./db";
import { resources } from "../drizzle/schema";

export async function seedResources() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    return;
  }

  const resourcesData = [
    // Prophetic Disruption Resources
    {
      title: "The Prophetic Manifesto: 5 Principles for Speaking Truth",
      description: "A comprehensive guide to prophetic ministry in a compromised culture",
      pillar: "Prophetic Disruption",
      category: "Guide",
      url: "https://livewell.com/resources/prophetic-manifesto",
      downloadUrl: "https://livewell.com/downloads/prophetic-manifesto.pdf",
      type: "PDF",
    },
    {
      title: "Discerning the Signs of the Times",
      description: "Learn to read cultural moments through a biblical lens",
      pillar: "Prophetic Disruption",
      category: "Course",
      url: "https://livewell.com/resources/discerning-signs",
      downloadUrl: "https://livewell.com/downloads/discerning-signs.pdf",
      type: "PDF",
    },
    {
      title: "Prophetic Courage: Standing Alone When Necessary",
      description: "Developing the spiritual backbone to speak unpopular truths",
      pillar: "Prophetic Disruption",
      category: "Workbook",
      url: "https://livewell.com/resources/prophetic-courage",
      downloadUrl: "https://livewell.com/downloads/prophetic-courage.pdf",
      type: "PDF",
    },
    {
      title: "The Cost of Compromise: Biblical Examples & Modern Parallels",
      description: "Historical and contemporary case studies of spiritual compromise",
      pillar: "Prophetic Disruption",
      category: "Study",
      url: "https://livewell.com/resources/cost-of-compromise",
      downloadUrl: "https://livewell.com/downloads/cost-of-compromise.pdf",
      type: "PDF",
    },
    {
      title: "Speaking to Power: A Prophetic Handbook",
      description: "How to address injustice and corruption with biblical authority",
      pillar: "Prophetic Disruption",
      category: "Guide",
      url: "https://livewell.com/resources/speaking-to-power",
      downloadUrl: "https://livewell.com/downloads/speaking-to-power.pdf",
      type: "PDF",
    },

    // Theological Depth Resources
    {
      title: "Theology Workbook: Deep Dive into Biblical Foundations",
      description: "Systematic theology applied to Christian living",
      pillar: "Theological Depth",
      category: "Workbook",
      url: "https://livewell.com/resources/theology-workbook",
      downloadUrl: "https://livewell.com/downloads/theology-workbook.pdf",
      type: "PDF",
    },
    {
      title: "Greek & Hebrew Word Studies for Pastors",
      description: "Essential biblical language tools for deeper understanding",
      pillar: "Theological Depth",
      category: "Reference",
      url: "https://livewell.com/resources/word-studies",
      downloadUrl: "https://livewell.com/downloads/word-studies.pdf",
      type: "PDF",
    },
    {
      title: "Church History Essentials: Lessons for Today",
      description: "Learning from 2000 years of Christian tradition and mistakes",
      pillar: "Theological Depth",
      category: "Course",
      url: "https://livewell.com/resources/church-history",
      downloadUrl: "https://livewell.com/downloads/church-history.pdf",
      type: "PDF",
    },
    {
      title: "Systematic Theology Study Guide",
      description: "A structured approach to understanding God's nature and character",
      pillar: "Theological Depth",
      category: "Study",
      url: "https://livewell.com/resources/systematic-theology",
      downloadUrl: "https://livewell.com/downloads/systematic-theology.pdf",
      type: "PDF",
    },
    {
      title: "Biblical Interpretation Methods: Hermeneutics 101",
      description: "How to read and understand Scripture accurately",
      pillar: "Theological Depth",
      category: "Guide",
      url: "https://livewell.com/resources/hermeneutics",
      downloadUrl: "https://livewell.com/downloads/hermeneutics.pdf",
      type: "PDF",
    },

    // Prophetic Justice Resources
    {
      title: "Community Action Roadmap: Justice-Oriented Ministry",
      description: "Practical steps for addressing systemic injustice",
      pillar: "Prophetic Justice",
      category: "Guide",
      url: "https://livewell.com/resources/community-action",
      downloadUrl: "https://livewell.com/downloads/community-action.pdf",
      type: "PDF",
    },
    {
      title: "The Church's Role in Social Justice",
      description: "Biblical foundation for Christian social engagement",
      pillar: "Prophetic Justice",
      category: "Study",
      url: "https://livewell.com/resources/church-justice",
      downloadUrl: "https://livewell.com/downloads/church-justice.pdf",
      type: "PDF",
    },
    {
      title: "Advocacy Toolkit for Christian Leaders",
      description: "How to effectively advocate for vulnerable populations",
      pillar: "Prophetic Justice",
      category: "Toolkit",
      url: "https://livewell.com/resources/advocacy-toolkit",
      downloadUrl: "https://livewell.com/downloads/advocacy-toolkit.pdf",
      type: "PDF",
    },
    {
      title: "Racial Reconciliation: A Biblical Framework",
      description: "Understanding and addressing racial division through Scripture",
      pillar: "Prophetic Justice",
      category: "Study",
      url: "https://livewell.com/resources/racial-reconciliation",
      downloadUrl: "https://livewell.com/downloads/racial-reconciliation.pdf",
      type: "PDF",
    },
    {
      title: "Economic Justice & Christian Witness",
      description: "Biblical principles for addressing poverty and economic inequality",
      pillar: "Prophetic Justice",
      category: "Guide",
      url: "https://livewell.com/resources/economic-justice",
      downloadUrl: "https://livewell.com/downloads/economic-justice.pdf",
      type: "PDF",
    },

    // Integrated Life Resources
    {
      title: "Life Diagnostic: Assess Your Spiritual Health",
      description: "A comprehensive assessment tool for spiritual, relational, and vocational health",
      pillar: "Integrated Life",
      category: "Assessment",
      url: "https://livewell.com/resources/life-diagnostic",
      downloadUrl: "https://livewell.com/downloads/life-diagnostic.pdf",
      type: "PDF",
    },
    {
      title: "Marriage & Family: Building Christ-Centered Homes",
      description: "Biblical wisdom for marriage, parenting, and family life",
      pillar: "Integrated Life",
      category: "Workbook",
      url: "https://livewell.com/resources/marriage-family",
      downloadUrl: "https://livewell.com/downloads/marriage-family.pdf",
      type: "PDF",
    },
    {
      title: "Finances & Stewardship: A Christian Approach",
      description: "Managing money with biblical wisdom and generosity",
      pillar: "Integrated Life",
      category: "Guide",
      url: "https://livewell.com/resources/finances-stewardship",
      downloadUrl: "https://livewell.com/downloads/finances-stewardship.pdf",
      type: "PDF",
    },
    {
      title: "Work, Calling & Vocation",
      description: "Finding purpose and meaning in your daily work",
      pillar: "Integrated Life",
      category: "Study",
      url: "https://livewell.com/resources/work-calling",
      downloadUrl: "https://livewell.com/downloads/work-calling.pdf",
      type: "PDF",
    },
    {
      title: "Rest, Sabbath & Spiritual Renewal",
      description: "Recovering the biblical practice of rest in a busy world",
      pillar: "Integrated Life",
      category: "Guide",
      url: "https://livewell.com/resources/rest-sabbath",
      downloadUrl: "https://livewell.com/downloads/rest-sabbath.pdf",
      type: "PDF",
    },

    // Leadership Formation Resources
    {
      title: "Leadership Audit: Evaluate Your Leadership Effectiveness",
      description: "A self-assessment tool for leaders committed to growth",
      pillar: "Leadership Formation",
      category: "Assessment",
      url: "https://livewell.com/resources/leadership-audit",
      downloadUrl: "https://livewell.com/downloads/leadership-audit.pdf",
      type: "PDF",
    },
    {
      title: "The Interior Life of a Leader",
      description: "Developing spiritual depth as the foundation for leadership",
      pillar: "Leadership Formation",
      category: "Study",
      url: "https://livewell.com/resources/interior-life",
      downloadUrl: "https://livewell.com/downloads/interior-life.pdf",
      type: "PDF",
    },
    {
      title: "Mentoring & Discipleship: Reproducing Leaders",
      description: "How to invest in others and multiply your leadership impact",
      pillar: "Leadership Formation",
      category: "Guide",
      url: "https://livewell.com/resources/mentoring-discipleship",
      downloadUrl: "https://livewell.com/downloads/mentoring-discipleship.pdf",
      type: "PDF",
    },
    {
      title: "Difficult Conversations: Leading with Courage",
      description: "Navigating conflict and confrontation as a leader",
      pillar: "Leadership Formation",
      category: "Workbook",
      url: "https://livewell.com/resources/difficult-conversations",
      downloadUrl: "https://livewell.com/downloads/difficult-conversations.pdf",
      type: "PDF",
    },
    {
      title: "Vision Casting & Strategic Leadership",
      description: "Articulating and pursuing God's vision for your ministry",
      pillar: "Leadership Formation",
      category: "Guide",
      url: "https://livewell.com/resources/vision-casting",
      downloadUrl: "https://livewell.com/downloads/vision-casting.pdf",
      type: "PDF",
    },
    {
      title: "Burnout Prevention for Christian Leaders",
      description: "Sustaining your leadership over the long haul",
      pillar: "Leadership Formation",
      category: "Study",
      url: "https://livewell.com/resources/burnout-prevention",
      downloadUrl: "https://livewell.com/downloads/burnout-prevention.pdf",
      type: "PDF",
    },

    // Cross-Pillar Resources
    {
      title: "Spiritual Disciplines for Transformation",
      description: "Ancient practices for modern spiritual growth",
      pillar: "Leadership Formation",
      category: "Guide",
      url: "https://livewell.com/resources/spiritual-disciplines",
      downloadUrl: "https://livewell.com/downloads/spiritual-disciplines.pdf",
      type: "PDF",
    },
    {
      title: "Prayer & Intercession: A Comprehensive Guide",
      description: "Understanding and practicing biblical prayer",
      pillar: "Theological Depth",
      category: "Study",
      url: "https://livewell.com/resources/prayer-intercession",
      downloadUrl: "https://livewell.com/downloads/prayer-intercession.pdf",
      type: "PDF",
    },
    {
      title: "Scripture Memorization: Hiding God's Word in Your Heart",
      description: "Practical methods for internalizing Scripture",
      pillar: "Theological Depth",
      category: "Guide",
      url: "https://livewell.com/resources/scripture-memorization",
      downloadUrl: "https://livewell.com/downloads/scripture-memorization.pdf",
      type: "PDF",
    },
    {
      title: "Evangelism & Gospel Witness",
      description: "Sharing your faith with clarity and compassion",
      pillar: "Prophetic Disruption",
      category: "Guide",
      url: "https://livewell.com/resources/evangelism-witness",
      downloadUrl: "https://livewell.com/downloads/evangelism-witness.pdf",
      type: "PDF",
    },
    {
      title: "Spiritual Warfare: Understanding the Invisible Battle",
      description: "Biblical perspective on spiritual conflict and victory",
      pillar: "Theological Depth",
      category: "Study",
      url: "https://livewell.com/resources/spiritual-warfare",
      downloadUrl: "https://livewell.com/downloads/spiritual-warfare.pdf",
      type: "PDF",
    },
  ];

  try {
    for (const resource of resourcesData) {
      await (db as any).insert(resources).values(resource).onDuplicateKeyUpdate({
        set: {
          title: resource.title,
          description: resource.description,
        },
      });
    }
    console.log(`✓ Seeded ${resourcesData.length} resources`);
  } catch (error) {
    console.error("Error seeding resources:", error);
  }
}
