/**
 * PENA-GURU - DATA SISTEM CONFIGURATION
 * Fungsi: Menyimpan basis data master untuk karakteristik, jenjang, mapel, dan instrumen berkas
 */

const DATA_SISTEM = {
  // 1. KARAKTERISTIK SATUAN PENDIDIKAN
  karakteristikLembaga: [
    { id: 'reguler', nama: 'Sekolah Reguler / Umum' },
    { id: 'inklusi', nama: 'Sekolah Inklusi (Penyelenggara Pendidikan Inklusif)' },
    { id: 'slb', nama: 'Sekolah Luar Biasa (SLB / Kebutuhan Khusus)' }
  ],

  // 2. KATEGORI HAMBATAN SLB / INKLUSI
  hambatanSLB: [
    { id: 'A', nama: 'Hambatan Penglihatan (Tunanetra - Tipe A)' },
    { id: 'B', nama: 'Hambatan Pendengaran / Bicara (Tunarungu - Tipe B)' },
    { id: 'C', nama: 'Hambatan Intelektual (Tunagrahita - Tipe C)' },
    { id: 'D', nama: 'Hambatan Anggota Gerak / Fisik (Tunadaksa - Tipe D)' },
    { id: 'E', nama: 'Hambatan Emosi & Perilaku (Tunalaras - Tipe E)' },
    { id: 'AUTIS', nama: 'Spektrum Autisme / Gangguan Komunikasi' },
    { id: 'GANDA', nama: 'Hambatan Majemuk / Tunaganda' }
  ],

  // 3. DAFTAR BERKAS PERANGKAT AJAR GURU (PERSONAL)
  berkasGuru: [
    { id: 'modul_ajar', nama: 'Modul Ajar Harian (RPP Plus)' },
    { id: 'lkpd', nama: 'LKPD / Lembar Kerja Siswa' },
    { id: 'rubrik_asesmen', nama: 'Rubrik Asesmen & Penilaian Otentik' },
    { id: 'jurnal_harian', nama: 'Jurnal Harian & Refleksi Mengajar' },
    { id: 'peta_konsep', nama: 'Pemetaan Konsep Inti Materi' }
  ],

  // 4. DAFTAR BERKAS MANAJEMEN LEMBAGA (SEKOLAH)
  berkasSekolah: [
    { id: 'kosp', nama: 'KOSP (Kurikulum Operasional Satuan Pendidikan)' },
    { id: 'jadwal_blok', nama: 'Matriks Pengorganisasian Jadwal Blok' },
    { id: 'sk_koding_ai', nama: 'SK & Panduan Pemanfaatan Koding & AI Sekolah' },
    { id: 'instrumen_wellbeing', nama: 'Instrumen Evaluasi Well-Being Siswa & Guru' },
    { id: 'program_rkjm', nama: 'Draf Rencana Kerja Jangka Menengah (RKJM)' }
  ],

  // 5. MATA PELAJARAN PER JENJANG (Mendukung Koding & AI)
  jenjangDanKelas: {
    paud: {
      label: "TK / PAUD",
      mapel: [
        "Jati Diri & Nilai Agama",
        "Literasi & STEAM (Sains, Tech, Engineering, Art, Math)",
        "Motorik Kasar & Halus",
        "Lainnya (Input Manual)"
      ]
    },
    sd: {
      label: "Sekolah Dasar (SD)",
      mapel: [
        "Pendidikan Pancasila",
        "Bahasa Indonesia",
        "Matematika",
        "IPAS (Ilmu Pengetahuan Alam & Sosial)",
        "Pendidikan Agama & Budi Pekerti",
        "PJOK",
        "Seni & Budaya",
        "Bahasa Inggris",
        "Koding & Kecerdasan Buatan (AI)",
        "Lainnya (Input Manual / Mulok)"
      ]
    },
    smp: {
      label: "Sekolah Menengah Pertama (SMP)",
      mapel: [
        "Pendidikan Pancasila",
        "Bahasa Indonesia",
        "Matematika",
        "IPA (Ilmu Pengetahuan Alam)",
        "IPS (Ilmu Pengetahuan Sosial)",
        "Informatika / Koding & AI",
        "Bahasa Inggris",
        "Pendidikan Agama & Budi Pekerti",
        "PJOK",
        "Seni & Prakarya",
        "Lainnya (Input Manual / Mulok)"
      ]
    },
    sma: {
      label: "SMA / SMALB",
      mapel: [
        "Pendidikan Pancasila",
        "Bahasa Indonesia",
        "Matematika Lanjut / Reguler",
        "Fisika",
        "Kimia",
        "Biologi",
        "Informatika & Terapan AI",
        "Ekonomi",
        "Sosiologi",
        "Geografi",
        "Bahasa Inggris Lanjut",
        "Lainnya (Input Manual / Mulok)"
      ]
    },
    smk: {
      label: "SMK (Kejuruan)",
      mapel: [
        "Dasar-Dasar Program Keahlian",
        "Konsentrasi Keahlian Teknis",
        "Informatika, Koding & AI Terapan",
        "Proyek IPAS SMK",
        "Produk Kreatif & Kewirausahaan",
        "Bahasa Inggris Industri",
        "Lainnya (Input Manual / Mulok)"
      ]
    }
  }
};

// Bekukan objek agar aman dari manipulasi runtime
Object.freeze(DATA_SISTEM);
