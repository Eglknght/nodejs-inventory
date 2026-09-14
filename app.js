require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const c_beranda = require('./controller/c_beranda')
const c_auth = require('./controller/c_auth')
const c_dashboard = require('./controller/c_dashboard') 
const c_user = require('./controller/c_user')
const c_master_produk = require('./controller/c_master_produk')
const c_master_kategori = require('./controller/c_master_kategori')
const c_stok = require('./controller/c_stok')
const c_laporan = require('./controller/c_laporan')
const cek_login = c_auth.cek_login


app.use(cookieParser('secret'))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {    
        maxAge: 1000 * 60 * 60 * 2
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', './view-html')
app.use(express.static('public'))
const router = express.Router()

app.get('/', c_beranda.index)
app.get('/login', c_auth.form_login)
app.post('/proses-login', c_auth.proses_login)

// Apply middleware to the router
function cegahCache(req, res, next) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    next()
}
router.use(cek_login)
router.use(cegahCache)

// Define routes within the router
router.get('/dashboard', c_auth.cek_akses('dashboard'), c_dashboard.index)
router.get('/user-management', c_auth.cek_akses('user-management'), c_user.index)
router.get('/master-produk', c_auth.cek_akses('master-produk'), c_master_produk.index)
router.get('/master-produk/tambah', c_auth.cek_akses('master-produk'), c_master_produk.form_tambah)
router.post('/master-produk/proses-simpan', c_auth.cek_akses('master-produk'), c_master_produk.proses_simpan)
router.get('/user/tambah', c_auth.cek_akses('user-management'), c_user.form_tambah)
router.post('/user/proses-simpan', c_auth.cek_akses('user-management'), c_user.proses_simpan)
router.get('/stok', c_auth.cek_akses('stok'), c_stok.index)
router.get('/stok/stok-masuk', c_auth.cek_akses('stok'), c_stok.form_stok_masuk)
router.get('/stok/stok-keluar', c_auth.cek_akses('stok'), c_stok.form_stok_keluar)
router.post('/stok-masuk/proses-simpan', c_auth.cek_akses('stok'), c_stok.proses_stok_masuk)
router.post('/stok-keluar/proses-simpan', c_auth.cek_akses('stok'), c_stok.proses_stok_keluar)
router.get('/master-kategori', c_auth.cek_akses('master-kategori'), c_master_kategori.index)
router.get('/master-kategori/tambah', c_auth.cek_akses('master-kategori'), c_master_kategori.form_tambah)
router.post('/master-kategori/proses-simpan',c_auth.cek_akses('master-kategori'), c_master_kategori.proses_simpan)
router.get('/laporan', c_auth.cek_akses('laporan'), c_laporan.allstok)
router.get('/logout', c_auth.logout)

app.use('/', router)

app.listen(port, () => {
    console.log(`aplikasi sudah siap, buka http://localhost:${port}`)
})