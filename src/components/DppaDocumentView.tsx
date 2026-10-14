import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  Coins, 
  Calendar, 
  MapPin, 
  Building2, 
  ArrowUpDown, 
  Check, 
  Copy, 
  ExternalLink,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { DppaDocument } from '../types';
import logoTts from '../assets/images/logo-tts.png';

interface DppaDocumentViewProps {
  document: DppaDocument;
  onClose?: () => void;
  formatIDR: (num: number) => string;
}

export const DppaDocumentView: React.FC<DppaDocumentViewProps> = ({
  document: doc,
  onClose,
  formatIDR
}) => {
  const [activeTab, setActiveTab] = useState<'rincian' | 'indikator' | 'kas-bulanan' | 'pengesahan'>('rincian');
  const [filterRekening, setFilterRekening] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const filteredItems = doc.rincianBelanja.filter(item => {
    if (!filterRekening) return true;
    const q = filterRekening.toLowerCase();
    return (
      item.kodeRekening.toLowerCase().includes(q) ||
      item.uraian.toLowerCase().includes(q) ||
      (item.sumberDana && item.sumberDana.toLowerCase().includes(q)) ||
      (item.spesifikasi && item.spesifikasi.toLowerCase().includes(q))
    );
  });

  const handleCopyNomor = () => {
    navigator.clipboard.writeText(doc.nomorDppa);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleExportCsv = () => {
    const headers = [
      'Kode Rekening',
      'Uraian / Spesifikasi',
      'Sumber Dana',
      'Volume Sebelum',
      'Satuan',
      'Harga Satuan',
      'Jumlah Sebelum (Rp)',
      'Volume Setelah',
      'Satuan',
      'Harga Satuan',
      'Jumlah Setelah (Rp)',
      'Bertambah / Berkurang (Rp)'
    ];

    const rows = doc.rincianBelanja.map(item => [
      `"${item.kodeRekening}"`,
      `"${item.uraian.replace(/"/g, '""')}${item.spesifikasi ? ` (${item.spesifikasi.replace(/"/g, '""')})` : ''}"`,
      `"${item.sumberDana || '-'}"`,
      `"${item.koefisienSebelum || '-'}"`,
      `"${item.satuanSebelum || '-'}"`,
      item.hargaSebelum || 0,
      item.jumlahSebelum,
      `"${item.koefisienSetelah || '-'}"`,
      `"${item.satuanSetelah || '-'}"`,
      item.hargaSetelah || 0,
      item.jumlahSetelah,
      item.bertambahBerkurang
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DPPA_RINCIAN_BELANJA_TTS_${doc.kodeSubKegiatan}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Find total budget and changes
  const totalAnggaran = doc.alokasiTahunBerjalan;
  const maxBulan = Math.max(...doc.realisasiBulanan.map(m => m.nominal));

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden print:border-none print:shadow-none animate-in fade-in duration-150">
      
      {/* ============================================================ */}
      {/* 1. KOP RESMI DOKUMEN DPPA KABUPATEN TIMOR TENGAH SELATAN */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 text-white p-6 sm:p-8 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <img 
              src={logoTts} 
              alt="Logo Kabupaten TTS" 
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md flex-shrink-0"
            />
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-300">
                Pemerintah Kabupaten Timor Tengah Selatan
              </div>
              <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white mt-0.5">
                DOKUMEN PELAKSANAAN PERGESERAN ANGGARAN (DPPA)
              </h2>
              <div className="text-xs sm:text-sm text-stone-300 font-semibold mt-0.5">
                FORMULIR DPPA RINCIAN BELANJA SKPD · TAHUN ANGGARAN {doc.tahunAnggaran}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:items-end justify-center gap-2">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 text-xs font-mono">
              <span className="text-emerald-300 font-bold">Nomor DPPA:</span>
              <span className="font-bold text-white tracking-wide">{doc.nomorDppa}</span>
              <button
                onClick={handleCopyNomor}
                className="hover:text-emerald-300 cursor-pointer ml-1"
                title="Salin Nomor DPPA"
              >
                {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCsv}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer border border-white/15"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Ekspor CSV</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Lembar DPPA</span>
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Tutup
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Identitas Klasifikasi Anggaran */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 text-xs text-stone-200">
          <div>
            <span className="text-stone-400 block text-[11px]">Urusan Pemerintahan:</span>
            <span className="font-bold text-white">{doc.urusanPemerintahan}</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[11px]">Bidang Urusan:</span>
            <span className="font-bold text-white">{doc.bidangUrusan}</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[11px]">Organisasi / SKPD:</span>
            <span className="font-bold text-white">{doc.organisasi}</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[11px]">Total Alokasi Tahun Ini:</span>
            <span className="font-black text-emerald-300 font-mono text-sm sm:text-base">
              {formatIDR(doc.alokasiTahunBerjalan)}
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. SUB KEGIATAN & POKOK INFORMASI */}
      {/* ============================================================ */}
      <div className="bg-stone-50 border-b border-stone-200 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-emerald-100 text-emerald-800 border border-emerald-300">
                {doc.kodeSubKegiatan}
              </span>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Sub Kegiatan DPA / DPPA
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
              {doc.subKegiatan}
            </h3>
            <div className="text-xs text-stone-600">
              Program: <strong className="text-stone-800">{doc.program}</strong> · Kegiatan: <strong className="text-stone-800">{doc.kegiatan}</strong>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-stone-200 shadow-2xs">
            <div>
              <div className="text-[10px] text-stone-500 font-semibold uppercase">Tahun -1</div>
              <div className="font-mono text-xs font-bold text-stone-700">{formatIDR(doc.alokasiTahunSebelumnya)}</div>
            </div>
            <div className="h-6 w-px bg-stone-200 mx-2" />
            <div>
              <div className="text-[10px] text-emerald-800 font-bold uppercase">Tahun Berjalan</div>
              <div className="font-mono text-xs font-black text-emerald-800">{formatIDR(doc.alokasiTahunBerjalan)}</div>
            </div>
            <div className="h-6 w-px bg-stone-200 mx-2" />
            <div>
              <div className="text-[10px] text-stone-500 font-semibold uppercase">Tahun +1</div>
              <div className="font-mono text-xs font-bold text-stone-700">{formatIDR(doc.alokasiTahunBerikutnya)}</div>
            </div>
          </div>
        </div>

        {/* Quick Context Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-stone-200/80">
            <MapPin className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-stone-500 block text-[11px]">Lokasi Pelaksanaan:</span>
              <span className="font-bold text-stone-800">{doc.lokasi}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-stone-200/80">
            <Calendar className="w-4 h-4 text-blue-700 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-stone-500 block text-[11px]">Waktu Pelaksanaan:</span>
              <span className="font-bold text-stone-800">{doc.waktuPelaksanaan}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-stone-200/80">
            <Coins className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-stone-500 block text-[11px]">Sumber Pendanaan:</span>
              <span className="font-bold text-stone-800">{doc.sumberPendanaan.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. TABS NAVIGASI LEMBAR DPPA */}
      {/* ============================================================ */}
      <div className="px-6 pt-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('rincian')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer border-b-2 inline-flex items-center gap-2 ${
              activeTab === 'rincian'
                ? 'border-emerald-800 text-emerald-900 bg-emerald-50/50'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Rincian Belanja Rekening</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
              {doc.rincianBelanja.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('indikator')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer border-b-2 inline-flex items-center gap-2 ${
              activeTab === 'indikator'
                ? 'border-emerald-800 text-emerald-900 bg-emerald-50/50'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Indikator & Tolak Ukur</span>
          </button>

          <button
            onClick={() => setActiveTab('kas-bulanan')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer border-b-2 inline-flex items-center gap-2 ${
              activeTab === 'kas-bulanan'
                ? 'border-emerald-800 text-emerald-900 bg-emerald-50/50'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Realisasi Belanja per Bulan</span>
          </button>

          <button
            onClick={() => setActiveTab('pengesahan')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer border-b-2 inline-flex items-center gap-2 ${
              activeTab === 'pengesahan'
                ? 'border-emerald-800 text-emerald-900 bg-emerald-50/50'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Pengesahan & Pejabat</span>
          </button>
        </div>

        {activeTab === 'rincian' && (
          <div className="pb-2 w-full sm:w-64">
            <input
              type="text"
              value={filterRekening}
              onChange={(e) => setFilterRekening(e.target.value)}
              placeholder="Cari kode rekening, barang, atau BBM..."
              className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* TAB 1: TABEL RINCIAN BELANJA (DPPA TABLE) */}
      {/* ============================================================ */}
      {activeTab === 'rincian' && (
        <div className="p-6 overflow-x-auto space-y-4">
          <div className="text-xs text-stone-500 flex items-center justify-between">
            <span>
              Menampilkan rincian perhitungan pergeseran anggaran belanja tahun 2026.
            </span>
            <span className="font-mono text-stone-700 font-semibold">
              Total Sub Kegiatan: <strong>{formatIDR(totalAnggaran)}</strong>
            </span>
          </div>

          <table className="w-full text-xs text-left border-collapse border border-stone-300">
            <thead>
              <tr className="bg-stone-100 text-stone-800 border-b border-stone-300">
                <th rowSpan={2} className="border border-stone-300 px-3 py-2 text-center font-bold">
                  Kode Rekening
                </th>
                <th rowSpan={2} className="border border-stone-300 px-3 py-2 font-bold min-w-[240px]">
                  Uraian & Rincian Perhitungan
                </th>
                <th colSpan={4} className="border border-stone-300 px-2 py-1 text-center font-bold bg-amber-50/60">
                  Sebelum Pergeseran
                </th>
                <th colSpan={4} className="border border-stone-300 px-2 py-1 text-center font-bold bg-emerald-50/60">
                  Setelah Pergeseran
                </th>
                <th rowSpan={2} className="border border-stone-300 px-3 py-2 text-right font-bold bg-stone-50">
                  Bertambah / (Berkurang)
                </th>
              </tr>
              <tr className="bg-stone-50 text-stone-700 border-b border-stone-300 text-[11px]">
                {/* Sebelum */}
                <th className="border border-stone-300 px-2 py-1 text-center">Volume</th>
                <th className="border border-stone-300 px-2 py-1 text-center">Satuan</th>
                <th className="border border-stone-300 px-2 py-1 text-right">Harga</th>
                <th className="border border-stone-300 px-2 py-1 text-right font-semibold">Jumlah (Rp)</th>
                {/* Setelah */}
                <th className="border border-stone-300 px-2 py-1 text-center">Volume</th>
                <th className="border border-stone-300 px-2 py-1 text-center">Satuan</th>
                <th className="border border-stone-300 px-2 py-1 text-right">Harga</th>
                <th className="border border-stone-300 px-2 py-1 text-right font-bold text-emerald-950">Jumlah (Rp)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 font-mono text-[11px]">
              {filteredItems.map((item) => {
                const isHeader = item.level <= 3;
                const isSubHeader = item.level === 4;
                const isChanged = item.bertambahBerkurang !== 0;

                return (
                  <tr 
                    key={item.id} 
                    className={`transition-colors ${
                      isHeader 
                        ? 'bg-stone-100/90 font-extrabold text-stone-900' 
                        : isSubHeader
                        ? 'bg-stone-50/70 font-bold text-stone-800'
                        : isChanged
                        ? 'bg-amber-50/40 hover:bg-amber-100/50'
                        : 'hover:bg-stone-50/80 text-stone-700'
                    }`}
                  >
                    {/* Kode Rekening */}
                    <td className="border border-stone-200 px-3 py-2 whitespace-nowrap align-top font-bold text-stone-800">
                      {item.kodeRekening}
                    </td>

                    {/* Uraian */}
                    <td className="border border-stone-200 px-3 py-2 align-top font-sans">
                      <div className={`${item.level >= 5 ? 'pl-4' : item.level === 4 ? 'pl-2' : ''}`}>
                        <span className={item.level <= 3 ? 'font-bold text-stone-950' : 'text-stone-800'}>
                          {item.uraian}
                        </span>
                        {item.spesifikasi && (
                          <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                            Spesifikasi: {item.spesifikasi}
                          </div>
                        )}
                        {item.sumberDana && (
                          <div className="text-[10px] font-bold text-emerald-800 inline-block bg-emerald-50 px-1.5 py-0.2 rounded mt-0.5 border border-emerald-200">
                            Sumber Dana: {item.sumberDana}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Sebelum */}
                    <td className="border border-stone-200 px-2 py-2 text-center align-top text-stone-600">
                      {item.koefisienSebelum || '-'}
                    </td>
                    <td className="border border-stone-200 px-2 py-2 text-center align-top text-stone-600">
                      {item.satuanSebelum || '-'}
                    </td>
                    <td className="border border-stone-200 px-2 py-2 text-right align-top text-stone-600">
                      {item.hargaSebelum ? formatIDR(item.hargaSebelum) : '-'}
                    </td>
                    <td className="border border-stone-200 px-2 py-2 text-right align-top font-semibold text-stone-800">
                      {formatIDR(item.jumlahSebelum)}
                    </td>

                    {/* Setelah */}
                    <td className="border border-stone-200 px-2 py-2 text-center align-top text-stone-800 font-medium">
                      {item.koefisienSetelah || '-'}
                    </td>
                    <td className="border border-stone-200 px-2 py-2 text-center align-top text-stone-800 font-medium">
                      {item.satuanSetelah || '-'}
                    </td>
                    <td className="border border-stone-200 px-2 py-2 text-right align-top text-stone-800 font-medium">
                      {item.hargaSetelah ? formatIDR(item.hargaSetelah) : '-'}
                    </td>
                    <td className="border border-stone-200 px-2 py-2 text-right align-top font-bold text-emerald-950 bg-emerald-50/20">
                      {formatIDR(item.jumlahSetelah)}
                    </td>

                    {/* Bertambah / Berkurang */}
                    <td className="border border-stone-200 px-3 py-2 text-right align-top font-bold">
                      {item.bertambahBerkurang > 0 ? (
                        <span className="text-emerald-700 inline-flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" />
                          +{formatIDR(item.bertambahBerkurang)}
                        </span>
                      ) : item.bertambahBerkurang < 0 ? (
                        <span className="text-rose-700 inline-flex items-center gap-0.5">
                          <TrendingDown className="w-3 h-3" />
                          ({formatIDR(Math.abs(item.bertambahBerkurang))})
                        </span>
                      ) : (
                        <span className="text-stone-400">Rp0,00</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-stone-900 text-white font-mono font-bold text-xs">
                <td colSpan={2} className="border border-stone-800 px-3 py-3 text-right uppercase tracking-wider font-sans">
                  Jumlah Anggaran Sub Kegiatan:
                </td>
                <td colSpan={4} className="border border-stone-800 px-3 py-3 text-right text-stone-200">
                  {formatIDR(totalAnggaran)}
                </td>
                <td colSpan={4} className="border border-stone-800 px-3 py-3 text-right text-emerald-300 text-sm">
                  {formatIDR(totalAnggaran)}
                </td>
                <td className="border border-stone-800 px-3 py-3 text-right text-stone-300">
                  Rp0,00
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: INDIKATOR DAN TOLAK UKUR KINERJA */}
      {/* ============================================================ */}
      {activeTab === 'indikator' && (
        <div className="p-6 space-y-6 text-xs">
          <div>
            <h4 className="font-bold text-stone-900 text-sm mb-1">
              Indikator dan Tolak Ukur Kinerja Kegiatan
            </h4>
            <p className="text-stone-500">
              Evaluasi perbandingan target kinerja sebelum dan setelah pergeseran anggaran.
            </p>
          </div>

          <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-800 border-b border-stone-200 text-left font-bold">
                  <th className="p-3 border-r border-stone-200">Indikator</th>
                  <th className="p-3 border-r border-stone-200">Tolak Ukur Kerja</th>
                  <th className="p-3 border-r border-stone-200 bg-amber-50/50">Target Sebelum</th>
                  <th className="p-3 bg-emerald-50/50">Target Setelah Pergeseran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr>
                  <td className="p-3 font-bold text-stone-900 border-r border-stone-200 bg-stone-50">
                    Capaian Kegiatan (Masukan)
                  </td>
                  <td className="p-3 border-r border-stone-200">
                    {doc.indikatorKinerja.masukan.tolakUkur}
                  </td>
                  <td className="p-3 font-mono font-semibold border-r border-stone-200 bg-amber-50/20">
                    {doc.indikatorKinerja.masukan.targetSebelum}
                  </td>
                  <td className="p-3 font-mono font-bold text-emerald-950 bg-emerald-50/30">
                    {doc.indikatorKinerja.masukan.targetSetelah}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-900 border-r border-stone-200 bg-stone-50">
                    Keluaran Kegiatan (Output)
                  </td>
                  <td className="p-3 border-r border-stone-200">
                    {doc.indikatorKinerja.keluaran.tolakUkur}
                  </td>
                  <td className="p-3 font-bold text-stone-800 border-r border-stone-200 bg-amber-50/20">
                    {doc.indikatorKinerja.keluaran.targetSebelum}
                  </td>
                  <td className="p-3 font-bold text-emerald-800 bg-emerald-50/30">
                    {doc.indikatorKinerja.keluaran.targetSetelah}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-900 border-r border-stone-200 bg-stone-50">
                    Hasil Kegiatan (Outcome)
                  </td>
                  <td className="p-3 border-r border-stone-200">
                    {doc.indikatorKinerja.hasil.tolakUkur}
                  </td>
                  <td className="p-3 font-bold text-stone-800 border-r border-stone-200 bg-amber-50/20">
                    {doc.indikatorKinerja.hasil.targetSebelum}
                  </td>
                  <td className="p-3 font-bold text-emerald-800 bg-emerald-50/30">
                    {doc.indikatorKinerja.hasil.targetSetelah}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-bold text-stone-900 block text-xs">
                Keluaran Sub Kegiatan:
              </span>
              <p className="text-stone-700 leading-relaxed">
                {doc.keluaranSubKegiatan}
              </p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-bold text-stone-900 block text-xs">
                Rincian Sumber Dana & Rekapitulasi:
              </span>
              <div className="space-y-1 text-[11px] text-stone-600">
                <div className="flex justify-between">
                  <span>Pendapatan Asli Daerah (PAD):</span>
                  <span className="font-mono font-bold text-stone-900">Rp34.248.000,00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dana Bagi Hasil (DBH):</span>
                  <span className="font-mono font-bold text-stone-900">Rp2.428.000,00</span>
                </div>
                <div className="flex justify-between">
                  <span>Pendapatan Bagi Hasil:</span>
                  <span className="font-mono font-bold text-stone-900">Rp7.079.322,00</span>
                </div>
                <div className="border-t border-stone-200 pt-1 flex justify-between font-bold text-emerald-950">
                  <span>Total Anggaran:</span>
                  <span className="font-mono">{formatIDR(doc.alokasiTahunBerjalan)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: RENCANA REALISASI BELANJA PER BULAN */}
      {/* ============================================================ */}
      {activeTab === 'kas-bulanan' && (
        <div className="p-6 space-y-6 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-bold text-stone-900 text-sm">
                Rencana Realisasi Belanja per Bulan (Cash Flow Anggaran Kas)
              </h4>
              <p className="text-stone-500">
                Jadwal penyerapan anggaran operasional dan pemeliharaan kendaraan dinas tahun 2026.
              </p>
            </div>
            <div className="text-right">
              <span className="text-stone-500 text-[11px]">Total Realisasi:</span>
              <div className="font-mono font-black text-emerald-900 text-sm">
                {formatIDR(doc.alokasiTahunBerjalan)}
              </div>
            </div>
          </div>

          {/* Grid Cards of 12 Months */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {doc.realisasiBulanan.map((m, idx) => {
              const pct = (m.nominal / totalAnggaran) * 100;
              const isHigh = m.nominal > 5000000;

              return (
                <div 
                  key={m.bulan}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isHigh 
                      ? 'bg-emerald-50/70 border-emerald-300 shadow-2xs' 
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-800 text-xs">
                      {idx + 1}. {m.bulan}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 font-semibold">
                      {pct.toFixed(1)}%
                    </span>
                  </div>
                  <div className="font-mono font-bold text-stone-900 mt-1.5 text-xs sm:text-sm">
                    {formatIDR(m.nominal)}
                  </div>
                  
                  {/* Mini Progress Bar */}
                  <div className="w-full bg-stone-200/80 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isHigh ? 'bg-emerald-600' : 'bg-stone-500'}`}
                      style={{ width: `${(m.nominal / maxBulan) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3 text-emerald-950">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Puncak Penyerapan Kas:</span>
              Penyerapan anggaran tertinggi terdapat pada bulan <strong>Maret ({formatIDR(9662000)})</strong>, <strong>Juni ({formatIDR(8600000)})</strong>, dan <strong>Oktober ({formatIDR(7131997)})</strong> sesuai jadwal perawatan berkala, pembayaran pajak kendaraan dinas tahunan, dan kebutuhan logistik operasional pertanian.
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: LEMBAR PENGESAHAN & PEJABAT */}
      {/* ============================================================ */}
      {activeTab === 'pengesahan' && (
        <div className="p-6 sm:p-8 space-y-8 text-xs">
          <div>
            <h4 className="font-bold text-stone-900 text-sm">
              Lembar Pengesahan Pejabat Pengelola Keuangan Daerah (PPKD)
            </h4>
            <p className="text-stone-500">
              Dokumen ini telah disetujui dan ditandatangani secara resmi sesuai ketentuan perundang-undangan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Pejabat Pelaksana */}
            <div className="border border-stone-200 rounded-3xl p-6 bg-stone-50/50 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-stone-500 block text-[11px]">Pejabat Pelaksana Teknis:</span>
                <span className="font-bold text-stone-900 text-sm">
                  {doc.penandatangan.pejabatPelaksana.jabatan || 'Pejabat Pelaksana Teknis Kegiatan (PPTK)'}
                </span>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Dinas Tanaman Pangan, Hortikultura dan Perkebunan
                </div>
              </div>

              <div className="py-6 border-y border-dashed border-stone-200 text-center text-stone-400">
                <span className="text-[11px] font-mono">[ Tanda Tangan Digital Tersertifikasi BSrE ]</span>
              </div>

              <div>
                <div className="font-bold text-stone-900 text-sm tracking-tight">
                  {doc.penandatangan.pejabatPelaksana.nama}
                </div>
                <div className="font-mono text-stone-600 text-xs">
                  NIP. {doc.penandatangan.pejabatPelaksana.nip}
                </div>
              </div>
            </div>

            {/* PPKD Pengesah */}
            <div className="border border-emerald-200 rounded-3xl p-6 bg-emerald-50/30 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-emerald-800 font-bold block text-[11px]">Mengesahkan:</span>
                <span className="font-bold text-stone-900 text-sm">
                  {doc.penandatangan.ppkd.jabatan || 'Pejabat Pengelola Keuangan Daerah (PPKD)'}
                </span>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Pemerintah Kabupaten Timor Tengah Selatan
                </div>
              </div>

              <div className="py-6 border-y border-dashed border-emerald-200 text-center text-emerald-800 font-bold">
                <div className="w-8 h-8 rounded-full bg-emerald-100 mx-auto flex items-center justify-center text-emerald-700 mb-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono">[ Terverifikasi & Disahkan PPKD ]</span>
              </div>

              <div>
                <div className="font-bold text-stone-900 text-sm tracking-tight">
                  {doc.penandatangan.ppkd.nama}
                </div>
                <div className="font-mono text-stone-600 text-xs">
                  NIP. {doc.penandatangan.ppkd.nip}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-stone-100 rounded-2xl text-stone-600 text-[11px] leading-relaxed">
            <strong>Catatan Keabsahan:</strong> Formulir DPPA ini merupakan dokumen sah penjabaran APBD Kabupaten Timor Tengah Selatan Tahun Anggaran 2026 yang mengikat secara administratif dalam pelaksanaan belanja barang, jasa, dan pemeliharaan BMD dinas.
          </div>
        </div>
      )}

    </div>
  );
};
