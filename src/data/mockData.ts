import { 
  BidangItem, 
  SikorProgram, 
  OrgNode, 
  AsnItem, 
  ProgramKegiatanItem, 
  RencanaRealisasiItem, 
  LaporanPadItem, 
  AsetItem, 
  FisikKeuanganItem, 
  SekretariatTabId 
} from '../types';
import {
  PSP_SUB_MENUS,
  TANAMAN_PANGAN_SUB_MENUS,
  HORTIKULTURA_SUB_MENUS,
  PERKEBUNAN_SUB_MENUS
} from './bidangSubMenuData';

export const KECAMATAN_TTS = [
  'Kota Soe',
  'Mollo Utara',
  'Mollo Selatan',
  'Mollo Barat',
  'Fatumnasi',
  'Tobu',
  'Nunbena',
  'Amanuban Barat',
  'Amanuban Tengah',
  'Amanuban Selatan',
  'Amanuban Timur',
  'Batu Putih',
  'Kuatnana',
  'Kolbano',
  'Kualin',
  'Kuanfatu',
  'Noebeba',
  'Oenino',
  'Amanatun Selatan',
  'Amanatun Utara',
  'Amanatun Timur',
  'Amanatun Tengah',
  'Boking',
  'Nunkolo',
  'Santian',
  'Fautmolo',
  'Fatukopa',
  'Kie',
  'Kot\'olin',
  'Polen',
  'Noebana',
  'Toianas'
];

export const BIDANG_DATA: BidangItem[] = [
  {
    id: 'sekretariat',
    code: 'SEKR',
    name: 'Sekretariat Dinas',
    shortName: 'Sekretariat',
    kepalaBidang: 'Drs. Yohanis B. Liu, M.Si',
    nip: '19730514 199903 1 004',
    color: 'slate',
    iconName: 'Building2',
    summary: 'Pusat koordinasi administratif, pengelolaan perencanaan Renja/DPA, keuangan, kepegawaian, perlengkapan, serta pengelolaan sistem pelaporan SIKOR PPKL terpadu.',
    tugasPokok: 'Melaksanakan koordinasi pelaksanaan tugas, pembinaan, dan pemberian dukungan administrasi kepada seluruh unit organisasi di lingkungan Dinas Tanaman Pangan, Hortikultura, dan Perkebunan Kab. TTS.',
    fungsi: [
      'Pengkoordinasian perumusan rencana kerja, program, dan anggaran dinas melalui SIKOR PPKL.',
      'Pengelolaan dan pembinaan urusan kepegawaian, ketatausahaan, hukum, dan kearsipan dinas.',
      'Pengelolaan perbendaharaan, akuntansi, dan penyusunan laporan keuangan dinas.',
      'Pelaksanaan pemantauan, evaluasi, dan penyusunan laporan kinerja instansi (LAKIP, LPPD, dan SIKOR Triwulanan).'
    ],
    programUnggulan: [
      {
        title: 'Pengembangan Integrasi Sistem SIKOR PPKL Digital',
        description: 'Peningkatan kapasitas server dan digitalisasi pemantauan realisasi fisik-keuangan dari 32 Balai Penyuluhan Pertanian (BPP) kecamatan.',
        target: '32 BPP Terkoneksi Real-time',
        anggaran: 'Rp 385.000.000',
        lokasiFokus: 'Sekretariat & 32 Kecamatan Kab. TTS'
      },
      {
        title: 'Peningkatan Kompetensi Aparatur Penyuluh Pertanian Lapangan',
        description: 'Pendidikan pelatihan sertifikasi teknis pertanian iklim semi-arid dan manajemen pelaporan berbasis GIS.',
        target: '120 Tenaga Penyuluh Terlatih',
        anggaran: 'Rp 450.000.000',
        lokasiFokus: 'Kabupaten TTS'
      }
    ],
    bannerImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'tanaman-pangan',
    code: 'TP',
    name: 'Bidang Tanaman Pangan',
    shortName: 'Tanaman Pangan',
    kepalaBidang: 'Ir. Kornelis M. Nubatonis, M.P',
    nip: '19710822 199803 1 002',
    color: 'emerald',
    iconName: 'Wheat',
    summary: 'Penggerak ketahanan pangan daerah melalui optimalisasi budidaya Jagung Bose lokal, padi sawah/ladang, sorgum, dan aneka kacang-kacangan ramah iklim kering.',
    tugasPokok: 'Merumuskan serta melaksanakan kebijakan teknis di bidang peningkatan produksi, produktivitas, mutu benih, perlindungan tanaman pangan, dan pascapanen pangan.',
    fungsi: [
      'Penyusunan petunjuk teknis pengelolaan budidaya tanaman serealia (jagung, padi, sorgum) dan aneka kacang.',
      'Penyediaan dan pengawasan peredaran benih tanaman pangan unggul dan bersertifikat.',
      'Pengendalian Organisme Pengganggu Tumbuhan (OPT) dan penanganan dampak kekeringan/anomali cuaca.',
      'Fasilitasi panen, pengolahan pascapanen, dan stabilisasi cadangan pangan keluarga tani.'
    ],
    komoditasFokus: ['Jagung Varietas Lokal & Hibrida (Bose TTS)', 'Padi Sawah & Ladang Boking/Kualin', 'Sorgum Merah/Putih', 'Kacang Hijau & Kacang Tanah'],
    programUnggulan: [
      {
        title: 'Program Peningkatan Produksi Jagung Berkelanjutan (TJPS Mandiri)',
        description: 'Bantuan paket benih jagung unggul hibrida dan pupuk hayati terpadu untuk kelompok tani lahan kering.',
        target: '12.500 Hektar Lahan Tanam',
        anggaran: 'Rp 4.250.000.000',
        lokasiFokus: 'Kualin, Kolbano, Boking, Amanuban Selatan, Amanatun Selatan'
      },
      {
        title: 'Intensifikasi Padi Sawah Dataran Rendah & Embung Desa',
        description: 'Optimalisasi pola tanam IP-200 dengan pemanfaatan air embung dan pompanisasi terarah.',
        target: '3.200 Hektar Sawah Berkelanjutan',
        anggaran: 'Rp 2.180.000.000',
        lokasiFokus: 'Kualin, Boking, Oenino, Batu Putih'
      },
      {
        title: 'Gerakan Tanam Sorgum Lahan Marjinal Iklim Kering',
        description: 'Diversifikasi pangan berbasis sorgum tahan kering sebagai benteng pangan lokal bebas stunting.',
        target: '850 Hektar',
        anggaran: 'Rp 620.000.000',
        lokasiFokus: 'Amanatun Timur, Noebeba, Kie'
      }
    ],
    bannerImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80',
    subMenus: TANAMAN_PANGAN_SUB_MENUS
  },
  {
    id: 'hortikultura',
    code: 'HORTI',
    name: 'Bidang Hortikultura',
    shortName: 'Hortikultura',
    kepalaBidang: 'Drh. Martha S. Tefa, M.Agr',
    nip: '19760318 200212 2 003',
    color: 'amber',
    iconName: 'Apple',
    summary: 'Pengembang komoditas buah dan sayuran unggulan bernilai ekonomi tinggi, dipimpin oleh Jeruk Keprok Soe ikonik TTS, aneka sayur dataran tinggi Mollo, dan cabai.',
    tugasPokok: 'Merumuskan serta melaksanakan kebijakan operasional di bidang perbenihan, produksi, perlindungan, dan pascapanen komoditas buah-buahan, sayuran, dan tanaman obat.',
    fungsi: [
      'Pengembangan sentra kawasan buah unggulan spesifik daerah, khususnya Jeruk Keprok Soe bersertifikat.',
      'Pengembangan kawasan aneka cabai, bawang merah, dan sayuran organik dataran tinggi pegunungan.',
      'Pemberian bimbingan teknis budidaya Good Agricultural Practices (GAP) hortikultura.',
      'Fasilitasi penanganan pascapanen, pengemasan (packaging), dan akses pasar modern.'
    ],
    komoditasFokus: ['Jeruk Keprok Soe (Varietas Unggul Nasional)', 'Bawang Merah Varietas Tuk Tuk & Bauji', 'Sayuran Mollo (Wortel, Kubis, Brokoli)', 'Cabai Rawit & Cabai Keriting'],
    programUnggulan: [
      {
        title: 'Revitalisasi & Replanting Sentra Jeruk Keprok Soe',
        description: 'Penyaluran 45.000 bibit jeruk keprok berlabel bebas penyakit CVPD bersama pendampingan agroklimat.',
        target: '45.000 Bibit Pohon Jeruk',
        anggaran: 'Rp 1.850.000.000',
        lokasiFokus: 'Mollo Utara, Mollo Selatan, Fatumnasi, Tobu, Kota Soe'
      },
      {
        title: 'Pengembangan Kampung Hortikultura Sayur Organik Mollo',
        description: 'Pembangunan greenhouse screen-house sederhana, irigasi tetes kabut, dan fasilitasi sertifikasi organik sayur.',
        target: '40 Kelompok Tani Hortikultura',
        anggaran: 'Rp 1.340.000.000',
        lokasiFokus: 'Fatumnasi, Nunbena, Tobu, Mollo Barat'
      }
    ],
    bannerImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80',
    subMenus: HORTIKULTURA_SUB_MENUS
  },
  {
    id: 'perkebunan',
    code: 'BUN',
    name: 'Bidang Perkebunan',
    shortName: 'Perkebunan',
    kepalaBidang: 'Albertus K. Oematan, S.P., M.M',
    nip: '19741109 200003 1 003',
    color: 'yellow',
    iconName: 'Coffee',
    summary: 'Penggerak komoditas ekspor dan perkebunan rakyat, unggul dalam Kopi Arabika & Robusta Mollo-Mutis, Kemiri, Kelapa Dalam, Kakao, serta tanaman bernilai kultural.',
    tugasPokok: 'Merumuskan serta melaksanakan kebijakan operasional di bidang perbenihan, produksi, pengolahan, dan pemasaran hasil komoditas tanaman perkebunan.',
    fungsi: [
      'Peningkatan mutu dan perluasan areal komoditas perkebunan rakyat bernilai ekonomi tinggi.',
      'Pengembangan perbenihan tanaman perkebunan tersertifikasi (kopi, kemiri, kelapa, kakao).',
      'Pengendalian hama penyakit tanaman perkebunan dan konservasi lahan lereng pegunungan.',
      'Fasilitasi hilirisasi pascapanen (huller kopi, roaster mini, mesin pemecah kemiri) bagi UMKM tani.'
    ],
    komoditasFokus: ['Kopi Arabika & Robusta Mutis Mollo', 'Kemiri TTS', 'Kelapa Dalam Pesisir Selatan', 'Kakao & Pinang Wangi'],
    programUnggulan: [
      {
        title: 'Perluasan dan Peningkatan Mutu Kopi Specialty Mutis Mollo',
        description: 'Bantuan 60.000 bibit kopi bersertifikat, rumah jemur solar dryer dome, dan pulper kopi higienis bagi kelompok tani lereng Mutis.',
        target: '150 Hektar Perluasan Kebun Kopi',
        anggaran: 'Rp 1.920.000.000',
        lokasiFokus: 'Fatumnasi, Mollo Utara, Mollo Barat, Tobu'
      },
      {
        title: 'Hilirisasi Pengolahan Minyak Kemiri & Kelapa Pesisir TTS',
        description: 'Bantuan alat pemecah kemiri mekanis dan press kelapa VCO untuk kelompok wanita tani pesisir.',
        target: '25 Unit Mesin Pengolah Tani',
        anggaran: 'Rp 880.000.000',
        lokasiFokus: 'Kolbano, Kualin, Boking, Kot\'olin'
      }
    ],
    bannerImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    subMenus: PERKEBUNAN_SUB_MENUS
  },
  {
    id: 'psp',
    code: 'PSP',
    name: 'Bidang Prasarana Sarana dan Penyuluhan',
    shortName: 'Prasarana Sarana & Penyuluhan',
    kepalaBidang: 'Ir. Dominggus Boimau, S.T., M.Eng',
    nip: '19750912 200112 1 005',
    color: 'teal',
    iconName: 'Wrench',
    summary: 'Fondasi modernisasi pertanian TTS melalui penyediaan Alat Mesin Pertanian (Alsintan), pembangunan irigasi perpipaan, embung air, traktor roda empat, dan distribusi pupuk subsidi tepat sasaran.',
    tugasPokok: 'Merumuskan serta melaksanakan kebijakan di bidang pengelolaan lahan dan air, penyediaan dan pengawasan pupuk serta pestisida, dan fasilitasi pembiayaan serta alsintan.',
    fungsi: [
      'Pembangunan, rehabilitasi, dan pemeliharaan jaringan irigasi tersier, embung pertanian, dan sumur bor.',
      'Pengelolaan dan alokasi bantuan Alat dan Mesin Pertanian (Traktor Roda 4, Traktor Roda 2, Pompa Air, Cultivator).',
      'Pengawasan peredaran pupuk bersubsidi melalui sistem e-Alokasi dan pengawasan pestisida terdaftar.',
      'Fasilitasi program Asuransi Usaha Tani Padi (AUTP) dan akses Kredit Usaha Rakyat (KUR) Pertanian.'
    ],
    komoditasFokus: ['Alsintan Modern (Traktor & Pompanisasi)', 'Infrastruktur Air Lahan Kering (Embung & Pipa)', 'Pupuk Bersubsidi Terintegrasi', 'Asuransi Usaha Tani (AUTP)'],
    programUnggulan: [
      {
        title: 'Gerakan Pompanisasi Lahan Kering & Embung Pertanian',
        description: 'Pengadaan dan distribusi 180 unit pompa air solar cell dan mesin diesel beserta jaringan pipa HDPE untuk menjangkau lahan bukit.',
        target: '180 Unit Pompa + 35 Titik Embung',
        anggaran: 'Rp 3.450.000.000',
        lokasiFokus: 'Kualin, Amanuban Selatan, Amanatun Utara, Boking, Batu Putih'
      },
      {
        title: 'Mekanisasi Alsintan Terpadu Brigade Tani Daerah',
        description: 'Penyaluran 45 unit traktor roda empat dan 90 unit kultivator untuk percepatan olah tanah serentak sebelum musim penghujan.',
        target: '135 Unit Alsintan Terdistribusi',
        anggaran: 'Rp 4.100.000.000',
        lokasiFokus: '32 Kecamatan se-Kabupaten TTS'
      }
    ],
    bannerImage: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80',
    subMenus: PSP_SUB_MENUS
  }
];

