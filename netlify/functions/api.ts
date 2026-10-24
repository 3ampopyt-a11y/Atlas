import express from 'express';
import serverless from 'serverless-http';
import { createApiApp } from '../../api';

const app = express();

// netlify.toml rewrites /api/* here; depending on how the request arrives the path may still carry
// the function prefix, so map it back to the /api/... routes the app defines.
app.use((req, _res, next) => {
  req.url = req.url.replace(/^\/\.netlify\/functions\/api/, '/api');
  next();
});

// Netlify stops synchronous functions after ~10s, so the AI search has to answer (or give up) within that.
app.use(createApiApp({ aiBudgetMs: 9000, hedgeDelayMs: 3000 }));

export const handler = serverless(app);
