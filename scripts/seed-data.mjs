import { seedResources } from "./server/seed-resources.ts";
import { seedReadingPaths } from "./server/seed-reading-paths.ts";

async function main() {
  console.log("🌱 Starting data seeding...");
  await seedResources();
  await seedReadingPaths();
  console.log("✅ Data seeding complete!");
  process.exit(0);
}

main().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
