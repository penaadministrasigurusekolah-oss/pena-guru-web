/**
 * PENA GURU - AUTHENTICATION & DATABASE SYNC HANDLER
 * File: js/services/auth-handler.js
 */

const DB_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxdcSYFU9YSqEeZihryGnG4SCv_6ms-WpIIDrlj3tvMuurwiS-JOzYENhL-NL_N5iN6OA/exec";

// Callback Google OAuth Login
function handleGoogleCredentialResponse(response) {
    try {
        const responsePayload = parseJwt(response.credential);
        const userEmail = responsePayload.email;
        const userName = responsePayload.name;

        syncUserToGoogleSheets(userEmail, userName);
    } catch (e) {
        console.error("JWT Decode Error:", e);
        alert("Gagal memproses sesi login Google.");
    }
}

// Fungsi Sinkronisasi Utama ke Google Sheets Backend
function syncUserToGoogleSheets(email, nama) {
    showAuthLoading(true);

    const payload = {
        action: "sync_user",
        email: email,
        nama: nama
    };

    fetch(DB_WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        showAuthLoading(false);

        if (data.status === "success") {
            const uData = data.user_data;

            // Simpan Data Sesi Pengguna di Browser
            localStorage.setItem("user_uid", uData.user_uid);
            localStorage.setItem("user_email", uData.email);
            localStorage.setItem("user_name", uData.nama);
            localStorage.setItem("user_tier", uData.active_tier || "FREE");
            localStorage.setItem("user_npsn", uData.npsn || "");
            localStorage.setItem("tier_expired", uData.expired_at || "");

            // Update UI Dashboard
            if (typeof initDashboardTierUI === "function") {
                initDashboardTierUI();
            }
        } else {
            alert("Gagal Sync Database: " + (data.message || "Terjadi kesalahan."));
        }
    })
    .catch(err => {
        showAuthLoading(false);
        console.error("Auth Sync Error:", err);
        alert("Gagal terhubung ke server database PENA-GURU.");
    });
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function showAuthLoading(isLoading) {
    const btn = document.getElementById("googleBtnContainer");
    if (btn) {
        btn.style.opacity = isLoading ? "0.5" : "1";
        btn.style.pointerEvents = isLoading ? "none" : "auto";
    }
}
