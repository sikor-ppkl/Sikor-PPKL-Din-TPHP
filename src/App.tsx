/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SectionId, SekretariatTabId } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BidangSection } from './components/BidangSection';
import { VisiMisiSection } from './components/VisiMisiSection';
import { StrukturOrganisasiSection } from './components/StrukturOrganisasiSection';
import { SikorModuleSection } from './components/SikorModuleSection';
import { SekretariatSection } from './components/SekretariatSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ArrowLeft, Home, ChevronRight, FileCheck2, Users, Compass, PhoneCall, Building2 } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('beranda');
  const [targetBidangId, setTargetBidangId] = useState<string | null>(null);
  const [targetBidangSubMenuId, setTargetBidangSubMenuId] = useState<string | null>(null);
  const [sikorBidangFilter, setSikorBidangFilter] = useState<string | null>(null);
  const [sekretariatTab, setSekretariatTab] = useState<SekretariatTabId>('data-asn');

  const handleNavigate = (sectionId: SectionId, extraTarget?: string) => {
    // If target is profil, direct to visi-misi
    let resolvedSection: SectionId = sectionId === 'profil' ? 'visi-misi' : sectionId;

    if (resolvedSection === 'bidang' && extraTarget === 'sekretariat') {
      resolvedSection = 'sekretariat';
    }

    if (resolvedSection === 'sekretariat' && extraTarget) {
      const validTabs: SekretariatTabId[] = [
        'data-asn',
        'program-kegiatan',
        'rencana-realisasi',
        'laporan-pad',
        'aset',
        'fisik-keuangan'
      ];
      if (validTabs.includes(extraTarget as SekretariatTabId)) {
        setSekretariatTab(extraTarget as SekretariatTabId);
      }
    }

    if (resolvedSection === 'bidang') {
      if (extraTarget && extraTarget !== 'sekretariat') {
        if (extraTarget.includes(':')) {
          const [bId, subId] = extraTarget.split(':');
          setTargetBidangId(bId);
          setTargetBidangSubMenuId(subId);
        } else {
          setTargetBidangId(extraTarget);
          setTargetBidangSubMenuId(null);
        }
      } else {
        setTargetBidangId(null);
        setTargetBidangSubMenuId(null);
      }
    }

    setActiveSection(resolvedSection);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreSikorWithFilter = (bidangName: string) => {
    setSikorBidangFilter(bidangName);
    setActiveSection('sikor-ppkl');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      {/* Official Government Navbar */}
      <Navbar 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
      />

      {/* Main Content Area: Multi-view System */}
      <main className="flex-1">
        
        {/* ============================================================ */}
        {/* 1. TAMPILAN BERANDA (HOME) */}
        {/* Menampilkan: Hero Section + Portal Hub Navigasi Cepat */}
        {/* Data modul satu data, struktur organisasi, visi misi,       */}
        {/* pengantar resmi, dan menu bidang diakses mandiri via menu   */}
        {/* ============================================================ */}
        {activeSection === 'beranda' && (
          <div className="animate-in fade-in duration-200">
            {/* Hero Section */}
            <Hero onNavigate={handleNavigate} />

            {/* Quick Access Card Portal Hub di Bagian Bawah Beranda */}
            <section className="py-12 bg-white border-t border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 rounded-2xl p-6 sm:p-10 text-white shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>Sistem Informasi Terpadu</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                      Akses Data & Koordinasi SIKOR PPKL
                    </h3>
                    <p className="text-emerald-200/90 text-xs sm:text-sm leading-relaxed">
                      Kunjungi menu bidang kerja teknis dinas, modul pelaporan perencanaan kegiatan (DPA/Renja) 32 kecamatan, atau hubungi layanan pengaduan dan aspirasi Dinas Pertanian Kab. TTS.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <button
                      onClick={() => handleNavigate('bidang')}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Menu Bidang Dinas</span>
                    </button>
                    <button
                      onClick={() => handleNavigate('sikor-ppkl')}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm border border-emerald-600/40 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <FileCheck2 className="w-4 h-4 text-emerald-300" />
                      <span>Buka Modul SIKOR</span>
                    </button>
                    <button
                      onClick={() => handleNavigate('kontak')}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm border border-emerald-600/40 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-300" />
                      <span>Layanan Kontak</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. HALAMAN VISI DAN MISI DINAS */}
        {/* ============================================================ */}
        {activeSection === 'visi-misi' && (
          <div className="animate-in fade-in duration-200">
            {/* Breadcrumb Nav */}
            <div className="bg-emerald-950 text-emerald-100 py-3 border-b border-emerald-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-stone-300">
                  <button 
                    onClick={() => handleNavigate('beranda')}
                    className="hover:text-white flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Beranda</span>
                  </button>
                  <ChevronRight className="w-3 h-3 text-stone-500" />
                  <span>Profil Instansi</span>
                  <ChevronRight className="w-3 h-3 text-stone-500" />
                  <span className="text-amber-400 font-semibold">Visi & Misi</span>
                </div>
                <button
                  onClick={() => handleNavigate('beranda')}
                  className="flex items-center gap-1 text-emerald-300 hover:text-white font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Beranda</span>
                </button>
              </div>
            </div>

            <VisiMisiSection />
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. HALAMAN STRUKTUR ORGANISASI DINAS */}
        {/* ============================================================ */}
        {activeSection === 'struktur-organisasi' && (
          <div className="animate-in fade-in duration-200">
            {/* Breadcrumb Nav */}
            <div className="bg-emerald-950 text-emerald-100 py-3 border-b border-emerald-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-stone-300">
                  <button 
                    onClick={() => handleNavigate('beranda')}
                    className="hover:text-white flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Beranda</span>
                  </button>
                  <ChevronRight className="w-3 h-3 text-stone-500" />
                  <span>Profil Instansi</span>
                  <ChevronRight className="w-3 h-3 text-stone-500" />
                  <span className="text-amber-400 font-semibold">Struktur Organisasi</span>
                </div>
                <button
                  onClick={() => handleNavigate('beranda')}
                  className="flex items-center gap-1 text-emerald-300 hover:text-white font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Beranda</span>
                </button>
              </div>
            </div>

            <StrukturOrganisasiSection />
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. HALAMAN MODUL SIKOR PPKL (SATU DATA PERTANIAN) */}
        {/* ============================================================ */}
        {activeSection === 'sikor-ppkl' && (
          <div className="animate-in fade-in duration-200">
            {/* Breadcrumb Nav */}
            <div className="bg-emerald-950 text-emerald-100 py-3 border-b border-emerald-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-stone-300">
                  <button 
                    onClick={() => handleNavigate('beranda')}
                    className="hover:text-white flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Beranda</span>
                  </button>
                  <ChevronRight className="w-3 h-3 text-stone-500" />
                  <span className="text-amber-400 font-semibold">Modul SIKOR PPKL (Satu Data)</span>
                </div>
                <button
                  onClick={() => handleNavigate('beranda')}
                  className="flex items-center gap-1 text-emerald-300 hover:text-white font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Beranda</span>
                </button>
              </div>
            </div>

            <SikorModuleSection 
              initialBidangFilter={sikorBidangFilter} 
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* 5. HALAMAN BIDANG & UNIT KERJA */}
        {/* ============================================================ */}
        {activeSection === 'bidang' && (
          <div className="animate-in fade-in duration-200">
            {/* Breadcrumb Nav */}
            <div className="bg-emerald-950 text-emerald-100 py-3 border-b border-emerald-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-stone-300">
                  <button 
                    onClick={() => handleNavigate('beranda')}
                    className="hover:text-white flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Beranda</span>
                  </button>
                  <ChevronRight className="w-3 h-3 text-stone-500" />
                  <span className="text-amber-400 font-semibold">Bidang & Unit Kerja</span>
                </div>
                <button
                  onClick={() => handleNavigate('beranda')}
                  className="flex items-center gap-1 text-emerald-300 hover:text-white font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Beranda</span>
                </button>
              </div>
            </div>

            <BidangSection 
              initialSelectedBidangId={targetBidangId}
              initialSubMenuId={targetBidangSubMenuId}
              onExploreSikorWithFilter={handleExploreSikorWithFilter}
              onNavigateToSekretariat={(tabId) => handleNavigate('sekretariat', tabId)}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* 6. HALAMAN SEKRETARIAT DINAS (6 MENU LENGKAP)                */}
        {/* ============================================================ */}
        {activeSection === 'sekretariat' && (
          <div className="animate-in fade-in duration-200">
            {/* Breadcrumb Nav */}
            <div className="bg-emerald-950 text-emerald-100 py-3 border-b border-emerald-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-stone-300">
                  <button 
                    onClick={() => handleNavigate('beranda')}
                    className="hover:text-white flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Beranda</span>
                  </button>
                  <ChevronRight className="w-3 h-3 text-stone-500" />
                  <button 
                    onClick={() => handleNavigate('bidang')}
                    className="hover:text-white cursor-pointer"
                  >
                    Bidang & Unit Kerja
                  </button>
                  <ChevronRight className="w-3 h-3 text-stone-500" />
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Sekretariat Dinas</span>
                  </span>
                </div>
                <button
                  onClick={() => handleNavigate('beranda')}
                  className="flex items-center gap-1 text-emerald-300 hover:text-white font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Beranda</span>
                </button>
              </div>
            </div>

            <SekretariatSection 
              initialTab={sekretariatTab}
              onNavigateToSikor={() => handleNavigate('sikor-ppkl')}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* 6. HALAMAN KONTAK KAMI */}
        {/* ============================================================ */}
        {activeSection === 'kontak' && (
          <div className="animate-in fade-in duration-200">
            {/* Breadcrumb Nav */}
            <div className="bg-emerald-950 text-emerald-100 py-3 border-b border-emerald-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-stone-300">
                  <button 
                    onClick={() => handleNavigate('beranda')}
                    className="hover:text-white flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Beranda</span>
                  </button>
                  <ChevronRight className="w-3 h-3 text-stone-500" />
                  <span className="text-amber-400 font-semibold">Layanan Kontak & Aspirasi</span>
                </div>
                <button
                  onClick={() => handleNavigate('beranda')}
                  className="flex items-center gap-1 text-emerald-300 hover:text-white font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Beranda</span>
                </button>
              </div>
            </div>

            <ContactSection />
          </div>
        )}

      </main>

      {/* Official Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
