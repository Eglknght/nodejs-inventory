module.exports = {
    index: (req, res) => {
        let dataview = {
            konten: 'dashboard/index'
        }
        res.render('template/struktur', dataview)
    }
}