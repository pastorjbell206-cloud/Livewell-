import { useState, useEffect, useCallback } from "react";

export interface FavoriteItem {
  id: string;
  type: "verse" | "prayer" | "assessment-result" | "article";
  content: Record<string, string>;
  savedAt: string;
}

export function useFavorites(storageKey: string) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(favorites));
    } catch {
      // localStorage full or unavailable — fail silently
    }
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
