import React, { useEffect, useState } from 'react';
import SearchFilterBar from '../components/SearchFilterBar';
import RecipeCard from '../components/RecipeCard';
import { RecipesAPI } from '../services/api';

const demoFallback = [
  { id: '1', title: 'Spaghetti Pomodoro', cuisine: 'Italian', time: 25 },
  { id: '2', title: 'Chicken Tacos', cuisine: 'Mexican', time: 30 },
  { id: '3', title: 'Veggie Stir-Fry', cuisine: 'Chinese', time: 20 },
  { id: '4', title: 'Butter Chicken', cuisine: 'Indian', time: 40 },
];

// PUBLIC_INTERFACE
export default function RecipesPage() {
  /** Displays recipe browsing list with search and filters. */
  const [filters, setFilters] = useState({});
  const [recipes, setRecipes] = useState(demoFallback);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (params = {}) => {
    setLoading(true);
    const { data, error } = await RecipesAPI.list(params);
    if (!error && data && Array.isArray(data)) setRecipes(data);
    else setRecipes(demoFallback);
    setLoading(false);
  };

  useEffect(() => { fetchRecipes(filters); /* eslint-disable-next-line */ }, [JSON.stringify(filters)]);

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Browse Recipes</h2>
      <SearchFilterBar onChange={setFilters} />
      {loading ? <div className="card">Loading...</div> : (
        <div className="recipe-grid">
          {recipes.map(r => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      )}
    </div>
  );
}
