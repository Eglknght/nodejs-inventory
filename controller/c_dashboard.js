module.exports = {
    index: (req, res) => {
        let dataview = {
            konten: 'dashboard/index',
            uri_segment: req.path.split('/'),
        }
        res.render('template/struktur', dataview)
    }
}