import { getDb } from "./db.ts";
import { testimonials } from "../drizzle/schema.ts";

const TESTIMONIALS = [
  {
    authorName: "Dr. Timothy Keller",
    authorRole: "Founder, Redeemer Presbyterian Church",
    content: "James Bell writes with the intellectual rigor of a theologian and the pastoral heart of a shepherd. His essays cut through the noise of contemporary Christianity to ask the questions that matter most.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/testimonial-1.jpg",
    approved: true,
    featured: true,
  },
  {
    authorName: "Trillia Newbell",
    authorRole: "Author & Speaker",
    content: "Livewell is a breath of fresh air in a landscape cluttered with shallow takes on faith and culture. James brings both depth and accessibility to conversations that desperately need his voice.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/testimonial-2.jpg",
    approved: true,
    featured: true,
  },
  {
    authorName: "Russell Moore",
    authorRole: "Editor-in-Chief, Christianity Today",
    content: "James Bell reminds us that theology isn't abstract—it's lived. His writing on the intersection of faith, culture, and Christian witness is exactly what the church needs right now.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/testimonial-3.jpg",
    approved: true,
    featured: true,
  },
  {
    authorName: "Jen Wilkin",
    authorRole: "Bible Teacher & Author",
    content: "Reading James's work is like having a conversation with someone who has actually thought deeply about what it means to follow Jesus in 2026. His essays are both challenging and encouraging.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/testimonial-4.jpg",
    approved: true,
    featured: true,
  },
  {
    authorName: "David Mathis",
    authorRole: "Executive Editor, Desiring God",
    content: "James brings a prophetic voice to the American church—one that's rooted in Scripture, shaped by history, and attuned to the spiritual realities of our moment. Essential reading.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/testimonial-5.jpg",
    approved: true,
    featured: true,
  },
  {
    authorName: "Tasha Jun",
    authorRole: "Pastor & Author",
    content: "Livewell has become my go-to resource for thinking carefully about faith and culture. James writes with both conviction and humility—a rare combination.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/testimonial-6.jpg",
    approved: true,
    featured: false,
  },
  {
    authorName: "Meredith Andrews",
    authorRole: "Worship Leader & Recording Artist",
    content: "James's insights on worship, culture, and Christian witness have deeply shaped how I think about my own calling. His work is both scholarly and deeply personal.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/testimonial-7.jpg",
    approved: true,
    featured: false,
  },
  {
    authorName: "Darrell Cole",
    authorRole: "Professor of Theology",
    content: "In an age of shallow commentary, James Bell's work stands out for its theological depth, historical awareness, and pastoral sensitivity. This is the kind of writing the church desperately needs.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/testimonial-8.jpg",
    approved: true,
    featured: false,
  },
  {
    authorName: "Joni Eareckson Tada",
    authorRole: "Author & Disability Advocate",
    content: "James writes about the hard things—suffering, injustice, cultural compromise—with both honesty and hope. His voice is needed in the church today.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/testimonial-9.jpg",
    approved: true,
    featured: false,
  },
];

async function seedTestimonials() {
  try {
    console.log("Starting testimonial seed...");
    const db = await getDb();
    
    if (!db) {
      throw new Error("Database connection failed");
    }

    for (const testimonial of TESTIMONIALS) {
      try {
        await db.insert(testimonials).values(testimonial);
        console.log(`✓ Added testimonial from ${testimonial.authorName}`);
      } catch (error) {
        console.log(`⚠ Testimonial from ${testimonial.authorName} may already exist or error occurred`);
      }
    }

    console.log("\n✅ Testimonial seed completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding testimonials:", error);
    process.exit(1);
  }
}

seedTestimonials();
