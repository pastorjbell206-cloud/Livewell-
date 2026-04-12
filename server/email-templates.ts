/**
 * Email template generator with Livewell branding
 * All templates use the brand colors and typography
 */

interface EmailTemplateParams {
  recipientName?: string;
  articleTitle?: string;
  articleExcerpt?: string;
  articleUrl?: string;
  articleAuthor?: string;
  unsubscribeUrl?: string;
  campaignMessage?: string;
}

const BRAND_COLORS = {
  charcoal: "#1A1A1A",
  gold: "#B8963E",
  cream: "#F7F5F0",
  slate: "#2C3E50",
  forest: "#2D4A3E",
  linen: "#D1C9BB",
  gray: "#6B7280",
};

/**
 * Welcome email template - sent when someone subscribes
 */
export function getWelcomeEmailTemplate(params: EmailTemplateParams): string {
  const { recipientName = "Friend", unsubscribeUrl = "#" } = params;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Livewell</title>
  <style>
    body { font-family: 'Georgia', serif; margin: 0; padding: 0; background-color: ${BRAND_COLORS.cream}; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; }
    .header { background: linear-gradient(135deg, ${BRAND_COLORS.charcoal} 0%, ${BRAND_COLORS.slate} 100%); color: ${BRAND_COLORS.cream}; padding: 40px; text-align: center; }
    .header h1 { margin: 0; font-size: 32px; font-weight: bold; letter-spacing: -0.02em; }
    .header .tagline { font-size: 14px; color: ${BRAND_COLORS.gold}; margin-top: 8px; letter-spacing: 0.15em; text-transform: uppercase; }
    .content { padding: 40px; color: ${BRAND_COLORS.charcoal}; line-height: 1.6; }
    .content h2 { color: ${BRAND_COLORS.charcoal}; font-size: 24px; margin-top: 0; }
    .content p { margin: 16px 0; font-size: 16px; }
    .cta-button { display: inline-block; background-color: ${BRAND_COLORS.gold}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 20px 0; }
    .divider { border-top: 2px solid ${BRAND_COLORS.gold}; margin: 30px 0; }
    .footer { background-color: ${BRAND_COLORS.charcoal}; color: ${BRAND_COLORS.linen}; padding: 30px; text-align: center; font-size: 12px; }
    .footer a { color: ${BRAND_COLORS.gold}; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Livewell</h1>
      <div class="tagline">by James Bell</div>
    </div>
    
    <div class="content">
      <h2>Welcome, ${recipientName}!</h2>
      
      <p>Thank you for subscribing to Livewell. You're now part of a community of thinking Christians exploring faith, culture, and the Christian life.</p>
      
      <p>Here's what you can expect:</p>
      <ul style="margin: 16px 0; padding-left: 20px;">
        <li><strong>Weekly Essays</strong> on theology, leadership, and Christian witness</li>
        <li><strong>Resource Recommendations</strong> for deeper study and reflection</li>
        <li><strong>Community Updates</strong> and special announcements</li>
      </ul>
      
      <p>I write from one conviction: behavior modification was never the point. Heart transformation is.</p>
      
      <div style="text-align: center;">
        <a href="https://livewell.com" class="cta-button">Read the Latest Essays</a>
      </div>
      
      <div class="divider"></div>
      
      <p style="font-size: 14px; color: ${BRAND_COLORS.gray};">
        Questions? Reply to this email or visit <a href="https://livewell.com" style="color: ${BRAND_COLORS.gold};">livewell.com</a>
      </p>
    </div>
    
    <div class="footer">
      <p style="margin: 0 0 12px 0;">© 2026 Livewell by James Bell. All rights reserved.</p>
      <p style="margin: 0;">
        <a href="${unsubscribeUrl}">Unsubscribe from this list</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Article notification email - sent when a new article is published
 */
export function getArticleNotificationTemplate(params: EmailTemplateParams): string {
  const {
    recipientName = "Friend",
    articleTitle = "New Essay",
    articleExcerpt = "",
    articleUrl = "https://livewell.com",
    articleAuthor = "James Bell",
    unsubscribeUrl = "#",
  } = params;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${articleTitle}</title>
  <style>
    body { font-family: 'Georgia', serif; margin: 0; padding: 0; background-color: ${BRAND_COLORS.cream}; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; }
    .header { background: linear-gradient(135deg, ${BRAND_COLORS.charcoal} 0%, ${BRAND_COLORS.slate} 100%); color: ${BRAND_COLORS.cream}; padding: 30px; }
    .header .logo { font-size: 20px; font-weight: bold; margin: 0; }
    .header .tagline { font-size: 12px; color: ${BRAND_COLORS.gold}; margin-top: 4px; letter-spacing: 0.15em; text-transform: uppercase; }
    .content { padding: 40px; }
    .article-header { border-left: 4px solid ${BRAND_COLORS.gold}; padding-left: 20px; margin-bottom: 30px; }
    .article-header h2 { margin: 0 0 12px 0; color: ${BRAND_COLORS.charcoal}; font-size: 28px; line-height: 1.2; }
    .article-meta { font-size: 14px; color: ${BRAND_COLORS.gray}; margin: 12px 0; }
    .article-excerpt { font-size: 16px; color: ${BRAND_COLORS.charcoal}; line-height: 1.6; margin: 20px 0; }
    .cta-button { display: inline-block; background-color: ${BRAND_COLORS.gold}; color: white; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 30px 0; }
    .divider { border-top: 2px solid ${BRAND_COLORS.gold}; margin: 30px 0; }
    .footer { background-color: ${BRAND_COLORS.charcoal}; color: ${BRAND_COLORS.linen}; padding: 30px; text-align: center; font-size: 12px; }
    .footer a { color: ${BRAND_COLORS.gold}; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Livewell</div>
      <div class="tagline">by James Bell</div>
    </div>
    
    <div class="content">
      <p style="margin-top: 0; color: ${BRAND_COLORS.gray};">Hi ${recipientName},</p>
      
      <div class="article-header">
        <h2>${articleTitle}</h2>
        <div class="article-meta">by ${articleAuthor}</div>
      </div>
      
      <div class="article-excerpt">
        ${articleExcerpt}
      </div>
      
      <div style="text-align: center;">
        <a href="${articleUrl}" class="cta-button">Read Full Essay</a>
      </div>
      
      <div class="divider"></div>
      
      <p style="font-size: 14px; color: ${BRAND_COLORS.gray}; margin-bottom: 0;">
        You're receiving this because you subscribed to Livewell. 
        <a href="${unsubscribeUrl}" style="color: ${BRAND_COLORS.gold};">Manage your preferences</a>
      </p>
    </div>
    
    <div class="footer">
      <p style="margin: 0 0 12px 0;">© 2026 Livewell by James Bell</p>
      <p style="margin: 0;">Essays on faith, culture, and the Christian life</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Email digest template - weekly/monthly summary of articles
 */
export function getDigestEmailTemplate(params: EmailTemplateParams): string {
  const { recipientName = "Friend", unsubscribeUrl = "#", campaignMessage = "" } = params;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Livewell Digest</title>
  <style>
    body { font-family: 'Georgia', serif; margin: 0; padding: 0; background-color: ${BRAND_COLORS.cream}; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; }
    .header { background: linear-gradient(135deg, ${BRAND_COLORS.charcoal} 0%, ${BRAND_COLORS.slate} 100%); color: ${BRAND_COLORS.cream}; padding: 40px; text-align: center; }
    .header h1 { margin: 0; font-size: 32px; font-weight: bold; }
    .header .tagline { font-size: 14px; color: ${BRAND_COLORS.gold}; margin-top: 8px; letter-spacing: 0.15em; text-transform: uppercase; }
    .content { padding: 40px; }
    .section-title { color: ${BRAND_COLORS.gold}; font-size: 14px; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 30px; margin-bottom: 16px; }
    .article-card { border-left: 4px solid ${BRAND_COLORS.gold}; padding-left: 16px; margin-bottom: 24px; }
    .article-card h3 { margin: 0 0 8px 0; color: ${BRAND_COLORS.charcoal}; font-size: 18px; }
    .article-card p { margin: 8px 0; color: ${BRAND_COLORS.gray}; font-size: 14px; }
    .article-card a { color: ${BRAND_COLORS.gold}; text-decoration: none; font-weight: bold; }
    .divider { border-top: 2px solid ${BRAND_COLORS.gold}; margin: 30px 0; }
    .footer { background-color: ${BRAND_COLORS.charcoal}; color: ${BRAND_COLORS.linen}; padding: 30px; text-align: center; font-size: 12px; }
    .footer a { color: ${BRAND_COLORS.gold}; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Livewell Digest</h1>
      <div class="tagline">by James Bell</div>
    </div>
    
    <div class="content">
      <p>Hi ${recipientName},</p>
      
      <p>Here's what's new this week at Livewell:</p>
      
      <div class="section-title">Latest Essays</div>
      <div class="article-card">
        <h3>Check out the latest on livewell.com</h3>
        <p>New essays on theology, faith, and Christian witness are published regularly.</p>
        <p><a href="https://livewell.com">Visit Livewell →</a></p>
      </div>
      
      ${campaignMessage ? `<div class="section-title">Special Announcement</div><div style="padding: 16px; background-color: ${BRAND_COLORS.cream}; border-radius: 4px;">${campaignMessage}</div>` : ""}
      
      <div class="divider"></div>
      
      <p style="font-size: 14px; color: ${BRAND_COLORS.gray};">
        <a href="https://livewell.com" style="color: ${BRAND_COLORS.gold};">Visit Livewell</a> | 
        <a href="${unsubscribeUrl}" style="color: ${BRAND_COLORS.gold};">Unsubscribe</a>
      </p>
    </div>
    
    <div class="footer">
      <p style="margin: 0 0 12px 0;">© 2026 Livewell by James Bell</p>
      <p style="margin: 0;">Essays on faith, culture, and the Christian life</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Manual campaign template - custom message from James
 */
export function getManualCampaignTemplate(params: EmailTemplateParams): string {
  const { recipientName = "Friend", campaignMessage = "", unsubscribeUrl = "#" } = params;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message from Livewell</title>
  <style>
    body { font-family: 'Georgia', serif; margin: 0; padding: 0; background-color: ${BRAND_COLORS.cream}; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; }
    .header { background: linear-gradient(135deg, ${BRAND_COLORS.charcoal} 0%, ${BRAND_COLORS.slate} 100%); color: ${BRAND_COLORS.cream}; padding: 40px; text-align: center; }
    .header h1 { margin: 0; font-size: 32px; font-weight: bold; }
    .content { padding: 40px; color: ${BRAND_COLORS.charcoal}; line-height: 1.6; }
    .message { font-size: 16px; margin: 20px 0; }
    .divider { border-top: 2px solid ${BRAND_COLORS.gold}; margin: 30px 0; }
    .footer { background-color: ${BRAND_COLORS.charcoal}; color: ${BRAND_COLORS.linen}; padding: 30px; text-align: center; font-size: 12px; }
    .footer a { color: ${BRAND_COLORS.gold}; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Livewell</h1>
      <div style="font-size: 14px; color: ${BRAND_COLORS.gold}; margin-top: 8px; letter-spacing: 0.15em; text-transform: uppercase;">by James Bell</div>
    </div>
    
    <div class="content">
      <p>Hi ${recipientName},</p>
      
      <div class="message">
        ${campaignMessage}
      </div>
      
      <div class="divider"></div>
      
      <p style="font-size: 14px; color: ${BRAND_COLORS.gray};">
        <a href="https://livewell.com" style="color: ${BRAND_COLORS.gold};">Visit Livewell</a> | 
        <a href="${unsubscribeUrl}" style="color: ${BRAND_COLORS.gold};">Unsubscribe</a>
      </p>
    </div>
    
    <div class="footer">
      <p style="margin: 0 0 12px 0;">© 2026 Livewell by James Bell</p>
      <p style="margin: 0;">Essays on faith, culture, and the Christian life</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
