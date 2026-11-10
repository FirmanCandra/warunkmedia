import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, AlertCircle, FileText, Receipt, Package, Calendar, Clock } from 'lucide-react';
import TimelineProgress from '../components/TimelineProgress';
import WorksheetModal from '../components/WorksheetModal';
import InvoiceModal from '../components/InvoiceModal';
import { INITIAL_ORDERS } from '../data/mockData';

export default function CheckProject({ orders = INITIAL_ORDERS }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCode = searchParams.get('code') || 'WM-0012';
  const [inputCode, setInputCode] = useState(initialCode);
  const [showWorksheet, setShowWorksheet] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  // Derived state from query/code directly without cascading useEffect renders
  const cleanCode = (searchParams.get('code') || inputCode || '').trim().toUpperCase();
  const activeOrder = orders.find(
    (o) => (o.id || o.order_code || '').toUpperCase() === cleanCode
  ) || null;

  const errorMsg = cleanCode && !activeOrder
    ? `Pesanan dengan kode "${cleanCode}" tidak ditemukan. Silakan periksa kembali kode pada invoice atau nota Anda.`
    : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      setSearchParams({ code: inputCode.trim().toUpperCase() });
    }
  };

  const getBadgeStyle = (variant) => {
    switch (variant) {
      case 'completed':
        return 'bg-[#DDF3E1] text-[#14532D] border-brand-green/30';
      case 'progress':
        return 'bg-[#FDF0C4] text-[#5B4300] border-[#F5B400]/40';
      default:
        return 'bg-[#ECEAE6] text-[#5F5B55] border-line';
    }
  };

  return (
    <div className="max-w-[1120px] mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* Header Halaman Cek Projek */}
      <div className="bg-surface rounded-card border border-line p-5 sm:p-6 shadow-xs">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink mb-1">
          Cek Projek
        </h1>
        <p className="text-xs sm:text-sm text-muted mb-4">
          Masukkan kode pesanan konveksi Anda untuk memantau progres dan dokumentasi foto pengerjaan.
        </p>

        {/* Input Bar Pencarian Kode */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-xl">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Contoh: WM-0012"
              className="w-full px-4 py-2.5 bg-canvas border border-line rounded-control text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-control text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Search className="w-4 h-4" />
            <span>Cek Pesanan</span>
          </button>
        </form>

        {/* Quick Sample Links */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span>Coba contoh kode pesanan:</span>
          <button
            type="button"
            onClick={() => {
              setInputCode('WM-0012');
              setSearchParams({ code: 'WM-0012' });
              lookupOrder('WM-0012');
            }}
            className="px-2 py-0.5 rounded bg-canvas border border-line hover:border-primary text-primary font-mono font-semibold"
          >
            WM-0012 (Sablon Berjalan)
          </button>
          <button
            type="button"
            onClick={() => {
              setInputCode('WM-0009');
              setSearchParams({ code: 'WM-0009' });
              lookupOrder('WM-0009');
            }}
            className="px-2 py-0.5 rounded bg-canvas border border-line hover:border-primary text-primary font-mono font-semibold"
          >
            WM-0009 (Selesai)
          </button>
          <button
            type="button"
            onClick={() => {
              setInputCode('WM-0015');
              setSearchParams({ code: 'WM-0015' });
              lookupOrder('WM-0015');
            }}
            className="px-2 py-0.5 rounded bg-canvas border border-line hover:border-primary text-primary font-mono font-semibold"
          >
            WM-0015 (Desain)
          </button>
        </div>
      </div>

      {/* Galat jika kode tidak ditemukan */}
      {errorMsg && (
        <div className="bg-[#FBE1E1] border border-red-300 text-[#7F1D1D] p-4 rounded-card flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
          <div className="text-sm">
            <p className="font-semibold">{errorMsg}</p>
            <p className="text-xs text-[#7F1D1D]/80 mt-1">
              Butuh bantuan? Silakan hubungi admin kami via{' '}
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="underline font-bold">
                WhatsApp 0812-3456-7890
              </a>.
            </p>
          </div>
        </div>
      )}

      {/* Hasil Tracking Pesanan */}
      {activeOrder && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Kolom Kiri: Ringkasan Pesanan (Wireframe Hal 6 & 8) */}
          <div className="lg:col-span-4 bg-surface rounded-card border border-line p-5 sm:p-6 shadow-xs space-y-5 sticky top-24">
            <div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-2 ${getBadgeStyle(
                  activeOrder.statusVariant
                )}`}
              >
                {activeOrder.statusText}
              </span>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-ink">
                {activeOrder.productName}
              </h2>
              <p className="text-xs text-muted font-mono mt-0.5">
                Kode: {activeOrder.id || activeOrder.order_code} · {activeOrder.quantity} pcs
              </p>
            </div>

            <div className="aspect-video w-full rounded-xl overflow-hidden bg-canvas border border-line">
              <img
                src={activeOrder.thumbnail || '/logo-warunkmedia.jpg'}
                alt={activeOrder.productName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 text-xs border-y border-line py-4">
              <div className="flex items-center justify-between">
                <span className="text-muted flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-primary" />
                  <span>Kategori Produk:</span>
                </span>
                <span className="font-semibold text-ink">{activeOrder.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Target Selesai:</span>
                </span>
                <span className="font-bold text-primary">{activeOrder.deadline}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Status Tahap:</span>
                </span>
                <span className="font-semibold text-ink">
                  Tahap {(activeOrder.currentStageIndex ?? 0) + 1} dari 6
                </span>
              </div>
            </div>

            {/* Tombol Dokumen Worksheet & Invoice */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => setShowWorksheet(true)}
                className="w-full py-2.5 px-3 bg-canvas hover:bg-line text-ink rounded-control text-xs font-semibold border border-line flex items-center justify-center gap-2 transition-colors"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span>Lihat Lembar Kerja (Worksheet)</span>
              </button>
              <button
                type="button"
                onClick={() => setShowInvoice(true)}
                className="w-full py-2.5 px-3 bg-canvas hover:bg-line text-ink rounded-control text-xs font-semibold border border-line flex items-center justify-center gap-2 transition-colors"
              >
                <Receipt className="w-4 h-4 text-brand-green" />
                <span>Lihat Invoice Pesanan</span>
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Timeline Progres Vertikal Lengkap (Wireframe Hal 6 & 8) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-line">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-ink">
                Timeline Progres Produksi
              </h3>
              <span className="text-xs text-muted">Diperbarui real-time oleh tim produksi</span>
            </div>

            <TimelineProgress
              timeline={activeOrder.timeline}
              currentStageIndex={activeOrder.currentStageIndex}
            />
          </div>
        </div>
      )}

      {/* Modal Worksheet Order */}
      {showWorksheet && activeOrder && (
        <WorksheetModal order={activeOrder} onClose={() => setShowWorksheet(false)} />
      )}

      {/* Modal Invoice Order */}
      {showInvoice && activeOrder && (
        <InvoiceModal order={activeOrder} onClose={() => setShowInvoice(false)} />
      )}
    </div>
  );
}
