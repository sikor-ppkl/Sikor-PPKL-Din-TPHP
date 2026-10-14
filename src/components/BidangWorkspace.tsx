import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Wheat, 
  Apple, 
  Coffee, 
  Wrench, 
  FolderKanban, 
  Calendar, 
  FileText, 
  BarChart3, 
  Boxes, 
  CheckCircle2, 
  MapPin, 
  Users, 
  FileCheck, 
  FileSpreadsheet, 
  TrendingUp, 
  Settings, 
  Receipt, 
  Search, 
  Download, 
  Printer, 
  Filter, 
  ArrowLeft, 
  User, 
  Info, 
  ChevronRight, 
  ExternalLink,
  Layers,
  Sparkles,
  X,
  Plus
} from 'lucide-react';
import { BidangItem, SikorProgram } from '../types';
import { SIKOR_PROGRAMS } from '../data/mockData';
import { 
  BIDANG_SUB_MENUS_MAP,
  DATA_PSP_REALISASI_PUPUK,
  DATA_PSP_POTENSI_LAHAN,
  DATA_PSP_KELOMPOK_TANI,
  DATA_PSP_ALSINTAN,
  DATA_PSP_PERMOHONAN_BANTUAN,
  DATA_TP_SP_TANAMAN_PANGAN,
  DATA_TP_HARGA_PASAR,
  DATA_TP_ALSINTAN_PASCA_PANEN,
  DATA_TP_DOKUMEN_LAHAN,
  DATA_HORTI_HARGA_PASAR,
  DATA_HORTI_STATISTIK_SPH,
  DATA_HORTI_PERMOHONAN_BANTUAN,
  DATA_BUN_ATAP_PERKEBUNAN,
  DATA_BUN_ALSINTAN,
  DATA_BUN_PERMOHONAN_BANTUAN,
  formatIDRCurrency
} from '../data/bidangSubMenuData';

interface BidangWorkspaceProps {
  bidang: BidangItem;
  initialSubMenuId?: string;
  onBack: () => void;
  formatIDR: (val: number) => string;
}

