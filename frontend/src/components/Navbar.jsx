import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, LogOut } from 'lucide-react';

export default function Navbar({ currentUser, onLogout }) {
  const [searchCode, setSearchCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCode.trim()) {
      navigate(`/cek-projek?code=${encodeURIComponent(searchCode.trim().toUpperCase())}`);
    }
  };

  const isActive = (path) => location.pathname === path;

  // Shorten name for mobile display
  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : '';

  return (
    <header className="w-full bg-surface sticky top-0 z-40 border-b border-line shadow-xs">
      {/* Header Utama */}
      <div className="max-w-[1120px] mx-auto px-3 sm:px-4 py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo Warunk Media */}
          <Link to="/" className="shrink-0 flex items-center py-1" aria-label="Beranda Warunk Media">
            <img
              src="/logo-warunkmedia.png"
              alt="Warunk Media"
              className="h-7 sm:h-8 md:h-9 w-auto max-w-[180px] sm:max-w-[220px] object-contain transition-transform hover:scale-102"
            />
          </Link>

          {/* Kolom Pencarian Pil - DESKTOP (md+) */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full flex items-center">
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Masukkan kode pesanan, mis. WM-0012"
                className="w-full pl-4 pr-24 py-2 text-xs sm:text-sm bg-canvas border border-line rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-full flex items-center gap-1.5 transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Cek</span>
              </button>
            </div>
          </form>

          {/* User / Login Navigation */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {currentUser ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  to={currentUser.role === 'admin' ? '/admin' : '/berandaku'}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-line text-xs font-semibold hover:bg-canvas transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="hidden sm:inline max-w-[90px] truncate">{currentUser.name}</span>
                  <span className="sm:hidden text-xs">{firstName}</span>
                  <span className="text-[9px] uppercase bg-canvas px-1.5 py-0.5 rounded text-muted border border-line">
                    {currentUser.role === 'admin' ? 'Owner' : 'Akun'}
                  </span>
                </Link>
                <button
                  onClick={onLogout}
                  title="Keluar"
                  className="p-1.5 text-muted hover:text-primary transition-colors rounded-full hover:bg-canvas"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 px-3.5 py-1.5 sm:px-4 sm:py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-full text-xs font-semibold transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Masuk</span>
              </Link>
            )}
          </div>
        </div>

        {/* Kolom Pencarian Pil - MOBILE ONLY (< md) */}
        <form onSubmit={handleSearch} className="md:hidden mt-2 pt-1 border-t border-line/50">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Masukkan kode pesanan, mis. WM-0012"
              className="w-full pl-3.5 pr-20 py-2 text-xs bg-canvas border border-line rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted uppercase font-mono"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3.5 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-full flex items-center gap-1 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Cek</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. Bar Menu Merah Desktop */}
      <nav className="hidden md:block bg-primary text-white text-sm font-semibold shadow-inner">
        <div className="max-w-[1120px] mx-auto px-4 flex items-center space-x-1">
          <Link
            to="/"
            className={`px-4 py-2.5 hover:bg-primary-dark transition-colors ${
              isActive('/') ? 'bg-primary-dark underline underline-offset-4' : ''
            }`}
          >
            Beranda
          </Link>
          <Link
            to="/cek-projek"
            className={`px-4 py-2.5 hover:bg-primary-dark transition-colors ${
              isActive('/cek-projek') ? 'bg-primary-dark underline underline-offset-4' : ''
            }`}
          >
            Cek Projek
          </Link>
          <Link
            to="/berandaku"
            className={`px-4 py-2.5 hover:bg-primary-dark transition-colors ${
              isActive('/berandaku') ? 'bg-primary-dark underline underline-offset-4' : ''
            }`}
          >
            Berandaku
          </Link>
          {currentUser?.role === 'admin' && (
            <Link
              to="/admin"
              className={`ml-auto px-4 py-2.5 bg-secondary hover:bg-black text-white font-bold transition-colors ${
                isActive('/admin') ? 'ring-2 ring-white/50' : ''
              }`}
            >
              Panel Owner/Admin
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
