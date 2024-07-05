const m_produk = require('../model/m_produk')
const m_stok = require('../model/m_stok')

module.exports = {
    form_stok_masuk: async (req, res) => {
        let dataview = {
            konten: 'stok/form-stok-masuk',
            uri_segment: req.path.split('/'),
            info_error: null,
            produk: await m_produk.get_semua_produk(),
        }
        res.render('template/struktur', dataview)
    },

    proses_stok_masuk: async (req, res) => {
        try {
            let stok_terakhir = await m_stok.cek_stok_sisa(req.body.form_produk)
            let sisa_terakhir = 0
            
            if (stok_terakhir.length > 0) {
                sisa_terakhir = stok_terakhir[0].stok_sisa

            }

            let stok_akhir = sisa_terakhir + Number(req.body.form_jumlah)
            if (req.body.form_jumlah < 1) {
                let isi_info = `Jumlah stok yang keluar minimal 1`
                return res.redirect(`/stok-keluar?note=info&isi_info=${isi_info}`)
            }
            let insert = await m_stok.input_stok_masuk(req, stok_akhir)
            let isi_notif = `berhasil menambahkan stok`
            if (insert.affectedRows > 0) {
                res.redirect(`/stok-masuk?note=sukses&pesan=${isi_notif}`)
            }

        } catch (error) {
            // console.log(error)
            let dataview = {
                konten: 'stok/form-stok-masuk',
                uri_segment: req.path.split('/'),
                info_error: error,
                produk: await m_produk.get_semua_produk(),
            }
            res.render('template/struktur', dataview)
        }
    },
    form_stok_keluar: async (req, res) => {
        let dataview = {
            konten: 'stok/form-stok-keluar',
            uri_segment: req.path.split('/'),
            info_error: null,
            produk: await m_produk.get_semua_produk(),
        }
        res.render('template/struktur', dataview)
    },
    proses_stok_keluar: async (req, res) => {
        try {
            let stok_terakhir = await m_stok.cek_stok_sisa(req.body.form_produk)
            let sisa_terakhir = 0
            
            if (stok_terakhir.length > 0) {
                sisa_terakhir = stok_terakhir[0].stok_sisa

            }

            let stok_akhir = sisa_terakhir - Number(req.body.form_jumlah)
            if (req.body.form_jumlah > stok_akhir) {
                let isi_info = `Jumlah stok yang keluar melebihi stok yang tersedia`
                return res.redirect(`/stok-keluar?note=info&isi_info=${isi_info}`)
            }
            if (req.body.form_jumlah < 1) {
                let isi_info = `Jumlah stok yang keluar minimal 1`
                return res.redirect(`/stok-keluar?note=info&isi_info=${isi_info}`)
            }

            let insert = await m_stok.input_stok_keluar(req, stok_akhir)
            let isi_notif = `berhasil mengeluarkan stok`
            if (insert.affectedRows > 0) {
                res.redirect(`/stok-keluar?note=sukses&pesan=${isi_notif}`)
            }

        } catch (error) {
            // console.log(error)
            let dataview = {
                konten: 'stok/form-stok-keluar',
                uri_segment: req.path.split('/'),
                info_error: error,
                produk: await m_produk.get_semua_produk(),
            }
            res.render('template/struktur', dataview)
        }
    },
}