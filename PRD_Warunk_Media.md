# PRD Website Tracking Pesanan Konveksi - Warunk Media

Versi 1.1 · 10 November 2026 · Disusun oleh Firman Candra Ardian

## 1. Ringkasan

Website tracking pesanan konveksi Warunk Media (PT Warunk Media Grup, Semarang). Customer dapat melihat status dan bukti foto produksi pesanannya, dan owner dapat mengelola pesanan serta memperbarui progres. Website ini bukan toko online dan belum ada sistem pembayaran.

## 2. Tujuan

- Customer tidak perlu bertanya terus soal progres lewat chat.
- Owner punya satu tempat untuk mengelola semua pesanan dan progresnya.
- Progres transparan, dengan bukti foto di tiap tahap.

## 3. Pengguna (Role)

| Role | Kebutuhan |
|---|---|
| Customer/Participant | Cek status pesanan, lihat foto progres, deadline, worksheet order, dan invoice |
| Owner/Admin | Kelola pesanan dan customer, update progres, upload foto, isi worksheet order, buat invoice |

## 4. Fitur

**Halaman publik**

- Beranda: profil Warunk Media, Alur Projek, Proses Projek, Deadline Projek, dan tombol ke Cek Projek.
- Cek Projek: customer memasukkan kode pesanan (atau login) lalu melihat status, timeline tahapan, foto bukti, dan deadline.

**Area customer**

- Berandaku: daftar pesanan milik customer beserta status terakhirnya.
- Customer dapat melihat worksheet order dan invoice pesanannya (muncul di customer, sudah disetujui client).

**Area admin/owner**

- CRUD pesanan: nama pesanan, customer, jumlah, deadline.
- CRUD participant/customer.
- Update progres: pilih tahapan, tulis catatan, unggah foto bukti.
- Worksheet order untuk setiap pesanan.
- Invoice untuk setiap pesanan.
- Hapus data pesanan dan participant.

## 5. Alur utama

1. Owner membuat pesanan dan menautkannya ke customer, lalu sistem membuat kode pesanan.
2. Owner mengisi worksheet order dan membuat invoice untuk pesanan tersebut.
3. Owner meng-update tahapan produksi (contoh asumsi: pesanan masuk → desain/mockup → potong kain → sablon/bordir → jahit → QC → packing → selesai/dikirim).
4. Setiap update disertai foto dan catatan.
5. Customer membuka Cek Projek atau Berandaku dan melihat timeline terbarunya, worksheet order, dan invoice.

## 6. Data utama

- User: id, nama, kontak, role
- Pesanan: kode, customer, deskripsi, jumlah, tanggal masuk, deadline, status saat ini
- Progres: pesanan, tahapan, catatan, foto, waktu update
- Worksheet order: pesanan dan isi worksheet (mengikuti contoh dari client)
- Invoice: pesanan, rincian, dan total (mengikuti contoh dari client)

## 7. Teknologi

- Frontend: React
- Backend: Laravel 12

## 8. Di luar cakupan

- Pembayaran online (kata client: tidak ada dulu).

## 9. Menunggu dari client

- Tahapan produksi yang sebenarnya.
- Contoh worksheet order dan invoice yang dipakai sekarang.
- Logo dan info usaha yang dibutuhkan.

## Info lebih lanjut
- https://www.instagram.com/warunk_media/
- https://share.google/6sKZnYY3FaD2K3EO7
