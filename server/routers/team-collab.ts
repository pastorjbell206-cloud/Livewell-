/**
 * Team collaboration router — a Slack for the church leadership team.
 *
 * SECURITY MODEL (read before touching anything here):
 *
 *  - Every procedure is a protectedProcedure, so ctx.user is guaranteed.
 *  - Every team-scoped read or write goes through requireMembership() or
 *    requireRole() BEFORE any data is returned or written. A teamId from the
 *    client is never trusted on its own — membership is verified first.
 *  - For resources keyed by something other than teamId (a channelId, a
 *    taskId), the owning teamId is resolved from the DB first, then membership
 *    is checked against THAT teamId. The client cannot smuggle a foreign
 *    teamId alongside a channelId it does not own.
 *  - DB helpers in server/db.ts do not enforce authorization. This module is
 *    the single gate. Do not add a procedure that reaches a team-scoped helper
 *    without a membership check above it.
 *
 * GRACEFUL DEGRADATION: the migration may not be applied yet. List/read
 * procedures catch DB errors and return empty rather than 500ing, so the page
 * renders a "being set up" state. Mutations throw a clean TRPCError.
 */
import { z } from "zod";
import { nanoid } from "nanoid";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../_core/trpc";
import {
  createTeam, getTeamById, getTeamByInviteCode, getTeamBySlug,
  listTeamsForUser, addMember, getMembership, listMembers,
  countMembersWithRole, setMemberRole,
  listChannels, getChannelById, createChannel,
  listChannelPosts, createChannelPost,
  listTasks, getTaskById, createTask, updateTaskStatus,
  listAnnouncements, createAnnouncement,
} from "../db";
import type { TeamMember } from "../../drizzle/schema";

// ─── Authorization helpers (the single gate) ─────────────────────────

type Role = TeamMember["role"];

/**
 * Load the caller's membership for a team. Throws FORBIDDEN if the caller is
 * not a member. Returns the membership row (with role) on success. This is the
 * authorization primitive — every team-scoped operation runs through it.
 */
async function requireMembership(userId: number, teamId: number): Promise<TeamMember> {
  const membership = await getMembership(userId, teamId);
  if (!membership) {
    throw new TRPCError({ code: "FORBIDDEN", message: "You are not a member of this team." });
  }
  return membership;
}

/**
 * requireMembership, then assert the caller's role is in allowedRoles. Throws
 * FORBIDDEN otherwise. Returns the membership on success.
 */
async function requireRole(userId: number, teamId: number, allowedRoles: Role[]): Promise<TeamMember> {
  const membership = await requireMembership(userId, teamId);
  if (!allowedRoles.includes(membership.role)) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Your role does not allow this action." });
  }
  return membership;
}

// ─── Helpers ─────────────────────────────────────────────────────────

const TABLES_MISSING = "The workspace is being set up. Check back soon.";

/** Run a read that may fail because the tables are not migrated; return the fallback if so. */
async function safeRead<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.warn(`[team-collab] ${label} read failed (tables may not be migrated):`, err);
    return fallback;
  }
}

/** Wrap a mutation so a missing-tables error surfaces as a clean, friendly TRPCError. */
async function safeWrite<T>(label: string, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof TRPCError) throw err;
    console.warn(`[team-collab] ${label} write failed:`, err);
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: TABLES_MISSING });
  }
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "team";
}

/** Find a slug not already taken. Appends a short suffix on collision. */
async function uniqueSlug(base: string): Promise<string> {
  const root = slugify(base);
  let candidate = root;
  for (let i = 0; i < 6; i++) {
    const existing = await getTeamBySlug(candidate);
    if (!existing) return candidate;
    candidate = `${root}-${nanoid(5).toLowerCase()}`;
  }
  return `${root}-${nanoid(8).toLowerCase()}`;
}

const ANNOUNCEMENT_ROLES: Role[] = ["pastor", "elder", "team_leader"];

