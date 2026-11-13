const { Pool } = require('pg')

const pool = new Pool(
    process.env.DATABASE_URL
        ? { connectionString: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'xdb_belajar_database',
            port: process.env.DB_PORT || 5432,
            max: 10
        }
)

// Ubah ? menjadi $1, $2, ... supaya query lama tetap jalan
function ubahPlaceholder(sql) {
    let i = 0
    return sql.replace(/\?/g, () => `$${++i}`)
}

const db = {
    query(sql, params, callback) {
        if (typeof params === 'function') {
            callback = params
            params = []
        }
        pool.query(ubahPlaceholder(sql), params || [], (err, result) => {
            if (err) return callback(err)
            // SELECT: kembalikan array baris, seperti mysql2
            if (result.command === 'SELECT') return callback(null, result.rows)
            // INSERT/UPDATE/DELETE: bentuk mirip mysql2
            callback(null, {
                affectedRows: result.rowCount,
                insertId: result.rows && result.rows[0] ? result.rows[0].id : undefined
            })
        })
    }
}

const fs = require('fs')
const path = require('path')

async function initDb() {
    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
    await pool.query(sql)
    console.log('Tabel database siap')
}

module.exports = {
    db,
    initDb
}