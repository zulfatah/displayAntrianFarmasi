-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Agu 2024 pada 06.27
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `data_pasien`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_antrian`
--

CREATE TABLE `data_antrian` (
  `id` int(100) NOT NULL,
  `no_urut` varchar(100) NOT NULL,
  `no_rm` varchar(100) NOT NULL,
  `jam_registrasi` datetime NOT NULL,
  `est_selesai` datetime NOT NULL,
  `nama_pasien` varchar(100) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `j_kelamin` varchar(100) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `penjamin` varchar(100) NOT NULL,
  `poli_klinik` varchar(100) NOT NULL,
  `kategori_obat` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `jam_pending` datetime NOT NULL,
  `jam_selesai` datetime NOT NULL,
  `jam_diterima` datetime NOT NULL,
  `create_by_user` varchar(100) NOT NULL,
  `create_pending` varchar(100) NOT NULL,
  `create_selesai` varchar(100) NOT NULL,
  `create_diterima` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `data_antrian`
--

INSERT INTO `data_antrian` (`id`, `no_urut`, `no_rm`, `jam_registrasi`, `est_selesai`, `nama_pasien`, `tgl_lahir`, `j_kelamin`, `alamat`, `penjamin`, `poli_klinik`, `kategori_obat`, `status`, `jam_pending`, `jam_selesai`, `jam_diterima`, `create_by_user`, `create_pending`, `create_selesai`, `create_diterima`) VALUES
(509, 'R0001', '000002', '2024-07-29 16:12:56', '2024-07-29 17:12:56', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'pending', '2024-07-29 16:24:44', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'vivi', '', '', ''),
(510, 'NR0001', '000002', '2024-07-29 16:13:25', '2024-07-29 16:43:25', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Non Racik', 'pending', '2024-07-29 16:36:09', '2024-07-29 16:27:51', '0000-00-00 00:00:00', 'vivi', '', '', ''),
(511, 'R0002', '000001', '2024-07-29 16:15:26', '2024-07-29 17:15:26', 'ITAWARNEMI', '1984-12-03', 'Perempuan', 'Komp. PIM, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'Asuransi Ramayana', 'POLI PENYAKIT DALAM', 'Racik', 'pending', '2024-07-29 16:36:12', '2024-07-29 16:35:54', '0000-00-00 00:00:00', 'zain', '', '', ''),
(512, 'R0001', '000001', '2024-07-30 10:10:44', '2024-07-30 11:10:44', 'ITAWARNEMI', '1984-12-03', 'Perempuan', 'Komp. PIM, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'Asuransi Ramayana', 'POLI PENYAKIT DALAM', 'Racik', 'diterima', '2024-07-30 10:12:10', '2024-07-30 10:12:12', '2024-07-30 10:16:11', 'vivi', '', '', ''),
(513, 'R0002', '000002', '2024-07-30 10:30:04', '2024-07-30 11:30:04', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'pending', '2024-07-30 11:05:21', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'vivi', '', '', ''),
(514, 'NR0001', '000001', '2024-07-30 10:30:15', '2024-07-30 11:00:15', 'ITAWARNEMI', '1984-12-03', 'Perempuan', 'Komp. PIM, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'Asuransi Ramayana', 'POLI PENYAKIT DALAM', 'Non Racik', 'proses', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'vivi', '', '', ''),
(515, 'R0003', '000002', '2024-07-30 10:30:24', '2024-07-30 11:30:24', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'diterima', '2024-07-30 10:30:55', '2024-07-30 10:31:18', '2024-07-30 10:35:05', 'vivi', '', '', ''),
(516, 'R0004', '000002', '2024-07-30 10:39:41', '2024-07-30 11:39:41', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'selesai', '0000-00-00 00:00:00', '2024-07-30 10:41:43', '0000-00-00 00:00:00', 'adudu', '', '', ''),
(517, 'R0001', '000002', '2024-07-31 10:15:50', '2024-07-31 11:15:50', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'proses', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'vivi', '', '', ''),
(518, 'NR0001', '000001', '2024-07-31 10:16:03', '2024-07-31 10:46:03', 'ITAWARNEMI', '1984-12-03', 'Perempuan', 'Komp. PIM, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'Asuransi Ramayana', 'POLI PENYAKIT DALAM', 'Non Racik', 'proses', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'vivi', '', '', ''),
(519, 'R0002', '000002', '2024-07-31 10:16:12', '2024-07-31 11:16:12', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'proses', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'vivi', '', '', ''),
(520, 'R0001', '000002', '2024-08-01 06:34:13', '2024-08-01 07:34:13', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'diterima', '2024-08-01 09:30:42', '2024-08-01 09:31:29', '2024-08-01 09:58:11', 'vivi', 'zul', 'zul', 'zul'),
(521, 'NR0001', '000002', '2024-08-01 09:01:08', '2024-08-01 09:31:08', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Non Racik', 'selesai', '2024-08-01 10:00:46', '2024-08-01 10:00:53', '0000-00-00 00:00:00', 'vivi', 'zul', 'zul', ''),
(522, 'NR0002', '000002', '2024-08-01 09:01:30', '2024-08-01 09:31:30', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Non Racik', 'selesai', '2024-08-01 10:00:47', '2024-08-01 10:00:52', '0000-00-00 00:00:00', 'vivi', 'zul', 'zul', ''),
(523, 'R0002', '000002', '2024-08-01 09:31:51', '2024-08-01 10:31:51', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'selesai', '2024-08-01 10:00:48', '2024-08-01 10:00:51', '0000-00-00 00:00:00', 'zul', 'zul', 'zul', ''),
(524, 'R0003', '000001', '2024-08-01 10:01:21', '2024-08-01 11:01:21', 'ITAWARNEMI', '1984-12-03', 'Perempuan', 'Komp. PIM, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'Asuransi Ramayana', 'POLI PENYAKIT DALAM', 'Racik', 'proses', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'zul', '', '', ''),
(525, 'NR0003', '000002', '2024-08-01 10:01:30', '2024-08-01 10:31:30', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Non Racik', 'pending', '2024-08-01 10:02:47', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'zul', 'zul', '', ''),
(526, 'R0004', '000002', '2024-08-01 10:01:39', '2024-08-01 11:01:39', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'selesai', '0000-00-00 00:00:00', '2024-08-01 10:02:42', '0000-00-00 00:00:00', 'zul', '', 'zul', ''),
(527, 'R0005', '000002', '2024-08-01 10:01:49', '2024-08-01 11:01:49', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'pending', '2024-08-01 10:02:44', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'zul', 'zul', '', ''),
(528, 'R0006', '000002', '2024-08-01 10:01:58', '2024-08-01 11:01:58', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'proses', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'zul', '', '', ''),
(529, 'R0007', '000002', '2024-08-01 10:02:06', '2024-08-01 11:02:06', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'pending', '2024-08-01 10:02:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'zul', 'zul', '', ''),
(530, 'R0008', '000002', '2024-08-01 10:02:14', '2024-08-01 11:02:14', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'proses', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'zul', '', '', ''),
(531, 'R0009', '000002', '2024-08-01 10:02:22', '2024-08-01 11:02:22', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'pending', '2024-08-01 10:04:38', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'zul', 'zul', '', ''),
(532, 'R0010', '000002', '2024-08-01 10:02:32', '2024-08-01 11:02:32', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'selesai', '0000-00-00 00:00:00', '2024-08-01 10:04:36', '0000-00-00 00:00:00', 'zul', '', 'zul', ''),
(533, 'R0011', '000002', '2024-08-01 10:03:12', '2024-08-01 11:03:12', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'pending', '2024-08-01 10:04:29', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'zul', 'zul', '', ''),
(534, 'R0012', '000002', '2024-08-01 10:03:25', '2024-08-01 11:03:25', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'proses', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'zul', '', '', ''),
(535, 'R0013', '000002', '2024-08-01 10:03:55', '2024-08-01 11:03:55', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'selesai', '0000-00-00 00:00:00', '2024-08-01 10:04:32', '0000-00-00 00:00:00', 'zul', '', 'zul', ''),
(536, 'NR0004', '000002', '2024-08-01 10:04:03', '2024-08-01 10:34:03', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Non Racik', 'proses', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'zul', '', '', ''),
(537, 'NR0005', '000002', '2024-08-01 10:04:21', '2024-08-01 10:34:21', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Non Racik', 'proses', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'zul', '', '', ''),
(538, 'R0014', '000001', '2024-08-01 10:05:19', '2024-08-01 11:05:19', 'ITAWARNEMI', '1984-12-03', 'Perempuan', 'Komp. PIM, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'Asuransi Ramayana', 'POLI PENYAKIT DALAM', 'Racik', 'proses', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'zul', '', '', ''),
(539, 'R0015', '000002', '2024-08-01 10:06:43', '2024-08-01 11:06:43', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Racik', 'proses', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'zul', '', '', ''),
(540, 'NR0006', '000002', '2024-08-01 10:07:07', '2024-08-01 10:37:07', 'AYATI SALMI', '1968-09-16', 'Perempuan', 'tambon tunong, Kel. Tambon Tunong, Kec. Dewantara, KAB. ACEH UTARA, ACEH', 'BPJS', 'POLI KULIT & KELAMIN', 'Non Racik', 'proses', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'zul', '', '', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(3, 'zul', 'as@gmail.com', '$2a$10$mKxKQDbkMmQ9tMjb.aVfsuPQj.0GaVszzC/pIvMBnz/znUxHLj.mq'),
(4, 'zain', 'zfath423@gmail.com', '$2a$10$bV0TTPk31gaZ1ODaYKT9JOYJgLmOePINrwSt8ezLiXEFzBv2Cm.Km'),
(5, 'vivi', 'vivi@gmail.com', '$2a$10$fiN0UUaCsd9r0a.Lcdyi2uC0G7.XLytEe7Ma9TlcU/whpFwrLBZxq'),
(6, 'google', 'google@gmail.com', '$2a$10$VTS72iwXx2gR3kd05Zy.2eRnC7ukjwfDF.AGMFWc91jl0ytu6nkDi'),
(8, 'tutu', 'tutu@gmail.com', '$2a$10$gU85Qp4IZWPUaE9QydlgAONcfHNEVRG8rqW7jpyBCWSZoLTPCcaqa'),
(9, 'zulfath', 'zulfath@gmail.com', '$2a$10$AxlSGIC0kEcGZTRG6FjNk.Bz7WmE0RYKe2u1phjygB7PfralvS/oC'),
(10, 'zulfath4', 'zfath4235@gmail.com', '$2a$10$BeHQKdLRNE8jAklGiOg6r.8xLkQHQiOUUnsdXIpD108t2MXgO345C'),
(11, 'adudu', 'adudu@gmail.com', '$2a$10$0hqHTIruE5PGqFaDlH/PteV0Xqr28AMUDvtunD0tWWaqLuphECG8K');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `data_antrian`
--
ALTER TABLE `data_antrian`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `data_antrian`
--
ALTER TABLE `data_antrian`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=541;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
