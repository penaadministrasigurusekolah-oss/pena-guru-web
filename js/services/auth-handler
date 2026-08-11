/**
 * SERVICES - AUTH & SESSION HANDLER
 * Fungsi: Mengelola status sesi login / tamu pengguna
 */

function cekStatusSesi() {
    const metodeLogin = localStorage.getItem('thc_login_method') || 'Tamu';
    const kuota = localStorage.getItem('thc_kuota_gratis') || '1';
    
    return {
        metode: metodeLogin,
        kuota: parseInt(kuota)
    };
}

function aturSesiTamu() {
    if (!localStorage.getItem('thc_login_method')) {
        localStorage.setItem('thc_login_method', 'Tamu');
        localStorage.setItem('thc_kuota_gratis', '1');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    aturSesiTamu();
});
