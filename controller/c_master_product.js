module.exports = {
    index: (req, res) => {
        let dataview = {
            konten: 'master-product/index'
        }
        res.render('template/struktur', dataview)
    }
}