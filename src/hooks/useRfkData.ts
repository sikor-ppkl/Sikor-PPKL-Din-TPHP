import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { FisikKeuanganItem } from '../types';
import { 
  fetchRfkData, 
  getStoredRfkApiUrl, 
  saveRfkApiUrl, 
  DEFAULT_RFK_API_URL, 
  RfkFetchResult,
  RfkErrorType,
  getCachedRfkData
} from '../services/fisikKeuanganService';

export const RECOMMENDED_RFK_APPS_SCRIPT_CODE = `/**
 * SKRIP GOOGLE APPS SCRIPT - REALISASI FISIK & KEUANGAN (RFK)
 * DINAS TANAMAN PANGAN, HORTIKULTURA DAN PERKEBUNAN KAB. TTS
 *
 * Cara Pasang:
 * 1. Buka spreadsheet Google RFK Anda -> Klik Extensions (Ekstensi) -> Apps Script
 * 2. Hapus semua isi Code.gs, tempel kode di bawah ini, lalu klik Simpan (💾)
 * 3. Klik Deploy -> Manage deployments -> Klik ikon pensil (Edit)
 * 4. Pada Version pilih "New version", pastikan Who has access: "Anyone" (Siapa saja)
 * 5. Klik Deploy -> Selesai!
 */

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet() || 
                ss.getSheetByName("RFK") || 
                ss.getSheetByName("FisikKeuangan") || 
                ss.getSheetByName("Realisasi") || 
                ss.getSheetByName("Sheet1") || 
                ss.getSheets()[0];
                
    var data = sheet.getDataRange().getValues();
    
    if (data.length < 2) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        total: 0,
        data: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var headers = data[0];
    var rows = data.slice(1);
    var result = [];
    
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      if (!row[0] && !row[1]) continue;
      
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        var key = headers[j] ? String(headers[j]).trim() : "col_" + j;
        obj[key] = row[j];
      }
      result.push(obj);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      total: result.length,
      data: result
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}`;

export function useRfkData() {
  const cached = getCachedRfkData();
  const [data, setData] = useState<FisikKeuanganItem[]>(cached.data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(cached.lastUpdated);
  const [sourceUrl, setSourceUrl] = useState<string>(getStoredRfkApiUrl());
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<RfkErrorType>(null);
  const [autoSync, setAutoSync] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(60);

  const isMounted = useRef(true);
  const fetchLock = useRef(false);

  const loadData = useCallback(async (isManualRefresh = false, overrideUrl?: string) => {
    if (fetchLock.current) return;
    fetchLock.current = true;

    if (isManualRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);
    setErrorType(null);

    try {
      const urlToUse = overrideUrl || sourceUrl;
      const result: RfkFetchResult = await fetchRfkData(urlToUse);

      if (!isMounted.current) return;

      if (result.success && result.data.length > 0) {
        setData(result.data);
        setIsLive(result.isLive);
        setLastUpdated(result.lastUpdated);
        setError(null);
        setErrorType(null);
      } else {
        setIsLive(false);
        if (result.error) {
          setError(result.error);
          setErrorType(result.errorType || 'INVALID_DATA');
        }
        if (result.data && result.data.length > 0) {
          setData(result.data);
        }
      }
    } catch (err: any) {
      if (!isMounted.current) return;
      setIsLive(false);
      setError(err?.message || 'Gagal menyinkronkan data RFK.');
      setErrorType('NETWORK_ERROR');
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
        setIsRefreshing(false);
      }
      fetchLock.current = false;
    }
  }, [sourceUrl]);

  // Initial load
  useEffect(() => {
    isMounted.current = true;
    loadData(false);
    return () => {
      isMounted.current = false;
    };
  }, [loadData]);

  // Auto-sync timer (every 60 seconds)
  useEffect(() => {
    if (!autoSync) return;

    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          loadData(true);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoSync, loadData]);

  const updateSourceUrl = useCallback((newUrl: string) => {
    const trimmed = newUrl.trim();
    saveRfkApiUrl(trimmed);
    setSourceUrl(trimmed);
    loadData(true, trimmed);
  }, [loadData]);

  const totals = useMemo(() => {
    const totalPagu = data.reduce((acc, item) => acc + (item.paguAnggaran || 0), 0);
    const totalRealisasi = data.reduce((acc, item) => acc + (item.realisasiKeuangan || 0), 0);
    const avgFisik = data.length > 0 ? data.reduce((acc, item) => acc + (item.realisasiFisik || 0), 0) / data.length : 0;
    const persenKeu = totalPagu > 0 ? (totalRealisasi / totalPagu) * 100 : 0;
    return {
      totalPagu,
      totalRealisasi,
      sisaAnggaran: totalPagu - totalRealisasi,
      avgFisik,
      persenKeu
    };
  }, [data]);

  return {
    data,
    isLoading,
    isRefreshing,
    isLive,
    lastUpdated,
    sourceUrl,
    error,
    errorType,
    autoSync,
    countdown,
    setAutoSync,
    refresh: () => loadData(true),
    updateSourceUrl,
    ...totals
  };
}
