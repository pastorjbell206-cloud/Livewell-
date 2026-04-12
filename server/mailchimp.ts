import axios from "axios";

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY || "placeholder_key";
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID || "placeholder_list";
const MAILCHIMP_SERVER = MAILCHIMP_API_KEY.split("-")[1] || "us1";
const MAILCHIMP_BASE_URL = `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0`;

const mailchimpClient = axios.create({
  baseURL: MAILCHIMP_BASE_URL,
  auth: {
    username: "anystring",
    password: MAILCHIMP_API_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Subscribe an email to the Mailchimp list
 */
export async function subscribeToMailchimp(
  email: string,
  name?: string
): Promise<{ success: boolean; mailchimpId?: string; error?: string }> {
  try {
    if (MAILCHIMP_API_KEY === "placeholder_key") {
      console.log("[Mailchimp] Using placeholder credentials, skipping actual subscription");
      return { success: true, mailchimpId: `placeholder_${email}` };
    }

    const response = await mailchimpClient.post(
      `/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name?.split(" ")[0] || "",
          LNAME: name?.split(" ").slice(1).join(" ") || "",
        },
      }
    );

    return {
      success: true,
      mailchimpId: response.data.id,
    };
  } catch (error: any) {
    console.error("[Mailchimp] Subscription error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.detail || "Failed to subscribe to Mailchimp",
    };
  }
}

/**
 * Unsubscribe an email from the Mailchimp list
 */
export async function unsubscribeFromMailchimp(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (MAILCHIMP_API_KEY === "placeholder_key") {
      console.log("[Mailchimp] Using placeholder credentials, skipping actual unsubscription");
      return { success: true };
    }

    const emailHash = require("crypto")
      .createHash("md5")
      .update(email.toLowerCase())
      .digest("hex");

    await mailchimpClient.delete(`/lists/${MAILCHIMP_LIST_ID}/members/${emailHash}`);

    return { success: true };
  } catch (error: any) {
    console.error("[Mailchimp] Unsubscription error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.detail || "Failed to unsubscribe from Mailchimp",
    };
  }
}

/**
 * Send an email campaign to list
 */
export async function sendEmailCampaign(
  subject: string,
  htmlBody: string,
  recipientEmails?: string[]
): Promise<{ success: boolean; campaignId?: string; error?: string }> {
  try {
    if (MAILCHIMP_API_KEY === "placeholder_key") {
      console.log("[Mailchimp] Using placeholder credentials, skipping actual campaign send");
      return { success: true, campaignId: `placeholder_campaign_${Date.now()}` };
    }

    // Create campaign
    const campaignResponse = await mailchimpClient.post(`/campaigns`, {
      type: "regular",
      recipients: {
        list_id: MAILCHIMP_LIST_ID,
      },
      settings: {
        subject_line: subject,
        from_name: "James Bell",
        reply_to: "noreply@livewell.com",
      },
    });

    const campaignId = campaignResponse.data.id;

    // Set campaign content
    await mailchimpClient.put(`/campaigns/${campaignId}/content`, {
      html: htmlBody,
    });

    // Send campaign
    await mailchimpClient.post(`/campaigns/${campaignId}/actions/send`);

    return {
      success: true,
      campaignId,
    };
  } catch (error: any) {
    console.error("[Mailchimp] Campaign send error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.detail || "Failed to send campaign",
    };
  }
}

/**
 * Get list statistics
 */
export async function getListStats(): Promise<{
  success: boolean;
  stats?: { subscriberCount: number; unsubscribeCount: number };
  error?: string;
}> {
  try {
    if (MAILCHIMP_API_KEY === "placeholder_key") {
      console.log("[Mailchimp] Using placeholder credentials, returning mock stats");
      return { success: true, stats: { subscriberCount: 0, unsubscribeCount: 0 } };
    }

    const response = await mailchimpClient.get(`/lists/${MAILCHIMP_LIST_ID}`);

    return {
      success: true,
      stats: {
        subscriberCount: response.data.stats.member_count,
        unsubscribeCount: response.data.stats.unsubscribe_count,
      },
    };
  } catch (error: any) {
    console.error("[Mailchimp] Stats error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.detail || "Failed to get list stats",
    };
  }
}
