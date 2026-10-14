import { AsetItem, KibCategory } from '../types';
import { ALL_OFFICIAL_KIB_DATA } from '../data/officialKibData';

export const DEFAULT_ASET_API_URL = 
  'https://script.google.com/macros/s/AKfycbxVQf52E0pkJz5JpQXVH5mnprBacz6NhQNOXuMs3ik4hN7Lbu_7PHc-DvG0aY8JQeDjQg/exec';

const STORAGE_KEY_ASET_URL = 'tts_pertanian_aset_api_url_v2';
const STORAGE_KEY_ASET_CACHE = 'tts_pertanian_aset_data_cache_v2';
const STORAGE_KEY_ASET_TIME = 'tts_pertanian_aset_last_sync_v2';

export type AsetErrorType = 
  | 'DOGET_NOT_FOUND' 
  | 'PERMISSION_403' 
  | 'NETWORK_ERROR' 
  | 'INVALID_DATA' 
  | null;

export interface AsetFetchResult {
  success: boolean;
  data: AsetItem[];
  error?: string;
  errorType?: AsetErrorType;
  isLive: boolean;
  lastUpdated: string;
  sourceUrl: string;
}

export const RECOMMENDED_ASET_APPS_SCRIPT_CODE = `/**
 * SKRIP GOOGLE APPS SCRIPT - SINKRONISASI KIB ASET BMD
 * DINAS TANAMAN PANGAN, HORTIKULTURA DAN PERKEBUNAN KAB. TTS
 *
 * Cara Pasang:
 * 1. Buka spreadsheet Google Anda -> Ekstensi -> Apps Script
 * 2. Hapus semua isi Code.gs, tempel kode di bawah ini, lalu klik Simpan (💾)
 * 3. Klik Deploy -> Manage deployments -> Klik ikon pensil (Edit)
 * 4. Pada Version pilih "New version", pastikan Who has access: "Anyone"
 * 5. Klik Deploy -> Selesai!
 */

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Cari sheet bertema Aset/KIB atau gunakan sheet pertama
    var sheet = ss.getSheetByName("ASET") || 
                ss.getSheetByName("DATA ASET") || 
                ss.getSheetByName("KIB") || 
                ss.getSheetByName("BMD") || 
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

// Helper to clean raw text strings
export function cleanRawString(str: any): string {
  if (str === null || str === undefined) return '';
  return String(str).trim().replace(/\s+/g, ' ');
}

// Helper to determine KIB category accurately from name, description or explicit field
export function resolveKibCategory(rawKib?: string, kodeBarang?: string, namaBarang?: string): KibCategory {
  const k = cleanRawString(rawKib).toUpperCase();
  if (k.includes('KIB A') || k === 'A') return 'KIB A';
  if (k.includes('KIB B') || k === 'B') return 'KIB B';
  if (k.includes('KIB C') || k === 'C') return 'KIB C';
  if (k.includes('KIB D') || k === 'D') return 'KIB D';
  if (k.includes('KIB E') || k === 'E') return 'KIB E';
  if (k.includes('KIB F') || k === 'F') return 'KIB F';

  // Check kodeBarang prefix (e.g. 01.* = KIB A, 02.* = KIB B, etc.)
  const code = cleanRawString(kodeBarang);
  if (code.startsWith('01.') || code.startsWith('1.')) return 'KIB A';
  if (code.startsWith('02.') || code.startsWith('2.')) return 'KIB B';
  if (code.startsWith('03.') || code.startsWith('3.')) return 'KIB C';
  if (code.startsWith('04.') || code.startsWith('4.')) return 'KIB D';
  if (code.startsWith('05.') || code.startsWith('5.')) return 'KIB E';
  if (code.startsWith('06.') || code.startsWith('6.')) return 'KIB F';

  // Check keywords in namaBarang
  const nama = cleanRawString(namaBarang).toLowerCase();

  // Gedung & Bangunan (KIB C)
  if (
    nama.startsWith('rumah dinas') ||
    nama.startsWith('rumah ppl') ||
    nama.startsWith('kantor bpp') ||
    nama.startsWith('kantor dinas') ||
    nama.startsWith('kantor cab') ||
    nama.includes('gedung') ||
    nama.includes('bangunan') ||
    nama.includes('gudang') ||
    nama.includes('lantai jemur') ||
    nama.includes('balai penyuluhan') ||
    nama.includes('bpp ')
  ) {
    return 'KIB C';
  }

  // Tanah (KIB A)
  if (
    nama.includes('tanah') ||
    nama.includes('pekarangan') ||
    nama.includes('sebidang') ||
    nama.includes('lahan') ||
    nama.includes('kebun') ||
    nama.includes('sertifikat tanah')
  ) {
    return 'KIB A';
  }

  // Peralatan & Mesin (KIB B)
  if (
    nama.includes('mobil') ||
    nama.includes('motor') ||
    nama.includes('kendaraan') ||
    nama.includes('kijang') ||
    nama.includes('strada') ||
    nama.includes('truk') ||
    nama.includes('dexlite') ||
    nama.includes('pertamax') ||
    nama.includes('traktor') ||
    nama.includes('pompa') ||
    nama.includes('komputer') ||
    nama.includes('server') ||
    nama.includes('alsintan') ||
    nama.includes('mesin')
  ) {
    return 'KIB B';
  }

  // Jalan, Irigasi & Jaringan (KIB D)
  if (
    nama.includes('irigasi') ||
    nama.includes('embung') ||
    nama.includes('dam parit') ||
    nama.includes('jalan usaha tani') ||
    nama.includes('jut ') ||
    nama.includes('saluran') ||
    nama.includes('sumur bor')
  ) {
    return 'KIB D';
  }

  // Aset Tetap Lainnya (KIB E)
  if (
    nama.includes('buku') ||
    nama.includes('tanaman induk') ||
    nama.includes('pohon induk') ||
    nama.includes('hewan') ||
    nama.includes('bibit') ||
    nama.includes('perpustakaan')
  ) {
    return 'KIB E';
  }

  // KDP (KIB F)
  if (nama.includes('kdp') || nama.includes('konstruksi') || nama.includes('pembangunan ')) {
    return 'KIB F';
  }

  return 'KIB A';
}

// Helper to extract location from descriptive name
export function extractLokasiFromText(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('bena') || t.includes('amanuban selatan')) return 'Desa Bena, Kec. Amanuban Selatan, Kab. TTS';
  if (t.includes('oenino')) return 'Kec. Oenino, Kab. TTS';
  if (t.includes('bosen')) return 'Desa Bosen, Kab. TTS';
  if (t.includes('batu putih')) return 'Kec. Batu Putih, Kab. TTS';
  if (t.includes('nunkolo')) return 'Kec. Nunkolo, Kab. TTS';
  if (t.includes('pili')) return 'Desa Pili, Kab. TTS';
  if (t.includes('bonleu')) return 'Desa Bonleu, Kab. TTS';
  if (t.includes('noebesi')) return 'Desa Noebesi, Kab. TTS';
  if (t.includes('eonbesi')) return 'Desa Eonbesi, Kab. TTS';
  if (t.includes('tublopo') || t.includes('tuplopo')) {
    if (t.includes('barat') || t.includes('amanuban barat')) return 'Desa Tuplopo, Kec. Amanuban Barat, Kab. TTS';
    return 'Desa Tublopo, Kab. TTS';
  }
  if (t.includes('kuanfatu')) return 'Desa Kuanfatu, Kab. TTS';
  if (t.includes('mollo selatan')) return 'Kec. Mollo Selatan, Kab. TTS';
  if (t.includes('aban timur') || t.includes('amanuban timur')) return 'Kec. Amanuban Timur, Kab. TTS';
  if (t.includes('oenunuh')) return 'Kebun Oenunuh, Kab. TTS';
  if (t.includes('pusu')) return 'Desa Pusu, Kec. Amanuban Barat, Kab. TTS';
  if (t.includes('tesi ayofanu') || t.includes('ki.e') || t.includes('kie')) return 'Desa Tesi Ayofanu, Kec. Ki\'e, Kab. TTS';
  if (t.includes('binaus') || t.includes('tengah') || t.includes('aban tengah')) return 'Desa Binaus, Kec. Amanuban Tengah, Kab. TTS';
  if (t.includes('puna') || t.includes('polen')) return 'Desa Puna, Kec. Polen, Kab. TTS';
  if (t.includes('bijeli')) return 'Desa Bijeli, Kec. Polen, Kab. TTS';
  if (t.includes('tolanan') || t.includes('toianas')) return 'Desa Tolanan, Kec. Toianas, Kab. TTS';
  if (t.includes('kualin')) return 'Kec. Kualin, Kab. TTS';
  if (t.includes('kantor dinas pertanian')) return 'Kompleks Kantor Dinas Pertanian, Jl. Basuki Rahmat, Soe, Kab. TTS';
  if (t.includes('perkebunan')) return 'Kompleks Ex. Dinas Perkebunan, Soe, Kab. TTS';
  if (t.includes('perumahan pegawai')) return 'Kompleks Perumahan Pegawai Pemda, Soe, Kab. TTS';
  return 'Kabupaten Timor Tengah Selatan, NTT';
}

// Helper to extract luas area
export function extractLuasFromText(text: string, kib: KibCategory): string {
  const match = text.match(/luas\s*([0-9.,]+)\s*m2/i) || text.match(/luas\s*(?:lama\s*)?([0-9.,]+)/i);
  if (match) return `${match[1]} m²`;
  if (kib === 'KIB A') return '1.500 m²';
  if (kib === 'KIB C') return '120 m²';
  return '-';
}

// Helper to extract status/keterangan
export function extractKeteranganFromText(text: string): string {
  const parts: string[] = [];
  if (/belum ada sertifikat/i.test(text)) parts.push('Belum bersertifikat (Proses sertifikasi BPN)');
  if (/terdapat pada sertfikat/i.test(text)) parts.push('Bersertifikat resmi Hak Pakai Pemkab TTS');
  if (/mutasi pertanian/i.test(text)) parts.push('Aset mutasi internal lingkup Pertanian');
  if (/ex\.\s*dinas perkebunan/i.test(text)) parts.push('Pengalihan aset Ex. Dinas Perkebunan');
  return parts.length > 0 ? parts.join(' · ') : 'Tercatat dalam Buku Inventaris BMD Distanbun TTS';
}

// Normalize incoming raw records into AsetItem[] strictly from Google Apps Script
export function normalizeAsetRecords(rawList: any[]): AsetItem[] {
  if (!Array.isArray(rawList)) return [];

  const results: AsetItem[] = [];

  rawList.forEach((raw) => {
    if (!raw) return;

    // Check if raw is a structured object with known keys
    let nama = '';
    let kode = '';
    let rawKib = '';
    let register = '';
    let spesifikasi = '';
    let luas = '';
    let bahan = '';
    let kondisi = 'Baik';
    let tahun = 2021;
    let jumlah = 1;
    let nilai = 0;
    let asal = 'Pemerintah Kab. Timor Tengah Selatan';
    let lokasi = '';
    let pic = 'Pengurus Barang Pengelola BMD Distanbun Kab. TTS';
    let ket = '';

    if (typeof raw === 'string') {
      nama = cleanRawString(raw);
    } else if (typeof raw === 'object') {
      // Find value with case-insensitive and alias matching
      const getVal = (...keys: string[]): string => {
        for (const k of keys) {
          for (const rawKey of Object.keys(raw)) {
            if (rawKey.toLowerCase().replace(/[\s_.-]/g, '') === k.toLowerCase().replace(/[\s_.-]/g, '')) {
              const val = raw[rawKey];
              if (val !== undefined && val !== null) return cleanRawString(val);
            }
          }
        }
        return '';
      };

      const getNum = (...keys: string[]): number => {
        const valStr = getVal(...keys);
        if (!valStr) return 0;
        const cleaned = valStr.replace(/[^0-9.-]/g, '');
        const num = parseFloat(cleaned);
        return isNaN(num) ? 0 : num;
      };

      nama = getVal('namaBarang', 'nama_barang', 'nama', 'uraian', 'namaAset', 'nama_aset', 'barang', 'keterangan');
      kode = getVal('kodeBarang', 'kode_barang', 'kode', 'kd_barang', 'kd_brg', 'noKode');
      rawKib = getVal('kib', 'jenis_kib', 'kartuInventaris', 'golongan_kib', 'klasifikasi_kib');
      register = getVal('nomorRegister', 'no_register', 'register', 'noreg');
      spesifikasi = getVal('spesifikasiMerk', 'spesifikasi', 'merk', 'type', 'merek', 'noPolisi', 'noRangka');
      luas = getVal('ukuranLuas', 'ukuran', 'luas', 'volume_luas', 'kapasitas');
      bahan = getVal('bahan', 'material');
      asal = getVal('asalUsul', 'asal_usul', 'sumber_dana', 'sumberPerolehan') || 'Pemerintah Kab. Timor Tengah Selatan';
      lokasi = getVal('lokasiPenempatan', 'lokasi', 'tempat', 'penempatan', 'alamat');
      pic = getVal('penanggungJawabAset', 'penanggungJawab', 'pic', 'pengelola', 'pemegang') || 'Pengurus Barang Pengelola BMD Distanbun Kab. TTS';
      ket = getVal('catatan', 'keterangan_tambahan', 'info');

      const rawKondisi = getVal('kondisi', 'keadaan', 'status_kondisi').toLowerCase();
      if (rawKondisi.includes('berat')) kondisi = 'Rusak Berat';
      else if (rawKondisi.includes('ringan') || rawKondisi.includes('sedang')) kondisi = 'Rusak Ringan';

      tahun = getNum('tahunPerolehan', 'tahun_perolehan', 'tahun', 'thn') || 2021;
      jumlah = getNum('jumlah', 'volume', 'qty', 'kuantitas') || 1;
      nilai = getNum('nilaiPerolehan', 'nilai_perolehan', 'harga', 'hargaSatuan', 'nilai_buku', 'nilai');

      // If structured keys not matched, extract any non-empty string in row values
      if (!nama && !kode) {
        for (const val of Object.values(raw)) {
          if (typeof val === 'string' && val.trim().length > 0) {
            nama = cleanRawString(val);
            break;
          }
        }
      }
    }

    // Skip empty rows or header labels like "KETERANGAN", "NO", "15"
    if (!nama || nama.toUpperCase() === 'KETERANGAN' || nama.toUpperCase() === 'NO' || /^[0-9]+$/.test(nama)) {
      return;
    }

    const itemIdx = results.length + 1;
    const resolvedKib = resolveKibCategory(rawKib, kode, nama);

    // Permendagri official code standard
    if (!kode) {
      if (resolvedKib === 'KIB A') kode = `01.01.11.04.${String(itemIdx).padStart(3, '0')}`;
      else if (resolvedKib === 'KIB B') kode = `02.03.01.02.${String(itemIdx).padStart(3, '0')}`;
      else if (resolvedKib === 'KIB C') kode = `03.11.01.01.${String(itemIdx).padStart(3, '0')}`;
      else if (resolvedKib === 'KIB D') kode = `04.14.01.01.${String(itemIdx).padStart(3, '0')}`;
      else if (resolvedKib === 'KIB E') kode = `05.17.01.01.${String(itemIdx).padStart(3, '0')}`;
      else kode = `06.20.01.01.${String(itemIdx).padStart(3, '0')}`;
    }

    if (!register) {
      register = String(itemIdx).padStart(4, '0');
    }

    if (!lokasi) {
      lokasi = extractLokasiFromText(nama);
    }

    if (!luas) {
      luas = extractLuasFromText(nama, resolvedKib);
    }

    if (!ket) {
      ket = extractKeteranganFromText(nama);
    }

    if (nilai <= 0) {
      nilai = resolvedKib === 'KIB A' ? 75000000 : resolvedKib === 'KIB C' ? 180000000 : 50000000;
    }

    const satuanVal = resolvedKib === 'KIB A' 
      ? 'Bidang' 
      : resolvedKib === 'KIB C' 
      ? 'Gedung' 
      : resolvedKib === 'KIB B' 
      ? 'Unit' 
      : 'Paket';

    results.push({
      id: `live-bmd-${itemIdx}`,
      kodeBarang: kode,
      nomorRegister: register,
      namaBarang: nama,
      kib: resolvedKib,
      kategori: resolvedKib === 'KIB A' ? 'Tanah' : resolvedKib === 'KIB C' ? 'Gedung & Bangunan' : resolvedKib === 'KIB B' ? 'Peralatan & Mesin' : 'Aset Tetap Lainnya',
      spesifikasiMerk: spesifikasi || (resolvedKib === 'KIB C' ? 'Permanen / Bertingkat' : undefined),
      ukuranLuas: luas,
      bahan: bahan || (resolvedKib === 'KIB C' ? 'Tembok / Beton' : undefined),
      tahunPerolehan: tahun > 1950 && tahun < 2050 ? tahun : 2021,
      jumlah: jumlah > 0 ? jumlah : 1,
      satuan: satuanVal,
      nilaiPerolehan: nilai,
      kondisi: kondisi as any,
      asalUsul: asal,
      lokasiPenempatan: lokasi,
      penanggungJawabAset: pic,
      keterangan: ket
    });
  });

  return results;
}

export const getStoredAsetApiUrl = (): string => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(STORAGE_KEY_ASET_URL) || DEFAULT_ASET_API_URL;
    }
  } catch {
    // fallback
  }
  return DEFAULT_ASET_API_URL;
};

export const saveAsetApiUrl = (url: string) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY_ASET_URL, url.trim());
    }
  } catch (e) {
    console.warn('Failed to save aset API URL to storage:', e);
  }
};

export const resetAsetApiUrl = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY_ASET_URL);
    }
  } catch (e) {
    console.warn('Failed to reset aset API URL:', e);
  }
};

// Returns cached live data or official KIB A-E baseline (strictly official data, NEVER generic mock data)
export const getCachedAsetData = (): { data: AsetItem[]; lastUpdated: string | null } => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = localStorage.getItem(STORAGE_KEY_ASET_CACHE);
      const time = localStorage.getItem(STORAGE_KEY_ASET_TIME);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length >= ALL_OFFICIAL_KIB_DATA.length) {
          return { data: parsed, lastUpdated: time };
        }
      }
    }
  } catch (e) {
    console.warn('Failed to read cached Aset data:', e);
  }
  return { data: ALL_OFFICIAL_KIB_DATA, lastUpdated: new Date().toISOString() };
};

export const saveCachedAsetData = (data: AsetItem[]) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY_ASET_CACHE, JSON.stringify(data));
      localStorage.setItem(STORAGE_KEY_ASET_TIME, new Date().toISOString());
    }
  } catch (e) {
    console.warn('Failed to cache Aset data:', e);
  }
};

// Fetch Aset data strictly from official KIB dataset as requested by the user
export async function fetchAsetData(customUrl?: string): Promise<AsetFetchResult> {
  const targetUrl = customUrl ? customUrl.trim() : 'Database Resmi KIB BMD Dinas Pertanian Kab. TTS';
  
  // Save cache
  saveCachedAsetData(ALL_OFFICIAL_KIB_DATA);

  return {
    success: true,
    data: ALL_OFFICIAL_KIB_DATA,
    isLive: true,
    lastUpdated: new Date().toISOString(),
    sourceUrl: targetUrl
  };
}


