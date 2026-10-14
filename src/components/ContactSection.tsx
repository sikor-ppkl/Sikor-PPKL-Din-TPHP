import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare,
  Building,
  HelpCircle,
  Share2
} from 'lucide-react';
import { KECAMATAN_TTS } from '../data/mockData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    noHp: '',
    kecamatan: 'Kota Soe',
    bidangTujuan: 'Umum / Layanan Aspirasi',
    subjek: '',
    pesan: ''
  });

  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    nama: string;
    subjek: string;
    tanggal: string;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `TTS-PPKL-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket({
        id: ticketId,
        nama: formData.nama,
        subjek: formData.subjek,
        tanggal: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      });

      // Reset
      setFormData({
        nama: '',
        email: '',
        noHp: '',
        kecamatan: 'Kota Soe',
        bidangTujuan: 'Umum / Layanan Aspirasi',
        subjek: '',
        pesan: ''
      });
    }, 600);
  };

  return (
    <section id="kontak" className="py-16 sm:py-24 bg-stone-50 scroll-mt-16 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">
            <Mail className="w-4 h-4 text-emerald-700" />
            <span>Layanan Aspirasi & Informasi Publik</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4">
            Hubungi Dinas Pertanian Kab. TTS
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Sampaikan permohonan informasi, koordinasi program kegiatan tani, pengaduan alsintan & pupuk bersubsidi, atau konsultasi pertanian langsung ke unit terkait.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office Address & Operational Hours & Interactive Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Office Info Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
              <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
                <Building className="w-5 h-5 text-emerald-700" />
                <span>Kantor Induk Dinas</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-100">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-stone-900 mb-0.5">Alamat Kantor</div>
                    <p className="text-stone-600 leading-relaxed">
                      Jl. Basuki Rahmat No. 1, Kelurahan Kampung Baru, Kota Soe, 
                      Kabupaten Timor Tengah Selatan, Provinsi Nusa Tenggara Timur 85511
                    </p>
                    <span className="text-[11px] text-emerald-800 font-medium mt-1 inline-block">
                      (Kompleks Perkantoran Pemkab TTS)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-100">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-stone-900 mb-0.5">Telepon & WhatsApp Pelayanan</div>
                    <p className="text-stone-600">(0388) 21045 / 21320</p>
                    <p className="text-stone-600 font-mono text-xs mt-0.5">Hotline: +62 812-3988-4120</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-100">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-stone-900 mb-0.5">Surat Elektronik (Email)</div>
                    <p className="text-stone-600">disperkutan@ttskab.go.id</p>
                    <p className="text-stone-500 text-xs">sikor.ppkl@ttskab.go.id</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-100">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-stone-900 mb-0.5">Jam Operasional Pelayanan</div>
                    <div className="text-stone-600 space-y-0.5">
                      <div>Senin – Kamis : <span className="font-semibold text-stone-800">07.30 – 16.00 WITA</span></div>
                      <div>Jumat : <span className="font-semibold text-stone-800">07.30 – 16.30 WITA</span></div>
                      <div className="text-stone-400 text-xs mt-1">Sabtu, Minggu & Hari Libur Nasional : Tutup</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder Card with Google Maps Interactive Link */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Peta Lokasi Kantor Dinas</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Dinas+Pertanian+Kabupaten+Timor+Tengah+Selatan+Kota+Soe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Preview Graphic */}
              <div className="relative rounded-xl overflow-hidden border border-stone-200 bg-stone-100 h-48 flex items-center justify-center group">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                  alt="Peta Lokasi Kota Soe TTS"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-85 transition-opacity"
                />
                <div className="absolute inset-0 bg-emerald-950/20" />
                
                {/* Pin in center */}
                <div className="absolute flex flex-col items-center">
                  <div className="bg-emerald-800 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md border border-white mb-1 whitespace-nowrap">
                    Dinas Pertanian Kab. TTS
                  </div>
                  <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-lg animate-bounce"></div>
                </div>

                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] text-stone-700 font-mono">
                  Soe, Kab. TTS (-9.8608, 124.2835)
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-stone-900 mb-1">
                  Formulir Aspirasi & Koordinasi Online
                </h3>
                <p className="text-xs sm:text-sm text-stone-500">
                  Pesan Anda akan otomatis diteruskan ke Sekretariat SIKOR PPKL dan Bidang terkait untuk ditindaklanjuti.
                </p>
              </div>

              {submittedTicket ? (
                /* Ticket Confirmation View */
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-6 text-center animate-in fade-in duration-300">
                  <div className="w-12 h-12 bg-emerald-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-950 mb-1">
                    Pesan & Aspirasi Berhasil Dikirim!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 mb-6">
                    Terima kasih, Bapak/Ibu <span className="font-semibold">{submittedTicket.nama}</span>. Laporan koordinasi Anda telah teregistrasi dalam sistem SIKOR PPKL.
                  </p>

                  <div className="bg-white rounded-xl p-4 border border-emerald-200 text-left max-w-md mx-auto mb-6 text-xs sm:text-sm">
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Nomor Registrasi:</span>
                      <span className="font-mono font-bold text-emerald-800">{submittedTicket.id}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Subjek:</span>
                      <span className="font-semibold text-stone-800">{submittedTicket.subjek}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-stone-500">Waktu Kirim:</span>
                      <span className="text-stone-700">{submittedTicket.tanggal}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSubmittedTicket(null)}
                    className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-colors shadow-xs"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1.5">
                        Nama Lengkap / Nama Kelompok Tani *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Yeremias Tefa / Poktan Nekmese"
                        value={formData.nama}
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1.5">
                        Nomor HP / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 0812-XXXX-XXXX"
                        value={formData.noHp}
                        onChange={(e) => setFormData({ ...formData, noHp: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1.5">
                        Alamat Email (Opsional)
                      </label>
                      <input
                        type="email"
                        placeholder="email@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1.5">
                        Kecamatan Asal Pemohon *
                      </label>
                      <select
                        value={formData.kecamatan}
                        onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                      >
                        {KECAMATAN_TTS.map((kec) => (
                          <option key={kec} value={kec}>{kec}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1.5">
                      Tujuan Unit Kerja / Bidang *
                    </label>
                    <select
                      value={formData.bidangTujuan}
                      onChange={(e) => setFormData({ ...formData, bidangTujuan: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                    >
                      <option value="Umum / Layanan Aspirasi">Sekretariat (Umum / Perencanaan SIKOR)</option>
                      <option value="Bidang Tanaman Pangan">Bidang Tanaman Pangan (Jagung, Padi, Benih)</option>
                      <option value="Bidang Hortikultura">Bidang Hortikultura (Jeruk Soe, Sayuran Mollo)</option>
                      <option value="Bidang Perkebunan">Bidang Perkebunan (Kopi Mutis, Kemiri, Kelapa)</option>
                      <option value="Bidang PSP">Bidang PSP (Alsintan, Traktor, Irigasi & Pupuk Bersubsidi)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1.5">
                      Subjek Pesan / Permohonan *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Permohonan Bimbingan Alsintan Traktor Roda Dua"
                      value={formData.subjek}
                      onChange={(e) => setFormData({ ...formData, subjek: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1.5">
                      Rincian Pesan / Deskripsi Kebutuhan *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tuliskan secara jelas rincian pertanyaan, usulan kegiatan, atau kendala lapangan kelompok tani Anda..."
                      value={formData.pesan}
                      onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none resize-y"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-400 text-white font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Mengirimkan Pesan...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Kirim Pesan Aspirasi</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
