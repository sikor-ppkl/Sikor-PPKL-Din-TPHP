import { LaporanPadItem } from '../types';
import { MOCK_LAPORAN_PAD } from '../data/mockData';

export const DEFAULT_PAD_API_URL = 
  'https://script.google.com/macros/s/AKfycbwTDBonV2u-yepq6axsjptwx2Mv8t5tn8suZgq3u1PwZxNTUBjfOAZmLU0rP_rK8HjC/exec';

const STORAGE_KEY_PAD_URL = 'tts_pertanian_pad_api_url_v2';
const STORAGE_KEY_PAD_CACHE = 'tts_pertanian_pad_data_cache_v2';
const STORAGE_KEY_PAD_TIME = 'tts_pertanian_pad_last_sync_v2';

export type PadErrorType = 
  | 'DOGET_NOT_FOUND' 
  | 'PERMISSION_403' 
  | 'NETWORK_ERROR' 
  | 'INVALID_DATA' 
  | null;

export interface PadFetchResult {
  success: boolean;
  data: LaporanPadItem[];
  error?: string;
  errorType?: PadErrorType;
  isLive: boolean;
  lastUpdated: string;
  sourceUrl: string;
}

export const RECOMMENDED_PAD_APPS_SCRIPT_CODE = `/**
 * SKRIP GOOGLE APPS SCRIPT - SINKRONISASI LAPORAN PAD
 * DINAS TANAMAN PANGAN, HORTIKULTURA DAN PERKEBUNAN KAB. TTS
 *
 * Cara Pasang:
 * 1. Buka spreadsheet Google Laporan PAD Anda -> Klik Extensions (Ekstensi) -> Apps Script
 * 2. Hapus semua isi Code.gs, tempel kode di bawah ini, lalu klik Simpan (💾)
 * 3. Klik Deploy -> Manage deployments -> Klik ikon pensil (Edit)
 * 4. Pada Version pilih "New version", pastikan Who has access: "Anyone" (Siapa saja)
 * 5. Klik Deploy -> Selesai!
 */

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Cari sheet bertema PAD atau gunakan sheet pertama
    var sheet = ss.getSheetByName("PAD") || 
                ss.getSheetByName("DATA PAD") || 
                ss.getSheetByName("LAPORAN PAD") || 
                ss.getSheetByName("RETRIBUSI") || 
                ss.getSheets()[0];
                
    var data = sheet.getDataRange().getValues();
    
    if (data.length < 2) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        total: 0,
        data: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var headers = data[0].map(function(h) { 
      return String(h).trim(); 
    });
    
    var results = [];
    
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      // Lewati baris kosong
      var isEmpty = row.every(function(cell) { 
        return cell === "" || cell === null || cell === undefined; 
      });
      if (isEmpty) continue;
      
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        var key = headers[j];
        var val = row[j];
        
        // Format tanggal jika objek Date
        if (val instanceof Date) {
          val = Utilities.formatDate(val, "GMT+8", "yyyy-MM-dd");
        }
        obj[key] = val;
      }
      results.push(obj);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      total: results.length,
      data: results
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
`;

export function cleanRawString(str: any): string {
  if (str === null || str === undefined) return '';
  return String(str).trim().replace(/\s+/g, ' ');
}

export function parseNumber(val: any): number {
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  if (!val) return 0;
  const str = String(val).replace(/[^0-9.,-]/g, '');
  if (!str) return 0;
  
  // Format Indonesia: 142.500.000 atau 142500000
  if (str.includes('.') && !str.includes(',')) {
    const parts = str.split('.');
    if (parts.length > 2 || (parts.length === 2 && parts[1].length === 3)) {
      return parseFloat(str.replace(/\./g, '')) || 0;
    }
  }
  
  // Format dengan koma desimal: 142.500.000,00
  const normalized = str.replace(/\./g, '').replace(',', '.');
  const num = parseFloat(normalized);
  return isNaN(num) ? 0 : num;
}

