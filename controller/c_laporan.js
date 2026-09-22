const m_produk = require('../model/m_produk')
const m_stok = require('../model/m_stok')
const moment = require('moment')
moment.locale('id')

module.exports = {
    allstok: async (req, res) => {
        let filter = {
            kode_produk: req.query.kodeproduk || null,
            tanggal_mulai: req.query.tanggal_mulai || null,
            tanggal_akhir: req.query.tanggal_akhir || null,
        }

        let dataview = {
            req: req,
            konten: 'laporan/allstok',
            uri_segment: req.path.split('/'),
            info_error: null,
            produk: await m_produk.get_semua_produk(),
            datalaporan: await m_stok.getAll_by_produk(filter),
            moment: moment,
        }
        res.render('template/struktur', dataview)
    },
}