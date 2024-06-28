module.exports = {
    index: (req, res) => {
        let dataview = {
            konten: 'user-management/index'
        }
        res.render('template/struktur', dataview)
    }
}