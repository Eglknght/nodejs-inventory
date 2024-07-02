const m_user = require("../model/m_user")
const { form_login } = require("./c_auth")

module.exports = {
    index: async (req, res) => {
        let dataview = {
            konten: 'user-management/index',
            req: req,
            uri_segment: req.path.split('/'),
            users: await m_user.get_semua_user()
        }
        res.render('template/struktur', dataview)
    },

    form_tambah: (req, res) => {
        let dataview = {
            konten: 'user-management/form-tambah',
            uri_segment: req.path.split('/'),
            info_error: null,
        }
        res.render('template/struktur', dataview)
    },

    proses_simpan: async (req, res) => {
        try {
            let insert = await m_user.tambah(req)
            let isi_notif = `berhasil membuat user baru`
            if (insert.affectedRows > 0) {
                res.redirect(`/user-management?note=sukses&pesan=${isi_notif}`)
            }
        } catch (error) {
            let dataview = {
                konten: 'user-management/form-tambah',
                uri_segment: req.path.split('/'),
                info_error: error
            }
            res.render('template/struktur', dataview)
        }
    },
}