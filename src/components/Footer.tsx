import React from 'react';
import { SectionId } from '../types';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  ArrowUp, 
  Wheat,
  Share2
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: SectionId, extraTarget?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900">
      
      {/* Upper Footer: Branding & Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Col 1 & 2: Branding & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-14 flex items-center justify-center flex-shrink-0">
                <img 
                  src="/logo-tts.png" 
                  alt="Lambang Daerah Kabupaten Timor Tengah Selatan" 
                  className="w-full h-full object-contain drop-shadow-md" 
                />
              </div>
              <div>
                <div className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                  SIKOR <span className="text-amber-400">PPKL</span>
                </div>
                <div className="text-xs text-emerald-300 font-medium">
                  Kabupaten Timor Tengah Selatan
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed max-w-md">
              Sistem Koordinasi Perencanaan Program Kegiatan dan Pelaporan pada Dinas Tanaman Pangan, Hortikultura, dan Perkebunan Kabupaten Timor Tengah Selatan, Provinsi Nusa Tenggara Timur.
            </p>

            <div className="pt-2 text-xs text-emerald-300/80 space-y-1">
              <div>Kompleks Kantor Bupati TTS, Jl. Basuki Rahmat No. 1, Kota Soe</div>
              <div>Hotline BPP & Dinas: (0388) 21045 · disperkutan@ttskab.go.id</div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-2 text-xs">
              <span className="text-emerald-300 font-semibold mr-1">Kanal Resmi:</span>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="px-2.5 py-1 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 rounded text-xs transition-colors"
              >
                Facebook Dinas
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="px-2.5 py-1 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 rounded text-xs transition-colors"
              >
                YouTube Penyuluhan
              </a>
            </div>
          </div>

          {/* Col 3: Navigasi Menu */}
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">
              Navigasi Cepat
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-200/90">
              <li>
                <button 
                  onClick={() => onNavigate('beranda')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Beranda (Home)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('visi-misi')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Visi dan Misi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('struktur-organisasi')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Struktur Organisasi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('sikor-ppkl')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Modul SIKOR PPKL
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('kontak')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kontak & Lokasi Kantor
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Bidang & Unit Kerja */}
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">
              Bidang & Unit Kerja
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-200/90">
              <li>
                <button 
                  onClick={() => onNavigate('sekretariat')} 
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>Sekretariat Dinas (6 Menu)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('bidang', 'tanaman-pangan')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Bidang Tanaman Pangan
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('bidang', 'hortikultura')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Bidang Hortikultura
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('bidang', 'perkebunan')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Bidang Perkebunan
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('bidang', 'psp')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Bidang PSP (Sarana & Prasarana)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Tautan Eksternal Pemerintah */}
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">
              Tautan Terkait
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-200/90">
              <li>
                <a 
                  href="https://ttskab.go.id" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Portal Pemkab TTS</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://pertanian.go.id" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Kementerian Pertanian RI</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://nttprov.go.id" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Pemerintah Provinsi NTT</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://ttskab.bps.go.id" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>BPS Kabupaten TTS</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar / Copyright */}
      <div className="bg-emerald-950/90 border-t border-emerald-900/60 py-5 text-xs text-emerald-300/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            Hak Cipta © {new Date().getFullYear()} Dinas Tanaman Pangan, Hortikultura, dan Perkebunan Kabupaten Timor Tengah Selatan. Semua Hak Dilindungi.
          </div>

          <div className="flex items-center gap-4">
            <span>Sistem Informasi Publik Resmi</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-amber-300 transition-colors cursor-pointer flex items-center gap-1 font-semibold"
              title="Kembali ke atas"
            >
              <span>Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
