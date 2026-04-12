import { mysqlTable, varchar, text, int, decimal, timestamp, boolean, json, mysqlEnum } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const productBundles = mysqlTable("product_bundles", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  pillar: mysqlEnum("pillar", [
    "Prophetic Disruption",
    "Theological Depth",
    "Prophetic Justice",
    "Integrated Life",
    "Leadership Formation",
    "Cross-Pillar",
  ]).notNull(),
  category: mysqlEnum("category", [
    "Pillar Starter",
    "Seasonal",
    "Audience Specific",
    "Mega Bundle",
    "Membership",
  ]).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  discount: int("discount"), // percentage
  description: text("description"),
  longDescription: text("long_description"),
  imageUrl: varchar("image_url", { length: 500 }),
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  sortOrder: int("sort_order").default(0),
  contents: json("contents"), // Array of resource IDs and descriptions
  tags: json("tags"), // Array of tags for filtering
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const bundleItems = mysqlTable("bundle_items", {
  id: int("id").primaryKey().autoincrement(),
  bundleId: int("bundle_id").notNull(),
  resourceType: mysqlEnum("resource_type", ["article", "pdf", "video", "course", "guide", "workbook"]).notNull(),
  resourceId: int("resource_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  sortOrder: int("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bundlePurchases = mysqlTable("bundle_purchases", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(),
  bundleId: int("bundle_id").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),
  status: mysqlEnum("status", ["pending", "completed", "refunded"]).default("pending"),
  accessExpiresAt: timestamp("access_expires_at"),
  downloadedAt: timestamp("downloaded_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const bundleAccess = mysqlTable("bundle_access", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(),
  bundleId: int("bundle_id").notNull(),
  purchaseId: int("purchase_id"),
  accessToken: varchar("access_token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expires_at"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const bundlesRelations = relations(productBundles, ({ many }) => ({
  items: many(bundleItems),
  purchases: many(bundlePurchases),
}));

export const bundleItemsRelations = relations(bundleItems, ({ one }) => ({
  bundle: one(productBundles, {
    fields: [bundleItems.bundleId],
    references: [productBundles.id],
  }),
}));

export const bundlePurchasesRelations = relations(bundlePurchases, ({ one }) => ({
  bundle: one(productBundles, {
    fields: [bundlePurchases.bundleId],
    references: [productBundles.id],
  }),
}));
