import React from 'react';
import { X, Printer, Receipt } from 'lucide-react';

export default function InvoiceModal({ order, onClose }) {
  if (!order) return null;

  const inv = order.invoice || {};
  const items = inv.items || [
    { name: order.productName, qty: order.quantity, price: 65000, total: order.quantity * 65000 }
  ];

  const total = inv.total || inv.total_amount || 0;
  const downPayment = inv.downPayment || inv.down_payment || 0;
  const balance = inv.balance ?? (total - downPayment);

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  };

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
            <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
            <h3 className="font-heading font-bold text-xs sm:text-sm md:text-base text-ink truncate">
              Invoice #{inv.invoiceNumber || inv.invoice_number || `INV-${order.id}`}
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

        {/* Lembar Invoice */}
        <div className="p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6 bg-surface text-ink text-xs sm:text-sm">
          {/* Header Kop */}
          <div className="flex items-start justify-between border-b-2 border-primary pb-3 sm:pb-4 gap-2">
            <div>
              <img src="/logo-warunkmedia.png" alt="Warunk Media" className="h-6 sm:h-8 w-auto object-contain mb-1" />
              <p className="text-[10px] sm:text-xs text-muted">PT Warunk Media Grup</p>
              <p className="text-[10px] sm:text-xs text-muted">Semarang · WA: 0812-3456-7890</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-sm sm:text-xl font-heading font-black text-primary block tracking-wider">INVOICE</span>
              <span className="font-mono text-[11px] sm:text-xs font-semibold text-ink block mt-0.5">
                {inv.invoiceNumber || inv.invoice_number || 'INV-001'}
              </span>
              <span className="text-[10px] sm:text-xs text-muted block mt-0.5">
                Tgl: {inv.date || inv.invoice_date || order.orderDate || '2026-11-01'}
              </span>
            </div>
          </div>

          {/* Kepada Customer */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 bg-canvas/60 p-3 sm:p-4 rounded-xl border border-line text-[11px] sm:text-xs">
            <div>
              <span className="text-[10px] sm:text-xs text-muted block uppercase tracking-wider font-semibold">Ditujukan Kepada:</span>
              <p className="font-bold text-ink mt-0.5 text-xs sm:text-sm">{order.customerName || order.customer_name}</p>
              <p className="text-muted">{order.customerPhone || order.customer_phone || '-'}</p>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] sm:text-xs text-muted block uppercase tracking-wider font-semibold">Status Pembayaran:</span>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DDF3E1] text-[#14532D] border border-brand-green/30">
                {inv.status || inv.payment_status || 'DP 50% Lunas'}
              </span>
            </div>
          </div>

          {/* Rincian Item */}
          <div className="overflow-x-auto no-scrollbar border border-line rounded-lg">
            <table className="w-full text-left border-collapse text-[11px] sm:text-xs">
              <thead>
                <tr className="bg-canvas border-b border-line">
                  <th className="py-2 px-2.5 sm:px-3 font-semibold text-muted">Deskripsi Item</th>
                  <th className="py-2 px-2 sm:px-3 text-center font-semibold text-muted">Qty</th>
                  <th className="py-2 px-2 sm:px-3 text-right font-semibold text-muted">Harga</th>
                  <th className="py-2 px-2 sm:px-3 text-right font-semibold text-muted">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2 sm:py-2.5 px-2.5 sm:px-3 font-medium text-ink">{item.name}</td>
                    <td className="py-2 sm:py-2.5 px-2 sm:px-3 text-center">{item.qty} pcs</td>
                    <td className="py-2 sm:py-2.5 px-2 sm:px-3 text-right">{formatRupiah(item.price)}</td>
                    <td className="py-2 sm:py-2.5 px-2 sm:px-3 text-right font-semibold">{formatRupiah(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ringkasan Biaya */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-2 border-t border-line text-[11px] sm:text-xs">
            <div className="flex-1 bg-canvas/40 p-3 sm:p-3.5 rounded-lg border border-line space-y-1">
              <span className="font-bold text-ink block mb-0.5">Informasi Rekening Resmi:</span>
              <p className="text-muted">Bank BCA: <strong>803-0123-456</strong></p>
              <p className="text-muted">A/N: <strong>PT Warunk Media Grup</strong></p>
              <p className="text-[10px] sm:text-[11px] text-muted italic mt-1.5">
                * {inv.paymentNote || inv.payment_note || 'Pelunasan sisa tagihan dilakukan saat pesanan selesai.'}
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-1.5">
              <div className="flex justify-between py-0.5 text-muted">
                <span>Total Tagihan:</span>
                <span className="font-semibold text-ink">{formatRupiah(total)}</span>
              </div>
              <div className="flex justify-between py-0.5 text-muted">
                <span>Uang Muka (DP):</span>
                <span className="font-semibold text-brand-green">- {formatRupiah(downPayment)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-t border-line text-xs sm:text-sm font-bold text-ink">
                <span>Sisa Pembayaran:</span>
                <span className={balance > 0 ? 'text-primary' : 'text-brand-green'}>
                  {formatRupiah(balance)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Invoice */}
          <div className="pt-3 text-center text-[10px] sm:text-xs text-muted border-t border-line">
            <p>Terima kasih atas kepercayaan Anda bermitra dengan Warunk Media.</p>
          </div>

          {/* Tombol Tutup di Bawah Dokumen */}
          <div className="pt-2 border-t border-line flex items-center justify-end no-print">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 bg-secondary hover:bg-black text-white rounded-control text-xs font-semibold transition-colors shadow-xs"
            >
              Tutup Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
