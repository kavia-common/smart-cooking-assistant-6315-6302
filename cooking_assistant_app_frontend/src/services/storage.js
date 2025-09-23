/**
 * Lightweight storage helpers. Used as fallback or to keep UI state when offline.
 */

const LS_KEYS = {
  favorites: "sca_favorites",
  notes: "sca_notes",
  shopping: "sca_shopping_list",
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

// PUBLIC_INTERFACE
export const FavoritesStore = {
  getAll() { return read(LS_KEYS.favorites, []); },
  setAll(list) { write(LS_KEYS.favorites, list); },
};

// PUBLIC_INTERFACE
export const NotesStore = {
  getAll() { return read(LS_KEYS.notes, {}); },
  setAll(map) { write(LS_KEYS.notes, map); },
};

// PUBLIC_INTERFACE
export const ShoppingListStore = {
  getAll() { return read(LS_KEYS.shopping, []); },
  setAll(list) { write(LS_KEYS.shopping, list); },
};
