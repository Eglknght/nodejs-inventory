const db        = require('../config/database').db
const moment    = require('moment')
moment.locale('id')

module.exports =
{
    get_semua_kategori: function() {
        return new Promise( (resolve,reject)=>{
            db.query('SELECT * FROM master_kategori', function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },

    tambah: (req) => {
        let nama = req.body.form_kategori
        let deskripsi = req.body.form_deskripsi

        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO master_kategori (nama, deskripsi) VALUES (?, ?)',
                [nama, deskripsi],
                function(errSql, hasil){
                    if(errSql){
                        reject(errSql)
                    } else {
                        resolve(hasil)
                    }
                }
            )
        })
    }

}