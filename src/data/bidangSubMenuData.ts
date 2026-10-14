import { BidangSubMenuItem } from '../types';

// =========================================================================
// SUB MENU DEFINITIONS SESUAI PERMINTAAN USER
// =========================================================================

// 1. Bidang Prasarana Sarana dan Penyuluhan
export const PSP_SUB_MENUS: BidangSubMenuItem[] = [
  { id: 'program-kegiatan', title: 'Program Kegiatan', icon: 'FolderKanban', description: 'Paket program pembangunan fisik, irigasi, dan sarana pertanian' },
  { id: 'laporan-bulanan', title: 'Laporan Bulanan', icon: 'Calendar', description: 'Rekapitulasi pelaporan kinerja bulanan Januari - Desember' },
  { id: 'dokumen-pendukung', title: 'Dokumen Pendukung Kegiatan', icon: 'FileText', description: 'SK CPCL, Berita Acara, dokumen kontrak & bukti fisik lapangan' },
  { id: 'realisasi-fisik-keuangan', title: 'Realisasi Fisik Dan Keuangan', icon: 'BarChart3', description: 'Penyerapan anggaran per triwulan dan persentase fisik PSP' },
  { id: 'realisasi-pupuk', title: 'Realisasi Pupuk', icon: 'Boxes', description: 'Alokasi dan penyaluran pupuk bersubsidi kios resmi e-Alokasi' },
  { id: 'realisasi-program', title: 'Realisasi Program Kegiatan', icon: 'CheckCircle2', description: 'Capaian target output fisik pompanisasi, embung, dan jalan tani' },
  { id: 'potensi-lahan', title: 'Data Potensi Lahan', icon: 'MapPin', description: 'Pemetaan luas baku sawah, lahan kering, dan potensi irigasi se-TTS' },
  { id: 'kelompok-tani', title: 'Data Kelompok Tani', icon: 'Users', description: 'Database Poktan & Gapoktan binaan terdaftar SIMLUHTAN' },
  { id: 'alsintan', title: 'Alsintan', icon: 'Wrench', description: 'Pengelolaan traktor roda 4/2, pompa air, dan brigade alsintan dinas' },
  { id: 'permohonan-bantuan', title: 'Permohonan Bantuan', icon: 'FileCheck', description: 'Pengajuan proposal bantuan sarana prasarana kelompok tani' }
];

// 2. Bidang Tanaman Pangan
export const TANAMAN_PANGAN_SUB_MENUS: BidangSubMenuItem[] = [
  { id: 'program-kegiatan', title: 'Program Kegiatan', icon: 'FolderKanban', description: 'Paket intensifikasi budidaya jagung bose, padi, dan sorgum' },
  { id: 'realisasi-program', title: 'Realisasi Program Kegiatan', icon: 'CheckCircle2', description: 'Capaian Luas Tambah Tanam (LTT) dan panen komoditas pangan' },
  { id: 'laporan-bulanan', title: 'Laporan Bulanan', icon: 'Calendar', description: 'Laporan bulanan mantri tani dan koordinator penyuluh kecamatan' },
  { id: 'sp-tanaman-pangan', title: 'SP Tanaman Pangan', icon: 'FileSpreadsheet', description: 'Statistik Pertanian (SP-Padi, SP-Palawija, luas puso & panen)' },
  { id: 'harga-pasar', title: 'Harga Pasar', icon: 'TrendingUp', description: 'Pemantauan harga beras, jagung pipil, dan kacang di pasar TTS' },
  { id: 'potensi-lahan', title: 'Potensi Lahan', icon: 'MapPin', description: 'Sebaran hamparan sawah irigasi/tadah hujan dan lahan kering TJPS' },
  { id: 'alsintan-pasca-panen', title: 'Alsintan Pasca Panen', icon: 'Wrench', description: 'Corn sheller perontok jagung, power thresher, dan flat bed dryer' },
  { id: 'dokumen-pendukung-lahan', title: 'Dokumen Pendukung Lahan', icon: 'FileText', description: 'Peta poligon spasial sawah LP2B dan SK penetapan kawasan tanam' },
  { id: 'alsinta', title: 'Alsinta', icon: 'Settings', description: 'Peralatan tanam, seeder dorong jagung, dan hand traktor pengolah tanah' }
];

