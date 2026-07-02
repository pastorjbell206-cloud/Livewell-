import { useState, useEffect, useCallback } from "react";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";

export interface FavoriteItem {
  id: string;
  type: "verse" | "prayer" | "assessment-result" | "article";
  content: Record<string, string>;
  savedAt: string;
}

/** Shape guard for one stored record; malformed entries are skipped, not fatal. */
function isFavoriteItem(x: unknown): x is FavoriteItem {
  if (typeof x !== "object" || x === null) return false;
  const f = x as Record<string, unknown>;
  return (
    typeof f.id === "string" &&
    typeof f.type === "string" &&
    typeof f.content === "object" &&
    f.content !== null &&
    typeof f.savedAt === "string"
  );
}

export function useFavorites(storageKey: string) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() =>
    readStoredJSON<unknown[]>(storageKey, Array.isArray, []).filter(isFavoriteItem)
  );

  useEffect(() => {
    writeStoredJSON(storageKey, favorites);
  }, [favorites, storageKey]);

  const addFavorite = useCallback(
    (item: Omit<FavoriteItem, "savedAt">) => {
      setFavorites((prev) => {
        if (prev.some((f) => f.id === item.id)) return prev;
        return [...prev, { ...item, savedAt: new Date().toISOString() }];
      });
    },
    []
  );

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const clearAll = useCallback(() => {
    setFavorites([]);
  }, []);

  return { favorites, addFavorite, removeFavorite, isFavorite, clearAll };
}
