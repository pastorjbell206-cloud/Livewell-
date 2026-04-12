import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getDb } from "./db";
import {
  addSubscriber,
  listSubscribers,
  removeSubscriber,
  createNotification,
  listNotifications,
  getBannerNotifications,
  createAdminNotification,
  listAdminNotifications,
  markAdminNotificationAsRead,
} from "./db";

describe("Notification System", () => {
  let db: any;

  beforeAll(async () => {
    db = await getDb();
  });

  describe("Subscribers", () => {
    it("should add a subscriber", async () => {
      await addSubscriber("test@example.com");
      const subscribers = await listSubscribers();
      expect(subscribers.some((s: any) => s.email === "test@example.com")).toBe(true);
    });

    it("should list active subscribers", async () => {
      await addSubscriber("active@example.com");
      const subscribers = await listSubscribers(true);
      expect(subscribers.length).toBeGreaterThan(0);
      expect(subscribers.every((s: any) => s.active === true)).toBe(true);
    });

    it("should remove a subscriber", async () => {
      await addSubscriber("remove@example.com");
      await removeSubscriber("remove@example.com");
      const subscribers = await listSubscribers();
      expect(subscribers.some((s: any) => s.email === "remove@example.com")).toBe(false);
    });
  });

  describe("Notifications", () => {
    it("should create a notification", async () => {
      const result = await createNotification({
        type: "announcement",
        title: "Test Notification",
        message: "This is a test notification",
        active: true,
        showAsBanner: false,
      });
      expect(result).toBeDefined();
    });

    it("should list active notifications", async () => {
      await createNotification({
        type: "info",
        title: "Active Notification",
        message: "This should be active",
        active: true,
        showAsBanner: false,
      });
      const notifications = await listNotifications(true);
      expect(notifications.length).toBeGreaterThan(0);
      expect(notifications.every((n: any) => n.active === true)).toBe(true);
    });

    it("should get banner notifications", async () => {
      await createNotification({
        type: "announcement",
        title: "Banner Notification",
        message: "This is a banner",
        active: true,
        showAsBanner: true,
      });
      const banners = await getBannerNotifications();
      expect(banners.some((b: any) => b.showAsBanner === true)).toBe(true);
    });
  });

  describe("Admin Notifications", () => {
    it("should create an admin notification", async () => {
      await createAdminNotification({
        type: "subscriber_joined",
        title: "New Subscriber",
        message: "Someone subscribed to the newsletter",
        read: false,
      });
      const notifications = await listAdminNotifications(false);
      expect(notifications.length).toBeGreaterThan(0);
    });

    it("should list unread admin notifications", async () => {
      await createAdminNotification({
        type: "alert",
        title: "Unread Alert",
        message: "This is unread",
        read: false,
      });
      const unread = await listAdminNotifications(true);
      expect(unread.every((n: any) => n.read === false)).toBe(true);
    });

    it("should mark admin notification as read", async () => {
      const result = await createAdminNotification({
        type: "test",
        title: "Test",
        message: "Test message",
        read: false,
      });
      // Get the ID from the insert result
      const notifications = await listAdminNotifications(true);
      if (notifications.length > 0) {
        const id = notifications[0].id;
        await markAdminNotificationAsRead(id);
        const updated = await listAdminNotifications(true);
        expect(updated.some((n: any) => n.id === id)).toBe(false);
      }
    });
  });
});
