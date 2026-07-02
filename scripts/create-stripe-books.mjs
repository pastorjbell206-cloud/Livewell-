// Creates (idempotently) a Stripe Product + a one-time $9.99 USD Price for each
// LiveWell-series ebook, then prints the price IDs to wire into env as
// STRIPE_PRICE_CONSIDER_THE_BIRDS and STRIPE_PRICE_WHERE_YOUR_TREASURE_IS.
//
// Idempotent: products are matched by metadata.slug and a $9.99 one-time price
// is reused if one already exists, so re-running won't create duplicates.
//
// Usage:
//   STRIPE_SECRET_KEY=sk_test_... node scripts/create-stripe-books.mjs
// or put STRIPE_SECRET_KEY in .env.local and run:
//   node scripts/create-stripe-books.mjs
import Stripe from "stripe";
import fs from "node:fs";

// Best-effort load of .env.local so the secret key need not be exported.
try {
  const env = fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
  }
} catch {
  /* no .env.local — rely on the exported env var */
}

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("STRIPE_SECRET_KEY is missing. Set it in .env.local or export it.");
  process.exit(1);
}
const stripe = new Stripe(key);
const mode = key.startsWith("sk_live") ? "LIVE" : "TEST";

const BOOKS = [
  {
    slug: "consider-the-birds",
    title: "Consider the Birds",
    subtitle: "What the Bible Says About Anxiety, and the Peace Christ Gives Instead",
    env: "STRIPE_PRICE_CONSIDER_THE_BIRDS",
  },
  {
    slug: "where-your-treasure-is",
    title: "Where Your Treasure Is",
    subtitle: "What the Bible Says About Money, and the Heart It Means to Free",
    env: "STRIPE_PRICE_WHERE_YOUR_TREASURE_IS",
  },
  {
    slug: "covenant",
    title: "Covenant",
    subtitle: "Why Marriage Is a Promise, Not a Deal",
    env: "STRIPE_PRICE_COVENANT",
  },
  {
    slug: "babylon",
    title: "Babylon",
    subtitle: "How to Live When America Stops Being Christian",
    env: "STRIPE_PRICE_BABYLON",
  },
  {
    slug: "how-to-read-the-bible",
    title: "How to Read the Bible",
    subtitle: "Without Making It Say What You Already Believe",
    env: "STRIPE_PRICE_HOW_TO_READ_THE_BIBLE",
  },
  {
    slug: "be-true-to-yourself",
    title: "Be True to Yourself",
    subtitle: "The Lie That Ate the World",
    env: "STRIPE_PRICE_BE_TRUE_TO_YOURSELF",
  },
  {
    slug: "what-belongs-to-the-poor",
    title: "What Belongs to the Poor",
    subtitle: "What the Ancient Church Knew About Wealth and Justice",
    env: "STRIPE_PRICE_WHAT_BELONGS_TO_THE_POOR",
  },
  {
    slug: "rule-of-life",
    title: "Rule of Life",
    subtitle: "The Ancient Art of Forming a Soul in an Age Built to Deform It",
    env: "STRIPE_PRICE_RULE_OF_LIFE",
  },
  {
    slug: "why-not-what",
    title: "Why Not What",
    subtitle: "How Theology Starts With the Right Question",
    env: "STRIPE_PRICE_WHY_NOT_WHAT",
  },
  {
    slug: "sermon-on-the-mount-as-politics",
    title: "The Sermon on the Mount as Politics",
    subtitle: "Reading the Kingdom's Constitution Without the Spiritualizing",
    env: "STRIPE_PRICE_SERMON_ON_THE_MOUNT_AS_POLITICS",
  },
  {
    slug: "prophetic-justice-101",
    title: "Prophetic Justice 101",
    subtitle: "Mishpat, Tsedaqah, and What the Church Owes Its Neighborhood",
    env: "STRIPE_PRICE_PROPHETIC_JUSTICE_101",
  },
  {
    slug: "marriage-in-ministry",
    title: "Marriage in Ministry",
    subtitle: "Protecting the Covenant When the Church Demands Everything",
    env: "STRIPE_PRICE_MARRIAGE_IN_MINISTRY",
  },
  {
    slug: "the-loneliness-of-the-pastor",
    title: "The Loneliness of the Pastor",
    subtitle: "Why Pastors Quit, and the Brotherhood That Could Let Them Stay",
    env: "STRIPE_PRICE_THE_LONELINESS_OF_THE_PASTOR",
  },
  {
    slug: "healwell",
    title: "HealWell",
    subtitle: "52 Weeks in Costly Hope",
    env: "STRIPE_PRICE_HEALWELL",
  },
  {
    slug: "born-again-from-atheism",
    title: "Born Again From Atheism",
    subtitle: "How an Unbeliever Came to Faith, and What He Found There",
    env: "STRIPE_PRICE_BORN_AGAIN_FROM_ATHEISM",
  },
  {
    slug: "the-god-who-is-not-nice",
    title: "The God Who Is Not Nice",
    subtitle: "Recovering the Weight of God in a Sentimental Age",
    env: "STRIPE_PRICE_THE_GOD_WHO_IS_NOT_NICE",
  },
  {
    slug: "faith-after-deconstruction",
    title: "Faith After Deconstruction",
    subtitle: "How to Lose the Faith You Were Given and Find the One That Holds",
    env: "STRIPE_PRICE_FAITH_AFTER_DECONSTRUCTION",
  },
  {
    slug: "ordinary-holiness",
    title: "Ordinary Holiness",
    subtitle: "Finding God in the Life You Actually Have",
    env: "STRIPE_PRICE_ORDINARY_HOLINESS",
  },
  {
    slug: "the-scandal-of-the-cross",
    title: "The Scandal of the Cross",
    subtitle: "Why the Death of God Is the Center of Everything",
    env: "STRIPE_PRICE_THE_SCANDAL_OF_THE_CROSS",
  },
  {
    slug: "heaven-is-not-your-reward",
    title: "Heaven Is Not Your Reward",
    subtitle: "The Resurrection Hope the Church Traded for an Escape",
    env: "STRIPE_PRICE_HEAVEN_IS_NOT_YOUR_REWARD",
  },
  {
    slug: "prayer-in-the-dark",
    title: "Prayer in the Dark",
    subtitle: "Talking to God When You Are Not Sure Anyone Is Listening",
    env: "STRIPE_PRICE_PRAYER_IN_THE_DARK",
  },
  {
    slug: "the-body-you-left",
    title: "The Body You Left",
    subtitle: "A Case for the Church in an Age That Walked Away",
    env: "STRIPE_PRICE_THE_BODY_YOU_LEFT",
  },
];

