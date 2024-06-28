module.exports = {
    index: (req, res) => {
        let dataview = {
            konten: 'master-product/index',
            uri_segment: req.path.split('/'),
        }
        res.render('template/struktur', dataview)
    }
}