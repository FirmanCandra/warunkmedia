import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Lock, Mail, User, Eye, EyeOff, ArrowLeft, 
  Clock, Camera, FileText, Shield
} from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    
    // Automatically detect admin vs customer based on email or keywords
    if (cleanEmail.includes('owner') || cleanEmail.includes('admin')) {
      onLogin({
        id: 1,
        name: 'Owner Warunk Media',
        email: cleanEmail || 'owner@warunkmedia.com',
        role: 'admin',
      });
      navigate('/admin');
    } else {
      onLogin({
        id: 2,
        name: cleanEmail.split('@')[0] || 'Firman Candra',
        email: cleanEmail || 'firman@example.com',
        role: 'customer',
      });
      navigate('/berandaku');
    }
  };

  const handleDemoCustomer = () => {
    onLogin({
      id: 2,
      name: 'Firman Candra',
      email: 'firman@example.com',
      role: 'customer',
    });
    navigate('/berandaku');
  };

  const handleDemoAdmin = () => {
    onLogin({
      id: 1,
      name: 'Owner Warunk Media',
      email: 'owner@warunkmedia.com',
      role: 'admin',
    });
    navigate('/admin');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-3 sm:p-6 lg:p-8">
      <div className="w-full max-w-[980px] bg-surface border border-line rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row items-stretch">
        
        {/* =========================================================================
            SISI KIRI: BRAND MISSION & NILAI LAYANAN (REFERENSI SEBARIS.ID)
            ========================================================================= */}
        <aside className="hidden lg:flex lg:w-5/12 bg-[#191919] text-white p-8 xl:p-10 flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 select-none relative overflow-hidden">
          {/* Aksen glow merah halus */}
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

          {/* Logo Brand */}
          <div className="relative z-10">
            <Link to="/" className="inline-block" aria-label="Beranda Warunk Media">
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl inline-flex items-center border border-white/15">
                <img
                  src="/logo-warunkmedia.png"
                  alt="Warunk Media"
                  className="h-7 w-auto object-contain brightness-0 invert"
                />
              </div>
            </Link>
          </div>

          {/* Headline & 3 Pilar Utama */}
          <div className="my-auto py-6 space-y-6 relative z-10">
            <div className="space-y-2">
              <h2 className="text-xl xl:text-2xl font-bold font-heading tracking-tight text-white leading-snug">
                Sistem Tracking Produksi Konveksi & Merchandise
              </h2>
              <p className="text-xs xl:text-sm text-gray-300 leading-relaxed">
                Pantau progres pengerjaan kaos, jaket, PDH, ID card, slempang, hingga buku secara transparan dan akurat.
              </p>
            </div>

            <div className="space-y-3.5 pt-1">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/20 border border-primary/30 text-white mt-0.5 shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Pantau Progres Real-Time</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                    Lacak tahapan potong kain, sablon, bordir, hingga jilid buku langsung dari workshop.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-brand-green/20 border border-brand-green/30 text-white mt-0.5 shrink-0">
                  <Camera className="w-4 h-4 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Bukti Foto Workshop Nyata</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                    Setiap tahapan produksi disertai dokumentasi foto nyata dari tim produksi kami.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30 text-white mt-0.5 shrink-0">
                  <FileText className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Worksheet & Invoice Resmi</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                    Rincian ukuran, spesifikasi bahan, dan nota invoice resmi siap dicetak kapan saja.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info Workshop */}
          <div className="pt-4 border-t border-white/10 text-[11px] text-gray-400 relative z-10">
            <span className="block font-semibold text-gray-300">PT Warunk Media Grup</span>
            <span>Jl. Griya Prasetya Selatan VI No.183, Semarang</span>
          </div>
        </aside>

        {/* =========================================================================
            SISI KANAN: FORM LOGIN BERSIH & MODERN (SPLIT-CARD UX)
            ========================================================================= */}
        <main className="w-full lg:w-7/12 p-6 sm:p-10 flex flex-col justify-between bg-surface">
          <div>
            {/* Navigasi Kembali */}
            <div className="flex items-center justify-between pb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Beranda</span>
              </Link>
              <span className="text-[11px] text-muted font-medium hidden sm:inline">
                Warunk Media Tracking
              </span>
            </div>

            {/* Header Form */}
            <div className="space-y-1 mb-6">
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink">
                Masuk ke Akun
              </h1>
              <p className="text-xs sm:text-sm text-muted">
                Masukkan email dan sandi Anda untuk mengakses Berandaku atau Panel Owner.
              </p>
            </div>

            {/* Form Input */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-semibold text-xs text-ink block mb-1">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com atau owner@warunkmedia.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-canvas border border-line rounded-control text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-xs text-ink block mb-1">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi akun"
                    className="w-full pl-10 pr-11 py-2.5 bg-canvas border border-line rounded-control text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-muted hover:text-ink focus:outline-none"
                    aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-muted">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-line text-primary focus:ring-primary w-4 h-4"
                  />
                  <span>Ingat saya di perangkat ini</span>
                </label>

                <a
                  href="https://wa.me/6281234567890?text=Halo%20Warunk%20Media,%20saya%20butuh%20bantuan%20login%20akun"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline font-semibold"
                >
                  Lupa sandi?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-control text-xs sm:text-sm font-bold transition-all shadow-xs hover:shadow-md active:scale-99 mt-2 flex items-center justify-center gap-2"
              >
                <span>Masuk Sekarang</span>
              </button>
            </form>
          </div>

          {/* Akses Demo Cepat (1-Click) */}
          <div className="pt-6 mt-6 border-t border-line space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-muted">
              <span className="font-semibold uppercase tracking-wider">Akses Cepat Pengujian:</span>
              <span className="text-[10px]">Klik untuk langsung masuk</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoCustomer}
                className="p-2.5 bg-canvas hover:bg-line border border-line rounded-control text-xs font-semibold text-ink flex items-center justify-between transition-colors group text-left"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block font-bold">Akun Customer</span>
                    <span className="block text-[10px] text-muted">Firman Candra</span>
                  </div>
                </div>
                <span className="text-[10px] text-primary font-bold group-hover:underline">Masuk &rarr;</span>
              </button>

              <button
                type="button"
                onClick={handleDemoAdmin}
                className="p-2.5 bg-canvas hover:bg-line border border-line rounded-control text-xs font-semibold text-ink flex items-center justify-between transition-colors group text-left"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center font-bold text-xs shrink-0">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block font-bold">Akun Owner / Admin</span>
                    <span className="block text-[10px] text-muted">Kelola Workshop</span>
                  </div>
                </div>
                <span className="text-[10px] text-brand-green font-bold group-hover:underline">Masuk &rarr;</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
