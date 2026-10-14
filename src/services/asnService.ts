import { AsnItem } from '../types';
import { MOCK_DATA_ASN } from '../data/mockData';

export const DEFAULT_ASN_API_URL = 
  'https://script.google.com/macros/s/AKfycbxSoOOfNblJcPUy4LqIUliJS2_RlpkzvtHDzKluYftpNxFAlrgocxNSrKhMN8O3ex71/exec';

const STORAGE_KEY_URL = 'sikor_asn_api_url';
const STORAGE_KEY_CACHE = 'sikor_asn_cache_data_v3';
const STORAGE_KEY_CACHE_TIME = 'sikor_asn_cache_time_v3';

export type AsnErrorType = 'PERMISSION_403' | 'DOGET_NOT_FOUND' | 'NETWORK_ERROR' | 'INVALID_DATA' | null;

export interface AsnFetchResult {
  data: AsnItem[];
  isLive: boolean;
  totalPns: number;
  totalPppk: number;
  lastUpdated: string;
  sourceUrl: string;
  error?: string;
  errorType?: AsnErrorType;
}

export const RECOMMENDED_APPS_SCRIPT_CODE = `function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    // Membaca sheet aktif atau sheet pertama
    const sheet = ss.getSheetByName("ASN") || ss.getSheetByName("Data ASN") || ss.getSheets()[0];
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const headers = data[0].map(h => String(h).trim());
    const result = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      // Lewati baris kosong
      if (!row || row.every(cell => cell === "" || cell === null)) continue;
      
      const item = {};
      headers.forEach((header, index) => {
        let val = row[index];
        if (val instanceof Date) {
          val = Utilities.formatDate(val, "GMT+8", "yyyy-MM-dd");
        }
        item[header] = val !== undefined ? String(val).trim() : "";
      });
      result.push(item);
    }
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

export function cleanUrl(url: string): string {
  return url.replace(/[\r\n\s]+/g, '').trim();
}

export function convertSpreadsheetUrlToCsv(rawUrl: string): string {
  const cleaned = cleanUrl(rawUrl);
  const match = cleaned.match(/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match) {
    const id = match[1];
    let gid = '0';
    const gidMatch = cleaned.match(/gid=([0-9]+)/);
    if (gidMatch) gid = gidMatch[1];
    return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;
  }
  return cleaned;
}

export function parseCsvText(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

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

export function getStoredApiUrl(): string {
  if (typeof window === 'undefined') return DEFAULT_ASN_API_URL;
  const stored = localStorage.getItem(STORAGE_KEY_URL);
  return stored ? cleanUrl(stored) : DEFAULT_ASN_API_URL;
}

export function saveApiUrl(url: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_URL, cleanUrl(url));
}

export function resetApiUrl(): string {
  if (typeof window === 'undefined') return DEFAULT_ASN_API_URL;
  localStorage.removeItem(STORAGE_KEY_URL);
  return DEFAULT_ASN_API_URL;
}

export function getCachedAsnData(): { data: AsnItem[]; lastUpdated: string } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CACHE);
    const time = localStorage.getItem(STORAGE_KEY_CACHE_TIME);
    if (raw && time) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return { data: parsed, lastUpdated: time };
      }
    }
  } catch (e) {
    console.error('Error reading cached ASN data', e);
  }
  return null;
}

export function setCachedAsnData(data: AsnItem[], timeStr: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_CACHE, JSON.stringify(data));
    localStorage.setItem(STORAGE_KEY_CACHE_TIME, timeStr);
  } catch (e) {
    console.error('Error storing cached ASN data', e);
  }
}

/**
 * Universal flexible parser for data coming from Google Apps Script / Google Sheets
 */
export function normalizeAsnRecords(raw: unknown): AsnItem[] {
  if (!raw) return [];

  let items: any[] = [];

  // Check if it's an object with array property
  if (Array.isArray(raw)) {
    // Check if it's 2D array: [ [headers...], [row1...], [row2...] ]
    if (raw.length > 1 && Array.isArray(raw[0])) {
      const headers = raw[0].map((h: any) => String(h).trim().toLowerCase());
      items = raw.slice(1).map((row: any[]) => {
        const obj: Record<string, any> = {};
        headers.forEach((h: string, idx: number) => {
          obj[h] = row[idx] !== undefined ? row[idx] : '';
        });
        return obj;
      });
    } else {
      items = raw;
    }
  } else if (typeof raw === 'object') {
    const obj = raw as Record<string, any>;
    if (Array.isArray(obj.data)) items = obj.data;
    else if (Array.isArray(obj.result)) items = obj.result;
    else if (Array.isArray(obj.records)) items = obj.records;
    else if (Array.isArray(obj.values)) {
      if (Array.isArray(obj.values[0])) {
        const headers = obj.values[0].map((h: any) => String(h).trim().toLowerCase());
        items = obj.values.slice(1).map((row: any[]) => {
          const rowObj: Record<string, any> = {};
          headers.forEach((h: string, idx: number) => {
            rowObj[h] = row[idx] !== undefined ? row[idx] : '';
          });
          return rowObj;
        });
      } else {
        items = obj.values;
      }
    } else if (Array.isArray(obj.items)) items = obj.items;
    else if (Array.isArray(obj.rows)) items = obj.rows;
  }

  if (!items || !Array.isArray(items)) return [];

  return items
    .filter(row => row && typeof row === 'object')
    .map((row, index) => {
      // Find case-insensitive property
      const findProp = (possibleKeys: string[]): string => {
        const keys = Object.keys(row);
        for (const target of possibleKeys) {
          const cleanTarget = target.toLowerCase().replace(/[^a-z0-9]/g, '');
          for (const k of keys) {
            const cleanK = k.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (cleanK === cleanTarget) {
              const val = row[k];
              return val !== null && val !== undefined ? String(val).trim() : '';
            }
          }
        }
        return '';
      };

      const nama = findProp(['nama', 'nama_lengkap', 'namalengkap', 'namapegawai', 'nama_pegawai', 'name']) || `Pegawai ${index + 1}`;
      const nip = findProp(['nip', 'nip_pegawai', 'nomor_induk', 'nomorinduk', 'id_pegawai']) || '-';
      const jabatan = findProp(['jabatan', 'jabatan_kedinasan', 'posisi', 'tugas', 'role']) || 'Staf Pelaksana';
      const golongan = findProp(['golongan', 'gol', 'pangkat_golongan', 'golongan_ruang', 'ruang']) || 'III/a';
      const pangkat = findProp(['pangkat', 'pangkat_terakhir']) || getPangkatFromGolongan(golongan);
      
      const rawStatus = findProp(['status', 'kepegawaian', 'status_kepegawaian', 'jenis_pegawai', 'kategori']).toUpperCase();
      const status: 'PNS' | 'PPPK' = rawStatus.includes('PPPK') || rawStatus.includes('P3K') ? 'PPPK' : 'PNS';

      const unitKerja = findProp(['unitkerja', 'unit_kerja', 'unitpenempatan', 'penempatan', 'lokasi', 'bpp', 'bagian', 'bidang']) || 'Dinas Pertanian TTS';
      const pendidikanTerakhir = findProp(['pendidikan', 'pendidikanterakhir', 'pendidikan_terakhir', 'ijazah', 'strata']) || 'S1 Pertanian';
      const tmt = findProp(['tmt', 'tmt_pegawai', 'tmt_jabatan', 'tahun_masuk']) || '2020-01-01';
      const id = String(row.id || row.ID || row.no || `asn-${index + 1}`);

      return {
        id,
        nip,
        nama,
        jabatan,
        golongan,
        pangkat,
        status,
        unitKerja,
        pendidikanTerakhir,
        tmt
      };
    })
    .filter(asn => asn.nama && asn.nama !== `Pegawai 0` && asn.nip !== '');
}

function getPangkatFromGolongan(gol: string): string {
  const g = gol.trim().toUpperCase();
  if (g.startsWith('IV/E')) return 'Pembina Utama';
  if (g.startsWith('IV/D')) return 'Pembina Utama Madya';
  if (g.startsWith('IV/C')) return 'Pembina Utama Muda';
  if (g.startsWith('IV/B')) return 'Pembina Tingkat I';
  if (g.startsWith('IV/A')) return 'Pembina';
  if (g.startsWith('III/D')) return 'Penata Tingkat I';
  if (g.startsWith('III/C')) return 'Penata';
  if (g.startsWith('III/B')) return 'Penata Muda Tingkat I';
  if (g.startsWith('III/A')) return 'Penata Muda';
  if (g.startsWith('II/D')) return 'Pengatur Tingkat I';
  if (g.startsWith('II/C')) return 'Pengatur';
  if (g.startsWith('II/B')) return 'Pengatur Muda Tingkat I';
  if (g.startsWith('II/A')) return 'Pengatur Muda';
  return 'Aparatur Sipil Negara';
}

/**
 * Fetch ASN data dynamically with proxy and direct fallback
 */
export async function fetchAsnData(apiUrl?: string): Promise<AsnFetchResult> {
  const rawTargetUrl = (apiUrl || getStoredApiUrl()).trim();
  const targetUrl = convertSpreadsheetUrlToCsv(rawTargetUrl);
  const timeNow = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WITA';

  // 1. Try server proxy endpoint first to bypass browser CORS if supported
  try {
    const proxyRes = await fetch(`/api/asn-data?url=${encodeURIComponent(targetUrl)}`, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });

    if (proxyRes.ok) {
      const json = await proxyRes.json();
      if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
        const normalized = normalizeAsnRecords(json.data);
        setCachedAsnData(normalized, timeNow);
        return {
          data: normalized,
          isLive: true,
          totalPns: normalized.filter(a => a.status === 'PNS').length,
          totalPppk: normalized.filter(a => a.status === 'PPPK').length,
          lastUpdated: timeNow,
          sourceUrl: targetUrl
        };
      } else if (json && json.errorType) {
        return handleFetchFailure(targetUrl, json.message || 'Error membaca endpoint Google', json.errorType);
      }
    }
  } catch {
    // Proxy request failed, proceed to direct fetch
  }

  // 2. Direct fetch from Google Apps Script Web App or Google Sheets CSV export
  try {
    const fetchUrl = targetUrl.includes('?') 
      ? `${targetUrl}&_t=${Date.now()}`
      : `${targetUrl}?_t=${Date.now()}`;

    const res = await fetch(fetchUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json, text/csv, */*' },
      mode: 'cors'
    });

    if (res.status === 403) {
      return handleFetchFailure(
        targetUrl, 
        'Google Apps Script memerlukan izin akses (403 Forbidden). Pastikan deployment diatur ke "Who has access: Anyone".', 
        'PERMISSION_403'
      );
    }

    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
    }

    const text = await res.text();

    // Check if script function doGet is missing
    if (text.includes('Script function not found: doGet')) {
      return handleFetchFailure(
        targetUrl,
        'Fungsi "doGet" belum ditemukan di Google Apps Script (Code.gs). Silakan tambahkan fungsi doGet(e) di script editor.',
        'DOGET_NOT_FOUND'
      );
    }

    // Check if response is HTML login page
    if (text.includes('<!DOCTYPE html>') || text.includes('drive-logo') || text.includes('You need access') || text.includes('accounts.google.com')) {
      return handleFetchFailure(
        targetUrl,
        'Google Apps Script mengembalikan halaman login Google Drive. Pengaturan "Who has access" perlu disetel ke "Anyone" (Siapa saja).',
        'PERMISSION_403'
      );
    }

    let parsedData: any;
    try {
      parsedData = JSON.parse(text);
    } catch {
      // Try CSV parser if it's text/csv
      const csvRows = parseCsvText(text);
      if (csvRows.length > 0) {
        parsedData = csvRows;
      } else {
        throw new Error('Format respon bukan JSON atau CSV yang valid.');
      }
    }

    const normalized = normalizeAsnRecords(parsedData);

    if (normalized.length > 0) {
      setCachedAsnData(normalized, timeNow);
      return {
        data: normalized,
        isLive: true,
        totalPns: normalized.filter(a => a.status === 'PNS').length,
        totalPppk: normalized.filter(a => a.status === 'PPPK').length,
        lastUpdated: timeNow,
        sourceUrl: targetUrl
      };
    } else {
      return handleFetchFailure(
        targetUrl,
        'Data berhasil diakses dari Spreadsheet namun tidak ada baris data pegawai ASN yang terbaca.',
        'INVALID_DATA'
      );
    }
  } catch (err: any) {
    const errMsg = err?.message || 'Gagal tersambung ke endpoint Google Apps Script.';
    const isDoGet = errMsg.includes('doGet');
    const is403 = errMsg.includes('403') || errMsg.includes('permission') || errMsg.includes('access');
    return handleFetchFailure(
      targetUrl,
      errMsg,
      isDoGet ? 'DOGET_NOT_FOUND' : is403 ? 'PERMISSION_403' : 'NETWORK_ERROR'
    );
  }
}

/**
 * Handle fetch failure gracefully by using cached data or high-fidelity mock data
 */
function handleFetchFailure(
  url: string, 
  errorMessage: string, 
  errorType: AsnErrorType
): AsnFetchResult {
  const cached = getCachedAsnData();
  const timeNow = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WITA';

  const dataToUse = cached ? cached.data : MOCK_DATA_ASN;
  const timeToUse = cached ? cached.lastUpdated : timeNow;

  return {
    data: dataToUse,
    isLive: false,
    totalPns: dataToUse.filter(a => a.status === 'PNS').length,
    totalPppk: dataToUse.filter(a => a.status === 'PPPK').length,
    lastUpdated: timeToUse,
    sourceUrl: url,
    error: errorMessage,
    errorType
  };
}