export function normalizePadRecords(rawList: any[]): LaporanPadItem[] {
  if (!Array.isArray(rawList)) return [];

  const results: LaporanPadItem[] = [];

  rawList.forEach((raw, idx) => {
    if (!raw) return;

    let sumberPad = '';
    let uraianRetribusi = '';
    let targetTahunan = 0;
    let realisasiSdSaatIni = 0;
    let persentaseCapaian = 0;
    let periode = 'Tahun Anggaran 2026';
    let unitPengelola = 'Dinas Tanaman Pangan, Hortikultura, dan Perkebunan';
    let nomorBuktiKas = `STS/${String(idx + 1).padStart(2, '0')}/DISPERKUTAN/2026`;
    let statusSetoran = 'Terverifikasi Kasda';

    if (typeof raw === 'object' && !Array.isArray(raw)) {
      const getVal = (...keys: string[]): string => {
        for (const k of keys) {
          const targetKeyClean = k.toLowerCase().replace(/[\s_.-]/g, '');
          for (const rawKey of Object.keys(raw)) {
            const currentClean = rawKey.toLowerCase().replace(/[\s_.-]/g, '');
            if (currentClean === targetKeyClean) {
              const val = raw[rawKey];
              if (val !== undefined && val !== null) return cleanRawString(val);
            }
          }
        }
        return '';
      };

      const getNum = (...keys: string[]): number => {
        for (const k of keys) {
          const targetKeyClean = k.toLowerCase().replace(/[\s_.-]/g, '');
          for (const rawKey of Object.keys(raw)) {
            const currentClean = rawKey.toLowerCase().replace(/[\s_.-]/g, '');
            if (currentClean === targetKeyClean) {
              const val = raw[rawKey];
              if (val !== undefined && val !== null) return parseNumber(val);
            }
          }
        }
        return 0;
      };

      sumberPad = getVal('sumberpaduraianretribusi', 'sumber_pad', 'sumber', 'namaPad', 'jenisPad', 'retribusi', 'namaRetribusi', 'uraian');
      uraianRetribusi = getVal('uraianRetribusi', 'uraian_retribusi', 'keterangan', 'deskripsi', 'rincian', 'objekRetribusi') || sumberPad;
      targetTahunan = getNum('target2026', 'targetTahunan', 'target_tahunan', 'target', 'pagu', 'anggaran', 'targetPad');
      realisasiSdSaatIni = getNum('realisasikasda', 'realisasiSdSaatIni', 'realisasi_sd_saat_ini', 'realisasi', 'tercapai', 'setoran', 'jumlahSetoran');
      persentaseCapaian = getNum('capaian', 'persentaseCapaian', 'persentase_capaian', 'persentase', 'persen', 'progres');
      unitPengelola = getVal('unitpengelolabuktikas', 'unitPengelola', 'unit_pengelola', 'pengelola', 'unit', 'bidang', 'uptd') || 'Dinas Pertanian Kab. TTS';

      if (!persentaseCapaian && targetTahunan > 0) {
        persentaseCapaian = parseFloat(((realisasiSdSaatIni / targetTahunan) * 100).toFixed(2));
      }

      if (!sumberPad) {
        const values = Object.values(raw).map(cleanRawString).filter(v => v.length > 0);
        if (values.length > 0) {
          sumberPad = values[0];
          uraianRetribusi = values[1] || values[0];
        }
      }
    } else if (Array.isArray(raw)) {
      sumberPad = cleanRawString(raw[0] || raw[1]);
      uraianRetribusi = cleanRawString(raw[1] || raw[2]) || sumberPad;
      targetTahunan = parseNumber(raw[2] || raw[3]);
      realisasiSdSaatIni = parseNumber(raw[3] || raw[4]);
      persentaseCapaian = targetTahunan > 0 ? parseFloat(((realisasiSdSaatIni / targetTahunan) * 100).toFixed(2)) : 0;
    }

    if (!sumberPad || sumberPad.toUpperCase() === 'JUMLAH' || sumberPad.toUpperCase() === 'SUMBER PAD' || sumberPad.toUpperCase() === 'NO' || /^[0-9]+$/.test(sumberPad)) {
      return;
    }

    results.push({
      id: `pad-live-${idx + 1}`,
      sumberPad,
      uraianRetribusi: uraianRetribusi || sumberPad,
      targetTahunan: targetTahunan || 50000000,
      realisasiSdSaatIni: realisasiSdSaatIni || 0,
      persentaseCapaian: persentaseCapaian || (targetTahunan > 0 ? parseFloat(((realisasiSdSaatIni / targetTahunan) * 100).toFixed(2)) : 0),
      periode,
      unitPengelola: unitPengelola || 'Dinas Pertanian Kab. TTS',
      nomorBuktiKas,
      statusSetoran
    });
  });

  return results;
}

export function getStoredPadApiUrl(): string {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(STORAGE_KEY_PAD_URL);
      if (stored && stored.trim().length > 0) {
        return stored.trim();
      }
    }
  } catch (e) {
    console.warn('Failed to read PAD API URL from localStorage:', e);
  }
  return DEFAULT_PAD_API_URL;
}

export function savePadApiUrl(url: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY_PAD_URL, url.trim());
    }
  } catch (e) {
    console.warn('Failed to save PAD API URL:', e);
  }
}

export function resetPadApiUrl(): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY_PAD_URL);
    }
  } catch (e) {
    console.warn('Failed to reset PAD API URL:', e);
  }
}

