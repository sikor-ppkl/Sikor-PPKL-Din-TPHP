import React, { useState, useMemo } from 'react';
import { 
  Users, 
  FolderKanban, 
  CalendarCheck, 
  Receipt, 
  Boxes, 
  BarChart3, 
  Search, 
  Filter, 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  Download, 
  Printer, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  BadgeCheck, 
  Coins, 
  Truck, 
  Wrench, 
  FileSpreadsheet,
  Layers,
  MapPin,
  Info,
  RefreshCw,
  ExternalLink,
  Settings,
  Radio,
  FileDown,
  X,
  HelpCircle,
  Check,
  Globe2,
  Lock,
  Eye,
  Code,
  FileCode,
  Copy
} from 'lucide-react';
import { 
  SekretariatTabId, 
  AsnItem, 
  ProgramKegiatanItem, 
  RencanaRealisasiItem, 
  LaporanPadItem, 
  AsetItem, 
  FisikKeuanganItem 
} from '../types';
import { 
  SEKRETARIAT_MENUS, 
  MOCK_PROGRAM_KEGIATAN, 
  MOCK_RENCANA_REALISASI, 
  MOCK_LAPORAN_PAD, 
  MOCK_FISIK_KEUANGAN 
} from '../data/mockData';
import { useAsnData } from '../hooks/useAsnData';
import { RECOMMENDED_APPS_SCRIPT_CODE } from '../services/asnService';
import { usePadData } from '../hooks/usePadData';
import { RECOMMENDED_PAD_APPS_SCRIPT_CODE } from '../services/padService';
import { useRfkData, RECOMMENDED_RFK_APPS_SCRIPT_CODE } from '../hooks/useRfkData';
import { ProgramKegiatanDriveTab } from './ProgramKegiatanDriveTab';
import { AsetSectionView } from './AsetSectionView';

interface SekretariatSectionProps {
  initialTab?: SekretariatTabId;
  onNavigateToSikor?: () => void;
}

