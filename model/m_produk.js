const mysql     = require('mysql2')
const db        = require('../config/database').db
const moment    = require('moment')
moment.locale('id')

module.exports =
{
    get_semua_produk: function() {
        let sql = mysql.format(
            `SELECT master_produk.*, master_kategori.nama AS kategori_nama 
            FROM master_produk 
            LEFT JOIN master_kategori 
            ON master_kategori.id = master_produk.id_kategori;`
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

    get_semua_kategori: function() {
        let sql = mysql.format(
            `SELECT * FROM master_kategori;`
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
            kode : req.body.form_kode,
            nama : req.body.form_nama,
            deskripsi : req.body.form_deskripsi,
            id_kategori : req.body.form_kategori,
            dibuat_oleh : req.session.user.id,
            dibuat_kapan : moment().format('YYYY-MM-DD HH:mm:ss')
        }
        let sql = mysql.format(
            `INSERT INTO master_produk SET ?`,
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

    get_jumlah_produk_per_kategori: function() {
        let sql = mysql.format(
            `SELECT master_kategori.nama AS kategori_nama, COUNT(master_produk.id) AS jumlah
            FROM master_kategori
            LEFT JOIN master_produk 
            ON master_produk.id_kategori = master_kategori.id 
            GROUP BY master_kategori.id, master_kategori.nama;`
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

    get_total_produk: function() {
        let sql = mysql.format(
            `SELECT COUNT(*) AS total FROM master_produk;`
        )
        return new Promise( (resolve,reject)=>{
            db.query(sql, function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil[0].total)
                }
            })
        })
    },

    get_total_kategori: function() {
        let sql = mysql.format(
            `SELECT COUNT(*) AS total FROM master_kategori;`
        )
        return new Promise( (resolve,reject)=>{
            db.query(sql, function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil[0].total)
                }
            })
        })
    }
}