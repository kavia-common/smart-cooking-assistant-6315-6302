import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';

// PUBLIC_INTERFACE
export default function FavoritesPage() {
  /** Displays list of favorited recipes. */
  const { ids } = useFavorites();

  if (!ids.length) return <div className="card">No favorites yet. Browse recipes and mark ★ to save them.</div>;

  // Placeholder items for UI when backend doesn't provide detail fetch by ids
  const recipes = ids.map((id) => ({
    id,
    title: `Favorite Recipe #${id}`,
    cuisine: 'General',
    time: 30,
  }));

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>My Favorites</h2>
      <div className="recipe-grid">
        {recipes.map(r => <RecipeCard key={r.id} recipe={r} />)}
      </div>
    </div>
  );
}
