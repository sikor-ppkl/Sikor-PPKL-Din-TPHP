export type SectionId = 
  | 'beranda' 
  | 'profil' 
  | 'visi-misi' 
  | 'struktur-organisasi' 
  | 'sekretariat'
  | 'bidang' 
  | 'sikor-ppkl' 
  | 'kontak';

export type SekretariatTabId = 
  | 'data-asn'
  | 'program-kegiatan'
  | 'rencana-realisasi'
  | 'laporan-pad'
  | 'aset'
  | 'fisik-keuangan';

export interface AsnItem {
  id: string;
  nip: string;
  nama: string;
  jabatan: string;
  golongan: string;
  pangkat: string;
  status: 'PNS' | 'PPPK';
  unitKerja: string;
  pendidikanTerakhir: string;
  tmt: string;
}

export interface ProgramKegiatanItem {
  id: string;
  kodeProgram: string;
  namaProgram: string;
  kodeKegiatan: string;
  namaKegiatan: string;
  indikatorKinerja: string;
  targetKinerja: string;
  paguAnggaran: number;
  penanggungJawab: string;
  subBidangPengampu: string;
  status: 'Perencanaan' | 'Sedang Berjalan' | 'Terlaksana';
  dppaRefId?: string; // Reference to full DPPA document if available
}

export interface DppaRincianBelanjaItem {
  id: string;
  kodeRekening: string;
  uraian: string;
  sumberDana?: string;
  spesifikasi?: string;
  koefisienSebelum?: string;
  satuanSebelum?: string;
  hargaSebelum?: number;
  jumlahSebelum: number;
  koefisienSetelah?: string;
  satuanSetelah?: string;
  hargaSetelah?: number;
  jumlahSetelah: number;
  bertambahBerkurang: number;
  level: number; // 0=Belanja Daerah, 1=Kelompok, 2=Jenis, 3=Objek/Rincian, 4=Sub Rincian Item
  isItem?: boolean;
}

export interface DppaRealisasiBulanan {
  bulan: string;
  nominal: number;
}

export interface DppaDocument {
  id: string;
  nomorDppa: string;
  tahunAnggaran: number;
  urusanPemerintahan: string;
  bidangUrusan: string;
  program: string;
  kodeProgram: string;
  kegiatan: string;
  kodeKegiatan: string;
  subKegiatan: string;
  kodeSubKegiatan: string;
  organisasi: string;
  unit: string;
  alokasiTahunSebelumnya: number;
  alokasiTahunBerjalan: number;
  alokasiTahunBerikutnya: number;
  indikatorKinerja: {
    masukan: { tolakUkur: string; targetSebelum: string; targetSetelah: string };
    keluaran: { tolakUkur: string; targetSebelum: string; targetSetelah: string };
    hasil: { tolakUkur: string; targetSebelum: string; targetSetelah: string };
  };
  sumberPendanaan: string[];
  lokasi: string;
  keluaranSubKegiatan: string;
  waktuPelaksanaan: string;
  rincianBelanja: DppaRincianBelanjaItem[];
  realisasiBulanan: DppaRealisasiBulanan[];
  penandatangan: {
    pejabatPelaksana: { nama: string; nip: string; jabatan?: string };
    ppkd: { nama: string; nip: string; jabatan?: string };
  };
}

export interface RencanaRealisasiItem {
  id: string;
  namaKegiatan: string;
  triwulan: 'TW I' | 'TW II' | 'TW III' | 'TW IV';
  tahapanRencana: string;
  jadwalWaktu: string;
  targetOutput: string;
  capaianRealisasi: string;
  persenProgres: number;
  status: 'Selesai' | 'Sedang Berjalan' | 'Tahap Verifikasi' | 'Persiapan';
  catatanEvaluasi: string;
}

export interface LaporanPadItem {
  id: string;
  sumberPad: string;
  uraianRetribusi: string;
  targetTahunan: number;
  realisasiSdSaatIni: number;
  persentaseCapaian: number;
  periode: string;
  unitPengelola: string;
  nomorBuktiKas: string;
  statusSetoran: 'Terverifikasi Kasda' | 'Dalam Proses Rekonsiliasi';
}

export type KibCategory = 'KIB A' | 'KIB B' | 'KIB C' | 'KIB D' | 'KIB E' | 'KIB F';

export interface AsetItem {
  id: string;
  kodeLokasi?: string;
  kodeBarang: string;
  nomorRegister?: string;
  namaBarang: string;
  kib: KibCategory;
  kategori: string;
  spesifikasiMerk?: string;
  ukuranLuas?: string;
  bahan?: string;
  tahunPerolehan: number;
  jumlah?: number;
  satuan?: string;
  nilaiPerolehan: number;
  kondisi: 'Baik' | 'Rusak Ringan' | 'Rusak Berat';
  statusHakTanah?: string;
  nomorSertifikat?: string;
  penggunaan?: string;
  nomorPolisiBpkb?: string;
  asalUsul?: string;
  lokasiPenempatan: string;
  penanggungJawabAset: string;
  keterangan?: string;
}

export interface FisikKeuanganItem {
  id: string;
  unitKerja: string;
  kodeUnit: string;
  paguAnggaran: number;
  realisasiKeuangan: number;
  persenKeuangan: number;
  targetFisik: number;
  realisasiFisik: number;
  deviasiFisik: number;
  triwulan: 'TW I' | 'TW II' | 'TW III' | 'TW IV';
  statusKinerja: 'Sangat Baik' | 'Baik' | 'Perlu Perhatian';
}

export interface BidangSubMenuItem {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface BidangItem {
  id: string;
  code: string;
  name: string;
  shortName: string;
  kepalaBidang: string;
  nip: string;
  color: string;
  iconName: string;
  summary: string;
  tugasPokok: string;
  fungsi: string[];
  programUnggulan: {
    title: string;
    description: string;
    target: string;
    anggaran: string;
    lokasiFokus: string;
  }[];
  komoditasFokus?: string[];
  bannerImage: string;
  subMenus?: BidangSubMenuItem[];
}

export interface SikorProgram {
  id: string;
  kodeKegiatan: string;
  namaProgram: string;
  namaKegiatan: string;
  bidang: 'Sekretariat' | 'Tanaman Pangan' | 'Hortikultura' | 'Perkebunan' | 'PSP';
  tahunAnggaran: number;
  paguAnggaran: number; // in IDR
  realisasiKeuangan: number; // in IDR
  targetFisik: string;
  realisasiFisik: number; // percentage
  status: 'Perencanaan' | 'Sedang Berjalan' | 'Terverifikasi' | 'Perlu Evaluasi';
  triwulan: 'TW I' | 'TW II' | 'TW III' | 'TW IV';
  kecamatanFokus: string;
  penanggungJawab: string;
  tanggalLaporanTerakhir: string;
}

export interface OrgNode {
  id: string;
  position: string;
  name: string;
  nip: string;
  golongan: string;
  department: string;
  level: number;
  children?: OrgNode[];
}

export interface ContactMessage {
  id: string;
  namaLengkap: string;
  email: string;
  noHp: string;
  kecamatan: string;
  bidangTujuan: string;
  subjek: string;
  pesan: string;
  createdAt: string;
}
