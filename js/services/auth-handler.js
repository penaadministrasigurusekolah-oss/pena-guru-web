/**
 * PENA GURU - GOOGLE AUTHENTICATION & DATABASE SYNC
 * File: js/services/auth-handler.js
 */

const DB_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw4bfcxamMbEbos8oqllka7WEngqFA7HdLfWpMOVJ8Bs-BABRpueS8appsU2ABArogSsQ/exec";

// Callback Otomatis Saat Google Auth Berhasil Login
function handleGoogleCredentialResponse(response) {
    try {
        const responsePayload = parseJwt(response.credential);
        const userEmail = responsePayload.email;
        const userName = responsePayload.name;

        showAuthLoading(true);

        const payload = {
            action: "sync_user",
            email: userEmail,
            nama: userName
        };

        fetch(DB_WEB_APP_URL, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            showAuthLoading(false);

            if (data.status === "success") {
                const uData = data.user_data;

                // Simpan Sesi Pengguna & Tier di LocalStorage Browser
                localStorage.setItem("user_uid", uData.user_uid);
                localStorage.setItem("user_email", uData.email);
                localStorage.setItem("user_name", uData.nama);
                localStorage.setItem("user_tier", uData.active_tier || "FREE");
                localStorage.setItem("user_npsn", uData.npsn || "");
                localStorage.setItem("tier_expired", uData.expired_at || "");

                // Redirect atau Buka Kunci Dashboard
                if (typeof initDashboardTierUI === "function") {
                    initDashboardTierUI();
                } else {
                    window.location.href = "dashboard.html";
                }
            } else {
                alert("Gagal Sinkronisasi Database: " + (data.message || "Terjadi kesalahan."));
            }
        })
        .catch(err => {
            showAuthLoading(false);
            console.error("Auth Error:", err);
            alert("Gagal terhubung ke server database PENA-GURU.");
        });

    } catch (e) {
        console.error("JWT Decode Error:", e);
        alert("Gagal memproses sesi login Google.");
    }
}

// Fungsi Bantuan Decode JWT Token
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Indicator Loading Toggle
function showAuthLoading(isLoading) {
    const btn = document.getElementById("googleBtnContainer");
    if (btn) {
        btn.style.opacity = isLoading ? "0.5" : "1";
        btn.style.pointerEvents = isLoading ? "none" : "auto";
    }
}
