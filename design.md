# DESIGN.md - Website Tracking Pesanan Warunk Media

Acuan tampilan untuk frontend React (Tailwind CSS). Warna diambil dari logo; kode hex masih perkiraan dan perlu dicocokkan dengan file logo asli.

## 1. Karakter visual

- Bersih, tegas, dan mudah dibaca di HP. Dasarnya putih dan hitam arang, dengan merah logo sebagai aksen.
- Terasa seperti usaha konveksi dan percetakan: rapi, jujur, tidak berlebihan.
- Fokus ke informasi progres (status, timeline, foto), bukan dekorasi.
- Susunan layout mengacu pada gajahprint.com sesuai permintaan client (lihat bagian 12).

## 2. Logo

- Wordmark WARUNK MEDIA: huruf hitam arang, dengan aksen merah di kaki huruf R dan K, dan ikon play hijau di huruf D.
- Navbar kiri hanya berisi gambar logo (tinggi 32 sampai 40 px), tanpa teks tambahan di sampingnya. Klik logo menuju Beranda.
- Di footer logo boleh dipakai lagi. Latar putih atau terang.
- Beri ruang kosong di sekeliling logo minimal setinggi huruf "M". Jangan diregangkan atau diberi bayangan.
- Pakai file logo asli (SVG atau PNG transparan) dari client.

## 3. Warna

**Warna primer dan sekunder**

| Peran | Token | Hex (perkiraan) | Pemakaian |
|---|---|---|---|
| Primer | primary (merah) | #B91C1C | Tombol utama (CTA), tautan aktif, aksen utama |
| Sekunder | secondary (hitam arang) | #1F1F1F | Judul, teks utama, tombol sekunder, footer |

Warna lain di bawah ini adalah warna pendukung (status, latar, dan garis).

**Daftar lengkap**

| Token | Hex (perkiraan) | Pemakaian |
|---|---|---|
| ink | #1F1F1F | Judul, teks utama, tombol sekunder |
| brand-red | #B91C1C | Tombol utama (CTA), tautan aktif, aksen |
| brand-red-dark | #991B1B | Hover tombol utama |
| brand-green | #2E9E44 | Status selesai, progress bar selesai |
| brand-amber | #F5B400 | Status sedang berjalan |
| surface | #FFFFFF | Kartu, navbar |
| canvas | #F7F6F4 | Latar halaman |
| line | #E5E2DD | Garis dan border |
| muted | #5F5B55 | Teks pendukung |

Latar badge status (teks tetap ink atau hijau tua agar terbaca):

| Status | Latar | Teks |
|---|---|---|
| Selesai | #DDF3E1 | #14532D |
| Sedang berjalan | #FDF0C4 | #5B4300 |
| Belum dimulai | #ECEAE6 | #5F5B55 |
| Terlambat | #FBE1E1 | #7F1D1D |

Aturan:
- Satu warna aksen utama (merah). Hijau dan kuning hanya untuk status.
- Rasio kontras teks minimal 4,5:1. Status tidak boleh hanya dibedakan dengan warna, selalu sertakan teks.

## 4. Tipografi

- Judul: Plus Jakarta Sans, bobot 700.
- Isi: Inter, bobot 400 dan 600.
- Fallback: system-ui, Arial, sans-serif.

| Elemen | Ukuran HP / desktop | Bobot |
|---|---|---|
| H1 | 30 / 44 px | 700 |
| H2 | 24 / 30 px | 700 |
| H3 | 18 / 20 px | 600 |
| Isi | 16 px | 400 |
| Keterangan | 14 px | 400 |

Tinggi baris isi 1,5. Bahasa antarmuka Bahasa Indonesia.

## 5. Spasi, bentuk, dan bayangan

- Skala spasi: 4, 8, 12, 16, 24, 32, 48 px.
- Radius: tombol dan input 10 px, kartu 16 px, badge penuh (pill).
- Border 1 px warna `line`. Bayangan tipis hanya untuk kartu yang bisa diklik.
- Lebar konten maksimum 1120 px, padding samping 16 px di HP dan 24 px di desktop.

