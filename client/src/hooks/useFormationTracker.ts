import { useState, useEffect, useCallback, useMemo } from "react";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";

const STORAGE_KEY = "livewell-formation-tracker";

export interface ArticleRecord {
  slug: string;
  title: string;
  readAt: string;
}

export interface PathRecord {
  slug: string;
  title: string;
  startedAt: string;
}

export interface PathCompletedRecord {
  slug: string;
  title: string;
  completedAt: string;
}

export interface ToolRecord {
  slug: string;
  title: string;
  usedAt: string;
}

export interface BibleBookRecord {
  name: string;
  studiedAt: string;
}

export interface NoteRecord {
  id: string;
  text: string;
  articleSlug: string;
  createdAt: string;
}

export interface FormationData {
  articlesRead: ArticleRecord[];
  pathsStarted: PathRecord[];
  pathsCompleted: PathCompletedRecord[];
  toolsUsed: ToolRecord[];
  bibleBooks: BibleBookRecord[];
  savedNotes: NoteRecord[];
}

export interface FormationStats {
  totalArticles: number;
  totalTools: number;
  totalBooks: number;
  pathsCompleted: number;
  streak: number;
  lastActive: string | null;
}

/** Keep only entries that are objects carrying every required string field. */
function recordArray<T>(v: unknown, fields: (keyof T & string)[]): T[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is T => {
    if (typeof x !== "object" || x === null) return false;
    const r = x as Record<string, unknown>;
    return fields.every((f) => typeof r[f] === "string");
  });
}

function loadData(): FormationData {
  const parsed = readStoredJSON<Record<string, unknown>>(
    STORAGE_KEY,
    (x): x is Record<string, unknown> =>
      typeof x === "object" && x !== null && !Array.isArray(x),
    {}
  );
  return {
    articlesRead: recordArray<ArticleRecord>(parsed.articlesRead, ["slug", "title", "readAt"]),
    pathsStarted: recordArray<PathRecord>(parsed.pathsStarted, ["slug", "title", "startedAt"]),
    pathsCompleted: recordArray<PathCompletedRecord>(parsed.pathsCompleted, ["slug", "title", "completedAt"]),
    toolsUsed: recordArray<ToolRecord>(parsed.toolsUsed, ["slug", "title", "usedAt"]),
    bibleBooks: recordArray<BibleBookRecord>(parsed.bibleBooks, ["name", "studiedAt"]),
    savedNotes: recordArray<NoteRecord>(parsed.savedNotes, ["id", "text", "articleSlug", "createdAt"]),
  };
}

function saveData(data: FormationData): void {
  writeStoredJSON(STORAGE_KEY, data);
}

/** Date string (YYYY-MM-DD) from an ISO timestamp. */
function toDateStr(iso: string): string {
  return iso.slice(0, 10);
}

/**
 * Count consecutive days backwards from today where at least one
 * activity was logged.
 */
function calculateStreak(data: FormationData): number {
  const activityDates = new Set<string>();

  for (const a of data.articlesRead) activityDates.add(toDateStr(a.readAt));
  for (const p of data.pathsStarted) activityDates.add(toDateStr(p.startedAt));
  for (const p of data.pathsCompleted) activityDates.add(toDateStr(p.completedAt));
  for (const t of data.toolsUsed) activityDates.add(toDateStr(t.usedAt));
  for (const b of data.bibleBooks) activityDates.add(toDateStr(b.studiedAt));
  for (const n of data.savedNotes) activityDates.add(toDateStr(n.createdAt));

  if (activityDates.size === 0) return 0;

  let streak = 0;
  const now = new Date();
  // Start from today and walk backwards
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  while (true) {
    const key =
      cursor.getFullYear() +
      "-" +
      String(cursor.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(cursor.getDate()).padStart(2, "0");
    if (activityDates.has(key)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function getLastActive(data: FormationData): string | null {
  const timestamps: string[] = [];
  for (const a of data.articlesRead) timestamps.push(a.readAt);
  for (const p of data.pathsStarted) timestamps.push(p.startedAt);
  for (const p of data.pathsCompleted) timestamps.push(p.completedAt);
  for (const t of data.toolsUsed) timestamps.push(t.usedAt);
  for (const b of data.bibleBooks) timestamps.push(b.studiedAt);
  for (const n of data.savedNotes) timestamps.push(n.createdAt);

  if (timestamps.length === 0) return null;
  timestamps.sort();
  return timestamps[timestamps.length - 1];
}

export function useFormationTracker() {
  const [data, setData] = useState<FormationData>(loadData);

  // Persist whenever data changes
  useEffect(() => {
    saveData(data);
  }, [data]);

  const markArticleRead = useCallback((slug: string, title: string) => {
    setData((prev) => {
      if (prev.articlesRead.some((a) => a.slug === slug)) return prev;
      return {
        ...prev,
        articlesRead: [
          ...prev.articlesRead,
          { slug, title, readAt: new Date().toISOString() },
        ],
      };
    });
  }, []);

  const startPath = useCallback((slug: string, title: string) => {
    setData((prev) => {
      if (prev.pathsStarted.some((p) => p.slug === slug)) return prev;
      return {
        ...prev,
        pathsStarted: [
          ...prev.pathsStarted,
          { slug, title, startedAt: new Date().toISOString() },
        ],
      };
    });
  }, []);

  const completePath = useCallback((slug: string, title: string) => {
    setData((prev) => {
      if (prev.pathsCompleted.some((p) => p.slug === slug)) return prev;
      return {
        ...prev,
        pathsCompleted: [
          ...prev.pathsCompleted,
          { slug, title, completedAt: new Date().toISOString() },
        ],
      };
    });
  }, []);

  const markToolUsed = useCallback((slug: string, title: string) => {
    setData((prev) => {
      if (prev.toolsUsed.some((t) => t.slug === slug)) return prev;
      return {
        ...prev,
        toolsUsed: [
          ...prev.toolsUsed,
          { slug, title, usedAt: new Date().toISOString() },
        ],
      };
    });
  }, []);

  const markBookStudied = useCallback((name: string) => {
    setData((prev) => {
      if (prev.bibleBooks.some((b) => b.name === name)) return prev;
      return {
        ...prev,
        bibleBooks: [
          ...prev.bibleBooks,
          { name, studiedAt: new Date().toISOString() },
        ],
      };
    });
  }, []);

  const addNote = useCallback((text: string, articleSlug: string) => {
    setData((prev) => ({
      ...prev,
      savedNotes: [
        ...prev.savedNotes,
        {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
          text,
          articleSlug,
          createdAt: new Date().toISOString(),
        },
      ],
    }));
  }, []);

  const removeNote = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      savedNotes: prev.savedNotes.filter((n) => n.id !== id),
    }));
  }, []);

  const getStats = useCallback((): FormationStats => {
    return {
      totalArticles: data.articlesRead.length,
      totalTools: data.toolsUsed.length,
      totalBooks: data.bibleBooks.length,
      pathsCompleted: data.pathsCompleted.length,
      streak: calculateStreak(data),
      lastActive: getLastActive(data),
    };
  }, [data]);

  const stats = useMemo(() => getStats(), [getStats]);

  return {
    data,
    stats,
    markArticleRead,
    startPath,
    completePath,
    markToolUsed,
    markBookStudied,
    addNote,
    removeNote,
    getStats,
  };
}
