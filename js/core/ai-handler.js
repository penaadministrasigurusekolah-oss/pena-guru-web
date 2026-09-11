/**
 * PENA-GURU - AI PROCESSING ENGINE
 * Multi-Pool Proxy Backend Integration (GAS Pool 1, 2, 3)
 */

const AIHandler = {
    // 🌟 POOL URL GOOGLE APPS SCRIPT (URL DEPLOYMENT TERBARU)
    GAS_POOLS: [
        "https://script.google.com/macros/s/AKfycbzOizRAAtPZ1bweEEtUZCkIkuHOk_Z9R_J1vivztYanpGEDV8EJYxH6drI4XltvEbE/exec",
        "https://script.google.com/macros/s/AKfycbxXGNsbsDOkc0hQfAQALEQm99j5r8xyZVtGPOuWcCq4IUCstowhfSLPCuwKSAqn5YA/exec",
        "https://script.google.com/macros/s/AKfycbwiWfjr2NjXwsl29plmseof6C74pwJlip_GCNgJjNJCMvZ4GSBz3Rq4b8sC3NepvYLE/exec"
    ],

    // PIN Rahasia Pintu Masuk Server GAS
    SYSTEM_PIN: "622742",

    // Memilih server proxy acak dari pool untuk meratakan kuota
    getGasUrl: function() {
        const index = Math.floor(Math.random() * this.GAS_POOLS.length);
        return this.GAS_POOLS[index];
    }
};

async function kirimPermintaanModulAI(dataInput) {
    try {
        console.log("[Pena Guru AI] Memulai pemrosesan dokumen...");

        // SUSUN PAYLOAD LENGKAP DENGAN SECURE PIN & FITUR MASTER PROMPT
        const payloadData = {
            secure_pin: AIHandler.SYSTEM_PIN,
            is_premium: true, // Memicu DOKUMEN SUPER LENGKAP (A4 Siap Cetak)
            namaGuru: dataInput.namaGuru || "Guru Pengajar",
            mapel: dataInput.mapel || "Umum",
            jenjang: dataInput.jenjang || "SD",
            materiPokok: dataInput.materiPokok || "Materi Utama",
            jenisSekolah: dataInput.jenisSekolah || "Reguler",
            hambatanSiswa: dataInput.hambatanSiswa || "Tidak Ada"
        };

        let lastError = null;

        // ROTASI PANGGILAN POOL SERVER GAS
        for (let i = 0; i < AIHandler.GAS_POOLS.length; i++) {
            const targetGasUrl = AIHandler.GAS_POOLS[i];
            console.log(`[Pena Guru AI] Mengirim data ke Server Pool ${i + 1}:`, targetGasUrl);

            try {
                const response = await fetch(targetGasUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8"
                    },
                    body: JSON.stringify(payloadData),
                    redirect: "follow"
                });

                if (response.ok) {
                    const gasData = await response.json();
                    
                    if (gasData.status === "success" && gasData.data) {
                        console.log(`[Pena Guru AI] Berhasil diproses (Sumber: ${gasData.source})`);
                        return gasData.data; // Mengambil hasil teks HTML dari properti 'data'
                    } else if (gasData.status === "error") {
                        console.warn(`Server Proxy Pool ${i + 1} mengembalikan error:`, gasData.message);
                        lastError = new Error(gasData.message);
                    }
                } else {
                    console.warn(`Server Pool ${i + 1} merespons dengan HTTP Status: ${response.status}`);
                }
            } catch (errLoop) {
                console.warn(`Gagal terhubung ke Pool ${i + 1}:`, errLoop);
                lastError = errLoop;
            }
        }

        throw new Error(lastError?.message || "Gagal terhubung ke server proxy AI. Periksa koneksi internet Anda.");

    } catch (error) {
        console.error("[Pena Guru Error] Terjadi kendala pemrosesan AI:", error);
        alert(`❌ Gagal memproses dokumen: ${error.message}`);
        return null;
    }
}