// 3. Bidang Hortikultura
export const HORTIKULTURA_SUB_MENUS: BidangSubMenuItem[] = [
  { id: 'program-kegiatan', title: 'Program Kegiatan', icon: 'FolderKanban', description: 'Pengembangan sentra jeruk keprok Soe, aneka cabai & sayuran' },
  { id: 'realisasi-program', title: 'Realisasi Program Kegiatan', icon: 'CheckCircle2', description: 'Penyaluran bibit berlabel bebas penyakit dan sarana mulsa' },
  { id: 'dokumen-pendukung', title: 'Dokumen Pendukung Kegiatan', icon: 'FileText', description: 'Sertifikat kompetensi benih BPSB, SK CPCL dan Berita Acara' },
  { id: 'harga-pasar', title: 'Harga Pasar', icon: 'TrendingUp', description: 'Monitoring harga cabai rawit, bawang merah, jeruk & sayur Mollo' },
  { id: 'statistik-hortikultura', title: 'Statistik Pertanian Hortikultura', icon: 'BarChart3', description: 'Data SPH-SBS (sayuran semusim) dan SPH-BST (buah tahunan)' },
  { id: 'laporan-bulanan', title: 'Laporan Bulanan', icon: 'Calendar', description: 'Laporan berkala hasil panen dan dinamika pertanaman hortikultura' },
  { id: 'permohonan-bantuan', title: 'Permohonan Bantuan', icon: 'FileCheck', description: 'Usulan bantuan bibit buah, greenhouse, dan pupuk organik poktan' },
  { id: 'realisasi-fisik-keuangan', title: 'Realisasi Fisik Dan Keuangan', icon: 'Receipt', description: 'Realisasi anggaran belanja modal benih dan sarpras hortikultura' }
];

// 4. Bidang Perkebunan
export const PERKEBUNAN_SUB_MENUS: BidangSubMenuItem[] = [
  { id: 'program-kegiatan', title: 'Program Kegiatan', icon: 'FolderKanban', description: 'Program revitalisasi kopi Arabika Mutis, kemiri, kelapa & kakao' },
  { id: 'realisasi-program', title: 'Realisasi Program Kegiatan', icon: 'CheckCircle2', description: 'Realisasi perluasan areal tanam dan pembibitan kebun rakyat' },
  { id: 'atap-perkebunan', title: 'Atap Perkebunan', icon: 'BarChart3', description: 'Angka Tetap (ATAP) luas areal (TBM, TM, TT/TR) dan produksi tonase' },
  { id: 'alsintan', title: 'Alsintan', icon: 'Wrench', description: 'Pulper kopi, mesin kemiri, solar dome dryer, dan press minyak kelapa' },
  { id: 'permohonan-bantuan', title: 'Permohonan Bantuan', icon: 'FileCheck', description: 'Proposal kelompok tani untuk bibit perkebunan dan alat pengolah' }
];

// Map lookup helper
export const BIDANG_SUB_MENUS_MAP: Record<string, BidangSubMenuItem[]> = {
  'psp': PSP_SUB_MENUS,
  'tanaman-pangan': TANAMAN_PANGAN_SUB_MENUS,
  'hortikultura': HORTIKULTURA_SUB_MENUS,
  'perkebunan': PERKEBUNAN_SUB_MENUS
};

// =========================================================================
// DATASET SUB MENU BIDANG PRASARANA SARANA DAN PENYULUHAN (PSP)
// =========================================================================

