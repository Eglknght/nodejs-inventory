const m_produk = require('../model/m_produk')

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

    // proses_simpan: async (req, res) => {
    //     try {
    //         let insert = await m_produk.tambah(req)
    //         let isi_notif = `berhasil membuat stok baru`
    //         if (insert.affectedRows > 0) {
    //             res.redirect(`/stok-masuk?note=sukses&pesan=${isi_notif}`)
    //         }
    //     } catch (error) {
    //         let dataview = {
    //             konten: 'stok/form-stok-masuk',
    //             uri_segment: req.path.split('/'),
    //             info_error: error
    //         }
    //         res.render('template/struktur', dataview)
    //     }
    // }
}