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
const c_stok = require('./controller/c_stok')
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
router.use(cek_login)

// Define routes within the router
router.get('/dashboard', c_dashboard.index)
router.get('/user-management', c_user.index)
router.get('/master-produk', c_master_produk.index)
router.get('/master-produk/tambah', c_master_produk.form_tambah)
router.post('/master-produk/proses-simpan', c_master_produk.proses_simpan)
router.get('/user/tambah', c_user.form_tambah)
router.post('/user/proses-simpan', c_user.proses_simpan)
router.get('/stok-masuk', c_stok.form_stok_masuk)
router.get('/stok-keluar', c_stok.form_stok_keluar)
router.post('/stok-masuk/proses-simpan', c_stok.proses_stok_masuk)
router.post('/stok-keluar/proses-simpan', c_stok.proses_stok_keluar)
// router.get('/master-kategori', c_master_kategori.form_master_kategori)

app.use('/', router)

app.listen(port, () => {
    console.log(`aplikasi sudah siap, buka http://localhost:${port}`)
})