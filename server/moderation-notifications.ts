import { notifyOwner } from "./_core/notification";

/**
 * Send notification when a new comment is submitted
 */
export async function notifyNewComment(data: {
  authorName: string;
  authorEmail: string;
  content: string;
  postId: number;
}): Promise<boolean> {
  try {
    const preview = data.content.substring(0, 100) + (data.content.length > 100 ? "..." : "");
    
    const success = await notifyOwner({
      title: `New Comment from ${data.authorName}`,
      content: `A new comment has been submitted on Article #${data.postId}:\n\n"${preview}"\n\nReview and approve in the Moderation panel.`,
    });

    return success;
  } catch (error) {
    console.error("[Moderation] Error sending comment notification:", error);
    return false;
  }
}

/**
 * Send notification when a new testimonial is submitted
 */
export async function notifyNewTestimonial(data: {
  authorName: string;
  authorRole?: string;
  content: string;
}): Promise<boolean> {
  try {
    const preview = data.content.substring(0, 100) + (data.content.length > 100 ? "..." : "");
    const role = data.authorRole ? ` (${data.authorRole})` : "";
    
    const success = await notifyOwner({
      title: `New Testimonial from ${data.authorName}${role}`,
      content: `A new testimonial has been submitted:\n\n"${preview}"\n\nReview and approve in the Moderation panel.`,
    });

    return success;
  } catch (error) {
    console.error("[Moderation] Error sending testimonial notification:", error);
    return false;
  }
}

/**
 * Send notification when multiple items are pending review
 */
export async function notifyPendingItems(data: {
  pendingComments: number;
  pendingTestimonials: number;
}): Promise<boolean> {
  try {
    const items = [];
    if (data.pendingComments > 0) {
      items.push(`${data.pendingComments} comment${data.pendingComments !== 1 ? "s" : ""}`);
    }
    if (data.pendingTestimonials > 0) {
      items.push(`${data.pendingTestimonials} testimonial${data.pendingTestimonials !== 1 ? "s" : ""}`);
    }

    if (items.length === 0) return true;

    const success = await notifyOwner({
      title: "Pending Moderation Items",
      content: `You have ${items.join(" and ")} awaiting approval. Review them in the Moderation panel.`,
    });

    return success;
  } catch (error) {
    console.error("[Moderation] Error sending pending items notification:", error);
    return false;
  }
}
