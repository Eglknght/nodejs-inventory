const mysql     = require('mysql2')
const db        = require('../config/database').db
const moment    = require('moment')
moment.locale('id')

module.exports =
{
    get_semua_kategori: function() {
        let sql = mysql.format(
            `SELECT * FROM master_kategori ;`
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
            nama : req.body.form_kategori,
            deskripsi : req.body.form_deskripsi,
        }
        let sql = mysql.format(
            `INSERT INTO master_kategori SET ?`,
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