export const SIKOR_PROGRAMS: SikorProgram[] = [
  {
    id: 'SIKOR-2026-001',
    kodeKegiatan: '3.27.01.2.01.0004',
    namaProgram: 'Program Peningkatan Produksi dan Produktivitas Tanaman Pangan',
    namaKegiatan: 'Penyediaan Benih Jagung Hibrida dan Pupuk Organik Lahan Kering',
    bidang: 'Tanaman Pangan',
    tahunAnggaran: 2026,
    paguAnggaran: 1850000000,
    realisasiKeuangan: 1572500000,
    targetFisik: '5.200 Ha / 380 Kelompok Tani',
    realisasiFisik: 88,
    status: 'Sedang Berjalan',
    triwulan: 'TW III',
    kecamatanFokus: 'Kualin, Kolbano, Amanuban Selatan',
    penanggungJawab: 'Kasi Produksi Serealia & Poktan Binaan',
    tanggalLaporanTerakhir: '18 September 2026'
  },
  {
    id: 'SIKOR-2026-002',
    kodeKegiatan: '3.27.02.2.02.0012',
    namaProgram: 'Program Pengembangan Hortikultura Spesifik Daerah Berdaya Saing',
    namaKegiatan: 'Replanting dan Pendampingan Sertifikasi Jeruk Keprok Soe',
    bidang: 'Hortikultura',
    tahunAnggaran: 2026,
    paguAnggaran: 940000000,
    realisasiKeuangan: 893000000,
    targetFisik: '25.000 Bibit Tersalurkan',
    realisasiFisik: 95,
    status: 'Terverifikasi',
    triwulan: 'TW III',
    kecamatanFokus: 'Mollo Utara, Fatumnasi, Kota Soe',
    penanggungJawab: 'Kasi Buah-Buahan & BPP Mollo',
    tanggalLaporanTerakhir: '12 September 2026'
  },
  {
    id: 'SIKOR-2026-003',
    kodeKegiatan: '3.27.03.2.01.0008',
    namaProgram: 'Program Hilirisasi dan Nilai Tambah Tanaman Perkebunan',
    namaKegiatan: 'Pemberdayaan Petani Kopi Mutis Mollo Melalui Pengadaan Solar Dryer Dome',
    bidang: 'Perkebunan',
    tahunAnggaran: 2026,
    paguAnggaran: 720000000,
    realisasiKeuangan: 648000000,
    targetFisik: '8 Unit Bangunan Solar Dome',
    realisasiFisik: 90,
    status: 'Terverifikasi',
    triwulan: 'TW III',
    kecamatanFokus: 'Fatumnasi, Tobu, Mollo Barat',
    penanggungJawab: 'Kasi Pascapanen Perkebunan',
    tanggalLaporanTerakhir: '14 September 2026'
  },
  {
    id: 'SIKOR-2026-004',
    kodeKegiatan: '3.27.04.2.03.0015',
    namaProgram: 'Program Modernisasi Prasarana dan Sarana Pertanian',
    namaKegiatan: 'Pengadaan Pompanisasi Tenaga Surya dan Pemipaan Sumber Air Lahan Kering',
    bidang: 'PSP',
    tahunAnggaran: 2026,
    paguAnggaran: 2150000000,
    realisasiKeuangan: 1980000000,
    targetFisik: '65 Unit Pompa Solar + 12 Km Pipa',
    realisasiFisik: 92,
    status: 'Sedang Berjalan',
    triwulan: 'TW III',
    kecamatanFokus: 'Boking, Amanatun Selatan, Kualin',
    penanggungJawab: 'Kasi Lahan & Irigasi Pertanian',
    tanggalLaporanTerakhir: '20 September 2026'
  },
  {
    id: 'SIKOR-2026-005',
    kodeKegiatan: '3.27.00.2.01.0001',
    namaProgram: 'Program Penunjang Urusan Pemerintahan Daerah Kabupaten',
    namaKegiatan: 'Pengembangan Modul Pelaporan Digital Terpadu SIKOR PPKL dan Satu Data Pertanian',
    bidang: 'Sekretariat',
    tahunAnggaran: 2026,
    paguAnggaran: 240000000,
    realisasiKeuangan: 235000000,
    targetFisik: '1 Portal Terintegrasi 32 BPP',
    realisasiFisik: 98,
    status: 'Terverifikasi',
    triwulan: 'TW III',
    kecamatanFokus: 'Kota Soe & 32 Kecamatan',
    penanggungJawab: 'Sub Bagian Perencanaan & Evaluasi',
    tanggalLaporanTerakhir: '22 September 2026'
  },
  {
    id: 'SIKOR-2026-006',
    kodeKegiatan: '3.27.01.2.02.0009',
    namaProgram: 'Program Peningkatan Produksi dan Produktivitas Tanaman Pangan',
    namaKegiatan: 'Pengembangan Kawasan Pangan Sorgum untuk Ketahanan Pangan Keluarga',
    bidang: 'Tanaman Pangan',
    tahunAnggaran: 2026,
    paguAnggaran: 420000000,
    realisasiKeuangan: 315000000,
    targetFisik: '600 Hektar',
    realisasiFisik: 75,
    status: 'Sedang Berjalan',
    triwulan: 'TW III',
    kecamatanFokus: 'Amanatun Timur, Kie, Noebeba',
    penanggungJawab: 'Kasi Palawija & Aneka Kacang',
    tanggalLaporanTerakhir: '10 September 2026'
  },
  {
    id: 'SIKOR-2026-007',
    kodeKegiatan: '3.27.04.2.02.0007',
    namaProgram: 'Program Modernisasi Prasarana dan Sarana Pertanian',
    namaKegiatan: 'Distribusi dan Verifikasi Pupuk Bersubsidi Pola e-Alokasi Musim Tanam II',
    bidang: 'PSP',
    tahunAnggaran: 2026,
    paguAnggaran: 680000000,
    realisasiKeuangan: 612000000,
    targetFisik: '4.850 Ton Terverifikasi',
    realisasiFisik: 90,
    status: 'Sedang Berjalan',
    triwulan: 'TW III',
    kecamatanFokus: '32 Kecamatan se-Kabupaten TTS',
    penanggungJawab: 'Kasi Pupuk, Pestisida & Alsintan',
    tanggalLaporanTerakhir: '19 September 2026'
  },
  {
    id: 'SIKOR-2026-008',
    kodeKegiatan: '3.27.02.2.03.0018',
    namaProgram: 'Program Pengembangan Hortikultura Spesifik Daerah Berdaya Saing',
    namaKegiatan: 'Fasilitasi Benih Bawang Merah Dataran Rendah dan Mulsa Plastik',
    bidang: 'Hortikultura',
    tahunAnggaran: 2026,
    paguAnggaran: 580000000,
    realisasiKeuangan: 320000000,
    targetFisik: '85 Hektar Kawasan Bawang',
    realisasiFisik: 55,
    status: 'Perlu Evaluasi',
    triwulan: 'TW III',
    kecamatanFokus: 'Kuatnana, Amanuban Tengah, Batu Putih',
    penanggungJawab: 'Kasi Sayuran & Tanaman Obat',
    tanggalLaporanTerakhir: '08 September 2026'
  }
];

