import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  Printer, 
  TrendingUp,
  Building2,
  Calendar,
  Layers,
  MapPin,
  X
} from 'lucide-react';
import { SIKOR_PROGRAMS, KECAMATAN_TTS } from '../data/mockData';
import { SikorProgram } from '../types';

interface SikorModuleSectionProps {
  initialBidangFilter?: string | null;
}

export const SikorModuleSection: React.FC<SikorModuleSectionProps> = ({ initialBidangFilter }) => {
  const [programs, setPrograms] = useState<SikorProgram[]>(SIKOR_PROGRAMS);
  const [selectedBidang, setSelectedBidang] = useState<string>(initialBidangFilter || 'Semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modal for new report submission
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [newReport, setNewReport] = useState({
    namaKegiatan: '',
    bidang: 'Tanaman Pangan' as SikorProgram['bidang'],
    kecamatanFokus: 'Kota Soe',
    paguAnggaran: 150000000,
    realisasiKeuangan: 120000000,
    targetFisik: '100 Ha Binaan',
    realisasiFisik: 80,
    penanggungJawab: 'Penyuluh Lapangan BPP'
  });
  const [submissionSuccessMessage, setSubmissionSuccessMessage] = useState<string | null>(null);

  // Sync if initialBidangFilter changes
  React.useEffect(() => {
    if (initialBidangFilter) {
      setSelectedBidang(initialBidangFilter);
    }
  }, [initialBidangFilter]);

  // Filtering
  const filteredPrograms = useMemo(() => {
    return programs.filter((item) => {
      const matchBidang = selectedBidang === 'Semua' || item.bidang === selectedBidang;
      const matchStatus = selectedStatus === 'Semua' || item.status === selectedStatus;
      const matchSearch = 
        item.namaProgram.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.namaKegiatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kodeKegiatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kecamatanFokus.toLowerCase().includes(searchQuery.toLowerCase());

      return matchBidang && matchStatus && matchSearch;
    });
  }, [programs, selectedBidang, selectedStatus, searchQuery]);

  // Stats calculation
  const totalPagu = useMemo(() => programs.reduce((acc, p) => acc + p.paguAnggaran, 0), [programs]);
  const totalRealisasi = useMemo(() => programs.reduce((acc, p) => acc + p.realisasiKeuangan, 0), [programs]);
  const persentaseRealisasi = Math.round((totalRealisasi / totalPagu) * 100);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const handleAddReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.namaKegiatan.trim()) return;

    const created: SikorProgram = {
      id: `SIKOR-2026-${String(programs.length + 1).padStart(3, '0')}`,
      kodeKegiatan: `3.27.0${programs.length + 1}.2.01.0020`,
      namaProgram: `Program Penyelenggaraan ${newReport.bidang} Terpadu`,
      namaKegiatan: newReport.namaKegiatan,
      bidang: newReport.bidang,
      tahunAnggaran: 2026,
      paguAnggaran: Number(newReport.paguAnggaran),
      realisasiKeuangan: Number(newReport.realisasiKeuangan),
      targetFisik: newReport.targetFisik,
      realisasiFisik: Number(newReport.realisasiFisik),
      status: 'Terverifikasi',
      triwulan: 'TW III',
      kecamatanFokus: newReport.kecamatanFokus,
      penanggungJawab: newReport.penanggungJawab,
      tanggalLaporanTerakhir: 'Hari Ini'
    };

    setPrograms([created, ...programs]);
    setIsSubmitModalOpen(false);
    setSubmissionSuccessMessage(`Laporan koordinasi kegiatan "${newReport.namaKegiatan}" berhasil dicatat dalam basis data SIKOR PPKL!`);
    
    // Reset form
    setNewReport({
      namaKegiatan: '',
      bidang: 'Tanaman Pangan',
      kecamatanFokus: 'Kota Soe',
      paguAnggaran: 150000000,
      realisasiKeuangan: 120000000,
      targetFisik: '100 Ha Binaan',
      realisasiFisik: 80,
      penanggungJawab: 'Penyuluh Lapangan BPP'
    });

    setTimeout(() => {
      setSubmissionSuccessMessage(null);
    }, 5000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="sikor-ppkl" className="py-16 sm:py-24 bg-white border-b border-stone-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>Modul Terintegrasi Satu Data</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Sistem Koordinasi & Pelaporan SIKOR
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
              Pantau dokumen perencanaan program (Renja), realisasi anggaran (DPA APBD), target fisik lapangan, dan laporan triwulanan dari seluruh unit kerja Dinas Pertanian Kab. TTS.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Input Koordinasi / Laporan</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-stone-300 transition-colors cursor-pointer"
              title="Cetak Laporan SIKOR"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Cetak Ringkasan</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {submissionSuccessMessage && (
          <div className="mb-6 bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>{submissionSuccessMessage}</span>
            </div>
            <button 
              onClick={() => setSubmissionSuccessMessage(null)}
              className="text-stone-400 hover:text-stone-700 text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Key Metrics Overview Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
              Total Pagu Anggaran (DPA 2026)
            </div>
            <div className="text-xl sm:text-2xl font-black text-stone-900">
              {formatRupiah(totalPagu)}
            </div>
            <div className="text-xs text-stone-500 mt-2">
              Tercakup dalam {programs.length} Program Prioritas
            </div>
          </div>

          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
              Realisasi Keuangan Berjalan
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-800">
              {formatRupiah(totalRealisasi)}
            </div>
            <div className="text-xs text-stone-600 mt-2 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Progres Keuangan: {persentaseRealisasi}% dari Total Pagu</span>
            </div>
          </div>

          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
              Status Sinkronisasi Pelaporan
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-600">
              Triwulan III (TW III)
            </div>
            <div className="text-xs text-stone-500 mt-2">
              Terverifikasi Tim Evaluasi & Tim IT SIKOR
            </div>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200 mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari program, kegiatan, atau kecamatan di TTS..."
                className="w-full pl-10 pr-4 py-2 bg-white text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-900"
              />
            </div>

            {/* Filter by Bidang */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-bold text-stone-500 whitespace-nowrap flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Bidang:</span>
              </span>
              {['Semua', 'Sekretariat', 'Tanaman Pangan', 'Hortikultura', 'Perkebunan', 'PSP'].map((bidang) => (
                <button
                  key={bidang}
                  onClick={() => setSelectedBidang(bidang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedBidang === bidang
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {bidang}
                </button>
              ))}
            </div>

          </div>

          {/* Filter Status */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200 text-xs">
            <span className="font-bold text-stone-500">Status Capaian:</span>
            {['Semua', 'Sedang Berjalan', 'Terverifikasi', 'Perlu Evaluasi'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
                  selectedStatus === status
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white'
                }`}
              >
                {status}
              </button>
            ))}
            <span className="text-stone-300 mx-1">|</span>
            <span className="text-stone-500">Menampilkan {filteredPrograms.length} kegiatan</span>
          </div>
        </div>

        {/* Programs Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100/80 text-stone-700 font-bold border-b border-stone-200 uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-5 py-4">Kode & Kegiatan</th>
                  <th className="px-5 py-4">Bidang</th>
                  <th className="px-5 py-4">Kecamatan Fokus</th>
                  <th className="px-5 py-4">Pagu / Realisasi</th>
                  <th className="px-5 py-4">Progres Fisik</th>
                  <th className="px-5 py-4">Status & Laporan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredPrograms.length > 0 ? (
                  filteredPrograms.map((item) => {
                    const persenFisik = item.realisasiFisik;
                    return (
                      <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                        
                        {/* Kode & Nama Kegiatan */}
                        <td className="px-5 py-4 max-w-xs sm:max-w-md">
                          <div className="text-[11px] font-mono text-emerald-800 font-bold mb-0.5">
                            {item.kodeKegiatan}
                          </div>
                          <div className="font-bold text-stone-900 line-clamp-2">
                            {item.namaKegiatan}
                          </div>
                          <div className="text-xs text-stone-500 mt-1 line-clamp-1">
                            {item.namaProgram}
                          </div>
                        </td>

                        {/* Bidang */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className="font-medium text-stone-800 text-xs">
                            {item.bidang}
                          </span>
                        </td>

                        {/* Kecamatan */}
                        <td className="px-5 py-4 whitespace-nowrap text-stone-700 text-xs">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                            <span>{item.kecamatanFokus}</span>
                          </div>
                        </td>

                        {/* Pagu / Realisasi */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="font-mono font-bold text-stone-900 text-xs">
                            {formatRupiah(item.realisasiKeuangan)}
                          </div>
                          <div className="text-[11px] font-mono text-stone-500">
                            dari {formatRupiah(item.paguAnggaran)}
                          </div>
                        </td>

                        {/* Progres Fisik */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-24 bg-stone-200 h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  persenFisik >= 85 ? 'bg-emerald-600' : persenFisik >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                                }`}
                                style={{ width: `${persenFisik}%` }}
                              />
                            </div>
                            <span className="font-bold text-stone-900 text-xs">{persenFisik}%</span>
                          </div>
                          <div className="text-[11px] text-stone-500">{item.targetFisik}</div>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4 whitespace-nowrap text-xs">
                          <div className="mb-1">
                            {item.status === 'Terverifikasi' ? (
                              <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Terverifikasi</span>
                              </span>
                            ) : item.status === 'Sedang Berjalan' ? (
                              <span className="inline-flex items-center gap-1 text-blue-700 font-semibold">
                                <Clock className="w-3.5 h-3.5 text-blue-600" />
                                <span>Sedang Berjalan</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-amber-700 font-semibold">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                <span>Perlu Evaluasi</span>
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-stone-400 font-mono">
                            {item.triwulan} · {item.tanggalLaporanTerakhir}
                          </div>
                        </td>

                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-stone-500 text-sm">
                      Tidak ditemukan data kegiatan perencanaan dengan kata kunci tersebut.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Input Laporan Koordinasi Baru */}
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-300">
              
              <div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">
                      Input Koordinasi Laporan Kegiatan
                    </h3>
                    <p className="text-xs text-stone-500">Pembaruan data SIKOR PPKL Terintegrasi</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddReport} className="p-6 space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Nama Kegiatan / Program Kerja *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Distribusi Benih Jagung Hibrida & Pupuk Organik"
                    value={newReport.namaKegiatan}
                    onChange={(e) => setNewReport({ ...newReport, namaKegiatan: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Bidang Teknis *
                    </label>
                    <select
                      value={newReport.bidang}
                      onChange={(e) => setNewReport({ ...newReport, bidang: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                    >
                      <option value="Sekretariat">Sekretariat</option>
                      <option value="Tanaman Pangan">Tanaman Pangan</option>
                      <option value="Hortikultura">Hortikultura</option>
                      <option value="Perkebunan">Perkebunan</option>
                      <option value="PSP">PSP (Prasarana & Sarana)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Kecamatan Wilayah Sasaran *
                    </label>
                    <select
                      value={newReport.kecamatanFokus}
                      onChange={(e) => setNewReport({ ...newReport, kecamatanFokus: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                    >
                      {KECAMATAN_TTS.map((kec) => (
                        <option key={kec} value={kec}>{kec}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Pagu Anggaran (Rp)
                    </label>
                    <input
                      type="number"
                      value={newReport.paguAnggaran}
                      onChange={(e) => setNewReport({ ...newReport, paguAnggaran: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Realisasi Keuangan (Rp)
                    </label>
                    <input
                      type="number"
                      value={newReport.realisasiKeuangan}
                      onChange={(e) => setNewReport({ ...newReport, realisasiKeuangan: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Target Fisik
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 150 Ha / 20 Poktan"
                      value={newReport.targetFisik}
                      onChange={(e) => setNewReport({ ...newReport, targetFisik: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Capaian Fisik (%)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={newReport.realisasiFisik}
                      onChange={(e) => setNewReport({ ...newReport, realisasiFisik: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Pejabat / Petugas Pelapor
                  </label>
                  <input
                    type="text"
                    value={newReport.penanggungJawab}
                    onChange={(e) => setNewReport({ ...newReport, penanggungJawab: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 text-stone-600 hover:text-stone-900 font-semibold cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl shadow-xs cursor-pointer transition-colors"
                  >
                    Simpan & Terbitkan Laporan
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
