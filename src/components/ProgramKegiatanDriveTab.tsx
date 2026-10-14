import React, { useState, useMemo } from 'react';
import { 
  FolderKanban, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  RefreshCw, 
  ExternalLink, 
  Settings, 
  FileSpreadsheet, 
  FileText, 
  Folder, 
  File, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ChevronRight, 
  X, 
  Check, 
  Copy, 
  ShieldCheck, 
  Eye, 
  Info,
  CalendarCheck,
  Building2,
  Coins,
  Sparkles,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { ProgramKegiatanItem } from '../types';
import { useDriveProgramData } from '../hooks/useDriveProgramData';
import { DriveFileInfo } from '../services/driveProgramService';
import { DppaDocumentView } from './DppaDocumentView';
import { SAMPLE_DPPA_TTS_2026 } from '../data/dppaData';

interface ProgramKegiatanDriveTabProps {
  formatIDR: (num: number) => string;
}

export const ProgramKegiatanDriveTab: React.FC<ProgramKegiatanDriveTabProps> = ({ formatIDR }) => {
  const {
    user,
    isAuthenticated,
    isLoggingIn,
    handleGoogleLogin,
    handleLogout,
    folderUrl,
    folderId,
    updateFolderUrl,
    resetToDefaultFolder,
    programs,
    driveFiles,
    primaryDppaDoc,
    lastSync,
    isSyncing,
    error,
    syncSource,
    syncNow,
    defaultFolderUrl
  } = useDriveProgramData();

  // Sub tab view: 'kegiatan' | 'dppa-resmi' | 'berkas-drive'
  const [subTab, setSubTab] = useState<'kegiatan' | 'dppa-resmi' | 'berkas-drive'>('kegiatan');

  // Filters
  const [progSearch, setProgSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Sedang Berjalan' | 'Terlaksana' | 'Perencanaan'>('Semua');
  const [bidangFilter, setBidangFilter] = useState<string>('Semua');

  // Modals
  const [selectedProg, setSelectedProg] = useState<ProgramKegiatanItem | null>(null);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showDppaModal, setShowDppaModal] = useState(false);
  const [inputFolderUrl, setInputFolderUrl] = useState(folderUrl);
  const [copyFolderSuccess, setCopyFolderSuccess] = useState(false);

  // Active DPPA document
  const activeDppa = primaryDppaDoc || SAMPLE_DPPA_TTS_2026;

  // Unique Bidang / Units
  const uniqueBidangs = useMemo(() => {
    const set = new Set<string>();
    programs.forEach(p => {
      if (p.subBidangPengampu) set.add(p.subBidangPengampu);
    });
    return Array.from(set).sort();
  }, [programs]);

  // Unique Programs Count
  const uniqueProgramCount = useMemo(() => {
    const set = new Set<string>();
    programs.forEach(p => {
      if (p.kodeProgram) set.add(p.kodeProgram);
      else if (p.namaProgram) set.add(p.namaProgram);
    });
    return set.size;
  }, [programs]);

  // Total Pagu
  const totalPagu = useMemo(() => {
    return programs.reduce((acc, p) => acc + (p.paguAnggaran || 0), 0);
  }, [programs]);

  // Filtered Programs
  const filteredPrograms = useMemo(() => {
    return programs.filter(p => {
      const q = progSearch.toLowerCase().trim();
      const matchSearch = 
        !q ||
        p.namaProgram.toLowerCase().includes(q) ||
        p.namaKegiatan.toLowerCase().includes(q) ||
        p.kodeKegiatan.toLowerCase().includes(q) ||
        p.subBidangPengampu.toLowerCase().includes(q) ||
        p.penanggungJawab.toLowerCase().includes(q);

      const matchStatus = statusFilter === 'Semua' || p.status === statusFilter;
      const matchBidang = bidangFilter === 'Semua' || p.subBidangPengampu === bidangFilter;

      return matchSearch && matchStatus && matchBidang;
    });
  }, [programs, progSearch, statusFilter, bidangFilter]);

  // Format File Size
  const formatFileSize = (bytes?: number) => {
    if (!bytes || bytes === 0) return '-';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Format Date
  const formatDateTime = (iso?: string | null) => {
    if (!iso) return '-';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' WITA';
    } catch {
      return iso;
    }
  };

  // Helper for file icons
  const getFileIcon = (file: DriveFileInfo) => {
    const m = file.mimeType.toLowerCase();
    const n = file.name.toLowerCase();
    if (m.includes('spreadsheet') || n.endsWith('.xlsx') || n.endsWith('.csv')) {
      return <FileSpreadsheet className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
    }
    if (m.includes('document') || n.endsWith('.docx') || n.endsWith('.doc')) {
      return <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />;
    }
    if (m.includes('pdf') || n.endsWith('.pdf')) {
      return <FileText className="w-5 h-5 text-rose-600 flex-shrink-0" />;
    }
    if (m.includes('folder')) {
      return <Folder className="w-5 h-5 text-amber-600 flex-shrink-0" />;
    }
    return <File className="w-5 h-5 text-stone-500 flex-shrink-0" />;
  };

  // Export Program to CSV
  const handleExportCsv = () => {
    const headers = [
      'No',
      'Kode Program',
      'Nama Program',
      'Kode Kegiatan',
      'Nama Kegiatan',
      'Indikator Keluaran',
      'Target Kinerja',
      'Pagu Anggaran (Rp)',
      'PIC / Penanggung Jawab',
      'Sub Bidang Pengampu',
      'Status'
    ];

    const rows = filteredPrograms.map((p, idx) => [
      idx + 1,
      `"${p.kodeProgram}"`,
      `"${p.namaProgram.replace(/"/g, '""')}"`,
      `"${p.kodeKegiatan}"`,
      `"${p.namaKegiatan.replace(/"/g, '""')}"`,
      `"${p.indikatorKinerja.replace(/"/g, '""')}"`,
      `"${p.targetKinerja.replace(/"/g, '""')}"`,
      p.paguAnggaran,
      `"${p.penanggungJawab.replace(/"/g, '""')}"`,
      `"${p.subBidangPengampu.replace(/"/g, '""')}"`,
      p.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PROGRAM_KEGIATAN_DINAS_PERTANIAN_TTS_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy folder link helper
  const handleCopyFolder = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopyFolderSuccess(true);
    setTimeout(() => setCopyFolderSuccess(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
      
      {/* ============================================================ */}
      {/* HEADER TAB */}
      {/* ============================================================ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-100">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">
            <FolderKanban className="w-4 h-4 text-emerald-600" />
            <span>Perencanaan Renja & DPA 2026</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            PROGRAM & KEGIATAN DINAS
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Sistem otomatisasi sinkronisasi dokumen perencanaan dan anggaran dari Google Drive Dinas Pertanian Kab. TTS
          </p>
        </div>

        {/* Quick Actions & Drive Link */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowFolderModal(true)}
            className="px-3 py-2 bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Pengaturan Tautan Google Drive"
          >
            <Settings className="w-3.5 h-3.5 text-stone-500" />
            <span>Pengaturan Folder</span>
          </button>

          <a
            href={folderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Buka Folder di Google Drive"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            <span>Buka Google Drive</span>
          </a>

          <button
            onClick={syncNow}
            disabled={isSyncing}
            className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-75"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkronkan'}</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* GOOGLE DRIVE SYNC & OAUTH AUTHENTICATION BANNER */}
      {/* ============================================================ */}
      <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        isAuthenticated 
          ? 'bg-emerald-50/80 border-emerald-200' 
          : 'bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-emerald-50/50 border-blue-200'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xs ${
              isAuthenticated ? 'bg-emerald-700 text-white' : 'bg-white text-blue-700 border border-blue-200'
            }`}>
              {isAuthenticated ? <Folder className="w-5 h-5 text-white" /> : <FolderKanban className="w-5 h-5 text-blue-700" />}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-stone-900">
                  Google Drive Folder:
                </span>
                <code className="text-xs font-mono font-bold bg-white/90 px-2 py-0.5 rounded border border-stone-200 text-stone-800">
                  {folderId}
                </code>
                {isAuthenticated ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Terhubung Akun Google
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    <Clock className="w-3 h-3 text-amber-700" />
                    Siap Disinkronkan
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">
                {isAuthenticated ? (
                  <>
                    Terautentikasi sebagai <strong className="text-stone-900">{user?.displayName || user?.email}</strong>. 
                    Sistem otomatis membaca daftar berkas perencanaan dan dokumen formulir DPPA/DPA Rincian Belanja dari folder ini.
                  </>
                ) : (
                  <>
                    Folder target terkonfigurasi. Masuk dengan Akun Google untuk mengizinkan aplikasi membaca otomatis seluruh berkas dan dokumen DPPA langsung dari Google Drive dinas.
                  </>
                )}
              </p>

              {lastSync && (
                <div className="text-[11px] text-stone-500 pt-0.5">
                  Sinkronisasi terakhir: <span className="font-semibold text-stone-700">{formatDateTime(lastSync)}</span>
                  {driveFiles.length > 0 && ` · ${driveFiles.length} berkas terdeteksi`}
                </div>
              )}
            </div>
          </div>

          {/* Auth Action Buttons */}
          <div className="flex items-center gap-2 self-start lg:self-center flex-shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-6 h-6 rounded-full" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-semibold text-stone-800 max-w-[140px] truncate">
                  {user?.displayName || user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-stone-400 hover:text-stone-700 ml-1 text-xs cursor-pointer font-medium hover:underline"
                  title="Keluar dari akun Google"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className="px-4 py-2 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-2xs transition-all hover:shadow-xs cursor-pointer disabled:opacity-70"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>{isLoggingIn ? 'Menghubungkan...' : 'Sign in with Google'}</span>
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-start gap-2 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span>{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* FEATURED DPPA DOCUMENT CARD BANNER */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-950 rounded-2xl p-5 text-white shadow-md border border-emerald-800/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-[11px] border border-emerald-400/30 uppercase tracking-wide">
                Dokumen Terverifikasi dari Google Drive
              </span>
              <span className="font-mono text-xs text-stone-300">
                {activeDppa.nomorDppa}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-black tracking-tight text-white leading-snug">
              FORMULIR DPPA RINCIAN BELANJA SKPD TAHUN ANGGARAN {activeDppa.tahunAnggaran}
            </h4>

            <p className="text-xs text-stone-300 max-w-3xl leading-relaxed">
              Sub Kegiatan: <strong className="text-white">{activeDppa.subKegiatan}</strong>
              <br />
              Alokasi Anggaran: <strong className="text-emerald-300 font-mono text-sm">{formatIDR(activeDppa.alokasiTahunBerjalan)}</strong> · Pengesahan PPKD: <strong className="text-white">{activeDppa.penandatangan.ppkd.nama}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setSubTab('dppa-resmi')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs inline-flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Buka Formulir DPPA Lengkap</span>
            </button>
            <button
              onClick={() => setShowDppaModal(true)}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Pratinjau Pop-up</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* QUICK STATS CARDS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">Program Prioritas</span>
            <FolderKanban className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="mt-2 text-xl sm:text-2xl font-black text-stone-900">
            {uniqueProgramCount} <span className="text-xs font-medium text-stone-500">Program</span>
          </div>
          <span className="text-[11px] text-stone-500 mt-0.5 block">Renja Dinas 2026</span>
        </div>

        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">Kegiatan Renja</span>
            <CalendarCheck className="w-4 h-4 text-blue-700" />
          </div>
          <div className="mt-2 text-xl sm:text-2xl font-black text-stone-900">
            {programs.length} <span className="text-xs font-medium text-stone-500">Kegiatan</span>
          </div>
          <span className="text-[11px] text-stone-500 mt-0.5 block">Sub Kegiatan Teknis</span>
        </div>

        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">Total Pagu DPA</span>
            <Coins className="w-4 h-4 text-amber-700" />
          </div>
          <div className="mt-2 text-base sm:text-lg font-black font-mono text-emerald-900 truncate">
            {formatIDR(totalPagu)}
          </div>
          <span className="text-[11px] text-stone-500 mt-0.5 block">Alokasi APBD Induk</span>
        </div>

        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">Berkas Google Drive</span>
            <Folder className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="mt-2 text-xl sm:text-2xl font-black text-stone-900">
            {driveFiles.length} <span className="text-xs font-medium text-stone-500">Berkas</span>
          </div>
          <span className="text-[11px] text-stone-500 mt-0.5 block">
            {syncSource === 'google-drive-live' ? 'Live Sinkron Drive' : 'Folder 1gcfzEf...'}
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SUB-VIEW TOGGLE (KEGIATAN vs DPPA RESMI vs BERKAS DRIVE) */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="inline-flex bg-stone-100 p-1 rounded-2xl text-xs font-bold overflow-x-auto max-w-full">
          <button
            onClick={() => setSubTab('kegiatan')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'kegiatan'
                ? 'bg-white text-emerald-950 shadow-2xs font-extrabold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5 text-emerald-700" />
            <span>Daftar Program & Kegiatan</span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
              {filteredPrograms.length}
            </span>
          </button>

          <button
            onClick={() => setSubTab('dppa-resmi')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'dppa-resmi'
                ? 'bg-white text-emerald-950 shadow-2xs font-extrabold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
            <span>Dokumen Resmi DPPA 2026</span>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-mono">
              Rp43,5 Jt
            </span>
          </button>

          <button
            onClick={() => setSubTab('berkas-drive')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'berkas-drive'
                ? 'bg-white text-emerald-950 shadow-2xs font-extrabold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Folder className="w-3.5 h-3.5 text-amber-600" />
            <span>Berkas di Google Drive</span>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px]">
              {driveFiles.length}
            </span>
          </button>
        </div>

        {/* Export & Print */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Unduh seluruh data program kegiatan sebagai CSV"
          >
            <Download className="w-3.5 h-3.5 text-stone-600" />
            <span>Ekspor CSV</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Cetak tabel program kegiatan"
          >
            <Printer className="w-3.5 h-3.5 text-stone-600" />
            <span>Cetak</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* VIEW 1: DAFTAR PROGRAM & KEGIATAN */}
      {/* ============================================================ */}
      {subTab === 'kegiatan' && (
        <div className="space-y-4">
          {/* Search & Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={progSearch}
                onChange={(e) => setProgSearch(e.target.value)}
                placeholder="Cari nama kegiatan, kode, PIC, atau sub bidang..."
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
              />
            </div>

            <div className="sm:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                aria-label="Filter status program kegiatan"
                className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              >
                <option value="Semua">Semua Status</option>
                <option value="Sedang Berjalan">Sedang Berjalan</option>
                <option value="Terlaksana">Terlaksana</option>
                <option value="Perencanaan">Perencanaan</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={bidangFilter}
                onChange={(e) => setBidangFilter(e.target.value)}
                aria-label="Filter sub bidang pengampu"
                className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              >
                <option value="Semua">Semua Sub Bidang</option>
                {uniqueBidangs.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          {/* List Cards */}
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-stone-200 rounded-2xl p-6 bg-stone-50/50">
              <FolderKanban className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <div className="text-sm font-bold text-stone-700">Tidak ada program/kegiatan yang sesuai filter</div>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Coba ubah kata kunci pencarian atau reset filter untuk melihat data program lainnya.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredPrograms.map((prog) => (
                <div 
                  key={prog.id} 
                  className={`border rounded-2xl p-5 transition-all shadow-2xs group ${
                    prog.dppaRefId 
                      ? 'border-emerald-300 bg-emerald-50/20 hover:bg-emerald-50/40 hover:border-emerald-400' 
                      : 'border-stone-200 bg-stone-50/30 hover:bg-white hover:border-emerald-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {prog.kodeKegiatan}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">
                        {prog.subBidangPengampu}
                      </span>
                      {prog.dppaRefId && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-800 text-white">
                          <FileText className="w-3 h-3" />
                          Dokumen DPPA Resmi
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        prog.status === 'Terlaksana'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : prog.status === 'Sedang Berjalan'
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}>
                        {prog.status}
                      </span>
                      <span className="text-xs font-bold font-mono text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {formatIDR(prog.paguAnggaran)}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-bold text-stone-900 text-sm sm:text-base group-hover:text-emerald-950 transition-colors">
                    {prog.namaKegiatan}
                  </h4>
                  <div className="text-xs text-stone-600 font-medium mt-0.5">
                    Program Induk: <span className="text-emerald-800 font-semibold">{prog.namaProgram}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-3 border-t border-stone-100 text-xs">
                    <div>
                      <span className="text-stone-500">Indikator Keluaran:</span>
                      <div className="font-medium text-stone-800 mt-0.5 leading-relaxed">{prog.indikatorKinerja}</div>
                    </div>
                    <div>
                      <span className="text-stone-500">Target Kinerja / PIC:</span>
                      <div className="font-medium text-stone-800 mt-0.5">
                        <span className="text-emerald-700 font-bold">{prog.targetKinerja}</span> · PIC: {prog.penanggungJawab}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-100/80 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedProg(prog)}
                        className="text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Rincian Kegiatan &gt;</span>
                      </button>

                      {prog.dppaRefId && (
                        <button
                          onClick={() => setSubTab('dppa-resmi')}
                          className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors border border-emerald-300"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-800" />
                          <span>Buka Lembar DPPA Rincian Belanja &gt;</span>
                        </button>
                      )}
                    </div>

                    <span className="text-[11px] text-stone-400 font-mono">
                      ID: {prog.id}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW 2: DOKUMEN RESMI FORMULIR DPPA */}
      {/* ============================================================ */}
      {subTab === 'dppa-resmi' && (
        <div className="space-y-4">
          <DppaDocumentView 
            document={activeDppa} 
            formatIDR={formatIDR} 
          />
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW 3: DAFTAR BERKAS DI GOOGLE DRIVE */}
      {/* ============================================================ */}
      {subTab === 'berkas-drive' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                Daftar Berkas Terdeteksi di Google Drive
              </h4>
              <p className="text-xs text-stone-500">
                Folder ID: <code className="font-mono font-bold text-stone-700">{folderId}</code>
              </p>
            </div>

            <a
              href={folderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-800 hover:underline inline-flex items-center gap-1"
            >
              <span>Buka Folder di Tab Baru</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {driveFiles.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-stone-200 rounded-3xl p-8 bg-stone-50/60 space-y-3">
              <div className="w-14 h-14 bg-amber-100 rounded-3xl mx-auto flex items-center justify-center text-amber-800">
                <Folder className="w-7 h-7" />
              </div>
              <h5 className="text-sm font-bold text-stone-900">
                Belum Ada Berkas yang Tersinkronisasi
              </h5>
              <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                Untuk membaca berkas secara otomatis dari folder Google Drive Anda (<code>{folderId}</code>), 
                silakan klik tombol <strong>"Sign in with Google"</strong> di atas atau lakukan sinkronisasi data.
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                {!isAuthenticated ? (
                  <button
                    onClick={handleGoogleLogin}
                    disabled={isLoggingIn}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Masuk dengan Akun Google</span>
                  </button>
                ) : (
                  <button
                    onClick={syncNow}
                    disabled={isSyncing}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>Sinkronkan Sekarang</span>
                  </button>
                )}
                <a
                  href={folderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Lihat Folder Drive</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {driveFiles.map((file) => (
                <div 
                  key={file.id} 
                  className="border border-stone-200 rounded-2xl p-4 bg-stone-50/30 hover:bg-white hover:border-emerald-300 transition-all shadow-2xs flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center flex-shrink-0 shadow-2xs">
                      {getFileIcon(file)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-stone-900 text-xs sm:text-sm truncate" title={file.name}>
                        {file.name}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5 flex flex-wrap items-center gap-x-2">
                        <span>Ukuran: {formatFileSize(file.size)}</span>
                        {file.modifiedTime && (
                          <span>· Diperbarui: {new Date(file.modifiedTime).toLocaleDateString('id-ID')}</span>
                        )}
                      </div>
                      {file.description && (
                        <p className="text-[11px] text-stone-600 mt-1 line-clamp-2">
                          {file.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-stone-400 truncate max-w-[120px]">
                      {file.id}
                    </span>
                    <div className="flex items-center gap-2">
                      {file.name.toLowerCase().includes('dppa') && (
                        <button
                          onClick={() => setSubTab('dppa-resmi')}
                          className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <FileSpreadsheet className="w-3 h-3" />
                          <span>Lihat DPPA</span>
                        </button>
                      )}
                      <a
                        href={file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Buka</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: DETAIL KEGIATAN */}
      {/* ============================================================ */}
      {selectedProg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="bg-emerald-900 text-white p-6 relative">
              <button 
                onClick={() => setSelectedProg(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-700 text-emerald-100 font-bold text-[11px] mb-2 font-mono">
                {selectedProg.kodeKegiatan}
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                {selectedProg.namaKegiatan}
              </h3>
              <p className="text-xs text-emerald-200 mt-1">
                Program Induk: {selectedProg.namaProgram}
              </p>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                <div>
                  <span className="text-stone-500 font-medium">Pagu Anggaran:</span>
                  <div className="font-extrabold font-mono text-emerald-900 text-sm mt-0.5">
                    {formatIDR(selectedProg.paguAnggaran)}
                  </div>
                </div>
                <div>
                  <span className="text-stone-500 font-medium">Status Pelaksanaan:</span>
                  <div className="mt-0.5">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      selectedProg.status === 'Terlaksana'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : selectedProg.status === 'Sedang Berjalan'
                        ? 'bg-blue-100 text-blue-800 border-blue-300'
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}>
                      {selectedProg.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-stone-500 font-medium">Indikator Kinerja Keluaran:</span>
                  <div className="font-semibold text-stone-900 mt-0.5 p-3 bg-stone-50 rounded-xl border border-stone-200">
                    {selectedProg.indikatorKinerja}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-stone-500 font-medium">Target Capaian:</span>
                    <div className="font-bold text-emerald-800 mt-0.5">
                      {selectedProg.targetKinerja}
                    </div>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Sub Bidang Pengampu:</span>
                    <div className="font-bold text-stone-800 mt-0.5">
                      {selectedProg.subBidangPengampu}
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-stone-500 font-medium">Pejabat Pelaksana / PIC (PPTK):</span>
                  <div className="font-semibold text-stone-800 mt-0.5">
                    {selectedProg.penanggungJawab}
                  </div>
                </div>
              </div>

              {selectedProg.dppaRefId && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
                    <div>
                      <span className="font-bold text-emerald-950 block">Tersedia Formulir DPPA Lengkap</span>
                      <span className="text-[11px] text-emerald-700">Rincian belanja barang, jasa, dan cash flow bulanan</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProg(null);
                      setSubTab('dppa-resmi');
                    }}
                    className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold text-xs cursor-pointer shadow-2xs"
                  >
                    Buka DPPA
                  </button>
                </div>
              )}

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <a
                  href={folderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-800 hover:text-emerald-950 font-bold inline-flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka Berkas di Google Drive</span>
                </a>
                <button
                  onClick={() => setSelectedProg(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: PRATINJAU DOKUMEN DPPA RESMI */}
      {/* ============================================================ */}
      {showDppaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
          <div className="max-w-5xl w-full my-auto animate-in zoom-in-95 duration-150">
            <DppaDocumentView 
              document={activeDppa} 
              onClose={() => setShowDppaModal(false)}
              formatIDR={formatIDR} 
            />
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: PENGATURAN FOLDER GOOGLE DRIVE */}
      {/* ============================================================ */}
      {showFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="bg-stone-900 text-white p-6 relative">
              <button 
                onClick={() => setShowFolderModal(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px] mb-2 border border-emerald-500/30">
                Konfigurasi Google Drive
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">
                Pengaturan Folder Google Drive
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                Tautkan folder Google Drive yang memuat berkas atau spreadsheet perencanaan Renja / DPPA.
              </p>
            </div>

            <div className="p-6 space-y-4 text-xs text-stone-700">
              <div className="space-y-1.5">
                <label className="font-bold text-stone-900 block">
                  Tautan Folder Google Drive (URL)
                </label>
                <input
                  type="text"
                  value={inputFolderUrl}
                  onChange={(e) => setInputFolderUrl(e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
                <div className="text-[11px] text-stone-500">
                  ID Folder Terdeteksi: <strong className="font-mono text-stone-800">{folderId}</strong>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleCopyFolder(inputFolderUrl)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium cursor-pointer transition-colors inline-flex items-center gap-1.5"
                >
                  {copyFolderSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                  <span>{copyFolderSuccess ? 'Tersalin!' : 'Salin URL'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInputFolderUrl(defaultFolderUrl);
                    resetToDefaultFolder();
                  }}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium cursor-pointer transition-colors"
                >
                  Reset ke Folder Awal
                </button>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">Folder Bawaan Dinas:</span>
                <div className="text-stone-600 font-mono text-[11px] break-all">
                  {defaultFolderUrl}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowFolderModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    updateFolderUrl(inputFolderUrl);
                    setShowFolderModal(false);
                  }}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl cursor-pointer shadow-xs"
                >
                  Simpan & Sinkronkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