export const ORG_CHART: OrgNode = {
  id: 'kadis',
  position: 'Kepala Dinas',
  name: 'Ir. Yesriel B. Fallo, M.Si',
  nip: '19680715 199403 1 007',
  golongan: 'Pembina Utama Muda (IV/c)',
  department: 'Pimpinan Utama Dinas',
  level: 1,
  children: [
    {
      id: 'sekretaris',
      position: 'Sekretaris Dinas',
      name: 'Drs. Yohanis B. Liu, M.Si',
      nip: '19730514 199903 1 004',
      golongan: 'Pembina Tk. I (IV/b)',
      department: 'Sekretariat',
      level: 2,
      children: [
        {
          id: 'subbag-umum',
          position: 'Kasubag Umum & Kepegawaian',
          name: 'Maria Magdalena Baok, S.Sos',
          nip: '19820412 200604 2 011',
          golongan: 'Penata Tk. I (III/d)',
          department: 'Sekretariat',
          level: 3
        },
        {
          id: 'subbag-program',
          position: 'Kasubag Perencanaan, Evaluasi & SIKOR',
          name: 'Yustus A. Nomleni, S.ST., M.P',
          nip: '19850920 200902 1 003',
          golongan: 'Penata Tk. I (III/d)',
          department: 'Sekretariat',
          level: 3
        }
      ]
    },
    {
      id: 'kabid-tp',
      position: 'Kepala Bidang Tanaman Pangan',
      name: 'Ir. Kornelis M. Nubatonis, M.P',
      nip: '19710822 199803 1 002',
      golongan: 'Pembina (IV/a)',
      department: 'Bidang Tanaman Pangan',
      level: 2,
      children: [
        {
          id: 'seksi-serealia',
          position: 'Sub Koordinator Serealia & Palawija',
          name: 'Semuel Banunaek, S.P',
          nip: '19800615 200501 1 008',
          golongan: 'Penata (III/c)',
          department: 'Tanaman Pangan',
          level: 3
        },
        {
          id: 'seksi-benih-tp',
          position: 'Sub Koordinator Perbenihan & Perlindungan TP',
          name: 'Agustina Selan, S.Pt',
          nip: '19830825 200803 2 006',
          golongan: 'Penata (III/c)',
          department: 'Tanaman Pangan',
          level: 3
        }
      ]
    },
    {
      id: 'kabid-horti',
      position: 'Kepala Bidang Hortikultura',
      name: 'Drh. Martha S. Tefa, M.Agr',
      nip: '19760318 200212 2 003',
      golongan: 'Pembina (IV/a)',
      department: 'Bidang Hortikultura',
      level: 2,
      children: [
        {
          id: 'seksi-buah',
          position: 'Sub Koordinator Tanaman Buah (Jeruk Soe)',
          name: 'Petrus Kase, S.P',
          nip: '19780211 200312 1 004',
          golongan: 'Penata Tk. I (III/d)',
          department: 'Hortikultura',
          level: 3
        },
        {
          id: 'seksi-sayur',
          position: 'Sub Koordinator Sayuran & Florikultura',
          name: 'Debora Neonbene, S.P',
          nip: '19841005 201001 2 018',
          golongan: 'Penata (III/c)',
          department: 'Hortikultura',
          level: 3
        }
      ]
    },
    {
      id: 'kabid-bun',
      position: 'Kepala Bidang Perkebunan',
      name: 'Albertus K. Oematan, S.P., M.M',
      nip: '19741109 200003 1 003',
      golongan: 'Pembina (IV/a)',
      department: 'Bidang Perkebunan',
      level: 2,
      children: [
        {
          id: 'seksi-produksi-bun',
          position: 'Sub Koordinator Produksi Tanaman Tahunan',
          name: 'Daniel Banoet, S.P',
          nip: '19810419 200701 1 012',
          golongan: 'Penata (III/c)',
          department: 'Perkebunan',
          level: 3
        },
        {
          id: 'seksi-pascapanen-bun',
          position: 'Sub Koordinator Pascapanen & Pengolahan',
          name: 'Sarah Nuban, S.TP',
          nip: '19870130 201102 2 005',
          golongan: 'Penata Muda Tk. I (III/b)',
          department: 'Perkebunan',
          level: 3
        }
      ]
    },
    {
      id: 'kabid-psp',
      position: 'Kepala Bidang Prasarana & Sarana Pertanian',
      name: 'Ir. Dominggus Boimau, S.T., M.Eng',
      nip: '19750912 200112 1 005',
      golongan: 'Pembina (IV/a)',
      department: 'Bidang PSP',
      level: 2,
      children: [
        {
          id: 'seksi-lahan-air',
          position: 'Sub Koordinator Pengelolaan Lahan & Irigasi',
          name: 'Yonathan Mella, S.T',
          nip: '19860322 200903 1 002',
          golongan: 'Penata Tk. I (III/d)',
          department: 'PSP',
          level: 3
        },
        {
          id: 'seksi-pupuk-alsintan',
          position: 'Sub Koordinator Pupuk, Pestisida & Alsintan',
          name: 'Fransiskus X. Tefa, S.P',
          nip: '19800714 200604 1 015',
          golongan: 'Penata Tk. I (III/d)',
          department: 'PSP',
          level: 3
        }
      ]
    }
  ]
};

export const VISI_MISI = {
  visi: {
    kicker: 'Mengacu pada Visi Kepala Daerah dan Wakil Kepala Daerah Kabupaten Timor Tengah Selatan',
    pernyataan: 'Terwujudnya Timor Tengah Selatan Yang Maju, Mandiri, Sejahtera dan Berkelanjutan.'
  },
  misi: {
    kicker: 'Pelaksanaan Misi Ke-3 (Tiga) Pemerintah Kabupaten Timor Tengah Selatan',
    pernyataanUtama: 'Melaksanakan Pemanfaatan, Pengelolaan dan Pengembangan Segala Potensi Unggulan Daerah Secara Optimal',
    rumusanStrategis: 'Meningkatkan Daya Saing Daerah Melalui Pengembangan Potensi Unggulan Daerah Secara Optimal',
    penjelasan: 'Sebagai Perangkat Daerah teknis, Dinas Tanaman Pangan, Hortikultura, dan Perkebunan Kabupaten Timor Tengah Selatan mengampu secara langsung pelaksanaan Misi Ke-3 untuk mengakselerasi pemanfaatan komoditas unggulan pertanian, hortikultura, dan perkebunan.'
  },
  tujuanDinas: 'Meningkatnya Sektor Pertanian',
  sasaranDinas: 'Meningkatnya kesejahteraan petani melalui Peningkatan produksi pertanian dan perkebunan',
  strategi: [
    {
      title: 'Peningkatan Produksi & Produktivitas',
      desc: 'Meningkatkan hasil komoditi tanaman pangan, tanaman hortikultura, dan tanaman perkebunan melalui intensifikasi dan ekstensifikasi.'
    },
    {
      title: 'Pengembangan Prasarana',
      desc: 'Peningkatan distribusi dan kualitas prasarana fisik pertanian (seperti Jalan Usaha Tani / JUT, jaringan irigasi / JITUT, embung, dll.).'
    },
    {
      title: 'Peningkatan Kapasitas SDM',
      desc: 'Meningkatkan kapasitas SDM penyuluh pertanian, petugas lapangan, dan kelembagaan petani.'
    },
    {
      title: 'Pengembangan Pemasaran & Pemberdayaan',
      desc: 'Meningkatkan pendapatan melalui fasilitasi sarana pemasaran hasil pertanian/perkebunan serta pembinaan kelompok tani.'
    }
  ],
  arahKebijakan: [
    {
      title: 'Fasilitasi Sarana Produksi',
      desc: 'Fasilitasi ketersediaan sarana produksi seperti pengolahan dan perluasan areal pertanian, benih unggul, pupuk, pengendalian Organisme Pengganggu Tumbuhan (OPT), serta fasilitasi informasi dan inovasi teknologi budidaya pra-tanam maupun pasca-panen.'
    },
    {
      title: 'Fasilitasi Pembinaan & Pendampingan',
      desc: 'Fasilitasi pendampingan, pembinaan, peningkatan kapasitas, serta perbaikan kualitas kelembagaan tani.'
    },
    {
      title: 'Fasilitasi Sarana Pemasaran',
      desc: 'Membuka jaringan usaha dan fasilitasi sarana pemasaran hasil pertanian/perkebunan.'
    }
  ]
};

