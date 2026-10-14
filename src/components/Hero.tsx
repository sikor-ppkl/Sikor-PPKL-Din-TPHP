import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Sprout, 
  FileCheck2, 
  Layers, 
  TrendingUp,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { SectionId } from '../types';
import heroBgImage from '../assets/images/hero_kantor_tts_1790151303674.jpg';

interface HeroProps {
  onNavigate: (sectionId: SectionId, extraTarget?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative bg-emerald-950 text-white overflow-hidden">
      {/* Background Image: Kantor Pemda / Kompleks Gabungan Dinas Kab. Timor Tengah Selatan */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgImage}
          alt="Kantor Bupati & Kompleks Pemerintahan Kabupaten Timor Tengah Selatan"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center sm:object-[center_35%] scale-100 transform transition-transform duration-1000"
        />
        {/* Architectural Vignette Overlay: Allows building domes to be recognized while keeping text WCAG-compliant */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/85 to-emerald-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl">
          
          {/* Government Department Badge */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-emerald-900/90 border border-emerald-600/50 text-emerald-200 text-xs sm:text-sm font-medium mb-6 backdrop-blur-xs shadow-sm">
            <img 
              src="/logo-tts.png" 
              alt="Lambang Kabupaten Timor Tengah Selatan" 
              className="w-5 h-6 object-contain flex-shrink-0 drop-shadow" 
            />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>Pemerintah Daerah Kabupaten Timor Tengah Selatan</span>
            <span className="text-emerald-400 hidden sm:inline">·</span>
            <span className="text-amber-300 font-semibold hidden sm:inline">Provinsi Nusa Tenggara Timur</span>
          </div>

          {/* Main Title SIKOR PPKL */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-3">
            SIKOR <span className="text-amber-400">PPKL</span>
          </h1>

          {/* Kepanjangan / Meaning */}
          <div className="text-lg sm:text-xl font-semibold text-emerald-200 mb-4 tracking-wide flex items-center gap-2">
            <span className="w-6 h-0.5 bg-amber-400 inline-block"></span>
            <span>Sistem Koordinasi Perencanaan Program Kegiatan dan Pelaporan</span>
          </div>

          {/* Sub-judul Instansi */}
          <p className="text-base sm:text-lg text-emerald-100/90 font-medium mb-8 leading-relaxed">
            Dinas Tanaman Pangan, Hortikultura, dan Perkebunan Kabupaten Timor Tengah Selatan. 
            Wadah terintegrasi satu data perencanaan, sinergi 5 bidang kerja, dan akuntabilitas pelaporan pertanian dari 32 kecamatan.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={() => onNavigate('bidang')}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-sm sm:text-base shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Jelajahi Program</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate('sikor-ppkl')}
              className="px-6 py-3.5 rounded-xl bg-emerald-800/90 hover:bg-emerald-700/90 text-white font-semibold text-sm sm:text-base border border-emerald-500/40 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 text-amber-400" />
              <span>Akses Modul SIKOR</span>
            </button>

            <button
              onClick={() => onNavigate('kontak')}
              className="px-5 py-3.5 rounded-xl bg-transparent hover:bg-emerald-900/60 text-emerald-200 hover:text-white font-semibold text-sm sm:text-base border border-emerald-600/30 transition-all cursor-pointer"
            >
              <span>Hubungi Kami</span>
            </button>
          </div>

          {/* Clean Unboxed Statistics Bar (Zero-pill discipline adhered to) */}
          <div className="pt-8 border-t border-emerald-800/60 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">32</div>
              <div className="text-xs sm:text-sm text-emerald-200/80 font-medium mt-0.5">Kecamatan Binaan</div>
              <div className="text-[11px] text-emerald-400/80 mt-1">Terhubung di BPP</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">1.450+</div>
              <div className="text-xs sm:text-sm text-emerald-200/80 font-medium mt-0.5">Kelompok Tani</div>
              <div className="text-[11px] text-emerald-400/80 mt-1">Poktan & Gapoktan TTS</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">5 Bidang</div>
              <div className="text-xs sm:text-sm text-emerald-200/80 font-medium mt-0.5">Unit Kerja Terpadu</div>
              <div className="text-[11px] text-emerald-400/80 mt-1">Sinkronisasi Renja</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">94.2%</div>
              <div className="text-xs sm:text-sm text-emerald-200/80 font-medium mt-0.5">Realisasi Target</div>
              <div className="text-[11px] text-emerald-400/80 mt-1">Pelaporan DPA 2026</div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Wave/Bottom Curve */}
      <div className="relative h-6 sm:h-10 bg-stone-50">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute top-0 w-full h-6 sm:h-10 text-emerald-950 fill-current -translate-y-[99%]"
        >
          <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,20 1200,60 L1200,0 L0,0 Z" />
        </svg>
      </div>
    </section>
  );
};
