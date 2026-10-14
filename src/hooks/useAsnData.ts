import { useState, useEffect, useCallback, useRef } from 'react';
import { AsnItem } from '../types';
import { 
  fetchAsnData, 
  getStoredApiUrl, 
  saveApiUrl, 
  resetApiUrl, 
  DEFAULT_ASN_API_URL, 
  AsnFetchResult,
  AsnErrorType
} from '../services/asnService';

export function useAsnData() {
  const [data, setData] = useState<AsnItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [sourceUrl, setSourceUrl] = useState<string>(getStoredApiUrl());
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<AsnErrorType>(null);
  
  // Auto-sync interval in seconds (default 30 seconds for live dynamic updates)
  const [autoSync, setAutoSync] = useState<boolean>(true);
  const [syncIntervalSec, setSyncIntervalSec] = useState<number>(30);
  const [countdown, setCountdown] = useState<number>(30);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const loadData = useCallback(async (customUrl?: string, isBackgroundRefresh = false) => {
    if (isBackgroundRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const result: AsnFetchResult = await fetchAsnData(customUrl || sourceUrl);
      setData(result.data);
      setIsLive(result.isLive);
      setLastUpdated(result.lastUpdated);
      setError(result.error || null);
      setErrorType(result.errorType || null);
    } catch (e: any) {
      setError(e?.message || 'Gagal memuat data');
      setIsLive(false);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      setCountdown(syncIntervalSec);
    }
  }, [sourceUrl, syncIntervalSec]);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Countdown timer effect
  useEffect(() => {
    if (!autoSync) return;

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return syncIntervalSec;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [autoSync, syncIntervalSec]);

  // Periodic Auto-Sync effect
  useEffect(() => {
    if (!autoSync) return;

    timerRef.current = setInterval(() => {
      loadData(undefined, true);
    }, syncIntervalSec * 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoSync, syncIntervalSec, loadData]);

  const handleManualRefresh = async () => {
    setCountdown(syncIntervalSec);
    await loadData(undefined, true);
  };

  const handleUpdateUrl = async (newUrl: string) => {
    const trimmed = newUrl.trim();
    if (!trimmed) return;
    saveApiUrl(trimmed);
    setSourceUrl(trimmed);
    await loadData(trimmed, false);
  };

  const handleResetUrl = async () => {
    const defaultUrl = resetApiUrl();
    setSourceUrl(defaultUrl);
    await loadData(defaultUrl, false);
  };

  const totalPns = data.filter((a) => a.status === 'PNS').length;
  const totalPppk = data.filter((a) => a.status === 'PPPK').length;

  return {
    data,
    isLoading,
    isRefreshing,
    isLive,
    lastUpdated,
    sourceUrl,
    error,
    errorType,
    totalPns,
    totalPppk,
    totalAsn: data.length,
    autoSync,
    setAutoSync,
    syncIntervalSec,
    setSyncIntervalSec,
    countdown,
    refreshData: handleManualRefresh,
    updateUrl: handleUpdateUrl,
    resetUrl: handleResetUrl,
    defaultUrl: DEFAULT_ASN_API_URL
  };
}