export interface SekretariatMenuDefinition {
  id: SekretariatTabId;
  title: string;
  shortTitle: string;
  description: string;
  iconName: string;
  badge: string;
}

export const SEKRETARIAT_MENUS: SekretariatMenuDefinition[] = [
  {
    id: 'data-asn',
    title: 'DATA ASN',
    shortTitle: 'Data ASN',
    description: 'Informasi mengenai data Aparatur Sipil Negara.',
    iconName: 'Users',
    badge: '184 Pegawai'
  },
  {
    id: 'program-kegiatan',
    title: 'PROGRAM KEGIATAN',
    shortTitle: 'Program Kegiatan',
    description: 'Informasi terkait program dan kegiatan.',
    iconName: 'FolderKanban',
    badge: 'DPA APBD 2026'
  },
  {
    id: 'rencana-realisasi',
    title: 'RENCANA REALISASI',
    shortTitle: 'Rencana Realisasi',
    description: 'Perencanaan dan pelaksanaan kegiatan.',
    iconName: 'CalendarCheck',
    badge: 'Tahapan TW I - IV'
  },
  {
    id: 'laporan-pad',
    title: 'LAPORAN PAD',
    shortTitle: 'Laporan PAD',
    description: 'Laporan mengenai Pendapatan Asli Daerah.',
    iconName: 'Receipt',
    badge: 'Capaian 76.2%'
  },
  {
    id: 'aset',
    title: 'ASET',
    shortTitle: 'Pengelolaan Aset',
    description: 'Pengelolaan dan pendataan aset.',
    iconName: 'Boxes',
    badge: 'Inventaris BMD'
  },
  {
    id: 'fisik-keuangan',
    title: 'FISIK & KEUANGAN',
    shortTitle: 'Fisik & Keuangan',
    description: 'Laporan realisasi fisik dan keuangan.',
    iconName: 'BarChart3',
    badge: 'RFK Terpadu'
  }
];

export const MOCK_DATA_ASN: AsnItem[] = [
  {
    id: 'asn-01',
    nip: '19680715 199403 1 007',
    nama: 'Ir. Yesriel B. Fallo, M.Si',
    jabatan: 'Kepala Dinas',
    golongan: 'Pembina Utama Muda (IV/c)',
    pangkat: 'Pembina Utama Muda',
    status: 'PNS',
    unitKerja: 'Pimpinan Dinas',
    pendidikanTerakhir: 'S2 Magister Sains Pertanian',
    tmt: '01-03-1994'
  },
  {
    id: 'asn-02',
    nip: '19730514 199903 1 004',
    nama: 'Drs. Yohanis B. Liu, M.Si',
    jabatan: 'Sekretaris Dinas',
    golongan: 'Pembina (IV/a)',
    pangkat: 'Pembina',
    status: 'PNS',
    unitKerja: 'Sekretariat Dinas',
    pendidikanTerakhir: 'S2 Administrasi Publik',
    tmt: '01-03-1999'
  },
  {
    id: 'asn-03',
    nip: '19800612 200501 1 008',
    nama: 'Yupiterus K. Benu, S.Sos',
    jabatan: 'Kasubag Umum & Kepegawaian',
    golongan: 'Penata Tk. I (III/d)',
    pangkat: 'Penata Tingkat I',
    status: 'PNS',
    unitKerja: 'Sekretariat Dinas',
    pendidikanTerakhir: 'S1 Ilmu Administrasi Negara',
    tmt: '01-01-2005'
  },
  {
    id: 'asn-04',
    nip: '19840219 200803 2 006',
    nama: 'Maria E. Sanam, S.E., M.M',
    jabatan: 'Kasubag Perencanaan, Program & Pelaporan',
    golongan: 'Penata Tk. I (III/d)',
    pangkat: 'Penata Tingkat I',
    status: 'PNS',
    unitKerja: 'Sekretariat Dinas',
    pendidikanTerakhir: 'S2 Magister Manajemen',
    tmt: '01-03-2008'
  },
  {
    id: 'asn-05',
    nip: '19821005 200701 1 012',
    nama: 'Daniel S. Nuban, S.E',
    jabatan: 'Kasubag Keuangan & Pengelolaan Aset',
    golongan: 'Penata (III/c)',
    pangkat: 'Penata',
    status: 'PNS',
    unitKerja: 'Sekretariat Dinas',
    pendidikanTerakhir: 'S1 Akuntansi Keuangan',
    tmt: '01-01-2007'
  },
  {
    id: 'asn-06',
    nip: '19710822 199803 1 002',
    nama: 'Ir. Kornelis M. Nubatonis, M.P',
    jabatan: 'Kepala Bidang Tanaman Pangan',
    golongan: 'Pembina (IV/a)',
    pangkat: 'Pembina',
    status: 'PNS',
    unitKerja: 'Bidang Tanaman Pangan',
    pendidikanTerakhir: 'S2 Magister Pertanian',
    tmt: '01-03-1998'
  },
  {
    id: 'asn-07',
    nip: '19760318 200212 2 003',
    nama: 'Drh. Martha S. Tefa, M.Agr',
    jabatan: 'Kepala Bidang Hortikultura',
    golongan: 'Pembina (IV/a)',
    pangkat: 'Pembina',
    status: 'PNS',
    unitKerja: 'Bidang Hortikultura',
    pendidikanTerakhir: 'S2 Pertanian & Agronomi',
    tmt: '01-12-2002'
  },
  {
    id: 'asn-08',
    nip: '19741109 200003 1 003',
    nama: 'Albertus K. Oematan, S.P., M.M',
    jabatan: 'Kepala Bidang Perkebunan',
    golongan: 'Pembina (IV/a)',
    pangkat: 'Pembina',
    status: 'PNS',
    unitKerja: 'Bidang Perkebunan',
    pendidikanTerakhir: 'S2 Magister Manajemen Agribisnis',
    tmt: '01-03-2000'
  },
  {
    id: 'asn-09',
    nip: '19780525 200312 1 006',
    nama: 'Nikodemus Tapatab, S.TP., M.Si',
    jabatan: 'Kepala Bidang PSP (Prasarana & Sarana)',
    golongan: 'Pembina (IV/a)',
    pangkat: 'Pembina',
    status: 'PNS',
    unitKerja: 'Bidang Prasarana dan Sarana Pertanian',
    pendidikanTerakhir: 'S2 Teknik Pertanian',
    tmt: '01-12-2003'
  },
  {
    id: 'asn-10',
    nip: '19850914 201101 1 009',
    nama: 'Yakob B. Tanesi, S.Pt',
    jabatan: 'Koordinator BPP Mollo Utara / Penyuluh Ahli Muda',
    golongan: 'Penata (III/c)',
    pangkat: 'Penata',
    status: 'PNS',
    unitKerja: 'BPP Mollo Utara',
    pendidikanTerakhir: 'S1 Penyuluhan Pertanian',
    tmt: '01-01-2011'
  },
  {
    id: 'asn-11',
    nip: '19870420 201402 2 005',
    nama: 'Debora K. Selan, S.P',
    jabatan: 'Penyuluh Pertanian Ahli Pertama BPP Amanuban Barat',
    golongan: 'Penata Muda Tk. I (III/b)',
    pangkat: 'Penata Muda Tingkat I',
    status: 'PNS',
    unitKerja: 'BPP Amanuban Barat',
    pendidikanTerakhir: 'S1 Agroteknologi',
    tmt: '01-02-2014'
  },
  {
    id: 'asn-12',
    nip: '19920815 202221 1 018',
    nama: 'Matheus O. Nenobais, A.Md.P',
    jabatan: 'Penyuluh Pertanian Terampil BPP Kualin',
    golongan: 'Golongan VII (PPPK)',
    pangkat: 'Ahli Pertama PPPK',
    status: 'PPPK',
    unitKerja: 'BPP Kualin',
    pendidikanTerakhir: 'D3 Budidaya Tanaman',
    tmt: '01-06-2022'
  },
  {
    id: 'asn-13',
    nip: '19901103 202221 2 021',
    nama: 'Elfrida L. Baun, S.P',
    jabatan: 'Penyuluh Pertanian Ahli Pertama BPP Fatumnasi',
    golongan: 'Golongan IX (PPPK)',
    pangkat: 'Ahli Pertama PPPK',
    status: 'PPPK',
    unitKerja: 'BPP Fatumnasi',
    pendidikanTerakhir: 'S1 Agribisnis Pertanian',
    tmt: '01-06-2022'
  },
  {
    id: 'asn-14',
    nip: '19880111 202321 1 014',
    nama: 'Petrus S. Benu, S.Tr.P',
    jabatan: 'Pengelola Data SIKOR PPKL & Pelaporan',
    golongan: 'Golongan IX (PPPK)',
    pangkat: 'Ahli Pertama PPPK',
    status: 'PPPK',
    unitKerja: 'Sekretariat Dinas',
    pendidikanTerakhir: 'D4 Teknologi Pertanian Terapan',
    tmt: '01-04-2023'
  },
  {
    id: 'asn-15',
    nip: '19940502 202421 2 009',
    nama: 'Rince T. Kase, A.Md.Ak',
    jabatan: 'Pranata Keuangan & Pengelola BMD',
    golongan: 'Golongan VII (PPPK)',
    pangkat: 'Terampil PPPK',
    status: 'PPPK',
    unitKerja: 'Sekretariat Dinas',
    pendidikanTerakhir: 'D3 Akuntansi Lembaga',
    tmt: '01-02-2024'
  }
];

