// Servidor local solo para vista previa.
// No hace parte del sitio publicado.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'portafolio');
const SRC = path.join(ROOT, '_canva-src');
const TOOLS = path.join(ROOT, '_tools');
const PORT = Number(process.env.PORT) || 5173;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.mp4': 'video/mp4',
  '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8'
};

function safeJoin(base, rel) {
  const p = path.resolve(base, '.' + path.sep + rel);
  if (p !== base && !p.startsWith(base + path.sep)) throw new Error('ruta inválida');
  return p;
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    let base = SITE;
    let rel = decodeURIComponent(url.pathname);
    if (rel.startsWith('/__src/')) { base = SRC; rel = rel.slice('/__src'.length); }
    else if (rel.startsWith('/__tools/')) { base = TOOLS; rel = rel.slice('/__tools'.length); }
    if (rel.endsWith('/')) rel += 'index.html';
    const file = safeJoin(base, rel);
    const info = await stat(file);
    const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';

    // Soporte de rangos para que los MP4 se puedan adelantar.
    const range = req.headers.range && /bytes=(\d*)-(\d*)/.exec(req.headers.range);
    if (range) {
      const start = range[1] ? Number(range[1]) : 0;
      const end = range[2] ? Number(range[2]) : info.size - 1;
      res.writeHead(206, {
        'Content-Type': type, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store',
        'Content-Range': `bytes ${start}-${end}/${info.size}`, 'Content-Length': end - start + 1
      });
      return createReadStream(file, { start, end }).pipe(res);
    }
    res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('no encontrado');
  }
}).listen(PORT, '127.0.0.1', () => console.log(`Vista previa en http://localhost:${PORT}`));
