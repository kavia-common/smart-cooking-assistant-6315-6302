import React, { useState } from 'react';
import { useShoppingList } from '../context/ShoppingListContext';

// PUBLIC_INTERFACE
export default function ShoppingListSidebar() {
  /** Sidebar for managing the ingredient shopping list. */
  const { items, add, toggle, updateQty, remove, clearChecked, loading } = useShoppingList();
  const [name, setName] = useState('');
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState('');

  const onAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    add(name.trim(), Number(qty) || 1, unit.trim());
    setName(''); setQty(1); setUnit('');
  };

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Shopping List</h3>
      <form onSubmit={onAdd} className="card" style={{ display:'grid', gap: 8 }}>
        <input className="input" placeholder="Add ingredient..." value={name} onChange={e => setName(e.target.value)} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 8 }}>
          <input className="input" type="number" min="0" step="1" value={qty} onChange={e => setQty(e.target.value)} placeholder="Qty" />
          <input className="input" value={unit} onChange={e => setUnit(e.target.value)} placeholder="Unit (e.g., g, pcs)" />
          <button className="btn" type="submit">Add</button>
        </div>
      </form>

      <div className="list-items" aria-busy={loading}>
        {items.map(item => (
          <div className="list-item" key={item.id}>
            <input type="checkbox" checked={!!item.done} onChange={() => toggle(item.id)} aria-label={`Mark ${item.name} as ${item.done?'not done':'done'}`} />
            <div>
              <div style={{ fontWeight: 700, textDecoration: item.done ? 'line-through' : 'none' }}>{item.name}</div>
              <div className="qty">{item.qty} {item.unit}</div>
            </div>
            <div style={{ display:'flex', gap: 8 }}>
              <button className="btn ghost" onClick={() => updateQty(item.id, Math.max(0, (Number(item.qty) || 0) - 1))} aria-label="Decrease quantity">-</button>
              <button className="btn ghost" onClick={() => updateQty(item.id, (Number(item.qty) || 0) + 1)} aria-label="Increase quantity">+</button>
              <button className="btn ghost" onClick={() => remove(item.id)} aria-label="Remove item">✕</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, display:'flex', justifyContent:'space-between' }}>
        <button className="btn ghost" onClick={clearChecked}>Clear checked</button>
      </div>
    </div>
  );
}
