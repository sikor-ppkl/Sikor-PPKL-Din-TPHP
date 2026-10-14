import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function convertSpreadsheetUrlToCsv(rawUrl: string): string {
  // If user pasted a Google Sheets URL: https://docs.google.com/spreadsheets/d/{id}/edit...
  const match = rawUrl.match(/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match) {
    const id = match[1];
    let gid = '0';
    const gidMatch = rawUrl.match(/gid=([0-9]+)/);
    if (gidMatch) gid = gidMatch[1];
    return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;
  }
  return rawUrl;
}

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  // Simple CSV line splitter that handles quotes
  const splitLine = (str: string): string[] => {
    const res: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if (c === ',' && !inQuotes) {
        res.push(cur.trim().replace(/^"|"$/g, ''));
        cur = '';
      } else {
        cur += c;
      }
    }
    res.push(cur.trim().replace(/^"|"$/g, ''));
    return res;
  };

  const headers = splitLine(lines[0]);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = splitLine(lines[i]);
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = values[idx] || '';
    });
    rows.push(obj);
  }

  return rows;
}

function asnDataProxyPlugin(): Plugin {
  const handler = async (req: any, res: any, next: any) => {
    try {
      const urlObj = new URL(req.url || '', 'http://localhost:3000');
      if (urlObj.pathname === '/api/asn-data' || urlObj.pathname === '/api/aset-data') {
        const isAset = urlObj.pathname === '/api/aset-data';
        const defaultTarget = isAset
          ? 'https://script.google.com/macros/s/AKfycbxVQf52E0pkJz5JpQXVH5mnprBacz6NhQNOXuMs3ik4hN7Lbu_7PHc-DvG0aY8JQeDjQg/exec'
          : 'https://script.google.com/macros/s/AKfycbxSoOOfNblJcPUy4LqIUliJS2_RlpkzvtHDzKluYftpNxFAlrgocxNSrKhMN8O3ex71/exec';
        
        const rawTarget = urlObj.searchParams.get('url') || defaultTarget;
        
        const targetUrl = convertSpreadsheetUrlToCsv(rawTarget.replace(/\s+/g, ''));
        
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        try {
          const resp = await fetch(targetUrl, {
            redirect: 'follow',
            headers: { 
              'Accept': 'application/json, text/csv, text/plain, */*' 
            }
          });

          const bodyText = await resp.text();

          // 1. Check for missing doGet function in Apps Script
          if (bodyText.includes('Script function not found: doGet')) {
            res.statusCode = 200;
            res.end(JSON.stringify({
              success: false,
              errorType: 'DOGET_NOT_FOUND',
              message: 'Fungsi "doGet" belum ditemukan di Google Apps Script (Code.gs). Silakan tambahkan fungsi doGet(e) di script editor.'
            }));
            return;
          }

          // 2. Check for Permission/Login page (403 or HTML login)
          if (resp.status === 403 || bodyText.includes('drive-logo') || bodyText.includes('You need access') || bodyText.includes('accounts.google.com')) {
            res.statusCode = 200;
            res.end(JSON.stringify({
              success: false,
              errorType: 'PERMISSION_403',
              message: 'Google Apps Script memerlukan izin publik. Atur "Who has access" ke "Anyone".'
            }));
            return;
          }

          // 3. Try parsing as JSON first
          try {
            const parsed = JSON.parse(bodyText);
            res.statusCode = 200;
            res.end(JSON.stringify({
              success: true,
              data: parsed
            }));
            return;
          } catch {
            // If not JSON, check if it's CSV
            if (targetUrl.includes('export?format=csv') || bodyText.includes(',') || bodyText.includes('\n')) {
              const csvRows = parseCsv(bodyText);
              if (csvRows.length > 0) {
                res.statusCode = 200;
                res.end(JSON.stringify({
                  success: true,
                  data: csvRows
                }));
                return;
              }
            }

            res.statusCode = 200;
            res.end(JSON.stringify({
              success: false,
              errorType: 'INVALID_DATA',
              message: 'Respon dari Google Spreadsheet bukan format JSON atau CSV yang valid.',
              sample: bodyText.slice(0, 150)
            }));
            return;
          }
        } catch (fetchErr: any) {
          res.statusCode = 200;
          res.end(JSON.stringify({
            success: false,
            errorType: 'NETWORK_ERROR',
            message: fetchErr?.message || 'Gagal menghubungi Google Apps Script endpoint.'
          }));
          return;
        }
      }
    } catch {
      // Fall through to next middleware
    }
    next();
  };

  return {
    name: 'asn-data-proxy',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), asnDataProxyPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
