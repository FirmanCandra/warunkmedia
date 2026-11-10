import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, MessageSquare, ClipboardList, User } from 'lucide-react';

export default function BottomNav({ currentUser }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-line z-50 px-2 py-1.5 shadow-lg no-print pb-safe">
      <div className="flex items-center justify-around relative">
        {/* Beranda */}
        <Link
          to="/"
          className={`flex flex-col items-center py-1 px-2 min-w-[56px] text-[11px] transition-colors ${
            isActive('/') ? 'text-primary font-bold' : 'text-muted hover:text-ink'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Beranda</span>
        </Link>

        {/* Cek Projek */}
        <Link
          to="/cek-projek"
          className={`flex flex-col items-center py-1 px-2 min-w-[56px] text-[11px] transition-colors ${
            isActive('/cek-projek') ? 'text-primary font-bold' : 'text-muted hover:text-ink'
          }`}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span>Cek Projek</span>
        </Link>

        {/* WhatsApp Menonjol di Tengah */}
        <div className="relative -top-5 flex flex-col items-center">
          <a
            href="https://wa.me/6281234567890?text=Halo%20Warunk%20Media,%20saya%20mau%20tanya%20progres%20pesanan"
            target="_blank"
            rel="noreferrer"
            aria-label="Chat WhatsApp"
            className="w-12 h-12 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center shadow-lg ring-4 ring-surface active:scale-95 transition-all"
          >
            <MessageSquare className="w-6 h-6 fill-white" />
          </a>
          <span className="text-[10px] font-bold text-ink mt-0.5">WA</span>
        </div>

        {/* Berandaku */}
        <Link
          to="/berandaku"
          className={`flex flex-col items-center py-1 px-2 min-w-[56px] text-[11px] transition-colors ${
            isActive('/berandaku') ? 'text-primary font-bold' : 'text-muted hover:text-ink'
          }`}
        >
          <ClipboardList className="w-5 h-5 mb-0.5" />
          <span>Berandaku</span>
        </Link>

        {/* Akun / Admin */}
        <Link
          to={currentUser?.role === 'admin' ? '/admin' : currentUser ? '/berandaku' : '/login'}
          className={`flex flex-col items-center py-1 px-2 min-w-[56px] text-[11px] transition-colors ${
            isActive('/login') || isActive('/admin') ? 'text-primary font-bold' : 'text-muted hover:text-ink'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>{currentUser?.role === 'admin' ? 'Admin' : currentUser ? 'Akun' : 'Masuk'}</span>
        </Link>
      </div>
    </nav>
  );
}