## 6. Komponen

**Navbar**
- Kiri: gambar logo saja, tanpa teks tambahan. Kanan: Beranda, Cek Projek, Berandaku, tombol Login/Nama user.
- HP: menu dilipat menjadi ikon hamburger.

**Tombol**
- Utama: latar brand-red, teks putih, hover brand-red-dark.
- Sekunder: border ink, teks ink.
- Tinggi minimal 44 px (nyaman disentuh). Status loading menampilkan spinner dan menonaktifkan tombol.

**Kartu pesanan**
- Foto kecil, nama pesanan, kode (mis. WM-0012), deadline, badge status, progress bar, tombol "Lihat detail".

**Timeline progres**
- Garis vertikal dengan titik di tiap tahap: selesai (hijau), berjalan (merah dengan lingkaran halo), belum (abu-abu).
- Setiap tahap menampilkan tanggal, catatan, dan foto bukti (klik untuk memperbesar).

**Form (admin)**
- Label di atas input, pesan galat di bawah input dengan teks merah, tombol simpan di kanan bawah.
- Unggah foto: area seret-dan-lepas, pratinjau kecil, dan tombol hapus per foto.

**Tabel admin**
- Kolom: kode, customer, deadline, status, aksi (Update, Ubah, Hapus).
- HP: tabel berubah menjadi daftar kartu. Hapus selalu meminta konfirmasi.

**Worksheet order dan invoice**
- Tampilan seperti dokumen: judul, identitas usaha dan logo, tabel rincian, total. Ada tombol cetak.

**Keadaan kosong dan galat**
- Pesan singkat dan ramah, misalnya "Belum ada pesanan". Kode pesanan tidak ditemukan: "Kode tidak ditemukan, periksa kembali."

## 7. Halaman

| Halaman | Isi utama |
|---|---|
| Beranda | Hero dan tombol Cek Projek, Alur Projek, Proses Projek, Deadline Projek, produk, kontak |
| Cek Projek | Kolom kode pesanan, ringkasan pesanan, timeline |
| Berandaku | Daftar kartu pesanan milik customer, akses worksheet dan invoice |
| Admin | Daftar pesanan, form pesanan, update progres, customer, worksheet, invoice |

## 8. Responsif

- Pendekatan mobile-first. Titik patah: 640 px (sm), 768 px (md), 1024 px (lg).
- Kolom bertumpuk satu kolom di HP, dua sampai empat kolom di layar lebar.
- Gambar selalu `max-width: 100%`, dimuat malas (lazy loading).

## 9. Aksesibilitas

- Fokus keyboard terlihat jelas (cincin 2 px merah).
- Semua gambar punya teks alternatif. Foto progres: "Foto tahap sablon, 12 November".
- Target sentuh minimal 44 x 44 px.

