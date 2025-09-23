import React from 'react';
import { useNotes } from '../context/NotesContext';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function NotesPage() {
  /** Lists all user notes keyed by recipe ID. */
  const { notes, remove } = useNotes();
  const entries = Object.entries(notes);

  if (!entries.length) return <div className="card">You have no notes yet. Open a recipe and add your first note!</div>;

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>My Notes</h2>
      <div style={{ display:'grid', gap: 10 }}>
        {entries.map(([id, text]) => (
          <div className="note" key={id} style={{ display:'grid', gap: 8 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <strong>Recipe #{id}</strong>
              <div style={{ display:'flex', gap: 8 }}>
                <Link className="btn ghost" to={`/recipes/${id}`}>Open</Link>
                <button className="btn ghost" onClick={() => remove(id)}>Delete</button>
              </div>
            </div>
            <div style={{ whiteSpace:'pre-wrap' }}>{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
