import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { createApiApp } from './api.ts';

async function startServer() {
  const app = createApiApp();

  // Allow port override via CLI arguments or environment variable
  let port = 3000;
  const portArgIdx = process.argv.indexOf('--port');
  if (portArgIdx !== -1 && process.argv[portArgIdx + 1]) {
    const parsed = parseInt(process.argv[portArgIdx + 1], 10);
    if (!isNaN(parsed) && parsed > 0) port = parsed;
  } else if (process.env.APP_PORT) {
    const parsed = parseInt(process.env.APP_PORT, 10);
    if (!isNaN(parsed) && parsed > 0) port = parsed;
  }

  let vite: any = null;

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Fallback SPA handler for development
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      // Skip API routes so 404s on API are returned properly
      if (url.startsWith('/api')) {
        return next();
      }
      try {
        const indexPath = path.resolve(process.cwd(), 'index.html');
        if (fs.existsSync(indexPath)) {
          let template = fs.readFileSync(indexPath, 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } else {
          next();
        }
      } catch (e) {
        if (vite) vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`  ➜  Local:   http://localhost:${port}/`);
    console.log(`  ➜  Network: http://0.0.0.0:${port}/`);
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on('error', (err: any) => {
    console.error(`Server listen error:`, err);
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, retrying in 1s...`);
      setTimeout(() => {
        server.close();
        server.listen(port, '0.0.0.0');
      }, 1000);
    }
  });

  const cleanup = async () => {
    console.log('Shutting down server...');
    if (vite) {
      try {
        await vite.close();
      } catch {}
    }
    server.close(() => {
      process.exit(0);
    });
  };

  process.on('SIGTERM', cleanup);
  process.on('SIGINT', cleanup);
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