export const DATA_PSP_REALISASI_PUPUK = [
  { id: 'PUPUK-01', kecamatan: 'Amanuban Selatan', jenisPupuk: 'Urea', alokasi: 450, realisasi: 395, satuan: 'Ton', kiosPengecer: 'Kios Tani Makmur Bena', persen: 87.7, status: 'Lancar' },
  { id: 'PUPUK-02', kecamatan: 'Amanuban Selatan', jenisPupuk: 'NPK Phonska', alokasi: 380, realisasi: 342, satuan: 'Ton', kiosPengecer: 'Kios Tani Makmur Bena', persen: 90.0, status: 'Lancar' },
  { id: 'PUPUK-03', kecamatan: 'Kualin', jenisPupuk: 'Urea', alokasi: 320, realisasi: 288, satuan: 'Ton', kiosPengecer: 'UD Sinar Kasih Kualin', persen: 90.0, status: 'Lancar' },
  { id: 'PUPUK-04', kecamatan: 'Kualin', jenisPupuk: 'NPK Phonska', alokasi: 290, realisasi: 246, satuan: 'Ton', kiosPengecer: 'UD Sinar Kasih Kualin', persen: 84.8, status: 'Lancar' },
  { id: 'PUPUK-05', kecamatan: 'Boking', jenisPupuk: 'Urea', alokasi: 210, realisasi: 185, satuan: 'Ton', kiosPengecer: 'Kios Berkat Tani Boking', persen: 88.1, status: 'Lancar' },
  { id: 'PUPUK-06', kecamatan: 'Mollo Utara', jenisPupuk: 'NPK Khusus Organik', alokasi: 180, realisasi: 165, satuan: 'Ton', kiosPengecer: 'Kios Agro Kapan', persen: 91.6, status: 'Lancar' },
  { id: 'PUPUK-07', kecamatan: 'Batu Putih', jenisPupuk: 'Urea', alokasi: 250, realisasi: 215, satuan: 'Ton', kiosPengecer: 'Kios Subur Batu Putih', persen: 86.0, status: 'Lancar' },
  { id: 'PUPUK-08', kecamatan: 'Oenino', jenisPupuk: 'NPK Phonska', alokasi: 200, realisasi: 172, satuan: 'Ton', kiosPengecer: 'Kios Sahabat Petani Oenino', persen: 86.0, status: 'Lancar' }
];

export const DATA_PSP_POTENSI_LAHAN = [
  { id: 'LAHAN-01', kecamatan: 'Amanuban Selatan', luasBakuSawah: 3450, sawahIrigasi: 2100, sawahTadahHujan: 1350, lahanKering: 8200, sumberAir: 'DI Bena & Pompa Air Tanah', status: 'Optimal' },
  { id: 'LAHAN-02', kecamatan: 'Kualin', luasBakuSawah: 2150, sawahIrigasi: 850, sawahTadahHujan: 1300, lahanKering: 11400, sumberAir: 'Sumur Bor Dangkal & Cekdam', status: 'Potensial IP-200' },
  { id: 'LAHAN-03', kecamatan: 'Boking', luasBakuSawah: 1800, sawahIrigasi: 620, sawahTadahHujan: 1180, lahanKering: 9500, sumberAir: 'Sungai Noelmina & Embung', status: 'Optimal' },
  { id: 'LAHAN-04', kecamatan: 'Mollo Selatan', luasBakuSawah: 1250, sawahIrigasi: 950, sawahTadahHujan: 300, lahanKering: 6300, sumberAir: 'Mata Air Pegunungan Mutis', status: 'Sangat Subur' },
  { id: 'LAHAN-05', kecamatan: 'Batu Putih', luasBakuSawah: 1950, sawahIrigasi: 1200, sawahTadahHujan: 750, lahanKering: 7400, sumberAir: 'Saluran Irigasi Tersier', status: 'Optimal' },
  { id: 'LAHAN-06', kecamatan: 'Amanatun Selatan', luasBakuSawah: 980, sawahIrigasi: 350, sawahTadahHujan: 630, lahanKering: 8900, sumberAir: 'Embung Konservasi Air', status: 'Perlu Irigasi Perpipaan' },
  { id: 'LAHAN-07', kecamatan: 'Kolbano', luasBakuSawah: 1400, sawahIrigasi: 520, sawahTadahHujan: 880, lahanKering: 7100, sumberAir: 'Pompanisasi Aliran Sungai', status: 'Potensial Jagung' },
  { id: 'LAHAN-08', kecamatan: 'Fatumnasi', luasBakuSawah: 320, sawahIrigasi: 180, sawahTadahHujan: 140, lahanKering: 5200, sumberAir: 'Mata Air Alami Mutis', status: 'Kawasan Hortikultura' }
];

