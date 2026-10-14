import { useState, useEffect, useCallback, useRef } from 'react';
import { User } from 'firebase/auth';
import { ProgramKegiatanItem } from '../types';
import { 
  initAuth, 
  googleSignIn, 
  logoutGoogle, 
  getAccessToken, 
  getCurrentUser 
} from '../services/googleAuth';
import { 
  syncGoogleDriveFolder, 
  getStoredDriveCache, 
  getStoredFolderUrl, 
  saveStoredFolderUrl, 
  DEFAULT_DRIVE_FOLDER_ID, 
  DEFAULT_DRIVE_FOLDER_URL, 
  DriveFileInfo,
  extractFolderIdFromUrl
} from '../services/driveProgramService';

export function useDriveProgramData() {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [folderUrl, setFolderUrlState] = useState<string>(getStoredFolderUrl());
  
  const initialCache = getStoredDriveCache();
  const [programs, setPrograms] = useState<ProgramKegiatanItem[]>(initialCache.programs);
  const [driveFiles, setDriveFiles] = useState<DriveFileInfo[]>(initialCache.files);
  const [dppaDocs, setDppaDocs] = useState<any[]>(initialCache.dppaDocs || []);
  const [lastSync, setLastSync] = useState<string | null>(initialCache.lastSync);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [syncSource, setSyncSource] = useState<'google-drive-live' | 'cached' | 'fallback'>(
    initialCache.files.length > 0 ? 'cached' : 'fallback'
  );

  const folderId = extractFolderIdFromUrl(folderUrl);
  const syncRef = useRef(false);

  // Sync execution helper
  const executeSync = useCallback(async (currentFolderUrl: string, currentToken: string | null) => {
    if (syncRef.current) return;
    syncRef.current = true;
    setIsSyncing(true);
    setError(null);

    try {
      const result = await syncGoogleDriveFolder(currentFolderUrl, currentToken);
      setPrograms(result.programs);
      setDriveFiles(result.files);
      if (result.dppaDocs) setDppaDocs(result.dppaDocs);
      setLastSync(result.syncTimestamp);
      setSyncSource(result.source);
      if (!result.success && result.message) {
        setError(result.message);
      }
    } catch (err: any) {
      console.error('Sync error:', err);
      setError(err.message || 'Gagal menyinkronkan data dari Google Drive');
    } finally {
      setIsSyncing(false);
      syncRef.current = false;
    }
  }, []);

  // Listen to Google Auth changes
  useEffect(() => {
    const unsubscribe = initAuth((currentUser, currentToken) => {
      setUser(currentUser);
      setToken(currentToken);
      if (currentToken) {
        executeSync(folderUrl, currentToken);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [executeSync, folderUrl]);

  // Login action
  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const authResult = await googleSignIn();
      if (authResult) {
        setUser(authResult.user);
        setToken(authResult.accessToken);
        await executeSync(folderUrl, authResult.accessToken);
      }
    } catch (err: any) {
      console.error('Google Sign-in failed:', err);
      setError(err.message || 'Gagal masuk dengan akun Google.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout action
  const handleLogout = async () => {
    try {
      await logoutGoogle();
      setUser(null);
      setToken(null);
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  // Update folder URL
  const updateFolderUrl = (newUrl: string) => {
    const trimmed = newUrl.trim();
    if (!trimmed) return;
    setFolderUrlState(trimmed);
    saveStoredFolderUrl(trimmed);
    executeSync(trimmed, token);
  };

  // Reset to default folder URL
  const resetToDefaultFolder = () => {
    updateFolderUrl(DEFAULT_DRIVE_FOLDER_URL);
  };

  // Manual sync trigger
  const syncNow = () => {
    return executeSync(folderUrl, token);
  };

  return {
    user,
    token,
    isLoggingIn,
    isAuthenticated: !!user && !!token,
    handleGoogleLogin,
    handleLogout,
    folderUrl,
    folderId,
    updateFolderUrl,
    resetToDefaultFolder,
    programs,
    driveFiles,
    dppaDocs,
    primaryDppaDoc: dppaDocs[0] || null,
    lastSync,
    isLoading,
    isSyncing,
    error,
    syncSource,
    syncNow,
    defaultFolderUrl: DEFAULT_DRIVE_FOLDER_URL
  };
}
