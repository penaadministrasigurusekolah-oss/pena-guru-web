/**
 * PENA GURU - AI PROXY HANDLER & TIER PARAMETER RESTRICTION ENGINE
 * File: js/core/ai-handler.js
 * Fungsi: Mengumpulkan masukan formulir, melakukan pembatasan berdasarkan Tier aktif,
 *         serta meracik payload prompt untuk dikirim ke AI Proxy Backend.
 */

// URL Backend Proxy AI (Disesuaikan dengan endpoint proxy Anda)
const AI_PROXY_URL = "https://pena-ai-proxy.vercel.app/api/generate";

/**
 * Main Controller: Pemicu Utama Pembuatan Administrasi Guru
 */
async function generateTeacherAdmin(formElement) {
    try {
        // 1. Ambil Data Tier Aktif dari LocalStorage Browser
        const userTier = localStorage.getItem("user_tier") || "FREE";
        const userEmail = localStorage.getItem("user_email") || "guest@penaguru.com";
        const userNPSN = localStorage.getItem("user_npsn") || "";

        // 2. Ambil Nilai dari Formulir Dashboard
        const subject = document.querySelector('input[placeholder*="Matematika"]')?.value || "Umum";
        const phaseClass = document.querySelector('select')?.value || "Fase D (Kelas 7-9)";
        const timeRangeSelect = document.getElementById("selectRentangWaktu")?.value || "pertemuan";

        // Checklist Output Dokumen
        const includeLKPD = document.getElementById("chk_lkpd")?.checked || false;
        const includeSoalHOTS = document.getElementById("chk_soal_hots")?.checked || false;
        const includeSumatif = document.getElementById("chk_sumatif")?.checked || false;

        // File Reference Uploads
        const refFileInput = document.querySelector('#area_upload_referensi input[type="file"]');
        const raporFileInput = document.querySelector('#area_upload_rapor_sekolah input[type="file"]');

        // 3. ENFORCER LOGIKA TIER (Validasi Sisi Klien Sebelum Kirim Ke AI)
        const validatedParameters = enforceTierRestrictions({
            tier: userTier,
            subject: subject,
            phaseClass: phaseClass,
            timeRange: timeRangeSelect,
            includeLKPD: includeLKPD,
            includeSoalHOTS: includeSoalHOTS,
            includeSumatif: includeSumatif,
            hasRefFile: refFileInput && refFileInput.files.length > 0,
            hasRaporFile: raporFileInput && raporFileInput.files.length > 0
        });

        // Tampilkan Indikator Processing / Loading
        showAIGenerateLoading(true);

        // 4. Susun Master Prompt Berdasarkan Parameter Terverifikasi
        const masterPrompt = buildMasterPrompt(validatedParameters, userNPSN);

        // 5. Payload Akhir Kirim ke AI Proxy
        const payload = {
            user_email: userEmail,
            user_tier: userTier,
            parameters: validatedParameters,
            prompt: masterPrompt
        };

        // 6. Eksekusi Panggilan API ke AI Proxy
        const response = await fetch(AI_PROXY_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        showAIGenerateLoading(false);

        if (response.ok && result.status === "success") {
            // Simpan Hasil Generasi ke Storage & Redirect ke Preview Cetak
            localStorage.setItem("generated_doc_content", result.output_text);
            window.location.href = "preview-cetak.html";
        } else {
            alert("Gagal Meracik Dokumen: " + (result.message || "Terjadi kesalahan pada AI Proxy."));
        }

    } catch (error) {
        showAIGenerateLoading(false);
        console.error("AI Generation Error:", error);
        alert("Terjadi kesalahan koneksi saat meracik modul dengan AI.");
    }
}

/**
 * FUNSI ENFORCER: Membatasi Parameter Secara Ketat Berdasarkan Tier
 */
function enforceTierRestrictions(params) {
    const tier = params.tier;
    let restricted = { ...params };

    if (tier === "FREE") {
        // Tier 1: Hanya Modul Ringkas Per Pertemuan, Tanpa LKPD/HOTS/Sumatif
        restricted.timeRange = "pertemuan";
        restricted.includeLKPD = false;
        restricted.includeSoalHOTS = false;
        restricted.includeSumatif = false;
        restricted.hasRefFile = false;
        restricted.hasRaporFile = false;

    } else if (tier === "BASIC") {
        // Tier 2: Maksimal 1 Bab, Termasuk LKPD Interaktif, Tanpa Sumatif Semester
        if (restricted.timeRange === "semester" || restricted.timeRange === "tahun") {
            restricted.timeRange = "bab";
        }
        restricted.includeSoalHOTS = false;
        restricted.includeSumatif = false;
        restricted.hasRaporFile = false;

    } else if (tier === "PREMIUM") {
        // Tier 3: All Unlocked (1 Bab, Semester, 1 Tahun), Tanpa Upload Rapor Sekolah
        restricted.hasRaporFile = false;

    } else if (tier === "INSTITUSI") {
        // Tier 4: All Unlocked + Integrasi Rapor Sekolah
        // Semua parameter diperbolehkan tanpa pembatasan
    }

    return restricted;
}

/**
 * FUNGSI RACIK MASTER PROMPT AI (Sesuai Standar Kurikulum Merdeka)
 */
function buildMasterPrompt(params, npsn) {
    let prompt = `Anda adalah Asisten Pembelajaran AI Pakar Kurikulum Merdeka untuk Platform PENA-GURU.\n`;
    prompt += `Tugas Anda: Raciklah dokumen administrasi guru yang komprehensif, terstruktur, dan berstandar kementerian.\n\n`;

    prompt += `--- PARAMETER MODUL ---\n`;
    prompt += `- Mata Pelajaran: ${params.subject}\n`;
    prompt += `- Fase/Kelas: ${params.phaseClass}\n`;
    prompt += `- Skala/Rentang Waktu: ${params.timeRange.toUpperCase()}\n`;
    prompt += `- Tier Lisensi: ${params.tier}\n`;

    if (npsn) {
        prompt += `- NPSN Sekolah: ${npsn}\n`;
    }

    prompt += `\n--- DOKUMEN YANG WAJIB DIHASILKAN ---\n`;
    prompt += `1. Modul Ajar Utama (Prinsip Mindful, Meaningful, Joyful)\n`;

    if (params.includeLKPD) {
        prompt += `2. Lembar Kerja Peserta Didik (LKPD) Interaktif\n`;
    }
    if (params.includeSoalHOTS) {
        prompt += `3. Kisi-kisi, Rubrik Penilaian, dan Soal Evaluasi Berbasis HOTS\n`;
    }
    if (params.includeSumatif) {
        prompt += `4. Paket Asesmen Sumatif Akhir Lingkup Materi + Kunci Jawaban\n`;
    }

    if (params.hasRaporFile && params.tier === "INSTITUSI") {
        prompt += `\n--- INSTRUKSI EKSKLUSIF TIER INSTITUSI ---\n`;
        prompt += `Selaraskan langkah pembelajaran dengan indikator Rapor Mutu Pendidikan Sekolah (Fokus pada penguatan Literasi, Numerasi, dan Karakter Pancasila).\n`;
    }

    prompt += `\nFormat keluaran harus menggunakan Clean HTML/Markdown rapi yang siap dicetak pada kertas A4.`;

    return prompt;
}

/**
 * Indicator Loading Generator
 */
function showAIGenerateLoading(isLoading) {
    const btn = document.querySelector('button[onclick*="generateTeacherAdmin"], button[type="button"]:has(span)');
    if (btn) {
        if (isLoading) {
            btn.disabled = true;
            btn.innerHTML = `⏳ Sedang Meracik Administrasi dengan AI...`;
            btn.classList.add("opacity-50", "cursor-not-allowed");
        } else {
            btn.disabled = false;
            btn.innerHTML = `✨ Racik Administrasi dengan AI`;
            btn.classList.remove("opacity-50", "cursor-not-allowed");
        }
    }
}