export const DATA_PSP_KELOMPOK_TANI = [
  { id: 'POKTAN-01', namaPoktan: 'Sinar Tani Mandiri', namaKetua: 'Yoseph Nubatonis', desa: 'Bena', kecamatan: 'Amanuban Selatan', jumlahAnggota: 32, komoditasUtama: 'Padi Sawah & Jagung Hibrida', kelasKemampuan: 'Madya', simluhtanReg: '53.02.01.2001.0012' },
  { id: 'POKTAN-02', namaPoktan: 'Kasih Sayang Tani', namaKetua: 'Marthinus Benu', desa: 'Tuapakas', kecamatan: 'Kualin', jumlahAnggota: 28, komoditasUtama: 'Jagung Bose & Kacang Hijau', kelasKemampuan: 'Madya', simluhtanReg: '53.02.08.2004.0008' },
  { id: 'POKTAN-03', namaPoktan: 'Mekar Sari Oenino', namaKetua: 'Daud Tefa', desa: 'Oenino', kecamatan: 'Oenino', jumlahAnggota: 25, komoditasUtama: 'Padi & Aneka Sayuran', kelasKemampuan: 'Pemula', simluhtanReg: '53.02.14.2002.0019' },
  { id: 'POKTAN-04', namaPoktan: 'Mutis Harapan Tani', namaKetua: 'Petrus Oematan', desa: 'Fatumnasi', kecamatan: 'Fatumnasi', jumlahAnggota: 35, komoditasUtama: 'Kopi Arabika & Jeruk Keprok', kelasKemampuan: 'Utama', simluhtanReg: '53.02.21.2001.0005' },
  { id: 'POKTAN-05', namaPoktan: 'Bunga Teratai Boking', namaKetua: 'Semuel Banunaek', desa: 'Boking', kecamatan: 'Boking', jumlahAnggota: 30, komoditasUtama: 'Padi Sawah & Semangka Pesisir', kelasKemampuan: 'Madya', simluhtanReg: '53.02.09.2003.0015' },
  { id: 'POKTAN-06', namaPoktan: 'Subur Jaya Mollo', namaKetua: 'Soleman Liu', desa: 'Kapan', kecamatan: 'Mollo Utara', jumlahAnggota: 27, komoditasUtama: 'Wortel, Bawang & Kubis', kelasKemampuan: 'Madya', simluhtanReg: '53.02.03.2001.0022' }
];

export const DATA_PSP_ALSINTAN = [
  { id: 'ALS-01', jenisAlsintan: 'Traktor Roda 4 (TR4)', merkType: 'Kubota L4018 40 HP', jumlah: 18, kondisi: 'Baik (Siap Operasi)', lokasiPenempatan: 'Brigade Alsintan Dinas TTS & BPP Bena', peruntukan: 'Olah Tanah Cepat Serentak' },
  { id: 'ALS-02', jenisAlsintan: 'Traktor Roda 2 (TR2)', merkType: 'Quick G1000 Boxer Diesel', jumlah: 84, kondisi: 'Baik', lokasiPenempatan: 'Kelompok Tani Binaan 32 Kecamatan', peruntukan: 'Olah Lahan Sawah & Tegal' },
  { id: 'ALS-03', jenisAlsintan: 'Pompa Air Surya (Solar Cell)', merkType: 'Lorentz PS2-1800 Submersible', jumlah: 45, kondisi: 'Baik', lokasiPenempatan: 'Kualin, Kolbano, Amanatun', peruntukan: 'Irigasi Lahan Kering Tanpa BBM' },
  { id: 'ALS-04', jenisAlsintan: 'Pompa Air Diesel 3 Inchi', merkType: 'Honda GX160 / Shark 3"', jumlah: 92, kondisi: 'Baik', lokasiPenempatan: 'Poktan Sawah Tadah Hujan & Irigasi', peruntukan: 'Pompanisasi Darurat Kekeringan' },
  { id: 'ALS-05', jenisAlsintan: 'Cultivator Roda Cakar', merkType: 'Quick Cakar Baja Mini', jumlah: 38, kondisi: 'Baik', lokasiPenempatan: 'Kawasan Sayur & Hortikultura Mollo', peruntukan: 'Pembuatan Bedengan Sayuran' }
];

