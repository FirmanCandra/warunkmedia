import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MessageSquare, CheckCircle2, 
  Camera, Calendar, FileSpreadsheet, Shirt, Layers, 
  Briefcase, HardHat, Package, ChevronRight, ChevronLeft, Clock,
  CreditCard, Award, BookOpen, Sparkles
} from 'lucide-react';
import { PRODUCTS, WORKFLOW_STEPS, PRODUCTION_STAGES, PRODUCTION_GALLERY } from '../data/mockData';

const BANNER_SLIDES = [
  {
    id: 1,
    image: '/banner-1.png',
    alt: 'Produksi Kaos Sablon Warunk Media Semarang',
    code: 'WM-0012'
  },
  {
    id: 2,
    image: '/banner-2.png',
    alt: 'Produksi Jaket & Hoodie Komunitas Warunk Media',
    code: 'WM-0009'
  },
  {
    id: 3,
    image: '/banner-3.png',
    alt: 'Produksi Kemeja PDH & Korsa Warunk Media',
    code: 'WM-0015'
  }
];

export default function Home() {
  const [quickCode, setQuickCode] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  };

  const handleQuickCheck = (e) => {
    e.preventDefault();
    if (quickCode.trim()) {
      navigate(`/cek-projek?code=${encodeURIComponent(quickCode.trim().toUpperCase())}`);
    }
  };

  const getProductIcon = (iconName) => {
    switch (iconName) {
      case 'Shirt': return <Shirt className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />;
      case 'Layers': return <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />;
      case 'HardHat': return <HardHat className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />;
      case 'CreditCard': return <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />;
      case 'Award': return <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />;
      case 'Package': return <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />;
      default: return <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-8 sm:space-y-12 pb-28 md:pb-16 overflow-x-hidden">
      {/* 1. HERO SECTION (Layout Mengacu Referensi GajahPrint & Wireframe Hal 11) */}
      <section className="max-w-[1120px] mx-auto px-3 sm:px-4 pt-2 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          {/* Kiri: Daftar Kategori Produk - DESKTOP ONLY */}
          <div className="hidden lg:flex lg:col-span-3 bg-surface rounded-card border border-line p-4 shadow-xs flex-col justify-between">
            <div>
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
            <div className="pt-3 border-t border-line text-[11px] text-muted flex items-center justify-between">
              <span>Minimal order 24 pcs</span>
              <span className="font-semibold text-brand-green">Free Desain</span>
            </div>
          </div>

          {/* Tengah: Banner Carousel Grafis (Revisi Garis Biru Sesuai Referensi Gambar 2) */}
          <div className="lg:col-span-6 relative rounded-card overflow-hidden border border-line shadow-xs group bg-canvas flex flex-col justify-center">
            {/* Slide Gambar Banner */}
            <div 
              className="relative w-full aspect-[2/1] min-h-[170px] sm:min-h-[220px] cursor-pointer overflow-hidden"
              onClick={() => navigate(`/cek-projek?code=${BANNER_SLIDES[currentSlide].code}`)}
              title="Klik untuk cek demo projek"
            >
              {BANNER_SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover select-none"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>

            {/* Kontrol Carousel di Bagian Bawah Kanan (GajahPrint Style) */}
            <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-20 flex items-center gap-1 sm:gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                aria-label="Slide sebelumnya"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all active:scale-95 shadow-sm"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                aria-label="Slide berikutnya"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all active:scale-95 shadow-sm"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Indikator Titik Carousel di Tengah Bawah */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
              {BANNER_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  aria-label={`Ke slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide 
                      ? 'w-5 sm:w-6 bg-primary' 
                      : 'w-2 bg-white/70 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Kanan: Dua Kartu Cepat (Cek Projek & Tanya WhatsApp) */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
            {/* Kartu Input Cek Projek Cepat */}
            <div className="bg-surface rounded-card border border-line p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-sm text-ink mb-1 flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-primary" />
                  <span>Cek Projek</span>
                </h3>
                <p className="text-[11px] sm:text-xs text-muted mb-2.5">
                  Masukkan kode pesanan untuk melihat progres terkini.
                </p>
                <form onSubmit={handleQuickCheck} className="space-y-2">
                  <input
                    type="text"
                    value={quickCode}
                    onChange={(e) => setQuickCode(e.target.value)}
                    placeholder="Kode, mis: WM-0012"
                    className="w-full px-3 py-2 text-xs bg-canvas border border-line rounded-control focus:outline-none focus:ring-2 focus:ring-primary uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-control transition-colors shadow-xs"
                  >
                    Cek Pesanan
                  </button>
                </form>
              </div>
              <div className="mt-2.5 pt-2 border-t border-line/60 text-[11px] text-muted flex flex-wrap items-center gap-1">
                <span>Contoh:</span>
                <button
                  type="button"
                  onClick={() => setQuickCode('WM-0012')}
                  className="text-primary font-mono hover:underline font-semibold"
                  title="Kaos Angkatan"
                >
                  WM-0012
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setQuickCode('WM-0021')}
                  className="text-primary font-mono hover:underline font-semibold"
                  title="ID Card & Lanyard"
                >
                  WM-0021
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setQuickCode('WM-0024')}
                  className="text-primary font-mono hover:underline font-semibold"
                  title="Slempang Wisuda"
                >
                  WM-0024
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setQuickCode('WM-0028')}
                  className="text-primary font-mono hover:underline font-semibold"
                  title="Buku Tahunan"
                >
                  WM-0028
                </button>
              </div>
            </div>

            {/* Kartu Tanya WhatsApp */}
            <div className="bg-surface rounded-card border border-line p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-sm text-ink mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-brand-green" />
                  <span>Tanya via WhatsApp</span>
                </h3>
                <p className="text-[11px] sm:text-xs text-muted mb-3 leading-relaxed">
                  Hubungi owner Warunk Media untuk pemesanan baru atau konsultasi bahan.
                </p>
              </div>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Warunk%20Media,%20saya%20ingin%20konsultasi%20pesanan%20konveksi"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 bg-canvas hover:bg-line text-ink text-xs font-semibold rounded-control border border-line flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-brand-green shrink-0" />
                <span className="truncate">Chat Owner (0812-3456-7890)</span>
              </a>
            </div>
          </div>
        </div>

        {/* PRODUK KAMI - GRID MOBILE ONLY (Sesuai Wireframe Hal 10 & 12) */}
        <div className="lg:hidden mt-5 bg-surface rounded-card border border-line p-3.5 shadow-xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-line">
            <span className="font-heading font-bold text-xs text-ink uppercase tracking-wider">Produk Kami</span>
            <span className="text-[10px] text-muted">Min. Order 24 pcs</span>
          </div>
          <div className="grid grid-cols-5 gap-2 text-center">
            {PRODUCTS.map((prod) => (
              <a
                key={prod.id}
                href="#produk-kami"
                className="flex flex-col items-center p-1.5 rounded-lg hover:bg-canvas transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-active:scale-95 transition-transform">
                  {getProductIcon(prod.icon)}
                </div>
                <span className="text-[10px] font-semibold text-ink leading-tight truncate w-full">
                  {prod.name.split(' ')[0]}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. EMPAT KARTU KEUNGGULAN (Wireframe Hal 11 & design.md Section 12) */}
      <section className="max-w-[1120px] mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="bg-surface rounded-card border border-line p-3.5 sm:p-5 shadow-xs flex flex-col gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-ink">Pantau Progres</h4>
              <p className="text-[11px] sm:text-xs text-muted mt-0.5 leading-relaxed">
                Lihat tahap pengerjaan pesanan kapan saja tanpa perlu chat manual.
              </p>
            </div>
          </div>

          <div className="bg-surface rounded-card border border-line p-3.5 sm:p-5 shadow-xs flex flex-col gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-ink">Foto Bukti</h4>
              <p className="text-[11px] sm:text-xs text-muted mt-0.5 leading-relaxed">
                Setiap tahap produksi (sablon, potong, jahit) disertai foto bukti real.
              </p>
            </div>
          </div>

          <div className="bg-surface rounded-card border border-line p-3.5 sm:p-5 shadow-xs flex flex-col gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-ink">Deadline Jelas</h4>
              <p className="text-[11px] sm:text-xs text-muted mt-0.5 leading-relaxed">
                Estimasi tanggal selesai terdata transparan sejak awal pemesanan.
              </p>
            </div>
          </div>

          <div className="bg-surface rounded-card border border-line p-3.5 sm:p-5 shadow-xs flex flex-col gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-ink">Worksheet & Invoice</h4>
              <p className="text-[11px] sm:text-xs text-muted mt-0.5 leading-relaxed">
                Dokumen rincian ukuran, spesifikasi bahan, dan invoice resmi siap cetak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ALUR PROJEK (4 LANGKAH) */}
      <section id="alur-projek" className="max-w-[1120px] mx-auto px-3 sm:px-4 scroll-mt-24">
        <div className="flex items-center justify-between pb-3 mb-4 sm:mb-6 border-b border-line">
          <div>
            <h2 className="font-heading font-bold text-lg sm:text-2xl text-ink">Alur Projek</h2>
            <p className="text-[11px] sm:text-xs text-muted">Proses dari awal pemesanan hingga barang diterima</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {WORKFLOW_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-surface rounded-card border border-line p-4 sm:p-5 shadow-xs relative"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-heading font-black text-sm flex items-center justify-center mb-2.5">
                {step.step}
              </div>
              <h4 className="font-heading font-bold text-sm sm:text-base text-ink mb-1">{step.title}</h4>
              <p className="text-[11px] sm:text-xs text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PROSES PROJEK (6 TAHAPAN PRODUKSI KONVEKSI) */}
      <section id="proses-projek" className="max-w-[1120px] mx-auto px-3 sm:px-4 scroll-mt-24">
        <div className="flex items-center justify-between pb-3 mb-4 sm:mb-6 border-b border-line">
          <div>
            <h2 className="font-heading font-bold text-lg sm:text-2xl text-ink">Proses Projek</h2>
            <p className="text-[11px] sm:text-xs text-muted">Tahapan produksi standar workshop Warunk Media Semarang</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {PRODUCTION_STAGES.map((stg, idx) => (
            <div
              key={stg.id}
              className="bg-surface rounded-card border border-line p-3 sm:p-4 text-center shadow-xs hover:border-primary/50 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-canvas border border-line text-ink font-bold text-xs flex items-center justify-center mx-auto mb-2">
                {idx + 1}
              </div>
              <h5 className="font-heading font-bold text-xs sm:text-sm text-ink mb-1">{stg.name}</h5>
              <p className="text-[10px] sm:text-[11px] text-muted line-clamp-3 leading-tight">{stg.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DEADLINE PROJEK */}
      <section id="deadline-projek" className="max-w-[1120px] mx-auto px-3 sm:px-4 scroll-mt-24">
        <div className="bg-[#1F1F1F] text-white rounded-card p-5 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-brand-amber text-xs font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Aturan & Estimasi Deadline</span>
              </div>
              <h3 className="font-heading font-bold text-lg sm:text-2xl text-white">
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
              className="w-full sm:w-auto text-center px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-control text-xs font-semibold whitespace-nowrap transition-colors shadow-xs"
            >
              Konsultasi Deadline Khusus
            </a>
          </div>
        </div>
      </section>

      {/* 6. HASIL PRODUKSI (GALERI DOKUMENTASI KONVEKSI) */}
      <section id="produk-kami" className="max-w-[1120px] mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between pb-3 mb-4 sm:mb-6 border-b border-line">
          <div>
            <h2 className="font-heading font-bold text-lg sm:text-2xl text-ink">Hasil Produksi</h2>
            <p className="text-[11px] sm:text-xs text-muted">Contoh pesanan yang telah selesai diproduksi</p>
          </div>
          <a
            href="https://www.instagram.com/warunk_media/"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-primary hover:text-primary-dark flex items-center gap-1"
          >
            <span>Instagram</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile: Horizontal Carousel (Wireframe Hal 10 & 12) | Desktop: Grid 4 Kolom */}
        <div className="flex md:grid md:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
          {PRODUCTION_GALLERY.map((item) => (
            <div
              key={item.id}
              className="min-w-[200px] sm:min-w-[240px] md:min-w-0 snap-start shrink-0 group bg-surface rounded-card border border-line overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="aspect-4/3 bg-canvas overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-3 sm:p-3.5">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-primary block mb-0.5">
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
