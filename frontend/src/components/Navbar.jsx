import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Phone, User, LogOut } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

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

  return (
    <header className="w-full bg-surface shadow-xs sticky top-0 z-40 border-b border-line">
      {/* 1. Top Bar Merah Tipis */}
      <div className="bg-primary text-white text-xs py-1.5 px-4">
        <div className="max-w-[1120px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/warunk_media/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white/80 transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>@warunk_media</span>
            </a>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Warunk%20Media,%20saya%20ingin%20tanya%20projek%20konveksi"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white/80 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>0812-3456-7890</span>
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <a href="#alur-projek" className="hover:text-white/80 transition-colors">Alur Projek</a>
            <span>•</span>
            <a href="#kontak" className="hover:text-white/80 transition-colors">Kontak & Workshop</a>
          </div>
        </div>
      </div>

      {/* 2. Header Utama (Logo, Search Pil, User/Login) */}
      <div className="max-w-[1120px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo saja sesuai aturan design.md section 2 */}
        <Link to="/" className="flex-shrink-0 flex items-center" aria-label="Beranda Warunk Media">
          <img
            src="/logo-warunkmedia.jpg"
            alt="Warunk Media"
            className="h-9 sm:h-10 w-auto object-contain"
          />
        </Link>

        {/* Kolom Pencarian Pil */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-2 sm:mx-6">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Masukkan kode pesanan, mis. WM-0012"
              className="w-full pl-4 pr-24 py-2 text-sm bg-canvas border border-line rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted"
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
        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <Link
                to={currentUser.role === 'admin' ? '/admin' : '/berandaku'}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-line text-xs font-semibold hover:bg-canvas transition-colors"
              >
                <User className="w-3.5 h-3.5 text-primary" />
                <span className="max-w-[100px] truncate">{currentUser.name}</span>
                <span className="text-[10px] uppercase bg-canvas px-1.5 py-0.5 rounded text-muted border border-line">
                  {currentUser.role}
                </span>
              </Link>
              <button
                onClick={onLogout}
                title="Keluar"
                className="p-2 text-muted hover:text-primary transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-full text-xs font-semibold transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Masuk</span>
            </Link>
          )}
        </div>
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
          <a href="/#alur-projek" className="px-4 py-2.5 hover:bg-primary-dark transition-colors">
            Alur Projek
          </a>
          <a href="/#proses-projek" className="px-4 py-2.5 hover:bg-primary-dark transition-colors">
            Proses Projek
          </a>
          <a href="/#deadline-projek" className="px-4 py-2.5 hover:bg-primary-dark transition-colors">
            Deadline Projek
          </a>
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
