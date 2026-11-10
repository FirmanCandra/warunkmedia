import React from 'react';
import { X, Printer, CheckCircle, FileText } from 'lucide-react';

export default function WorksheetModal({ order, onClose }) {
  if (!order) return null;

  const ws = order.worksheet || {};
  const sizes = ws.sizes || {};
  const totalQty = Object.values(sizes).reduce((acc, curr) => acc + (Number(curr) || 0), 0) || order.quantity;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-60 bg-black/75 overflow-y-auto backdrop-blur-xs flex justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-surface sm:rounded-card border-x-0 sm:border border-line shadow-2xl my-0 sm:my-8 flex flex-col min-h-screen sm:min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal Bar - Pinned / Sticky di atas agar selalu terlihat dan bisa ditutup */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5 border-b border-line bg-surface/95 backdrop-blur-md shadow-xs no-print">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
            <h3 className="font-heading font-bold text-xs sm:text-sm md:text-base text-ink truncate">
              Worksheet #{order.id || order.order_code}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="px-2.5 py-1.5 sm:px-3 bg-primary hover:bg-primary-dark text-white rounded-control text-[11px] sm:text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Cetak</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 bg-canvas hover:bg-line text-ink rounded-full border border-line transition-colors flex items-center justify-center active:scale-95"
              aria-label="Tutup"
              title="Tutup Modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-ink" />
            </button>
          </div>
        </div>

        {/* Isi Dokumen Worksheet (Siap Cetak) */}
        <div className="p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6 bg-surface text-ink text-xs sm:text-sm">
          {/* Kop Dokumen */}
          <div className="flex items-start justify-between border-b-2 border-primary pb-3 sm:pb-4 gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <img src="/logo-warunkmedia.png" alt="Warunk Media" className="h-6 sm:h-8 w-auto object-contain" />
              </div>
              <p className="text-[10px] sm:text-xs text-muted">PT Warunk Media Grup — Semarang</p>
              <p className="text-[10px] sm:text-xs text-muted">WA: 0812-3456-7890</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary block">LEMBAR KERJA</span>
              <span className="font-mono text-sm sm:text-base font-bold text-ink">{order.id || order.order_code}</span>
              <span className="text-[10px] sm:text-xs text-muted block mt-0.5">Tgl: {order.orderDate || order.order_date || 'N/A'}</span>
            </div>
          </div>

          {/* Informasi Pemesan */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 bg-canvas/60 p-3 sm:p-4 rounded-xl border border-line text-[11px] sm:text-xs">
            <div>
              <span className="text-muted block text-[10px]">Customer</span>
              <span className="font-semibold text-ink break-words">{order.customerName || order.customer_name}</span>
            </div>
            <div>
              <span className="text-muted block text-[10px]">Kontak</span>
              <span className="font-semibold text-ink">{order.customerPhone || order.customer_phone || '-'}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-muted block text-[10px]">Deadline</span>
              <span className="font-bold text-primary">{order.deadline}</span>
            </div>
          </div>

          {/* Spesifikasi Kain & Sablon */}
          <div>
            <h4 className="font-heading font-bold text-[11px] sm:text-xs uppercase tracking-wider text-muted mb-2 border-b border-line pb-1">
              Spesifikasi Produksi
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs">
              <div className="border border-line rounded-lg p-2.5 bg-surface">
                <span className="text-[10px] text-muted block mb-0.5">Jenis Item</span>
                <span className="font-semibold text-ink">{ws.itemType || ws.item_type || order.productName}</span>
              </div>
              <div className="border border-line rounded-lg p-2.5 bg-surface">
                <span className="text-[10px] text-muted block mb-0.5">Bahan Kain</span>
                <span className="font-semibold text-ink">{ws.fabric || 'Cotton Combed 24s'}</span>
              </div>
              <div className="border border-line rounded-lg p-2.5 bg-surface">
                <span className="text-[10px] text-muted block mb-0.5">Aplikasi Cetak</span>
                <span className="font-semibold text-ink">{ws.printType || ws.print_type || 'Sablon Plastisol'}</span>
              </div>
            </div>
          </div>

          {/* Rincian Ukuran / Size Chart Breakdown */}
          <div>
            <h4 className="font-heading font-bold text-[11px] sm:text-xs uppercase tracking-wider text-muted mb-2 border-b border-line pb-1">
              Rincian Ukuran (Size Breakdown)
            </h4>
            <div className="overflow-x-auto no-scrollbar border border-line rounded-lg">
              <table className="w-full text-center border-collapse text-[11px] sm:text-xs">
                <thead>
                  <tr className="bg-canvas border-b border-line">
                    <th className="py-1.5 px-2 font-semibold">Size</th>
                    <th className="py-1.5 px-2 border-l border-line">S</th>
                    <th className="py-1.5 px-2 border-l border-line">M</th>
                    <th className="py-1.5 px-2 border-l border-line">L</th>
                    <th className="py-1.5 px-2 border-l border-line">XL</th>
                    <th className="py-1.5 px-2 border-l border-line">XXL</th>
                    <th className="py-1.5 px-2 border-l border-line font-bold bg-primary/10 text-primary">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-2 font-semibold bg-canvas/40">Jumlah</td>
                    <td className="py-2 px-2 border-l border-line">{sizes.S || 0}</td>
                    <td className="py-2 px-2 border-l border-line">{sizes.M || 0}</td>
                    <td className="py-2 px-2 border-l border-line">{sizes.L || 0}</td>
                    <td className="py-2 px-2 border-l border-line">{sizes.XL || 0}</td>
                    <td className="py-2 px-2 border-l border-line">{sizes.XXL || 0}</td>
                    <td className="py-2 px-2 border-l border-line font-bold bg-primary/10 text-primary">{totalQty} pcs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Catatan Pengerjaan & Tanda Persetujuan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 pt-1">
            <div className="bg-canvas/50 p-3 rounded-lg border border-line text-xs">
              <span className="text-[10px] font-bold text-muted block mb-0.5">Catatan Pengerjaan:</span>
              <p className="text-ink/80 leading-relaxed text-[11px] sm:text-xs">
                {ws.notes || 'Pola dan potongan standar distro Warunk Media. Label woven di bagian dalam kerah leher.'}
              </p>
            </div>
            <div className="flex items-center gap-2.5 bg-brand-green/10 border border-brand-green/30 p-3 rounded-lg text-brand-green">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold block text-[#14532D]">Disetujui Client</span>
                <span className="text-[10px] text-[#14532D]/80">Lembar kerja dikonfirmasi dan siap diproduksi.</span>
              </div>
            </div>
          </div>

          {/* Tanda Tangan */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-line text-[11px] sm:text-xs text-center">
            <div>
              <p className="text-muted mb-8 sm:mb-10">Customer Pemesan,</p>
              <p className="font-bold underline text-ink">{order.customerName || order.customer_name}</p>
            </div>
            <div>
              <p className="text-muted mb-8 sm:mb-10">Warunk Media (Produksi),</p>
              <p className="font-bold underline text-ink">PT Warunk Media Grup</p>
            </div>
          </div>

          {/* Tombol Tutup di Bagian Bawah Dokumen (Memudahkan Pengguna Mobile) */}
          <div className="pt-3 border-t border-line flex items-center justify-end no-print">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 bg-secondary hover:bg-black text-white rounded-control text-xs font-semibold transition-colors shadow-xs"
            >
              Tutup Lembar Kerja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

