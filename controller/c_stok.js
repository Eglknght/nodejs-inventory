const m_produk = require('../model/m_produk')
const m_stok = require('../model/m_stok')

module.exports = {
    index : async (req, res) => {
        console.log(req.body)
        let dataview = {
            konten: 'stok/index',
            uri_segment: req.path.split('/'),
            req: req,
            produk: await m_stok.get_produk_stok(),
        }
        // console.log(dataview)
        res.render('template/struktur', dataview)
    },

    form_stok_masuk: async (req, res) => {
        let dataview = {
            req : req,
            konten: 'stok/form-stok-masuk',
            uri_segment: req.path.split('/'),
            info_error: null,
            produk: await m_produk.get_semua_produk(),
        }
        res.render('template/struktur', dataview)
    },

    proses_stok_masuk: async (req, res) => {
        let kode_produk = req.body.form_produk
        let jumlah_stok = req.body.form_jumlah
        try {
            let stok_terakhir = await m_stok.cek_current_stok(kode_produk)
            let sisa_terakhir = 0
            
            if (stok_terakhir.length > 0) {
                sisa_terakhir = stok_terakhir[0].stok

            }

            let stok_akhir = sisa_terakhir + Number(jumlah_stok)
            if (jumlah_stok < 1) {
                let isi_info = `Jumlah stok yang keluar minimal 1`
                return res.redirect(`/stok?note=info&isi_info=${isi_info}`)
            }
            await m_stok.input_stok_masuk(req, stok_akhir)
            let insert = await m_stok.update_stok_keluar(stok_akhir, kode_produk)
            let isi_notif = `berhasil menambahkan stok`
            if (insert.affectedRows > 0) {
                res.redirect(`/stok?note=sukses&pesan=${isi_notif}`)
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
            req : req,
            konten: 'stok/form-stok-keluar',
            uri_segment: req.path.split('/'),
            info_error: null,
            produk: await m_produk.get_semua_produk(),
        }
        res.render('template/struktur', dataview)
    },
    proses_stok_keluar: async (req, res) => {
        let kode_produk = req.body.form_produk
        let jumlah_stok = req.body.form_jumlah
        try {
            let stok_terakhir = await m_stok.cek_current_stok(kode_produk)
            let sisa_terakhir = 0
            
            if (stok_terakhir.length > 0) {
                sisa_terakhir = stok_terakhir[0].stok

            }

            let stok_akhir = sisa_terakhir - Number(jumlah_stok)
            if (jumlah_stok > stok_akhir) {
                let isi_info = `Jumlah stok yang keluar melebihi stok yang tersedia`
                return res.redirect(`/stok?note=info&isi_info=${isi_info}`)
            }
            if (jumlah_stok < 1) {
                let isi_info = `Jumlah stok yang keluar minimal 1`
                return res.redirect(`/stok?note=info&isi_info=${isi_info}`)
            }

            await m_stok.input_stok_keluar(req, stok_akhir)
            let insert = await m_stok.update_stok_keluar(stok_akhir, kode_produk)
            let isi_notif = `berhasil mengeluarkan stok`
            if (insert.affectedRows > 0) {
                res.redirect(`/stok?note=sukses&pesan=${isi_notif}`)
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