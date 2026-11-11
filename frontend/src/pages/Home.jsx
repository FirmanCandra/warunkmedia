import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Camera, Calendar, FileSpreadsheet, 
  ChevronRight, ChevronLeft, Clock
} from 'lucide-react';
import { PRODUCTS, WORKFLOW_STEPS, PRODUCTION_STAGES, PRODUCTION_GALLERY } from '../data/mockData';
import ProductIcon from '../components/ProductIcons';

const BANNER_SLIDES = [
  {
    id: 1,
    image: '/banner-1.png',
    alt: 'Produksi Kaos Sablon Warunk Media Semarang',
    code: 'WM-0012',
    tag: 'Kaos & Polo Shirt',
    headline: 'Produksi Kaos Sablon Plastisol & DTF Distro'
  },
  {
    id: 2,
    image: '/banner-2.png',
    alt: 'Produksi Jaket & Hoodie Komunitas Warunk Media',
    code: 'WM-0009',
    tag: 'Jaket & Hoodie',
    headline: 'Bordir Komputer & Bahan Taslan Waterproof'
  },
  {
    id: 3,
    image: '/banner-3.png',
    alt: 'Produksi Kemeja PDH & Korsa Warunk Media',
    code: 'WM-0015',
    tag: 'PDH & Korsa',
    headline: 'Nagata Drill Original untuk Organisasi & Kampus'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Auto-rotate Hero Banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  };

  // Active spotlight product for detailed preview
  


  return (
    <div className="space-y-10 sm:space-y-14 pb-28 md:pb-16 overflow-x-hidden">
      
      {/* =========================================================================
          1. HERO SECTION: CINEMATIC WIDESCREEN BANNER CAROUSEL
          (Cek Projek & Tanya WA cards removed as requested)
          ========================================================================= */}
      <section className="max-w-[1120px] mx-auto px-3 sm:px-4 pt-2 sm:pt-6">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-line shadow-md group bg-[#111111]">
          {/* Slide Container */}
          <div 
            className="relative w-full aspect-[16/9] sm:aspect-[2.3/1] md:aspect-[2.5/1] cursor-pointer overflow-hidden select-none"
            onClick={() => navigate(`/cek-projek?code=${BANNER_SLIDES[currentSlide].code}`)}
            title="Klik untuk cek demo live tracking pesanan ini"
          >
            {BANNER_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
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

            {/* Subtle Gradient Overlay for Cinematic Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-10" />

            {/* Bottom Left: Live Demo Tracker Tag */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-5 z-20 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                <span>Demo Tracking: #{BANNER_SLIDES[currentSlide].code}</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] text-white/90 drop-shadow font-medium">
                Klik banner untuk simulasi tracking &rarr;
              </span>
            </div>

            {/* Controls: Prev / Next Buttons */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-5 z-20 flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                aria-label="Slide sebelumnya"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all active:scale-95 shadow-md border border-white/20"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                aria-label="Slide berikutnya"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all active:scale-95 shadow-md border border-white/20"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 hidden xs:flex items-center gap-1.5">
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
                    ? 'w-6 bg-primary shadow-xs' 
                    : 'w-2 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. KATEGORI PRODUK (GRID 5x2 RAPI & COMPACT DI MOBILE & DESKTOP)
          (Display detail barang ditiadakan, mobile tetap 2 baris rapi tidak memanjang)
          ========================================================================= */}
      <section id="kategori-produk" className="max-w-[1120px] mx-auto px-3 sm:px-4">
        <div className="bg-surface rounded-card border border-line p-3 sm:p-5 md:p-6 shadow-xs">
          
          {/* Header: Title + Dotted Line */}
          <div className="flex items-center gap-2.5 sm:gap-4 mb-3 sm:mb-5">
            <h2 className="font-heading font-extrabold text-sm sm:text-xl md:text-2xl text-ink shrink-0 tracking-tight">
              Kategori Produk
            </h2>
            <div className="flex-1 border-b-2 border-dotted border-gray-300" />
            <span className="text-[10px] sm:text-xs text-muted font-medium shrink-0">
              Pilihan Konveksi & Merchandise
            </span>
          </div>

          {/* 5 Kolom x 2 Baris: Rapi, Ringkas, Tidak Memanjang ke Bawah di HP */}
          <div className="grid grid-cols-5 gap-1.5 xs:gap-2 sm:gap-3 md:gap-4">
            {PRODUCTS.map((prod, idx) => (
              <a
                key={prod.id}
                href={`https://wa.me/6281234567890?text=Halo%20Warunk%20Media,%20saya%20tertarik%20pemesanan%20${encodeURIComponent(prod.name)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-white rounded-xl sm:rounded-2xl border border-line hover:border-primary/60 hover:bg-red-50/20 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center p-1.5 xs:p-2 sm:p-3 md:p-4 text-center group cursor-pointer aspect-square sm:aspect-[1/1.05] relative shadow-2xs hover:shadow-sm"
                title={`Konsultasi ${prod.name} via WhatsApp`}
              >
                {/* Bespoke Animated Product Icon in Brand Red */}
                <div
                  className="w-7 h-7 xs:w-8 xs:h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center text-primary group-hover:text-primary-dark transition-all duration-300 animate-icon-bounce-gentle group-hover:scale-115 group-hover:-translate-y-0.5 shrink-0"
                  style={{ animationDelay: `${idx * 0.18}s` }}
                >
                  <ProductIcon productId={prod.id} className="w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 drop-shadow-xs" />
                </div>

                {/* Centered Label */}
                <span className="mt-1 sm:mt-2 font-heading font-bold text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-ink group-hover:text-primary transition-colors text-center leading-tight line-clamp-2">
                  {prod.shortName || prod.name}
                </span>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. EMPAT KARTU KEUNGGULAN (Wireframe Hal 11 & design.md Section 12)
          ========================================================================= */}
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

      {/* =========================================================================
          4. ALUR PROJEK (4 LANGKAH)
          ========================================================================= */}
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

      {/* =========================================================================
          5. PROSES PROJEK (6 TAHAPAN PRODUKSI KONVEKSI)
          ========================================================================= */}
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

      {/* =========================================================================
          6. DEADLINE PROJEK
          ========================================================================= */}
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

      {/* =========================================================================
          7. HASIL PRODUKSI (GALERI DOKUMENTASI KONVEKSI)
          ========================================================================= */}
      <section id="hasil-produksi" className="max-w-[1120px] mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between pb-3 mb-4 sm:mb-6 border-b border-line">
          <div>
            <h2 className="font-heading font-bold text-lg sm:text-2xl text-ink">Hasil Produksi Workshop</h2>
            <p className="text-[11px] sm:text-xs text-muted">Contoh pesanan yang telah selesai diproduksi</p>
          </div>
          <a
            href="https://www.instagram.com/warunk_media/"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-primary hover:text-primary-dark flex items-center gap-1"
          >
            <span>Instagram @warunk_media</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile: Horizontal Carousel | Desktop: Grid 4 Kolom */}
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
