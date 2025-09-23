# Smart Cooking Assistant Frontend

This React app implements:
- Recipe browsing with search and filters
- Recipe details with step-by-step instructions and interactive timers
- Ingredients shopping list (side panel)
- Favorites and Notes

Styling uses primary #FF7043 and secondary #FFC107 with a light theme.

## Run locally

- npm install
- npm start

Open http://localhost:3000

## Environment variables

Create a `.env` file at project root with:

REACT_APP_API_BASE=https://your-backend-host/api

Do not commit secrets. In CI/CD, set env var securely.

## Backend API contract (expected)

- GET    /api/recipes?q=&cuisine=&timeMax=
- GET    /api/recipes/:id
- GET    /api/favorites
- POST   /api/favorites { recipeId }
- DELETE /api/favorites/:recipeId
- GET    /api/notes
- PUT    /api/notes/:recipeId { text }
- DELETE /api/notes/:recipeId
- GET    /api/shopping-list
- POST   /api/shopping-list { name, qty, unit, done }
- PATCH  /api/shopping-list/:id { qty?, unit?, done? }
- DELETE /api/shopping-list/:id

All responses are JSON. This app also persists to localStorage as fallback.

## Folder structure

- src/pages: recipes list, recipe detail, favorites, notes
- src/components: reusable UI (recipe card, search bar, timers, shopping list sidebar)
- src/context: app state contexts
- src/services: api layer and local storage helpers

