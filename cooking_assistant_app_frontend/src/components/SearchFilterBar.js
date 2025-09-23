import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function SearchFilterBar({ onChange }) {
  /**
   * Search and filter bar.
   * onChange receives { q, cuisine, timeMax }
   */
  const [q, setQ] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [timeMax, setTimeMax] = useState('');

  const submit = (e) => {
    e?.preventDefault?.();
    onChange?.({ q, cuisine, timeMax });
  };

  return (
    <form onSubmit={submit} className="card" role="search" aria-label="Recipe search and filters">
      <div className="filters">
        <input className="input" placeholder="Search recipes (e.g., pasta, chicken, vegan)..." value={q} onChange={e => setQ(e.target.value)} />
        <select value={cuisine} onChange={e => setCuisine(e.target.value)}>
          <option value="">Any cuisine</option>
          <option>Italian</option>
          <option>Mexican</option>
          <option>Indian</option>
          <option>French</option>
          <option>Chinese</option>
          <option>American</option>
          <option>Mediterranean</option>
        </select>
        <select value={timeMax} onChange={e => setTimeMax(e.target.value)}>
          <option value="">Any time</option>
          <option value="15">≤ 15 min</option>
          <option value="30">≤ 30 min</option>
          <option value="45">≤ 45 min</option>
          <option value="60">≤ 60 min</option>
        </select>
        <button type="submit" className="btn">Search</button>
      </div>
    </form>
  );
}