export const DATA_PSP_PERMOHONAN_BANTUAN = [
  { id: 'PROP-PSP-01', nomorSurat: '012/SMT/BN/VI/2026', poktan: 'Sinar Tani Mandiri', desa: 'Bena', kecamatan: 'Amanuban Selatan', jenisBantuan: 'Pompa Air Diesel 3 Inchi + Pipa HDPE 500m', tanggal: '14 Juni 2026', status: 'Disetujui', verifikator: 'Tim Teknis PSP' },
  { id: 'PROP-PSP-02', nomorSurat: '005/KST/TP/VII/2026', poktan: 'Kasih Sayang Tani', desa: 'Tuapakas', kecamatan: 'Kualin', jenisBantuan: 'Traktor Roda 2 Quick G1000', tanggal: '02 Juli 2026', status: 'Verifikasi Lapangan', verifikator: 'Koordinator PPL Kualin' },
  { id: 'PROP-PSP-03', nomorSurat: '018/MHT/FN/VIII/2026', poktan: 'Mutis Harapan Tani', desa: 'Fatumnasi', kecamatan: 'Fatumnasi', jenisBantuan: 'Pembangunan Bak Penampung & Irigasi Tetes', tanggal: '19 Agustus 2026', status: 'Disetujui', verifikator: 'Kasi Sarana Pertanian' },
  { id: 'PROP-PSP-04', nomorSurat: '008/BTB/BK/IX/2026', poktan: 'Bunga Teratai Boking', desa: 'Boking', kecamatan: 'Boking', jenisBantuan: 'Pompa Air Solar Cell Sumur Dangkal', tanggal: '04 September 2026', status: 'Menunggu Verifikasi', verifikator: 'Subag Perencanaan PSP' }
];

// =========================================================================
// DATASET SUB MENU BIDANG TANAMAN PANGAN (TP)
// =========================================================================

export const DATA_TP_SP_TANAMAN_PANGAN = [
  { id: 'SP-01', komoditas: 'Padi Sawah', luasTanam: 3850, luasPanen: 3620, puso: 45, produktivitas: '42,5 Ku/Ha', estimasiProduksi: 15385, periode: 'Musim Tanam (MT) II 2026', status: 'Terverifikasi BPS' },
  { id: 'SP-02', komoditas: 'Padi Ladang', luasTanam: 2400, luasPanen: 2280, puso: 60, produktivitas: '28,0 Ku/Ha', estimasiProduksi: 6384, periode: 'Musim Tanam (MT) II 2026', status: 'Terverifikasi BPS' },
  { id: 'SP-03', komoditas: 'Jagung Hibrida', luasTanam: 14200, luasPanen: 13800, puso: 120, produktivitas: '48,0 Ku/Ha', estimasiProduksi: 66240, periode: 'Musim Tanam (MT) II 2026', status: 'Terverifikasi BPS' },
  { id: 'SP-04', komoditas: 'Jagung Komposit (Bose)', luasTanam: 8500, luasPanen: 8250, puso: 80, produktivitas: '32,5 Ku/Ha', estimasiProduksi: 26812, periode: 'Musim Tanam (MT) II 2026', status: 'Terverifikasi BPS' },
  { id: 'SP-05', komoditas: 'Sorgum', luasTanam: 1100, luasPanen: 1080, puso: 10, produktivitas: '30,0 Ku/Ha', estimasiProduksi: 3240, periode: 'Musim Tanam (MT) II 2026', status: 'Terverifikasi BPS' },
  { id: 'SP-06', komoditas: 'Kacang Hijau', luasTanam: 2150, luasPanen: 2090, puso: 25, produktivitas: '14,5 Ku/Ha', estimasiProduksi: 3030, periode: 'Musim Tanam (MT) II 2026', status: 'Terverifikasi BPS' }
];

