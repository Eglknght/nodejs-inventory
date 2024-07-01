const bcrypt = require('bcryptjs')
const mysql = require('mysql2')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'xdb_belajar_database'
})
db.connect()

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
            nama_lengkap : req.body.nama_lengkap
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