## 10. Konfigurasi Tailwind (acuan)

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#B91C1C', dark: '#991B1B' },
        secondary: '#1F1F1F',
        ink: '#1F1F1F',
        brand: { red: '#B91C1C', 'red-dark': '#991B1B', green: '#2E9E44', amber: '#F5B400' },
        canvas: '#F7F6F4',
        line: '#E5E2DD',
        muted: '#5F5B55',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: { card: '16px', control: '10px' },
      maxWidth: { content: '1120px' },
    },
  },
}
```

## 11. Yang dihindari

- Jangan memakai banyak warna aksen sekaligus.
- Jangan mengubah bentuk atau warna logo.
- Jangan menaruh teks kecil di atas foto tanpa latar.
- Jangan memakai animasi berat; cukup transisi singkat (150 sampai 200 ms).

## 12. Referensi layout (gajahprint.com)

Client meminta tampilan yang mirip gajahprint.com. Yang diambil adalah **susunan layout dan gaya komponen**, bukan logo, foto, ilustrasi, teks, atau identitas mereknya. Semua aset memakai milik Warunk Media. Website ini untuk tracking (tanpa keranjang dan pembayaran), jadi elemen toko dihilangkan atau diganti.

### Desktop

| Bagian di referensi | Padanan di Warunk Media |
|---|---|
| Bar atas merah: unduh aplikasi, ikon sosial media, Cara Order, Karir, FAQ | Bar atas merah tipis: ikon Instagram dan WhatsApp, tautan Alur Projek dan Kontak |
| Header putih: logo, pilihan kota, kolom pencarian pil dengan tombol merah, ikon keranjang/notifikasi/pesan, tombol Masuk dan Daftar | Logo (gambar saja), kolom pil "Masukkan kode pesanan" dengan tombol merah sebagai jalan pintas ke Cek Projek, tombol Masuk (outline merah). Tanpa pilihan kota, keranjang, dan Daftar |
| Bar menu merah: Pilih Kategori, Beranda, Semua Produk, Promo, Jam Layanan, Tentang Kami | Bar menu merah: Beranda, Cek Projek, Berandaku, Alur Projek, Proses Projek, Deadline Projek. Tiga yang terakhir menggulir ke bagiannya di Beranda |
| Hero: kartu daftar kategori di kiri, banner carousel merah di tengah, dua kartu promo di kanan | Kiri: kartu daftar produk (Kaos, Jaket, PDH, Topi, Merchandise). Tengah: banner carousel merah dengan foto produksi dan tombol Cek Projek. Kanan: kartu "Cek Projek" (input kode) dan kartu "Hubungi via WhatsApp" |
| Empat kartu keunggulan: ikon putih di kotak merah, judul, deskripsi singkat | Empat kartu: Pantau Progres, Foto Bukti, Deadline Jelas, Worksheet dan Invoice |
| Judul bagian dengan garis titik-titik dan tautan merah "Lihat Semua >" | Pola yang sama untuk Alur Projek, Proses Projek, Deadline Projek, dan Hasil Produksi |
| Deretan kartu produk | Galeri hasil produksi (foto dari client) |
| Tombol chat melayang di kanan bawah | Tombol WhatsApp melayang |

### Mobile

| Bagian di referensi | Padanan di Warunk Media |
|---|---|
| Atas: ikon logo, kolom pencarian pil, ikon keranjang dan pesan | Gambar logo, kolom pil kode pesanan, ikon Masuk/Akun |
| Strip merah lokasi | Strip merah: Warunk Media - Semarang |
| Banner carousel dengan titik indikator | Sama |
| Kategori Produk: grid 5 kolom, ubin putih dengan ikon merah | Produk Kami: ubin ikon (Kaos, Jaket, PDH, Topi, Merchandise) |
| Produk Pilihan: carousel horizontal dengan panah | Hasil Produksi: carousel horizontal |
| Menu bawah: Home, Transaksi, Chat menonjol di tengah, Notifikasi, Akun | Menu bawah: Beranda, Cek Projek, WhatsApp (tengah, menonjol), Berandaku, Akun |

### Gaya komponen yang ditiru

- Kolom pencarian dan tombol berbentuk pil. Tombol utama merah solid, tombol sekunder outline merah.
- Kartu putih bersudut membulat besar dengan bayangan sangat tipis.
- Ikon solid satu warna: putih di kotak merah (kartu keunggulan) atau merah di ubin putih (daftar produk).
- Banner lebar berlatar gradasi merah dengan produk sebagai fokus. Pakai foto produk Warunk Media sendiri.
- Latar halaman putih. Merah hanya di bar, tombol, dan aksen.
- Font sans-serif bersih dengan judul tebal.

### Penyesuaian dari referensi

- Tanpa keranjang, harga, promo, dan pembayaran, karena di luar cakupan PRD.
- Cek Projek dan Berandaku tetap halaman tersendiri sesuai PRD. Kartu di hero hanya jalan pintas.
- Isi dan nama produk dari client atau Instagram mereka, bukan dari Gajah Print.
- Warna primer tetap merah logo Warunk Media (#B91C1C). Jangan menyalin kode warna, gradasi, ikon, atau ilustrasi persis dari referensi.
