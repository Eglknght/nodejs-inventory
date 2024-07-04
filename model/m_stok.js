const mysql     = require('mysql2')
const db        = require('../config/database').db
const moment    = require('moment')

moment.locale('id')

module.exports =
{
    cek_stok_sisa : (kode_produk) => {
        let sql = mysql.format(
            `SELECT * FROM stok 
            WHERE kode_produk = ?
            ORDER BY id DESC 
            LIMIT 1`,
            [kode_produk]
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
    },

    input_stok_masuk : (req, stok_akhir) => {
        let masuk = req.body.form_jumlah
        let data = {
            kode_produk : req.body.form_produk,
            stok_masuk : req.body.form_jumlah,
            stok_keluar : 0,
            stok_sisa : stok_akhir,
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