const bcrypt = require('bcryptjs')
const { db } = require('../config/database')

module.exports = 
{
    get_semua_user: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users', (errorSql, hasil) => {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },

    tambah: (req) => {
        let username = req.body.form_username
        let password = bcrypt.hashSync(req.body.form_password)
        let nama_lengkap = req.body.nama_lengkap
        let role = req.body.form_role

        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO users (username, password, nama_lengkap, role) VALUES (?, ?, ?, ?)',
                [username, password, nama_lengkap, role],
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