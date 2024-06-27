const bcrypt = require('bcryptjs')
const mysql = require('mysql2')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'xdb_belajar_database'
})
db.connect()

let cari_username = (username) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(`SELECT * FROM user WHERE username = ?, [username]`, [username], (errorSql, hasil) => {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    let user = hasil[0]
                    resolve(user)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports =
{
    form_login: (req, res) => {
        let dataview = {
            req: req
        }
        res.render('auth/form-login', dataview)
    },

    proses_login: async function (req, res) {
        let username = req.body.username
        let password = req.body.password
        let user = await cari_username(username)
        if (user) {
            let passwordCocok = bcrypt.compareSync(password, user.password)
            if (passwordCocok) {
                res.redirect('/dashboard')
            } else {
                res.redirect('/login?msg=Password salah')
            }
        } else {
            res.redirect('/login?msg=Username tidak ditemukan')
        }
    },
}
