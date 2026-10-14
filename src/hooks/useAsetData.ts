import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { AsetItem, KibCategory } from '../types';
import { 
  fetchAsetData, 
  getStoredAsetApiUrl, 
  saveAsetApiUrl, 
  resetAsetApiUrl, 
  DEFAULT_ASET_API_URL, 
  AsetFetchResult,
  AsetErrorType,
  getCachedAsetData
} from '../services/asetService';

export function useAsetData() {
  const cached = getCachedAsetData();
  const [data, setData] = useState<AsetItem[]>(cached.data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(cached.lastUpdated);
  const [sourceUrl, setSourceUrl] = useState<string>(getStoredAsetApiUrl());
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<AsetErrorType>(null);
  const [autoSync, setAutoSync] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(30);

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
      const result: AsetFetchResult = await fetchAsetData(urlToUse);

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
      setError(err?.message || 'Gagal menyinkronkan data aset BMD.');
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

  const refreshData = () => {
    setCountdown(60);
    return loadData(true);
  };

  const updateUrl = (newUrl: string) => {
    const trimmed = newUrl.trim();
    if (!trimmed) return;
    saveAsetApiUrl(trimmed);
    setSourceUrl(trimmed);
    setCountdown(60);
    loadData(true, trimmed);
  };

  const resetUrl = () => {
    resetAsetApiUrl();
    setSourceUrl(DEFAULT_ASET_API_URL);
    setCountdown(60);
    loadData(true, DEFAULT_ASET_API_URL);
  };

  // Aggregated metrics
  const totalNilaiAset = useMemo(() => {
    return data.reduce((acc, a) => acc + (a.nilaiPerolehan || 0), 0);
  }, [data]);

  const countByKib = useMemo(() => {
    const counts: Record<KibCategory, number> = {
      'KIB A': 0,
      'KIB B': 0,
      'KIB C': 0,
      'KIB D': 0,
      'KIB E': 0,
      'KIB F': 0
    };
    data.forEach(a => {
      if (counts[a.kib] !== undefined) {
        counts[a.kib]++;
      }
    });
    return counts;
  }, [data]);

  const countByKondisi = useMemo(() => {
    let baik = 0;
    let rusakRingan = 0;
    let rusakBerat = 0;
    data.forEach(a => {
      if (a.kondisi === 'Baik') baik++;
      else if (a.kondisi === 'Rusak Ringan') rusakRingan++;
      else if (a.kondisi === 'Rusak Berat') rusakBerat++;
    });
    return { baik, rusakRingan, rusakBerat };
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
    setAutoSync,
    countdown,
    refreshData,
    updateUrl,
    resetUrl,
    defaultUrl: DEFAULT_ASET_API_URL,
    totalNilaiAset,
    countByKib,
    countByKondisi
  };
}
