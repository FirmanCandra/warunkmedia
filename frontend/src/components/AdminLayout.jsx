import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, Users, Layers, Shirt, CreditCard, BookOpen,
  Plus, MessageSquare, ExternalLink, LogOut, Menu, X, ChevronRight
} from 'lucide-react';
import { AdminProvider } from '../context/AdminContext';
import { useAdmin } from '../context/adminContextDef';

function AdminLayoutInner({ children, currentUser, onLogout }) {
  const navigate = useNavigate();
  const {
    activeTab,
    selectTab,
    selectedDivision,
    selectDivision,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    openNewOrder,
    openNewCustomer,
    counts,
  } = useAdmin();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-canvas text-ink antialiased">
      
      {/* =========================================================================
          1. MOBILE TOPBAR (Visible only on < lg)
          ========================================================================= */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#141414] text-white border-b border-white/10 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 -ml-1 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            aria-label="Buka Menu Panel Admin"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo-warunkmedia.png"
              alt="Warunk Media"
              className="h-6 w-auto object-contain brightness-0 invert"
            />
            <span className="text-[10px] uppercase font-bold text-primary tracking-wider border-l border-white/20 pl-2">
              Owner
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={activeTab === 'orders' ? openNewOrder : openNewCustomer}
            className="px-2.5 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{activeTab === 'orders' ? 'Pesanan' : 'Customer'}</span>
          </button>

          <div className="w-7 h-7 rounded-full bg-primary/80 text-white font-bold text-xs flex items-center justify-center shrink-0">
            {currentUser?.name?.charAt(0) || 'O'}
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. MOBILE SIDEBAR DRAWER (Slide over with Backdrop)
          ========================================================================= */}
      {mobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* =========================================================================
          3. LEFT SIDEBAR PANEL (Desktop persistent, Mobile slide-over)
          ========================================================================= */}
      <aside
        className={`
          fixed lg:sticky top-0 bottom-0 left-0 z-50 lg:z-30
          w-64 max-w-[85vw] lg:w-64 bg-[#141414] text-white border-r border-white/10
          flex flex-col justify-between p-4 sm:p-5
          transition-transform duration-300 ease-in-out
          h-screen overflow-y-auto select-none
          ${mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="space-y-6">
          {/* Header Sidebar Brand */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link to="/" className="flex items-center gap-2.5" title="Kembali ke Beranda">
              <img
                src="/logo-warunkmedia.png"
                alt="Warunk Media"
                className="h-7 w-auto object-contain brightness-0 invert"
              />
            </Link>
            
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Workshop Status Pill */}
          <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-xs font-bold text-white/90">Workshop Aktif</span>
            </div>
            <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">
              Semarang
            </span>
          </div>

          {/* ── Section: MENU UTAMA ── */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/40 px-3 block mb-1">
              Menu Utama
            </span>

            {/* 1. Pesanan Produksi */}
            <button
              type="button"
              onClick={() => selectTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 shrink-0" />
                <span>Pesanan Produksi</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  activeTab === 'orders'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/10 text-white/70'
                }`}
              >
                {counts.totalOrders}
              </span>
            </button>

            {/* 2. Data Customer / Participant */}
            <button
              type="button"
              onClick={() => selectTab('customers')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'customers'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 shrink-0" />
                <span>Data Customer</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  activeTab === 'customers'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/10 text-white/70'
                }`}
              >
                {counts.customers}
              </span>
            </button>
          </div>

          {/* ── Section: FILTER DIVISI PRODUKSI ── */}
          <div className="space-y-1.5 pt-2 border-t border-white/10">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/40 px-3 block mb-1">
              Filter Divisi
            </span>

            <button
              type="button"
              onClick={() => selectDivision('')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'orders' && selectedDivision === ''
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-3.5 h-3.5 text-white/60 shrink-0" />
                <span>Semua Divisi</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => selectDivision('apparel')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'orders' && selectedDivision === 'apparel'
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Shirt className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Konveksi (Apparel)</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => selectDivision('merchandise')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'orders' && selectedDivision === 'merchandise'
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-3.5 h-3.5 text-brand-green shrink-0" />
                <span>Merchandise</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => selectDivision('percetakan')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'orders' && selectedDivision === 'percetakan'
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Percetakan & Buku</span>
              </div>
            </button>
          </div>

          {/* ── Section: AKSI CEPAT ── */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={openNewOrder}
              className="w-full py-2.5 px-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow"
            >
              <Plus className="w-4 h-4" />
              <span>+ Buat Pesanan Baru</span>
            </button>

            <a
              href="https://wa.me/6281234567890?text=Halo%20Admin%20Workshop,%20cek%20antrian%20produksi"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-brand-green" />
              <span>WhatsApp Workshop</span>
            </a>
          </div>
        </div>

        {/* ── Bottom Section: Profile & Logout ── */}
        <div className="pt-4 mt-6 border-t border-white/10 space-y-3">
          {/* User Profile Info */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              {currentUser?.name?.charAt(0) || 'O'}
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-white truncate leading-tight">
                {currentUser?.name || 'Owner Warunk Media'}
              </span>
              <span className="block text-[10px] text-white/50 truncate">
                {currentUser?.email || 'owner@warunkmedia.com'}
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <Link
              to="/"
              className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              title="Buka Website Publik"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Website</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-red-950/60 hover:text-red-300 text-white/70 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              title="Keluar dari Panel Admin"
            >
              <LogOut className="w-3 h-3" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          4. MAIN WORKSPACE AREA (Right side of Left Sidebar)
          ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 bg-canvas overflow-y-auto">
        {/* Desktop Topbar Header */}
        <header className="hidden lg:flex items-center justify-between px-6 py-3.5 bg-surface border-b border-line sticky top-0 z-30 shadow-2xs">
          {/* Breadcrumb Path */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted font-medium">Panel Owner</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted" />
            <span className="font-bold text-ink">
              {activeTab === 'orders' ? 'Pesanan Produksi' : 'Data Customer'}
            </span>
            {activeTab === 'orders' && selectedDivision && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-muted" />
                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-bold text-[10px] uppercase">
                  Divisi {selectedDivision}
                </span>
              </>
            )}
          </div>

          {/* Topbar Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-muted hover:text-ink hover:bg-canvas transition-colors border border-line"
            >
              <span>Lihat Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={activeTab === 'orders' ? openNewOrder : openNewCustomer}
              className="px-3.5 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{activeTab === 'orders' ? '+ Pesanan Baru' : '+ Customer Baru'}</span>
            </button>
          </div>
        </header>

        {/* Main Dashboard Child Content */}
        <main className="flex-1 p-3 sm:p-5 lg:p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children, currentUser, onLogout }) {
  return (
    <AdminProvider>
      <AdminLayoutInner currentUser={currentUser} onLogout={onLogout}>
        {children}
      </AdminLayoutInner>
    </AdminProvider>
  );
}
