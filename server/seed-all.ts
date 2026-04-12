import { getDb } from "./db";
import { resources, readingPaths } from "../drizzle/schema";

async function main() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    process.exit(1);
  }

  const resourcesList = [
    { title: "The Prophetic Manifesto", pillar: "Prophetic Disruption", category: "Guide", description: "5 principles for speaking truth" },
    { title: "Theology Workbook", pillar: "Theological Depth", category: "Workbook", description: "Deep dive into biblical foundations" },
    { title: "Community Action Roadmap", pillar: "Prophetic Justice", category: "Guide", description: "Practical steps for justice ministry" },
    { title: "Life Diagnostic", pillar: "Integrated Life", category: "Assessment", description: "Assess your spiritual health" },
    { title: "Leadership Audit", pillar: "Leadership Formation", category: "Assessment", description: "Evaluate your leadership effectiveness" },
    { title: "Discerning the Signs", pillar: "Prophetic Disruption", category: "Course", description: "Read cultural moments biblically" },
    { title: "Prophetic Courage", pillar: "Prophetic Disruption", category: "Workbook", description: "Standing alone when necessary" },
    { title: "Greek & Hebrew Studies", pillar: "Theological Depth", category: "Reference", description: "Essential biblical language tools" },
    { title: "Church History Essentials", pillar: "Theological Depth", category: "Course", description: "Lessons from 2000 years" },
    { title: "Racial Reconciliation", pillar: "Prophetic Justice", category: "Study", description: "Biblical framework for unity" },
  ];

  const pathsList = [
    { title: "New to LiveWell: Start Here", slug: "new-to-livewell", pillar: "Leadership Formation", difficulty: "Beginner", estimatedDays: 7 },
    { title: "Biblical Foundations", slug: "biblical-foundations", pillar: "Theological Depth", difficulty: "Beginner", estimatedDays: 14 },
    { title: "Prophetic Voice", slug: "prophetic-voice", pillar: "Prophetic Disruption", difficulty: "Intermediate", estimatedDays: 21 },
    { title: "Pastoral Leadership", slug: "pastoral-leadership", pillar: "Leadership Formation", difficulty: "Advanced", estimatedDays: 35 },
    { title: "Marriage & Family", slug: "marriage-family", pillar: "Integrated Life", difficulty: "Beginner", estimatedDays: 21 },
    { title: "Justice & Mercy", slug: "justice-mercy", pillar: "Prophetic Justice", difficulty: "Intermediate", estimatedDays: 28 },
    { title: "Cultural Discernment", slug: "cultural-discernment", pillar: "Prophetic Disruption", difficulty: "Intermediate", estimatedDays: 21 },
    { title: "Mentoring & Discipleship", slug: "mentoring-discipleship", pillar: "Leadership Formation", difficulty: "Intermediate", estimatedDays: 21 },
    { title: "Work & Calling", slug: "work-calling", pillar: "Integrated Life", difficulty: "Intermediate", estimatedDays: 14 },
    { title: "God's Character", slug: "gods-character", pillar: "Theological Depth", difficulty: "Intermediate", estimatedDays: 28 },
  ];

  try {
    console.log("🌱 Adding resources...");
    for (const res of resourcesList) {
      try {
        await (db as any).insert(resources).values(res);
      } catch (e) {
        // Ignore duplicates
      }
    }
    console.log(`✓ Added ${resourcesList.length} resources`);

    console.log("🌱 Adding reading paths...");
    for (const path of pathsList) {
      try {
        await (db as any).insert(readingPaths).values(path);
      } catch (e) {
        // Ignore duplicates
      }
    }
    console.log(`✓ Added ${pathsList.length} reading paths`);
    console.log("✅ Seeding complete!");
  } catch (error) {
    console.error("Error:", error);
  }
  process.exit(0);
}

main();
