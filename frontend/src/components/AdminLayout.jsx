import { Link, useNavigate } from 'react-router-dom';
import { LogOut, ExternalLink, LayoutDashboard } from 'lucide-react';

export default function AdminLayout({ children, currentUser, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      {/* ── Dedicated Admin Header (completely separate from public navbar) ── */}
      <header className="sticky top-0 z-40 bg-[#1A1A1A] text-white border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Brand + Admin Badge */}
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/" className="shrink-0 flex items-center gap-2.5" aria-label="Beranda Warunk Media">
              <img
                src="/logo-warunkmedia.png"
                alt="Warunk Media"
                className="h-7 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <div className="hidden sm:flex flex-col border-l border-white/20 pl-3">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#B91C1C] leading-none mb-0.5">
                Panel Owner
              </span>
              <span className="text-[11px] font-semibold text-white/80 leading-none">
                Workshop Semarang
              </span>
            </div>
          </div>

          {/* Admin Navigation Pills */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-xl px-2 py-1 border border-white/10">
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-bold"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
          </nav>

          {/* Right: User Info + Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* User pill */}
            <div className="hidden sm:flex items-center gap-2 bg-white/8 border border-white/15 rounded-xl px-3 py-1.5">
              <div className="w-6 h-6 rounded-full bg-[#B91C1C]/80 flex items-center justify-center text-white font-bold text-[10px] shrink-0">
                {currentUser?.name?.charAt(0) || 'O'}
              </div>
              <div className="leading-tight">
                <span className="block text-[11px] font-bold text-white/90 max-w-[100px] truncate">
                  {currentUser?.name || 'Owner'}
                </span>
                <span className="block text-[9px] text-white/50 uppercase tracking-wide">
                  Admin
                </span>
              </div>
            </div>

            {/* Back to public site */}
            <Link
              to="/"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors"
              title="Lihat tampilan website publik"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Website</span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-red-900/40 border border-white/10 hover:border-red-700/50 text-white/70 hover:text-red-300 text-xs font-semibold transition-colors"
              title="Keluar dari Panel Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Admin Page Content ── */}
      <main className="flex-1 bg-canvas">
        {children}
      </main>
    </div>
  );
}
