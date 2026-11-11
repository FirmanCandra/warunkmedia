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
  const [activeProductId, setActiveProductId] = useState('kaos');
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
  const activeProduct = useMemo(() => {
    return PRODUCTS.find((p) => p.id === activeProductId) || PRODUCTS[0];
  }, [activeProductId]);

  // Filtered products for the catalog showcase
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter((p) => p.division === selectedCategory);
  }, [selectedCategory]);

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
          2. PRODUK KAMI: LUXURY KINETIC MOVING IMAGE ICONS ("ICON BERGERAK BERBENTUK GAMBAR")
          (Revisi: Tanpa kotak polos, icon berbentuk foto produk yang bergerak/float ritmis, hapus min order 24 pcs)
          ========================================================================= */}
      <section id="produk-kami" className="max-w-[1120px] mx-auto px-3 sm:px-4">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#181818] via-[#141414] to-[#0D0D0D] text-white p-5 sm:p-8 md:p-10 border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Ambient Lighting Orbs for High-End Depth */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[10px] sm:text-xs font-bold text-amber-300 tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Katalog Pilihan Workshop Semarang</span>
              </div>
              <h2 className="font-heading font-extrabold text-xl sm:text-3xl text-white tracking-tight">
                PRODUK KAMI
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                Sentuh atau klik icon produk untuk melihat spesifikasi bahan, hasil cetak bordir/sablon, dan konsultasi cepat via WhatsApp.
              </p>
            </div>

            {/* Quick Contact Action */}
            <a
              href="https://wa.me/6281234567890?text=Halo%20Warunk%20Media,%20saya%20mau%20konsultasi%20pemesanan%20produk%20workshop"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-all shadow-md active:scale-95 shrink-0 self-start md:self-auto cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-brand-green" />
              <span>Konsultasi WA Workshop</span>
            </a>
          </div>

          {/* ── PART A: 9 KINETIC FLOATING IMAGE ICONS (ICON YANG BERGERAK-GERAK) ── */}
          <div className="relative z-10 pt-8 pb-4">
            <div className="grid grid-cols-5 md:grid-cols-9 gap-2 xs:gap-3 sm:gap-4 md:gap-3 lg:gap-4">
              {PRODUCTS.map((prod, idx) => {
                const isActive = prod.id === activeProductId;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => setActiveProductId(prod.id)}
                    className={`group flex flex-col items-center text-center p-1 sm:p-2 rounded-2xl transition-all duration-300 focus:outline-none cursor-pointer ${
                      isActive ? 'bg-white/10 ring-1 ring-primary/60 scale-105' : 'hover:bg-white/5'
                    }`}
                    title={`Lihat detail ${prod.name}`}
                  >
                    {/* The Kinetic Moving Image Icon Pod */}
                    <div
                      className="relative animate-icon-float"
                      style={{ animationDelay: `${idx * 0.28}s` }}
                    >
                      {/* Ambient Glow Aura */}
                      <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${
                        isActive 
                          ? 'from-primary to-amber-400 opacity-80 blur-sm' 
                          : 'from-primary/30 to-amber-500/30 opacity-0 group-hover:opacity-75 blur-sm'
                      } transition-opacity duration-300 pointer-events-none`} />

                      {/* Realistic Image Container */}
                      <div className={`relative w-13 h-13 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-2xl overflow-hidden bg-black/60 shadow-lg transition-transform duration-300 group-hover:scale-105 ${
                        isActive 
                          ? 'border-2 border-primary ring-2 ring-primary/40' 
                          : 'border border-white/20 group-hover:border-amber-400/80'
                      }`}>
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500 ease-out select-none"
                          loading="lazy"
                        />

                        {/* Glass Glossy Sheen Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-white/45 pointer-events-none" />

                        {/* Active Indicator Pip */}
                        {isActive && (
                          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-primary border border-white shadow-xs" />
                        )}
                      </div>

                      {/* Dynamic Levitation Shadow beneath the icon */}
                      <div
                        className="w-9 xs:w-10 sm:w-12 md:w-14 h-1.5 sm:h-2 mx-auto rounded-full bg-black/60 blur-[3px] animate-icon-shadow mt-1.5 pointer-events-none"
                        style={{ animationDelay: `${idx * 0.28}s` }}
                      />
                    </div>

                    {/* Icon Label */}
                    <span className={`mt-1 font-heading font-bold text-[11px] xs:text-xs sm:text-xs transition-colors line-clamp-1 ${
                      isActive ? 'text-primary' : 'text-white/90 group-hover:text-amber-300'
                    }`}>
                      {prod.shortName || prod.name}
                    </span>

                    {/* Micro Subtitle on tablet/desktop */}
                    <span className="text-[9px] sm:text-[10px] text-white/50 hidden sm:block truncate max-w-[80px]">
                      {prod.highlight.split('&')[0].trim()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── PART B: INTERACTIVE SPOTLIGHT CARD FOR ACTIVE PRODUCT ── */}
          {activeProduct && (
            <div className="relative z-10 mt-6 pt-6 border-t border-white/10">
              <div className="rounded-2xl bg-white/5 border border-white/15 p-4 sm:p-6 backdrop-blur-md flex flex-col md:flex-row gap-5 items-center">
                
                {/* Product Image Spotlight */}
                <div className="w-full md:w-64 h-48 sm:h-56 md:h-44 rounded-xl overflow-hidden relative shrink-0 bg-black/50 border border-white/15 shadow-inner">
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/80 backdrop-blur-md text-amber-300 border border-amber-400/40">
                      {activeProduct.badge}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-primary text-white shadow-xs">
                      {activeProduct.division === 'konveksi' ? 'Konveksi' : activeProduct.division === 'merchandise' ? 'Merchandise' : 'Percetakan'}
                    </span>
                  </div>
                </div>

                {/* Product Detail Content */}
                <div className="flex-1 w-full space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-amber-300">
                        ✦ {activeProduct.highlight}
                      </span>
                    </div>
                    <h3 className="font-heading font-extrabold text-lg sm:text-2xl text-white">
                      {activeProduct.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {activeProduct.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/10 text-gray-200">
                      <strong className="text-white">Material:</strong> {activeProduct.material}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/10 text-gray-200">
                      <strong className="text-white">Workshop:</strong> Semarang, Jawa Tengah
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={`https://wa.me/6281234567890?text=Halo%20Warunk%20Media,%20saya%20mau%20konsultasi%20pemesanan%20${encodeURIComponent(activeProduct.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold inline-flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-brand-green" />
                      <span>Pesan & Konsultasi {activeProduct.shortName} via WhatsApp</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    
                    <button
                      type="button"
                      onClick={() => navigate('/cek-projek?code=WM-0012')}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors border border-white/10 cursor-pointer"
                    >
                      <span>Lihat Simulasi Progres</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ── PART C: KATALOG LENGKAP DENGAN FILTER KATEGORI ── */}
          <div className="relative z-10 pt-8 mt-6 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                  Katalog Lengkap Spesialisasi
                </h3>
                <p className="text-xs text-gray-400">Pilih kategori untuk memfilter rincian pengerjaan.</p>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { key: 'all', label: 'Semua' },
                  { key: 'konveksi', label: 'Konveksi' },
                  { key: 'merchandise', label: 'Merchandise' },
                  { key: 'percetakan', label: 'Percetakan' }
                ].map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === cat.key
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveProductId(item.id)}
                  className={`rounded-2xl bg-white/5 border p-3 sm:p-4 flex gap-3.5 items-center group transition-all cursor-pointer ${
                    activeProductId === item.id 
                      ? 'border-primary/80 bg-white/10 shadow-md' 
                      : 'border-white/10 hover:border-white/20 hover:bg-white/8'
                  }`}
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
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-white truncate group-hover:text-primary transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-gray-300 truncate mt-0.5">
                      {item.highlight}
                    </p>
                    <div className="text-[11px] font-bold text-primary hover:text-white inline-flex items-center gap-1 mt-1.5 transition-colors">
                      <MessageSquare className="w-3 h-3 text-brand-green" />
                      <span>Detail & Konsultasi &rarr;</span>
                    </div>
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