export const BidangWorkspace: React.FC<BidangWorkspaceProps> = ({
  bidang,
  initialSubMenuId,
  onBack,
  formatIDR
}) => {
  const subMenus = BIDANG_SUB_MENUS_MAP[bidang.id] || [];
  
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (initialSubMenuId && subMenus.some(m => m.id === initialSubMenuId)) {
      return initialSubMenuId;
    }
    return subMenus[0]?.id || 'program-kegiatan';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [selectedDetailItem, setSelectedDetailItem] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Icon Resolver
  const getSubMenuIcon = (iconName: string, className = "w-4 h-4") => {
    switch (iconName) {
      case 'FolderKanban': return <FolderKanban className={className} />;
      case 'Calendar': return <Calendar className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'BarChart3': return <BarChart3 className={className} />;
      case 'Boxes': return <Boxes className={className} />;
      case 'CheckCircle2': return <CheckCircle2 className={className} />;
      case 'MapPin': return <MapPin className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Wrench': return <Wrench className={className} />;
      case 'FileCheck': return <FileCheck className={className} />;
      case 'FileSpreadsheet': return <FileSpreadsheet className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'Settings': return <Settings className={className} />;
      case 'Receipt': return <Receipt className={className} />;
      default: return <FolderKanban className={className} />;
    }
  };

  const getBidangHeaderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wheat': return <Wheat className="w-6 h-6" />;
      case 'Apple': return <Apple className="w-6 h-6" />;
      case 'Coffee': return <Coffee className="w-6 h-6" />;
      case 'Wrench': return <Wrench className="w-6 h-6" />;
      default: return <Building2 className="w-6 h-6" />;
    }
  };

  // Filter SIKOR programs matching current bidang
  const bidangPrograms = useMemo(() => {
    const bidangKey = bidang.id === 'psp' ? 'PSP' 
      : bidang.id === 'tanaman-pangan' ? 'Tanaman Pangan'
      : bidang.id === 'hortikultura' ? 'Hortikultura'
      : bidang.id === 'perkebunan' ? 'Perkebunan' : '';
    return SIKOR_PROGRAMS.filter(p => p.bidang === bidangKey);
  }, [bidang.id]);

  // Color theme helpers
  const getBadgeClass = (status: string) => {
    const s = String(status || '').toLowerCase();
    if (s.includes('lancar') || s.includes('terverifikasi') || s.includes('disetujui') || s.includes('optimal') || s.includes('baik') || s.includes('stabil') || s.includes('selesai')) {
      return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
    if (s.includes('sedang') || s.includes('verifikasi lapangan') || s.includes('naik') || s.includes('madya')) {
      return 'bg-blue-100 text-blue-800 border-blue-300';
    }
    if (s.includes('menunggu') || s.includes('perlu') || s.includes('pemula') || s.includes('potensial')) {
      return 'bg-amber-100 text-amber-800 border-amber-300';
    }
    return 'bg-stone-100 text-stone-800 border-stone-300';
  };

  // Export CSV Handler
  const handleExportCsv = (title: string, headers: string[], rows: (string | number)[][]) => {
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.map(x => `"${String(x).replace(/"/g, '""')}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* ============================================================ */}
      {/* HEADER BIDANG WORKSPACE */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-stone-100">
          <div className="flex items-start gap-4">
            <button
              onClick={onBack}
              className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer mt-1 flex-shrink-0"
              title="Kembali ke Daftar Bidang"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Unit Kerja Teknis · Kode: {bidang.code}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {bidang.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-3xl leading-relaxed">
                {bidang.summary}
              </p>
            </div>
          </div>

          {/* Kepala Bidang Badge & Action */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center bg-stone-50 p-3 rounded-2xl border border-stone-200/80">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-stone-400 uppercase">Kepala Bidang</div>
              <div className="text-xs font-bold text-stone-900">{bidang.kepalaBidang}</div>
              <div className="text-[10px] text-stone-500 font-mono">NIP. {bidang.nip}</div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SUB MENU TAB NAVIGATION BAR (SESUAI PERMINTAAN USER) */}
        {/* ============================================================ */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>Daftar Sub Menu {bidang.shortName} ({subMenus.length} Modul):</span>
            </span>
            <span className="text-xs text-stone-400 hidden sm:inline">
              Pilih sub menu untuk membuka data operasional
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {subMenus.map((menu, idx) => {
              const isActive = activeTab === menu.id;
              return (
                <button
                  key={menu.id}
                  onClick={() => {
                    setActiveTab(menu.id);
                    setSearchQuery('');
                  }}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 border flex-shrink-0 ${
                    isActive 
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm' 
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                  title={menu.description}
                >
                  <span className={isActive ? 'text-amber-300' : 'text-stone-500'}>
                    {getSubMenuIcon(menu.icon)}
                  </span>
                  <span>{idx + 1}. {menu.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* WORKSPACE CONTENT AREA BERDASARKAN SUB MENU AKTIF */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Sub Menu Info Header */}
        {(() => {
          const currentMenu = subMenus.find(m => m.id === activeTab);
          return (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center flex-shrink-0">
                  {currentMenu ? getSubMenuIcon(currentMenu.icon, "w-5 h-5") : <FolderKanban className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                    Sub Menu: {currentMenu?.title || 'Data Kegiatan'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {currentMenu?.description || 'Pengelolaan data dan pelaporan berkala'} · Dinas Pertanian Kab. TTS
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Usulan</span>
                </button>
              </div>
            </div>
          );
        })()}

        {/* ============================================================ */}
        {/* RENDER KONTEN SPESIFIK BERDASARKAN SUB MENU */}
        {/* ============================================================ */}

        {/* 1. PROGRAM KEGIATAN & REALISASI PROGRAM */}
        {(activeTab === 'program-kegiatan' || activeTab === 'realisasi-program') && (
          <div className="space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="text-xs font-bold text-stone-500 uppercase">Total Pagu Program</div>
                <div className="text-xl font-black font-mono text-emerald-950 mt-1">
                  {formatIDR(bidangPrograms.reduce((acc, p) => acc + p.paguAnggaran, 0))}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">{bidangPrograms.length} Paket Kegiatan DPA 2026</div>
              </div>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="text-xs font-bold text-stone-500 uppercase">Realisasi Keuangan</div>
                <div className="text-xl font-black font-mono text-emerald-900 mt-1">
                  {formatIDR(bidangPrograms.reduce((acc, p) => acc + p.realisasiKeuangan, 0))}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  Serapan: {((bidangPrograms.reduce((acc, p) => acc + p.realisasiKeuangan, 0) / (bidangPrograms.reduce((acc, p) => acc + p.paguAnggaran, 0) || 1)) * 100).toFixed(1)}%
                </div>
              </div>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="text-xs font-bold text-stone-500 uppercase">Rata-rata Fisik</div>
                <div className="text-xl font-black font-mono text-blue-900 mt-1">
                  {(bidangPrograms.reduce((acc, p) => acc + p.realisasiFisik, 0) / (bidangPrograms.length || 1)).toFixed(1)}%
                </div>
                <div className="text-[11px] text-blue-700 font-semibold mt-0.5">Status: Berjalan Sesuai Target</div>
              </div>
            </div>

            {/* Table */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-800 border-b border-stone-200 font-bold">
                    <tr>
                      <th className="p-3 text-center w-12">No</th>
                      <th className="p-3">Kode & Nama Program</th>
                      <th className="p-3">Nama Kegiatan / Pekerjaan</th>
                      <th className="p-3 font-mono text-right">Pagu (Rp)</th>
                      <th className="p-3 font-mono text-right">Realisasi (Rp)</th>
                      <th className="p-3 text-center">Fisik (%)</th>
                      <th className="p-3">Kecamatan Fokus</th>
                      <th className="p-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {bidangPrograms.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3 text-center font-mono text-stone-500">{idx + 1}</td>
                        <td className="p-3">
                          <div className="font-bold text-stone-900">{item.namaProgram}</div>
                          <div className="font-mono text-[10px] text-stone-500">{item.kodeKegiatan}</div>
                        </td>
                        <td className="p-3 font-medium text-stone-800">{item.namaKegiatan}</td>
                        <td className="p-3 font-mono font-bold text-stone-900 text-right">{formatIDR(item.paguAnggaran)}</td>
                        <td className="p-3 font-mono font-bold text-emerald-950 text-right">{formatIDR(item.realisasiKeuangan)}</td>
                        <td className="p-3 text-center">
                          <div className="font-bold text-blue-900">{item.realisasiFisik}%</div>
                          <div className="w-16 bg-stone-200 h-1.5 rounded-full mx-auto mt-1 overflow-hidden">
                            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${item.realisasiFisik}%` }} />
                          </div>
                        </td>
                        <td className="p-3 text-stone-700">{item.kecamatanFokus}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${getBadgeClass(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. REALISASI PUPUK (BIDANG PSP) */}
        {activeTab === 'realisasi-pupuk' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <div className="flex items-start gap-2.5">
                <Boxes className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-amber-950">Monitoring e-Alokasi Pupuk Bersubsidi TTS 2026</div>
                  <div className="text-[11px] text-amber-800">
                    Rekapitulasi kuota dan penyaluran pupuk Urea dan NPK bersubsidi kepada kelompok tani terdaftar di SIMLUHTAN melalui pengecer resmi.
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleExportCsv('REKAP_PUPUK_TTS', ['ID', 'Kecamatan', 'Jenis Pupuk', 'Alokasi Ton', 'Realisasi Ton', 'Kios Pengecer', 'Persen'], DATA_PSP_REALISASI_PUPUK.map(p => [p.id, p.kecamatan, p.jenisPupuk, p.alokasi, p.realisasi, p.kiosPengecer, `${p.persen}%`]))}
                className="px-3 py-1.5 bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Rekap</span>
              </button>
            </div>

            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-800 border-b border-stone-200 font-bold">
                    <tr>
                      <th className="p-3 text-center w-12">No</th>
                      <th className="p-3">Kecamatan</th>
                      <th className="p-3">Jenis Pupuk</th>
                      <th className="p-3 font-mono text-right">Alokasi (Ton)</th>
                      <th className="p-3 font-mono text-right">Realisasi (Ton)</th>
                      <th className="p-3 text-center">Penyaluran (%)</th>
                      <th className="p-3">Kios Pengecer Resmi</th>
                      <th className="p-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {DATA_PSP_REALISASI_PUPUK.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3 text-center font-mono text-stone-500">{idx + 1}</td>
                        <td className="p-3 font-bold text-stone-900">{item.kecamatan}</td>
                        <td className="p-3 font-semibold text-emerald-900">{item.jenisPupuk}</td>
                        <td className="p-3 font-mono text-right font-medium">{item.alokasi} Ton</td>
                        <td className="p-3 font-mono text-right font-bold text-emerald-950">{item.realisasi} Ton</td>
                        <td className="p-3 text-center font-bold text-emerald-800">{item.persen}%</td>
                        <td className="p-3 text-stone-700">{item.kiosPengecer}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${getBadgeClass(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. DATA POTENSI LAHAN (PSP & TANAMAN PANGAN) */}
        {(activeTab === 'potensi-lahan') && (
          <div className="space-y-4">
            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-800 border-b border-stone-200 font-bold">
                    <tr>
                      <th className="p-3 text-center w-12">No</th>
                      <th className="p-3">Kecamatan</th>
                      <th className="p-3 font-mono text-right">Luas Baku Sawah (Ha)</th>
                      <th className="p-3 font-mono text-right">Sawah Irigasi (Ha)</th>
                      <th className="p-3 font-mono text-right">Tadah Hujan (Ha)</th>
                      <th className="p-3 font-mono text-right">Lahan Kering (Ha)</th>
                      <th className="p-3">Sumber Air / Infrastruktur</th>
                      <th className="p-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {DATA_PSP_POTENSI_LAHAN.map((lahan, idx) => (
                      <tr key={lahan.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3 text-center font-mono text-stone-500">{idx + 1}</td>
                        <td className="p-3 font-bold text-stone-900">{lahan.kecamatan}</td>
                        <td className="p-3 font-mono text-right font-bold text-emerald-950">{lahan.luasBakuSawah.toLocaleString('id-ID')} Ha</td>
                        <td className="p-3 font-mono text-right text-stone-700">{lahan.sawahIrigasi.toLocaleString('id-ID')} Ha</td>
                        <td className="p-3 font-mono text-right text-stone-700">{lahan.sawahTadahHujan.toLocaleString('id-ID')} Ha</td>
                        <td className="p-3 font-mono text-right font-semibold text-amber-900">{lahan.lahanKering.toLocaleString('id-ID')} Ha</td>
                        <td className="p-3 text-stone-700">{lahan.sumberAir}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${getBadgeClass(lahan.status)}`}>
                            {lahan.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. DATA KELOMPOK TANI (PSP) */}
        {activeTab === 'kelompok-tani' && (
          <div className="space-y-4">
            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-800 border-b border-stone-200 font-bold">
                    <tr>
                      <th className="p-3 text-center w-12">No</th>
                      <th className="p-3 font-mono">No. Reg SIMLUHTAN</th>
                      <th className="p-3">Nama Kelompok Tani</th>
                      <th className="p-3">Ketua Poktan</th>
                      <th className="p-3">Desa / Kecamatan</th>
                      <th className="p-3 text-center">Anggota</th>
                      <th className="p-3">Komoditas Unggulan</th>
                      <th className="p-3 text-center">Kelas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {DATA_PSP_KELOMPOK_TANI.map((poktan, idx) => (
                      <tr key={poktan.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3 text-center font-mono text-stone-500">{idx + 1}</td>
                        <td className="p-3 font-mono text-[11px] text-stone-500">{poktan.simluhtanReg}</td>
                        <td className="p-3 font-bold text-stone-900">{poktan.namaPoktan}</td>
                        <td className="p-3 text-stone-800 font-medium">{poktan.namaKetua}</td>
                        <td className="p-3 text-stone-700">{poktan.desa}, Kec. {poktan.kecamatan}</td>
                        <td className="p-3 text-center font-bold text-emerald-900">{poktan.jumlahAnggota} Orang</td>
                        <td className="p-3 text-stone-800">{poktan.komoditasUtama}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${getBadgeClass(poktan.kelasKemampuan)}`}>
                            {poktan.kelasKemampuan}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. ALSINTAN / ALSINTA (PSP, TP, BUN) */}
        {(activeTab === 'alsintan' || activeTab === 'alsinta') && (
          <div className="space-y-4">
            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-800 border-b border-stone-200 font-bold">
                    <tr>
                      <th className="p-3 text-center w-12">No</th>
                      <th className="p-3">Jenis Alsintan</th>
                      <th className="p-3">Merk / Type Mesin</th>
                      <th className="p-3 text-center">Jumlah Unit</th>
                      <th className="p-3">Lokasi / Pengelola</th>
                      <th className="p-3">Peruntukan</th>
                      <th className="p-3 text-center">Kondisi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {(bidang.id === 'perkebunan' ? DATA_BUN_ALSINTAN : DATA_PSP_ALSINTAN).map((als: any, idx) => (
                      <tr key={als.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3 text-center font-mono text-stone-500">{idx + 1}</td>
                        <td className="p-3 font-bold text-stone-900">{als.jenisAlsintan || als.namaAlat}</td>
                        <td className="p-3 text-stone-700 font-medium">{als.merkType || als.merk || '-'}</td>
                        <td className="p-3 text-center font-bold text-emerald-900">{als.jumlah} Unit</td>
                        <td className="p-3 text-stone-700">{als.lokasiPenempatan || als.penerima || '-'}</td>
                        <td className="p-3 text-stone-700">{als.peruntukan || als.kapasitas || '-'}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${getBadgeClass(als.kondisi)}`}>
                            {als.kondisi}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 6. PERMOHONAN BANTUAN (PSP, HORTI, BUN) */}
        {activeTab === 'permohonan-bantuan' && (
          <div className="space-y-4">
            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-800 border-b border-stone-200 font-bold">
                    <tr>
                      <th className="p-3 text-center w-12">No</th>
                      <th className="p-3">Kelompok Tani Pengusul</th>
                      <th className="p-3">Ketua & Kontak</th>
                      <th className="p-3">Desa / Kecamatan</th>
                      <th className="p-3">Rincian Bantuan Yang Dimohon</th>
                      <th className="p-3">Tanggal Proposal</th>
                      <th className="p-3 text-center">Status Verifikasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {(bidang.id === 'hortikultura' ? DATA_HORTI_PERMOHONAN_BANTUAN : bidang.id === 'perkebunan' ? DATA_BUN_PERMOHONAN_BANTUAN : DATA_PSP_PERMOHONAN_BANTUAN).map((prop: any, idx) => (
                      <tr key={prop.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3 text-center font-mono text-stone-500">{idx + 1}</td>
                        <td className="p-3 font-bold text-stone-900">{prop.poktan}</td>
                        <td className="p-3 text-stone-700">{prop.namaKetua || prop.ketua || 'Ketua Poktan'}</td>
                        <td className="p-3 text-stone-700">{prop.desa}, Kec. {prop.kecamatan}</td>
                        <td className="p-3 text-emerald-950 font-medium">{prop.jenisBantuan || prop.usulan || '-'}</td>
                        <td className="p-3 text-stone-600 font-mono text-[11px]">{prop.tanggal}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${getBadgeClass(prop.status)}`}>
                            {prop.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 7. SP TANAMAN PANGAN */}
        {activeTab === 'sp-tanaman-pangan' && (
          <div className="space-y-4">
            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-800 border-b border-stone-200 font-bold">
                    <tr>
                      <th className="p-3 text-center w-12">No</th>
                      <th className="p-3">Komoditas Pangan</th>
                      <th className="p-3 font-mono text-right">Luas Tanam (Ha)</th>
                      <th className="p-3 font-mono text-right">Luas Panen (Ha)</th>
                      <th className="p-3 font-mono text-right">Puso (Ha)</th>
                      <th className="p-3 text-center">Produktivitas</th>
                      <th className="p-3 font-mono text-right">Estimasi Produksi (Ton)</th>
                      <th className="p-3 text-center">Status Laporan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {DATA_TP_SP_TANAMAN_PANGAN.map((sp, idx) => (
                      <tr key={sp.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3 text-center font-mono text-stone-500">{idx + 1}</td>
                        <td className="p-3 font-bold text-stone-900">{sp.komoditas}</td>
                        <td className="p-3 font-mono text-right font-medium">{sp.luasTanam.toLocaleString('id-ID')} Ha</td>
                        <td className="p-3 font-mono text-right font-bold text-emerald-950">{sp.luasPanen.toLocaleString('id-ID')} Ha</td>
                        <td className="p-3 font-mono text-right text-rose-700">{sp.puso} Ha</td>
                        <td className="p-3 text-center font-bold text-blue-900">{sp.produktivitas}</td>
                        <td className="p-3 font-mono text-right font-bold text-emerald-900">{sp.estimasiProduksi.toLocaleString('id-ID')} Ton</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${getBadgeClass(sp.status)}`}>
                            {sp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 8. HARGA PASAR (TP & HORTI) */}
        {activeTab === 'harga-pasar' && (
          <div className="space-y-4">
            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-800 border-b border-stone-200 font-bold">
                    <tr>
                      <th className="p-3 text-center w-12">No</th>
                      <th className="p-3">Nama Komoditas</th>
                      <th className="p-3 text-center">Satuan</th>
                      <th className="p-3 font-mono text-right">Harga Produsen (Rp)</th>
                      <th className="p-3 font-mono text-right">Pasar Inpres Soe (Rp)</th>
                      <th className="p-3 font-mono text-right">Pasar Kapan (Rp)</th>
                      <th className="p-3 font-mono text-right">Pasar Niki-Niki (Rp)</th>
                      <th className="p-3 text-center">Tren</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {(bidang.id === 'hortikultura' ? DATA_HORTI_HARGA_PASAR : DATA_TP_HARGA_PASAR).map((hp, idx) => (
                      <tr key={hp.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3 text-center font-mono text-stone-500">{idx + 1}</td>
                        <td className="p-3 font-bold text-stone-900">{hp.komoditas}</td>
                        <td className="p-3 text-center font-medium text-stone-600">{hp.satuan}</td>
                        <td className="p-3 font-mono text-right font-medium text-stone-800">{formatIDR(hp.hargaProdusen)}</td>
                        <td className="p-3 font-mono text-right font-bold text-emerald-950">{formatIDR(hp.hargaPasarInpresSoe)}</td>
                        <td className="p-3 font-mono text-right font-bold text-stone-900">{formatIDR(hp.hargaPasarKapan)}</td>
                        <td className="p-3 font-mono text-right font-bold text-stone-900">
                          {formatIDR('hargaPasarNikiNiki' in hp ? hp.hargaPasarNikiNiki : ('hargaPasarKupang' in hp ? hp.hargaPasarKupang : 0))}
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${getBadgeClass(hp.tren)}`}>
                            {hp.tren}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 9. ALSINTAN PASCA PANEN (TP) */}
        {activeTab === 'alsintan-pasca-panen' && (
          <div className="space-y-4">
            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-800 border-b border-stone-200 font-bold">
                    <tr>
                      <th className="p-3 text-center w-12">No</th>
                      <th className="p-3">Nama Alat Pasca Panen</th>
                      <th className="p-3">Merk & Spesifikasi</th>
                      <th className="p-3">Kapasitas Kerja</th>
                      <th className="p-3 text-center">Jumlah Unit</th>
                      <th className="p-3">Lokasi Penempatan</th>
                      <th className="p-3 text-center">Kondisi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {DATA_TP_ALSINTAN_PASCA_PANEN.map((app, idx) => (
                      <tr key={app.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3 text-center font-mono text-stone-500">{idx + 1}</td>
                        <td className="p-3 font-bold text-stone-900">{app.namaAlat}</td>
                        <td className="p-3 text-stone-700">{app.merk}</td>
                        <td className="p-3 font-medium text-emerald-950">{app.kapasitas}</td>
                        <td className="p-3 text-center font-bold text-stone-900">{app.jumlah} Unit</td>
                        <td className="p-3 text-stone-700">{app.lokasi}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${getBadgeClass(app.kondisi)}`}>
                            {app.kondisi}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 10. DOKUMEN PENDUKUNG (KEGIATAN / LAHAN) */}
        {(activeTab === 'dokumen-pendukung' || activeTab === 'dokumen-pendukung-lahan') && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DATA_TP_DOKUMEN_LAHAN.map((dok) => (
                <div key={dok.id} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-all flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-sm">{dok.judulDokumen}</div>
                      <div className="text-xs text-stone-500 font-mono mt-0.5">{dok.nomorSk}</div>
                      <div className="text-xs text-emerald-800 font-semibold mt-1">Cakupan: {dok.luasCakupan}</div>
                      <div className="text-[11px] text-stone-400 mt-0.5">Tanggal Pengesahan: {dok.tanggal}</div>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${getBadgeClass(dok.status)} flex-shrink-0`}>
                    {dok.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 11. STATISTIK PERTANIAN HORTIKULTURA (SPH) */}
        {activeTab === 'statistik-hortikultura' && (
          <div className="space-y-4">
            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-800 border-b border-stone-200 font-bold">
                    <tr>
                      <th className="p-3 text-center w-12">No</th>
                      <th className="p-3">Jenis Formulir SPH</th>
                      <th className="p-3">Komoditas Hortikultura</th>
                      <th className="p-3">Volume / Luas Panen</th>
                      <th className="p-3 font-mono text-right">Produksi (Kuintal)</th>
                      <th className="p-3 text-center">Produktivitas</th>
                      <th className="p-3">Sentra Kawasan TTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {DATA_HORTI_STATISTIK_SPH.map((sph, idx) => (
                      <tr key={sph.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3 text-center font-mono text-stone-500">{idx + 1}</td>
                        <td className="p-3 font-semibold text-emerald-900">{sph.jenisLaporan}</td>
                        <td className="p-3 font-bold text-stone-900">{sph.komoditas}</td>
                        <td className="p-3 text-stone-700 font-medium">
                          {sph.jumlahPohonMenghasilkan ? `${sph.jumlahPohonMenghasilkan.toLocaleString('id-ID')} Pohon` : `${sph.luasPanenHa} Hektar`}
                        </td>
                        <td className="p-3 font-mono text-right font-bold text-emerald-950">{sph.produksiKuintal.toLocaleString('id-ID')} Ku</td>
                        <td className="p-3 text-center font-bold text-blue-900">{sph.produktivitas}</td>
                        <td className="p-3 text-stone-700">{sph.sentraKecamatan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 12. ATAP PERKEBUNAN (BUN) */}
        {activeTab === 'atap-perkebunan' && (
          <div className="space-y-4">
            <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-950">
              <span className="font-bold">Laporan Angka Tetap (ATAP) Perkebunan Kabupaten Timor Tengah Selatan:</span> Menyajikan sebaran luas areal tanaman belum menghasilkan (TBM), tanaman menghasilkan (TM), dan tanaman tua/rusak (TT/TR) beserta tonase produksi tahunan.
            </div>

            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-800 border-b border-stone-200 font-bold">
                    <tr>
                      <th className="p-3 text-center w-12">No</th>
                      <th className="p-3">Komoditas Perkebunan</th>
                      <th className="p-3 font-mono text-right">TBM (Ha)</th>
                      <th className="p-3 font-mono text-right">TM (Ha)</th>
                      <th className="p-3 font-mono text-right">TT/TR (Ha)</th>
                      <th className="p-3 font-mono text-right">Total Luas (Ha)</th>
                      <th className="p-3 font-mono text-right">Produksi (Ton)</th>
                      <th className="p-3 text-center">Produktivitas</th>
                      <th className="p-3">Sentra Perkebunan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {DATA_BUN_ATAP_PERKEBUNAN.map((atap, idx) => (
                      <tr key={atap.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3 text-center font-mono text-stone-500">{idx + 1}</td>
                        <td className="p-3 font-bold text-stone-900">{atap.komoditas}</td>
                        <td className="p-3 font-mono text-right text-stone-700">{atap.tbm} Ha</td>
                        <td className="p-3 font-mono text-right font-semibold text-emerald-900">{atap.tm} Ha</td>
                        <td className="p-3 font-mono text-right text-stone-500">{atap.ttTr} Ha</td>
                        <td className="p-3 font-mono text-right font-bold text-stone-900">{atap.totalLuasHa.toLocaleString('id-ID')} Ha</td>
                        <td className="p-3 font-mono text-right font-bold text-emerald-950">{atap.produksiTon} Ton</td>
                        <td className="p-3 text-center font-bold text-blue-900">{atap.produktivitasKgHa} Kg/Ha</td>
                        <td className="p-3 text-stone-700">{atap.sentra}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 13. LAPORAN BULANAN (SEMUA BIDANG) */}
        {activeTab === 'laporan-bulanan' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map((bln, idx) => {
                const isPassed = idx <= 8;
                return (
                  <div key={bln} className={`p-4 rounded-2xl border text-center transition-all ${
                    isPassed ? 'bg-emerald-50/60 border-emerald-200' : 'bg-stone-50 border-stone-200'
                  }`}>
                    <div className="text-xs font-bold text-stone-500 uppercase">{bln} 2026</div>
                    <div className={`text-base font-black mt-1 ${isPassed ? 'text-emerald-900' : 'text-stone-400'}`}>
                      {isPassed ? `${85 + (idx % 12)}% Fisik` : 'Menunggu'}
                    </div>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      isPassed ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-stone-100 text-stone-500 border-stone-200'
                    }`}>
                      {isPassed ? 'Terverifikasi' : 'Tahap Input'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 14. REALISASI FISIK DAN KEUANGAN */}
        {activeTab === 'realisasi-fisik-keuangan' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {['TW I (Jan-Mar)', 'TW II (Apr-Jun)', 'TW III (Jul-Sep)', 'TW IV (Okt-Des)'].map((tw, idx) => (
                <div key={tw} className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                  <div className="text-xs font-bold text-stone-500 uppercase">{tw}</div>
                  <div className="text-lg font-black font-mono text-emerald-950 mt-1">
                    {idx === 0 ? '98.2%' : idx === 1 ? '94.5%' : idx === 2 ? '89.1%' : 'Perencanaan'}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    {idx === 3 ? 'Target Akhir Tahun' : 'Deviasi: +2.1% (Sangat Baik)'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ============================================================ */}
      {/* MODAL SIMULASI TAMBAH USULAN / PERMOHONAN */}
      {/* ============================================================ */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-base">Input Usulan Baru</h4>
                  <div className="text-xs text-stone-500">{bidang.name}</div>
                </div>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Usulan berhasil disimpan ke sistem verifikasi internal Dinas Pertanian TTS.');
              setShowAddModal(false);
            }} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Nama Kelompok Tani / Pemohon:</label>
                <input required type="text" placeholder="Contoh: Poktan Harapan Tani Bena" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white" />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Kecamatan:</label>
                <input required type="text" placeholder="Contoh: Amanuban Selatan / Kualin / Mollo" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white" />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Jenis Bantuan / Usulan:</label>
                <input required type="text" placeholder="Contoh: Pompa Air 3 Inchi / Bibit Jeruk / Traktor" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white" />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Catatan Tambahan & Luas Lahan:</label>
                <textarea rows={3} placeholder="Keterangan kondisi lahan dan kebutuhan teknis kelompok..." className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white" />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl shadow-2xs cursor-pointer"
                >
                  Kirim Usulan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
