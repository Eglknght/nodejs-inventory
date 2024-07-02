const mysql     = require('mysql2')
const db        = require('../config/database').db


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



}