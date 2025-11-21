# React TMDB

Minimal Vite + React setup for the TMDB movie app component already present in `index.jsx`.

How to run:

```bash
npm install
npm run dev
```

Notes:
- Tailwind is configured and its directives are imported from `src/index.css`.
- The root React component is the default export from `index.jsx` (kept at project root). The Vite entry mounts it from `src/main.jsx`.
 
Environment / API key
- Create a `.env` file in the project root with your TMDB API key. You can copy the example provided:

```bash
cp .env.example .env
# then edit .env and set VITE_TMDB_API_KEY to your key
```

Vite will expose env variables prefixed with `VITE_` to the client code. `index.jsx` reads the key from `import.meta.env.VITE_TMDB_API_KEY` and falls back to the bundled demo key if the env var is not present.
