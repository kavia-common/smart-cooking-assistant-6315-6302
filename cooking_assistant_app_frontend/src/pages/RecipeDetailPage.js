import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesAPI } from '../services/api';
import { useShoppingList } from '../context/ShoppingListContext';
import { useFavorites } from '../context/FavoritesContext';
import { useNotes } from '../context/NotesContext';
import InteractiveTimer from '../components/InteractiveTimer';

const fallback = {
  id: '1',
  title: 'Spaghetti Pomodoro',
  image: '',
  cuisine: 'Italian',
  readyInMinutes: 25,
  ingredients: [
    { name: 'Spaghetti', qty: 200, unit: 'g' },
    { name: 'Tomatoes', qty: 3, unit: 'pcs' },
    { name: 'Garlic', qty: 2, unit: 'cloves' },
    { name: 'Basil', qty: 5, unit: 'leaves' },
  ],
  steps: [
    { text: 'Boil water and salt it generously. Add spaghetti and cook al dente.', timerSec: 8*60 },
    { text: 'Sauté garlic, add chopped tomatoes, simmer into sauce.', timerSec: 10*60 },
    { text: 'Toss pasta with sauce and fresh basil. Serve hot.', timerSec: 0 },
  ]
};

// PUBLIC_INTERFACE
export default function RecipeDetailPage() {
  /** Shows single recipe details including steps and ingredient actions. */
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { add: addItem } = useShoppingList();
  const { has, toggle } = useFavorites();
  const { get: getNote, set: setNote } = useNotes();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    RecipesAPI.get(id).then(({ data }) => {
      if (mounted) setRecipe(data && data.id ? data : { ...fallback, id });
    }).finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [id]);

  const isFav = useMemo(() => has(id), [has, id]);

  if (loading) return <div className="card">Loading...</div>;
  if (!recipe) return <div className="card">Recipe not found.</div>;

  return (
    <div style={{ display:'grid', gap: 16 }}>
      <div className="card" style={{ display:'grid', gridTemplateColumns:'minmax(240px, 420px) 1fr', gap: 16 }}>
        <img className="recipe-thumb" alt={recipe.title} src={recipe.image || `https://source.unsplash.com/featured/800x600?${encodeURIComponent(recipe.title)}`} />
        <div>
          <h2 style={{ marginTop: 0 }}>{recipe.title}</h2>
          <div className="muted">{recipe.cuisine || 'General'} · {recipe.readyInMinutes || recipe.time || 30} min</div>
          <div style={{ display:'flex', gap: 8, marginTop: 12 }}>
            <button className="btn" onClick={() => {
              recipe.ingredients?.forEach(i => addItem(i.name, i.qty || 1, i.unit || ''));
            }}>Add all ingredients to list</button>
            <button className="btn ghost" onClick={() => toggle(recipe.id)}> {isFav ? '★ Remove Favorite' : '☆ Add Favorite'} </button>
          </div>
        </div>
      </div>

      <section className="card">
        <h3 style={{ marginTop: 0 }}>Ingredients</h3>
        <div className="list-items">
          {recipe.ingredients?.map((i, idx) => (
            <div className="list-item" key={idx}>
              <div />
              <div><strong>{i.name}</strong><div className="qty">{i.qty} {i.unit}</div></div>
              <button className="btn ghost" onClick={() => addItem(i.name, i.qty || 1, i.unit || '')}>Add</button>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h3 style={{ marginTop: 0 }}>Instructions</h3>
        <div>
          {recipe.steps?.map((s, idx) => (
            <div className="step" key={idx}>
              <div className="num">{idx+1}</div>
              <div>{s.text}</div>
              <div>
                {s.timerSec ? <InteractiveTimer seconds={s.timerSec} /> : <span className="muted">No timer</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h3 style={{ marginTop: 0 }}>My Notes</h3>
        <textarea className="input" rows={5} defaultValue={getNote(id)} placeholder="Write your cooking notes here..." onBlur={(e) => setNote(id, e.target.value)} />
        <div className="muted">Notes autosave on blur.</div>
      </section>
    </div>
  );
}
