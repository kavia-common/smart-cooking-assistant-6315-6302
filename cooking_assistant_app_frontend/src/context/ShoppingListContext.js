import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ShoppingListAPI } from '../services/api';
import { ShoppingListStore } from '../services/storage';

const ShoppingListContext = createContext(null);

// PUBLIC_INTERFACE
export function useShoppingList() {
  /** Access shopping list context with items and operations. */
  const ctx = useContext(ShoppingListContext);
  if (!ctx) throw new Error('useShoppingList must be used within ShoppingListProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function ShoppingListProvider({ children }) {
  /** Provider to manage shopping list items, syncing with backend if available. */
  const [items, setItems] = useState(() => ShoppingListStore.getAll());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ShoppingListStore.setAll(items);
  }, [items]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    ShoppingListAPI.list().then(({ data }) => {
      if (mounted && data && Array.isArray(data)) {
        setItems(data);
      }
    }).finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const actions = useMemo(() => ({
    add: async (name, qty = 1, unit = '') => {
      const optimistic = [...items, { id: crypto.randomUUID(), name, qty, unit, done: false, temp: true }];
      setItems(optimistic);
      const { data, error } = await ShoppingListAPI.add({ name, qty, unit, done: false });
      if (!error && data) {
        setItems(prev => prev.map(i => i.temp && i.name === name ? data : i));
      }
    },
    toggle: async (id) => {
      setItems(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i));
      await ShoppingListAPI.update(id, { done: items.find(i => i.id === id)?.done ? false : true });
    },
    updateQty: async (id, qty) => {
      setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
      await ShoppingListAPI.update(id, { qty });
    },
    remove: async (id) => {
      setItems(prev => prev.filter(i => i.id !== id));
      await ShoppingListAPI.remove(id);
    },
    clearChecked: async () => {
      const remaining = items.filter(i => !i.done);
      const removed = items.filter(i => i.done);
      setItems(remaining);
      await Promise.all(removed.map(i => ShoppingListAPI.remove(i.id)));
    }
  }), [items]);

  return (
    <ShoppingListContext.Provider value={{ items, loading, ...actions }}>
      {children}
    </ShoppingListContext.Provider>
  );
}
