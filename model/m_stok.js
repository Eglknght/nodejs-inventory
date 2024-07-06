const mysql     = require('mysql2')
const db        = require('../config/database').db
const moment    = require('moment')

moment.locale('id')

module.exports =
{
    cek_stok_sisa : (kode_produk) => {
        let sql = mysql.format(
            `SELECT * FROM history_stok 
            WHERE kode_produk = ?
            ORDER BY id DESC 
            LIMIT 1`,
            [kode_produk]
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
    },
    cek_current_stok : (kode_produk) => {
        let sql = mysql.format(
            `SELECT * FROM master_produk 
            WHERE kode = ?
            ORDER BY id DESC 
            LIMIT 1`,
            [kode_produk]
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
    },

    //update main stok
    update_stok_keluar : (stok_akhir, kode_produk) => {
        let sql = mysql.format(
            `UPDATE master_produk SET stok = ? WHERE kode = ?`,
            [stok_akhir, kode_produk]
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
    },

    input_stok_masuk : (req, stok_akhir) => {
        let data = {
            kode_produk : req.body.form_produk,
            stok_masuk : req.body.form_jumlah,
            stok_keluar : 0,
            stok_sisa : stok_akhir,
            keterangan : req.body.form_keterangan,
            dibuat_oleh : req.session.user.id,
            dibuat_kapan : moment().format('YYYY-MM-DD HH:mm:ss')
        }
        let sql = mysql.format(
            `INSERT INTO history_stok SET ?`,
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
    }, 
    input_stok_keluar : (req, stok_akhir) => {
        let data = {
            kode_produk : req.body.form_produk,
            stok_masuk : 0,
            stok_keluar : -req.body.form_jumlah,
            stok_sisa : stok_akhir,
            keterangan : req.body.form_keterangan,
            dibuat_oleh : req.session.user.id,
            dibuat_kapan : moment().format('YYYY-MM-DD HH:mm:ss')
        }
        let sql = mysql.format(
            `INSERT INTO history_stok SET ?`,
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
    },
    getAll_by_produk: (kode_produk) => {
        let sql = mysql.format(
            `SELECT s.*,
            p.nama, p.deskripsi 
            FROM history_stok as s
            LEFT JOIN master_produk as p
            ON p.kode = s.kode_produk
            WHERE kode_produk = ?`,
            [kode_produk]
            
        )
        
        return new Promise((resolve, reject) => {
            db.query(sql, function(errorSql, hasil){
                if(errorSql){
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },
    get_produk_stok : () => {
        let sql = mysql.format(
            `SELECT p.nama, p.stok            
            FROM master_produk as p`        )
        return new Promise((resolve, reject) => {
            db.query(sql, function(errSql, hasil){
                if(errSql){
                    reject(errSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },
}