export const SekretariatSection: React.FC<SekretariatSectionProps> = ({
  initialTab = 'data-asn',
  onNavigateToSikor
}) => {
  const [activeTab, setActiveTab] = useState<SekretariatTabId>(initialTab);

  // Dynamic Google Sheets / Apps Script ASN Data Hook
  const {
    data: liveAsnList,
    isLoading: isAsnLoading,
    isRefreshing: isAsnRefreshing,
    isLive: isAsnLive,
    lastUpdated: asnLastUpdated,
    sourceUrl: asnSourceUrl,
    error: asnError,
    errorType: asnErrorType,
    totalPns: dynamicTotalPns,
    totalPppk: dynamicTotalPppk,
    totalAsn: dynamicTotalAsn,
    autoSync,
    setAutoSync,
    countdown,
    refreshData: refreshAsnData,
    updateUrl: updateAsnUrl,
    resetUrl: resetAsnUrl,
    defaultUrl: defaultAsnUrl
  } = useAsnData();

  // Dynamic Google Sheets / Apps Script PAD Data Hook
  const {
    data: livePadList,
    isLoading: isPadLoading,
    isRefreshing: isPadRefreshing,
    isLive: isPadLive,
    lastUpdated: padLastUpdated,
    sourceUrl: padSourceUrl,
    error: padError,
    errorType: padErrorType,
    autoSync: padAutoSync,
    setAutoSync: setPadAutoSync,
    countdown: padCountdown,
    refreshData: refreshPadData,
    updateUrl: updatePadUrl,
    resetUrl: resetPadUrl,
    defaultUrl: defaultPadUrl,
    totalTargetPad,
    totalRealisasiPad,
    persentaseTotalPad,
    sisaTargetPad
  } = usePadData();

  // Dynamic Google Sheets / Apps Script RFK (Fisik & Keuangan) Data Hook
  const {
    data: liveRfkList,
    isLoading: isRfkLoading,
    isRefreshing: isRfkRefreshing,
    isLive: isRfkLive,
    lastUpdated: rfkLastUpdated,
    sourceUrl: rfkSourceUrl,
    error: rfkError,
    errorType: rfkErrorType,
    autoSync: rfkAutoSync,
    setAutoSync: setRfkAutoSync,
    countdown: rfkCountdown,
    refresh: refreshRfkData,
    updateSourceUrl: updateRfkUrl,
    totalPagu,
    totalRealisasi,
    sisaAnggaran,
    avgFisik,
    persenKeu
  } = useRfkData();

  // Filters for Data ASN
  const [asnSearch, setAsnSearch] = useState('');
  const [asnStatusFilter, setAsnStatusFilter] = useState<'Semua' | 'PNS' | 'PPPK'>('Semua');
  const [asnUnitFilter, setAsnUnitFilter] = useState<string>('Semua');
  const [selectedAsnDetail, setSelectedAsnDetail] = useState<AsnItem | null>(null);

  // Endpoint Settings Modal & Troubleshooting UI for ASN
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [inputUrl, setInputUrl] = useState(asnSourceUrl);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyScriptSuccess, setCopyScriptSuccess] = useState(false);

  // Filters & Modals for PAD
  const [padSearch, setPadSearch] = useState('');
  const [showPadSettingsModal, setShowPadSettingsModal] = useState(false);
  const [padInputUrl, setPadInputUrl] = useState(padSourceUrl);
  const [showPadScriptModal, setShowPadScriptModal] = useState(false);
  const [copyPadSuccess, setCopyPadSuccess] = useState(false);
  const [copyPadScriptSuccess, setCopyPadScriptSuccess] = useState(false);

  // Modals for RFK
  const [showRfkSettingsModal, setShowRfkSettingsModal] = useState(false);
  const [rfkInputUrl, setRfkInputUrl] = useState(rfkSourceUrl);
  const [showRfkScriptModal, setShowRfkScriptModal] = useState(false);
  const [copyRfkSuccess, setCopyRfkSuccess] = useState(false);
  const [copyRfkScriptSuccess, setCopyRfkScriptSuccess] = useState(false);

  const handleCopyRfkUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopyRfkSuccess(true);
    setTimeout(() => setCopyRfkSuccess(false), 2000);
  };

  const handleCopyRfkScript = () => {
    navigator.clipboard.writeText(RECOMMENDED_RFK_APPS_SCRIPT_CODE);
    setCopyRfkScriptSuccess(true);
    setTimeout(() => setCopyRfkScriptSuccess(false), 2500);
  };

  const handleCopyPadUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopyPadSuccess(true);
    setTimeout(() => setCopyPadSuccess(false), 2000);
  };

  const handleCopyPadScript = () => {
    navigator.clipboard.writeText(RECOMMENDED_PAD_APPS_SCRIPT_CODE);
    setCopyPadScriptSuccess(true);
    setTimeout(() => setCopyPadScriptSuccess(false), 2500);
  };

  const filteredPadList = useMemo(() => {
    return livePadList.filter((item) => {
      const q = padSearch.toLowerCase().trim();
      return (
        !q ||
        item.sumberPad.toLowerCase().includes(q) ||
        item.uraianRetribusi.toLowerCase().includes(q) ||
        item.unitPengelola.toLowerCase().includes(q) ||
        item.nomorBuktiKas.toLowerCase().includes(q) ||
        item.statusSetoran.toLowerCase().includes(q)
      );
    });
  }, [livePadList, padSearch]);

  const handleExportPadCsv = () => {
    const headers = [
      'No',
      'Sumber PAD',
      'Uraian Retribusi',
      'Target Tahunan (Rp)',
      'Realisasi (Rp)',
      'Persentase Capaian (%)',
      'Periode',
      'Unit Pengelola',
      'Nomor Bukti Kas (STS)',
      'Status Setoran Kasda'
    ];
    const rows = filteredPadList.map((p, idx) => [
      idx + 1,
      `"${p.sumberPad.replace(/"/g, '""')}"`,
      `"${p.uraianRetribusi.replace(/"/g, '""')}"`,
      p.targetTahunan,
      p.realisasiSdSaatIni,
      p.persentaseCapaian,
      `"${p.periode.replace(/"/g, '""')}"`,
      `"${p.unitPengelola.replace(/"/g, '""')}"`,
      `"${p.nomorBuktiKas.replace(/"/g, '""')}"`,
      `"${p.statusSetoran.replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Laporan_PAD_Dinas_Pertanian_TTS_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filters for Rencana Realisasi
  const [rrTriwulanFilter, setRrTriwulanFilter] = useState<string>('Semua');

  // Unique units for ASN dropdown filter
  const uniqueUnits = useMemo(() => {
    const units = new Set<string>();
    liveAsnList.forEach(item => {
      if (item.unitKerja) units.add(item.unitKerja);
    });
    return Array.from(units).sort();
  }, [liveAsnList]);

  // Format IDR Helper
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Filtered Dynamic ASN
  const filteredAsn = useMemo(() => {
    return liveAsnList.filter(asn => {
      const q = asnSearch.toLowerCase().trim();
      const matchSearch = 
        !q ||
        asn.nama.toLowerCase().includes(q) ||
        asn.nip.toLowerCase().includes(q) ||
        asn.jabatan.toLowerCase().includes(q) ||
        asn.unitKerja.toLowerCase().includes(q) ||
        asn.pendidikanTerakhir.toLowerCase().includes(q);

      const matchStatus = asnStatusFilter === 'Semua' || asn.status === asnStatusFilter;
      const matchUnit = asnUnitFilter === 'Semua' || asn.unitKerja === asnUnitFilter;

      return matchSearch && matchStatus && matchUnit;
    });
  }, [liveAsnList, asnSearch, asnStatusFilter, asnUnitFilter]);

  // Export to CSV Function
  const exportAsnToCsv = () => {
    const headers = ['No', 'Nama Lengkap', 'NIP', 'Status', 'Pangkat / Golongan', 'Jabatan', 'Unit Penempatan', 'Pendidikan Terakhir', 'TMT'];
    const rows = filteredAsn.map((a, idx) => [
      idx + 1,
      `"${a.nama.replace(/"/g, '""')}"`,
      `'${a.nip}`,
      a.status,
      `"${a.pangkat} (${a.golongan})"`,
      `"${a.jabatan.replace(/"/g, '""')}"`,
      `"${a.unitKerja.replace(/"/g, '""')}"`,
      `"${a.pendidikanTerakhir.replace(/"/g, '""')}"`,
      a.tmt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DATA_ASN_DINAS_PERTANIAN_TTS_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print ASN Table
  const handlePrintAsn = () => {
    window.print();
  };

  // Copy URL Helper
  const handleCopyUrl = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Copy Apps Script Helper
  const handleCopyScript = () => {
    navigator.clipboard.writeText(RECOMMENDED_APPS_SCRIPT_CODE);
    setCopyScriptSuccess(true);
    setTimeout(() => setCopyScriptSuccess(false), 2500);
  };

  // Filtered Rencana Realisasi
  const filteredRr = MOCK_RENCANA_REALISASI.filter(rr => {
    return rrTriwulanFilter === 'Semua' || rr.triwulan === rrTriwulanFilter;
  });

  // Helper for menu icons
  const getMenuIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Users': return <Users className={className} />;
      case 'FolderKanban': return <FolderKanban className={className} />;
      case 'CalendarCheck': return <CalendarCheck className={className} />;
      case 'Receipt': return <Receipt className={className} />;
      case 'Boxes': return <Boxes className={className} />;
      case 'BarChart3': return <BarChart3 className={className} />;
      default: return <Building2 className={className} />;
    }
  };

  // Helper for status badge colors
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Selesai':
      case 'Terlaksana':
      case 'Sangat Baik':
      case 'Terverifikasi Kasda':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Sedang Berjalan':
      case 'Baik':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Tahap Verifikasi':
      case 'Dalam Proses Rekonsiliasi':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-300';
    }
  };

  return (
    <div className="py-10 sm:py-16 bg-stone-100/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Unit Sekretariat */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl -z-10 pointer-events-none opacity-60" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-stone-200">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-800 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Building2 className="w-8 h-8 text-amber-300" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Tata Usaha & Koordinasi Operasional</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  Sekretariat Dinas
                </h1>
                <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                  Pusat koordinasi penyelenggaraan administrasi umum, kepegawaian ASN dinamis, perencanaan program dan anggaran (Renja/DPA), pengelolaan BMD aset, optimalisasi PAD, serta pelaporan fisik dan keuangan terpadu.
                </p>
              </div>
            </div>

            {/* Sekretaris Profile Box */}
            <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 w-full lg:w-auto shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center font-bold text-lg flex-shrink-0">
                YT
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  Sekretaris Dinas
                </div>
                <div className="text-sm font-extrabold text-stone-900">
                  YEHUDA A.N. TUNLIU, SP
                </div>
                <div className="text-xs text-stone-500 font-mono">
                  NIP. 19730405 200212 1 007 · Pembina Tk. I (IV/b)
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar - DYNAMIC ASN DATA */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <div className="bg-stone-50/80 rounded-xl p-3.5 border border-stone-200 relative overflow-hidden group">
              <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>Kekuatan Aparatur (ASN)</span>
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  isAsnLive 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isAsnLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  {isAsnLive ? 'Live Sync' : 'Tersimpan'}
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-stone-900 mt-1 flex items-baseline gap-1.5">
                {isAsnLoading ? (
                  <span className="text-stone-400 text-sm font-normal">Memuat...</span>
                ) : (
                  <>
                    <span>{dynamicTotalAsn}</span>
                    <span className="text-xs font-normal text-stone-500">Pegawai</span>
                  </>
                )}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                {dynamicTotalPns} PNS · {dynamicTotalPppk} PPPK
              </div>
            </div>

            <div className="bg-stone-50/80 rounded-xl p-3.5 border border-stone-200">
              <div className="text-xs text-stone-500 font-medium">Program Kerja APBD 2026</div>
              <div className="text-xl sm:text-2xl font-black text-stone-900 mt-1">8 <span className="text-xs font-normal text-stone-500">Program Utama</span></div>
              <div className="text-[11px] text-stone-600 font-medium mt-0.5">Renja & DPA Terpadu</div>
            </div>

            <div className="bg-stone-50/80 rounded-xl p-3.5 border border-stone-200">
              <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>Capaian Retribusi (PAD)</span>
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  isPadLive 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isPadLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  {isPadLive ? 'Live Sync' : 'Tersimpan'}
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-700 mt-1">
                {isPadLoading ? (
                  <span className="text-stone-400 text-sm font-normal">Memuat...</span>
                ) : (
                  `${persentaseTotalPad.toFixed(1)}%`
                )}
              </div>
              <div className="text-[11px] text-stone-600 font-medium mt-0.5 truncate">
                {formatIDR(totalRealisasiPad)} Realisasi
              </div>
            </div>

            <div className="bg-stone-50/80 rounded-xl p-3.5 border border-stone-200">
              <div className="text-xs text-stone-500 font-medium">Realisasi Fisik / Keuangan</div>
              <div className="text-xl sm:text-2xl font-black text-blue-700 mt-1">78.6% <span className="text-xs font-semibold text-stone-500">/ 74.2%</span></div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">+4.36% Deviasi Positif</div>
            </div>
          </div>
        </div>

        {/* 6 Official Menu Navigation Cards / Tabs */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                Menu & Sub-Modul Pelayanan Sekretariat
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Pilih salah satu menu di bawah untuk membuka informasi dan rincian data resmi instansi
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {SEKRETARIAT_MENUS.map((menu) => {
              const isActive = activeTab === menu.id;
              const badgeText = menu.id === 'data-asn' ? `${dynamicTotalAsn} Pegawai` : menu.badge;

              return (
                <button
                  key={menu.id}
                  onClick={() => setActiveTab(menu.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                    isActive 
                      ? 'bg-emerald-900 border-emerald-950 text-white shadow-md ring-2 ring-emerald-700/50' 
                      : 'bg-white border-stone-200 text-stone-700 hover:border-emerald-400 hover:shadow-xs hover:bg-emerald-50/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isActive ? 'bg-white/15 text-amber-300' : 'bg-stone-100 text-emerald-800'
                      }`}>
                        {getMenuIcon(menu.iconName, "w-4 h-4")}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-amber-400 text-emerald-950' : 'bg-stone-100 text-stone-600'
                      }`}>
                        {badgeText}
                      </span>
                    </div>

                    <div className={`font-bold text-xs sm:text-sm tracking-tight ${
                      isActive ? 'text-white' : 'text-stone-900'
                    }`}>
                      {menu.title}
                    </div>
                  </div>

                  <p className={`text-[11px] leading-tight mt-2 line-clamp-2 ${
                    isActive ? 'text-emerald-100' : 'text-stone-500'
                  }`}>
                    {menu.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: DATA ASN (DYNAMIC GOOGLE SPREADSHEET SYNC) */}
        {/* ============================================================ */}
        {activeTab === 'data-asn' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
            
            {/* Header Tab with Dynamic Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-100">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Kepegawaian & Manajemen SDM Terintegrasi</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-3">
                  <span>DATA ASN (Aparatur Sipil Negara)</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1.5 border ${
                    isAsnLive 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${isAsnLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                    {isAsnLive ? 'Live Google Spreadsheet' : 'Data Cadangan Aktif'}
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  Data dinamis Aparatur Sipil Negara yang tersinkronisasi otomatis dengan Google Spreadsheet Dinas Pertanian TTS.
                </p>
              </div>

              {/* Action Buttons: Refresh, Endpoint, Export, Print */}
              <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
                {/* Refresh Button */}
                <button
                  onClick={refreshAsnData}
                  disabled={isAsnRefreshing || isAsnLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-all disabled:opacity-50"
                  title="Sinkronkan data sekarang dari Google Spreadsheet"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isAsnRefreshing ? 'animate-spin' : ''}`} />
                  <span>{isAsnRefreshing ? 'Menyinkronkan...' : 'Sinkronkan Data'}</span>
                </button>

                {/* Endpoint Settings Button */}
                <button
                  onClick={() => setShowSettingsModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium border border-stone-200 cursor-pointer transition-all"
                  title="Lihat atau sesuaikan URL endpoint Google Apps Script"
                >
                  <Settings className="w-3.5 h-3.5 text-stone-500" />
                  <span>Sumber Data</span>
                </button>

                {/* Export CSV */}
                <button
                  onClick={exportAsnToCsv}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium border border-stone-200 cursor-pointer transition-all"
                  title="Ekspor daftar pegawai ke file CSV"
                >
                  <FileDown className="w-3.5 h-3.5 text-stone-500" />
                  <span className="hidden sm:inline">Ekspor CSV</span>
                </button>

                {/* Print Button */}
                <button
                  onClick={handlePrintAsn}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium border border-stone-200 cursor-pointer transition-all"
                  title="Cetak daftar pegawai"
                >
                  <Printer className="w-3.5 h-3.5 text-stone-500" />
                  <span className="hidden sm:inline">Cetak</span>
                </button>
              </div>
            </div>

            {/* Real-time Dynamic Status Bar */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${isAsnLive ? 'bg-emerald-500 animate-ping' : 'bg-amber-400'}`} />
                <div className="text-stone-700">
                  <span className="font-bold text-stone-900">
                    {isAsnLive ? 'Koneksi Spreadsheet Aktif' : 'Status Sinkronisasi:'}
                  </span>{' '}
                  <span className="text-stone-500">
                    Terakhir diperbarui: <span className="font-mono font-medium text-stone-800">{asnLastUpdated || 'Baru saja'}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none text-stone-600">
                  <input
                    type="checkbox"
                    checked={autoSync}
                    onChange={(e) => setAutoSync(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span>Auto-Sync berkala</span>
                </label>
                {autoSync && (
                  <span className="bg-white px-2 py-0.5 rounded-md border border-stone-200 text-stone-500 font-mono text-[11px]">
                    refresh: {countdown}s
                  </span>
                )}
              </div>
            </div>

            {/* ERROR BANNER 1: Script function not found: doGet */}
            {(asnErrorType === 'DOGET_NOT_FOUND' || (asnError && asnError.includes('doGet'))) && (
              <div className="bg-amber-50/95 border-2 border-amber-400/90 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row items-start justify-between gap-4 text-xs text-amber-950 shadow-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                    <Code className="w-5 h-5 text-amber-900" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-extrabold text-amber-950 text-sm">
                        Fungsi "doGet" Belum Ditemukan di Google Apps Script (Code.gs)
                      </h4>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold border border-amber-300">
                        Script function not found: doGet
                      </span>
                    </div>
                    <p className="text-amber-900 leading-relaxed max-w-3xl">
                      Deployment URL Google Apps Script Anda sudah aktif dan dapat diakses publik. Namun, file script di Google Sheets (<strong>Ekstensi &gt; Apps Script</strong>) memerlukan fungsi bernama <strong>doGet(e)</strong> agar dapat mengeluarkan data spreadsheet menjadi format JSON.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1.5">
                      <button
                        onClick={() => setShowScriptModal(true)}
                        className="inline-flex items-center gap-1.5 font-bold text-white bg-amber-900 hover:bg-amber-950 px-3 py-1.5 rounded-xl cursor-pointer shadow-xs transition-colors"
                      >
                        <FileCode className="w-4 h-4 text-amber-300" />
                        <span>Salin Kode Script Siap Pakai (1 Menit)</span>
                      </button>
                      <button
                        onClick={() => setShowGuideModal(true)}
                        className="inline-flex items-center gap-1.5 font-semibold text-amber-900 hover:text-amber-950 bg-white hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300 cursor-pointer transition-colors"
                      >
                        <HelpCircle className="w-4 h-4 text-amber-700" />
                        <span>Panduan Pasang di Spreadsheet</span>
                      </button>
                      <button
                        onClick={refreshAsnData}
                        className="inline-flex items-center gap-1.5 font-semibold text-amber-900 hover:text-amber-950 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl border border-amber-300 cursor-pointer transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Cek Ulang Koneksi</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ERROR BANNER 2: Permission / 403 Forbidden */}
            {asnErrorType === 'PERMISSION_403' && (
              <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start justify-between gap-4 text-xs text-amber-900">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertCircle className="w-5 h-5 text-amber-800" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-950 text-sm mb-1">
                      Pengaturan Akses Google Apps Script Diperlukan
                    </h4>
                    <p className="text-amber-800 leading-relaxed mb-2">
                      Tautan Google Apps Script saat ini mengembalikan status izin login (403 Forbidden). Pastikan opsi deployment disetel ke <strong>"Who has access: Anyone"</strong> (Siapa saja).
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setShowGuideModal(true)}
                        className="inline-flex items-center gap-1 font-bold text-amber-950 hover:underline cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-amber-300"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Lihat Panduan 3 Langkah</span>
                      </button>
                      <button
                        onClick={refreshAsnData}
                        className="inline-flex items-center gap-1 font-semibold text-amber-900 hover:text-amber-950 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg border border-amber-300 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Coba Sambungkan Ulang</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Filters Row: Status Pills, Unit Dropdown, Search Input */}
            <div className="space-y-3">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Status Filter Pills with Live Counts */}
                <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl self-start text-xs">
                  <button
                    onClick={() => setAsnStatusFilter('Semua')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      asnStatusFilter === 'Semua'
                        ? 'bg-white text-emerald-900 shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Semua ({dynamicTotalAsn})
                  </button>
                  <button
                    onClick={() => setAsnStatusFilter('PNS')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      asnStatusFilter === 'PNS'
                        ? 'bg-white text-emerald-900 shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    PNS ({dynamicTotalPns})
                  </button>
                  <button
                    onClick={() => setAsnStatusFilter('PPPK')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      asnStatusFilter === 'PPPK'
                        ? 'bg-white text-emerald-900 shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    PPPK ({dynamicTotalPppk})
                  </button>
                </div>

                {/* Unit Penempatan Filter Dropdown */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-stone-500 font-medium whitespace-nowrap">Unit Kerja:</span>
                  <select
                    value={asnUnitFilter}
                    onChange={(e) => setAsnUnitFilter(e.target.value)}
                    className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer max-w-xs"
                  >
                    <option value="Semua">Semua Unit Kerja Dinas</option>
                    {uniqueUnits.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Bar & Result Summary */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={asnSearch}
                    onChange={(e) => setAsnSearch(e.target.value)}
                    placeholder="Cari berdasarkan nama pegawai, NIP, jabatan, unit penempatan, atau pendidikan..."
                    className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                  />
                  {asnSearch && (
                    <button
                      onClick={() => setAsnSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs cursor-pointer p-1"
                    >
                      Bersihkan
                    </button>
                  )}
                </div>

                <div className="text-xs text-stone-500 self-center sm:self-auto">
                  Menampilkan <span className="font-bold text-stone-800">{filteredAsn.length}</span> dari <span className="font-bold text-stone-800">{dynamicTotalAsn}</span> pegawai terdata
                </div>
              </div>
            </div>

            {/* ASN Table */}
            <div className="overflow-x-auto rounded-2xl border border-stone-200 relative">
              {isAsnLoading && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900 text-white text-xs font-semibold shadow-lg">
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Memperbarui data dari spreadsheet...</span>
                  </div>
                </div>
              )}

              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-50 text-stone-700 font-semibold border-b border-stone-200 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Nama Lengkap & NIP</th>
                    <th className="py-3 px-4">Jabatan Kedinasan</th>
                    <th className="py-3 px-4">Pangkat / Golongan</th>
                    <th className="py-3 px-4">Unit Penempatan</th>
                    <th className="py-3 px-4">Pendidikan</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {filteredAsn.map((asn) => (
                    <tr 
                      key={asn.id} 
                      onClick={() => setSelectedAsnDetail(asn)}
                      className="hover:bg-emerald-50/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">{asn.nama}</div>
                        <div className="text-xs font-mono text-stone-500">NIP. {asn.nip}</div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-stone-800">
                        {asn.jabatan}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-stone-900">{asn.golongan}</span>
                        <div className="text-[11px] text-stone-500">{asn.pangkat}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-medium">
                          <MapPin className="w-3 h-3 text-stone-500" />
                          <span>{asn.unitKerja}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-stone-600 text-xs">
                        {asn.pendidikanTerakhir}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${
                          asn.status === 'PNS'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}>
                          {asn.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAsnDetail(asn);
                          }}
                          className="p-1.5 rounded-lg bg-stone-100 group-hover:bg-emerald-800 group-hover:text-white text-stone-600 transition-colors cursor-pointer"
                          title="Lihat profil detail pegawai"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredAsn.length === 0 && !isAsnLoading && (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-stone-400">
                        <Users className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                        <div className="font-medium text-stone-600">Tidak ada data pegawai ASN yang sesuai filter.</div>
                        <div className="text-xs text-stone-400 mt-1">Coba gunakan kata kunci pencarian yang berbeda atau reset filter.</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Note ASN & Sync Guarantee */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-xs text-stone-700">
              <Info className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div>
                  <span className="font-bold text-emerald-900">Sinkronisasi Dinamis:</span> Tabel ini terhubung secara dinamis dengan Google Spreadsheet. Ketika data pada spreadsheet diperbarui oleh staf kepegawaian Sekretariat, daftar aparatur di web ini akan otomatis ikut terupdate.
                </div>
                <div className="text-stone-500">
                  Data juga terintegrasi dengan modul SIASN BKN dan Sistem Koordinasi Penyuluh Lapangan (SIKOR PPKL) untuk pemantauan tenaga kerja pertanian di 32 BPP kecamatan.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: PROGRAM KEGIATAN (GOOGLE DRIVE DYNAMIC SYNC) */}
        {/* ============================================================ */}
        {activeTab === 'program-kegiatan' && (
          <ProgramKegiatanDriveTab formatIDR={formatIDR} />
        )}

        {/* ============================================================ */}
        {/* TAB 3: RENCANA REALISASI */}
        {/* ============================================================ */}
        {activeTab === 'rencana-realisasi' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
            {/* Header Tab */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">
                  <CalendarCheck className="w-4 h-4 text-emerald-600" />
                  <span>Matriks Pelaksanaan & Progres Tahapan</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  RENCANA REALISASI
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  Perencanaan dan pelaksanaan kegiatan berbasis time schedule triwulanan APBD 2026
                </p>
              </div>

              {/* Triwulan Filter Pills */}
              <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl text-xs">
                {['Semua', 'TW I', 'TW II', 'TW III', 'TW IV'].map((tw) => (
                  <button
                    key={tw}
                    onClick={() => setRrTriwulanFilter(tw)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      rrTriwulanFilter === tw
                        ? 'bg-white text-emerald-900 shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {tw}
                  </button>
                ))}
              </div>
            </div>

            {/* Realization Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRr.map((item) => (
                <div 
                  key={item.id} 
                  className="p-5 rounded-2xl border border-stone-200 hover:border-emerald-300 transition-all bg-stone-50/40 hover:bg-white shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {item.triwulan} · {item.jadwalWaktu}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                      {item.namaKegiatan}
                    </h4>
                    <div className="text-xs text-stone-500 mt-1">
                      Tahapan: <span className="font-medium text-stone-800">{item.tahapanRencana}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-stone-600">Realisasi Fisik / Output</span>
                      <span className="text-emerald-700 font-mono font-bold">{item.persenProgres}%</span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${item.persenProgres}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-stone-100 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Target Output:</span>
                      <span className="font-medium text-stone-700">{item.targetOutput}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Capaian Saat Ini:</span>
                      <span className="font-bold text-emerald-800">{item.capaianRealisasi}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-stone-500 italic pt-1 border-t border-stone-100">
                    Catatan: {item.catatanEvaluasi}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: LAPORAN PAD (SINKRONISASI GOOGLE APPS SCRIPT) */}
        {/* ============================================================ */}
        {activeTab === 'laporan-pad' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
            {/* Header Tab */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">
                  <Receipt className="w-4 h-4 text-emerald-600" />
                  <span>Optimalisasi Pendapatan Daerah</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  LAPORAN PAD (Pendapatan Asli Daerah)
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  Laporan pemantauan realisasi Pendapatan Asli Daerah dari retribusi sewa alat mesin pertanian dan penjualan hasil kebun percontohan
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleExportPadCsv}
                  className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Unduh Data PAD sebagai file CSV"
                >
                  <Download className="w-3.5 h-3.5 text-stone-600" />
                  <span>Ekspor CSV</span>
                </button>

                <button
                  onClick={() => {
                    setPadInputUrl(padSourceUrl);
                    setShowPadSettingsModal(true);
                  }}
                  className="px-3 py-2 bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Pengaturan Endpoint Google Apps Script PAD"
                >
                  <Settings className="w-3.5 h-3.5 text-stone-500" />
                  <span>Sumber Data PAD</span>
                </button>

                <button
                  onClick={() => setShowPadScriptModal(true)}
                  className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Kode Google Apps Script doGet untuk PAD"
                >
                  <Code className="w-3.5 h-3.5 text-amber-700" />
                  <span>Kode doGet</span>
                </button>

                <button
                  onClick={refreshPadData}
                  disabled={isPadRefreshing}
                  className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-75"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isPadRefreshing ? 'animate-spin' : ''}`} />
                  <span>{isPadRefreshing ? 'Menyinkronkan...' : 'Sinkronkan Sekarang'}</span>
                </button>
              </div>
            </div>

            {/* Bilah Status Endpoint Google Apps Script PAD */}
            <div className={`p-4 rounded-2xl border transition-all ${
              isPadLive 
                ? 'bg-emerald-50/90 border-emerald-300/80 shadow-2xs' 
                : padErrorType === 'DOGET_NOT_FOUND'
                ? 'bg-amber-50/90 border-amber-300'
                : 'bg-stone-50 border-stone-200'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isPadLive 
                      ? 'bg-emerald-800 text-amber-300 shadow-xs' 
                      : padErrorType === 'DOGET_NOT_FOUND'
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-200 text-stone-700'
                  }`}>
                    {isPadLive ? <Radio className="w-4 h-4 animate-pulse" /> : <Coins className="w-4 h-4" />}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-stone-900">
                        Sumber Data Tunggal PAD:
                      </span>
                      {isPadLive ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          Terbaca Langsung dari Google Apps Script ({livePadList.length} Objek Retribusi Terverifikasi)
                        </span>
                      ) : padErrorType === 'DOGET_NOT_FOUND' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-950">
                          <AlertCircle className="w-3 h-3 text-amber-800" />
                          Endpoint Terhubung (Fungsi doGet Belum Terpasang)
                        </span>
                      ) : isPadLoading ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
                          <RefreshCw className="w-3 h-3 animate-spin text-blue-600" />
                          Sedang Membaca Data dari Google Apps Script...
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">
                          Data PAD Terverifikasi ({livePadList.length} Objek)
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-stone-600 truncate max-w-2xl font-mono">
                      <span className="text-emerald-800 font-semibold">URL:</span> {padSourceUrl}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
                  {padLastUpdated && (
                    <span className="text-[11px] text-stone-500">
                      Pembaruan: <strong className="text-stone-700">{new Date(padLastUpdated).toLocaleTimeString('id-ID')} WITA</strong>
                    </span>
                  )}

                  <button
                    onClick={() => setPadAutoSync(!padAutoSync)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                      padAutoSync 
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                        : 'bg-stone-100 text-stone-600 border-stone-200'
                    }`}
                  >
                    Auto-Sync: {padAutoSync ? `Aktif (${padCountdown}s)` : 'Nonaktif'}
                  </button>
                </div>
              </div>

              {/* Informative helper when doGet is missing in Google Apps Script */}
              {padErrorType === 'DOGET_NOT_FOUND' && (
                <div className="mt-3 pt-3 border-t border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                    <span>
                      Endpoint URL Anda terdaftar: <code>{padSourceUrl}</code>. Google Apps Script merespon <code>Script function not found: doGet</code>. Sistem saat ini menampilkan data dasar PAD Dinas Pertanian TTS. Untuk menghubungkan ke Google Sheets Anda secara live, tempel kode fungsi <code>doGet(e)</code> pada <code>Code.gs</code> di Apps Script Anda.
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setShowPadScriptModal(true)}
                      className="px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-lg cursor-pointer transition-colors shadow-2xs"
                    >
                      Salin Kode doGet
                    </button>
                    <a
                      href={padSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-white border border-amber-300 hover:bg-amber-100 text-amber-950 font-bold rounded-lg cursor-pointer transition-colors inline-flex items-center gap-1"
                    >
                      <span>Buka URL</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* PAD Recap Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="text-xs text-stone-500 font-medium">Target PAD Dinas (2026)</div>
                <div className="text-xl sm:text-2xl font-black text-stone-900 font-mono mt-1">
                  {formatIDR(totalTargetPad)}
                </div>
                <div className="text-xs text-stone-500 mt-0.5">Retribusi Alsintan & Hasil Kebun</div>
              </div>

              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
                <div className="text-xs text-emerald-800 font-medium">Realisasi Setor Kasda</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-900 font-mono mt-1">
                  {formatIDR(totalRealisasiPad)}
                </div>
                <div className="text-xs font-bold text-emerald-700 mt-0.5">
                  Capaian: {persentaseTotalPad.toFixed(2)}% Target Tahunan
                </div>
              </div>

              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
                <div className="text-xs text-amber-800 font-medium">Sisa Target Berjalan</div>
                <div className="text-xl sm:text-2xl font-black text-amber-900 font-mono mt-1">
                  {formatIDR(sisaTargetPad)}
                </div>
                <div className="text-xs text-amber-700 font-medium mt-0.5">
                  Proyeksi surplus masa panen TW IV
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari sumber retribusi, uraian, bukti STS..."
                  value={padSearch}
                  onChange={(e) => setPadSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
                {padSearch && (
                  <button
                    onClick={() => setPadSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="text-xs text-stone-500 self-end sm:self-center">
                Menampilkan <strong className="text-stone-800">{filteredPadList.length}</strong> dari <strong>{livePadList.length}</strong> objek retribusi
              </div>
            </div>

            {/* PAD Table */}
            <div className="overflow-x-auto rounded-2xl border border-stone-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-50 text-stone-700 font-semibold border-b border-stone-200 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 w-12 text-center">No</th>
                    <th className="py-3 px-4">Sumber PAD & Uraian Retribusi</th>
                    <th className="py-3 px-4 text-right">Target 2026</th>
                    <th className="py-3 px-4 text-right">Realisasi Kasda</th>
                    <th className="py-3 px-4 text-center">Capaian</th>
                    <th className="py-3 px-4">Unit Pengelola / Bukti Kas</th>
                    <th className="py-3 px-4 text-center">Status Kasda</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {filteredPadList.length > 0 ? (
                    filteredPadList.map((pad, idx) => (
                      <tr key={pad.id || idx} className="hover:bg-emerald-50/40 transition-colors">
                        <td className="py-3.5 px-4 text-center font-mono text-stone-400">
                          {idx + 1}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-stone-900">{pad.sumberPad}</div>
                          <div className="text-xs text-stone-500 mt-0.5">{pad.uraianRetribusi}</div>
                          {pad.periode && (
                            <div className="text-[11px] text-emerald-800 font-medium mt-1">
                              Periode: {pad.periode}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-medium text-stone-700">
                          {formatIDR(pad.targetTahunan)}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-800">
                          {formatIDR(pad.realisasiSdSaatIni)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="font-bold text-xs bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-md font-mono inline-block">
                            {pad.persentaseCapaian ? pad.persentaseCapaian.toFixed(1) : '0.0'}%
                          </span>
                          <div className="w-16 mx-auto bg-stone-200 rounded-full h-1 mt-1.5 overflow-hidden">
                            <div 
                              className="bg-emerald-600 h-1 rounded-full" 
                              style={{ width: `${Math.min(100, Math.max(0, pad.persentaseCapaian || 0))}%` }}
                            />
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-stone-800">{pad.unitPengelola}</div>
                          <div className="text-[11px] font-mono text-stone-400 mt-0.5">{pad.nomorBuktiKas}</div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(pad.statusSetoran)}`}>
                            {pad.statusSetoran}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-stone-500">
                        <AlertCircle className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                        <div className="font-semibold text-stone-700">Tidak ada data PAD yang cocok dengan filter pencarian.</div>
                        <div className="text-xs text-stone-400 mt-1">Coba gunakan kata kunci lain atau kosongkan kolom pencarian.</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: ASET (BARANG MILIK DAERAH BERDASARKAN KIB) */}
        {/* ============================================================ */}
        {activeTab === 'aset' && (
          <AsetSectionView formatIDR={formatIDR} />
        )}

        {/* ============================================================ */}
        {/* TAB 6: FISIK & KEUANGAN (LAPORAN RFK) */}
        {/* ============================================================ */}
        {activeTab === 'fisik-keuangan' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
            {/* Header Tab */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <span>Pengendalian Realisasi Fisik & Keuangan (RFK)</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  FISIK & KEUANGAN
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  Laporan realisasi fisik dan keuangan seluruh sub-unit kerja Dinas Pertanian TTS Tahun Anggaran 2026
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => refreshRfkData()}
                  disabled={isRfkLoading || isRfkRefreshing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold border border-emerald-200 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRfkRefreshing ? 'animate-spin' : ''}`} />
                  <span>{isRfkRefreshing ? 'Menyinkronkan...' : 'Sinkronkan RFK'}</span>
                </button>

                <button
                  onClick={() => setShowRfkSettingsModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold border border-stone-300 transition-colors cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Atur Link</span>
                </button>

                <button
                  onClick={() => setShowRfkScriptModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-semibold border border-amber-300 transition-colors cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-amber-800" />
                  <span>Skrip Apps Script</span>
                </button>
              </div>
            </div>

            {/* Live Sync Status Banner */}
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
              isRfkLive 
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
                : 'bg-amber-50/70 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-2.5 h-2.5 rounded-full ${isRfkLive ? 'bg-emerald-600 animate-pulse' : 'bg-amber-500'}`} />
                <div>
                  <span className="font-bold">
                    {isRfkLive ? 'Terhubung Live ke Google Apps Script (RFK)' : 'Menggunakan Data Cache / Offline Fallback'}
                  </span>
                  <span className="text-stone-500 ml-2">
                    {rfkLastUpdated ? `(Pembaruan terakhir: ${new Date(rfkLastUpdated).toLocaleTimeString('id-ID')})` : ''}
                  </span>
                </div>
              </div>
              <div className="text-[11px] font-mono text-stone-600 truncate max-w-xs">
                Sumber: {rfkSourceUrl}
              </div>
            </div>

            {/* Total Recap Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                <div className="text-xs text-stone-500 font-medium">Total Pagu Dinas (APBD 2026)</div>
                <div className="text-xl sm:text-2xl font-black text-stone-900 font-mono mt-1">
                  {formatIDR(totalPagu)}
                </div>
                <div className="text-xs text-stone-500 mt-1">{liveRfkList.length} Program / Unit Kerja</div>
              </div>

              <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200">
                <div className="text-xs text-emerald-800 font-medium">Sudah Terealisasi (Keuangan)</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-950 font-mono mt-1">
                  {formatIDR(totalRealisasi)}
                </div>
                <div className="text-xs font-bold text-emerald-800 mt-1">
                  Capaian: {persenKeu.toFixed(2)}% dari pagu tahunan
                </div>
              </div>

              <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200">
                <div className="text-xs text-amber-800 font-medium">Belum Terealisasi (Sisa)</div>
                <div className="text-xl sm:text-2xl font-black text-amber-950 font-mono mt-1">
                  {formatIDR(sisaAnggaran)}
                </div>
                <div className="text-xs font-bold text-amber-800 mt-1">
                  Sisa Anggaran: {(100 - persenKeu).toFixed(2)}%
                </div>
              </div>
            </div>

            {/* RFK Table Breakdown */}
            <div className="overflow-x-auto rounded-2xl border border-stone-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-50 text-stone-700 font-semibold border-b border-stone-200 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Unit Kerja / Program</th>
                    <th className="py-3 px-4 text-right">Pagu Anggaran</th>
                    <th className="py-3 px-4 text-right">Realisasi Keuangan</th>
                    <th className="py-3 px-4 text-center">% Keuangan</th>
                    <th className="py-3 px-4 text-center">Target Fisik</th>
                    <th className="py-3 px-4 text-center">Realisasi Fisik</th>
                    <th className="py-3 px-4 text-center">Deviasi</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {liveRfkList.map((rfk) => (
                    <tr key={rfk.id} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-900">{rfk.unitKerja}</div>
                        <div className="text-xs font-mono text-stone-400">KODE: {rfk.kodeUnit}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-stone-800">
                        {formatIDR(rfk.paguAnggaran)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-800">
                        {formatIDR(rfk.realisasiKeuangan)}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-stone-900">
                        {rfk.persenKeuangan.toFixed(1)}%
                      </td>
                      <td className="py-3.5 px-4 text-center text-stone-600">
                        {rfk.targetFisik.toFixed(1)}%
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-blue-800">
                        {rfk.realisasiFisik.toFixed(1)}%
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-emerald-700">
                        {rfk.deviasiFisik >= 0 ? `+${rfk.deviasiFisik.toFixed(1)}%` : `${rfk.deviasiFisik.toFixed(1)}%`}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(rfk.statusKinerja)}`}>
                          {rfk.statusKinerja}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-stone-500">
                Laporan RFK ditandatangani oleh Pengguna Anggaran (Kepala Dinas) dan Pejabat Pembuat Komitmen (PPK).
              </div>

              {onNavigateToSikor && (
                <button
                  onClick={onNavigateToSikor}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-colors shadow-sm"
                >
                  <FolderKanban className="w-4 h-4 text-amber-300" />
                  <span>Buka Modul Pelaporan SIKOR PPKL</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ============================================================ */}
      {/* MODAL: DETAIL PEGAWAI ASN */}
      {/* ============================================================ */}
      {selectedAsnDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Header Modal */}
            <div className="bg-emerald-900 text-white p-6 relative">
              <button 
                onClick={() => setSelectedAsnDetail(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-emerald-950 font-bold text-[11px] mb-2">
                {selectedAsnDetail.status}
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">
                {selectedAsnDetail.nama}
              </h3>
              <p className="text-xs font-mono text-emerald-200 mt-1">
                NIP. {selectedAsnDetail.nip}
              </p>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block mb-0.5">Jabatan</span>
                  <span className="font-bold text-stone-900">{selectedAsnDetail.jabatan}</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block mb-0.5">Pangkat / Golongan</span>
                  <span className="font-bold text-stone-900">{selectedAsnDetail.golongan}</span>
                  <span className="block text-stone-500 text-[11px]">{selectedAsnDetail.pangkat}</span>
                </div>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-stone-200/60">
                  <span className="text-stone-500">Unit Penempatan:</span>
                  <span className="font-bold text-stone-900 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    {selectedAsnDetail.unitKerja}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-stone-200/60">
                  <span className="text-stone-500">Pendidikan Terakhir:</span>
                  <span className="font-semibold text-stone-800">{selectedAsnDetail.pendidikanTerakhir}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-stone-200/60">
                  <span className="text-stone-500">Terhitung Mulai Tanggal (TMT):</span>
                  <span className="font-mono text-stone-800">{selectedAsnDetail.tmt}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Status SIASN BKN:</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Terverifikasi Aktif
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedAsnDetail(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl cursor-pointer transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: KODE GOOGLE APPS SCRIPT SIAP PAKAI */}
      {/* ============================================================ */}
      {showScriptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="bg-amber-900 text-white p-6 relative">
              <button 
                onClick={() => setShowScriptModal(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-bold text-[11px] mb-2">
                Kode Google Apps Script Siap Pakai
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">
                Salin & Tempel Kode Script doGet(e)
              </h3>
              <p className="text-xs text-amber-200 mt-1">
                Kode ini membaca sheet aktif secara otomatis, mengonversi data pegawai ke JSON, dan membuat data dapat dibaca real-time.
              </p>
            </div>

            <div className="p-6 space-y-4 text-xs">
              {/* Instructions Steps */}
              <div className="space-y-1.5 text-stone-700 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-900">3 Langkah Mudah di Google Spreadsheet:</div>
                <ol className="list-decimal list-inside space-y-1 text-stone-600">
                  <li>Buka Spreadsheet ASN Anda &gt; klik <strong>Ekstensi (Extensions)</strong> &gt; <strong>Apps Script</strong>.</li>
                  <li>Hapus kode bawaan di file <code className="bg-stone-200 px-1 py-0.5 rounded font-mono text-[11px]">Code.gs</code>, lalu tempel kode di bawah ini.</li>
                  <li>Klik <strong>Simpan 💾</strong> &gt; klik <strong>Deploy</strong> &gt; <strong>Manage deployments</strong> &gt; Edit ✏️ &gt; pilih <strong>New version</strong> &gt; <strong>Deploy</strong>.</li>
                </ol>
              </div>

              {/* Code Box */}
              <div className="relative">
                <div className="flex items-center justify-between bg-stone-800 text-stone-300 px-4 py-2 rounded-t-xl text-[11px] font-mono">
                  <span>Code.gs</span>
                  <button
                    onClick={handleCopyScript}
                    className="inline-flex items-center gap-1 text-white bg-amber-600 hover:bg-amber-700 px-2.5 py-1 rounded font-semibold cursor-pointer transition-colors"
                  >
                    {copyScriptSuccess ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copyScriptSuccess ? 'Berhasil Disalin!' : 'Salin Kode Script'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-stone-900 text-amber-300 font-mono text-[11px] rounded-b-xl overflow-x-auto max-h-64 border-t border-stone-700 leading-relaxed">
                  {RECOMMENDED_APPS_SCRIPT_CODE}
                </pre>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setShowScriptModal(false);
                    setShowGuideModal(true);
                  }}
                  className="text-stone-600 hover:text-stone-900 font-semibold cursor-pointer underline"
                >
                  Lihat panduan bergambar lengkap
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowScriptModal(false)}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl cursor-pointer"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => {
                      setShowScriptModal(false);
                      refreshAsnData();
                    }}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl cursor-pointer shadow-xs"
                  >
                    Sudah Dipasang, Tes Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: PENGATURAN SUMBER DATA & ENDPOINT */}
      {/* ============================================================ */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Pengaturan Sumber Data ASN</h3>
                  <p className="text-xs text-stone-500">Integrasi Google Spreadsheet / Apps Script Web App</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  URL Endpoint Google Apps Script atau Google Sheet:
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>
                <p className="text-stone-400 mt-1 text-[11px] leading-relaxed">
                  Bisa menggunakan URL <strong>Google Apps Script Web App</strong> (<code className="font-mono">/exec</code>) ATAU langsung tautan bagikan <strong>Google Spreadsheet</strong> publik Anda (<code className="font-mono">docs.google.com/spreadsheets/d/...</code>).
                </p>
              </div>

              {/* Quick Action buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleCopyUrl(inputUrl)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium cursor-pointer transition-colors inline-flex items-center gap-1.5"
                >
                  {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ExternalLink className="w-3.5 h-3.5 text-stone-500" />}
                  <span>{copySuccess ? 'Tersalin ke Clipboard!' : 'Salin URL'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInputUrl(defaultAsnUrl);
                    resetAsnUrl();
                  }}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium cursor-pointer transition-colors"
                >
                  Reset ke URL Awal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSettingsModal(false);
                    setShowScriptModal(true);
                  }}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg font-medium cursor-pointer transition-colors inline-flex items-center gap-1"
                >
                  <Code className="w-3.5 h-3.5 text-amber-700" />
                  <span>Kode Script doGet</span>
                </button>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    updateAsnUrl(inputUrl);
                    setShowSettingsModal(false);
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

      {/* ============================================================ */}
      {/* MODAL: PANDUAN PENGATURAN IZIN GOOGLE APPS SCRIPT */}
      {/* ============================================================ */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="bg-amber-900 text-white p-6 relative">
              <button 
                onClick={() => setShowGuideModal(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-bold text-[11px] mb-2">
                Panduan Singkat Google Apps Script
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">
                Panduan Menghubungkan Google Spreadsheet
              </h3>
              <p className="text-xs text-amber-200 mt-1">
                Langkah memasang fungsi doGet dan memastikan deployment dapat diakses secara publik.
              </p>
            </div>

            <div className="p-6 space-y-4 text-xs text-stone-700">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">Buka Script Editor di Google Sheets</span>
                    <span className="text-stone-600">
                      Buka Google Spreadsheet data ASN Anda, lalu klik menu <strong>Extensions (Ekstensi)</strong> &gt; <strong>Apps Script</strong>.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">Salin & Tempel Fungsi doGet(e)</span>
                    <span className="text-stone-600">
                      Ganti isi <code className="font-mono text-[11px] bg-stone-200 px-1 py-0.5 rounded">Code.gs</code> dengan kode siap pakai, lalu klik ikon <strong>Simpan (Save 💾)</strong>.
                    </span>
                    <div className="mt-1.5">
                      <button
                        onClick={() => {
                          setShowGuideModal(false);
                          setShowScriptModal(true);
                        }}
                        className="text-emerald-800 font-bold hover:underline cursor-pointer inline-flex items-center gap-1"
                      >
                        <Code className="w-3.5 h-3.5" />
                        <span>Buka Kode Siap Pakai &gt;</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">Deploy Versi Baru (New Version)</span>
                    <span className="text-stone-600">
                      Klik <strong>Deploy</strong> &gt; <strong>Manage deployments</strong> &gt; klik ikon pensil ✏️ &gt; pada bagian <strong>Version</strong> pilih <strong>New version</strong> &gt; pastikan <strong>Who has access: Anyone</strong> &gt; klik <strong>Deploy</strong>.
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                <span className="font-bold block mb-0.5">Selesai!</span>
                Setelah dideploy ulang sebagai versi baru dengan fungsi doGet, klik tombol <strong>"Sinkronkan Data"</strong> di website ini dan seluruh data spreadsheet akan langsung muncul secara dinamis.
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href="https://script.google.com/macros/s/AKfycbxSoOOfNblJcPUy4LqIUliJS2_RlpkzvtHDzKluYftpNxFAlrgocxNSrKhMN8O3ex71/exec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-800 hover:text-emerald-950 font-bold inline-flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka Endpoint di Tab Baru</span>
                </a>
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl cursor-pointer"
                >
                  Saya Mengerti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: PENGATURAN SUMBER DATA & ENDPOINT PAD */}
      {/* ============================================================ */}
      {showPadSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Pengaturan Sumber Data PAD</h3>
                  <p className="text-xs text-stone-500">Integrasi Google Spreadsheet / Apps Script Web App</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPadSettingsModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  URL Endpoint Google Apps Script PAD:
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={padInputUrl}
                    onChange={(e) => setPadInputUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>
                <p className="text-stone-400 mt-1 text-[11px] leading-relaxed">
                  URL Web App Google Apps Script (<code className="font-mono">/exec</code>) yang terhubung ke lembar kerja PAD Dinas Tanaman Pangan, Hortikultura, dan Perkebunan Kab. TTS.
                </p>
              </div>

              {/* Quick Action buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleCopyPadUrl(padInputUrl)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium cursor-pointer transition-colors inline-flex items-center gap-1.5"
                >
                  {copyPadSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ExternalLink className="w-3.5 h-3.5 text-stone-500" />}
                  <span>{copyPadSuccess ? 'Tersalin!' : 'Salin URL'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPadInputUrl(defaultPadUrl);
                    resetPadUrl();
                  }}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium cursor-pointer transition-colors"
                >
                  Reset ke URL Default
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPadSettingsModal(false);
                    setShowPadScriptModal(true);
                  }}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg font-medium cursor-pointer transition-colors inline-flex items-center gap-1"
                >
                  <Code className="w-3.5 h-3.5 text-amber-700" />
                  <span>Kode Script doGet</span>
                </button>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowPadSettingsModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    updatePadUrl(padInputUrl);
                    setShowPadSettingsModal(false);
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

      {/* ============================================================ */}
      {/* MODAL: KODE GOOGLE APPS SCRIPT PAD (doGet) */}
      {/* ============================================================ */}
      {showPadScriptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Code className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Kode Google Apps Script PAD (doGet)</h3>
                  <p className="text-xs text-stone-500">Pasang kode ini pada Code.gs di Spreadsheet Laporan PAD Anda</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPadScriptModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-xs flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Cara Pasang Mudah:</strong>
                  <ol className="list-decimal list-inside space-y-0.5 mt-1 text-stone-700">
                    <li>Buka Spreadsheet Laporan PAD &gt; klik <strong>Ekstensi</strong> &gt; <strong>Apps Script</strong>.</li>
                    <li>Hapus semua isi <code>Code.gs</code>, lalu tempel kode di bawah ini &gt; klik <strong>Simpan (💾)</strong>.</li>
                    <li>Klik <strong>Deploy</strong> &gt; <strong>Manage deployments</strong> &gt; Edit ✏️ &gt; Version: <strong>New version</strong> &gt; Who has access: <strong>Anyone</strong> &gt; <strong>Deploy</strong>.</li>
                  </ol>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between bg-stone-800 text-stone-300 px-4 py-2 rounded-t-xl text-[11px] font-mono">
                  <span>Code.gs (Google Apps Script PAD)</span>
                  <button
                    onClick={handleCopyPadScript}
                    className="inline-flex items-center gap-1 text-white bg-amber-600 hover:bg-amber-700 px-2.5 py-1 rounded font-semibold cursor-pointer transition-colors"
                  >
                    {copyPadScriptSuccess ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copyPadScriptSuccess ? 'Berhasil Disalin!' : 'Salin Kode Script'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-stone-900 text-amber-300 font-mono text-[11px] rounded-b-xl overflow-x-auto max-h-64 border-t border-stone-700 leading-relaxed">
                  {RECOMMENDED_PAD_APPS_SCRIPT_CODE}
                </pre>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={padSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-800 hover:text-emerald-950 font-bold inline-flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka URL Web App di Tab Baru</span>
                </a>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowPadScriptModal(false)}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl cursor-pointer"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => {
                      setShowPadScriptModal(false);
                      refreshPadData();
                    }}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl cursor-pointer shadow-xs"
                  >
                    Sudah Dipasang, Tes Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: PENGATURAN ENDPOINT GOOGLE APPS SCRIPT RFK */}
      {/* ============================================================ */}
      {showRfkSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Atur URL Web App Google Apps Script RFK</h3>
                  <p className="text-xs text-stone-500">Hubungkan laporan Fisik & Keuangan dengan spreadsheet Anda</p>
                </div>
              </div>
              <button 
                onClick={() => setShowRfkSettingsModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">URL Web App (Exec / Deployment URL)</label>
                <input
                  type="text"
                  value={rfkInputUrl}
                  onChange={(e) => setRfkInputUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono text-xs"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Tempel URL Web App Google Apps Script dari spreadsheet RFK Anda.
                </p>
              </div>

              {/* Quick Action buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleCopyRfkUrl(rfkInputUrl)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium cursor-pointer transition-colors inline-flex items-center gap-1.5"
                >
                  {copyRfkSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ExternalLink className="w-3.5 h-3.5 text-stone-500" />}
                  <span>{copyRfkSuccess ? 'Tersalin!' : 'Salin URL'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRfkInputUrl('https://script.google.com/macros/s/AKfycbyK0TIXdT32_5lcfA3OYla3svW88UXik-Pen2CgIYFjrqIu8zFHH9Ww7DEXWtBLHVEOCA/exec');
                  }}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium cursor-pointer transition-colors"
                >
                  Reset ke URL Default
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRfkSettingsModal(false);
                    setShowRfkScriptModal(true);
                  }}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg font-medium cursor-pointer transition-colors inline-flex items-center gap-1"
                >
                  <Code className="w-3.5 h-3.5 text-amber-700" />
                  <span>Kode Script doGet</span>
                </button>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowRfkSettingsModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    updateRfkUrl(rfkInputUrl);
                    setShowRfkSettingsModal(false);
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

      {/* ============================================================ */}
      {/* MODAL: KODE GOOGLE APPS SCRIPT RFK (doGet) */}
      {/* ============================================================ */}
      {showRfkScriptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Code className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Kode Google Apps Script RFK (doGet)</h3>
                  <p className="text-xs text-stone-500">Pasang kode ini pada Code.gs di Spreadsheet Realisasi Fisik & Keuangan Anda</p>
                </div>
              </div>
              <button 
                onClick={() => setShowRfkScriptModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-xs flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Cara Pasang Mudah:</strong>
                  <ol className="list-decimal list-inside space-y-0.5 mt-1 text-stone-700">
                    <li>Buka Spreadsheet RFK &gt; klik <strong>Ekstensi</strong> &gt; <strong>Apps Script</strong>.</li>
                    <li>Hapus semua isi <code>Code.gs</code>, lalu tempel kode di bawah ini &gt; klik <strong>Simpan (💾)</strong>.</li>
                    <li>Klik <strong>Deploy</strong> &gt; <strong>Manage deployments</strong> &gt; Edit ✏️ &gt; Version: <strong>New version</strong> &gt; Who has access: <strong>Anyone</strong> &gt; <strong>Deploy</strong>.</li>
                  </ol>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between bg-stone-800 text-stone-300 px-4 py-2 rounded-t-xl text-[11px] font-mono">
                  <span>Code.gs (Google Apps Script RFK)</span>
                  <button
                    onClick={handleCopyRfkScript}
                    className="inline-flex items-center gap-1 text-white bg-amber-600 hover:bg-amber-700 px-2.5 py-1 rounded font-semibold cursor-pointer transition-colors"
                  >
                    {copyRfkScriptSuccess ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copyRfkScriptSuccess ? 'Berhasil Disalin!' : 'Salin Kode Script'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-stone-900 text-amber-300 font-mono text-[11px] rounded-b-xl overflow-x-auto max-h-64 border-t border-stone-700 leading-relaxed">
                  {RECOMMENDED_RFK_APPS_SCRIPT_CODE}
                </pre>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={rfkSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-800 hover:text-emerald-950 font-bold inline-flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka URL Web App di Tab Baru</span>
                </a>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowRfkScriptModal(false)}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl cursor-pointer"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => {
                      setShowRfkScriptModal(false);
                      refreshRfkData();
                    }}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl cursor-pointer shadow-xs"
                  >
                    Sudah Dipasang, Tes Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
