import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Wheat, 
  Apple, 
  Coffee, 
  Wrench, 
  ArrowRight, 
  CheckCircle, 
  Target, 
  MapPin, 
  User, 
  X, 
  Sparkles, 
  FileCheck,
  Users,
  FolderKanban,
  CalendarCheck,
  Receipt,
  Boxes,
  BarChart3,
  ExternalLink,
  ChevronRight,
  Layers
} from 'lucide-react';
import { BIDANG_DATA, SEKRETARIAT_MENUS } from '../data/mockData';
import { BidangItem, SekretariatTabId } from '../types';
import { BidangWorkspace } from './BidangWorkspace';

interface BidangSectionProps {
  initialSelectedBidangId?: string | null;
  initialSubMenuId?: string | null;
  onExploreSikorWithFilter?: (bidangName: string) => void;
  onNavigateToSekretariat?: (tabId?: SekretariatTabId) => void;
}

export const BidangSection: React.FC<BidangSectionProps> = ({ 
  initialSelectedBidangId,
  initialSubMenuId,
  onExploreSikorWithFilter,
  onNavigateToSekretariat
}) => {
  const [selectedBidang, setSelectedBidang] = useState<BidangItem | null>(() => {
    if (initialSelectedBidangId) {
      const found = BIDANG_DATA.find(b => b.id === initialSelectedBidangId);
      if (found) return found;
    }
    return null;
  });

  const [selectedSubMenuId, setSelectedSubMenuId] = useState<string | undefined>(
    initialSubMenuId || undefined
  );

  useEffect(() => {
    if (initialSelectedBidangId) {
      const found = BIDANG_DATA.find(b => b.id === initialSelectedBidangId);
      if (found) setSelectedBidang(found);
    }
    if (initialSubMenuId) {
      setSelectedSubMenuId(initialSubMenuId);
    }
  }, [initialSelectedBidangId, initialSubMenuId]);

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const getBidangIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Building2': return <Building2 className={className} />;
      case 'Wheat': return <Wheat className={className} />;
      case 'Apple': return <Apple className={className} />;
      case 'Coffee': return <Coffee className={className} />;
      case 'Wrench': return <Wrench className={className} />;
      default: return <Building2 className={className} />;
    }
  };

  const getColorTheme = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          iconBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          accentBorder: 'border-emerald-600',
          buttonBg: 'bg-emerald-700 hover:bg-emerald-800 text-white'
        };
      case 'amber':
        return {
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
          iconBg: 'bg-amber-50 text-amber-800 border-amber-200',
          accentBorder: 'border-amber-600',
          buttonBg: 'bg-amber-600 hover:bg-amber-700 text-white'
        };
      case 'yellow':
        return {
          badgeBg: 'bg-orange-100 text-orange-800 border-orange-300',
          iconBg: 'bg-orange-50 text-orange-900 border-orange-200',
          accentBorder: 'border-orange-600',
          buttonBg: 'bg-orange-700 hover:bg-orange-800 text-white'
        };
      case 'teal':
        return {
          badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
          iconBg: 'bg-teal-50 text-teal-800 border-teal-200',
          accentBorder: 'border-teal-600',
          buttonBg: 'bg-teal-700 hover:bg-teal-800 text-white'
        };
      default:
        return {
          badgeBg: 'bg-stone-100 text-stone-800 border-stone-300',
          iconBg: 'bg-stone-50 text-stone-700 border-stone-200',
          accentBorder: 'border-stone-600',
          buttonBg: 'bg-stone-800 hover:bg-stone-900 text-white'
        };
    }
  };

  return (
    <section id="bidang" className="py-12 sm:py-20 bg-stone-100/70 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* If a Bidang is selected and it is NOT Sekretariat (which has its own full view), render BidangWorkspace */}
        {selectedBidang && selectedBidang.id !== 'sekretariat' ? (
          <BidangWorkspace
            bidang={selectedBidang}
            initialSubMenuId={selectedSubMenuId}
            onBack={() => {
              setSelectedBidang(null);
              setSelectedSubMenuId(undefined);
            }}
            formatIDR={formatIDR}
          />
        ) : (
          <>
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">
                <span>Unit Kerja & Operasional Dinas</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4">
                Bidang & Unit Kerja Teknis
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Penyelenggaraan urusan pemerintahan di bidang pertanian Kabupaten Timor Tengah Selatan didukung oleh 5 pilar unit kerja teknis dengan tugas pokok, fungsi terukur, dan sub menu operasional terpadu.
              </p>
            </div>

            {/* 5 Bidang Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {BIDANG_DATA.map((bidang, index) => {
                const theme = getColorTheme(bidang.color);
                const subMenusCount = bidang.id === 'sekretariat' 
                  ? SEKRETARIAT_MENUS.length 
                  : (bidang.subMenus?.length || 0);

                return (
                  <div
                    key={bidang.id}
                    onClick={() => {
                      if (bidang.id === 'sekretariat' && onNavigateToSekretariat) {
                        onNavigateToSekretariat('data-asn');
                      } else {
                        setSelectedBidang(bidang);
                        setSelectedSubMenuId(bidang.subMenus?.[0]?.id);
                      }
                    }}
                    className={`bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 relative overflow-hidden ${
                      index === 0 ? 'lg:col-span-1' : ''
                    }`}
                  >
                    {/* Subtle top border accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 ${theme.buttonBg}`} />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${theme.iconBg}`}>
                          {getBidangIcon(bidang.iconName)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                            {subMenusCount} Sub Menu
                          </span>
                          <span className="text-xs font-mono font-semibold text-stone-400">
                            {bidang.code}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors mb-2">
                        {bidang.name}
                      </h3>

                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                        {bidang.summary}
                      </p>

                      {/* Khusus Sekretariat: Tampilkan 6 Menu Utama */}
                      {bidang.id === 'sekretariat' && (
                        <div className="mb-4 pt-3 border-t border-stone-100">
                          <div className="text-[11px] font-bold uppercase text-emerald-800 tracking-wider mb-2 flex items-center justify-between">
                            <span>6 Menu Sekretariat:</span>
                            <span className="text-[10px] text-stone-400 font-normal">Klik untuk buka</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            {SEKRETARIAT_MENUS.map((menu) => (
                              <button
                                key={menu.id}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onNavigateToSekretariat) {
                                    onNavigateToSekretariat(menu.id);
                                  } else {
                                    setSelectedBidang(bidang);
                                  }
                                }}
                                className="text-left px-2 py-1.5 rounded-lg bg-stone-50 hover:bg-emerald-100/70 border border-stone-200/80 text-[11px] font-medium text-stone-800 hover:text-emerald-950 transition-colors flex items-center justify-between group/m"
                              >
                                <span className="truncate">{menu.title}</span>
                                <ChevronRight className="w-3 h-3 text-stone-400 group-hover/m:translate-x-0.5 transition-transform flex-shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Bidang Teknis Lainnya: Tampilkan Sub Menu Lengkap Sesuai Permintaan */}
                      {bidang.id !== 'sekretariat' && bidang.subMenus && (
                        <div className="mb-4 pt-3 border-t border-stone-100">
                          <div className="text-[11px] font-bold uppercase text-emerald-800 tracking-wider mb-2 flex items-center justify-between">
                            <span>Sub Menu {bidang.shortName}:</span>
                            <span className="text-[10px] text-stone-400 font-normal">Buka Modul</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto scrollbar-thin pr-0.5">
                            {bidang.subMenus.map((sm) => (
                              <button
                                key={sm.id}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedBidang(bidang);
                                  setSelectedSubMenuId(sm.id);
                                }}
                                className="text-left px-2 py-1.5 rounded-lg bg-stone-50 hover:bg-emerald-100/80 border border-stone-200/80 text-[11px] font-medium text-stone-800 hover:text-emerald-950 transition-colors flex items-center justify-between group/m"
                                title={sm.title}
                              >
                                <span className="truncate">{sm.title}</span>
                                <ChevronRight className="w-3 h-3 text-stone-400 group-hover/m:translate-x-0.5 transition-transform flex-shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <div className="text-xs text-stone-500 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-stone-400" />
                        <span className="truncate max-w-[170px]">{bidang.kepalaBidang}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-900">
                        <span>Buka Menu</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

      </div>
    </section>
  );
};
