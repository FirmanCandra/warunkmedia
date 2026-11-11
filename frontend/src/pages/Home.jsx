import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
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

const ADVANTAGES = [
  {
    id: 'pantau-progres',
    step: '01',
    title: 'Pantau Progres',
    desc: 'Status pengerjaan ter-update real-time tanpa perlu chat admin berulang kali.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 drop-shadow-xs">
        <defs>
          <linearGradient id="grad-prog-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
        </defs>
        {/* Outer dashed track */}
        <circle cx="32" cy="32" r="25" stroke="#E5E2DD" strokeWidth="2.5" strokeDasharray="3 3" />
        {/* Active Progress Arc */}
        <path d="M 32 7 A 25 25 0 1 1 11.5 45" stroke="url(#grad-prog-1)" strokeWidth="3.5" strokeLinecap="round" />
        {/* Target ping nodes */}
        <circle cx="32" cy="7" r="3.5" fill="#B91C1C" stroke="white" strokeWidth="1.5" />
        <circle cx="57" cy="32" r="2.5" fill="#E5E2DD" />
        <circle cx="32" cy="57" r="2.5" fill="#E5E2DD" />
        {/* Center Display Pod */}
        <rect x="20" y="20" width="24" height="24" rx="6" fill="#F7F6F4" stroke="#B91C1C" strokeWidth="1.8" />
        {/* Radar needle */}
        <line x1="32" y1="32" x2="39" y2="25" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="32" cy="32" r="3" fill="#B91C1C" />
        {/* Mini verified check badge */}
        <circle cx="43" cy="21" r="5" fill="#2E9E44" stroke="white" strokeWidth="1.5" />
        <path d="M41 21 L42.5 22.5 L45.5 19.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'foto-bukti',
    step: '02',
    title: 'Foto Bukti Real',
    desc: 'Dokumentasi foto asli tiap tahap: potong kain, sablon, bordir, hingga jahit.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 drop-shadow-xs">
        <defs>
          <linearGradient id="grad-cam-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
        </defs>
        {/* Background tilted snapshot */}
        <rect x="26" y="8" width="26" height="28" rx="3" fill="#FFFFFF" stroke="#E5E2DD" strokeWidth="1.5" transform="rotate(10 39 22)" />
        <rect x="28.5" y="10.5" width="21" height="17" rx="1.5" fill="#FDF2F2" transform="rotate(10 39 22)" />
        {/* Camera Body */}
        <rect x="10" y="22" width="44" height="32" rx="7" fill="#FFFFFF" stroke="#1F1F1F" strokeWidth="2.2" />
        {/* Top Flash Housing */}
        <path d="M22 22 L25 16 H39 L42 22 Z" fill="#1F1F1F" />
        <circle cx="32" cy="19" r="2" fill="#F5B400" />
        {/* Camera Lens */}
        <circle cx="32" cy="38" r="11" fill="#F7F6F4" stroke="#1F1F1F" strokeWidth="2" />
        <circle cx="32" cy="38" r="8" fill="url(#grad-cam-1)" />
        <circle cx="30" cy="36" r="2.5" fill="white" fillOpacity="0.8" />
        {/* Verified badge */}
        <circle cx="46" cy="46" r="6" fill="#B91C1C" stroke="white" strokeWidth="1.8" />
        <path d="M43.5 46 L45.2 47.7 L48.8 44.2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'deadline-jelas',
    step: '03',
    title: 'Deadline Jelas',
    desc: 'Estimasi tanggal selesai transparan sejak awal demi ketepatan jadwal acara Anda.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 drop-shadow-xs">
        <defs>
          <linearGradient id="grad-clock-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
        </defs>
        {/* Calendar Body */}
        <rect x="12" y="14" width="40" height="40" rx="7" fill="#FFFFFF" stroke="#1F1F1F" strokeWidth="2.2" />
        {/* Header Ribbon */}
        <path d="M12 21 C12 17.5 14.5 15 18 15 H46 C49.5 15 52 17.5 52 21 V24 H12 Z" fill="url(#grad-clock-1)" />
        {/* Binder Rings */}
        <rect x="20" y="10" width="4" height="8" rx="2" fill="#1F1F1F" />
        <rect x="40" y="10" width="4" height="8" rx="2" fill="#1F1F1F" />
        {/* Clock Face */}
        <circle cx="32" cy="38" r="11" fill="#F7F6F4" stroke="#B91C1C" strokeWidth="2" />
        <line x1="32" y1="29.5" x2="32" y2="31" stroke="#5F5B55" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32" y1="45" x2="32" y2="46.5" stroke="#5F5B55" strokeWidth="1.5" strokeLinecap="round" />
        {/* Clock Hands */}
        <path d="M32 38 V32 M32 38 H37" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="38" r="2" fill="#B91C1C" />
        {/* Lightning Punctuality Badge */}
        <circle cx="45" cy="47" r="5.5" fill="#F5B400" stroke="white" strokeWidth="1.5" />
        <path d="M45.5 43.5 L43.5 47 H46 L44.5 50.5" stroke="#1F1F1F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'worksheet-invoice',
    step: '04',
    title: 'Worksheet & Invoice',
    desc: 'Rincian spesifikasi ukuran dan invoice resmi workshop siap cetak kapan saja.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 drop-shadow-xs">
        <defs>
          <linearGradient id="grad-doc-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
        </defs>
        {/* Document Sheet */}
        <path d="M16 11 C16 8.8 17.8 7 20 7 H38 L48 17 V51 C48 53.2 46.2 55 44 55 H20 C17.8 55 16 53.2 16 51 Z" fill="#FFFFFF" stroke="#1F1F1F" strokeWidth="2.2" />
        {/* Folded Corner */}
        <path d="M38 7 V17 H48" fill="#F7F6F4" stroke="#1F1F1F" strokeWidth="2" />
        {/* Header Stripe */}
        <rect x="22" y="16" width="12" height="3" rx="1.5" fill="url(#grad-doc-1)" />
        {/* Data Lines */}
        <line x1="22" y1="24" x2="42" y2="24" stroke="#E5E2DD" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="30" x2="38" y2="30" stroke="#E5E2DD" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="36" x2="34" y2="36" stroke="#E5E2DD" strokeWidth="2" strokeLinecap="round" />
        {/* Official Wax Seal */}
        <circle cx="39" cy="43" r="8" fill="#B91C1C" stroke="white" strokeWidth="1.8" />
        <circle cx="39" cy="43" r="6" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M36.5 43 L38.2 44.7 L41.8 41.3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
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

  return (
    <div className="space-y-12 sm:space-y-16 pb-28 md:pb-16 overflow-x-hidden">
      
      {/* =========================================================================
          1. HERO SECTION: CINEMATIC WIDESCREEN BANNER CAROUSEL
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

            {/* Subtle Gradient Overlay for Depth */}
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
          2. KATEGORI PRODUK (CLEAN OPEN CANVAS, NO HEAVY OUTER BORDER BOX)
          ========================================================================= */}
      <section id="kategori-produk" className="max-w-[1120px] mx-auto px-3 sm:px-4">
        {/* Header: Clean & Modern */}
        <div className="flex items-center justify-between pb-3 mb-4 sm:mb-6 border-b border-line">
          <div>
            <h2 className="font-heading font-extrabold text-lg sm:text-2xl text-ink tracking-tight">
              Kategori Produk
            </h2>
            <p className="text-[11px] sm:text-xs text-muted mt-0.5">
              Pilihan produksi konveksi, merchandise, dan atribut resmi
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center text-xs font-bold text-primary bg-red-50 border border-primary/20 px-3 py-1 rounded-full">
            10 Pilihan Divisi
          </span>
        </div>

        {/* 5 Kolom x 2 Baris: Rapi, Ringkas, Proporsional di Mobile & Desktop */}
        <div className="grid grid-cols-5 gap-2 xs:gap-2.5 sm:gap-3.5 md:gap-4">
          {PRODUCTS.map((prod, idx) => (
            <a
              key={prod.id}
              href={`https://wa.me/6281234567890?text=Halo%20Warunk%20Media,%20saya%20tertarik%20pemesanan%20${encodeURIComponent(prod.name)}`}
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-xl sm:rounded-2xl border border-line/80 hover:border-primary/60 hover:shadow-md hover:-translate-y-1 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center p-2 sm:p-3.5 md:p-4 text-center group cursor-pointer aspect-square sm:aspect-[1/1.08] relative shadow-2xs"
              title={`Konsultasi ${prod.name} via WhatsApp`}
            >
              {/* Bespoke Animated Product Icon in Brand Red */}
              <div
                className="w-7 h-7 xs:w-8 xs:h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center text-primary group-hover:text-primary-dark transition-all duration-300 animate-icon-bounce-gentle group-hover:scale-115 shrink-0"
                style={{ animationDelay: `${idx * 0.18}s` }}
              >
                <ProductIcon productId={prod.id} className="w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 drop-shadow-xs" />
              </div>

              {/* Centered Label */}
              <span className="mt-1 sm:mt-2 font-heading font-bold text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-ink group-hover:text-primary transition-colors text-center leading-tight line-clamp-2 px-0.5">
                {prod.shortName || prod.name}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. KEUNGGULAN WORKSHOP (BESPOKE ICONS ONLY, OPEN SEAMLESS CANVAS)
          ========================================================================= */}
      <section className="max-w-[1120px] mx-auto px-3 sm:px-4 py-2 sm:py-6">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-14">
          <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-widest text-primary mb-2 inline-block bg-red-50 px-3 py-1 rounded-full border border-primary/20">
            Standar Transparansi Workshop
          </span>
          <h2 className="font-heading font-extrabold text-xl xs:text-2xl sm:text-3xl md:text-4xl text-ink tracking-tight leading-tight mt-1">
            Pantau Pesanan Konveksi,{' '}
            <span className="text-primary underline decoration-primary/40 underline-offset-8">
              Lebih Tenang!
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-2.5 sm:mt-3 leading-relaxed max-w-xl mx-auto">
            Standar transparansi pengerjaan workshop Warunk Media Semarang: live tracking tahapan, dokumentasi foto bukti pengerjaan real-time, dan jaminan kepastian deadline.
          </p>
        </div>

        {/* 4 Connected Nodes (Desktop: Horizontal Line | Mobile: Balanced 2x2 Grid) */}
        <div className="relative">
          {/* Horizontal Connecting Guide Line behind circles on Desktop */}
          <div className="hidden md:block absolute top-16 md:top-18 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-line via-primary/35 to-line -translate-y-1/2 z-0 pointer-events-none" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-9 md:gap-6 relative z-10">
            {ADVANTAGES.map((item, idx) => (
              <div key={item.id} className="flex flex-col items-center group">
                
                {/* Elegant Bespoke Icon Pod */}
                <div className="relative">
                  {/* The Orb / Pod */}
                  <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-white border-2 border-line/80 shadow-sm group-hover:border-primary/60 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 flex items-center justify-center p-3 sm:p-5 relative overflow-hidden">
                    {/* Subtle interior glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-red-50/50 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Animated Bespoke Vector Icon */}
                    <div 
                      className="relative z-10 w-full h-full flex items-center justify-center text-primary group-hover:scale-110 group-hover:text-primary-dark transition-transform duration-300 animate-icon-bounce-gentle"
                      style={{ animationDelay: `${idx * 0.25}s` }}
                    >
                      {item.icon}
                    </div>
                  </div>

                  {/* Floating Step Badge at bottom center */}
                  <div className="absolute -bottom-2.5 sm:-bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-heading font-black text-[10px] sm:text-xs shadow-md ring-4 ring-[#F7F6F4] group-hover:scale-110 transition-transform duration-300 z-20">
                    <span>{item.step}</span>
                  </div>
                </div>

                {/* Text Details Below Circle */}
                <div className="mt-4 sm:mt-5 text-center">
                  <h3 className="font-heading font-extrabold text-xs xs:text-sm sm:text-base text-ink group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[10px] xs:text-[11px] sm:text-xs text-muted mt-1 leading-relaxed max-w-[200px] mx-auto line-clamp-3">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}
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
