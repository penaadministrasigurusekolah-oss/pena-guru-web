/**
 * Pena Administrasi Guru & Sekolah - Guru Controller
 * Mengontrol logika input form dan penghematan token pembuatan berkas Guru
 * Arsitektur: Dana 0 Rupiah (JSON Parser, Hybrid Template)
 */

const GuruController = {
    // Menyusun Prompt ketat khusus paket dokumen Guru
    generatePrompt: function(formData) {
        let promptBase = `Bertindaklah sebagai pakar Kurikulum Nasional 2026 dengan pendekatan Deep Learning (Mindful, Meaningful, Joyful). `;
        promptBase += `Hasilkan data dalam format JSON BERSIH tanpa pembuka, tanpa penutup, dan tanpa markdown (\`\`\`json). Harus langsung objek JSON.\n\n`;
        
        promptBase += `DATA INPUT GURU:\n`;
        promptBase += `- Tingkat/Kelas: ${formData.kelas}\n`;
        promptBase += `- Mata Pelajaran: ${formData.mapel}\n`;
        if(formData.hambatan) promptBase += `- Hambatan Siswa: ${formData.hambatan}\n`;
        
        // Custom Prompt berdasarkan jenis berkas yang dipilih agar hemat token
        switch(formData.jenisBerkas) {
            case 'modul_ajar':
                promptBase += `- Model Pembelajaran: ${formData.modelPembelajaran}\n`;
                promptBase += `TUGAS: Buat draf aktivitas inti RPP/Modul Ajar 1 pertemuan yang meleburkan model tersebut ke 3 fase Pengalaman Belajar. Penuhi struktur JSON ini:\n`;
                promptBase += JSON.stringify({
                    tujuan_pembelajaran: "1 kalimat kompetensi esensial",
                    pertanyaan_pemantik: ["1 pertanyaan pemantik pemahaman mendalam"],
                    fase_memahami: "Aktivitas konkret guru memicu kesadaran/konflik kognitif sesuai sintaks awal model",
                    fase_mengaplikasi: "Aktivitas kolaboratif/problem solving kelompok nyata sesuai inti model",
                    fase_merefleksi: "Pertanyaan meta-kognitif siswa untuk merenungkan makna pelajaran"
                }, null, 2);
                break;
                
            case 'lkpd':
                promptBase += `TUGAS: Buat draf tantangan investigasi kelompok berbasis masalah (Problem Solving). Penuhi struktur JSON ini:\n`;
                promptBase += JSON.stringify({
                    judul_tantangan: "Nama aktivitas menarik dan joyful",
                    kasus_nyata: "Studi kasus pendek menarik seputar kehidupan sehari-hari siswa",
                    langkah_eksplorasi: ["Langkah 1 investigasi", "Langkah 2 analisis"],
                    ruang_kreatif_instruksi: "Petunjuk visual/gambar apa yang harus digambar siswa di lembar kerja"
                }, null, 2);
                break;
                
            case 'asesmen_diagnostik':
                promptBase += `TUGAS: Buat instrumen pemetaan awal. Penuhi struktur JSON ini:\n`;
                promptBase += JSON.stringify({
                    aspek_kognitif: ["2 pertanyaan prasyarat materi esensial"],
                    aspek_non_kognitif: ["2 pertanyaan emosional/kesiapan mental siswa (Mindful)"]
                }, null, 2);
                break;
                
            case 'asesmen_formatif':
                promptBase += `TUGAS: Buat rubrik penilaian otentik berkelanjutan berdasarkan Dimensi Profil Lulusan yang relevan. Penuhi struktur JSON ini:\n`;
                promptBase += JSON.stringify({
                    dimensi_diukur: "Misal: Penalaran Kritis atau Kolaborasi",
                    kriteria_layak: "Deskripsi perilaku siswa tingkat layak/cukup",
                    kriteria_cakap: "Deskripsi perilaku siswa tingkat cakap/bagus",
                    kriteria_mahir: "Deskripsi perilaku siswa tingkat mahir/mendalam",
                    format_refleksi_diri: "1 kalimat pemantik penilaian diri sendiri"
                }, null, 2);
                break;
                
            case 'kerangka_prota_promes':
                promptBase += `TUGAS: Buat kerangka alokasi waktu makro. Penuhi struktur JSON ini:\n`;
                promptBase += JSON.stringify({
                    alokasi_minggu_efektif: "Total minggu ideal untuk mengupas materi secara mendalam",
                    rincian_pekan_proyek: "Rencana 1 pekan khusus proyek kontekstual",
                    ruang_remedial_diagnostik: "Strategi jeda waktu intervensi bagi anak yang lambat"
                }, null, 2);
                break;
        }
        
        return promptBase;
    },

    // Menangani rendering data JSON dari AI ke template HTML di preview-cetak
    renderToTemplate: function(berkasId, rawAiData, containerDoc) {
        try {
            const data = JSON.parse(rawAiData);
            let htmlResult = '';
            
            // Mengubah data bersih JSON menjadi visual tabel/kolom yang super rapi di layout kertas
            switch(berkasId) {
                case 'modul_ajar':
                    htmlResult = `
                        <div class="p-6 border-2 border-slate-800 rounded-lg bg-white font-sans text-slate-800">
                            <h2 class="text-xl font-bold text-center uppercase border-b-2 border-slate-800 pb-3 mb-4">Rencana Pelaksanaan Pembelajaran Mendalam (RPM)</h2>
                            <p class="mb-2"><strong>Tujuan Pembelajaran (Kompetensi Esensial):</strong><br> ${data.tujuan_pembelajaran}</p>
                            <p class="mb-4"><strong>Pertanyaan Pemantik:</strong><br> "${data.pertanyaan_pemantik[0]}"</p>
                            
                            <table class="w-full border-collapse border border-slate-700 text-sm mt-4">
                                <thead class="bg-slate-100">
                                    <tr>
                                        <th class="border border-slate-700 p-2 w-1/4">Fase Pengalaman Belajar</th>
                                        <th class="border border-slate-700 p-2">Skenario Langkah Operasional (Sintaks Model Aktif)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="border border-slate-700 p-2 font-semibold bg-blue-50">1. Memahami (Mindful)</td>
                                        <td class="border border-slate-700 p-2 leading-relaxed">${data.fase_memahami}</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-700 p-2 font-semibold bg-emerald-50">2. Mengaplikasi (Meaningful)</td>
                                        <td class="border border-slate-700 p-2 leading-relaxed">${data.fase_mengaplikasi}</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-700 p-2 font-semibold bg-amber-50">3. Merefleksi (Joyful)</td>
                                        <td class="border border-slate-700 p-2 leading-relaxed">${data.fase_merefleksi}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    `;
                    break;
                
                case 'lkpd':
                    htmlResult = `
                        <div class="p-6 border-2 border-dashed border-slate-700 bg-amber-50/20 rounded-xl">
                            <div class="text-center mb-4">
                                <span class="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">Tantangan Investigasi Siswa</span>
                                <h2 class="text-xl font-black text-slate-900 mt-1">${data.judul_tantangan}</h2>
                            </div>
                            <div class="bg-white p-4 border border-slate-300 rounded-lg shadow-sm mb-4">
                                <h4 class="font-bold text-sm text-amber-900 mb-1">🧭 Konteks Masalah Masalah Dunia Nyata:</h4>
                                <p class="text-sm italic leading-relaxed text-slate-700">"${data.kasus_nyata}"</p>
                            </div>
                            <h4 class="font-bold text-sm mb-2">🛠️ Langkah Eksplorasi Kelompok:</h4>
                            <ol class="list-decimal list-inside space-y-1 text-sm mb-4">
                                ${data.langkah_eksplorasi.map(step => `<li>${step}</li>`).join('')}
                            </ol>
                            <div class="border-2 border-dashed border-slate-400 h-40 flex flex-col items-center justify-center rounded-lg bg-white p-4">
                                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">[ Ruang Ekspresi Visual Siswa ]</p>
                                <p class="text-xs text-center text-slate-500 max-w-xs">${data.ruang_kreatif_instruksi}</p>
                            </div>
                        </div>
                    `;
                    break;

                default:
                    // Fallback render generic sederhana jika tipe data belum spesifik
                    htmlResult = `<div class="p-4 bg-white border border-slate-800 rounded shadow"><pre class="text-xs whitespace-pre-wrap">${JSON.stringify(data, null, 2)}</pre></div>`;
            }
            
            containerDoc.innerHTML = htmlResult;
        } catch (e) {
            console.error("Gagal melakukan parsing data JSON dari AI: ", e);
            containerDoc.innerHTML = `<div class="p-4 bg-red-50 text-red-700 border border-red-300 rounded">Gagal memproses draf otomatis. Silakan coba klik cetak ulang.</div>`;
        }
    }
};
