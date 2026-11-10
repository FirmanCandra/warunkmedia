import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MessageSquare, ArrowRight, CheckCircle2, 
  Camera, Calendar, FileSpreadsheet, Shirt, Layers, 
  Briefcase, HardHat, Package, ChevronRight, Clock
} from 'lucide-react';
import { PRODUCTS, WORKFLOW_STEPS, PRODUCTION_STAGES, PRODUCTION_GALLERY } from '../data/mockData';

export default function Home() {
  const [quickCode, setQuickCode] = useState('');
  const navigate = useNavigate();

  const handleQuickCheck = (e) => {
    e.preventDefault();
    if (quickCode.trim()) {
      navigate(`/cek-projek?code=${encodeURIComponent(quickCode.trim().toUpperCase())}`);
    }
  };

  const getProductIcon = (iconName) => {
    switch (iconName) {
      case 'Shirt': return <Shirt className="w-5 h-5 text-primary" />;
      case 'Layers': return <Layers className="w-5 h-5 text-primary" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-primary" />;
      case 'HardHat': return <HardHat className="w-5 h-5 text-primary" />;
      case 'Package': return <Package className="w-5 h-5 text-primary" />;
      default: return <Shirt className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* Strip Lokasi Semarang Mobile */}
      <div className="md:hidden bg-primary text-white text-xs px-4 py-2 flex items-center justify-between">
        <span className="font-semibold">Warunk Media — Semarang</span>
        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">Tracking Pesanan</span>
      </div>

      {/* 1. HERO SECTION (Layout Mengacu Referensi GajahPrint & Wireframe Hal 11) */}
      <section className="max-w-[1120px] mx-auto px-4 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Kiri: Daftar Kategori Produk (Hidden di HP sangat kecil, terlihat di tablet/desktop) */}
          <div className="hidden lg:block lg:col-span-3 bg-surface rounded-card border border-line p-4 shadow-xs">
            <h3 className="font-heading font-bold text-sm text-ink mb-3 pb-2 border-b border-line flex items-center justify-between">
              <span>Produk Kami</span>
              <span className="text-xs text-primary font-normal">Pilihan Bahan</span>
            </h3>
            <ul className="space-y-1.5">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <a
                    href="#produk-kami"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-canvas text-xs font-semibold text-ink group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-md bg-canvas group-hover:bg-primary/10 transition-colors">
                        {getProductIcon(prod.icon)}
                      </div>
                      <span>{prod.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tengah: Banner Merah Hero dengan Headline Jujur & Foto */}
          <div className="lg:col-span-6 bg-gradient-to-br from-primary via-primary to-brand-red-dark text-white rounded-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm min-h-[320px]">
            {/* Dekorasi halus tanpa AI slop */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-xs font-semibold backdrop-blur-xs">
                Sistem Tracking Produksi Konveksi
              </span>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight">
                Pantau pesanan konveksimu, tahap demi tahap.
              </h1>
              <p className="text-sm sm:text-base text-white/90 max-w-md leading-relaxed">
                Lihat langsung progres produksi dan bukti foto dari workshop Warunk Media Semarang langsung dari HP Anda.
              </p>
            </div>

            <div className="relative z-10 pt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/cek-projek?code=WM-0012')}
                className="px-6 py-2.5 bg-white text-primary hover:bg-white/90 text-sm font-bold rounded-control flex items-center gap-2 shadow-xs transition-all active:scale-95"
              >
                <span>Coba Demo Cek Projek</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Warunk%20Media,%20saya%20mau%20konsultasi%20pesanan"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-black/20 hover:bg-black/30 text-white text-sm font-semibold rounded-control transition-colors"
              >
                Tanya WhatsApp
              </a>
            </div>
          </div>

          {/* Kanan: Dua Kartu Cepat (Cek Projek & Tanya WhatsApp) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Kartu Input Cek Projek Cepat */}
            <div className="bg-surface rounded-card border border-line p-5 shadow-xs flex-1">
              <h3 className="font-heading font-bold text-sm text-ink mb-1 flex items-center gap-1.5">
                <Search className="w-4 h-4 text-primary" />
                <span>Cek Projek</span>
              </h3>
              <p className="text-xs text-muted mb-3">
                Masukkan kode pesanan untuk melihat progres terkini.
              </p>
              <form onSubmit={handleQuickCheck} className="space-y-2.5">
                <input
                  type="text"
                  value={quickCode}
                  onChange={(e) => setQuickCode(e.target.value)}
                  placeholder="Kode, mis: WM-0012"
                  className="w-full px-3 py-2 text-xs bg-canvas border border-line rounded-control focus:outline-none focus:ring-2 focus:ring-primary uppercase font-mono"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-control transition-colors"
                >
                  Cek Pesanan
                </button>
              </form>
              <div className="mt-2.5 text-[11px] text-muted flex items-center gap-1">
                <span>Contoh:</span>
                <button
                  type="button"
                  onClick={() => setQuickCode('WM-0012')}
                  className="text-primary font-mono hover:underline font-semibold"
                >
                  WM-0012
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setQuickCode('WM-0009')}
                  className="text-primary font-mono hover:underline font-semibold"
                >
                  WM-0009
                </button>
              </div>
            </div>

            {/* Kartu Tanya WhatsApp */}
            <div className="bg-surface rounded-card border border-line p-5 shadow-xs">
              <h3 className="font-heading font-bold text-sm text-ink mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-brand-green" />
                <span>Tanya via WhatsApp</span>
              </h3>
              <p className="text-xs text-muted mb-3">
                Hubungi owner Warunk Media untuk pemesanan baru atau konsultasi bahan.
              </p>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Warunk%20Media,%20saya%20ingin%20konsultasi%20pesanan%20konveksi"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 bg-canvas hover:bg-line text-ink text-xs font-semibold rounded-control border border-line flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-brand-green" />
                <span>Chat Owner (0812-3456-7890)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EMPAT KARTU KEUNGGULAN (Wireframe Hal 11 & design.md Section 12) */}
      <section className="max-w-[1120px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-surface rounded-card border border-line p-4 sm:p-5 shadow-xs flex flex-col gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-ink">Pantau Progres</h4>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                Lihat tahap pengerjaan pesanan kapan saja tanpa perlu chat manual.
              </p>
            </div>
          </div>

          <div className="bg-surface rounded-card border border-line p-4 sm:p-5 shadow-xs flex flex-col gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-ink">Foto Bukti</h4>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                Setiap tahap produksi (sablon, potong, jahit) disertai foto bukti real.
              </p>
            </div>
          </div>

          <div className="bg-surface rounded-card border border-line p-4 sm:p-5 shadow-xs flex flex-col gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-ink">Deadline Jelas</h4>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                Estimasi tanggal selesai terdata transparan sejak awal pemesanan.
              </p>
            </div>
          </div>

          <div className="bg-surface rounded-card border border-line p-4 sm:p-5 shadow-xs flex flex-col gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-ink">Worksheet & Invoice</h4>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                Dokumen rincian ukuran, spesifikasi bahan, dan invoice resmi siap cetak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ALUR PROJEK (4 LANGKAH) */}
      <section id="alur-projek" className="max-w-[1120px] mx-auto px-4 scroll-mt-24">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-line">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">Alur Projek</h2>
            <p className="text-xs sm:text-sm text-muted">Proses dari awal pemesanan hingga barang diterima</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WORKFLOW_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-surface rounded-card border border-line p-5 shadow-xs relative"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-heading font-black text-sm flex items-center justify-center mb-3">
                {step.step}
              </div>
              <h4 className="font-heading font-bold text-base text-ink mb-1.5">{step.title}</h4>
              <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PROSES PROJEK (5 TAHAPAN PRODUKSI KONVEKSI) */}
      <section id="proses-projek" className="max-w-[1120px] mx-auto px-4 scroll-mt-24">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-line">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">Proses Projek</h2>
            <p className="text-xs sm:text-sm text-muted">Tahapan produksi standar workshop Warunk Media Semarang</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PRODUCTION_STAGES.map((stg, idx) => (
            <div
              key={stg.id}
              className="bg-surface rounded-card border border-line p-4 text-center shadow-xs hover:border-primary/50 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-canvas border border-line text-ink font-bold text-xs flex items-center justify-center mx-auto mb-2">
                {idx + 1}
              </div>
              <h5 className="font-heading font-bold text-xs sm:text-sm text-ink mb-1">{stg.name}</h5>
              <p className="text-[11px] text-muted line-clamp-3 leading-tight">{stg.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DEADLINE PROJEK (PENJELASAN ESTIMASI & DISIPLIN WAKTU) */}
      <section id="deadline-projek" className="max-w-[1120px] mx-auto px-4 scroll-mt-24">
        <div className="bg-[#1F1F1F] text-white rounded-card p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-brand-amber text-xs font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Aturan & Estimasi Deadline</span>
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                Deadline Terukur Berdasarkan Jumlah dan Tingkat Kerumitan
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Waktu pengerjaan dihitung sejak desain final (mockup) disetujui dan DP terkonfirmasi. Estimasi standar kaos & polo 7–12 hari kerja; jaket dan kemeja PDH 10–16 hari kerja. Progres harian selalu di-update agar Anda dapat memantau kapan pesanan siap kirim.
              </p>
            </div>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Warunk%20Media,%20saya%20butuh%20konveksi%20dengan%20deadline%20khusus"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-control text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Konsultasi Deadline Khusus
            </a>
          </div>
        </div>
      </section>

      {/* 6. HASIL PRODUKSI (GALERI DOKUMENTASI KONVEKSI) */}
      <section id="produk-kami" className="max-w-[1120px] mx-auto px-4">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-line">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">Hasil Produksi</h2>
            <p className="text-xs sm:text-sm text-muted">Contoh pesanan yang telah selesai diproduksi</p>
          </div>
          <a
            href="https://www.instagram.com/warunk_media/"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-primary hover:text-primary-dark flex items-center gap-1"
          >
            <span>Lihat Instagram</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRODUCTION_GALLERY.map((item) => (
            <div
              key={item.id}
              className="group bg-surface rounded-card border border-line overflow-hidden shadow-xs hover:shadow-md transition-all"
            >
              <div className="aspect-4/3 bg-canvas overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-3.5">
                <span className="text-[10px] uppercase font-bold text-primary block mb-0.5">
                  {item.category}
                </span>
                <h5 className="font-heading font-bold text-xs sm:text-sm text-ink line-clamp-2">
                  {item.title}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
