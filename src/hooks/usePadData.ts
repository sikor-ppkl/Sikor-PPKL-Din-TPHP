import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { LaporanPadItem } from '../types';
import { 
  fetchPadData, 
  getStoredPadApiUrl, 
  savePadApiUrl, 
  resetPadApiUrl, 
  DEFAULT_PAD_API_URL, 
  PadFetchResult,
  PadErrorType,
  getCachedPadData
} from '../services/padService';

export function usePadData() {
  const cached = getCachedPadData();
  const [data, setData] = useState<LaporanPadItem[]>(cached.data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(cached.lastUpdated);
  const [sourceUrl, setSourceUrl] = useState<string>(getStoredPadApiUrl());
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<PadErrorType>(null);
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
      const result: PadFetchResult = await fetchPadData(urlToUse);

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
      setError(err?.message || 'Gagal menyinkronkan data PAD.');
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
    savePadApiUrl(trimmed);
    setSourceUrl(trimmed);
    setCountdown(60);
    loadData(true, trimmed);
  };

  const resetUrl = () => {
    resetPadApiUrl();
    setSourceUrl(DEFAULT_PAD_API_URL);
    setCountdown(60);
    loadData(true, DEFAULT_PAD_API_URL);
  };

  // Aggregated metrics
  const totalTargetPad = useMemo(() => {
    return data.reduce((acc, item) => acc + (item.targetTahunan || 0), 0);
  }, [data]);

  const totalRealisasiPad = useMemo(() => {
    return data.reduce((acc, item) => acc + (item.realisasiSdSaatIni || 0), 0);
  }, [data]);

  const persentaseTotalPad = useMemo(() => {
    if (totalTargetPad <= 0) return 0;
    return parseFloat(((totalRealisasiPad / totalTargetPad) * 100).toFixed(2));
  }, [totalTargetPad, totalRealisasiPad]);

  const sisaTargetPad = useMemo(() => {
    return Math.max(0, totalTargetPad - totalRealisasiPad);
  }, [totalTargetPad, totalRealisasiPad]);

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
    defaultUrl: DEFAULT_PAD_API_URL,
    totalTargetPad,
    totalRealisasiPad,
    persentaseTotalPad,
    sisaTargetPad
  };
}
