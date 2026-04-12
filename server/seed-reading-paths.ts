import { getDb } from "./db";
import { readingPaths } from "../drizzle/schema";

export async function seedReadingPaths() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    return;
  }

  const pathsData = [
    // Foundational Paths
    {
      title: "New to LiveWell: Start Here",
      slug: "new-to-livewell",
      description: "A curated introduction to James Bell's core teachings and the five pillars",
      pillar: "Leadership Formation",
      difficulty: "Beginner",
      estimatedDays: 7,
      articleCount: 5,
      imageUrl: "https://livewell.com/images/paths/start-here.jpg",
    },
    {
      title: "Biblical Foundations: Know What You Believe",
      slug: "biblical-foundations",
      description: "Essential theology and biblical literacy for every Christian",
      pillar: "Theological Depth",
      difficulty: "Beginner",
      estimatedDays: 14,
      articleCount: 8,
      imageUrl: "https://livewell.com/images/paths/biblical-foundations.jpg",
    },
    {
      title: "Spiritual Disciplines: Transform Your Inner Life",
      slug: "spiritual-disciplines",
      description: "Ancient practices for modern spiritual growth and transformation",
      pillar: "Integrated Life",
      difficulty: "Beginner",
      estimatedDays: 21,
      articleCount: 10,
      imageUrl: "https://livewell.com/images/paths/spiritual-disciplines.jpg",
    },

    // Prophetic Paths
    {
      title: "Prophetic Voice: Speaking Truth in a Compromised Culture",
      slug: "prophetic-voice",
      description: "Developing courage to speak biblical truth in an increasingly hostile environment",
      pillar: "Prophetic Disruption",
      difficulty: "Intermediate",
      estimatedDays: 21,
      articleCount: 10,
      imageUrl: "https://livewell.com/images/paths/prophetic-voice.jpg",
    },
    {
      title: "Justice & Mercy: A Biblical Approach to Social Issues",
      slug: "justice-mercy",
      description: "Understanding biblical justice and how Christians should engage social problems",
      pillar: "Prophetic Justice",
      difficulty: "Intermediate",
      estimatedDays: 28,
      articleCount: 12,
      imageUrl: "https://livewell.com/images/paths/justice-mercy.jpg",
    },
    {
      title: "Cultural Discernment: Reading the Times",
      slug: "cultural-discernment",
      description: "Learning to analyze cultural moments through a biblical lens",
      pillar: "Prophetic Disruption",
      difficulty: "Intermediate",
      estimatedDays: 21,
      articleCount: 9,
      imageUrl: "https://livewell.com/images/paths/cultural-discernment.jpg",
    },

    // Leadership Paths
    {
      title: "Pastoral Leadership: Leading from the Inside Out",
      slug: "pastoral-leadership",
      description: "Developing the interior spiritual life that sustains effective ministry",
      pillar: "Leadership Formation",
      difficulty: "Advanced",
      estimatedDays: 35,
      articleCount: 15,
      imageUrl: "https://livewell.com/images/paths/pastoral-leadership.jpg",
    },
    {
      title: "Mentoring & Discipleship: Reproducing Leaders",
      slug: "mentoring-discipleship",
      description: "How to invest in others and multiply your leadership impact",
      pillar: "Leadership Formation",
      difficulty: "Intermediate",
      estimatedDays: 21,
      articleCount: 10,
      imageUrl: "https://livewell.com/images/paths/mentoring.jpg",
    },
    {
      title: "Difficult Conversations: Leading with Courage",
      slug: "difficult-conversations",
      description: "Navigating conflict, confrontation, and hard decisions as a leader",
      pillar: "Leadership Formation",
      difficulty: "Intermediate",
      estimatedDays: 14,
      articleCount: 7,
      imageUrl: "https://livewell.com/images/paths/difficult-conversations.jpg",
    },
    {
      title: "Vision & Strategy: Leading with Purpose",
      slug: "vision-strategy",
      description: "Articulating and pursuing God's vision for your ministry or organization",
      pillar: "Leadership Formation",
      difficulty: "Advanced",
      estimatedDays: 28,
      articleCount: 12,
      imageUrl: "https://livewell.com/images/paths/vision-strategy.jpg",
    },

    // Life Integration Paths
    {
      title: "Marriage & Family: Building Christ-Centered Homes",
      slug: "marriage-family",
      description: "Biblical wisdom for marriage, parenting, and healthy family life",
      pillar: "Integrated Life",
      difficulty: "Beginner",
      estimatedDays: 21,
      articleCount: 10,
      imageUrl: "https://livewell.com/images/paths/marriage-family.jpg",
    },
    {
      title: "Work & Calling: Finding Purpose in Your Vocation",
      slug: "work-calling",
      description: "Understanding your work as a calling and living it with kingdom purpose",
      pillar: "Integrated Life",
      difficulty: "Intermediate",
      estimatedDays: 14,
      articleCount: 8,
      imageUrl: "https://livewell.com/images/paths/work-calling.jpg",
    },
    {
      title: "Finances & Stewardship: Money with Purpose",
      slug: "finances-stewardship",
      description: "Biblical principles for managing money, generosity, and financial freedom",
      pillar: "Integrated Life",
      difficulty: "Beginner",
      estimatedDays: 14,
      articleCount: 7,
      imageUrl: "https://livewell.com/images/paths/finances.jpg",
    },
    {
      title: "Rest & Renewal: Recovering Biblical Sabbath",
      slug: "rest-renewal",
      description: "Breaking free from burnout through biblical rest and spiritual renewal",
      pillar: "Integrated Life",
      difficulty: "Beginner",
      estimatedDays: 10,
      articleCount: 6,
      imageUrl: "https://livewell.com/images/paths/rest-renewal.jpg",
    },

    // Theology Paths
    {
      title: "God's Character: Who Is God?",
      slug: "gods-character",
      description: "Deep study of God's attributes, nature, and character revealed in Scripture",
      pillar: "Theological Depth",
      difficulty: "Intermediate",
      estimatedDays: 28,
      articleCount: 12,
      imageUrl: "https://livewell.com/images/paths/gods-character.jpg",
    },
    {
      title: "Redemption & Grace: The Gospel Explained",
      slug: "redemption-grace",
      description: "Understanding the gospel, salvation, and God's redemptive plan",
      pillar: "Theological Depth",
      difficulty: "Intermediate",
      estimatedDays: 21,
      articleCount: 10,
      imageUrl: "https://livewell.com/images/paths/redemption-grace.jpg",
    },
    {
      title: "Church History: Learning from the Past",
      slug: "church-history",
      description: "Key figures, movements, and lessons from 2000 years of Christian history",
      pillar: "Theological Depth",
      difficulty: "Advanced",
      estimatedDays: 35,
      articleCount: 15,
      imageUrl: "https://livewell.com/images/paths/church-history.jpg",
    },

    // Specialized Paths
    {
      title: "Spiritual Warfare: Understanding the Invisible Battle",
      slug: "spiritual-warfare",
      description: "Biblical perspective on spiritual conflict, victory, and Christian armor",
      pillar: "Theological Depth",
      difficulty: "Advanced",
      estimatedDays: 21,
      articleCount: 10,
      imageUrl: "https://livewell.com/images/paths/spiritual-warfare.jpg",
    },
    {
      title: "Prayer & Intercession: Accessing God's Power",
      slug: "prayer-intercession",
      description: "Understanding and practicing biblical prayer for personal and corporate transformation",
      pillar: "Theological Depth",
      difficulty: "Intermediate",
      estimatedDays: 21,
      articleCount: 10,
      imageUrl: "https://livewell.com/images/paths/prayer.jpg",
    },
    {
      title: "Evangelism & Gospel Witness: Sharing Your Faith",
      slug: "evangelism-witness",
      description: "Sharing the gospel with clarity, compassion, and confidence",
      pillar: "Prophetic Disruption",
      difficulty: "Intermediate",
      estimatedDays: 14,
      articleCount: 8,
      imageUrl: "https://livewell.com/images/paths/evangelism.jpg",
    },
  ];

  try {
    for (const path of pathsData) {
      await (db as any).insert(readingPaths).values(path).onDuplicateKeyUpdate({
        set: {
          title: path.title,
          description: path.description,
        },
      });
    }
    console.log(`✓ Seeded ${pathsData.length} reading paths`);
  } catch (error) {
    console.error("Error seeding reading paths:", error);
  }
}
