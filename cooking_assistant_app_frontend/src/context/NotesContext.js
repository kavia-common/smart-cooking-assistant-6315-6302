import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { NotesAPI } from '../services/api';
import { NotesStore } from '../services/storage';

const NotesContext = createContext(null);

// PUBLIC_INTERFACE
export function useNotes() {
  /** Access notes with get/set operations keyed by recipeId. */
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function NotesProvider({ children }) {
  /** Manages notes keyed by recipeId. */
  const [notes, setNotes] = useState(() => NotesStore.getAll());

  useEffect(() => {
    NotesStore.setAll(notes);
  }, [notes]);

  useEffect(() => {
    let mounted = true;
    NotesAPI.list().then(({ data }) => {
      if (mounted && data && typeof data === 'object') {
        setNotes(data);
      }
    });
    return () => { mounted = false; };
  }, []);

  const actions = useMemo(() => ({
    set: async (recipeId, text) => {
      setNotes(prev => ({ ...prev, [recipeId]: text }));
      await NotesAPI.upsert(recipeId, text);
    },
    get: (recipeId) => notes[recipeId] || "",
    remove: async (recipeId) => {
      const { [recipeId]: _, ...rest } = notes;
      setNotes(rest);
      await NotesAPI.remove(recipeId);
    }
  }), [notes]);

  return (
    <NotesContext.Provider value={{ notes, ...actions }}>
      {children}
    </NotesContext.Provider>
  );
}
