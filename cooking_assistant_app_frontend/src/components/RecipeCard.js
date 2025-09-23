import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe }) {
  /** Card for a single recipe with favorite toggle. */
  const { has, toggle } = useFavorites();
  const isFav = has(recipe.id);

  return (
    <div className="card recipe-card">
      <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img className="recipe-thumb" src={recipe.image || `https://source.unsplash.com/featured/400x300?food,${encodeURIComponent(recipe.title)}`} alt={recipe.title} />
        <div className="recipe-title">{recipe.title}</div>
        <div className="muted">{recipe.cuisine || 'General'} · {recipe.time || recipe.readyInMinutes || 30} min</div>
      </Link>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop: 10 }}>
        <button className="btn ghost" onClick={() => toggle(recipe.id)} aria-label="Toggle favorite">
          {isFav ? '★ Favorited' : '☆ Favorite'}
        </button>
        <Link to={`/recipes/${recipe.id}`} className="btn">View</Link>
      </div>
    </div>
  );
}