export const MOCK_PROGRAM_KEGIATAN: ProgramKegiatanItem[] = [
  {
    id: 'prog-01',
    kodeProgram: '3.27.01',
    namaProgram: 'Program Penunjang Urusan Pemerintahan Daerah Kabupaten',
    kodeKegiatan: '3.27.01.2.01',
    namaKegiatan: 'Perencanaan, Penganggaran, dan Evaluasi Kinerja Perangkat Daerah',
    indikatorKinerja: 'Persentase Dokumen Perencanaan (Renja, Renstra, DPA) dan Pelaporan SIKOR Tepat Waktu',
    targetKinerja: '100% (4 Dokumen Utama & 4 Laporan SIKOR)',
    paguAnggaran: 420000000,
    penanggungJawab: 'Drs. Yohanis B. Liu, M.Si (Sekretaris Dinas)',
    subBidangPengampu: 'Subag Program & Perencanaan',
    status: 'Sedang Berjalan'
  },
  {
    id: 'prog-02',
    kodeProgram: '3.27.01',
    namaProgram: 'Program Penunjang Urusan Pemerintahan Daerah Kabupaten',
    kodeKegiatan: '3.27.01.2.02',
    namaKegiatan: 'Administrasi Keuangan dan Akuntansi Perangkat Daerah',
    indikatorKinerja: 'Tingkat Kepatuhan Pengelolaan Keuangan & Ketepatan Pertanggungjawaban SPJ Dinas',
    targetKinerja: 'Opini WTP / 100% SPJ Lengkap',
    paguAnggaran: 580000000,
    penanggungJawab: 'Daniel S. Nuban, S.E (Kasubag Keuangan)',
    subBidangPengampu: 'Subag Keuangan & Aset',
    status: 'Sedang Berjalan'
  },
  {
    id: 'prog-03',
    kodeProgram: '3.27.01',
    namaProgram: 'Program Penunjang Urusan Pemerintahan Daerah Kabupaten',
    kodeKegiatan: '3.27.01.2.05',
    namaKegiatan: 'Administrasi Kepegawaian, Diklat dan Peningkatan Kapasitas ASN',
    indikatorKinerja: 'Jumlah ASN dan Penyuluh Pertanian yang Mengikuti Penilaian Kinerja & Diklat Kompetensi',
    targetKinerja: '184 ASN Dinas & BPP Kecamatan',
    paguAnggaran: 350000000,
    penanggungJawab: 'Yupiterus K. Benu, S.Sos (Kasubag Umum)',
    subBidangPengampu: 'Subag Umum & Kepegawaian',
    status: 'Sedang Berjalan'
  },
  {
    id: 'prog-04',
    kodeProgram: '3.27.01',
    namaProgram: 'Program Penunjang Urusan Pemerintahan Daerah Kabupaten',
    kodeKegiatan: '3.27.01.2.07',
    namaKegiatan: 'Pengelolaan Barang Milik Daerah (BMD), Pemeliharaan Gedung & Aset',
    indikatorKinerja: 'Persentase Aset Kantor & Alsintan dalam Kondisi Siap Operasional dan Terinventarisir',
    targetKinerja: '95% Aset Tercatat & Terverifikasi e-BMD',
    paguAnggaran: 490000000,
    penanggungJawab: 'Daniel S. Nuban, S.E (Kasubag Aset)',
    subBidangPengampu: 'Subag Keuangan & Aset',
    status: 'Sedang Berjalan'
  },
  {
    id: 'prog-05',
    kodeProgram: '3.27.02',
    namaProgram: 'Program Pengelolaan Sumber Daya Pertanian & Pangan',
    kodeKegiatan: '3.27.02.2.01',
    namaKegiatan: 'Penyediaan dan Pengawasan Benih Tanaman Pangan Unggul Bersertifikat',
    indikatorKinerja: 'Volume Benih Jagung Bose & Padi Sawah Tersalurkan ke Kelompok Tani',
    targetKinerja: '145 Ton Benih Bersertifikat',
    paguAnggaran: 1850000000,
    penanggungJawab: 'Ir. Kornelis M. Nubatonis, M.P (Kabid TP)',
    subBidangPengampu: 'Bidang Tanaman Pangan',
    status: 'Sedang Berjalan'
  },
  {
    id: 'prog-06',
    kodeProgram: '3.27.03',
    namaProgram: 'Program Pengembangan Hortikultura Spesifik Daerah',
    kodeKegiatan: '3.27.03.2.02',
    namaKegiatan: 'Revitalisasi Sentra Jeruk Keprok Soe & Bawang Merah Dataran Tinggi',
    indikatorKinerja: 'Jumlah Bibit Bebas Penyakit & Luasan Kawasan Hortikultura Berkelanjutan',
    targetKinerja: '45.000 Batang Bibit & 85 Hektar',
    paguAnggaran: 1250000000,
    penanggungJawab: 'Drh. Martha S. Tefa, M.Agr (Kabid Horti)',
    subBidangPengampu: 'Bidang Hortikultura',
    status: 'Sedang Berjalan'
  },
  {
    id: 'prog-07',
    kodeProgram: '3.27.04',
    namaProgram: 'Program Perkebunan Rakyat dan Peningkatan Nilai Tambah Komoditas',
    kodeKegiatan: '3.27.04.2.03',
    namaKegiatan: 'Pengembangan Sentra Kopi Specialty Lereng Mutis & Kemiri TTS',
    indikatorKinerja: 'Jumlah Bibit Kopi Arabika Bersertifikat dan Sarana Pascapanen Solar Dome',
    targetKinerja: '60.000 Bibit & 8 Unit Sarana Pengolahan',
    paguAnggaran: 1420000000,
    penanggungJawab: 'Albertus K. Oematan, S.P., M.M (Kabid Bun)',
    subBidangPengampu: 'Bidang Perkebunan',
    status: 'Sedang Berjalan'
  },
  {
    id: 'prog-08',
    kodeProgram: '3.27.05',
    namaProgram: 'Program Prasarana dan Sarana Pertanian (PSP)',
    kodeKegiatan: '3.27.05.2.04',
    namaKegiatan: 'Pembangunan Embung Pertanian, Irigasi Perpompaan & Distribusi Alsintan',
    indikatorKinerja: 'Jumlah Titik Embung Pertanian & Unit Traktor / Pompa Air Tervalidasi',
    targetKinerja: '18 Titik Embung & 64 Unit Alsintan',
    paguAnggaran: 2150000000,
    penanggungJawab: 'Nikodemus Tapatab, S.TP., M.Si (Kabid PSP)',
    subBidangPengampu: 'Bidang PSP',
    status: 'Sedang Berjalan'
  }
];

export const MOCK_RENCANA_REALISASI: RencanaRealisasiItem[] = [
  {
    id: 'rr-01',
    namaKegiatan: 'Penyusunan Rencana Kerja (Renja) Dinas & Penginputan SIPD-RI 2026',
    triwulan: 'TW I',
    tahapanRencana: 'Konsolidasi usulan Musrenbang 32 Kecamatan, forum OPD pertanian, dan penetapan pagu indikatif',
    jadwalWaktu: 'Januari - Maret 2026',
    targetOutput: 'Dokumen Renja Awal & Dokumen DPA Induk Terbit',
    capaianRealisasi: 'Dokumen Renja & DPA telah diverifikasi Bapelitbangda Kab. TTS',
    persenProgres: 100,
    status: 'Selesai',
    catatanEvaluasi: 'Tercapai 100% sesuai jadwal penetapan APBD Induk Kabupaten TTS.'
  },
  {
    id: 'rr-02',
    namaKegiatan: 'Rakor SIKOR Triwulanan & Verifikasi Pelaporan 32 BPP Kecamatan',
    triwulan: 'TW II',
    tahapanRencana: 'Rapat koordinasi lapangan dengan 32 Koordinator Penyuluh dan validasi data CPCL bantuan tani',
    jadwalWaktu: 'April - Juni 2026',
    targetOutput: '32 Laporan Perkembangan Luas Tambah Tanam (LTT) & Distribusi Benih',
    capaianRealisasi: '32 Kecamatan telah menyerahkan rekapitulasi data LTT jagung dan padi',
    persenProgres: 100,
    status: 'Selesai',
    catatanEvaluasi: 'Sinergi antar BPP berjalan baik melalui dashboard SIKOR PPKL.'
  },
  {
    id: 'rr-03',
    namaKegiatan: 'Pelaksanaan Pengadaan Benih Jagung Hibrida & Pupuk Hayati (TJPS Mandiri)',
    triwulan: 'TW III',
    tahapanRencana: 'Proses tender e-Katalog, drop point distribusi ke kelompok tani di 12 kecamatan sentra',
    jadwalWaktu: 'Juli - September 2026',
    targetOutput: 'Penyaluran 85 Ton Benih Jagung dan Pupuk Hayati',
    capaianRealisasi: 'Penyaluran mencapai 72 Ton benih jagung (84.7%) di Amanuban dan Amanatun',
    persenProgres: 85,
    status: 'Sedang Berjalan',
    catatanEvaluasi: 'Distribusi terus berjalan menuju persiapan musim tanam pertama (rendengan).'
  },
  {
    id: 'rr-04',
    namaKegiatan: 'Pembangunan 18 Unit Embung Pertanian & Jalan Usaha Tani (JUT)',
    triwulan: 'TW III',
    tahapanRencana: 'Pekerjaan fisik galian embung geomembran dan perkerasan rabat beton jalan tani',
    jadwalWaktu: 'Juli - Oktober 2026',
    targetOutput: '18 Embung Tampung Air dan 12 KM Jalan Usaha Tani',
    capaianRealisasi: '14 Titik embung selesai uji genangan air; sisa 4 titik tahap finishing',
    persenProgres: 78,
    status: 'Sedang Berjalan',
    catatanEvaluasi: 'Material telah berada di lokasi; deviasi fisik positif terhadap jadwal SPMK.'
  },
  {
    id: 'rr-05',
    namaKegiatan: 'Pemeliharaan Berkala & Audit Fisik Kendaraan Operasional / Alsintan',
    triwulan: 'TW III',
    tahapanRencana: 'Pemeriksaan kelayakan mesin traktor, pompa air dinas, dan servis mobil penyuluhan',
    jadwalWaktu: 'Agustus - Oktober 2026',
    targetOutput: 'Servis rutin 42 unit mesin dan sertifikasi uji kelayakan',
    capaianRealisasi: '35 Unit telah selesai servis dan terpasang stiker inventaris aset',
    persenProgres: 83,
    status: 'Sedang Berjalan',
    catatanEvaluasi: 'Peralatan siap mendukung olah tanah serentak di TTS.'
  },
  {
    id: 'rr-06',
    namaKegiatan: 'Penyusunan Laporan Pertanggungjawaban (SPJ), LAKIP & Evaluasi Kinerja Akhir Tahun',
    triwulan: 'TW IV',
    tahapanRencana: 'Rekonsiliasi data belanja LS/GU dengan BPKAD dan penyusunan draf Laporan Tahunan SIKOR',
    jadwalWaktu: 'Oktober - Desember 2026',
    targetOutput: 'Laporan Keuangan Unaudited & Laporan Kinerja Instansi Selesai',
    capaianRealisasi: 'Draf format dan kertas kerja rekonsiliasi telah disiapkan oleh Sekretariat',
    persenProgres: 30,
    status: 'Tahap Verifikasi',
    catatanEvaluasi: 'Menunggu input realisasi belanja modal triwulan keempat.'
  }
];

