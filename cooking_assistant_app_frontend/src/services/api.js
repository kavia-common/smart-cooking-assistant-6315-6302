/**
 * Service layer for backend API communication.
 * Reads base URL from env: REACT_APP_API_BASE (must be configured in .env).
 * All methods return { data, error } for explicit handling.
 */

const BASE_URL = process.env.REACT_APP_API_BASE || "http://localhost:4000/api"; // NOTE: configure via .env in deployment

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { data: null, error: new Error(`HTTP ${res.status} ${text}`) };
    }
    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json") ? await res.json() : await res.text();
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e };
  }
}

// PUBLIC_INTERFACE
export const RecipesAPI = {
  /** Get list of recipes with optional query: { q, cuisine, timeMax } */
  async list(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return request(`/recipes${qs ? `?${qs}` : ""}`);
  },
  /** Get recipe detail by id */
  async get(id) {
    return request(`/recipes/${id}`);
  },
};

// PUBLIC_INTERFACE
export const FavoritesAPI = {
  async list() { return request(`/favorites`); },
  async add(recipeId) {
    return request(`/favorites`, { method: "POST", body: JSON.stringify({ recipeId }) });
  },
  async remove(recipeId) {
    return request(`/favorites/${recipeId}`, { method: "DELETE" });
  },
};

// PUBLIC_INTERFACE
export const NotesAPI = {
  async list() { return request(`/notes`); },
  async upsert(recipeId, text) {
    return request(`/notes/${recipeId}`, { method: "PUT", body: JSON.stringify({ text }) });
  },
  async remove(recipeId) {
    return request(`/notes/${recipeId}`, { method: "DELETE" });
  },
};

// PUBLIC_INTERFACE
export const ShoppingListAPI = {
  async list() { return request(`/shopping-list`); },
  async add(item) { return request(`/shopping-list`, { method: "POST", body: JSON.stringify(item) }); },
  async update(id, partial) { return request(`/shopping-list/${id}`, { method: "PATCH", body: JSON.stringify(partial) }); },
  async remove(id) { return request(`/shopping-list/${id}`, { method: "DELETE" }); },
};

export default { RecipesAPI, FavoritesAPI, NotesAPI, ShoppingListAPI };
