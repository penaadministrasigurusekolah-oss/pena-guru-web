/**
 * PENA-GURU - AI PROCESSING ENGINE
 * Multi-Pool Serverless Engine via Google Apps Script (GAS)
 */

const AIHandler = {
    // 🌟 1. POOL URL GOOGLE APPS SCRIPT (BERISI PROXY AKUN & API KEY ANDA)
    GAS_POOLS: [
        "https://script.google.com/macros/s/AKfycbyW7cqULCe91u0gjfwVH57DQ0o4xnE7fJdIqIWRYHA_zhnVkdfyqy_Pjv3B17GoP0aR/exec",
        "https://script.google.com/macros/s/AKfycbyX8PL-hWFvYii9TQ9_uUi-wrqtpNks5aKPuA5GG71m31LrHh3J7cIqNCLZUxtBF2Uf/exec",
        "https://script.google.com/macros/s/AKfycbyfrpbIju9cZSGl_mO-wCmN8X2If0E_P4Tl1HB4xjIJqR3FrX2rygBK2n-ZsnyYUEqf/exec"
    ],

    // Memilih server proxy secara acak dari pool untuk meratakan beban kuota
    getGasUrl: function() {
        const index = Math.floor(Math.random() * this.GAS_POOLS.length);
        return this.GAS_POOLS[index];
    }
};

async function kirimPermintaanModulAI(dataInput) {
    try {
        console.log("[Pena Guru AI] Memulai pemrosesan dokumen...");

        // PROMPT INTEGRASI KURIKULUM NASIONAL & DEEP LEARNING
        const promptSystem = `
Anda adalah Pakar Kurikulum Nasional & Pembelajaran Mendalam (Deep Learning) Indonesia.
Susunlah draf dokumen administrasi lengkap dengan rincian:
- Nama Pengajar/Penyusun: ${dataInput.namaGuru}
- Mata Pelajaran: ${dataInput.mapel}
- Tingkat / Jenjang: ${dataInput.jenjang}
- Materi Pokok: ${dataInput.materiPokok}
- Satuan Pendidikan: ${dataInput.jenisSekolah}
- Hambatan / Catatan Khusus Siswa: ${dataInput.hambatanSiswa}

Sajikan keluaran dokumen secara profesional menggunakan tag HTML terstruktur (seperti <h2>, <h3>, <table>, <p>, <ul>, <ol>) yang siap cetak dan rapi tanpa markdown code block.
`;

        const targetGasUrl = AIHandler.getGasUrl();
        console.log("[Pena Guru AI] Mengirim permintaan via Server Proxy Pool:", targetGasUrl);

        const response = await fetch(targetGasUrl, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({ prompt: promptSystem, data: dataInput })
        });

        if (!response.ok) {
            throw new Error(`Server Proxy merespons dengan status HTTP ${response.status}`);
        }

        const gasData = await response.json();
        let hasilTeks = null;

        if (gasData.status === "success" && gasData.result) {
            hasilTeks = gasData.result;
        } else if (typeof gasData === "string") {
            hasilTeks = gasData;
        }

        if (!hasilTeks) {
            throw new Error("Gagal menerima hasil peracikan dari server proxy AI.");
        }

        return hasilTeks;

    } catch (error) {
        console.error("[Pena Guru Error] Terjadi kendala pemrosesan AI:", error);
        alert(`❌ Gagal memproses dokumen: ${error.message}`);
        return null;
    }
}
