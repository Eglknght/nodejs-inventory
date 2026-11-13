-- Skema PostgreSQL untuk nodejs-inventory

CREATE TABLE IF NOT EXISTS master_kategori (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(50) NOT NULL,
  deskripsi VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS master_produk (
  id SERIAL PRIMARY KEY,
  kode VARCHAR(10) NOT NULL,
  nama VARCHAR(50) NOT NULL,
  deskripsi VARCHAR(255) NOT NULL,
  id_kategori INTEGER NOT NULL,
  dibuat_oleh INTEGER NOT NULL,
  dibuat_kapan TIMESTAMP NOT NULL,
  diperbarui_oleh INTEGER,
  diperbarui_kapan TIMESTAMP,
  stok INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS history_stok (
  id SERIAL PRIMARY KEY,
  kode_produk VARCHAR(10) NOT NULL,
  stok_masuk INTEGER NOT NULL,
  stok_keluar INTEGER NOT NULL,
  stok_sisa INTEGER NOT NULL,
  keterangan VARCHAR(500),
  dibuat_oleh INTEGER NOT NULL,
  dibuat_kapan TIMESTAMP NOT NULL,
  diperbarui_oleh INTEGER NOT NULL,
  diperbarui_kapan TIMESTAMP NOT NULL
);

-- "user" adalah kata khusus di PostgreSQL, jadi tabelnya diganti nama menjadi users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  role VARCHAR(20) NOT NULL DEFAULT 'karyawan',
  username VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  nama_lengkap VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS master_departemen (
  id SERIAL PRIMARY KEY,
  kode VARCHAR(5) NOT NULL,
  nama VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS master_jabatan (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(50) NOT NULL,
  role VARCHAR(50) NOT NULL,
  deskripsi VARCHAR(300) NOT NULL
);

CREATE TABLE IF NOT EXISTS karyawan (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  alamat VARCHAR(500) NOT NULL,
  no_telepon VARCHAR(15),
  gol_darah VARCHAR(2),
  jenis_kelamin CHAR(1) NOT NULL,
  departemen_id INTEGER,
  jabatan_id INTEGER
);