import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import NotesPage from './pages/NotesPage';
import ShoppingListSidebar from './components/ShoppingListSidebar';
import { ShoppingListProvider } from './context/ShoppingListContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { NotesProvider } from './context/NotesContext';

/* Set document title on app load */
function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

// PUBLIC_INTERFACE
function App() {
  /** Root application shell wiring routing, sidebar, header, and providers. */
  useDocumentTitle('Smart Cooking Agent');
  return (
    <BrowserRouter>
      <NotesProvider>
        <FavoritesProvider>
          <ShoppingListProvider>
            <div className="app-shell">
              <HeaderNav />
              <aside className="sidebar">
                <ShoppingListSidebar />
              </aside>
              <main className="main">
                <Routes>
                  <Route path="/" element={<RecipesPage />} />
                  <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/notes" element={<NotesPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ShoppingListProvider>
        </FavoritesProvider>
      </NotesProvider>
    </BrowserRouter>
  );
}

function HeaderNav() {
  return (
    <header className="header">
      <div className="brand">
        <div className="logo">🍳</div>
        Smart Chef --pro
      </div>
      <nav className="nav">
        <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Recipes</NavLink>
        <NavLink to="/favorites" className={({isActive}) => isActive ? 'active' : ''}>Favorites</NavLink>
        <NavLink to="/notes" className={({isActive}) => isActive ? 'active' : ''}>Notes</NavLink>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <small>© {new Date().getFullYear()} Smart Cooking Agent</small>
      <small>Primary #FF7043 · Secondary #FFC107 · Light theme</small>
    </footer>
  );
}

export default App;
