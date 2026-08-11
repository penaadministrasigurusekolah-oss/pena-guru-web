/**
 * Pena Administrasi Guru & Sekolah - Sekolah Controller
 * Mengontrol logika input form dan penghematan token berkas Lembaga/Sekolah
 * Arsitektur: Dana 0 Rupiah (JSON Parser, Hybrid Template)
 */

const SekolahController = {
    // Menyusun Prompt ketat khusus paket dokumen Lembaga/Sekolah
    generatePrompt: function(formData) {
        let promptBase = `Bertindaklah sebagai Konsultan Evaluasi Kurikulum Nasional 2026 tingkat makro dengan pendekatan Deep Learning. `;
        promptBase += `Hasilkan data dalam format JSON BERSIH tanpa kalimat pembuka/penutup, dan tanpa markdown (\`\`\`json). Harus langsung objek JSON.\n\n`;
        
        promptBase += `DATA INSTITUSI:\n`;
        promptBase += `- Karakteristik: ${formData.karakteristikLembaga}\n`;
        promptBase += `- Jenjang: ${formData.jenjang}\n`;
        if(formData.raporSekolah) promptBase += `- Analisis Masalah Rapor Pendidikan: ${formData.raporSekolah}\n`;
        
        // Custom Prompt berdasarkan jenis berkas makro sekolah yang dipilih
        switch(formData.jenisBerkas) {
            case 'kosp_pendahuluan':
                promptBase += `TUGAS: Rumuskan komponen dinamis untuk Bab Pendahuluan KOSP berlandaskan Permendikdasmen No.13 Tahun 2025. Penuhi struktur JSON ini:\n`;
                promptBase += JSON.stringify({
                    karakteristik_khas: "1 paragraf tajam mengenai analisis kekuatan lingkungan, budaya lokal, dan ekosistem spesifik jenjang ini",
                    kontekstualisasi_3pilar: "1 paragraf bagaimana visi lembaga ini menurunkan pilar Mindful, Meaningful, dan Joyful ke aksi nyata"
                }, null, 2);
                break;
                
            case 'matriks_jadwal_blok':
                promptBase += `TUGAS: Rancang kerangka pembagian waktu menggunakan Sistem Blok/Modular agar belajar bisa mendalam. Penuhi struktur JSON ini:\n`;
                promptBase += JSON.stringify({
                    pembagian_durasi_blok: "Penjelasan durasi blok harian/mingguan yang ideal untuk jenjang ini",
                    contoh_penggabungan_mapel: "Rekomendasi 2 mapel yang digabung dalam satu blok proyek riset mini",
                    catatan_fleksibilitas: "Cara mengantisipasi agar siswa tidak jenuh dengan durasi panjang (Joyful)"
                }, null, 2);
                break;
                
            case 'matriks_integrasi_8dimensi':
                promptBase += `TUGAS: Buat matriks pemetaan pengganti proyek P5, tunjukkan bagaimana dimensi profil lulusan menyatu ke intrakurikuler. Penuhi struktur JSON ini:\n`;
                promptBase += JSON.stringify({
                    dimensi_fokus: "Pilih 2-3 dari 8 dimensi lulusan terbaru yang paling relevan dengan kondisi/jenjang saat ini",
                    metode_integrasi_materi: "Strategi praktis menyisipkan dimensi tersebut langsung ke dalam tema materi pelajaran inti"
                }, null, 2);
                break;
                
            case 'survei_wellbeing_murid':
                promptBase += `TUGAS: Rancang instrumen evaluasi iklim emosional sekolah (Joyful Learning). Penuhi struktur JSON ini:\n`;
                promptBase += JSON.stringify({
                    indikator_kenyamanan: "Kriteria rasa aman dan bahagia siswa di lingkungan sekolah saat ini",
                    daftar_pertanyaan_kuesioner: [
                        "Pertanyaan 1 seputar hubungan dengan guru (skala deskriptif)",
                        "Pertanyaan 2 seputar beban tugas (skala deskriptif)"
                    ]
                }, null, 2);
                break;
                
            default:
                promptBase += `TUGAS: Berikan rekomendasi draf operasional tata kelola strategis jangka pendek untuk dokumen: ${formData.jenisBerkas}. Penuhi struktur JSON ini:\n`;
                promptBase += JSON.stringify({
                    maksud_tujuan: "Tujuan pembuatan dokumen bagi institusi",
                    poin_rekomendasi_utama: ["Rekomendasi aksi 1", "Rekomendasi aksi 2"]
                }, null, 2);
                break;
        }
        
        return promptBase;
    },

    // Menangani rendering data JSON dari AI ke template HTML sekolah di preview-cetak
    renderToTemplate: function(berkasId, rawAiData, containerDoc) {
        try {
            const data = JSON.parse(rawAiData);
            let htmlResult = '';
            
            switch(berkasId) {
                case 'kosp_pendahuluan':
                    htmlResult = `
                        <div class="p-6 border-2 border-slate-800 rounded-lg bg-white font-sans text-slate-800">
                            <div class="text-center border-b-4 double border-slate-800 pb-2 mb-6">
                                <h1 class="text-lg font-black tracking-widest uppercase">DOKUMEN OPERASIONAL SATUAN PENDIDIKAN</h1>
                                <p class="text-xs tracking-wider mt-0.5">Visi Tata Kelola Makro Berbasis Permendikdasmen No. 13 Tahun 2025</p>
                            </div>
                            
                            <h2 class="text-md font-bold uppercase mb-2">BAB I: PENDAHULUAN</h2>
                            
                            <div class="mb-4">
                                <h3 class="text-sm font-bold text-slate-700 mb-1">A. Landasan Hukum Yuridis (Statis Nasional)</h3>
                                <p class="text-xs text-justify leading-relaxed text-slate-600">
                                    Dokumen ini disusun sebagai wujud kepatuhan terhadap Permendikdasmen Nomor 13 Tahun 2025 mengenai standarisasi Kurikulum Nasional melalui pendekatan Pembelajaran Mendalam (Deep Learning). Struktur makro kelembagaan dialihkan secara penuh untuk memprioritaskan pemahaman konseptual, transisi integrasi kokurikuler tanpa sekat P5 tradisional, serta pemenuhan lingkungan yang aman, adaptif, dan transformatif.
                                </p>
                            </div>
                            
                            <div class="mb-4">
                                <h3 class="text-sm font-bold text-slate-700 mb-1">B. Analisis Karakteristik Khas Satuan Pendidikan</h3>
                                <p class="text-xs text-justify leading-relaxed bg-slate-50 p-3 border border-slate-200 rounded">${data.karakteristik_khas}</p>
                            </div>
                            
                            <div class="mb-4">
                                <h3 class="text-sm font-bold text-slate-700 mb-1">C. Kontekstualisasi Strategis 3 Pilar Deep Learning</h3>
                                <p class="text-xs text-justify leading-relaxed bg-slate-50 p-3 border border-slate-200 rounded">${data.kontekstualisasi_3pilar}</p>
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'matriks_jadwal_blok':
                    htmlResult = `
                        <div class="p-6 border-2 border-slate-800 rounded-lg bg-white font-sans text-slate-800">
                            <h2 class="text-lg font-bold text-center uppercase border-b border-slate-800 pb-2 mb-4">Matriks Penjadwalan Fleksibel (System Blok)</h2>
                            
                            <div class="space-y-3 text-xs">
                                <p><strong>1. Rekomendasi Alokasi Durasi Blok:</strong><br> ${data.pembagian_durasi_blok}</p>
                                <p><strong>2. Strategi Penggabungan Materi Kolaboratif:</strong><br> ${data.contoh_penggabungan_mapel}</p>
                                
                                <div class="mt-4 p-3 bg-amber-50 border border-amber-300 rounded text-amber-900">
                                    <h4 class="font-bold mb-1">💡 Pengkondisian Iklim Kelas (Pilar Joyful):</h4>
                                    <p class="leading-relaxed font-medium">${data.catatan_fleksibilitas}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
                    
                default:
                    htmlResult = `
                        <div class="p-6 border border-slate-800 rounded bg-white font-sans text-xs">
                            <h2 class="text-sm font-bold uppercase border-b pb-2 mb-3">Draf Tata Kelola: ${berkasId.replace(/_/g, ' ')}</h2>
                            <p class="mb-3"><strong>Maksud & Tujuan Dokumen:</strong><br> ${data.maksud_tujuan}</p>
                            <h4 class="font-bold mb-1">📋 Poin Implementasi Utama Satuan:</h4>
                            <ul class="list-disc list-inside space-y-1">
                                ${data.poin_rekomendasi_utama ? data.poin_rekomendasi_utama.map(poin => `<li>${poin}</li>`).join('') : '<li>Draf berhasil dicatat di sistem lokal.</li>'}
                            </ul>
                        </div>
                    `;
                    break;
            }
            
            containerDoc.innerHTML = htmlResult;
        } catch (e) {
            console.error("Gagal memproses data JSON Sekolah dari AI: ", e);
            containerDoc.innerHTML = `<div class="p-4 bg-red-50 text-red-700 border border-red-300 rounded">Gagal memproses draf dokumen lembaga. Silakan coba klik cetak ulang.</div>`;
        }
    }
};
