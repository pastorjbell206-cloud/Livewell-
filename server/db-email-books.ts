import { getDb } from "./db";
import { bookPurchases, emailCampaigns } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";

// ─── Book Purchases ─────────────────────────────────────────────────────

export async function createBookPurchase(data: {
  bookId: number;
  stripePaymentIntentId: string;
  customerEmail: string;
  customerName?: string;
  amountCents: number;
  sessionId?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(bookPurchases).values({
    ...data,
    status: "pending",
  });
  return result;
}

export async function updateBookPurchaseStatus(
  stripePaymentIntentId: string,
  status: "pending" | "succeeded" | "failed"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db
    .update(bookPurchases)
    .set({ status })
    .where(eq(bookPurchases.stripePaymentIntentId, stripePaymentIntentId));
}

export async function getBookPurchase(stripePaymentIntentId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(bookPurchases)
    .where(eq(bookPurchases.stripePaymentIntentId, stripePaymentIntentId));
  return result[0];
}

export async function listBookPurchases(bookId?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  if (bookId) {
    return await db
      .select()
      .from(bookPurchases)
      .where(eq(bookPurchases.bookId, bookId))
      .orderBy(desc(bookPurchases.createdAt));
  }
  return await db
    .select()
    .from(bookPurchases)
    .orderBy(desc(bookPurchases.createdAt));
}

export async function getBookPurchasesByEmail(customerEmail: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db
    .select()
    .from(bookPurchases)
    .where(eq(bookPurchases.customerEmail, customerEmail))
    .orderBy(desc(bookPurchases.createdAt));
}

// ─── Email Campaigns ────────────────────────────────────────────────────

export async function createEmailCampaign(data: {
  name: string;
  type: "welcome" | "digest" | "manual" | "article_notification";
  subject: string;
  htmlBody: string;
  relatedArticleId?: number;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(emailCampaigns).values({
    ...data,
    status: "draft",
    sentCount: 0,
  });
  return result;
}

export async function updateEmailCampaign(
  id: number,
  data: {
    subject?: string;
    htmlBody?: string;
    status?: "draft" | "scheduled" | "sent" | "failed";
    sentCount?: number;
    scheduledAt?: Date;
    sentAt?: Date;
  }
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(emailCampaigns).set(data).where(eq(emailCampaigns.id, id));
}

export async function getEmailCampaign(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(emailCampaigns)
    .where(eq(emailCampaigns.id, id));
  return result[0];
}

export async function listEmailCampaigns(type?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  if (type) {
    return await db
      .select()
      .from(emailCampaigns)
      .where(eq(emailCampaigns.type, type as any))
      .orderBy(desc(emailCampaigns.createdAt));
  }
  return await db
    .select()
    .from(emailCampaigns)
    .orderBy(desc(emailCampaigns.createdAt));
}

export async function getEmailCampaignsByStatus(status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db
    .select()
    .from(emailCampaigns)
    .where(eq(emailCampaigns.status, status as any))
    .orderBy(desc(emailCampaigns.createdAt));
}

export async function deleteEmailCampaign(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.delete(emailCampaigns).where(eq(emailCampaigns.id, id));
}

// ─── Campaign Statistics ────────────────────────────────────────────────

export async function getCampaignStats() {
  const allCampaigns = await listEmailCampaigns();
  const sentCampaigns = allCampaigns.filter((c: any) => c.status === "sent");
  const totalSent = sentCampaigns.reduce((sum: number, c: any) => sum + c.sentCount, 0);

  return {
    totalCampaigns: allCampaigns.length,
    sentCampaigns: sentCampaigns.length,
    draftCampaigns: allCampaigns.filter((c: any) => c.status === "draft").length,
    totalEmailsSent: totalSent,
  };
}

export async function getBookSalesStats() {
  const allPurchases = await listBookPurchases();
  const succeededPurchases = allPurchases.filter((p: any) => p.status === "succeeded");
  const totalRevenueCents = succeededPurchases.reduce((sum: number, p: any) => sum + p.amountCents, 0);

  return {
    totalPurchases: allPurchases.length,
    succeededPurchases: succeededPurchases.length,
    failedPurchases: allPurchases.filter((p: any) => p.status === "failed").length,
    totalRevenueUSD: (totalRevenueCents / 100).toFixed(2),
  };
}
