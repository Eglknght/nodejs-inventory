const m_produk = require('../model/m_produk')
const { form_tambah } = require('./c_user')
module.exports = {
    index: async (req, res) => {
        let dataview = {
            konten: 'master-produk/index',
            uri_segment: req.path.split('/'),
            req: req,
            konten: 'master-produk/index',
            produk: await m_produk.get_semua_produk(),
        }
        res.render('template/struktur', dataview)
    },

    form_tambah: async (req, res) => {
        let dataview = {
            konten: 'master-produk/form-tambah',
            uri_segment: req.path.split('/'),
            info_error: null,
            kategori: await m_produk.get_semua_kategori(),
        }
        res.render('template/struktur', dataview)
    },

    proses_simpan: async (req, res) => {
        try {
            let insert = await m_produk.tambah(req)
            let isi_notif = `berhasil membuat produk baru`
            if (insert.affectedRows > 0) {
                res.redirect(`/master-produk?note=sukses&pesan=${isi_notif}`)
            }
        } catch (error) {
            let dataview = {
                konten: 'master-produk/form-tambah',
                uri_segment: req.path.split('/'),
                info_error: error
            }
            res.render('template/struktur', dataview)
        }
    }
}