export const teamCollabRouter = router({
  team: router({
    /** Any authed user creates a team and is added as its first pastor. */
    create: protectedProcedure
      .input(z.object({ name: z.string().trim().min(1).max(256) }))
      .mutation(async ({ ctx, input }) => {
        return safeWrite("team.create", async () => {
          const slug = await uniqueSlug(input.name);
          const inviteCode = nanoid(10);
          const team = await createTeam({
            name: input.name.trim(),
            slug,
            inviteCode,
            createdByUserId: ctx.user.id,
          });
          // Creator becomes a pastor (the role that can manage members).
          await addMember(team.id, ctx.user.id, "pastor");
          return team;
        });
      }),

    /** Join a team by its invite code. Idempotent: re-joining is a no-op. */
    joinByCode: protectedProcedure
      .input(z.object({ inviteCode: z.string().trim().min(1).max(32) }))
      .mutation(async ({ ctx, input }) => {
        return safeWrite("team.joinByCode", async () => {
          const team = await getTeamByInviteCode(input.inviteCode.trim());
          if (!team) {
            throw new TRPCError({ code: "NOT_FOUND", message: "No team matches that invite code." });
          }
          // New members join at the lowest role. Idempotent on (teamId, userId).
          await addMember(team.id, ctx.user.id, "member");
          return team;
        });
      }),

    /** Teams the caller belongs to. No membership check needed — scoped to caller. */
    listMine: protectedProcedure.query(async ({ ctx }) => {
      return safeRead("team.listMine", () => listTeamsForUser(ctx.user.id), []);
    }),

    /** Members of a team. AUTH: requireMembership(caller, teamId). */
    members: protectedProcedure
      .input(z.object({ teamId: z.number().int().positive() }))
      .query(async ({ ctx, input }) => {
        return safeRead("team.members", async () => {
          await requireMembership(ctx.user.id, input.teamId);
          return listMembers(input.teamId);
        }, []);
      }),

    /** Change a member's role. AUTH: requireRole pastor. Protects the last pastor. */
    setRole: protectedProcedure
      .input(z.object({
        teamId: z.number().int().positive(),
        userId: z.number().int().positive(),
        role: z.enum(["pastor", "elder", "deacon", "team_leader", "member"]),
      }))
      .mutation(async ({ ctx, input }) => {
        return safeWrite("team.setRole", async () => {
          await requireRole(ctx.user.id, input.teamId, ["pastor"]);
          // The target must already be a member of THIS team (no cross-team writes).
          const target = await getMembership(input.userId, input.teamId);
          if (!target) {
            throw new TRPCError({ code: "NOT_FOUND", message: "That person is not a member of this team." });
          }
          // A pastor cannot demote themselves if they are the only pastor left.
          if (
            input.userId === ctx.user.id &&
            target.role === "pastor" &&
            input.role !== "pastor"
          ) {
            const pastorCount = await countMembersWithRole(input.teamId, "pastor");
            if (pastorCount <= 1) {
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Promote another pastor before stepping down as the last one.",
              });
            }
          }
          return setMemberRole(input.teamId, input.userId, input.role);
        });
      }),
  }),

  channel: router({
    /** Channels in a team. AUTH: requireMembership. */
    list: protectedProcedure
      .input(z.object({ teamId: z.number().int().positive() }))
      .query(async ({ ctx, input }) => {
        return safeRead("channel.list", async () => {
          await requireMembership(ctx.user.id, input.teamId);
          return listChannels(input.teamId);
        }, []);
      }),

    /** Create a channel. AUTH: requireMembership (any member). */
    create: protectedProcedure
      .input(z.object({
        teamId: z.number().int().positive(),
        name: z.string().trim().min(1).max(128),
        description: z.string().trim().max(2000).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return safeWrite("channel.create", async () => {
          await requireMembership(ctx.user.id, input.teamId);
          return createChannel({
            teamId: input.teamId,
            name: input.name.trim(),
            description: input.description?.trim() || null,
            createdByUserId: ctx.user.id,
          });
        });
      }),
  }),

  post: router({
    /** Posts in a channel. AUTH: resolve channel -> teamId, then requireMembership. */
    list: protectedProcedure
      .input(z.object({ channelId: z.number().int().positive(), limit: z.number().int().min(1).max(200).optional() }))
      .query(async ({ ctx, input }) => {
        return safeRead("post.list", async () => {
          const channel = await getChannelById(input.channelId);
          if (!channel) return [];
          await requireMembership(ctx.user.id, channel.teamId);
          return listChannelPosts(input.channelId, input.limit ?? 100);
        }, []);
      }),

    /** Create a post. AUTH: resolve channel -> teamId, then requireMembership. */
    create: protectedProcedure
      .input(z.object({
        channelId: z.number().int().positive(),
        body: z.string().trim().min(1).max(5000),
      }))
      .mutation(async ({ ctx, input }) => {
        return safeWrite("post.create", async () => {
          const channel = await getChannelById(input.channelId);
          if (!channel) {
            throw new TRPCError({ code: "NOT_FOUND", message: "That channel no longer exists." });
          }
          await requireMembership(ctx.user.id, channel.teamId);
          const body = input.body.trim();
          if (!body) {
            throw new TRPCError({ code: "BAD_REQUEST", message: "A message cannot be empty." });
          }
          return createChannelPost({
            channelId: channel.id,
            teamId: channel.teamId,
            userId: ctx.user.id,
            body,
          });
        });
      }),
  }),

  task: router({
    /** Tasks in a team. AUTH: requireMembership. */
    list: protectedProcedure
      .input(z.object({ teamId: z.number().int().positive() }))
      .query(async ({ ctx, input }) => {
        return safeRead("task.list", async () => {
          await requireMembership(ctx.user.id, input.teamId);
          return listTasks(input.teamId);
        }, []);
      }),

    /** Create a task. AUTH: requireMembership. */
    create: protectedProcedure
      .input(z.object({
        teamId: z.number().int().positive(),
        title: z.string().trim().min(1).max(512),
        detail: z.string().trim().max(5000).optional(),
        assigneeUserId: z.number().int().positive().optional(),
        dueDate: z.string().trim().max(32).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return safeWrite("task.create", async () => {
          await requireMembership(ctx.user.id, input.teamId);
          // If an assignee is named, they must belong to the same team.
          if (input.assigneeUserId !== undefined) {
            const assigneeMembership = await getMembership(input.assigneeUserId, input.teamId);
            if (!assigneeMembership) {
              throw new TRPCError({ code: "BAD_REQUEST", message: "The assignee is not a member of this team." });
            }
          }
          return createTask({
            teamId: input.teamId,
            title: input.title.trim(),
            detail: input.detail?.trim() || null,
            assigneeUserId: input.assigneeUserId ?? null,
            dueDate: input.dueDate?.trim() || null,
            createdByUserId: ctx.user.id,
          });
        });
      }),

    /** Change task status. AUTH: resolve task -> teamId, then requireMembership. */
    updateStatus: protectedProcedure
      .input(z.object({
        taskId: z.number().int().positive(),
        status: z.enum(["open", "doing", "done"]),
      }))
      .mutation(async ({ ctx, input }) => {
        return safeWrite("task.updateStatus", async () => {
          const task = await getTaskById(input.taskId);
          if (!task) {
            throw new TRPCError({ code: "NOT_FOUND", message: "That task no longer exists." });
          }
          await requireMembership(ctx.user.id, task.teamId);
          return updateTaskStatus(task.id, task.teamId, input.status);
        });
      }),
  }),

  announcement: router({
    /** Announcements in a team. AUTH: requireMembership. */
    list: protectedProcedure
      .input(z.object({ teamId: z.number().int().positive() }))
      .query(async ({ ctx, input }) => {
        return safeRead("announcement.list", async () => {
          await requireMembership(ctx.user.id, input.teamId);
          return listAnnouncements(input.teamId);
        }, []);
      }),

    /** Create an announcement. AUTH: requireRole pastor/elder/team_leader. */
    create: protectedProcedure
      .input(z.object({
        teamId: z.number().int().positive(),
        title: z.string().trim().min(1).max(512),
        body: z.string().trim().min(1).max(8000),
      }))
      .mutation(async ({ ctx, input }) => {
        return safeWrite("announcement.create", async () => {
          await requireRole(ctx.user.id, input.teamId, ANNOUNCEMENT_ROLES);
          return createAnnouncement({
            teamId: input.teamId,
            userId: ctx.user.id,
            title: input.title.trim(),
            body: input.body.trim(),
          });
        });
      }),
  }),
});