export const MOCK_LAPORAN_PAD: LaporanPadItem[] = [
  {
    id: 'pad-01',
    sumberPad: 'Retribusi Sewa Alat & Mesin Pertanian (Alsintan)',
    uraianRetribusi: 'Sewa traktor roda 4, excavator mini pembuat embung, combine harvester, dan pompa diesel dinas',
    targetTahunan: 180000000,
    realisasiSdSaatIni: 142500000,
    persentaseCapaian: 79.17,
    periode: 'Januari - September 2026',
    unitPengelola: 'UPTD Alsintan & Bidang PSP',
    nomorBuktiKas: 'STS/04.02/DISPERKUTAN/2026',
    statusSetoran: 'Terverifikasi Kasda'
  },
  {
    id: 'pad-02',
    sumberPad: 'Penjualan Bibit Tanaman Perkebunan Unggul',
    uraianRetribusi: 'Penjualan bibit kopi arabika bersertifikat kultivar Mutis dan bibit kelapa dalam hasil kebun percontohan',
    targetTahunan: 110000000,
    realisasiSdSaatIni: 85200000,
    persentaseCapaian: 77.45,
    periode: 'Januari - September 2026',
    unitPengelola: 'Bidang Perkebunan / Kebun Dinas Fatumnasi',
    nomorBuktiKas: 'STS/04.05/DISPERKUTAN/2026',
    statusSetoran: 'Terverifikasi Kasda'
  },
  {
    id: 'pad-03',
    sumberPad: 'Penjualan Bibit Jeruk Keprok Soe & Sayuran Unggul',
    uraianRetribusi: 'Bibit okulasi jeruk keprok Soe berlabel biru bebas CVPD dari Balai Benih Induk Hortikultura',
    targetTahunan: 90000000,
    realisasiSdSaatIni: 68400000,
    persentaseCapaian: 76.00,
    periode: 'Januari - September 2026',
    unitPengelola: 'Bidang Hortikultura / BBI Soe',
    nomorBuktiKas: 'STS/04.08/DISPERKUTAN/2026',
    statusSetoran: 'Terverifikasi Kasda'
  },
  {
    id: 'pad-04',
    sumberPad: 'Retribusi Pengujian Mutu Benih & Sertifikasi Tanaman',
    uraianRetribusi: 'Jasa uji laboratorium daya berkecambah dan kemurnian varietas benih padi / jagung',
    targetTahunan: 45000000,
    realisasiSdSaatIni: 32250000,
    persentaseCapaian: 71.67,
    periode: 'Januari - September 2026',
    unitPengelola: 'Sekretariat / Laboratorium Benih Dinas',
    nomorBuktiKas: 'STS/04.11/DISPERKUTAN/2026',
    statusSetoran: 'Terverifikasi Kasda'
  },
  {
    id: 'pad-05',
    sumberPad: 'Pemanfaatan Lahan Kebun Percontohan BPP',
    uraianRetribusi: 'Bagi hasil kemitraan olah lahan percontohan hortikultura terpadu BPP Kualin dan Mollo',
    targetTahunan: 25000000,
    realisasiSdSaatIni: 14500000,
    persentaseCapaian: 58.00,
    periode: 'Januari - September 2026',
    unitPengelola: 'Sekretariat / BPP Kecamatan Terpadu',
    nomorBuktiKas: 'STS/04.14/DISPERKUTAN/2026',
    statusSetoran: 'Dalam Proses Rekonsiliasi'
  }
];

