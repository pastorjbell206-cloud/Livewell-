/**
 * Analytics Service
 * Tracks user engagement, article views, and conversion metrics
 */

export interface PageView {
  articleId: number;
  slug: string;
  timestamp: Date;
  referrer?: string;
  userAgent?: string;
  sessionId: string;
}

export interface ConversionEvent {
  type: "email_signup" | "lead_magnet_download" | "book_purchase" | "reading_path_start";
  articleId?: number;
  userId?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface EngagementMetrics {
  totalViews: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
  bounceRate: number;
  conversionRate: number;
}

// In-memory storage for demo (would use database in production)
const pageViews: PageView[] = [];
const conversionEvents: ConversionEvent[] = [];

/**
 * Track a page view
 */
export function trackPageView(data: PageView): void {
  pageViews.push(data);
  console.log(`[Analytics] Page view: ${data.slug}`);
}

/**
 * Track a conversion event
 */
export function trackConversion(event: ConversionEvent): void {
  conversionEvents.push(event);
  console.log(`[Analytics] Conversion: ${event.type}`);
}

/**
 * Get engagement metrics for an article
 */
export function getArticleMetrics(articleId: number): EngagementMetrics {
  const views = pageViews.filter((v) => v.articleId === articleId);
  const conversions = conversionEvents.filter((e) => e.articleId === articleId);

  const uniqueVisitors = new Set(views.map((v) => v.sessionId)).size;
  const totalViews = views.length;

  // Calculate average time on page (mock: 3-8 minutes)
  const avgTimeOnPage = Math.floor(Math.random() * 5 + 3);

  // Calculate bounce rate (mock: 30-50%)
  const bounceRate = Math.floor(Math.random() * 20 + 30);

  // Calculate conversion rate
  const conversionRate = totalViews > 0 ? (conversions.length / totalViews) * 100 : 0;

  return {
    totalViews,
    uniqueVisitors,
    avgTimeOnPage,
    bounceRate,
    conversionRate,
  };
}

/**
 * Get trending articles based on views
 */
export function getTrendingByViews(limit: number = 10) {
  const viewsByArticle = new Map<number, number>();

  pageViews.forEach((view) => {
    viewsByArticle.set(view.articleId, (viewsByArticle.get(view.articleId) || 0) + 1);
  });

  return Array.from(viewsByArticle.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([articleId, views]) => ({ articleId, views }));
}

/**
 * Get conversion funnel
 */
export function getConversionFunnel() {
  const emailSignups = conversionEvents.filter((e) => e.type === "email_signup").length;
  const leadMagnetDownloads = conversionEvents.filter((e) => e.type === "lead_magnet_download").length;
  const bookPurchases = conversionEvents.filter((e) => e.type === "book_purchase").length;
  const readingPathStarts = conversionEvents.filter((e) => e.type === "reading_path_start").length;

  return {
    totalEvents: conversionEvents.length,
    emailSignups,
    leadMagnetDownloads,
    bookPurchases,
    readingPathStarts,
    conversionRate: conversionEvents.length > 0 ? (emailSignups / conversionEvents.length) * 100 : 0,
  };
}

/**
 * Get referral sources
 */
export function getReferralSources() {
  const sources = new Map<string, number>();

  pageViews.forEach((view) => {
    const source = view.referrer || "direct";
    sources.set(source, (sources.get(source) || 0) + 1);
  });

  return Array.from(sources.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([source, count]) => ({ source, count }));
}
