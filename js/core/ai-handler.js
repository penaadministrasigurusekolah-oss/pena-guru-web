/**
 * =========================================================================
 * PENA GURU SYSTEM - UTAMA FRONTEND SECURITY & AI DISPATCHER
 * Author: Irval & System Architect
 * Validasi Keamanan: PIN 622742 + Rotasi Multi-Akun GAS + Auto-Drive Caching
 * =========================================================================
 */

// 1. DAFTAR KUMPULAN BENTENG URL GAS (3 PROXY POOL SINKRON DENGAN GOOGLE DRIVE)
const KUMPULAN_GAS_URL = [
    "https://script.google.com/macros/s/AKfycbybU4NeKnDdN9dnWCgcnPIouGNHt2n5Gl4rR34ZlaCzAQ-9Vxmwh8hnJskGT0xANjdk/exec", // Pool 1 (Utama)
    "https://script.google.com/macros/s/AKfycbzokiFjk4NZvSCqAGgJ3PtbEyxGDc5FNrjSojmwCslQUSM74e5Ed3qIOaY8W_zeMsrL/exec", // Pool 2 (Cadangan 1)
    "https://script.google.com/macros/s/AKfycbwBUICCUHWSC61mWoTEkRZRkQ1IQxUK4GjklvZD5fhDmHVxfDs9v073uDGFIUgFqCaU/exec"  // Pool 3 (Cadangan 2)
];

// Variabel internal untuk mencatat giliran akun secara otomatis
let indeksPoolSekarang = 0;

/**
 * FUNGSI 1: Mengirim Data Form ke AI melalui Perantara Benteng GAS
 */
async function kirimPermintaanModulAI(dataForm) {
    // A. STRATEGI ROUND-ROBIN: Pilih URL GAS secara bergantian untuk membagi kuota
    const urlTargetGAS = KUMPULAN_GAS_URL[indeksPoolSekarang];
    console.log(`[Pena Guru Secure] Menggunakan Jalur Server Pool: ${indeksPoolSekarang + 1}`);
    
    // Geser indeks giliran untuk permintaan berikutnya
    indeksPoolSekarang = (indeksPoolSekarang + 1) % KUMPULAN_GAS_URL.length;

    // B. PENGAMAN LAPIS BAJA: Selipkan PIN Rahasia secara otomatis di latar belakang jaringan
    const dataPaketAman = {
        ...dataForm,
        secure_pin: "622742" // Kunci validasi otentikasi Irval
    };

    try {
        // Tampilkan teks loading di layar web
        tampilkanLoadingCetak(true);

        // C. TEMBAK DATA KE GOOGLE APPS SCRIPT PERANTARA
        const response = await fetch(urlTargetGAS, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8" 
                // Menggunakan text/plain agar menghindari masalah CORS/Preflight di server GAS
            },
            body: JSON.stringify(dataPaketAman)
        });

        if (!response.ok) {
            throw new Error(`Koneksi Server Gagal: Status ${response.status}`);
        }

        const hasilServer = await response.json();

        // D. VALIDASI RESPONS DARI BENTENG SERVER GAS
        if (hasilServer.status === "error") {
            throw new Error(hasilServer.message);
        }

        // Catat di konsol browser sumber dokumen & status tier
        console.log(`[Pena Guru Tier] Mode Berkas: ${hasilServer.tier || "Standard"}`);
        if (hasilServer.source === "google_drive_cache") {
            console.log("[Pena Guru Cache] Dokumen dimuat instan dari Google Drive!");
        } else {
            console.log("[Pena Guru AI] Dokumen baru saja diracik oleh AI Gemini!");
        }

        // Mengembalikan teks HTML bersih buatan AI Gemini ke fungsi pemanggil
        return hasilServer.data;

    } catch (error) {
        console.error("[Pena Guru Error] Terjadi kendala sistem:", error);
        alert(`Gagal memproses dokumen: ${error.message}`);
        return null;
    } finally {
        // Matikan animasi loading setelah proses selesai (sukses/gagal)
        tampilkanLoadingCetak(false);
    }
}

/**
 * FUNGSI 2: Mengontrol Tampilan Tulisan Loading di Halaman Web
 */
function tampilkanLoadingCetak(statusAktif) {
    const elemenLoading = document.getElementById("loading-status");
    if (elemenLoading) {
        elemenLoading.style.display = statusAktif ? "block" : "none";
    }
}

/**
 * FUNGSI 3: Jembatan Penghubung Form Tombol Cetak HTML dengan JavaScript
 */
document.addEventListener("DOMContentLoaded", () => {
    const elemenForm = document.getElementById("form-cetak-modul") || document.getElementById("formDasbor");
    
    if (elemenForm) {
        elemenForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Mencegah halaman web melakukan reload/refresh otomatis

            // Ambil elemen kotak preview tempat dokumen akan ditampilkan
            const kotakPreview = document.getElementById("kotak-tampilan-preview");

            // Cek status verifikasi QRIS pengguna dari penyimpanan lokal browser (localStorage)
            const isUserPremium = localStorage.getItem("qris_verified") === "true" || localStorage.getItem("pena_user_premium") === "true";

            // A. Mengumpulkan data yang diisi oleh guru di formulir dasbor web Anda
            const dataInputGuru = {
                namaGuru: document.getElementById("input-nama-guru")?.value || document.getElementById("inputNama")?.value || "Guru Pena",
                mapel: document.getElementById("select-mapel")?.value || document.getElementById("selectDinamis")?.value || "-",
                jenjang: document.getElementById("select-jenjang")?.value || document.getElementById("selectJenjang")?.value || "-",
                materiPokok: document.getElementById("input-materi")?.value || document.getElementById("inputMateriPokok")?.value || "-",
                jenisSekolah: document.getElementById("select-jenis-sekolah")?.value || document.getElementById("selectKarakteristik")?.value || "Reguler",
                hambatanSiswa: document.getElementById("select-hambatan")?.value || document.getElementById("selectHambatan")?.value || "Tidak Ada",
                is_premium: isUserPremium // Mengirim status premium ke server GAS
            };

            // Beri tahu pengguna di kotak preview jika ada
            if (kotakPreview) {
                kotakPreview.innerHTML = `<p style="color: #1a73e8; font-style: italic;">Sedang merakit dokumen ${isUserPremium ? 'Super Lengkap (Premium)' : 'Standar'}...</p>`;
            }

            // B. Kirim data ke fungsi utama untuk ditembak ke AI
            const hasilDokumenHTML = await kirimPermintaanModulAI(dataInputGuru);

            // C. Masukkan dokumen tabel HTML hasil rumusan AI langsung ke layar dasbor web
            if (hasilDokumenHTML && kotakPreview) {
                kotakPreview.innerHTML = hasilDokumenHTML;
            } else if (kotakPreview && !hasilDokumenHTML) {
                kotakPreview.innerHTML = `<p style="color: red; font-style: italic;">Gagal menampilkan dokumen. Periksa konsol browser Anda.</p>`;
            }
        });
    }
});