export const MOCK_ASET: AsetItem[] = [
  // KIB A: TANAH
  {
    id: 'aset-kib-a-01',
    kodeBarang: '01.01.11.04.001',
    nomorRegister: '0001',
    namaBarang: 'Tanah Kompleks Kantor Dinas Pertanian',
    kib: 'KIB A',
    kategori: 'Tanah Bangunan Gedung Kantor',
    spesifikasiMerk: 'Sertifikat Hak Pakai No. 12/TTS',
    ukuranLuas: '4.250 m²',
    tahunPerolehan: 1986,
    jumlah: 1,
    satuan: 'Bidang',
    nilaiPerolehan: 3850000000,
    kondisi: 'Baik',
    asalUsul: 'APBD Kab. TTS',
    lokasiPenempatan: 'Jl. Basuki Rahmat No. 1, Kota Soe, TTS',
    penanggungJawabAset: 'Sekretaris Dinas (Pengelola Barang)',
    keterangan: 'Digunakan untuk Kompleks Kantor Induk Dinas Pertanian TTS'
  },
  {
    id: 'aset-kib-a-02',
    kodeBarang: '01.01.11.04.015',
    nomorRegister: '0002',
    namaBarang: 'Tanah Kebun Benih & Bibit Unggul Tanaman Pangan Oenino',
    kib: 'KIB A',
    kategori: 'Tanah Kebun Percobaan & Bibit',
    spesifikasiMerk: 'Sertifikat Hak Pakai No. 28/TTS',
    ukuranLuas: '15.000 m²',
    tahunPerolehan: 1998,
    jumlah: 1,
    satuan: 'Bidang',
    nilaiPerolehan: 1200000000,
    kondisi: 'Baik',
    asalUsul: 'APBD / Pemkab TTS',
    lokasiPenempatan: 'Desa Oenino, Kec. Oenino, TTS',
    penanggungJawabAset: 'Bidang Tanaman Pangan',
    keterangan: 'Lahan produksi benih jagung dan kedelai varietas lokal unggul'
  },
  {
    id: 'aset-kib-a-03',
    kodeBarang: '01.01.11.04.020',
    nomorRegister: '0003',
    namaBarang: 'Tanah Balai Benih Pertanian & Agrowisata Hortikultura Fatumnasi',
    kib: 'KIB A',
    kategori: 'Tanah Perkebunan & Hortikultura',
    spesifikasiMerk: 'Surat Keterangan Penguasaan No. 04/Ftm',
    ukuranLuas: '8.500 m²',
    tahunPerolehan: 2004,
    jumlah: 1,
    satuan: 'Bidang',
    nilaiPerolehan: 850000000,
    kondisi: 'Baik',
    asalUsul: 'Hibah Masyarakat / Pemkab',
    lokasiPenempatan: 'Kec. Fatumnasi, Lereng Gunung Mutis, TTS',
    penanggungJawabAset: 'Bidang Hortikultura',
    keterangan: 'Pusat pembibitan bawang putih, kentang, dan kopi arabika'
  },

  // KIB B: PERALATAN DAN MESIN
  {
    id: 'aset-kib-b-01',
    kodeBarang: '02.02.01.01.004',
    nomorRegister: '0001 - 0004',
    namaBarang: 'Kendaraan Dinas Operasional Lapangan Roda 4 (Double Cabin 4x4)',
    kib: 'KIB B',
    kategori: 'Alat Angkutan Darat Bermotor',
    spesifikasiMerk: 'Mitsubishi Strada & Toyota Hilux 4WD (DH 8042 WA)',
    ukuranLuas: '2.500 cc (Dexlite 350 Liter)',
    bahan: 'Besi / Baja',
    tahunPerolehan: 2021,
    jumlah: 4,
    satuan: 'Unit Mobil',
    nilaiPerolehan: 1680000000,
    kondisi: 'Baik',
    asalUsul: 'DAK Fisik Pertanian & APBD TTS',
    lokasiPenempatan: 'Pool Kendaraan Dinas Pertanian Soe',
    penanggungJawabAset: 'JAKOB E.P. BENU, ST., MT (Kasubag Umum & BMD)',
    keterangan: 'Tercakup dalam DPPA Pemeliharaan Kendaraan Dinas 2026 (Alokasi Dexlite & Pajak Roda 4)'
  },
  {
    id: 'aset-kib-b-kijang-01',
    kodeBarang: '02.02.01.01.005',
    nomorRegister: '0005',
    namaBarang: 'Mobil Dinas Operasional Minibus Toyota Kijang Innova',
    kib: 'KIB B',
    kategori: 'Alat Angkutan Darat Bermotor',
    spesifikasiMerk: 'Toyota Kijang Innova G 2.0 Bensin (DH 1024 WB)',
    ukuranLuas: '1.998 cc (Pertamax 490 Liter)',
    bahan: 'Metal / Baja',
    tahunPerolehan: 2019,
    jumlah: 1,
    satuan: 'Unit Mobil',
    nilaiPerolehan: 285000000,
    kondisi: 'Baik',
    asalUsul: 'APBD Kab. TTS',
    lokasiPenempatan: 'Sekretariat Dinas Pertanian Soe',
    penanggungJawabAset: 'Sekretaris Dinas & Kasubag Umum',
    keterangan: 'Kendaraan dinas operasional dalam kota & provinsi, BBM Pertamax disediakan dari Pokir PAD DPPA 2026'
  },
  {
    id: 'aset-kib-b-02',
    kodeBarang: '02.02.01.01.008',
    nomorRegister: '0001',
    namaBarang: 'Kendaraan Dinas Roda 6 (Truk Angkut Alsintan & Benih Pertanian)',
    kib: 'KIB B',
    kategori: 'Alat Angkutan Darat Bermotor',
    spesifikasiMerk: 'Mitsubishi Fuso Canter HD 125 PS',
    ukuranLuas: '3.908 cc',
    bahan: 'Besi / Baja',
    tahunPerolehan: 2018,
    jumlah: 1,
    satuan: 'Unit Truk',
    nilaiPerolehan: 520000000,
    kondisi: 'Baik',
    asalUsul: 'APBD Kab. TTS',
    lokasiPenempatan: 'Gudang Logistik Pertanian Soe',
    penanggungJawabAset: 'Subag Umum & Kepegawaian',
    keterangan: 'Distribusi benih, pupuk bersubsidi, dan mobilisasi alsintan'
  },
  {
    id: 'aset-kib-b-03',
    kodeBarang: '02.02.01.02.088',
    nomorRegister: '0001 - 0120',
    namaBarang: 'Sepeda Motor Dinas Lapangan Penyuluh Pertanian (PPL)',
    kib: 'KIB B',
    kategori: 'Alat Angkutan Darat Bermotor',
    spesifikasiMerk: 'Honda Revo FI & Yamaha Trail 150cc',
    ukuranLuas: '110 cc - 150 cc',
    bahan: 'Metal / Plastik',
    tahunPerolehan: 2019,
    jumlah: 120,
    satuan: 'Unit Sepeda Motor',
    nilaiPerolehan: 2400000000,
    kondisi: 'Baik',
    asalUsul: 'DAK Penugasan Bidang Pertanian',
    lokasiPenempatan: 'Penyuluh Pertanian Lapangan di 32 BPP Kecamatan',
    penanggungJawabAset: 'Masing-Masing Tenaga Fungsional Penyuluh',
    keterangan: 'Operasional monitoring panen dan pembinaan poktan SIKOR'
  },
  {
    id: 'aset-kib-b-04',
    kodeBarang: '02.03.02.01.015',
    nomorRegister: '0001 - 0018',
    namaBarang: 'Traktor Roda 4 (Four-Wheel Drive Agrikultur 50 HP)',
    kib: 'KIB B',
    kategori: 'Alat Pengolahan Tanah & Alsintan',
    spesifikasiMerk: 'Kubota L5018 & John Deere 5050D',
    ukuranLuas: '50 HP (4WD)',
    bahan: 'Besi / Baja',
    tahunPerolehan: 2022,
    jumlah: 18,
    satuan: 'Unit Traktor',
    nilaiPerolehan: 3960000000,
    kondisi: 'Baik',
    asalUsul: 'Tugas Pembantuan Kementan RI',
    lokasiPenempatan: 'Brigade Alsintan Dinas & Kelompok Tani Sentra',
    penanggungJawabAset: 'Bidang PSP & UPTD Alsintan',
    keterangan: 'Layanan olah tanah siap tanam jagung dan padi sawah'
  },
  {
    id: 'aset-kib-b-05',
    kodeBarang: '02.03.02.01.042',
    nomorRegister: '0001 - 0084',
    namaBarang: 'Hand Traktor Roda 2 (Cultivator & Traktor Tangan 8.5 HP)',
    kib: 'KIB B',
    kategori: 'Alat Pengolahan Tanah & Alsintan',
    spesifikasiMerk: 'Quick G1000 Boxer / Yanmar YZC',
    ukuranLuas: '8.5 HP Diesel',
    bahan: 'Besi Baja',
    tahunPerolehan: 2023,
    jumlah: 84,
    satuan: 'Unit Hand Traktor',
    nilaiPerolehan: 2100000000,
    kondisi: 'Baik',
    asalUsul: 'DAK Fisik & APBD TTS',
    lokasiPenempatan: 'Kelompok Tani Padi & Hortikultura Binaan 32 Kecamatan',
    penanggungJawabAset: 'Bidang Tanaman Pangan & Hortikultura',
    keterangan: 'Pinjam pakai kelompok tani binaan'
  },
  {
    id: 'aset-kib-b-06',
    kodeBarang: '02.03.02.02.011',
    nomorRegister: '0001 - 0045',
    namaBarang: 'Pompa Air Irigasi Pertanian 3 Inci (Water Pump)',
    kib: 'KIB B',
    kategori: 'Alat Pengairan Pertanian',
    spesifikasiMerk: 'Honda WB30XN (3 Inci / 5.5 HP)',
    ukuranLuas: 'Debit 1.100 Liter/Menit',
    bahan: 'Aluminium / Besi',
    tahunPerolehan: 2023,
    jumlah: 45,
    satuan: 'Unit Pompa Air',
    nilaiPerolehan: 405000000,
    kondisi: 'Baik',
    asalUsul: 'Bantuan Penanganan Dampak El Nino',
    lokasiPenempatan: 'BPP Kecamatan & Gapoktan Daerah Rawan Kering',
    penanggungJawabAset: 'Bidang Prasarana dan Sarana Pertanian',
    keterangan: 'Suplesi air pompanisasi musim tanam kedua (MT II)'
  },
  {
    id: 'aset-kib-b-07',
    kodeBarang: '02.06.01.01.022',
    nomorRegister: '0001 - 0016',
    namaBarang: 'Server SIKOR PPKL & Komputer PC All-in-One Dinas',
    kib: 'KIB B',
    kategori: 'Komputer & Alat Pengolah Data',
    spesifikasiMerk: 'Dell PowerEdge Server & Lenovo ThinkCentre AIO Core i7',
    ukuranLuas: 'RAM 64GB / SSD 2TB',
    bahan: 'Komponen Elektronik',
    tahunPerolehan: 2024,
    jumlah: 16,
    satuan: 'Unit Komputer',
    nilaiPerolehan: 420000000,
    kondisi: 'Baik',
    asalUsul: 'APBD Induk Kab. TTS',
    lokasiPenempatan: 'Ruang Server & Subag Perencanaan Sekretariat Dinas',
    penanggungJawabAset: 'Tim Pengelola Satu Data SIKOR PPKL',
    keterangan: 'Server database operasional SIKOR PPKL dan Renja'
  },

  // KIB C: GEDUNG DAN BANGUNAN
  {
    id: 'aset-kib-c-01',
    kodeBarang: '03.11.01.01.001',
    nomorRegister: '0001',
    namaBarang: 'Bangunan Gedung Kantor Dinas Pertanian Kab. TTS',
    kib: 'KIB C',
    kategori: 'Bangunan Gedung Kantor',
    spesifikasiMerk: 'Gedung Permanen Bertingkat 2',
    ukuranLuas: '1.850 m²',
    bahan: 'Beton Bertulang, Lantai Keramik, Rangka Baja',
    tahunPerolehan: 1988,
    jumlah: 1,
    satuan: 'Unit Gedung',
    nilaiPerolehan: 4200000000,
    kondisi: 'Baik',
    asalUsul: 'APBD Kab. TTS',
    lokasiPenempatan: 'Jl. Basuki Rahmat No. 1, Kota Soe, TTS',
    penanggungJawabAset: 'Sekretaris Dinas',
    keterangan: 'Kantor Kepala Dinas, Sekretariat, dan 4 Bidang Teknis'
  },
  {
    id: 'aset-kib-c-02',
    kodeBarang: '03.11.01.01.032',
    nomorRegister: '0001 - 0032',
    namaBarang: 'Bangunan Gedung Balai Penyuluhan Pertanian (BPP) Kecamatan',
    kib: 'KIB C',
    kategori: 'Bangunan Gedung Pos Penyuluhan',
    spesifikasiMerk: 'Gedung Permanen Kantor BPP Kecamatan',
    ukuranLuas: 'Rata-rata 120 m² per unit',
    bahan: 'Tembok Beton, Atap Seng',
    tahunPerolehan: 2008,
    jumlah: 32,
    satuan: 'Unit Gedung BPP',
    nilaiPerolehan: 4800000000,
    kondisi: 'Baik',
    asalUsul: 'APBD & DAK Pertanian',
    lokasiPenempatan: '32 Kecamatan Se-Kabupaten TTS',
    penanggungJawabAset: 'Koordinator BPP Masing-Masing Kecamatan',
    keterangan: 'Pusat posko koordinasi penyuluhan dan klinik pertanian BPP'
  },
  {
    id: 'aset-kib-c-03',
    kodeBarang: '03.11.01.02.008',
    nomorRegister: '0001',
    namaBarang: 'Gudang Logistik Pupuk Bersubsidi, Benih & Alsintan',
    kib: 'KIB C',
    kategori: 'Bangunan Gudang Tertutup',
    spesifikasiMerk: 'Gedung Gudang Rangka Baja Standar Kementan',
    ukuranLuas: '600 m²',
    bahan: 'Rangka Baja Ringan & Dinding Batako Plester',
    tahunPerolehan: 2017,
    jumlah: 1,
    satuan: 'Unit Gudang',
    nilaiPerolehan: 750000000,
    kondisi: 'Baik',
    asalUsul: 'DAK Fisik Bidang Pertanian',
    lokasiPenempatan: 'Kompleks Dinas Pertanian Soe',
    penanggungJawabAset: 'Petugas Pengelola Gudang BMD',
    keterangan: 'Tempat penyimpanan cadangan benih dan pupuk penyangga'
  },

  // KIB D: JALAN, IRIGASI, DAN JARINGAN
  {
    id: 'aset-kib-d-01',
    kodeBarang: '04.14.02.01.007',
    nomorRegister: '0001 - 0008',
    namaBarang: 'Jaringan Irigasi Tersier Daerah Irigasi (DI) Bena & Amanuban',
    kib: 'KIB D',
    kategori: 'Bangunan Air / Jaringan Irigasi Tersier',
    spesifikasiMerk: 'Saluran Pasangan Batu Kali Mortar',
    ukuranLuas: 'Panjang 4.800 Meter',
    bahan: 'Batu Kali & Semen Plesteran',
    tahunPerolehan: 2020,
    jumlah: 8,
    satuan: 'Ruas Saluran',
    nilaiPerolehan: 1920000000,
    kondisi: 'Baik',
    asalUsul: 'DAK Penugasan Irigasi Pertanian',
    lokasiPenempatan: 'Dataran Bena & Amanuban Selatan, TTS',
    penanggungJawabAset: 'Bidang Prasarana dan Sarana Pertanian',
    keterangan: 'Mengairi areal sawah padi irigasi seluas 650 Ha'
  },
  {
    id: 'aset-kib-d-02',
    kodeBarang: '04.14.02.03.018',
    nomorRegister: '0001 - 0012',
    namaBarang: 'Dam Parit Pertanian & Embung Konservasi Air Mollo',
    kib: 'KIB D',
    kategori: 'Bangunan Pengendali Air & Embung',
    spesifikasiMerk: 'Embung Geomembran & Dam Pasangan Batu',
    ukuranLuas: 'Kapasitas Tampung 2.500 m³ / unit',
    bahan: 'Pasangan Batu & Geomembran HDPE',
    tahunPerolehan: 2021,
    jumlah: 12,
    satuan: 'Unit Embung / Dam',
    nilaiPerolehan: 1440000000,
    kondisi: 'Baik',
    asalUsul: 'DAK Fisik Konservasi Lahan',
    lokasiPenempatan: 'Kec. Mollo Utara, Mollo Selatan, & Fatumnasi',
    penanggungJawabAset: 'Bidang PSP',
    keterangan: 'Sumber air tanaman hortikultura dan pembibitan kopi'
  },
  {
    id: 'aset-kib-d-03',
    kodeBarang: '04.13.01.01.040',
    nomorRegister: '0001 - 0015',
    namaBarang: 'Jalan Usaha Tani (JUT) Rabat Beton Sentra Pangan',
    kib: 'KIB D',
    kategori: 'Jalan Pertanian Khusus',
    spesifikasiMerk: 'Rabat Beton Tebal 15 cm, Lebar 2.5 Meter',
    ukuranLuas: 'Total Panjang 6.200 Meter',
    bahan: 'Rabat Beton Bertulang K-225',
    tahunPerolehan: 2023,
    jumlah: 15,
    satuan: 'Ruas Jalan',
    nilaiPerolehan: 2170000000,
    kondisi: 'Baik',
    asalUsul: 'DAK Fisik Jalan Usaha Tani',
    lokasiPenempatan: 'Kec. Amanuban Timur, Amanatun Selatan, & Polen',
    penanggungJawabAset: 'Bidang Prasarana dan Sarana Pertanian',
    keterangan: 'Akses mobilisasi alsintan dan angkutan hasil panen petani'
  },

  // KIB E: ASET TETAP LAINNYA
  {
    id: 'aset-kib-e-01',
    kodeBarang: '05.17.01.01.003',
    nomorRegister: '0001 - 1250',
    namaBarang: 'Buku Literatur Teknologi Pertanian & Pedoman Penyuluhan BPP',
    kib: 'KIB E',
    kategori: 'Buku Perpustakaan & Literatur Teknis',
    spesifikasiMerk: 'Buku Seri Budidaya Pangan, Horti, dan Perkebunan Kementan',
    ukuranLuas: '1.250 Eksemplar',
    bahan: 'Kertas / Art Paper',
    tahunPerolehan: 2020,
    jumlah: 1250,
    satuan: 'Eksemplar',
    nilaiPerolehan: 125000000,
    kondisi: 'Baik',
    asalUsul: 'APBD Kab. TTS',
    lokasiPenempatan: 'Perpustakaan Dinas & Pojok Baca 32 BPP Kecamatan',
    penanggungJawabAset: 'Sekretariat Dinas & Koordinator BPP',
    keterangan: 'Bahan rujukan materi penyuluhan dan pembinaan tani'
  },
  {
    id: 'aset-kib-e-02',
    kodeBarang: '05.19.01.02.010',
    nomorRegister: '0001 - 0500',
    namaBarang: 'Koleksi Pohon Induk Tanaman Perkebunan Kopi Arabika Mutis Unggul',
    kib: 'KIB E',
    kategori: 'Tanaman Perkebunan Induk / Plasma',
    spesifikasiMerk: 'Varietas Kopi Arabika Typica / Kartika Mutis',
    ukuranLuas: '500 Pohon Induk Terverifikasi',
    bahan: 'Tanaman Hayati',
    tahunPerolehan: 2016,
    jumlah: 500,
    satuan: 'Pohon',
    nilaiPerolehan: 150000000,
    kondisi: 'Baik',
    asalUsul: 'Balitbangtan / Dinas Perkebunan',
    lokasiPenempatan: 'Kebun Sumber Benih Fatumnasi & Tobu, TTS',
    penanggungJawabAset: 'Bidang Perkebunan',
    keterangan: 'Pohon induk sumber entres sertifikasi benih kopi TTS'
  },

  // KIB F: KONSTRUKSI DALAM PENGERJAAN (KDP)
  {
    id: 'aset-kib-f-01',
    kodeBarang: '06.20.01.01.002',
    nomorRegister: '0001',
    namaBarang: 'Pembangunan Solar Dome Dryer & Rumah Olah Hortikultura Mutis (KDP)',
    kib: 'KIB F',
    kategori: 'Konstruksi Dalam Pengerjaan Gedung',
    spesifikasiMerk: 'Konstruksi Baja Ringan Polycarbonate UV',
    ukuranLuas: '300 m² (Progres Fisik 65%)',
    bahan: 'Rangka Baja, Polycarbonate UV 14%',
    tahunPerolehan: 2025,
    jumlah: 1,
    satuan: 'Paket Gedung',
    nilaiPerolehan: 320000000,
    kondisi: 'Baik',
    asalUsul: 'APBD Tahun Anggaran 2025/2026',
    lokasiPenempatan: 'Kec. Fatumnasi, Kab. TTS',
    penanggungJawabAset: 'Bidang Hortikultura (PPK Konstruksi)',
    keterangan: 'Tahap penyelesaian rangka atap dan instalasi sirkulasi udara'
  }
];

