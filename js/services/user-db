/**
 * Pena Administrasi Guru & Sekolah - User Database & Feature Access Manager
 * Mengelola memori lokal pengguna dan sinkronisasi otomatis ke Google Sheets Admin
 */

const GAS_DATABASE_URL = "https://script.google.com/macros/s/AKfycbxFpV1Dxp1Y27KC-EaOnEdiT04jyeX5WA229kHcy6K133fPhrU-ucjl0Qo1iTlt79QzMg/exec";

const UserDB = {
    // Mengambil data user aktif dari localStorage
    getCurrentUser: function() {
        const userRaw = localStorage.getItem('pena_current_user');
        return userRaw ? JSON.parse(userRaw) : null;
    },

    // Menyimpan data user aktif ke localStorage
    saveCurrentUser: function(userObj) {
        localStorage.setItem('pena_current_user', JSON.stringify(userObj));
    },

    // 🌟 SIMPAN DATA PENGGUNA KE GOOGLE SHEETS ADMIN
    simpanPenggunaKeCloud: async function(dataPengguna) {
        try {
            const payload = {
                action: "save_user",
                email: dataPengguna.email || localStorage.getItem('pena_user_email') || "Tamu/Tidak Ada Email",
                nama: dataPengguna.nama || localStorage.getItem('pena_user_name') || "Guru Pena",
                kodePaket: dataPengguna.kodePaket || "eceran",
                expiredDate: dataPengguna.expiredDate || "Permanen/Eceran",
                idTiket: dataPengguna.idTiket || "-",
                status: "Verified"
            };

            await fetch(GAS_DATABASE_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            console.log("Data pengguna berhasil dicatat ke backup Google Sheets.");
        } catch (err) {
            console.error("Gagal backup ke Google Sheets:", err);
        }
    },

    // 🌟 PULIHKAN DATA DARI GOOGLE SHEETS JIKA CACHE/LOCALSTORAGE TERHAPUS
    pulihkanStatusPengguna: async function(emailUser) {
        if (!emailUser) return false;

        try {
            const payload = {
                action: "check_user",
                email: emailUser.trim()
            };

            const response = await fetch(GAS_DATABASE_URL, {
                method: "POST",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) return false;
            const hasil = await response.json();

            if (hasil.status === "success" && hasil.found) {
                const dataCloud = hasil.data;
                
                // Setel ulang hak akses di LocalStorage lokal pengguna secara otomatis
                localStorage.setItem('qris_verified', 'true');
                localStorage.setItem('pena_user_premium', 'true');
                localStorage.setItem('pena_current_user', JSON.stringify({
                    email: dataCloud.email,
                    nama: dataCloud.nama,
                    paketAktif: dataCloud.kodePaket,
                    expiredDate: dataCloud.expiredDate
                }));

                console.log("Status langganan berhasil dipulihkan dari Google Sheets!");
                return true;
            }
        } catch (err) {
            console.error("Gagal memeriksa pemulihan data dari server:", err);
        }
        return false;
    },

    // MENGECEK HAK AKSES PREMIUM
    hasPremiumAccess: function(kategoriFitur) {
        if (localStorage.getItem('pena_user_premium') === 'true') return true;
        
        const user = this.getCurrentUser();
        if (!user || !user.paketAktif) return false;

        const hariIni = new Date();
        const tanggalExpired = new Date(user.expiredDate);
        if (hariIni > tanggalExpired) return false;

        if (kategoriFitur === 'Guru') {
            return ['premium-1-bulan', 'premium-3-bulan', 'premium-6-bulan', 'premium-12-bulan'].includes(user.paketAktif);
        }
        
        if (kategoriFitur === 'Lembaga') {
            return ['premium-6-bulan', 'premium-12-bulan'].includes(user.paketAktif);
        }

        return false;
    },

    isDocUnlocked: function(berkasId, kategoriFitur) {
        if (this.hasPremiumAccess(kategoriFitur)) return true; 
        return localStorage.getItem(`pena_unlock_${berkasId}`) === 'true';
    }
};

Object.freeze(UserDB);
