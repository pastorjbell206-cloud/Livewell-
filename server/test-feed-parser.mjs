import { parseFeed, fetchSubstackFeed, fetchPastorsConnectionFeed } from "./feed-parser.ts";

async function testFeedParser() {
  console.log("Testing improved feed parser...\n");

  try {
    console.log("1. Testing Substack feed...");
    const substackFeed = await fetchSubstackFeed("https://jamesbell333289.substack.com");
    console.log(`✅ Substack: ${substackFeed.length} articles found`);
    if (substackFeed.length > 0) {
      console.log(`   First article: "${substackFeed[0].title}"`);
    }
  } catch (error) {
    console.error("❌ Substack feed error:", error.message);
  }

  try {
    console.log("\n2. Testing Pastors Connection feed...");
    // You'll need to provide the actual Pastors Connection feed URL
    const pastorsFeed = await fetchPastorsConnectionFeed("https://www.thepastorsconnection.com/feed");
    console.log(`✅ Pastors Connection: ${pastorsFeed.length} articles found`);
    if (pastorsFeed.length > 0) {
      console.log(`   First article: "${pastorsFeed[0].title}"`);
    }
  } catch (error) {
    console.error("❌ Pastors Connection feed error:", error.message);
  }
}

testFeedParser();
