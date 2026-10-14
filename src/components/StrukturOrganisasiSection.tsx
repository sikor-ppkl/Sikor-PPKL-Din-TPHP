import React, { useState } from 'react';
import { ORG_CHART } from '../data/mockData';
import { OrgNode } from '../types';
import { Users, ChevronDown, ChevronRight, UserCheck, ShieldCheck, Building, Sparkles } from 'lucide-react';

export const StrukturOrganisasiSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'diagram' | 'daftar'>('diagram');
  const [selectedOfficial, setSelectedOfficial] = useState<OrgNode | null>(ORG_CHART);

  return (
    <section id="struktur-organisasi" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">
            <Users className="w-4 h-4 text-emerald-700" />
            <span>Tata Kelola Kelembagaan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4">
            Struktur Organisasi Dinas
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Bagan hirarki kepemimpinan dan pembagian kewenangan teknis pada Dinas Tanaman Pangan, Hortikultura, dan Perkebunan Kabupaten Timor Tengah Selatan.
          </p>

          {/* Mode Switcher */}
          <div className="inline-flex items-center p-1 bg-stone-200/80 rounded-xl mt-6">
            <button
              onClick={() => setActiveTab('diagram')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'diagram'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Bagan Diagram Visual
            </button>
            <button
              onClick={() => setActiveTab('daftar')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'daftar'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Daftar Pejabat & NIP
            </button>
          </div>
        </div>

        {activeTab === 'diagram' ? (
          /* Interactive Hierarchy Diagram */
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm overflow-x-auto">
            
            {/* Level 1: Kepala Dinas */}
            <div className="flex flex-col items-center">
              <div 
                onClick={() => setSelectedOfficial(ORG_CHART)}
                className="w-full max-w-md bg-gradient-to-r from-emerald-900 to-emerald-800 text-white rounded-xl p-5 text-center shadow-md border-2 border-amber-400 cursor-pointer hover:shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <div className="text-[11px] font-extrabold tracking-widest text-amber-300 uppercase mb-1">
                  {ORG_CHART.position}
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white">
                  {ORG_CHART.name}
                </div>
                <div className="text-xs text-emerald-200 font-mono mt-1">
                  NIP. {ORG_CHART.nip}
                </div>
                <div className="text-[11px] text-amber-200/90 mt-1">
                  {ORG_CHART.golongan}
                </div>
              </div>

              {/* Vertical line down */}
              <div className="w-0.5 h-8 bg-stone-300"></div>

              {/* Level 2: Sekretaris Dinas (Center-left) & Bidang-Bidang */}
              <div className="w-full">
                {/* Horizontal bar across top units */}
                <div className="relative border-t-2 border-stone-300 mx-auto max-w-5xl"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 max-w-6xl mx-auto">
                  {ORG_CHART.children?.map((child) => (
                    <div key={child.id} className="flex flex-col items-center">
                      <div 
                        onClick={() => setSelectedOfficial(child)}
                        className={`w-full bg-stone-50 hover:bg-emerald-50/70 border rounded-xl p-4 text-center cursor-pointer transition-all ${
                          selectedOfficial?.id === child.id 
                            ? 'border-emerald-700 ring-2 ring-emerald-600/30 bg-emerald-50/50' 
                            : 'border-stone-200 hover:border-emerald-300'
                        }`}
                      >
                        <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1 line-clamp-1">
                          {child.position}
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-stone-900 leading-tight mb-1">
                          {child.name}
                        </div>
                        <div className="text-[11px] font-mono text-stone-500">
                          {child.golongan}
                        </div>
                      </div>

                      {/* Sub-units if any */}
                      {child.children && (
                        <div className="w-full mt-3 space-y-2">
                          <div className="w-0.5 h-3 bg-stone-300 mx-auto"></div>
                          {child.children.map((sub) => (
                            <div
                              key={sub.id}
                              onClick={() => setSelectedOfficial(sub)}
                              className={`bg-white border rounded-lg p-2.5 text-left text-xs cursor-pointer transition-colors ${
                                selectedOfficial?.id === sub.id
                                  ? 'border-emerald-600 bg-emerald-50/40'
                                  : 'border-stone-200 hover:border-stone-300'
                              }`}
                            >
                              <div className="text-[10px] font-bold text-stone-600 line-clamp-1">
                                {sub.position}
                              </div>
                              <div className="font-semibold text-stone-900 line-clamp-1">
                                {sub.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Level: UPTD & 32 Balai Penyuluhan Pertanian (BPP) */}
              <div className="mt-10 pt-6 border-t border-stone-200 w-full max-w-4xl">
                <div className="bg-stone-100/80 rounded-xl p-4 text-center border border-stone-200">
                  <div className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    32 Balai Penyuluhan Pertanian (BPP) Kecamatan & Kelompok Jabatan Fungsional
                  </div>
                  <p className="text-xs text-stone-600 max-w-2xl mx-auto">
                    Koordinator Penyuluh Pertanian Lapangan (PPL), Pengendali OPT (POPT), Pengawas Benih Tanaman (PBT), dan Petugas Statistik Pertanian se-Kabupaten Timor Tengah Selatan.
                  </p>
                </div>
              </div>

            </div>

            {/* Selected Official Detail Banner */}
            {selectedOfficial && (
              <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center font-bold text-sm">
                    {selectedOfficial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-800 uppercase">
                      {selectedOfficial.position} · {selectedOfficial.department}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-stone-900">
                      {selectedOfficial.name}
                    </div>
                    <div className="text-xs text-stone-600 font-mono">
                      NIP: {selectedOfficial.nip} · {selectedOfficial.golongan}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-emerald-800 font-semibold bg-white px-3 py-1.5 rounded-lg border border-emerald-200">
                  Status: Pejabat Aktif SK Bupati TTS
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Table / List View */
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200 uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Jabatan Struktural</th>
                    <th className="px-6 py-4">Nama Lengkap & Gelar</th>
                    <th className="px-6 py-4">NIP</th>
                    <th className="px-6 py-4">Pangkat / Golongan</th>
                    <th className="px-6 py-4">Unit Kerja</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {/* Kadis */}
                  <tr className="hover:bg-emerald-50/50 transition-colors bg-emerald-50/20 font-medium">
                    <td className="px-6 py-3.5 font-bold text-emerald-950">{ORG_CHART.position}</td>
                    <td className="px-6 py-3.5 font-semibold text-stone-900">{ORG_CHART.name}</td>
                    <td className="px-6 py-3.5 font-mono text-stone-600">{ORG_CHART.nip}</td>
                    <td className="px-6 py-3.5 text-stone-600">{ORG_CHART.golongan}</td>
                    <td className="px-6 py-3.5 text-emerald-800">{ORG_CHART.department}</td>
                  </tr>

                  {/* Level 2 & 3 Officials */}
                  {ORG_CHART.children?.flatMap((child) => [
                    <tr key={child.id} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="px-6 py-3.5 font-semibold text-stone-900">{child.position}</td>
                      <td className="px-6 py-3.5 text-stone-800">{child.name}</td>
                      <td className="px-6 py-3.5 font-mono text-stone-600">{child.nip}</td>
                      <td className="px-6 py-3.5 text-stone-600">{child.golongan}</td>
                      <td className="px-6 py-3.5 text-stone-600">{child.department}</td>
                    </tr>,
                    ...(child.children || []).map((sub) => (
                      <tr key={sub.id} className="hover:bg-stone-50 transition-colors bg-stone-50/40 text-xs">
                        <td className="px-6 py-3 pl-10 text-stone-600">↳ {sub.position}</td>
                        <td className="px-6 py-3 text-stone-800 font-medium">{sub.name}</td>
                        <td className="px-6 py-3 font-mono text-stone-500">{sub.nip}</td>
                        <td className="px-6 py-3 text-stone-500">{sub.golongan}</td>
                        <td className="px-6 py-3 text-stone-500">{sub.department}</td>
                      </tr>
                    ))
                  ])}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
