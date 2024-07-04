const mysql     = require('mysql2')
const db        = require('../config/database').db
const moment    = require('moment')
moment.locale('id')

module.exports =
{
    input_stok_masuk : (req) => {
        let masuk = req.body.form_jumlah
        let sisa = masuk
        let data = {
            kode_produk : req.body.form_produk,
            stok_masuk : req.body.form_jumlah,
            stok_keluar : 0,
            stok_sisa : sisa,
            keterangan : req.body.form_keterangan,
            dibuat_oleh : req.session.user.id,
            dibuat_kapan : moment().format('YYYY-MM-DD HH:mm:ss')
        }
        let sql = mysql.format(
            `INSERT INTO stok SET ?`,
            [data]
        )
        return new Promise((resolve, reject) => {
            db.query(sql, function(errSql, hasil){
                if(errSql){
                    reject(errSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    }
}