export const DATA_TP_HARGA_PASAR = [
  { id: 'HP-01', komoditas: 'Beras Medium Lokal', satuan: 'Kg', hargaProdusen: 13000, hargaPasarInpresSoe: 14500, hargaPasarKapan: 14800, hargaPasarNikiNiki: 14600, tren: 'Stabil' },
  { id: 'HP-02', komoditas: 'Beras Premium', satuan: 'Kg', hargaProdusen: 14500, hargaPasarInpresSoe: 16000, hargaPasarKapan: 16500, hargaPasarNikiNiki: 16200, tren: 'Stabil' },
  { id: 'HP-03', komoditas: 'Jagung Bose Pipil Kering', satuan: 'Kg', hargaProdusen: 6000, hargaPasarInpresSoe: 7500, hargaPasarKapan: 7500, hargaPasarNikiNiki: 7000, tren: 'Naik' },
  { id: 'HP-04', komoditas: 'Kacang Hijau Kupas', satuan: 'Kg', hargaProdusen: 18000, hargaPasarInpresSoe: 22000, hargaPasarKapan: 23000, hargaPasarNikiNiki: 22500, tren: 'Stabil' },
  { id: 'HP-05', komoditas: 'Beras Sorgum Olahan', satuan: 'Kg', hargaProdusen: 15000, hargaPasarInpresSoe: 18000, hargaPasarKapan: 18500, hargaPasarNikiNiki: 18000, tren: 'Stabil' }
];

export const DATA_TP_ALSINTAN_PASCA_PANEN = [
  { id: 'APP-01', namaAlat: 'Corn Sheller Mobile (Perontok Jagung)', merk: 'Crown / Yanmar 8.5 HP', kapasitas: '1.5 - 2.0 Ton/Jam', jumlah: 24, kondisi: 'Baik', lokasi: 'Sentra Jagung Kualin & Kolbano' },
  { id: 'APP-02', namaAlat: 'Power Thresher Padi Bergerak', merk: 'Quick Multiguna PT-1000', kapasitas: '1.2 Ton/Jam', jumlah: 32, kondisi: 'Baik', lokasi: 'Sentra Sawah Bena & Boking' },
  { id: 'APP-03', namaAlat: 'Flat Bed Dryer (Pengering Biji)', merk: 'Agro Surya Kapasitas 3 Ton', kapasitas: '3.0 Ton/Siklus', jumlah: 6, kondisi: 'Baik', lokasi: 'Gudang Pengering BPP Bena & Kualin' },
  { id: 'APP-04', namaAlat: 'Rice Milling Unit (RMU) Berjalan', merk: 'Iseki HC-600 Double Polisher', kapasitas: '800 Kg/Jam', jumlah: 8, kondisi: 'Baik', lokasi: 'Gapoktan Bena & Oenino' }
];

export const DATA_TP_DOKUMEN_LAHAN = [
  { id: 'DOK-TP-01', judulDokumen: 'Peta Spasial Deliniasi Lahan Pertanian Pangan Berkelanjutan (LP2B)', nomorSk: 'SK Bupati TTS No. 248/KEP/HK/2024', luasCakupan: '18.450 Hektar', tanggal: '12 Januari 2024', status: 'Legalitas BPN' },
  { id: 'DOK-TP-02', judulDokumen: 'Keputusan Penetapan Kawasan Sentra Jagung Bose TJPS TTS', nomorSk: 'SK Kepala Dinas Pertanian No. 42/SK-TP/2025', luasCakupan: '12.500 Hektar', tanggal: '15 Maret 2025', status: 'SK Operasional' },
  { id: 'DOK-TP-03', judulDokumen: 'Data Poligon GPS Sawah Irigasi Bena dan Sekitarnya', nomorSk: 'PETA-GIS-DISTANBUN-2026-004', luasCakupan: '3.200 Hektar', tanggal: '20 Mei 2026', status: 'Terverifikasi SIG' }
];

// =========================================================================
// DATASET SUB MENU BIDANG HORTIKULTURA
// =========================================================================

export const DATA_HORTI_HARGA_PASAR = [
  { id: 'HH-01', komoditas: 'Jeruk Keprok Soe Grade A', satuan: 'Kg', hargaProdusen: 25000, hargaPasarInpresSoe: 35000, hargaPasarKapan: 30000, hargaPasarKupang: 45000, tren: 'Stabil' },
  { id: 'HH-02', komoditas: 'Cabai Rawit Merah (Lokal TTS)', satuan: 'Kg', hargaProdusen: 40000, hargaPasarInpresSoe: 52000, hargaPasarKapan: 48000, hargaPasarKupang: 60000, tren: 'Naik' },
  { id: 'HH-03', komoditas: 'Bawang Merah Varietas Tuk-Tuk', satuan: 'Kg', hargaProdusen: 22000, hargaPasarInpresSoe: 28000, hargaPasarKapan: 27000, hargaPasarKupang: 34000, tren: 'Stabil' },
  { id: 'HH-04', komoditas: 'Wortel Mollo Pegunungan', satuan: 'Kg', hargaProdusen: 8000, hargaPasarInpresSoe: 12000, hargaPasarKapan: 10000, hargaPasarKupang: 16000, tren: 'Stabil' },
  { id: 'HH-05', komoditas: 'Kubis / Kol Mollo Segar', satuan: 'Kg', hargaProdusen: 5000, hargaPasarInpresSoe: 8000, hargaPasarKapan: 7000, hargaPasarKupang: 11000, tren: 'Turun' }
];

