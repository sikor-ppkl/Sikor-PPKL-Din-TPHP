import React, { useState, useMemo } from 'react';
import { 
  Boxes, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  RefreshCw, 
  ExternalLink, 
  Settings, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Radio, 
  X, 
  Check, 
  Copy, 
  Code, 
  FileCode, 
  HelpCircle, 
  Eye, 
  FileSpreadsheet, 
  Building2, 
  Car, 
  Wrench, 
  Layers, 
  Coins, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  Table,
  LayoutGrid,
  Info,
  Calendar,
  Fuel,
  FileText
} from 'lucide-react';
import { AsetItem, KibCategory } from '../types';
import { useAsetData } from '../hooks/useAsetData';
import { RECOMMENDED_ASET_APPS_SCRIPT_CODE } from '../services/asetService';

interface AsetSectionViewProps {
  formatIDR: (num: number) => string;
}

export const AsetSectionView: React.FC<AsetSectionViewProps> = ({ formatIDR }) => {
  const {
    data: liveAsetList,
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
    defaultUrl,
    totalNilaiAset,
    countByKib,
    countByKondisi
  } = useAsetData();

  // Filters & State
  const [selectedKib, setSelectedKib] = useState<string>('Semua');
  const [selectedKondisi, setSelectedKondisi] = useState<string>('Semua');
  const [selectedPic, setSelectedPic] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedAsetDetail, setSelectedAsetDetail] = useState<AsetItem | null>(null);

  // Print Buku Inventaris KIB Modal
  const [showPrintKibModal, setShowPrintKibModal] = useState(false);

  // Settings & Guides Modals
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [inputUrl, setInputUrl] = useState(sourceUrl);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyScriptSuccess, setCopyScriptSuccess] = useState(false);

  // Unique penanggung jawab / pemegang
  const uniquePenanggungJawab = useMemo(() => {
    const set = new Set<string>();
    liveAsetList.forEach(a => {
      if (a.penanggungJawabAset) set.add(a.penanggungJawabAset);
    });
    return Array.from(set).sort();
  }, [liveAsetList]);

  // Filtered Assets
  const filteredAset = useMemo(() => {
    return liveAsetList.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = 
        !q ||
        item.namaBarang.toLowerCase().includes(q) ||
        item.kodeBarang.toLowerCase().includes(q) ||
        (item.spesifikasiMerk && item.spesifikasiMerk.toLowerCase().includes(q)) ||
        item.lokasiPenempatan.toLowerCase().includes(q) ||
        item.penanggungJawabAset.toLowerCase().includes(q) ||
        (item.nomorRegister && item.nomorRegister.toLowerCase().includes(q));

      const matchKib = selectedKib === 'Semua' || item.kib === selectedKib;
      const matchKondisi = selectedKondisi === 'Semua' || item.kondisi === selectedKondisi;
      const matchPic = selectedPic === 'Semua' || item.penanggungJawabAset === selectedPic;

      return matchSearch && matchKib && matchKondisi && matchPic;
    });
  }, [liveAsetList, searchQuery, selectedKib, selectedKondisi, selectedPic]);

  // Filtered Total Value & Total Volume
  const filteredTotalNilai = useMemo(() => {
    return filteredAset.reduce((acc, item) => acc + (item.nilaiPerolehan || 0), 0);
  }, [filteredAset]);

  const filteredTotalVolume = useMemo(() => {
    return filteredAset.reduce((acc, item) => acc + (item.jumlah || 0), 0);
  }, [filteredAset]);

  // Copy helper
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(RECOMMENDED_ASET_APPS_SCRIPT_CODE);
    setCopyScriptSuccess(true);
    setTimeout(() => setCopyScriptSuccess(false), 2500);
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'No',
      'KIB',
      'Kode Barang',
      'Nomor Register',
      'Nama Barang / Jenis Aset',
      'Spesifikasi / Merk / Type',
      'Ukuran / Luas',
      'Bahan',
      'Tahun Perolehan',
      'Jumlah',
      'Satuan',
      'Nilai Perolehan (Rp)',
      'Kondisi',
      'Asal Usul / Sumber',
      'Lokasi Penempatan',
      'Penanggung Jawab',
      'Keterangan'
    ];

    const rows = filteredAset.map((a, idx) => [
      idx + 1,
      `"${a.kib}"`,
      `"${a.kodeBarang}"`,
      `"${a.nomorRegister || '-'}"`,
      `"${a.namaBarang.replace(/"/g, '""')}"`,
      `"${(a.spesifikasiMerk || '-').replace(/"/g, '""')}"`,
      `"${a.ukuranLuas || '-'}"`,
      `"${a.bahan || '-'}"`,
      a.tahunPerolehan,
      a.jumlah,
      `"${a.satuan}"`,
      a.nilaiPerolehan,
      `"${a.kondisi}"`,
      `"${(a.asalUsul || '-').replace(/"/g, '""')}"`,
      `"${a.lokasiPenempatan.replace(/"/g, '""')}"`,
      `"${a.penanggungJawabAset.replace(/"/g, '""')}"`,
      `"${(a.keterangan || '-').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DAFTAR_KIB_ASET_BMD_DINAS_PERTANIAN_TTS_${selectedKib !== 'Semua' ? selectedKib.replace(/\s+/g, '_') : 'SEMUA'}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper for KIB Colors
  const getKibBadgeColor = (kib: KibCategory) => {
    switch (kib) {
      case 'KIB A':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'KIB B':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'KIB C':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'KIB D':
        return 'bg-cyan-100 text-cyan-900 border-cyan-300';
      case 'KIB E':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'KIB F':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-300';
    }
  };

  const getKibIcon = (kib: KibCategory) => {
    switch (kib) {
      case 'KIB A': return <MapPin className="w-4 h-4 text-amber-700" />;
      case 'KIB B': return <Car className="w-4 h-4 text-blue-700" />;
      case 'KIB C': return <Building2 className="w-4 h-4 text-emerald-700" />;
      case 'KIB D': return <Layers className="w-4 h-4 text-cyan-700" />;
      case 'KIB E': return <Sparkles className="w-4 h-4 text-purple-700" />;
      case 'KIB F': return <Wrench className="w-4 h-4 text-rose-700" />;
      default: return <Boxes className="w-4 h-4 text-stone-700" />;
    }
  };

  const kibInfoMeta: Record<KibCategory, { 
    name: string; 
    desc: string; 
    permendagri: string;
    details: string;
    bgGrad: string;
    borderColor: string;
  }> = {
    'KIB A': { 
      name: 'Tanah', 
      desc: 'Tanah Kantor, Rumah PPL & Kebun Dinas se-TTS',
      permendagri: 'Permendagri No. 19/2016 Bab VII Klasifikasi KIB A (Tanah)',
      details: 'Mencakup 45 bidang tanah resmi Pemkab TTS: Tanah Kantor Dinas Pertanian Kesetnana (16.065 m²), Kebun Dinas Oenali (41.645 m²), Kebun Oenunuh (14.640 m²), BBU Netpala (59.510 m²), Kebun Dinas Nenas Mutis (29.575 m²), Kebun Boking, serta tanah BPP & Rumah Dinas PPL di 32 kecamatan.',
      bgGrad: 'from-amber-50 to-orange-50/40',
      borderColor: 'border-amber-200'
    },
    'KIB B': { 
      name: 'Peralatan & Mesin', 
      desc: 'Alat Berat, Alsintan, Kendaraan & Peralatan Kantor',
      permendagri: 'Permendagri No. 19/2016 Bab VII Klasifikasi KIB B (Peralatan & Mesin)',
      details: 'Mencakup Wheel Excavator Komatsu PC210-10MO, Traktor Roda 4 Kubota M108S, Combine Harvester Besar Inari, Mobil Strada, Kijang, Truk, 80+ Sepeda Motor Mantri Tani/PPL, Traktor Roda 2 Quick, Power Thresher, GPS Garmin, Komputer PC All In One i7, dan Printer.',
      bgGrad: 'from-blue-50 to-sky-50/40',
      borderColor: 'border-blue-200'
    },
    'KIB C': { 
      name: 'Gedung & Bangunan', 
      desc: 'Kantor Dinas, Balai Penyuluhan (BPP), Lab & Gudang',
      permendagri: 'Permendagri No. 19/2016 Bab VII Klasifikasi KIB C (Gedung & Bangunan)',
      details: 'Mencakup 156 unit gedung & bangunan resmi: Gedung Kantor Dinas Induk Kesetnana (448 m²), Balai Penyuluhan Pertanian (BPP) di 32 Kecamatan, Balai Benih Utama Netpala, Lab Kultur Jaringan, Gudang Logistik Benih & Pupuk Oenali, dan Mess/Rumah Dinas PPL.',
      bgGrad: 'from-emerald-50 to-teal-50/40',
      borderColor: 'border-emerald-200'
    },
    'KIB D': { 
      name: 'Jalan, Irigasi & Jaringan', 
      desc: 'Jalan Usaha Tani, Jaringan Irigasi, Embung & Waduk',
      permendagri: 'Permendagri No. 19/2016 Bab VII Klasifikasi KIB D (Jalan, Irigasi & Jaringan)',
      details: 'Mencakup 64 paket infrastruktur pertanian: Jalan Usaha Tani (JUT) Oenunuh & Netpala, Embung/Cekdam Netpala, Waduk Air Tersebar TTS, Saluran Tersier Kebun Boentuka, Bangunan Pengambilan Irigasi Oetuke/Tetaf, dan Jaringan Pipa Air Bersih Kebun Bibit.',
      bgGrad: 'from-cyan-50 to-sky-50/40',
      borderColor: 'border-cyan-200'
    },
    'KIB E': { 
      name: 'Aset Tetap Lainnya', 
      desc: 'Tanaman Perkebunan, Bibit Buah & Dokumen Perencanaan',
      permendagri: 'Permendagri No. 19/2016 Bab VII Klasifikasi KIB E (Aset Tetap Lainnya)',
      details: 'Mencakup 17 paket aset tetap lainnya: Tanaman Perkebunan Kopi Arabika Mutis, Kakao, Vanili, Kebun Tanaman Induk, Pengadaan Bibit Mangga Bersertifikat, Dokumen Masterplan DED Pembangunan 4 Gedung BPP & Lab Kultur Jaringan, serta Buku Atlas Potensi Daerah.',
      bgGrad: 'from-purple-50 to-fuchsia-50/40',
      borderColor: 'border-purple-200'
    },
    'KIB F': { 
      name: 'Konstruksi Dalam Pengerjaan (KDP)', 
      desc: 'Fasilitas Fisik yang Sedang Dalam Pengerjaan',
      permendagri: 'Permendagri No. 19/2016 Bab VII Klasifikasi KIB F (Konstruksi Dalam Pengerjaan)',
      details: 'Mencakup paket konstruksi fisik sarana dan prasarana pertanian yang sedang dalam proses pelaksanaan fisik di lapangan.',
      bgGrad: 'from-rose-50 to-pink-50/40',
      borderColor: 'border-rose-200'
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
      
      {/* ============================================================ */}
      {/* HEADER TAB ASET BMD & KIB */}
      {/* ============================================================ */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-100">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">
            <Boxes className="w-4 h-4 text-emerald-600" />
            <span>Barang Milik Daerah (BMD) · Kartu Inventaris Barang (KIB)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            BUKU INVENTARIS ASET DAERAH BERDASARKAN KIB
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Dinas Tanaman Pangan, Hortikultura dan Perkebunan Kabupaten Timor Tengah Selatan · Permendagri No. 19/2016 & Permendagri No. 47/2021
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowPrintKibModal(true)}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Cetak Format Buku Inventaris Resmi"
          >
            <Printer className="w-3.5 h-3.5 text-stone-600" />
            <span>Format Cetak KIB</span>
          </button>

          <button
            onClick={() => {
              setInputUrl(sourceUrl);
              setShowSettingsModal(true);
            }}
            className="px-3 py-2 bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Pengaturan Endpoint Apps Script / Google Sheets"
          >
            <Settings className="w-3.5 h-3.5 text-stone-500" />
            <span>Sumber Data KIB</span>
          </button>

          <button
            onClick={() => setShowScriptModal(true)}
            className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Kode Google Apps Script doGet"
          >
            <Code className="w-3.5 h-3.5 text-amber-700" />
            <span>Kode doGet</span>
          </button>

          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-75"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Menyinkronkan...' : 'Sinkronkan Sekarang'}</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* BILAH STATUS DATABASE RESMI KIB A, B, C, D, E KAB. TTS */}
      {/* ============================================================ */}
      <div className="p-4 rounded-2xl border bg-emerald-50/90 border-emerald-300/80 transition-all shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>

            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-stone-900">
                  Basis Data Terverifikasi:
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-950 border border-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  Database Resmi KIB BMD Dinas Pertanian Kab. TTS ({liveAsetList.length} Entitas Aset)
                </span>
              </div>

              <div className="text-[11px] text-emerald-900 leading-tight">
                Data terintegrasi dari register KIB A (Tanah), KIB B (Peralatan & Mesin), KIB C (Gedung & Bangunan), KIB D (Jalan/Irigasi/Jaringan), dan KIB E (Aset Tetap Lainnya).
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            <span className="text-[11px] text-stone-500 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
              Total Nilai Aset: <strong className="text-emerald-950 font-mono">{formatIDR(totalNilaiAset)}</strong>
            </span>
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Muat Ulang Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 6 KARTU IKHTISAR KIB (A, B, C, D, E, F) DENGAN RINCIAN */}
      {/* ============================================================ */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            PILIH KLASIFIKASI KIB:
          </span>
          <span className="text-xs text-stone-400">
            Klik kartu untuk memfilter dan membaca rincian KIB
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {(['KIB A', 'KIB B', 'KIB C', 'KIB D', 'KIB E', 'KIB F'] as KibCategory[]).map(kib => {
            const count = countByKib[kib] || 0;
            const isSelected = selectedKib === kib;
            const meta = kibInfoMeta[kib];

            return (
              <button
                key={kib}
                onClick={() => setSelectedKib(isSelected ? 'Semua' : kib)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected 
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500' 
                    : 'bg-stone-50/80 hover:bg-stone-100 border-stone-200/90'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-black uppercase tracking-wider ${
                    isSelected ? 'text-emerald-200' : 'text-stone-500'
                  }`}>
                    {kib}
                  </span>
                  <div className={isSelected ? 'text-white' : ''}>
                    {getKibIcon(kib)}
                  </div>
                </div>

                <div className="mt-2.5">
                  <div className={`text-base sm:text-lg font-black leading-tight ${
                    isSelected ? 'text-white' : 'text-stone-900'
                  }`}>
                    {count} <span className="text-xs font-medium">Aset</span>
                  </div>
                  <div className={`text-[11px] font-bold mt-0.5 truncate ${
                    isSelected ? 'text-white' : 'text-stone-800'
                  }`}>
                    {meta.name}
                  </div>
                  <div className={`text-[10px] mt-0.5 truncate ${
                    isSelected ? 'text-emerald-200' : 'text-stone-500'
                  }`}>
                    {meta.desc}
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-0 right-0 w-2 h-full bg-emerald-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* BANNER PENJELASAN KIB TERPILIH (AGAR KIB MUDAH TERBACA) */}
      {/* ============================================================ */}
      {selectedKib !== 'Semua' && (
        <div className={`p-4 rounded-2xl border bg-gradient-to-r ${kibInfoMeta[selectedKib as KibCategory]?.bgGrad || 'from-stone-50 to-stone-100'} ${kibInfoMeta[selectedKib as KibCategory]?.borderColor || 'border-stone-200'} animate-in fade-in duration-150`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getKibBadgeColor(selectedKib as KibCategory)}`}>
                  {selectedKib}
                </span>
                <span className="text-xs font-bold text-stone-900">
                  {kibInfoMeta[selectedKib as KibCategory]?.name}
                </span>
                <span className="text-[11px] text-stone-500 hidden sm:inline">· {kibInfoMeta[selectedKib as KibCategory]?.permendagri}</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                {kibInfoMeta[selectedKib as KibCategory]?.details}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 self-start md:self-center">
              <div className="text-right">
                <div className="text-[10px] text-stone-500 uppercase font-semibold">Total Nilai {selectedKib}:</div>
                <div className="text-sm font-black font-mono text-emerald-950">
                  {formatIDR(filteredTotalNilai)}
                </div>
              </div>
              <button
                onClick={() => setSelectedKib('Semua')}
                className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 border border-stone-300 text-xs font-bold cursor-pointer"
                title="Tampilkan Semua KIB"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* FILTER TOOLBAR & VIEW TOGGLE */}
      {/* ============================================================ */}
      <div className="space-y-3 pt-1">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* KIB Filter Quick Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs font-bold text-stone-500 whitespace-nowrap mr-1">
              Tab KIB:
            </span>
            {['Semua', 'KIB A', 'KIB B', 'KIB C', 'KIB D', 'KIB E', 'KIB F'].map((kib) => (
              <button
                key={kib}
                onClick={() => setSelectedKib(kib)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedKib === kib
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {kib === 'Semua' ? 'Semua KIB' : `${kib} (${countByKib[kib as KibCategory] || 0})`}
              </button>
            ))}
          </div>

          {/* View mode toggle & exports */}
          <div className="flex items-center gap-2 self-start lg:self-center flex-shrink-0">
            <div className="bg-stone-100 p-1 rounded-xl flex items-center gap-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1 ${
                  viewMode === 'table' ? 'bg-white text-emerald-950 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Tampilan Tabel Rincian KIB"
              >
                <Table className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tabel KIB</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1 ${
                  viewMode === 'cards' ? 'bg-white text-emerald-950 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Tampilan Kartu Visual"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kartu</span>
              </button>
            </div>

            <button
              onClick={handleExportCsv}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Unduh format spreadsheet CSV"
            >
              <Download className="w-3.5 h-3.5 text-stone-600" />
              <span>Ekspor CSV</span>
            </button>

            <button
              onClick={() => setShowPrintKibModal(true)}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Cetak Buku Inventaris KIB Permendagri"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-700" />
              <span>Cetak KIB</span>
            </button>
          </div>
        </div>

        {/* Search & Multi-filter */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kode barang, nama aset, merk, nopol, kijang, strada, traktor, lokasi..."
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedKondisi}
              onChange={(e) => setSelectedKondisi(e.target.value)}
              aria-label="Filter kondisi barang"
              className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            >
              <option value="Semua">Semua Kondisi Fisik ({liveAsetList.length})</option>
              <option value="Baik">Kondisi Baik ({countByKondisi.baik})</option>
              <option value="Rusak Ringan">Rusak Ringan ({countByKondisi.rusakRingan})</option>
              <option value="Rusak Berat">Rusak Berat ({countByKondisi.rusakBerat})</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedPic}
              onChange={(e) => setSelectedPic(e.target.value)}
              aria-label="Filter penanggung jawab / pemegang aset"
              className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white truncate"
            >
              <option value="Semua">Semua Pemegang / PIC ({uniquePenanggungJawab.length})</option>
              {uniquePenanggungJawab.map(pic => (
                <option key={pic} value={pic}>{pic}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Filter Count & Total Value */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs text-stone-600 border-t border-stone-100">
        <div className="flex items-center gap-2">
          <span>
            Menampilkan <strong>{filteredAset.length}</strong> kelompok aset (Total Fisik: <strong>{filteredTotalVolume.toLocaleString('id-ID')} unit/satuan</strong>)
          </span>
          {selectedKib !== 'Semua' && (
            <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Filter: {selectedKib}
            </span>
          )}
        </div>
        <div className="font-mono text-emerald-950 font-bold">
          Total Nilai Tercatat: <strong className="text-sm font-black">{formatIDR(filteredTotalNilai)}</strong>
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAMPILAN 1: TABEL KIB RESMI (KOLOM DISESUAIKAN BERDASARKAN KIB) */}
      {/* ============================================================ */}
      {viewMode === 'table' && (
        <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-800 border-b border-stone-200 font-bold">
                  <th className="p-3 text-center w-12 border-r border-stone-200">No</th>
                  <th className="p-3 border-r border-stone-200 whitespace-nowrap">KIB</th>
                  <th className="p-3 border-r border-stone-200 font-mono whitespace-nowrap">Kode Barang & Reg</th>
                  <th className="p-3 border-r border-stone-200 min-w-[220px]">Nama Barang / Uraian Aset</th>
                  
                  {/* Kolom adaptif berdasarkan jenis KIB */}
                  {selectedKib === 'KIB A' ? (
                    <>
                      <th className="p-3 border-r border-stone-200">Luas Tanah</th>
                      <th className="p-3 border-r border-stone-200">Status Hak / Sertifikat</th>
                    </>
                  ) : selectedKib === 'KIB B' ? (
                    <>
                      <th className="p-3 border-r border-stone-200">Merk / Type / Nopol</th>
                      <th className="p-3 border-r border-stone-200">Kapasitas / BBM</th>
                    </>
                  ) : selectedKib === 'KIB C' ? (
                    <>
                      <th className="p-3 border-r border-stone-200">Luas Lantai</th>
                      <th className="p-3 border-r border-stone-200">Konstruksi Bahan</th>
                    </>
                  ) : selectedKib === 'KIB D' ? (
                    <>
                      <th className="p-3 border-r border-stone-200">Panjang / Kapasitas</th>
                      <th className="p-3 border-r border-stone-200">Konstruksi Jaringan</th>
                    </>
                  ) : (
                    <>
                      <th className="p-3 border-r border-stone-200">Spesifikasi / Merk</th>
                      <th className="p-3 border-r border-stone-200">Ukuran / Luas</th>
                    </>
                  )}

                  <th className="p-3 border-r border-stone-200 text-center">Tahun</th>
                  <th className="p-3 border-r border-stone-200 text-center whitespace-nowrap">Volume</th>
                  <th className="p-3 border-r border-stone-200 text-right font-mono whitespace-nowrap">Nilai Perolehan (Rp)</th>
                  <th className="p-3 border-r border-stone-200 text-center">Kondisi</th>
                  <th className="p-3 border-r border-stone-200 min-w-[160px]">Lokasi & Pemegang (PIC)</th>
                  <th className="p-3 text-center w-16">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-[11px]">
                {filteredAset.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="p-8 text-center text-stone-500">
                      {isLoading ? (
                        <div className="flex flex-col items-center justify-center gap-2 py-4">
                          <RefreshCw className="w-6 h-6 text-emerald-600 animate-spin" />
                          <span className="font-semibold text-stone-700">Membaca data aset langsung dari Google Apps Script...</span>
                          <span className="text-xs text-stone-400 font-mono truncate max-w-md">{sourceUrl}</span>
                        </div>
                      ) : (
                        'Tidak ada aset yang sesuai kriteria pencarian atau filter KIB.'
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredAset.map((item, idx) => (
                    <tr 
                      key={item.id} 
                      className="hover:bg-stone-50/90 transition-colors cursor-pointer"
                      onClick={() => setSelectedAsetDetail(item)}
                    >
                      <td className="p-3 text-center font-mono text-stone-500 border-r border-stone-200">
                        {idx + 1}
                      </td>
                      <td className="p-3 border-r border-stone-200 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full font-bold border text-[10px] ${getKibBadgeColor(item.kib)}`}>
                          {item.kib}
                        </span>
                      </td>
                      <td className="p-3 font-mono border-r border-stone-200 whitespace-nowrap">
                        <div className="font-bold text-stone-800">{item.kodeBarang}</div>
                        <div className="text-[10px] text-stone-400">Reg: {item.nomorRegister || '-'}</div>
                      </td>
                      <td className="p-3 border-r border-stone-200 font-sans">
                        <div className="font-bold text-stone-900">{item.namaBarang}</div>
                        <div className="text-[10px] text-stone-500">{item.kategori}</div>
                        {item.keterangan && (
                          <div className="text-[10px] text-emerald-800 italic mt-0.5">
                            {item.keterangan}
                          </div>
                        )}
                      </td>

                      {/* Kolom adaptif isi */}
                      {selectedKib === 'KIB A' ? (
                        <>
                          <td className="p-3 border-r border-stone-200 font-bold text-amber-900 whitespace-nowrap">
                            {item.ukuranLuas || '-'}
                          </td>
                          <td className="p-3 border-r border-stone-200 text-stone-700">
                            {item.spesifikasiMerk || '-'}
                          </td>
                        </>
                      ) : selectedKib === 'KIB B' ? (
                        <>
                          <td className="p-3 border-r border-stone-200 text-stone-800 font-medium">
                            {item.spesifikasiMerk || '-'}
                          </td>
                          <td className="p-3 border-r border-stone-200 text-stone-600 whitespace-nowrap">
                            {item.ukuranLuas || '-'}
                          </td>
                        </>
                      ) : selectedKib === 'KIB C' ? (
                        <>
                          <td className="p-3 border-r border-stone-200 font-bold text-emerald-900 whitespace-nowrap">
                            {item.ukuranLuas || '-'}
                          </td>
                          <td className="p-3 border-r border-stone-200 text-stone-700">
                            {item.bahan || item.spesifikasiMerk || '-'}
                          </td>
                        </>
                      ) : selectedKib === 'KIB D' ? (
                        <>
                          <td className="p-3 border-r border-stone-200 font-bold text-cyan-900 whitespace-nowrap">
                            {item.ukuranLuas || '-'}
                          </td>
                          <td className="p-3 border-r border-stone-200 text-stone-700">
                            {item.bahan || '-'}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-3 border-r border-stone-200 text-stone-600">
                            {item.spesifikasiMerk || '-'}
                          </td>
                          <td className="p-3 border-r border-stone-200 text-stone-600">
                            {item.ukuranLuas || '-'}
                          </td>
                        </>
                      )}

                      <td className="p-3 border-r border-stone-200 text-center font-mono font-medium">
                        {item.tahunPerolehan}
                      </td>
                      <td className="p-3 border-r border-stone-200 text-center font-bold text-stone-800 whitespace-nowrap">
                        {item.jumlah} {item.satuan}
                      </td>
                      <td className="p-3 border-r border-stone-200 text-right font-mono font-bold text-emerald-950 whitespace-nowrap">
                        {formatIDR(item.nilaiPerolehan)}
                      </td>
                      <td className="p-3 border-r border-stone-200 text-center whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                          item.kondisi === 'Baik'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : item.kondisi === 'Rusak Ringan'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-rose-100 text-rose-800 border-rose-300'
                        }`}>
                          {item.kondisi}
                        </span>
                      </td>
                      <td className="p-3 border-r border-stone-200 max-w-[180px]">
                        <div className="truncate font-medium text-stone-800" title={item.lokasiPenempatan}>
                          {item.lokasiPenempatan}
                        </div>
                        <div className="text-[10px] text-stone-500 truncate" title={item.penanggungJawabAset}>
                          {item.penanggungJawabAset}
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAsetDetail(item);
                          }}
                          className="px-2 py-1 bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-900 rounded font-bold text-[10px] transition-colors cursor-pointer"
                        >
                          Rincian
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAMPILAN 2: KARTU INVENTARIS KIB VISUAL */}
      {/* ============================================================ */}
      {viewMode === 'cards' && (
        filteredAset.length === 0 ? (
          <div className="p-8 text-center text-stone-500 bg-stone-50 rounded-2xl border border-stone-200">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-2 py-4">
                <RefreshCw className="w-6 h-6 text-emerald-600 animate-spin" />
                <span className="font-semibold text-stone-700">Membaca data aset langsung dari Google Apps Script...</span>
                <span className="text-xs text-stone-400 font-mono truncate max-w-md">{sourceUrl}</span>
              </div>
            ) : (
              'Tidak ada aset yang sesuai kriteria pencarian atau filter KIB.'
            )}
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAset.map((aset) => (
            <div 
              key={aset.id} 
              onClick={() => setSelectedAsetDetail(aset)}
              className="p-5 rounded-2xl border border-stone-200 hover:border-emerald-300 transition-all bg-stone-50/30 hover:bg-white shadow-2xs space-y-3 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getKibBadgeColor(aset.kib)}`}>
                    {aset.kib}
                  </span>
                  <span className="font-mono text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    {aset.kodeBarang}
                  </span>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                  aset.kondisi === 'Baik' 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                    : aset.kondisi === 'Rusak Ringan'
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-rose-100 text-rose-800 border-rose-300'
                }`}>
                  {aset.kondisi}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base group-hover:text-emerald-950 transition-colors">
                  {aset.namaBarang}
                </h4>
                <div className="text-xs text-stone-500 mt-0.5">
                  Kategori: <span className="font-medium text-emerald-800">{aset.kategori}</span>
                </div>
                {aset.spesifikasiMerk && (
                  <div className="text-[11px] text-stone-600 mt-1 font-medium bg-stone-100/70 p-1.5 rounded-lg border border-stone-200/60">
                    Spesifikasi: {aset.spesifikasiMerk}
                  </div>
                )}
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-500">Jumlah & Satuan:</span>
                  <span className="font-bold text-stone-900">{aset.jumlah} {aset.satuan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Nilai Perolehan:</span>
                  <span className="font-mono font-bold text-emerald-900">{formatIDR(aset.nilaiPerolehan)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Tahun Perolehan:</span>
                  <span className="font-medium text-stone-700">{aset.tahunPerolehan}</span>
                </div>
                {aset.ukuranLuas && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Ukuran / Luas:</span>
                    <span className="font-medium text-stone-800">{aset.ukuranLuas}</span>
                  </div>
                )}
              </div>

              <div className="text-[11px] text-stone-500 pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="flex items-center gap-1 truncate max-w-[160px]" title={aset.lokasiPenempatan}>
                  <MapPin className="w-3 h-3 text-stone-400 flex-shrink-0" />
                  <span className="truncate">{aset.lokasiPenempatan}</span>
                </span>
                <span className="font-medium text-stone-600 truncate max-w-[140px]" title={aset.penanggungJawabAset}>
                  {aset.penanggungJawabAset}
                </span>
              </div>
            </div>
          ))}
        </div>
        )
      )}

      {/* ============================================================ */}
      {/* MODAL: DETAIL KARTU INVENTARIS BARANG (KIB) LENGKAP */}
      {/* ============================================================ */}
      {selectedAsetDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="bg-stone-900 text-white p-6 relative">
              <button 
                onClick={() => setSelectedAsetDetail(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs border ${getKibBadgeColor(selectedAsetDetail.kib)}`}>
                  {selectedAsetDetail.kib}
                </span>
                <span className="font-mono text-xs text-stone-300">
                  {selectedAsetDetail.kodeBarang}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                {selectedAsetDetail.namaBarang}
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                Kategori: {selectedAsetDetail.kategori}
              </p>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                <div>
                  <span className="text-stone-500 font-medium">Nilai Perolehan:</span>
                  <div className="font-extrabold font-mono text-emerald-900 text-sm mt-0.5">
                    {formatIDR(selectedAsetDetail.nilaiPerolehan)}
                  </div>
                </div>
                <div>
                  <span className="text-stone-500 font-medium">Kondisi Fisik:</span>
                  <div className="mt-0.5">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      selectedAsetDetail.kondisi === 'Baik'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : selectedAsetDetail.kondisi === 'Rusak Ringan'
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-rose-100 text-rose-800 border-rose-300'
                    }`}>
                      {selectedAsetDetail.kondisi}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-stone-500">Nomor Register:</span>
                    <div className="font-bold text-stone-800 mt-0.5">{selectedAsetDetail.nomorRegister || '-'}</div>
                  </div>
                  <div>
                    <span className="text-stone-500">Tahun Perolehan:</span>
                    <div className="font-bold text-stone-800 mt-0.5">{selectedAsetDetail.tahunPerolehan}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-stone-500">Jumlah & Satuan:</span>
                    <div className="font-bold text-stone-800 mt-0.5">{selectedAsetDetail.jumlah} {selectedAsetDetail.satuan}</div>
                  </div>
                  <div>
                    <span className="text-stone-500">Ukuran / Luas / CC:</span>
                    <div className="font-bold text-stone-800 mt-0.5">{selectedAsetDetail.ukuranLuas || '-'}</div>
                  </div>
                </div>

                {selectedAsetDetail.spesifikasiMerk && (
                  <div>
                    <span className="text-stone-500">Spesifikasi / Merk / Type:</span>
                    <div className="font-semibold text-stone-900 mt-0.5 p-2 bg-stone-50 rounded-lg border border-stone-200">
                      {selectedAsetDetail.spesifikasiMerk}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-stone-500">Asal Usul / Sumber:</span>
                    <div className="font-semibold text-stone-800 mt-0.5">{selectedAsetDetail.asalUsul || 'APBD Kab. TTS'}</div>
                  </div>
                  <div>
                    <span className="text-stone-500">Penanggung Jawab (Pemegang):</span>
                    <div className="font-semibold text-stone-800 mt-0.5">{selectedAsetDetail.penanggungJawabAset}</div>
                  </div>
                </div>

                <div>
                  <span className="text-stone-500">Lokasi Penempatan:</span>
                  <div className="font-semibold text-stone-800 mt-0.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                    <span>{selectedAsetDetail.lokasiPenempatan}</span>
                  </div>
                </div>

                {selectedAsetDetail.keterangan && (
                  <div>
                    <span className="text-stone-500">Keterangan / Catatan Operasional:</span>
                    <div className="text-stone-700 mt-0.5 italic p-2 bg-emerald-50/50 rounded-lg border border-emerald-100">
                      "{selectedAsetDetail.keterangan}"
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold cursor-pointer inline-flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Lembar KIB</span>
                </button>
                <button
                  onClick={() => setSelectedAsetDetail(null)}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: CETAK BUKU INVENTARIS RESMI KIB (PERMENDAGRI) */}
      {/* ============================================================ */}
      {showPrintKibModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-4xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
            <div className="bg-stone-900 text-white p-6 relative flex-shrink-0">
              <button 
                onClick={() => setShowPrintKibModal(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px] mb-2 border border-emerald-500/30">
                Format Resmi Buku Inventaris BMD (Permendagri)
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">
                Pratinjau Lembar Cetak KIB {selectedKib !== 'Semua' ? selectedKib : '(Semua Klasifikasi)'}
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                Dinas Tanaman Pangan, Hortikultura dan Perkebunan Kabupaten Timor Tengah Selatan
              </p>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4 text-stone-800">
              {/* Kop Resmi Cetak */}
              <div className="text-center pb-4 border-b-2 border-stone-800 space-y-1">
                <div className="text-xs uppercase font-semibold tracking-wider text-stone-600">Pemerintah Kabupaten Timor Tengah Selatan</div>
                <div className="text-base sm:text-lg font-black tracking-tight text-stone-950 uppercase">
                  DINAS TANAMAN PANGAN, HORTIKULTURA DAN PERKEBUNAN
                </div>
                <div className="text-xs text-stone-600">
                  Jl. Basuki Rahmat No. 1, Kota Soe, Kabupaten Timor Tengah Selatan, Nusa Tenggara Timur
                </div>
                <div className="text-xs font-bold text-stone-900 pt-1 uppercase tracking-wide">
                  BUKU INVENTARISASI BARANG MILIK DAERAH ({selectedKib !== 'Semua' ? selectedKib : 'KIB A, B, C, D, E, F'}) TAHUN 2026
                </div>
              </div>

              {/* Table Pratinjau Cetak */}
              <div className="border border-stone-300 rounded-lg overflow-hidden text-[10px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-100 text-stone-900 font-bold border-b border-stone-300">
                      <th className="p-2 text-center border-r border-stone-300 w-8">No</th>
                      <th className="p-2 border-r border-stone-300 w-16">KIB</th>
                      <th className="p-2 border-r border-stone-300 font-mono w-28">Kode Barang</th>
                      <th className="p-2 border-r border-stone-300">Nama Barang / Spesifikasi</th>
                      <th className="p-2 border-r border-stone-300 text-center w-12">Tahun</th>
                      <th className="p-2 border-r border-stone-300 text-center w-16">Volume</th>
                      <th className="p-2 border-r border-stone-300 text-right font-mono w-28">Nilai (Rp)</th>
                      <th className="p-2 border-r border-stone-300 text-center w-16">Kondisi</th>
                      <th className="p-2">Penanggung Jawab / Lokasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {filteredAset.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-stone-50">
                        <td className="p-2 text-center border-r border-stone-300">{idx + 1}</td>
                        <td className="p-2 font-bold border-r border-stone-300">{item.kib}</td>
                        <td className="p-2 font-mono border-r border-stone-300">{item.kodeBarang}</td>
                        <td className="p-2 border-r border-stone-300">
                          <div className="font-bold">{item.namaBarang}</div>
                          {item.spesifikasiMerk && <div className="text-stone-500">{item.spesifikasiMerk}</div>}
                        </td>
                        <td className="p-2 text-center border-r border-stone-300">{item.tahunPerolehan}</td>
                        <td className="p-2 text-center font-bold border-r border-stone-300">{item.jumlah} {item.satuan}</td>
                        <td className="p-2 text-right font-mono font-bold border-r border-stone-300">{formatIDR(item.nilaiPerolehan)}</td>
                        <td className="p-2 text-center border-r border-stone-300">{item.kondisi}</td>
                        <td className="p-2">
                          <div>{item.penanggungJawabAset}</div>
                          <div className="text-stone-500">{item.lokasiPenempatan}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-stone-100 font-bold border-t-2 border-stone-400">
                      <td colSpan={6} className="p-2 text-right border-r border-stone-300 uppercase">
                        Total Nilai Inventaris ({filteredAset.length} Aset):
                      </td>
                      <td className="p-2 text-right font-mono text-emerald-950 font-black border-r border-stone-300">
                        {formatIDR(filteredTotalNilai)}
                      </td>
                      <td colSpan={2} className="p-2 text-center">
                        Terverifikasi SIKOR PPKL
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Tanda Tangan Pengurus & Kepala Dinas */}
              <div className="pt-6 grid grid-cols-2 text-center text-xs text-stone-800">
                <div className="space-y-12">
                  <div>
                    <div>Mengetahui,</div>
                    <div className="font-bold">Kepala Dinas Tanaman Pangan, Hortikultura dan Perkebunan Kab. TTS</div>
                  </div>
                  <div>
                    <div className="font-bold underline">MARTHINUS P. DAVID, SE, M.SI</div>
                    <div className="text-[11px] text-stone-600">Pembina Utama Muda · NIP. 197103262000031005</div>
                  </div>
                </div>

                <div className="space-y-12">
                  <div>
                    <div>Soe, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    <div className="font-bold">Pengurus / Pengelola Barang Milik Daerah (BMD)</div>
                  </div>
                  <div>
                    <div className="font-bold underline">JAKOB E.P. BENU, ST., MT</div>
                    <div className="text-[11px] text-stone-600">Kasubag Umum & BMD · NIP. 197002141999031009</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-end gap-2 flex-shrink-0">
              <button
                onClick={() => setShowPrintKibModal(false)}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold rounded-xl cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Lembar Ini</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: PENGATURAN SUMBER DATA ASET URL */}
      {/* ============================================================ */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="bg-stone-900 text-white p-6 relative">
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px] mb-2 border border-emerald-500/30">
                Pengaturan Sinkronisasi Aset
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">
                Sumber Data Aset KIB
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                Masukkan URL Google Apps Script Web App atau tautan Google Sheets publik Anda.
              </p>
            </div>

            <div className="p-6 space-y-4 text-xs text-stone-700">
              <div className="space-y-1.5">
                <label className="font-bold text-stone-900 block">
                  URL Endpoint Google Apps Script / Google Sheets
                </label>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
                <p className="text-[11px] text-stone-500">
                  Dapat berupa endpoint Google Apps Script Web App atau tautan Google Sheets (<code>https://docs.google.com/spreadsheets/d/...</code>).
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleCopyUrl(inputUrl)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium cursor-pointer transition-colors inline-flex items-center gap-1.5"
                >
                  {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                  <span>{copySuccess ? 'Tersalin!' : 'Salin URL'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInputUrl(defaultUrl);
                    resetUrl();
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
                  <span>Kode doGet KIB</span>
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
                    updateUrl(inputUrl);
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
      {/* MODAL: KODE GOOGLE APPS SCRIPT KIB SIAP PAKAI */}
      {/* ============================================================ */}
      {showScriptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
            <div className="bg-amber-950 text-white p-6 relative flex-shrink-0">
              <button 
                onClick={() => setShowScriptModal(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-bold text-[11px] mb-2">
                Skrip Google Apps Script Siap Salin
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">
                Kode Fungsi doGet(e) untuk KIB Aset
              </h3>
              <p className="text-xs text-amber-200 mt-1">
                Tempelkan kode ini di Google Apps Script spreadsheet Anda untuk otomatis membaca seluruh kolom KIB A sampai KIB F.
              </p>
            </div>

            <div className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-700">File: Code.gs</span>
                <button
                  onClick={handleCopyScript}
                  className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold text-xs cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                >
                  {copyScriptSuccess ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copyScriptSuccess ? 'Berhasil Disalin!' : 'Salin Semua Kode'}</span>
                </button>
              </div>

              <pre className="p-4 bg-stone-900 text-emerald-300 rounded-2xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-stone-800">
                {RECOMMENDED_ASET_APPS_SCRIPT_CODE}
              </pre>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-600 space-y-1">
                <span className="font-bold text-stone-900 block">Langkah singkat setelah menempel kode:</span>
                <div>1. Klik ikon <strong>Simpan (💾)</strong> di editor skrip.</div>
                <div>2. Klik <strong>Deploy</strong> &gt; <strong>Manage deployments</strong> &gt; ikon pensil ✏️.</div>
                <div>3. Pilih <strong>New version</strong>, pastikan <strong>Who has access: Anyone</strong>.</div>
                <div>4. Klik <strong>Deploy</strong>, lalu kembali ke aplikasi dan klik <strong>Sinkronkan Sekarang</strong>.</div>
              </div>
            </div>

            <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-end gap-2 flex-shrink-0">
              <button
                onClick={() => setShowScriptModal(false)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: PANDUAN PENYETELAN DEPLOYMENT */}
      {/* ============================================================ */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="bg-emerald-900 text-white p-6 relative">
              <button 
                onClick={() => setShowGuideModal(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-xl font-extrabold tracking-tight">
                Panduan Menghubungkan Google Sheet KIB
              </h3>
              <p className="text-xs text-emerald-200 mt-1">
                Langkah memasang fungsi doGet pada deployment Web App Google Apps Script.
              </p>
            </div>

            <div className="p-6 space-y-3 text-xs text-stone-700">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block mb-0.5">1. Buka Apps Script</span>
                Buka Google Spreadsheet data KIB Aset Anda, klik menu <strong>Ekstensi</strong> &gt; <strong>Apps Script</strong>.
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block mb-0.5">2. Masukkan Fungsi doGet</span>
                Salin kode dari tombol "Kode doGet KIB", ganti isi <code>Code.gs</code> lalu simpan.
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block mb-0.5">3. Deploy Versi Baru (New Version)</span>
                Klik <strong>Deploy</strong> &gt; <strong>Manage deployments</strong> &gt; pilih <strong>New version</strong> &gt; <strong>Who has access: Anyone</strong> &gt; klik <strong>Deploy</strong>.
              </div>

              <div className="pt-2 flex items-center justify-end">
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

    </div>
  );
};
