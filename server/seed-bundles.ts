import { getDb } from "./db";

// Note: This is a placeholder - bundles schema needs to be added to drizzle/schema.ts first

export async function seedBundles() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    return;
  }

  const bundlesData = [
    // Pillar-Specific Bundles
    {
      title: "Prophetic Disruption Starter",
      slug: "prophetic-disruption-starter",
      pillar: "Prophetic Disruption",
      category: "Pillar Starter",
      price: 29.99,
      originalPrice: 49.99,
      discount: 40,
      description: "Essential guide to prophetic ministry in a compromised culture",
      longDescription:
        "Learn the foundations of prophetic voice with this starter bundle. Includes foundational articles, the Prophetic Manifesto guide, discernment worksheet, and a 5-day email course.",
      imageUrl: "https://livewell.com/images/bundles/prophetic-disruption.jpg",
      isActive: true,
      isFeatured: true,
      sortOrder: 1,
    },
    {
      title: "Theological Depth Mastery",
      slug: "theological-depth-mastery",
      pillar: "Theological Depth",
      category: "Pillar Starter",
      price: 49.99,
      originalPrice: 79.99,
      discount: 37,
      description: "Comprehensive theology study with Greek and Hebrew foundations",
      longDescription:
        "Deep dive into systematic theology with 10 core articles, theology workbook, Greek/Hebrew word studies, and 3 hours of video lectures.",
      imageUrl: "https://livewell.com/images/bundles/theological-depth.jpg",
      isActive: true,
      isFeatured: true,
      sortOrder: 2,
    },
    {
      title: "Justice & Mercy Practitioner",
      slug: "justice-mercy-practitioner",
      pillar: "Prophetic Justice",
      category: "Pillar Starter",
      price: 39.99,
      originalPrice: 64.99,
      discount: 38,
      description: "Practical guide to Christian social engagement and justice ministry",
      longDescription:
        "Learn to apply biblical justice principles with community action roadmap, 5 real-world case studies, advocacy toolkit, and group discussion guide.",
      imageUrl: "https://livewell.com/images/bundles/justice-mercy.jpg",
      isActive: true,
      isFeatured: true,
      sortOrder: 3,
    },
    {
      title: "Integrated Life Transformation",
      slug: "integrated-life-transformation",
      pillar: "Integrated Life",
      category: "Pillar Starter",
      price: 44.99,
      originalPrice: 74.99,
      discount: 40,
      description: "Transform your whole life: marriage, work, finances, and rest",
      longDescription:
        "Holistic life transformation with life diagnostic assessment, marriage/family guide, work & calling workbook, rest & sabbath guide, and 30-day challenge.",
      imageUrl: "https://livewell.com/images/bundles/integrated-life.jpg",
      isActive: true,
      isFeatured: true,
      sortOrder: 4,
    },
    {
      title: "Leadership Formation Intensive",
      slug: "leadership-formation-intensive",
      pillar: "Leadership Formation",
      category: "Pillar Starter",
      price: 59.99,
      originalPrice: 99.99,
      discount: 40,
      description: "Develop the interior life that sustains effective leadership",
      longDescription:
        "Complete leadership development with leadership audit, interior life study, mentoring framework, difficult conversations guide, and vision casting workbook.",
      imageUrl: "https://livewell.com/images/bundles/leadership-formation.jpg",
      isActive: true,
      isFeatured: true,
      sortOrder: 5,
    },

    // Seasonal Bundles
    {
      title: "Easter Theology Bundle",
      slug: "easter-theology-bundle",
      pillar: "Cross-Pillar",
      category: "Seasonal",
      price: 34.99,
      originalPrice: 54.99,
      discount: 36,
      description: "Deep theology of redemption and resurrection for Easter",
      longDescription:
        "Prepare for Easter with redemption & grace study, resurrection theology, gospel proclamation guide, and 7-day devotional.",
      imageUrl: "https://livewell.com/images/bundles/easter.jpg",
      isActive: true,
      isFeatured: false,
      sortOrder: 10,
    },
    {
      title: "Christmas Incarnation Bundle",
      slug: "christmas-incarnation-bundle",
      pillar: "Cross-Pillar",
      category: "Seasonal",
      price: 34.99,
      originalPrice: 54.99,
      discount: 36,
      description: "Incarnation theology and cultural commentary for Christmas",
      longDescription:
        "Celebrate Christmas with incarnation theology deep dive, cultural commentary, family devotional guide, and outreach materials.",
      imageUrl: "https://livewell.com/images/bundles/christmas.jpg",
      isActive: true,
      isFeatured: false,
      sortOrder: 11,
    },

    // Audience-Specific Bundles
    {
      title: "Pastor's Toolkit",
      slug: "pastors-toolkit",
      pillar: "Cross-Pillar",
      category: "Audience Specific",
      price: 79.99,
      originalPrice: 129.99,
      discount: 38,
      description: "Complete resource kit for pastoral ministry and leadership",
      longDescription:
        "All leadership resources plus 12 sermon outlines, discussion guides, congregational resources, and pastoral wisdom for difficult situations.",
      imageUrl: "https://livewell.com/images/bundles/pastors-toolkit.jpg",
      isActive: true,
      isFeatured: true,
      sortOrder: 20,
    },
    {
      title: "Small Group Leader's Pack",
      slug: "small-group-leaders-pack",
      pillar: "Cross-Pillar",
      category: "Audience Specific",
      price: 49.99,
      originalPrice: 79.99,
      discount: 37,
      description: "12-week curriculum for leading transformative small groups",
      longDescription:
        "Complete small group curriculum with discussion guides, video content, leader's manual, and reproducible handouts.",
      imageUrl: "https://livewell.com/images/bundles/small-group.jpg",
      isActive: true,
      isFeatured: false,
      sortOrder: 21,
    },
    {
      title: "Student & Young Adult Bundle",
      slug: "student-young-adult-bundle",
      pillar: "Cross-Pillar",
      category: "Audience Specific",
      price: 24.99,
      originalPrice: 44.99,
      discount: 44,
      description: "Theology and life guidance for the next generation",
      longDescription:
        "Culturally relevant theology for young adults with cultural discernment guide, prophetic voice for your generation, work & calling for early career, and discipleship guide.",
      imageUrl: "https://livewell.com/images/bundles/young-adult.jpg",
      isActive: true,
      isFeatured: false,
      sortOrder: 22,
    },
    {
      title: "Women's Leadership Bundle",
      slug: "womens-leadership-bundle",
      pillar: "Cross-Pillar",
      category: "Audience Specific",
      price: 44.99,
      originalPrice: 74.99,
      discount: 40,
      description: "Leadership formation specifically for women in ministry",
      longDescription:
        "Women-focused leadership development with women in prophetic ministry guide, integrated life for women, leadership formation for women, and mentoring guide.",
      imageUrl: "https://livewell.com/images/bundles/womens-leadership.jpg",
      isActive: true,
      isFeatured: false,
      sortOrder: 23,
    },
    {
      title: "Parent's Wisdom Bundle",
      slug: "parents-wisdom-bundle",
      pillar: "Integrated Life",
      category: "Audience Specific",
      price: 39.99,
      originalPrice: 64.99,
      discount: 38,
      description: "Biblical parenting and family discipleship guide",
      longDescription:
        "Parenting resources with marriage & family theology, child development from biblical perspective, discipleship of children, and family devotional guide.",
      imageUrl: "https://livewell.com/images/bundles/parenting.jpg",
      isActive: true,
      isFeatured: false,
      sortOrder: 24,
    },

    // Mega Bundles
    {
      title: "Complete LiveWell Starter",
      slug: "complete-livewell-starter",
      pillar: "Cross-Pillar",
      category: "Mega Bundle",
      price: 99.99,
      originalPrice: 199.99,
      discount: 50,
      description: "All five pillar bundles plus exclusive bonuses",
      longDescription:
        "Complete introduction to LiveWell with all 5 pillar bundles, reading pathways guide, 6-month video library access, and email community access.",
      imageUrl: "https://livewell.com/images/bundles/complete-starter.jpg",
      isActive: true,
      isFeatured: true,
      sortOrder: 30,
    },
    {
      title: "Prophetic Practitioner's Collection",
      slug: "prophetic-practitioners-collection",
      pillar: "Prophetic Disruption",
      category: "Mega Bundle",
      price: 89.99,
      originalPrice: 149.99,
      discount: 40,
      description: "Everything for developing and living out prophetic ministry",
      longDescription:
        "Prophetic Disruption bundle + Justice & Mercy bundle + Leadership Formation bundle + exclusive prophetic case studies and mentoring guide.",
      imageUrl: "https://livewell.com/images/bundles/prophetic-collection.jpg",
      isActive: true,
      isFeatured: false,
      sortOrder: 31,
    },
    {
      title: "Theologian's Library",
      slug: "theologians-library",
      pillar: "Theological Depth",
      category: "Mega Bundle",
      price: 94.99,
      originalPrice: 159.99,
      discount: 41,
      description: "Comprehensive theology study with all depth resources",
      longDescription:
        "Theological Depth bundle + Church History course + Spiritual Warfare study + Biblical languages guide + exclusive theology lectures.",
      imageUrl: "https://livewell.com/images/bundles/theology-library.jpg",
      isActive: true,
      isFeatured: false,
      sortOrder: 32,
    },

    // Membership
    {
      title: "LiveWell Annual Membership",
      slug: "livewell-annual-membership",
      pillar: "Cross-Pillar",
      category: "Membership",
      price: 199.0,
      originalPrice: 299.0,
      discount: 33,
      description: "Full year of unlimited access to all LiveWell resources",
      longDescription:
        "Annual membership includes all resources + new monthly content, exclusive video teachings, monthly group calls, community forum access, and 20% discount on all products.",
      imageUrl: "https://livewell.com/images/bundles/membership.jpg",
      isActive: true,
      isFeatured: true,
      sortOrder: 40,
    },
    {
      title: "LiveWell Monthly Membership",
      slug: "livewell-monthly-membership",
      pillar: "Cross-Pillar",
      category: "Membership",
      price: 19.99,
      originalPrice: 29.99,
      discount: 33,
      description: "Monthly access to all LiveWell resources",
      longDescription:
        "Monthly membership includes all resources, new monthly content, exclusive videos, community access, and 15% discount on products. Cancel anytime.",
      imageUrl: "https://livewell.com/images/bundles/membership-monthly.jpg",
      isActive: true,
      isFeatured: false,
      sortOrder: 41,
    },
  ];

  try {
    console.log("🌱 Seeding product bundles...");
    // Note: This would insert into the bundles table once schema is added
    console.log(`✓ Would add ${bundlesData.length} bundles`);
    console.log("✅ Bundle seeding ready!");
  } catch (error) {
    console.error("Error seeding bundles:", error);
  }
}