export const DATA_HORTI_STATISTIK_SPH = [
  { id: 'SPH-01', jenisLaporan: 'SPH-BST (Buah Tahunan)', komoditas: 'Jeruk Keprok Soe', jumlahPohonMenghasilkan: 42500, produksiKuintal: 14875, produktivitas: '35 Kg/Pohon', sentraKecamatan: 'Mollo Utara, Fatumnasi, Tobu' },
  { id: 'SPH-02', jenisLaporan: 'SPH-SBS (Sayuran Semusim)', komoditas: 'Cabai Rawit', luasPanenHa: 480, produksiKuintal: 28800, produktivitas: '60 Ku/Ha', sentraKecamatan: 'Amanuban Tengah, Ki.e, Mollo Barat' },
  { id: 'SPH-03', jenisLaporan: 'SPH-SBS (Sayuran Semusim)', komoditas: 'Bawang Merah', luasPanenHa: 320, produksiKuintal: 25600, produktivitas: '80 Ku/Ha', sentraKecamatan: 'Batu Putih, Amanuban Selatan' },
  { id: 'SPH-04', jenisLaporan: 'SPH-SBS (Sayuran Dataran Tinggi)', komoditas: 'Wortel & Kol', luasPanenHa: 260, produksiKuintal: 39000, produktivitas: '150 Ku/Ha', sentraKecamatan: 'Fatumnasi, Nunbena, Mollo Utara' }
];

export const DATA_HORTI_PERMOHONAN_BANTUAN = [
  { id: 'PROP-HORTI-01', poktan: 'Kelompok Horti Mandiri Mutis', ketua: 'Paulus Tefa', desa: 'Fatumnasi', kecamatan: 'Fatumnasi', komoditas: 'Jeruk Keprok Soe', usulan: '2.500 Bibit Bersertifikat Bebas CVPD + Pupuk Hayati', tanggal: '11 Mei 2026', status: 'Disetujui' },
  { id: 'PROP-HORTI-02', poktan: 'Wanita Tani Sayur Kapan', ketua: 'Maria Nubatonis', desa: 'Kapan', kecamatan: 'Mollo Utara', komoditas: 'Aneka Sayur & Cabai', usulan: 'Screenhouse Sederhana 12x20m + Mulsa 20 Roll', tanggal: '28 Juni 2026', status: 'Verifikasi Lapangan' },
  { id: 'PROP-HORTI-03', poktan: 'Tani Bawang Batu Putih', ketua: 'Yance Benu', desa: 'Hane', kecamatan: 'Batu Putih', komoditas: 'Bawang Merah', usulan: '1.200 Kg Umbi Bibit Bawang Merah Bima Brebes/Tuk-Tuk', tanggal: '15 Juli 2026', status: 'Menunggu Verifikasi' }
];

// =========================================================================
// DATASET SUB MENU BIDANG PERKEBUNAN (BUN)
// =========================================================================