const results = [];
for (const b of BOOKS) {
  let product;
  try {
    const found = await stripe.products.search({ query: `metadata['slug']:'${b.slug}'` });
    product = found.data[0];
  } catch {
    /* search may be momentarily unavailable on brand-new accounts; fall through */
  }
  if (!product) {
    product = await stripe.products.create({
      name: `${b.title} (ebook)`,
      description: b.subtitle,
      metadata: { slug: b.slug, series: "LiveWell", author: "James Bell" },
    });
  }

  const prices = await stripe.prices.list({ product: product.id, active: true, limit: 100 });
  let price = prices.data.find(
    (p) => p.unit_amount === 999 && p.currency === "usd" && !p.recurring
  );
  if (!price) {
    price = await stripe.prices.create({
      product: product.id,
      unit_amount: 999,
      currency: "usd",
    });
  }

  results.push({ slug: b.slug, env: b.env, productId: product.id, priceId: price.id });
}

console.log(`\nStripe ${mode} mode — LiveWell series ($9.99 each)\n`);
for (const r of results) {
  console.log(`${r.slug}`);
  console.log(`  product: ${r.productId}`);
  console.log(`  price:   ${r.priceId}\n`);
}
console.log("Add these to .env.local (dev) and Vercel env (preview/production):\n");
for (const r of results) console.log(`${r.env}=${r.priceId}`);
console.log("");
