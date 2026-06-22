/** Shared types and small helpers for the leadership team workspace UI. */

export type TeamRole = "pastor" | "elder" | "deacon" | "team_leader" | "member";

export const ROLE_LABELS: Record<TeamRole, string> = {
  pastor: "Pastor",
  elder: "Elder",
  deacon: "Deacon",
  team_leader: "Team leader",
  member: "Member",
};

export const ROLE_OPTIONS: TeamRole[] = ["pastor", "elder", "deacon", "team_leader", "member"];

/** Roles allowed to post announcements (mirrors the server guard). */
export const ANNOUNCEMENT_ROLES: TeamRole[] = ["pastor", "elder", "team_leader"];

export type TaskStatus = "open" | "doing" | "done";

export const STATUS_LABELS: Record<TaskStatus, string> = {
  open: "Open",
  doing: "Doing",
  done: "Done",
};

export const STATUS_ORDER: TaskStatus[] = ["open", "doing", "done"];

export function formatDateTime(value: Date | string): string {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatDate(value: Date | string): string {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
