/**
 * PENA-GURU - AI PROCESSING ENGINE
 * Handles API generation requests and formats learning module outputs safely.
 */

const AIHandler = {
    // KUNCI API POOL / BACKUP
    API_KEYS: [
        "AIzaSy..." // Masukkan API Key Google Gemini Anda di sini jika menggunakan panggilan langsung
    ],

    getApiKey: function() {
        return this.API_KEYS[0] || "";
    }
};

async function kirimPermintaanModulAI(dataInput) {
    try {
        console.log("[Pena Guru Secure] Menggunakan Jalur Server Pool: 1");

        // RANCANG PROMPT PEMBELAJARAN MENDALAM
        const promptSystem = `
Anda adalah Pakar Kurikulum Nasional & Pembelajaran Mendalam (Deep Learning).
Buatkan draf administrasi lengkap untuk:
- Nama Guru: ${dataInput.namaGuru}
- Mata Pelajaran: ${dataInput.mapel}
- Tingkat/Jenjang: ${dataInput.jenjang}
- Materi Pokok: ${dataInput.materiPokok}
- Satuan Pendidikan: ${dataInput.jenisSekolah}
- Catatan Khusus: ${dataInput.hambatanSiswa}

Sajikan dokumen dalam format HTML terstruktur rapi (gunakan tag h2, h3, table, p, ul, ol) siap cetak.
`;

        const apiKey = AIHandler.getApiKey();
        
        // Panggilan API Gemini
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: promptSystem }]
                }]
            })
        });

        if (!response.ok) {
            const errJson = await response.json().catch(() => ({}));
            throw new Error(errJson.error?.message || `HTTP Error ${response.status}`);
        }

        const data = await response.json();

        // 🌟 PENGECEKAN AMAN RESPOS V2 (MENCEGAH READ PROPERTIES OF UNDEFINED '0')
        if (data && data.candidates && data.candidates.length > 0) {
            const candidate = data.candidates[0];
            if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                return candidate.content.parts[0].text;
            }
        }

        // Fallback jika API mengembalikan struktur kosong
        if (data.error) {
            throw new Error(data.error.message);
        }

        throw new Error("Respon dari AI tidak memuat teks kandidat yang valid.");

    } catch (error) {
        console.error("[Pena Guru Error] Terjadi kendala sistem:", error);
        alert(`Gagal memproses dokumen: ${error.message}`);
        return null;
    }
}
