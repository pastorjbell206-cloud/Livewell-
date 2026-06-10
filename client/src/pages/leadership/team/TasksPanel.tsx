/** Task board: list tasks by status with a status switcher and a create form. */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { bodyText, card, ghostButton, heading, input, muted, primaryButton } from "./ui";
import { formatDate, STATUS_LABELS, STATUS_ORDER, type TaskStatus } from "./types";

export default function TasksPanel({ teamId }: { teamId: number }) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [dueDate, setDueDate] = useState("");
  const utils = trpc.useUtils();

  const tasksQuery = trpc.teamCollab.task.list.useQuery({ teamId }, { refetchInterval: 5000 });

  const createTask = trpc.teamCollab.task.create.useMutation({
    onSuccess: () => {
      setTitle("");
      setDetail("");
      setDueDate("");
      utils.teamCollab.task.list.invalidate({ teamId });
    },
    onError: (err) => toast.error(err.message),
  });

  const updateStatus = trpc.teamCollab.task.updateStatus.useMutation({
    onSuccess: () => utils.teamCollab.task.list.invalidate({ teamId }),
    onError: (err) => toast.error(err.message),
  });

  const tasks = tasksQuery.data ?? [];

  const submit = () => {
    const t = title.trim();
    if (!t) return;
    createTask.mutate({
      teamId,
      title: t,
      detail: detail.trim() || undefined,
      dueDate: dueDate.trim() || undefined,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ ...heading, fontSize: "22px" }}>Tasks</div>

      <div style={{ ...card }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: "10px", marginBottom: "10px" }}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs doing" style={input} />
          <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Due (optional)" style={input} />
        </div>
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Detail (optional)"
          rows={2}
          style={{ ...input, resize: "vertical", marginBottom: "10px" }}
        />
        <button
          onClick={submit}
          disabled={createTask.isPending || !title.trim()}
          style={{ ...primaryButton, opacity: createTask.isPending || !title.trim() ? 0.6 : 1 }}
        >
          {createTask.isPending ? "Adding" : "Add task"}
        </button>
      </div>

      {tasksQuery.isLoading ? (
        <p style={muted}>Loading tasks.</p>
      ) : tasks.length === 0 ? (
        <p style={muted}>No tasks yet. Add the first one above.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
          {STATUS_ORDER.map((status) => {
            const column = tasks.filter((t) => t.status === status);
            return (
              <div key={status}>
                <div style={{ ...muted, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px", fontWeight: 600 }}>
                  {STATUS_LABELS[status]} ({column.length})
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {column.map((task) => (
                    <div key={task.id} style={{ ...card, padding: "var(--s-3)" }}>
                      <div style={{ ...bodyText, fontWeight: 600, marginBottom: "4px" }}>{task.title}</div>
                      {task.detail && <div style={{ ...muted, marginBottom: "6px" }}>{task.detail}</div>}
                      <div style={{ ...muted, marginBottom: "8px" }}>
                        {task.assigneeName ? `For ${task.assigneeName}` : "Unassigned"}
                        {task.dueDate ? ` · Due ${task.dueDate}` : ""}
                        {` · ${formatDate(task.createdAt)}`}
                      </div>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {STATUS_ORDER.filter((s) => s !== task.status).map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus.mutate({ taskId: task.id, status: s as TaskStatus })}
                            disabled={updateStatus.isPending}
                            style={{ ...ghostButton, padding: "5px 10px", fontSize: "12px" }}
                          >
                            {STATUS_LABELS[s]}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
