import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  Mail, 
  Clock, 
  Building2, 
  Wheat, 
  Apple, 
  Coffee, 
  Wrench, 
  FileText, 
  Users, 
  Compass,
  ArrowRight,
  FolderKanban,
  CalendarCheck,
  Receipt,
  Boxes,
  BarChart3
} from 'lucide-react';
import { SectionId } from '../types';
import { SEKRETARIAT_MENUS } from '../data/mockData';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (sectionId: SectionId, extraTarget?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profilDropdownOpen, setProfilDropdownOpen] = useState(false);
  const [bidangDropdownOpen, setBidangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: SectionId, extraTarget?: string) => {
    onNavigate(sectionId, extraTarget);
    setMobileMenuOpen(false);
    setProfilDropdownOpen(false);
    setBidangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200">
      {/* Top Bar - Formal Government Bar */}
      <div className="bg-emerald-950 text-emerald-100/90 text-xs border-b border-emerald-800/40 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Pemerintah Kabupaten Timor Tengah Selatan (TTS) · Nusa Tenggara Timur</span>
            </div>
            <div className="hidden lg:flex items-center gap-4 text-emerald-200/80">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Senin - Jumat 07.30 - 16.00 WITA</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>(0388) 21045</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="mailto:disperkutan@ttskab.go.id" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>disperkutan@ttskab.go.id</span>
            </a>
            <span className="text-emerald-700">|</span>
            <span className="text-amber-400 font-semibold tracking-wide">SIKOR PPKL v2.6</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className={`w-full bg-white transition-all duration-200 ${
        isScrolled 
          ? 'shadow-md border-b border-stone-200 py-2.5' 
          : 'border-b border-stone-200/80 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Official Emblem & Branding */}
          <button 
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3.5 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-lg p-1"
          >
            {/* Logo Emblem TTS */}
            <div className="relative flex-shrink-0 w-11 h-12 sm:w-12 sm:h-13 flex items-center justify-center p-0.5">
              <img 
                src="/logo-tts.png" 
                alt="Lambang Daerah Kabupaten Timor Tengah Selatan" 
                className="w-full h-full object-contain drop-shadow-sm filter transition-transform group-hover:scale-105" 
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-emerald-900 group-hover:text-emerald-700 transition-colors">
                  SIKOR PPKL
                </span>
                <span className="hidden sm:inline-block text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300/80">
                  KAB. TTS
                </span>
              </div>
              <p className="text-xs sm:text-[13px] font-medium text-stone-600 line-clamp-1 group-hover:text-stone-800 transition-colors">
                Dinas Tanaman Pangan, Hortikultura, dan Perkebunan
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1 font-medium text-sm text-stone-700">
            {/* Beranda */}
            <button
              onClick={() => handleNavClick('beranda')}
              className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${
                activeSection === 'beranda'
                  ? 'text-emerald-800 font-semibold bg-emerald-50'
                  : 'hover:text-emerald-800 hover:bg-stone-50'
              }`}
            >
              Beranda
            </button>

            {/* Profil Instansi Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfilDropdownOpen(!profilDropdownOpen);
                  setBidangDropdownOpen(false);
                }}
                className={`px-3 py-2 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeSection === 'profil' || activeSection === 'visi-misi' || activeSection === 'struktur-organisasi'
                    ? 'text-emerald-800 font-semibold bg-emerald-50'
                    : 'hover:text-emerald-800 hover:bg-stone-50'
                }`}
              >
                <span>Profil Instansi</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${profilDropdownOpen ? 'rotate-180 text-emerald-700' : ''}`} />
              </button>

              {profilDropdownOpen && (
                <div 
                  className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setProfilDropdownOpen(false)}
                >
                  <button
                    onClick={() => handleNavClick('visi-misi')}
                    className="w-full text-left px-4 py-2.5 text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-3 text-sm cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-stone-900">Visi dan Misi</div>
                      <div className="text-xs text-stone-500">Arah strategi pembangunan pertanian TTS</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('struktur-organisasi')}
                    className="w-full text-left px-4 py-2.5 text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-3 text-sm cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-stone-900">Struktur Organisasi</div>
                      <div className="text-xs text-stone-500">Bagan tata kelola & jajaran pimpinan</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Bidang & Unit Kerja Dropdown & Direct Link */}
            <div 
              className="relative"
              onMouseEnter={() => setBidangDropdownOpen(true)}
              onMouseLeave={() => setBidangDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('bidang')}
                className={`px-3 py-2 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeSection === 'bidang' || activeSection === 'sekretariat'
                    ? 'text-emerald-800 font-semibold bg-emerald-50'
                    : 'hover:text-emerald-800 hover:bg-stone-50'
                }`}
                title="Pilih untuk langsung masuk ke Menu Bidang"
              >
                <span>Bidang</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${bidangDropdownOpen ? 'rotate-180 text-emerald-700' : ''}`} />
              </button>

              {bidangDropdownOpen && (
                <div 
                  className="absolute left-0 mt-1 w-96 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  {/* Direct button to enter Bidang section */}
                  <button
                    onClick={() => handleNavClick('bidang')}
                    className="w-full text-left px-3 py-2.5 mb-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white flex items-center justify-between text-xs font-bold shadow-2xs cursor-pointer transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-amber-300" />
                      <span>Masuk ke Menu Bidang (Semua Unit Kerja)</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </button>

                  {/* Sekretariat Group with 6 Sub-Menus */}
                  <div className="bg-stone-50 rounded-xl p-2.5 mb-1.5 border border-stone-200/80">
                    <button
                      onClick={() => handleNavClick('sekretariat', 'data-asn')}
                      className="w-full text-left p-2 rounded-lg hover:bg-white text-stone-700 hover:text-emerald-900 flex items-center justify-between text-sm cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-stone-900 flex items-center gap-1.5">
                            <span>Sekretariat Dinas</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                              6 Menu
                            </span>
                          </div>
                          <div className="text-xs text-stone-500">Administrasi, Keuangan, Aset & SDM</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-700" />
                    </button>

                    {/* Sub-menu grid */}
                    <div className="grid grid-cols-2 gap-1 mt-2 pt-2 border-t border-stone-200/70">
                      {SEKRETARIAT_MENUS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => handleNavClick('sekretariat', m.id)}
                          className="text-left px-2 py-1 rounded-md text-[11px] font-semibold text-stone-600 hover:text-emerald-950 hover:bg-emerald-100/60 transition-colors flex items-center justify-between"
                        >
                          <span className="truncate">{m.title}</span>
                          <span className="text-[9px] text-stone-400">›</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="px-1 py-1 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Bidang Teknis Dinas:
                  </div>

                  <button
                    onClick={() => handleNavClick('bidang', 'tanaman-pangan')}
                    className="w-full text-left px-3 py-2 rounded-lg text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-3 text-sm cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 flex-shrink-0">
                      <Wheat className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900 text-xs sm:text-sm">Bidang Tanaman Pangan</div>
                      <div className="text-[11px] text-stone-500">Jagung Bose, Padi, & Aneka Kacang</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('bidang', 'hortikultura')}
                    className="w-full text-left px-3 py-2 rounded-lg text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-3 text-sm cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 flex-shrink-0">
                      <Apple className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900 text-xs sm:text-sm">Bidang Hortikultura</div>
                      <div className="text-[11px] text-stone-500">Jeruk Keprok Soe & Sayuran Mollo</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('bidang', 'perkebunan')}
                    className="w-full text-left px-3 py-2 rounded-lg text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-3 text-sm cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-900 flex-shrink-0">
                      <Coffee className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900 text-xs sm:text-sm">Bidang Perkebunan</div>
                      <div className="text-[11px] text-stone-500">Kopi Mutis, Kemiri, & Kelapa</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('bidang', 'psp')}
                    className="w-full text-left px-3 py-2 rounded-lg text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-3 text-sm cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center text-teal-800 flex-shrink-0">
                      <Wrench className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900 text-xs sm:text-sm">Bidang PSP</div>
                      <div className="text-[11px] text-stone-500">Alsintan, Embung & Pupuk Bersubsidi</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* SIKOR PPKL Menu Tab */}
            <button
              onClick={() => handleNavClick('sikor-ppkl')}
              className={`px-3 py-2 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'sikor-ppkl'
                  ? 'text-emerald-800 font-semibold bg-emerald-50'
                  : 'hover:text-emerald-800 hover:bg-stone-50'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>Modul SIKOR PPKL</span>
            </button>

            {/* Kontak Kami */}
            <button
              onClick={() => handleNavClick('kontak')}
              className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${
                activeSection === 'kontak'
                  ? 'text-emerald-800 font-semibold bg-emerald-50'
                  : 'hover:text-emerald-800 hover:bg-stone-50'
              }`}
            >
              Kontak Kami
            </button>
          </nav>

          {/* Call-To-Action Right Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('sikor-ppkl')}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600"
            >
              <span>Akses SIKOR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex xl:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-emerald-800 hover:bg-stone-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-700"
              aria-label="Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-stone-200 shadow-xl px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('beranda')}
              className={`w-full text-left px-3 py-2.5 rounded-lg font-medium text-sm flex items-center justify-between ${
                activeSection === 'beranda' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-stone-700'
              }`}
            >
              <span>Beranda (Home)</span>
            </button>

            {/* Mobile Profil Section */}
            <div className="pt-2 pb-1 border-t border-stone-100">
              <div className="px-3 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                Profil Instansi
              </div>
              <button
                onClick={() => handleNavClick('visi-misi')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>Visi dan Misi</span>
              </button>
              <button
                onClick={() => handleNavClick('struktur-organisasi')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Struktur Organisasi</span>
              </button>
            </div>

            {/* Mobile Bidang Section */}
            <div className="pt-2 pb-1 border-t border-stone-100">
              <div className="px-3 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1 flex items-center justify-between">
                <span>Menu Bidang & Unit Kerja</span>
              </div>

              {/* Direct button to open Bidang immediately */}
              <button
                onClick={() => handleNavClick('bidang')}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm mb-2 flex items-center justify-between transition-colors cursor-pointer ${
                  activeSection === 'bidang'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-emerald-100/80 text-emerald-950 hover:bg-emerald-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-500" />
                  <span>Buka Menu Bidang (5 Unit Dinas)</span>
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Sekretariat Mobile Card with 6 sub-menus */}
              <div className="bg-stone-50 rounded-xl p-2.5 mb-2 border border-stone-200">
                <button
                  onClick={() => handleNavClick('sekretariat', 'data-asn')}
                  className="w-full text-left font-bold text-sm text-stone-900 flex items-center justify-between py-1"
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-800" />
                    <span>Sekretariat Dinas</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    6 Modul
                  </span>
                </button>
                <div className="grid grid-cols-2 gap-1.5 mt-2 pt-2 border-t border-stone-200">
                  {SEKRETARIAT_MENUS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleNavClick('sekretariat', m.id)}
                      className="text-left px-2 py-1 rounded bg-white text-[11px] font-medium text-stone-700 hover:text-emerald-800 border border-stone-200/60 truncate"
                    >
                      {m.title}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleNavClick('bidang', 'tanaman-pangan')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2"
              >
                <Wheat className="w-4 h-4 text-emerald-600" />
                <span>Bidang Tanaman Pangan</span>
              </button>
              <button
                onClick={() => handleNavClick('bidang', 'hortikultura')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2"
              >
                <Apple className="w-4 h-4 text-amber-600" />
                <span>Bidang Hortikultura</span>
              </button>
              <button
                onClick={() => handleNavClick('bidang', 'perkebunan')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2"
              >
                <Coffee className="w-4 h-4 text-amber-800" />
                <span>Bidang Perkebunan</span>
              </button>
              <button
                onClick={() => handleNavClick('bidang', 'psp')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2"
              >
                <Wrench className="w-4 h-4 text-teal-600" />
                <span>Bidang Prasarana dan Sarana Pertanian (PSP)</span>
              </button>
            </div>

            {/* Mobile SIKOR & Kontak */}
            <div className="pt-2 pb-1 border-t border-stone-100">
              <button
                onClick={() => handleNavClick('sikor-ppkl')}
                className={`w-full text-left px-3 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 ${
                  activeSection === 'sikor-ppkl' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-stone-700'
                }`}
              >
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>Modul Perencanaan & Pelaporan SIKOR</span>
              </button>
              <button
                onClick={() => handleNavClick('kontak')}
                className={`w-full text-left px-3 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 ${
                  activeSection === 'kontak' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-stone-700'
                }`}
              >
                <Phone className="w-4 h-4 text-stone-600" />
                <span>Kontak Kami & Lokasi Kantor</span>
              </button>
            </div>

            <div className="pt-3">
              <button
                onClick={() => handleNavClick('sikor-ppkl')}
                className="w-full bg-emerald-700 text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Buka Modul SIKOR PPKL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
