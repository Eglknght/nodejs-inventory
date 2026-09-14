const mysql     = require('mysql2')
const bcrypt = require('bcryptjs')
const { db } = require('../config/database')

module.exports = 
{
    get_semua_user: () => {
        let sql=mysql.format(
            `SELECT * FROM user;`
        )
        return new Promise((resolve, reject) => {
            db.query(sql, (errorSql, hasil) => {
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
            username : req.body.form_username,
            password : bcrypt.hashSync(req.body.form_password),
            nama_lengkap : req.body.nama_lengkap,
            role : req.body.form_role
        }
        let sql = mysql.format(
            `INSERT INTO user SET ?`,
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