export const MOCK_FISIK_KEUANGAN: FisikKeuanganItem[] = [
  {
    id: 'rfk-01',
    unitKerja: 'Sekretariat Dinas',
    kodeUnit: 'SEKR',
    paguAnggaran: 2450000000,
    realisasiKeuangan: 1989400000,
    persenKeuangan: 81.20,
    targetFisik: 80.00,
    realisasiFisik: 84.50,
    deviasiFisik: 4.50,
    triwulan: 'TW III',
    statusKinerja: 'Sangat Baik'
  },
  {
    id: 'rfk-02',
    unitKerja: 'Bidang Tanaman Pangan',
    kodeUnit: 'TP',
    paguAnggaran: 5800000000,
    realisasiKeuangan: 4263000000,
    persenKeuangan: 73.50,
    targetFisik: 75.00,
    realisasiFisik: 78.20,
    deviasiFisik: 3.20,
    triwulan: 'TW III',
    statusKinerja: 'Baik'
  },
  {
    id: 'rfk-03',
    unitKerja: 'Bidang Hortikultura',
    kodeUnit: 'HORTI',
    paguAnggaran: 3600000000,
    realisasiKeuangan: 2700000000,
    persenKeuangan: 75.00,
    targetFisik: 75.00,
    realisasiFisik: 79.50,
    deviasiFisik: 4.50,
    triwulan: 'TW III',
    statusKinerja: 'Sangat Baik'
  },
  {
    id: 'rfk-04',
    unitKerja: 'Bidang Perkebunan',
    kodeUnit: 'BUN',
    paguAnggaran: 3200000000,
    realisasiKeuangan: 2297600000,
    persenKeuangan: 71.80,
    targetFisik: 72.00,
    realisasiFisik: 76.40,
    deviasiFisik: 4.40,
    triwulan: 'TW III',
    statusKinerja: 'Baik'
  },
  {
    id: 'rfk-05',
    unitKerja: 'Bidang PSP (Sarana & Prasarana)',
    kodeUnit: 'PSP',
    paguAnggaran: 3700000000,
    realisasiKeuangan: 2678800000,
    persenKeuangan: 72.40,
    targetFisik: 74.00,
    realisasiFisik: 77.10,
    deviasiFisik: 3.10,
    triwulan: 'TW III',
    statusKinerja: 'Baik'
  }
];

