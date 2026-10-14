import React from 'react';
import { Award, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';
import { SectionId } from '../types';

interface WelcomeSpeechProps {
  onNavigate: (sectionId: SectionId) => void;
}

export const WelcomeSpeech: React.FC<WelcomeSpeechProps> = ({ onNavigate }) => {
  return (
    <section className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 sm:p-12">
          
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>Pengantar Resmi Instansi</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-4">
            Mewujudkan Kemandirian Pangan & Akuntabilitas Lewat SIKOR PPKL
          </h2>

          <div className="text-stone-700 leading-relaxed text-sm sm:text-base italic mb-6 pl-4 border-l-3 border-emerald-600">
            "Shalom, Salve, Assalamu'alaikum Wr. Wb. Selamat datang di portal resmi Sistem Koordinasi Perencanaan Program Kegiatan dan Pelaporan (SIKOR PPKL) Dinas Tanaman Pangan, Hortikultura, dan Perkebunan Kabupaten Timor Tengah Selatan."
          </div>

          <p className="text-stone-600 leading-relaxed text-sm sm:text-base mb-6">
            Melalui sistem digital SIKOR PPKL ini, kami mengintegrasikan lima pilar kerja utama—Sekretariat, Tanaman Pangan, Hortikultura, Perkebunan, serta Prasarana dan Sarana Pertanian—agar setiap alokasi anggaran, bantuan bibit, dan alsintan benar-benar termonitor serta memberikan dampak nyata bagi kesejahteraan para petani di Bumi Cendana.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 pt-2">
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Sinkronisasi target DPA dan Renja di 32 Balai Penyuluhan Pertanian secara tepat waktu.</span>
            </div>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Transparansi penyaluran benih unggul bersertifikat dan pupuk bersubsidi tepat sasaran.</span>
            </div>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Pelaporan realisasi fisik dan keuangan terintegrasi yang akuntabel dan transparan.</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-stone-100">
            <button
              onClick={() => onNavigate('visi-misi')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-4 cursor-pointer"
            >
              <span>Pelajari Visi & Misi Dinas</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-stone-300">|</span>
            <button
              onClick={() => onNavigate('struktur-organisasi')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-stone-900 underline underline-offset-4 cursor-pointer"
            >
              <span>Lihat Struktur Organisasi</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
