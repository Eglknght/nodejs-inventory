const m_user = require("../model/m_user")

module.exports = {
    index: async (req, res) => {
        let dataview = {
            konten: 'user-management/index',
            uri_segment: req.path.split('/'),
            users: await m_user.get_semua_user()
        }
        res.render('template/struktur', dataview)
    }
}