export const getCachedPadData = (): { data: LaporanPadItem[]; lastUpdated: string | null } => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = localStorage.getItem(STORAGE_KEY_PAD_CACHE);
      const time = localStorage.getItem(STORAGE_KEY_PAD_TIME);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return { data: parsed, lastUpdated: time };
        }
      }
    }
  } catch (e) {
    console.warn('Failed to read cached PAD data:', e);
  }
  return { data: MOCK_LAPORAN_PAD, lastUpdated: new Date().toISOString() };
};

export const saveCachedPadData = (data: LaporanPadItem[]) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY_PAD_CACHE, JSON.stringify(data));
      localStorage.setItem(STORAGE_KEY_PAD_TIME, new Date().toISOString());
    }
  } catch (e) {
    console.warn('Failed to cache PAD data:', e);
  }
};

export async function fetchPadData(customUrl?: string): Promise<PadFetchResult> {
  const targetUrl = customUrl ? customUrl.trim() : getStoredPadApiUrl();
  const cached = getCachedPadData();

  // 1. Try proxy route first
  try {
    const proxyUrl = `/api/pad-data?url=${encodeURIComponent(targetUrl)}`;
    const res = await fetch(proxyUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      const resultJson = await res.json();

      if (!resultJson.success) {
        return {
          success: false,
          data: cached.data,
          error: resultJson.message || 'Gagal memuat data PAD dari endpoint Google Apps Script.',
          errorType: resultJson.errorType || 'INVALID_DATA',
          isLive: false,
          lastUpdated: cached.lastUpdated || new Date().toISOString(),
          sourceUrl: targetUrl
        };
      }

      let rawData = resultJson.data;
      if (rawData && typeof rawData === 'object' && !Array.isArray(rawData)) {
        if (Array.isArray(rawData.data)) rawData = rawData.data;
        else if (Array.isArray(rawData.records)) rawData = rawData.records;
        else if (Array.isArray(rawData.items)) rawData = rawData.items;
        else if (Array.isArray(rawData.result)) rawData = rawData.result;
        else if (Array.isArray(rawData.rows)) rawData = rawData.rows;
      }

      if (Array.isArray(rawData) && rawData.length > 0) {
        const normalized = normalizePadRecords(rawData);
        if (normalized.length > 0) {
          saveCachedPadData(normalized);
          return {
            success: true,
            data: normalized,
            isLive: true,
            lastUpdated: new Date().toISOString(),
            sourceUrl: targetUrl
          };
        }
      }
    }
  } catch (proxyErr) {
    console.warn('Proxy fetch failed for pad-data, trying direct fetch:', proxyErr);
  }

  // 2. Direct fetch fallback
  try {
    const directRes = await fetch(targetUrl, { redirect: 'follow' });
    const text = await directRes.text();

    if (text.includes('Script function not found: doGet')) {
      return {
        success: false,
        data: cached.data,
        error: 'Fungsi "doGet" belum ditemukan di Google Apps Script (Code.gs). Silakan pasang fungsi doGet(e) di script editor.',
        errorType: 'DOGET_NOT_FOUND',
        isLive: false,
        lastUpdated: cached.lastUpdated || new Date().toISOString(),
        sourceUrl: targetUrl
      };
    }

    if (directRes.status === 403 || text.includes('accounts.google.com') || text.includes('You need access')) {
      return {
        success: false,
        data: cached.data,
        error: 'Akses Google Apps Script ditolak (403). Pastikan izin deployment diatur ke "Who has access: Anyone".',
        errorType: 'PERMISSION_403',
        isLive: false,
        lastUpdated: cached.lastUpdated || new Date().toISOString(),
        sourceUrl: targetUrl
      };
    }

    try {
      const parsed = JSON.parse(text);
      let list = Array.isArray(parsed) ? parsed : parsed.data || parsed.records || parsed.items;
      if (Array.isArray(list) && list.length > 0) {
        const normalized = normalizePadRecords(list);
        if (normalized.length > 0) {
          saveCachedPadData(normalized);
          return {
            success: true,
            data: normalized,
            isLive: true,
            lastUpdated: new Date().toISOString(),
            sourceUrl: targetUrl
          };
        }
      }
    } catch {
      // Not JSON
    }
  } catch (err: any) {
    return {
      success: false,
      data: cached.data,
      error: err?.message || 'Koneksi ke endpoint Google Apps Script PAD gagal.',
      errorType: 'NETWORK_ERROR',
      isLive: false,
      lastUpdated: cached.lastUpdated || new Date().toISOString(),
      sourceUrl: targetUrl
    };
  }

  return {
    success: false,
    data: cached.data,
    error: 'Format data respon tidak dapat dikenali.',
    errorType: 'INVALID_DATA',
    isLive: false,
    lastUpdated: cached.lastUpdated || new Date().toISOString(),
    sourceUrl: targetUrl
  };
}
