const db = require('../config/database').db
const moment = require('moment')

moment.locale('id')

module.exports =
{
    cek_stok_sisa: (kode_produk) => {
        let sql = `SELECT * FROM history_stok 
            WHERE kode_produk = ?
            ORDER BY id DESC 
            LIMIT 1`
        return new Promise((resolve, reject) => {
            db.query(sql, [kode_produk], function (errSql, hasil) {
                if (errSql) {
                    reject(errSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },
    cek_current_stok: (kode_produk) => {
        let sql = `SELECT * FROM master_produk 
            WHERE kode = ?
            ORDER BY id DESC 
            LIMIT 1`
        return new Promise((resolve, reject) => {
            db.query(sql, [kode_produk], function (errSql, hasil) {
                if (errSql) {
                    reject(errSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },

    //update main stok
    update_stok_keluar: (stok_akhir, kode_produk) => {
        let sql = `UPDATE master_produk SET stok = ? WHERE kode = ?`
        return new Promise((resolve, reject) => {
            db.query(sql, [stok_akhir, kode_produk], function (errSql, hasil) {
                if (errSql) {
                    reject(errSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },

    input_stok_masuk: (req, stok_akhir, kode_produk, jumlah_masuk) => {
        let user_id = req.session.user.id
        let waktu = moment().format('YYYY-MM-DD HH:mm:ss')
        let sql = `INSERT INTO history_stok 
            (kode_produk, stok_masuk, stok_keluar, stok_sisa, keterangan, dibuat_oleh, dibuat_kapan, diperbarui_oleh, diperbarui_kapan)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        let nilai = [
            kode_produk, jumlah_masuk, 0, stok_akhir,
            req.body.form_keterangan, user_id, waktu, user_id, waktu
        ]
        return new Promise((resolve, reject) => {
            db.query(sql, nilai, function (errSql, hasil) {
                if (errSql) {
                    reject(errSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },
    input_stok_keluar: (req, stok_akhir, kode_produk, jumlah_keluar) => {
        let user_id = req.session.user.id
        let waktu = moment().format('YYYY-MM-DD HH:mm:ss')
        let sql = `INSERT INTO history_stok 
            (kode_produk, stok_masuk, stok_keluar, stok_sisa, keterangan, dibuat_oleh, dibuat_kapan, diperbarui_oleh, diperbarui_kapan)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        let nilai = [
            kode_produk, 0, -jumlah_keluar, stok_akhir,
            req.body.form_keterangan, user_id, waktu, user_id, waktu
        ]
        return new Promise((resolve, reject) => {
            db.query(sql, nilai, function (errSql, hasil) {
                if (errSql) {
                    reject(errSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },
    getAll_by_produk: (filter) => {
        let kondisi = []
        let nilai = []

        if (filter.kode_produk) {
            kondisi.push('s.kode_produk = ?')
            nilai.push(filter.kode_produk)
        }
        if (filter.tanggal_mulai) {
            kondisi.push('DATE(s.dibuat_kapan) >= ?')
            nilai.push(filter.tanggal_mulai)
        }
        if (filter.tanggal_akhir) {
            kondisi.push('DATE(s.dibuat_kapan) <= ?')
            nilai.push(filter.tanggal_akhir)
        }

        let where_clause = kondisi.length > 0 ? 'WHERE ' + kondisi.join(' AND ') : ''

        let sql = `SELECT s.*, p.nama, p.deskripsi
        FROM history_stok as s
        LEFT JOIN master_produk as p
        ON p.kode = s.kode_produk
        ${where_clause}
        ORDER BY s.id DESC`

        return new Promise((resolve, reject) => {
            db.query(sql, nilai, function (errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },
    get_produk_stok: () => {
        let sql = `SELECT p.nama, p.stok FROM master_produk as p`
        return new Promise((resolve, reject) => {
            db.query(sql, function (errSql, hasil) {
                if (errSql) {
                    reject(errSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },
    get_produk_stok_menipis: () => {
        let sql = `SELECT nama, stok FROM master_produk WHERE stok <= 25`
        return new Promise((resolve, reject) => {
            db.query(sql, function (errSql, hasil) {
                if (errSql) {
                    reject(errSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    }
}