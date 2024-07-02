const mysql     = require('mysql2')
const db        = require('../config/database').db
const moment    = require('moment')
moment.locale('id')

module.exports =
{
    get_semua_produk: function() {
        let sql = mysql.format(
            `SELECT * FROM master_produk;`
        )

        return new Promise( (resolve,reject)=>{
            db.query(sql, function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },

    get_semua_kategori: function() {
        let sql = mysql.format(
            `SELECT * FROM master_kategori;`
        )

        return new Promise( (resolve,reject)=>{
            db.query(sql, function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },

    tambah: (req) => {
        let data = {
            kode : req.body.form_kode,
            nama : req.body.form_nama,
            deskripsi : req.body.form_deskripsi,
            id_kategori : req.body.form_kategori,
            dibuat_oleh : req.session.user.id,
            dibuat_kapan : moment().format('YYYY-MM-DD HH:mm:ss')
        }
        let sql = mysql.format(
            `INSERT INTO master_produk SET ?`,
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