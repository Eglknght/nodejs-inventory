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
            let insert = await m_stok.input_stok_masuk(req)
            let isi_notif = `berhasil menambahkan stok`
            if (insert.affectedRows > 0) {
                res.redirect(`/stok-masuk?note=sukses&pesan=${isi_notif}`)
            }
        } catch (error) {
            let dataview = {
                konten: 'stok/form-stok-masuk',
                uri_segment: req.path.split('/'),
                info_error: error
            }
            res.render('template/struktur', dataview)
        }
    }
}