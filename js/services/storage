/**
 * SERVICES - STORAGE HANDLER
 * Fungsi: Memudahkan penyimpanan & pembacaan data di memori browser
 */

const StorageService = {
    simpan(kunci, nilai) {
        try {
            const dataString = typeof nilai === 'object' ? JSON.stringify(nilai) : nilai;
            localStorage.setItem(kunci, dataString);
        } catch (e) {
            console.error("Gagal menyimpan ke LocalStorage:", e);
        }
    },

    ambil(kunci) {
        const data = localStorage.getItem(kunci);
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    },

    hapus(kunci) {
        localStorage.removeItem(kunci);
    }
};
