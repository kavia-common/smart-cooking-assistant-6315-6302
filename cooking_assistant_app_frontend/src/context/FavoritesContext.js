import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { FavoritesAPI } from '../services/api';
import { FavoritesStore } from '../services/storage';

const FavoritesContext = createContext(null);

// PUBLIC_INTERFACE
export function useFavorites() {
  /** Access favorites with helper actions and set membership. */
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function FavoritesProvider({ children }) {
  /** Manages favorite recipe IDs. */
  const [ids, setIds] = useState(() => FavoritesStore.getAll());

  useEffect(() => {
    FavoritesStore.setAll(ids);
  }, [ids]);

  useEffect(() => {
    let mounted = true;
    FavoritesAPI.list().then(({ data }) => {
      if (mounted && data && Array.isArray(data)) {
        setIds(data.map(r => r.id ?? r));
      }
    });
    return () => { mounted = false; };
  }, []);

  const actions = useMemo(() => ({
    toggle: async (recipeId) => {
      setIds(prev => prev.includes(recipeId) ? prev.filter(id => id !== recipeId) : [...prev, recipeId]);
      const exists = ids.includes(recipeId);
      if (exists) await FavoritesAPI.remove(recipeId);
      else await FavoritesAPI.add(recipeId);
    },
    has: (recipeId) => ids.includes(recipeId),
    list: () => ids.slice(),
  }), [ids]);

  return (
    <FavoritesContext.Provider value={{ ids, ...actions }}>
      {children}
    </FavoritesContext.Provider>
  );
}
