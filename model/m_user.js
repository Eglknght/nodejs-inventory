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
}