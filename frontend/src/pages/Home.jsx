import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Camera, Calendar, FileSpreadsheet, 
  ChevronRight, ChevronLeft, Clock, Sparkles, MessageSquare, 
  ArrowUpRight
} from 'lucide-react';
import { PRODUCTS, WORKFLOW_STEPS, PRODUCTION_STAGES, PRODUCTION_GALLERY } from '../data/mockData';

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
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'konveksi' | 'merchandise' | 'percetakan'
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

  // Filtered products for the interactive luxury collection
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter((p) => p.division === selectedCategory);
  }, [selectedCategory]);

  // Duplicate for seamless infinite marquee loop
  const marqueeItems = useMemo(() => {
    return [...PRODUCTS, ...PRODUCTS];
  }, []);

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
          2. PRODUK KAMI: LUXURY ANIMATED SHOWCASE ("GAMBAR BERGERAK")
          (Revisi: Tanpa kotak polos, gambar visual bergerak, hapus min order 24 pcs)
          ========================================================================= */}
      <section id="produk-kami" className="max-w-[1120px] mx-auto px-3 sm:px-4">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#181818] via-[#141414] to-[#0D0D0D] text-white p-5 sm:p-8 md:p-10 border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Ambient Lighting Orbs for High-End Depth */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[10px] sm:text-xs font-bold text-amber-300 tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Koleksi Pilihan Workshop</span>
              </div>
              <h2 className="font-heading font-extrabold text-xl sm:text-3xl text-white tracking-tight">
                Produk Kami & Pengerjaan Eksklusif
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                Garment distro presisi, bordir komputer tajam, merchandise seminar kit, hingga jilid buku resmi workshop Warunk Media Semarang.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                Semua Koleksi
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('konveksi')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'konveksi'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                Konveksi
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('merchandise')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'merchandise'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                Merchandise
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('percetakan')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'percetakan'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                Percetakan
              </button>
            </div>
          </div>

          {/* ── PART A: INFINITE ANIMATED MOVING SHOWCASE ("GAMBAR BERGERAK") ── */}
          <div className="relative z-10 pt-6">
            <div className="flex items-center justify-between text-xs text-white/50 mb-3 px-1">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span>Galeri Berjalan Otomatis (Arahkan kursor atau sentuh untuk berhenti)</span>
              </span>
              <span className="text-[10px] hidden sm:inline">Geser untuk jelajah &rarr;</span>
            </div>

            {/* Marquee Track Container */}
            <div className="overflow-hidden relative py-2 -mx-2 sm:-mx-4">
              {/* Fade Edges for Luxury Depth */}
              <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#181818] to-transparent z-20 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#0D0D0D] to-transparent z-20 pointer-events-none" />

              <div className="animate-luxury-marquee flex gap-3.5 sm:gap-5">
                {marqueeItems.map((prod, idx) => (
                  <div
                    key={`${prod.id}-${idx}`}
                    className="w-60 sm:w-72 shrink-0 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/60 transition-all duration-500 group overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1.5 relative flex flex-col justify-between"
                  >
                    {/* Visual Moving Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Moving Shimmer Sheen Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-luxury-shimmer pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/75 backdrop-blur-md text-amber-300 border border-amber-400/30">
                          {prod.badge}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-primary/85 text-white shadow-xs">
                          {prod.division === 'konveksi' ? 'Apparel' : prod.division === 'merchandise' ? 'Merch' : 'Cetak'}
                        </span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-3.5 sm:p-4 space-y-2 flex-1 flex flex-col justify-between bg-gradient-to-b from-white/5 to-transparent">
                      <div>
                        <h4 className="font-heading font-bold text-sm text-white group-hover:text-primary transition-colors line-clamp-1">
                          {prod.name}
                        </h4>
                        <p className="text-[11px] font-semibold text-amber-300/90 mt-0.5 line-clamp-1">
                          ✦ {prod.highlight}
                        </p>
                        <p className="text-[11px] text-gray-300 line-clamp-2 mt-1 leading-snug">
                          {prod.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[10px] text-white/50 truncate max-w-[130px]">
                          {prod.material}
                        </span>
                        <a
                          href={`https://wa.me/6281234567890?text=Halo%20Warunk%20Media,%20saya%20tertarik%20pemesanan%20${encodeURIComponent(prod.name)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-primary group-hover:text-white transition-colors"
                        >
                          <span>Pesan</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── PART B: INTERACTIVE LUXURY GRID (Filtered Showcase) ── */}
          <div className="relative z-10 pt-8 mt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                  Katalog Detail Produk
                </h3>
                <p className="text-xs text-gray-400">Pilih kategori atau langsung konsultasikan kebutuhan Anda.</p>
              </div>
              <span className="text-xs font-semibold text-primary">
                {filteredProducts.length} Pilihan Produk
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 p-3 sm:p-4 flex gap-3.5 items-center group transition-all hover:bg-white/8"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 relative bg-black/40">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[9px] uppercase font-bold text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-white truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-gray-300 truncate mt-0.5">
                      {item.highlight}
                    </p>
                    <a
                      href={`https://wa.me/6281234567890?text=Halo%20Warunk%20Media,%20saya%20mau%20konsultasi%20bahan%20${encodeURIComponent(item.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-bold text-primary hover:text-white inline-flex items-center gap-1 mt-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3 h-3 text-brand-green" />
                      <span>Konsultasi WA &rarr;</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
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
