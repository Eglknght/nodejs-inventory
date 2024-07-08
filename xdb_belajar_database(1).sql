-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 08 Jul 2024 pada 15.52
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xdb_belajar_database`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `history_stok`
--

CREATE TABLE `history_stok` (
  `id` int(11) NOT NULL,
  `kode_produk` varchar(10) NOT NULL,
  `stok_masuk` int(11) NOT NULL,
  `stok_keluar` int(11) NOT NULL,
  `stok_sisa` int(11) NOT NULL,
  `keterangan` varchar(500) DEFAULT NULL,
  `dibuat_oleh` int(11) NOT NULL,
  `dibuat_kapan` datetime NOT NULL,
  `diperbarui_oleh` int(11) NOT NULL,
  `diperbarui_kapan` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `history_stok`
--

INSERT INTO `history_stok` (`id`, `kode_produk`, `stok_masuk`, `stok_keluar`, `stok_sisa`, `keterangan`, `dibuat_oleh`, `dibuat_kapan`, `diperbarui_oleh`, `diperbarui_kapan`) VALUES
(1, 'IDM-GOR', 0, -1, 4, 'Terjual', 1, '2024-07-06 15:58:24', 0, '0000-00-00 00:00:00'),
(2, 'SP-BBR', 15, 0, 15, 'Dari gudang Cikarang', 1, '2024-07-06 17:21:31', 0, '0000-00-00 00:00:00'),
(3, 'CTT-ORI', 19, 0, 19, 'Barang dari gudang Tangerang', 1, '2024-07-06 17:21:52', 0, '0000-00-00 00:00:00'),
(4, 'SPRM-GOR', 73, 0, 73, 'Dari Produsen Riau', 1, '2024-07-06 17:24:35', 0, '0000-00-00 00:00:00'),
(5, 'AQ-BTL', 453, 0, 453, 'Dari Produsen Papua', 1, '2024-07-06 17:28:33', 0, '0000-00-00 00:00:00'),
(6, 'AQ-BTL', 0, -3, 450, 'Terjual', 1, '2024-07-06 17:29:03', 0, '0000-00-00 00:00:00'),
(7, 'IDM-GOR', 100, 0, 104, 'Barang dari gudang Tangerang', 1, '2024-07-08 14:45:26', 0, '0000-00-00 00:00:00'),
(8, 'GTR-LSTR', 13, 0, 13, 'Dari gudang Cikarang', 1, '2024-07-08 15:01:43', 0, '0000-00-00 00:00:00'),
(9, 'AQ-BTL', 400, 0, 850, 'Terjual', 1, '2024-07-08 20:14:08', 0, '0000-00-00 00:00:00'),
(10, 'AQ-BTL', 0, -400, 450, 'Terjual', 1, '2024-07-08 20:14:37', 0, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `karyawan`
--

CREATE TABLE `karyawan` (
  `id` int(11) NOT NULL COMMENT 'id table',
  `nama` varchar(100) NOT NULL COMMENT 'nama karyawan',
  `alamat` varchar(500) NOT NULL COMMENT 'alamat tempat tinggal karyawan',
  `no_telepon` varchar(15) DEFAULT NULL COMMENT 'nomor telepon',
  `gol_darah` varchar(2) DEFAULT NULL COMMENT 'golongan darah',
  `jenis_kelamin` char(1) NOT NULL COMMENT 'jenis kelamin',
  `departemen_id` int(11) DEFAULT NULL,
  `jabatan_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `karyawan`
--

