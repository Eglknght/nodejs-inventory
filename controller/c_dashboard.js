const m_produk = require('../model/m_produk')
const m_stok = require('../model/m_stok')
module.exports = {
    index: async (req, res) => {
        let data_kategori = await m_produk.get_jumlah_produk_per_kategori()
        let total_produk = await m_produk.get_total_produk()
        let total_kategori = await m_produk.get_total_kategori()
        let produk_stok_menipis = await m_stok.get_produk_stok_menipis()

        let dataview = {
            konten: 'dashboard/index',
            uri_segment: req.path.split('/'),
            chartLabels: data_kategori.map(item => item.kategori_nama),
            chartData: data_kategori.map(item => item.jumlah),
            total_produk: total_produk,
            total_kategori: total_kategori,
            total_stok_menipis: produk_stok_menipis.length,
        }
        

        res.render('template/struktur', dataview)
    }
}