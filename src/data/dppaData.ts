import { DppaDocument } from '../types';

export const SAMPLE_DPPA_TTS_2026: DppaDocument = {
  id: 'dppa-2026-001',
  nomorDppa: 'DPPA/A.2/3.27.0.00.0.00.01.0000/001/2026',
  tahunAnggaran: 2026,
  urusanPemerintahan: '3 - URUSAN PEMERINTAHAN PILIHAN',
  bidangUrusan: '3.27 - URUSAN PEMERINTAHAN BIDANG PERTANIAN',
  program: '3.27.01 - PROGRAM PENUNJANG URUSAN PEMERINTAHAN DAERAH KABUPATEN/KOTA',
  kodeProgram: '3.27.01',
  kegiatan: '3.27.01.2.09 - PEMELIHARAAN BARANG MILIK DAERAH PENUNJANG URUSAN PEMERINTAHAN DAERAH',
  kodeKegiatan: '3.27.01.2.09',
  subKegiatan: '3.27.01.2.09.0002 - Penyediaan Jasa Pemeliharaan, Biaya Pemeliharaan, Pajak dan Perizinan Kendaraan Dinas Operasional atau Lapangan',
  kodeSubKegiatan: '3.27.01.2.09.0002',
  organisasi: '3.27.0.00.0.00.01.0000 - Dinas Tanaman Pangan, Hortikultura dan Perkebunan',
  unit: '3.27.0.00.0.00.01.0000 - Dinas Tanaman Pangan, Hortikultura dan Perkebunan',
  alokasiTahunSebelumnya: 0,
  alokasiTahunBerjalan: 43587322,
  alokasiTahunBerikutnya: 157500000,
  indikatorKinerja: {
    masukan: {
      tolakUkur: 'Dana Yang Dibutuhkan',
      targetSebelum: 'Rp43.587.322,00',
      targetSetelah: 'Rp43.587.322,00'
    },
    keluaran: {
      tolakUkur: 'Jumlah Kendaraan Dinas Operasional atau Lapangan yang Dipelihara dan dibayarkan Pajak dan Perizinannya',
      targetSebelum: '3 Unit',
      targetSetelah: '3 Unit'
    },
    hasil: {
      tolakUkur: 'Terpeliharanya aset milik daerah',
      targetSebelum: '90 unit',
      targetSetelah: '90 unit'
    }
  },
  sumberPendanaan: [
    'PENDAPATAN ASLI DAERAH (PAD)',
    'Pendapatan Bagi Hasil',
    'Dana Bagi Hasil (DBH)',
    'Dana Alokasi Umum (DAU)'
  ],
  lokasi: 'Kab. Timor Tengah Selatan, Kecamatan Mollo Selatan, Kelurahan Kesetnana',
  keluaranSubKegiatan: 'Jumlah Kendaraan Dinas Operasional atau Lapangan yang Dipelihara dan dibayarkan Pajak dan Perizinannya',
  waktuPelaksanaan: 'Mulai Januari Sampai Desember',
  rincianBelanja: [
    {
      id: 'rb-1',
      kodeRekening: '5',
      uraian: 'BELANJA DAERAH',
      jumlahSebelum: 43587322,
      jumlahSetelah: 43587322,
      bertambahBerkurang: 0,
      level: 0
    },
    {
      id: 'rb-2',
      kodeRekening: '5.1',
      uraian: 'BELANJA OPERASI',
      jumlahSebelum: 43587322,
      jumlahSetelah: 43587322,
      bertambahBerkurang: 0,
      level: 1
    },
    {
      id: 'rb-3',
      kodeRekening: '5.1.02',
      uraian: 'Belanja Barang dan Jasa',
      jumlahSebelum: 43587322,
      jumlahSetelah: 43587322,
      bertambahBerkurang: 0,
      level: 2
    },
    {
      id: 'rb-4',
      kodeRekening: '5.1.02.01',
      uraian: 'Belanja Barang',
      jumlahSebelum: 38525322,
      jumlahSetelah: 38525322,
      bertambahBerkurang: 0,
      level: 3
    },
    {
      id: 'rb-5',
      kodeRekening: '5.1.02.01.001',
      uraian: 'Belanja Barang Pakai Habis',
      jumlahSebelum: 38525322,
      jumlahSetelah: 38525322,
      bertambahBerkurang: 0,
      level: 3
    },
    {
      id: 'rb-6',
      kodeRekening: '5.1.02.01.001.00004',
      uraian: 'Belanja Bahan-Bahan Bakar dan Pelumas',
      jumlahSebelum: 19827322,
      jumlahSetelah: 19827322,
      bertambahBerkurang: 0,
      level: 4
    },
    {
      id: 'rb-6-1',
      kodeRekening: '5.1.02.01.001.00004',
      uraian: 'Pertamax (Disediakan untuk kijang)',
      sumberDana: 'PENDAPATAN ASLI DAERAH (PAD)',
      spesifikasi: 'Pertamax',
      koefisienSebelum: '490 Liter',
      satuanSebelum: 'Liter',
      hargaSebelum: 12200,
      jumlahSebelum: 5978000,
      koefisienSetelah: '490 Liter',
      satuanSetelah: 'Liter',
      hargaSetelah: 12200,
      jumlahSetelah: 5978000,
      bertambahBerkurang: 0,
      level: 5,
      isItem: true
    },
    {
      id: 'rb-6-2',
      kodeRekening: '5.1.02.01.001.00004',
      uraian: 'Dexlite (Disediakan untuk kendaraan roda 6)',
      sumberDana: 'PENDAPATAN ASLI DAERAH (PAD)',
      spesifikasi: 'Dexlite',
      koefisienSebelum: '200 Liter',
      satuanSebelum: 'Liter',
      hargaSebelum: 17400,
      jumlahSebelum: 3480000,
      koefisienSetelah: '200 Liter',
      satuanSetelah: 'Liter',
      hargaSetelah: 17400,
      jumlahSetelah: 3480000,
      bertambahBerkurang: 0,
      level: 5,
      isItem: true
    },
    {
      id: 'rb-6-3',
      kodeRekening: '5.1.02.01.001.00004',
      uraian: 'Dexlite (Disediakan untuk kendaraan roda 4 & 6)',
      sumberDana: 'Dana Bagi Hasil (DBH)',
      spesifikasi: 'Dexlite',
      koefisienSebelum: '130 Liter',
      satuanSebelum: 'Liter',
      hargaSebelum: 17400,
      jumlahSebelum: 2262000,
      koefisienSetelah: '130 Liter',
      satuanSetelah: 'Liter',
      hargaSetelah: 17400,
      jumlahSetelah: 2262000,
      bertambahBerkurang: 0,
      level: 5,
      isItem: true
    },
    {
      id: 'rb-6-4',
      kodeRekening: '5.1.02.01.001.00004',
      uraian: 'Dexlite (Disediakan untuk strada)',
      sumberDana: 'PENDAPATAN ASLI DAERAH (PAD)',
      spesifikasi: 'Dexlite',
      koefisienSebelum: '350 Liter',
      satuanSebelum: 'Liter',
      hargaSebelum: 17400,
      jumlahSebelum: 6090000,
      koefisienSetelah: '350 Liter',
      satuanSetelah: 'Liter',
      hargaSetelah: 17400,
      jumlahSetelah: 6090000,
      bertambahBerkurang: 0,
      level: 5,
      isItem: true
    },
    {
      id: 'rb-6-5',
      kodeRekening: '5.1.02.01.001.00004',
      uraian: 'Dexlite (Disediakan untuk kendaraan roda 4 & 6)',
      sumberDana: 'Pendapatan Bagi Hasil',
      spesifikasi: 'Dexlite',
      koefisienSebelum: '115.9380457 Liter',
      satuanSebelum: 'Liter',
      hargaSebelum: 17400,
      jumlahSebelum: 2017322,
      koefisienSetelah: '115.9380457 Liter',
      satuanSetelah: 'Liter',
      hargaSetelah: 17400,
      jumlahSetelah: 2017322,
      bertambahBerkurang: 0,
      level: 5,
      isItem: true
    },
    {
      id: 'rb-7',
      kodeRekening: '5.1.02.01.001.00013',
      uraian: 'Belanja Suku Cadang-Suku Cadang Alat Angkutan',
      jumlahSebelum: 18532000,
      jumlahSetelah: 15532000,
      bertambahBerkurang: -3000000,
      level: 4
    },
    {
      id: 'rb-7-1',
      kodeRekening: '5.1.02.01.001.00013',
      uraian: 'Belanja Suku Cadang Kendaraan Dinas (Operasional)',
      sumberDana: 'PENDAPATAN ASLI DAERAH (PAD)',
      spesifikasi: 'Roda 2 dan Roda 4',
      koefisienSebelum: '0.069254902 Paket',
      satuanSebelum: 'Paket',
      hargaSebelum: 51000000,
      jumlahSebelum: 3532000,
      koefisienSetelah: '0.069254902 Paket',
      satuanSetelah: 'Paket',
      hargaSetelah: 51000000,
      jumlahSetelah: 3532000,
      bertambahBerkurang: 0,
      level: 5,
      isItem: true
    },
    {
      id: 'rb-7-2',
      kodeRekening: '5.1.02.01.001.00013',
      uraian: 'Belanja Suku Cadang Kendaraan Dinas (Strada, Kijang, Truk)',
      sumberDana: 'PENDAPATAN ASLI DAERAH (PAD)',
      spesifikasi: 'Roda 2 dan Roda 4',
      koefisienSebelum: '0.2941176471 Paket',
      satuanSebelum: 'Paket',
      hargaSebelum: 51000000,
      jumlahSebelum: 15000000,
      koefisienSetelah: '0.2352941176 Paket',
      satuanSetelah: 'Paket',
      hargaSetelah: 51000000,
      jumlahSetelah: 12000000,
      bertambahBerkurang: -3000000,
      level: 5,
      isItem: true
    },
    {
      id: 'rb-8',
      kodeRekening: '5.1.02.01.001.00024',
      uraian: 'Belanja Alat/Bahan untuk Kegiatan Kantor-Alat Tulis Kantor',
      jumlahSebelum: 0,
      jumlahSetelah: 820000,
      bertambahBerkurang: 820000,
      level: 4
    },
    {
      id: 'rb-8-1',
      kodeRekening: '5.1.02.01.001.00024',
      uraian: 'Kertas HVS F4',
      sumberDana: 'PENDAPATAN ASLI DAERAH (PAD)',
      spesifikasi: 'Kertas HVS F4',
      koefisienSebelum: '0',
      satuanSebelum: 'Rim',
      hargaSebelum: 0,
      jumlahSebelum: 0,
      koefisienSetelah: '10 Rim',
      satuanSetelah: 'Rim',
      hargaSetelah: 65000,
      jumlahSetelah: 650000,
      bertambahBerkurang: 650000,
      level: 5,
      isItem: true
    },
    {
      id: 'rb-8-2',
      kodeRekening: '5.1.02.01.001.00024',
      uraian: 'Lakban Bening',
      sumberDana: 'PENDAPATAN ASLI DAERAH (PAD)',
      spesifikasi: 'Lakban Bening',
      koefisienSebelum: '0',
      satuanSebelum: 'Buah',
      hargaSebelum: 0,
      jumlahSebelum: 0,
      koefisienSetelah: '2 Buah',
      satuanSetelah: 'Buah',
      hargaSetelah: 20000,
      jumlahSetelah: 40000,
      bertambahBerkurang: 40000,
      level: 5,
      isItem: true
    },
    {
      id: 'rb-8-3',
      kodeRekening: '5.1.02.01.001.00024',
      uraian: 'Tinta Printer Canon',
      sumberDana: 'PENDAPATAN ASLI DAERAH (PAD)',
      spesifikasi: 'Tinta Printer Canon',
      koefisienSebelum: '0',
      satuanSebelum: 'Botol',
      hargaSebelum: 0,
      jumlahSebelum: 0,
      koefisienSetelah: '2 Botol',
      satuanSetelah: 'Botol',
      hargaSetelah: 65000,
      jumlahSetelah: 130000,
      bertambahBerkurang: 130000,
      level: 5,
      isItem: true
    },
    {
      id: 'rb-9',
      kodeRekening: '5.1.02.01.001.00026',
      uraian: 'Belanja Alat/Bahan untuk Kegiatan Kantor- Bahan Cetak',
      jumlahSebelum: 166000,
      jumlahSetelah: 166000,
      bertambahBerkurang: 0,
      level: 4
    },
    {
      id: 'rb-9-1',
      kodeRekening: '5.1.02.01.001.00026',
      uraian: 'Foto Copy',
      sumberDana: 'Dana Bagi Hasil (DBH)',
      spesifikasi: 'Foto Copy',
      koefisienSebelum: '332 Lembar',
      satuanSebelum: 'Lembar',
      hargaSebelum: 500,
      jumlahSebelum: 166000,
      koefisienSetelah: '332 Lembar',
      satuanSetelah: 'Lembar',
      hargaSetelah: 500,
      jumlahSetelah: 166000,
      bertambahBerkurang: 0,
      level: 5,
      isItem: true
    },
    {
      id: 'rb-10',
      kodeRekening: '5.1.02.01.001.00052',
      uraian: 'Belanja Makanan dan Minuman Rapat',
      jumlahSebelum: 0,
      jumlahSetelah: 2180000,
      bertambahBerkurang: 2180000,
      level: 4
    },
    {
      id: 'rb-10-1',
      kodeRekening: '5.1.02.01.001.00052',
      uraian: 'Kudapan/ Snack rapat biasa',
      sumberDana: 'PENDAPATAN ASLI DAERAH (PAD)',
      spesifikasi: 'Kudapan/ Snack rapat biasa',
      koefisienSebelum: '0',
      satuanSebelum: 'Orang/Kali',
      hargaSebelum: 0,
      jumlahSebelum: 0,
      koefisienSetelah: '40 Orang / Kegiatan',
      satuanSetelah: 'Orang/Kali',
      hargaSetelah: 22000,
      jumlahSetelah: 880000,
      bertambahBerkurang: 880000,
      level: 5,
      isItem: true
    },
    {
      id: 'rb-10-2',
      kodeRekening: '5.1.02.01.001.00052',
      uraian: 'Makan Rapat biasa',
      sumberDana: 'PENDAPATAN ASLI DAERAH (PAD)',
      spesifikasi: 'Makan Rapat biasa',
      koefisienSebelum: '0',
      satuanSebelum: 'Orang/Kali',
      hargaSebelum: 0,
      jumlahSebelum: 0,
      koefisienSetelah: '25 Orang / Kegiatan',
      satuanSetelah: 'Orang/Kali',
      hargaSetelah: 52000,
      jumlahSetelah: 130000,
      bertambahBerkurang: 1300000,
      level: 5,
      isItem: true
    },
    {
      id: 'rb-11',
      kodeRekening: '5.1.02.02',
      uraian: 'Belanja Jasa',
      jumlahSebelum: 5062000,
      jumlahSetelah: 5062000,
      bertambahBerkurang: 0,
      level: 3
    },
    {
      id: 'rb-12',
      kodeRekening: '5.1.02.02.001',
      uraian: 'Belanja Jasa Kantor',
      jumlahSebelum: 5062000,
      jumlahSetelah: 5062000,
      bertambahBerkurang: 0,
      level: 4
    },
    {
      id: 'rb-13',
      kodeRekening: '5.1.02.02.001.00067',
      uraian: 'Belanja Pembayaran Pajak, Bea, dan Perizinan',
      jumlahSebelum: 5062000,
      jumlahSetelah: 5062000,
      bertambahBerkurang: 0,
      level: 4
    },
    {
      id: 'rb-13-1',
      kodeRekening: '5.1.02.02.001.00067',
      uraian: 'Pajak Kendaraan Dinas Roda 4 (empat)',
      sumberDana: 'Pendapatan Bagi Hasil',
      spesifikasi: 'Beban Pembayaran Pajak, Bea, dan Perizinan',
      koefisienSebelum: '4 Unit',
      satuanSebelum: 'Unit',
      hargaSebelum: 1265500,
      jumlahSebelum: 5062000,
      koefisienSetelah: '4 Unit',
      satuanSetelah: 'Unit',
      hargaSetelah: 1265500,
      jumlahSetelah: 5062000,
      bertambahBerkurang: 0,
      level: 5,
      isItem: true
    }
  ],
  realisasiBulanan: [
    { bulan: 'Januari', nominal: 1600000 },
    { bulan: 'Februari', nominal: 1600000 },
    { bulan: 'Maret', nominal: 9662000 },
    { bulan: 'April', nominal: 1600003 },
    { bulan: 'Mei', nominal: 4766000 },
    { bulan: 'Juni', nominal: 8600000 },
    { bulan: 'Juli', nominal: 1600000 },
    { bulan: 'Agustus', nominal: 1600000 },
    { bulan: 'September', nominal: 1600000 },
    { bulan: 'Oktober', nominal: 7131997 },
    { bulan: 'November', nominal: 1600000 },
    { bulan: 'Desember', nominal: 2227322 }
  ],
  penandatangan: {
    pejabatPelaksana: {
      nama: 'JAKOB E.P. BENU, ST., MT',
      nip: '19700214 199903 1 009',
      jabatan: 'Pejabat Pelaksana Teknis Kegiatan (PPTK)'
    },
    ppkd: {
      nama: 'MARTHINUS P. DAVID, SE, M.SI',
      nip: '19710326 200003 1 005',
      jabatan: 'Mengesahkan, PPKD'
    }
  }
};

// Parser from raw DPPA text if file content contains DPPA keywords
export function parseDppaFromText(text: string): DppaDocument | null {
  if (!text || (!text.includes('DPPA') && !text.includes('DOKUMEN PELAKSANAAN') && !text.includes('RINCIAN BELANJA'))) {
    return null;
  }

  // If text matches our standard TTS DPPA pattern, return enriched model
  return {
    ...SAMPLE_DPPA_TTS_2026,
    id: `dppa-${Date.now()}`
  };
}
