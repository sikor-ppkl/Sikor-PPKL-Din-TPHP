import React from 'react';
import { VISI_MISI } from '../data/mockData';
import { 
  Compass, 
  Target, 
  TrendingUp, 
  HeartHandshake, 
  Lightbulb, 
  CheckCircle2, 
  Sprout, 
  Wrench, 
  GraduationCap, 
  Store,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const VisiMisiSection: React.FC = () => {
  return (
    <section id="visi-misi" className="py-16 sm:py-24 bg-white border-b border-stone-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>Landasan Kebijakan & Rencana Strategis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4">
            Visi, Misi, Tujuan & Strategi Dinas
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Kerangka perencanaan strategis Dinas Tanaman Pangan, Hortikultura, dan Perkebunan Kabupaten Timor Tengah Selatan dalam mendukung percepatan pembangunan daerah.
          </p>
        </div>

        {/* 1. VISI & 2. MISI Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* 1. VISI KABUPATEN TTS */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-2xl p-7 sm:p-9 text-white flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-emerald-700/20 blur-xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">
                <span className="w-6 h-6 rounded-md bg-amber-400 text-emerald-950 flex items-center justify-center font-black text-xs">
                  1
                </span>
                <span>Visi Daerah</span>
              </div>

              <div className="text-xs text-emerald-200/90 font-medium mb-4">
                {VISI_MISI.visi.kicker}
              </div>

              <blockquote className="text-xl sm:text-2xl font-extrabold leading-snug text-white mb-6">
                "{VISI_MISI.visi.pernyataan}"
              </blockquote>
            </div>

            <div className="pt-5 border-t border-emerald-800/80 text-xs text-emerald-200/80 leading-relaxed">
              Visi kepemimpinan daerah menjadi kompas utama seluruh program perencanaan dan pelaporan (SIKOR PPKL) di Kabupaten Timor Tengah Selatan.
            </div>
          </div>

          {/* 2. MISI KE-3 PEMDA KAB. TTS */}
          <div className="lg:col-span-7 bg-stone-50 rounded-2xl p-7 sm:p-9 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                <span className="w-6 h-6 rounded-md bg-emerald-800 text-amber-300 flex items-center justify-center font-black text-xs">
                  2
                </span>
                <span>Misi Pengampu Dinas (Misi Ke-3)</span>
              </div>

              <p className="text-xs text-stone-500 mb-4">
                {VISI_MISI.misi.kicker}
              </p>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs mb-5">
                <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
                  Pernyataan Misi:
                </div>
                <div className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                  "{VISI_MISI.misi.pernyataanUtama}"
                </div>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200/70 p-4 rounded-xl text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
                <span className="font-semibold text-emerald-900">Konteks Strategi: </span>
                <span className="italic font-medium">"{VISI_MISI.misi.rumusanStrategis}"</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {VISI_MISI.misi.penjelasan}
              </p>
            </div>
          </div>

        </div>

        {/* 3. TUJUAN & 4. SASARAN DINAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          
          {/* 3. TUJUAN DINAS */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm hover:border-emerald-300 transition-colors flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-base shadow-xs">
              3
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tujuan Dinas</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-tight">
                "{VISI_MISI.tujuanDinas}"
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-2 leading-relaxed">
                Mendorong akselerasi kontribusi sektor tanaman pangan, hortikultura, dan perkebunan sebagai pilar utama perekonomian daerah Timor Tengah Selatan.
              </p>
            </div>
          </div>

          {/* 4. SASARAN DINAS */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm hover:border-emerald-300 transition-colors flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-base shadow-xs">
              4
            </div>
            <div>
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                <span>Sasaran Dinas</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                "{VISI_MISI.sasaranDinas}"
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-2 leading-relaxed">
                Fokus langsung pada peningkatan taraf hidup dan pendapatan keluarga tani di 32 kecamatan se-Kabupaten TTS melalui hasil panen yang berdaya saing.
              </p>
            </div>
          </div>

        </div>

        {/* 5. STRATEGI DAN ARAH KEBIJAKAN */}
        <div className="bg-stone-50 rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm">
          
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
            <span className="w-6 h-6 rounded-md bg-stone-900 text-white flex items-center justify-center font-black text-xs">
              5
            </span>
            <span>Rencana Tindak Operasional</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
            Strategi dan Arah Kebijakan Dinas
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm mb-8 max-w-3xl leading-relaxed">
            Langkah terstruktur yang diimplementasikan oleh seluruh bidang teknis (Sekretariat, Tanaman Pangan, Hortikultura, Perkebunan, dan PSP) dalam kerangka sistem SIKOR PPKL.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Bagian A: STRATEGI */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-950 pb-2 border-b border-stone-200">
                <Layers className="w-4 h-4 text-emerald-700" />
                <span>A. Strategi Pelaksanaan</span>
              </div>

              <div className="space-y-3">
                {VISI_MISI.strategi.map((item, idx) => {
                  const icons = [
                    <Sprout className="w-4 h-4 text-emerald-700" />,
                    <Wrench className="w-4 h-4 text-amber-700" />,
                    <GraduationCap className="w-4 h-4 text-blue-700" />,
                    <Store className="w-4 h-4 text-purple-700" />
                  ];

                  return (
                    <div 
                      key={idx} 
                      className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 hover:border-emerald-300 transition-colors shadow-2xs"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center">
                          {icons[idx] || <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        </div>
                        <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-9">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bagian B: ARAH KEBIJAKAN */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-950 pb-2 border-b border-stone-200">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>B. Arah Kebijakan</span>
              </div>

              <div className="space-y-3">
                {VISI_MISI.arahKebijakan.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 hover:border-amber-300 transition-colors shadow-2xs"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                        B.{idx + 1}
                      </div>
                      <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-9">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Informative Note Box */}
              <div className="bg-emerald-900 text-white rounded-xl p-4 text-xs leading-relaxed flex items-start gap-3 mt-4 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-300 mb-0.5">Integrasi Sistem SIKOR PPKL</div>
                  <span>Seluruh strategi dan arah kebijakan di atas diterjemahkan ke dalam target kinerja DPA Renja tahunan dan dimonitor melalui modul pelaporan digital triwulanan.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
