/**
 * UTILS - VALIDATORS
 * Fungsi: Memvalidasi format input user (Email, NPSN, PIN)
 */

function validasiEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validasiNPSN(npsn) {
    // NPSN resmi terdiri dari 8 digit angka
    const re = /^[0-9]{8}$/;
    return re.test(String(npsn).trim());
}

function validasiTeksKosong(teks) {
    return teks && teks.trim().length > 0;
}
