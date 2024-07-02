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

app.get('/', c_beranda.index)
app.get('/login', c_auth.form_login)
app.post('/proses-login', c_auth.proses_login)
app.get('/dashboard', cek_login, c_dashboard.index)
app.get('/user-management', cek_login, c_user.index)
app.get('/master-produk', cek_login, c_master_produk.index)
app.get('/user/tambah', cek_login, c_user.form_tambah)
app.post('/user/proses-simpan', cek_login, c_user.proses_simpan)

app.listen(port, () => {
    console.log(`aplikasi sudah siap, buka http://localhost:${port}`)
})