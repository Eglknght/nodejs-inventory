const m_produk = require('../model/m_produk')
const m_stok = require('../model/m_stok')

module.exports = {
    index: async (req, res) => {
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
            req: req,
            konten: 'stok/form-stok-masuk',
            uri_segment: req.path.split('/'),
            info_error: null,
            produk: await m_produk.get_semua_produk(),
        }
        res.render('template/struktur', dataview)
    },

    proses_stok_masuk: async (req, res) => {
        // Pastikan selalu berbentuk array, meskipun cuma pilih 1 produk
        let daftar_kode = [].concat(req.body.form_produk)
        let daftar_jumlah = [].concat(req.body.form_jumlah)


        try {
            for (let i = 0; i < daftar_kode.length; i++) {
                let kode_produk = daftar_kode[i]
                let jumlah_stok = daftar_jumlah[i]

                if (jumlah_stok < 1) {
                    let isi_info = `Jumlah stok minimal 1`
                    return res.redirect(`/stok?note=info&pesan=${isi_info}`)
                }

                let stok_terakhir = await m_stok.cek_current_stok(kode_produk)
                let sisa_terakhir = 0

                if (stok_terakhir.length > 0) {
                    sisa_terakhir = stok_terakhir[0].stok
                }

                let stok_akhir = sisa_terakhir + Number(jumlah_stok)

                await m_stok.input_stok_masuk(req, stok_akhir, kode_produk, jumlah_stok)
                await m_stok.update_stok_keluar(stok_akhir, kode_produk)
            }

            let isi_notif = `berhasil menambahkan stok`
            res.redirect(`/stok?note=sukses&pesan=${isi_notif}`)

        } catch (error) {
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
            req: req,
            konten: 'stok/form-stok-keluar',
            uri_segment: req.path.split('/'),
            info_error: null,
            produk: await m_produk.get_semua_produk(),
        }
        res.render('template/struktur', dataview)
    },

    proses_stok_keluar: async (req, res) => {
        let daftar_kode = [].concat(req.body.form_produk)
        let daftar_jumlah = [].concat(req.body.form_jumlah)

        try {
            for (let i = 0; i < daftar_kode.length; i++) {
                let kode_produk = daftar_kode[i]
                let jumlah_keluar = Number(daftar_jumlah[i])

                if (jumlah_keluar < 1) {
                    let isi_info = `Jumlah stok keluar minimal 1`
                    return res.redirect(`/stok?note=info&pesan=${isi_info}`)
                }

                let stok_terakhir = await m_stok.cek_current_stok(kode_produk)
                let sisa_terakhir = 0

                if (stok_terakhir.length > 0) {
                    sisa_terakhir = stok_terakhir[0].stok
                }

                if (jumlah_keluar > sisa_terakhir) {
                    let isi_info = `Stok ${kode_produk} tidak cukup, sisa stok hanya ${sisa_terakhir}`
                    return res.redirect(`/stok?note=info&pesan=${isi_info}`)
                }

                let stok_akhir = sisa_terakhir - jumlah_keluar

                await m_stok.input_stok_keluar(req, stok_akhir, kode_produk, jumlah_keluar)
                await m_stok.update_stok_keluar(stok_akhir, kode_produk)
            }

            let isi_notif = `berhasil mengurangi stok`
            res.redirect(`/stok?note=sukses&pesan=${isi_notif}`)

        } catch (error) {
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