export const DATA_BUN_ATAP_PERKEBUNAN = [
  { id: 'ATAP-01', komoditas: 'Kopi Arabika Mutis Mollo', tbm: 380, tm: 820, ttTr: 140, totalLuasHa: 1340, produksiTon: 533, produktivitasKgHa: 650, sentra: 'Fatumnasi, Tobu, Mollo Utara' },
  { id: 'ATAP-02', komoditas: 'Kopi Robusta', tbm: 210, tm: 650, ttTr: 95, totalLuasHa: 955, produksiTon: 422, produktivitasKgHa: 649, sentra: 'Mollo Barat, Amanatun Selatan' },
  { id: 'ATAP-03', komoditas: 'Kemiri Rakyat TTS', tbm: 450, tm: 2400, ttTr: 320, totalLuasHa: 3170, produksiTon: 1920, produktivitasKgHa: 800, sentra: 'Kolbano, Noebeba, Kie, Kualin' },
  { id: 'ATAP-04', komoditas: 'Kelapa Dalam Pesisir', tbm: 310, tm: 1850, ttTr: 280, totalLuasHa: 2440, produksiTon: 1665, produktivitasKgHa: 900, sentra: 'Kualin, Kolbano, Boking, Kot\'olin' },
  { id: 'ATAP-05', komoditas: 'Kakao', tbm: 120, tm: 420, ttTr: 85, totalLuasHa: 625, produksiTon: 252, produktivitasKgHa: 600, sentra: 'Amanuban Timur, Boking' },
  { id: 'ATAP-06', komoditas: 'Pinang Wangi', tbm: 180, tm: 540, ttTr: 60, totalLuasHa: 780, produksiTon: 378, produktivitasKgHa: 700, sentra: 'Amanuban Selatan, Kolbano' }
];

export const DATA_BUN_ALSINTAN = [
  { id: 'BUN-ALS-01', namaAlat: 'Depulper Kopi Basah Mesin Bensin', merk: 'Santana / Honda 6.5 HP', kapasitas: '400 Kg Buah Kopi/Jam', jumlah: 28, kondisi: 'Baik', penerima: 'Kelompok Tani Kopi Lereng Mutis' },
  { id: 'BUN-ALS-02', namaAlat: 'Huller Kopi Kering (Pengupas Kulit Tanduk)', merk: 'Agro Jaya Kapasitas 250 Kg', kapasitas: '250 Kg Green Bean/Jam', jumlah: 14, kondisi: 'Baik', penerima: 'Koperasi & Gapoktan Kopi Mollo' },
  { id: 'BUN-ALS-03', namaAlat: 'Solar Dome Dryer (Pengering Dome UV)', merk: 'Konstruksi Rangka Baja Polycarbonate', kapasitas: '1.500 Kg Kopi/Batch', jumlah: 8, kondisi: 'Baik', penerima: 'Sentra Kopi Fatumnasi & Tobu' },
  { id: 'BUN-ALS-04', namaAlat: 'Mesin Pemecah Kemiri Mekanis', merk: 'Mekanik Pesisir TTS 5.5 HP', kapasitas: '150 Kg Biji/Jam', jumlah: 16, kondisi: 'Baik', penerima: 'Kelompok Wanita Tani Kolbano & Kualin' },
  { id: 'BUN-ALS-05', namaAlat: 'Mesin Roasting Kopi Mini Digital', merk: 'Berto 1 Kg Digital Controller', kapasitas: '1 Kg/Batch (15 Menit)', jumlah: 4, kondisi: 'Baik', penerima: 'Pusat Edukasi Kopi Mutis Dinas' }
];

export const DATA_BUN_PERMOHONAN_BANTUAN = [
  { id: 'PROP-BUN-01', poktan: 'Poktan Kopi Mutis Wangi', ketua: 'Daniel Oematan', desa: 'Fatumnasi', kecamatan: 'Fatumnasi', komoditas: 'Kopi Arabika Mutis', usulan: '10.000 Bibit Kopi Arabika Varietas Kopyol/USDA + 2 Unit Pulper', tanggal: '08 April 2026', status: 'Disetujui' },
  { id: 'PROP-BUN-02', poktan: 'Kelompok Kemiri Jaya Kolbano', ketua: 'Simon Banunaek', desa: 'Kolbano', kecamatan: 'Kolbano', komoditas: 'Kemiri & Kelapa', usulan: '2 Unit Mesin Pemecah Kemiri + Terpal Penjemuran', tanggal: '24 Juni 2026', status: 'Verifikasi Lapangan' },
  { id: 'PROP-BUN-03', poktan: 'Tani Kelapa Pesisir Boking', ketua: 'Lukas Benu', desa: 'Boking', kecamatan: 'Boking', komoditas: 'Kelapa Dalam', usulan: '3.000 Bibit Kelapa Dalam Unggul Pesisir TTS', tanggal: '19 Juli 2026', status: 'Menunggu Verifikasi' }
];

// Helper to format currency
export function formatIDRCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