INSERT INTO `karyawan` (`id`, `nama`, `alamat`, `no_telepon`, `gol_darah`, `jenis_kelamin`, `departemen_id`, `jabatan_id`) VALUES
(1, 'Elang Satria Pratama', 'Tangerang', '085693058897', 'B', 'L', 3, 1),
(2, 'Eren Yeagar', '', NULL, 'O', 'L', 1, 3),
(4, 'Haji Bolot', 'Argentina', NULL, 'O', 'L', 3, 3),
(7, 'Levi Ackerman', '', NULL, 'A', 'L', 2, 4),
(8, 'Ronaldo', 'Jakarta', '01924788794', 'AB', 'L', 1, 2),
(9, 'Si Lang Lang', 'Ciputat', '031088759', 'AB', 'L', 1, 2),
(10, 'Naruto', 'Jakarta', '01924788794', 'AB', 'L', 1, 2),
(11, 'Sasuke', 'Bandung', '093508273', 'O', 'L', 1, 2),
(12, 'fkdsjfl', 'slkjdflk', '345234', 'A', 'P', NULL, NULL),
(14, 'Si Elang', 'Bogor', '08920902238', 'AB', 'L', NULL, NULL),
(15, 'Ajeng', 'Matraman', '089202238934', 'AB', 'P', NULL, NULL),
(16, 'Ajeng Ayu', 'Matraman', '089202238934', '-', 'P', NULL, NULL),
(17, 'Abe', 'Jakarta', '09128308848', 'AB', 'L', NULL, NULL),
(18, 'Ajeng Ayu Lagi', 'Jakarta Timur', '0971304723978', 'AB', 'P', NULL, NULL),
(19, 'langelang', 'Jakarta', '39209803948098', 'AB', 'L', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `master_departemen`
--

CREATE TABLE `master_departemen` (
  `id` int(11) NOT NULL,
  `kode` varchar(5) NOT NULL,
  `nama` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `master_departemen`
--

INSERT INTO `master_departemen` (`id`, `kode`, `nama`) VALUES
(1, 'HR', 'Human Resources'),
(2, 'FIN', 'Finance'),
(3, 'IT', 'Information Technology'),
(4, 'MAR', 'Marketing'),
(5, 'PUR', 'Purchasing'),
(6, 'GA', 'General Affair');

-- --------------------------------------------------------

--
-- Struktur dari tabel `master_jabatan`
--

CREATE TABLE `master_jabatan` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `deskripsi` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `master_jabatan`
--

INSERT INTO `master_jabatan` (`id`, `nama`, `role`, `deskripsi`) VALUES
(1, 'Officer', 'Programmer', 'Programmer bertugas mengembangkan aplikasi atau software perusahaan'),
(2, 'Officer', 'System Analyst', 'Bertugas menganalisis kebutuhan pengembangan aplikasi'),
(3, 'Officer', 'Admin', 'Bertugas menangani kebutuhan administrasi masing-masing departemen'),
(4, 'Manager', '', 'Bertugas mengelola staff/officer/pegawai yg berada di bawahnya');

-- --------------------------------------------------------

--
-- Struktur dari tabel `master_kategori`
--

CREATE TABLE `master_kategori` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `deskripsi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `master_kategori`
--

INSERT INTO `master_kategori` (`id`, `nama`, `deskripsi`) VALUES
(1, 'Makanan Instan', 'Makanan siap saji dalam bentuk sachet atau kaleng '),
(2, 'Cemilan', 'Cemilan adalah makanan ringan  biasanya dalam bentuk sachet atau bungkusan yang memiliki porsi kecil'),
(3, 'Minuman', 'Minuman dalam kemasan botol atau kaleng'),
(4, 'Alat Musik', 'Sebuah alat yang bisa menghasilkan nada'),
(5, 'Minuman Beralkohol', 'minuman yang memabukkan untuk dewasa');

-- --------------------------------------------------------

--
-- Struktur dari tabel `master_produk`
--

CREATE TABLE `master_produk` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `dibuat_oleh` int(11) NOT NULL,
  `dibuat_kapan` datetime NOT NULL,
  `diperbarui_oleh` int(11) DEFAULT NULL,
  `diperbarui_kapan` datetime DEFAULT NULL,
  `stok` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `master_produk`
--

INSERT INTO `master_produk` (`id`, `kode`, `nama`, `deskripsi`, `id_kategori`, `dibuat_oleh`, `dibuat_kapan`, `diperbarui_oleh`, `diperbarui_kapan`, `stok`) VALUES
(1, 'IDM-GOR', 'Indomie Goreng', 'Indomie goreng rasa original', 1, 0, '2024-07-02 14:21:21', 0, '2024-07-02 14:21:21', 104),
(2, 'SP-BBR', 'Super Bubur', 'Bubur instan siap saji', 1, 0, '2024-07-02 14:21:21', 0, '2024-07-02 14:21:21', 15),
(3, 'CTT-ORI', 'Chitato Original', 'Chitato rasa original', 2, 1, '2024-07-02 22:06:15', NULL, NULL, 19),
(4, 'SPRM-GOR', 'Super Mie Goreng', 'Supermie goreng rasa original', 1, 1, '2024-07-02 22:16:19', NULL, NULL, 73),
(5, 'AQ-BTL', 'Aqua Botol 750ml', 'Aqua dengan kemasan botol 750ml', 3, 1, '2024-07-02 22:51:21', NULL, NULL, 450),
(6, 'GTR-LSTR', 'Gitar Listrik', ' jenis gitar yang menggunakan beberapa pick up untuk mengubah bunyi atau getaran dari string gitar menjadi arus elektrik ', 4, 1, '2024-07-06 12:33:45', NULL, NULL, 13);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama_lengkap` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `nama_lengkap`) VALUES
(1, 'eglknght', '$2y$10$7reu0PDYmvYAj8Jot0SPyefOpBsNjmCXpmDPiFSCAD8x2YYF4Z.Xu', 'Elang Satria Pratama'),
(2, 'ajengiu', '$2y$10$7reu0PDYmvYAj8Jot0SPyefOpBsNjmCXpmDPiFSCAD8x2YYF4Z.Xu', 'Ajeng Ayu Purnamasari'),
(3, 'atuy', '$2a$10$VnGcGR8HNX5UFni.qOTqcuTifLSGvPA3RAkX.Ls0WZT0aQHcupgQu', 'atuuuuy'),
(4, 'laang', '$2a$10$CWtMljW/d7HIA0bwBuOBOe8DfgYadyNqEb13u5Z6.8fSStJ/z39VW', 'laaaaaaaaang'),
(5, 'manusia', '$2a$10$jiFHXVCJKKfNDAYHTVW7qOWlqYzwHfrCGHGnA1iqLVUFxSZSQTtKi', 'manusia biasa'),
(6, 'maman.resing', '$2a$10$7/sLrHO84ciJPz9VtlpVFec3aga0Qsrbfnehfuzh6pPPMD2xtqz/i', 'mamang resing'),
(7, 'wawan.gunawan', '$2a$10$W6P2RVZTFLKSrIxU04toA.NuIG6mHmrpggVbPxvdfbbrrbcnCobkG', 'wawan gunawarman'),
(8, 'iwan', '$2a$10$6mjIBgTvKJgL8CAGG14PvOOQdph/aBtZa72gca2E1SJE12b.XpRWy', 'fals'),
(9, 'atuy', '$2a$10$qhi6iwL2mXe5N82noPof9urOYT/YlsSuuSufxHzjUNqmticzbxtHy', 'yuta');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `history_stok`
--
ALTER TABLE `history_stok`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `karyawan`
--
ALTER TABLE `karyawan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `master_departemen`
--
ALTER TABLE `master_departemen`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `master_jabatan`
--
ALTER TABLE `master_jabatan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `master_kategori`
--
ALTER TABLE `master_kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `master_produk`
--
ALTER TABLE `master_produk`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `history_stok`
--
ALTER TABLE `history_stok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `karyawan`
--
ALTER TABLE `karyawan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id table', AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT untuk tabel `master_departemen`
--
ALTER TABLE `master_departemen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `master_jabatan`
--
ALTER TABLE `master_jabatan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `master_kategori`
--
ALTER TABLE `master_kategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `master_produk`
--
ALTER TABLE `master_produk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
