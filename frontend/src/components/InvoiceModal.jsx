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
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-surface rounded-card border border-line shadow-2xl overflow-hidden my-6">
        {/* Header Modal Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-canvas no-print">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-bold text-base text-ink">
              Invoice #{inv.invoiceNumber || inv.invoice_number || `INV-${order.id}`}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-control text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-line/60 text-muted hover:text-ink rounded-control transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lembar Invoice */}
        <div className="p-6 sm:p-8 space-y-6 bg-surface text-ink text-sm">
          {/* Header Kop */}
          <div className="flex items-start justify-between border-b-2 border-primary pb-4">
            <div>
              <img src="/logo-warunkmedia.png" alt="Warunk Media" className="h-8 w-auto object-contain mb-1" />
              <p className="text-xs text-muted">PT Warunk Media Grup</p>
              <p className="text-xs text-muted">Jl. Griya Prasetya Selatan VI No.183, Semarang</p>
              <p className="text-xs text-muted">WhatsApp: 0812-3456-7890</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-heading font-black text-primary block tracking-wider">INVOICE</span>
              <span className="font-mono text-xs font-semibold text-ink block mt-1">
                {inv.invoiceNumber || inv.invoice_number || 'INV-001'}
              </span>
              <span className="text-xs text-muted block mt-0.5">
                Tanggal: {inv.date || inv.invoice_date || order.orderDate || '2026-11-01'}
              </span>
            </div>
          </div>

          {/* Kepada Customer */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 bg-canvas/60 p-4 rounded-xl border border-line">
            <div>
              <span className="text-xs text-muted block uppercase tracking-wider font-semibold">Ditujukan Kepada:</span>
              <p className="font-bold text-ink mt-0.5">{order.customerName || order.customer_name}</p>
              <p className="text-xs text-muted">{order.customerPhone || order.customer_phone || '-'}</p>
            </div>
            <div className="sm:text-right">
              <span className="text-xs text-muted block uppercase tracking-wider font-semibold">Status Pembayaran:</span>
              <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold bg-[#DDF3E1] text-[#14532D] border border-brand-green/30">
                {inv.status || inv.payment_status || 'DP 50% Lunas'}
              </span>
            </div>
          </div>

          {/* Rincian Item */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-canvas border-y border-line">
                  <th className="py-2.5 px-3 font-semibold text-muted">Deskripsi Item</th>
                  <th className="py-2.5 px-3 text-center font-semibold text-muted">Qty</th>
                  <th className="py-2.5 px-3 text-right font-semibold text-muted">Harga Satuan</th>
                  <th className="py-2.5 px-3 text-right font-semibold text-muted">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-3 font-medium text-ink">{item.name}</td>
                    <td className="py-3 px-3 text-center">{item.qty} pcs</td>
                    <td className="py-3 px-3 text-right">{formatRupiah(item.price)}</td>
                    <td className="py-3 px-3 text-right font-semibold">{formatRupiah(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ringkasan Biaya */}
          <div className="flex flex-col sm:flex-row justify-between gap-6 pt-2 border-t border-line">
            <div className="flex-1 bg-canvas/40 p-3.5 rounded-lg border border-line text-xs space-y-1">
              <span className="font-bold text-ink block mb-1">Informasi Rekening Resmi:</span>
              <p className="text-muted">Bank BCA: <strong>803-0123-456</strong></p>
              <p className="text-muted">A/N: <strong>PT Warunk Media Grup</strong></p>
              <p className="text-[11px] text-muted italic mt-2">
                * {inv.paymentNote || inv.payment_note || 'Pelunasan sisa tagihan dilakukan saat pesanan selesai sebelum diambil atau dikirim.'}
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between py-1 text-muted">
                <span>Total Tagihan:</span>
                <span className="font-semibold text-ink">{formatRupiah(total)}</span>
              </div>
              <div className="flex justify-between py-1 text-muted">
                <span>Uang Muka (DP):</span>
                <span className="font-semibold text-brand-green">- {formatRupiah(downPayment)}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-line text-sm font-bold text-ink">
                <span>Sisa Pembayaran:</span>
                <span className={balance > 0 ? 'text-primary' : 'text-brand-green'}>
                  {formatRupiah(balance)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Invoice */}
          <div className="pt-4 text-center text-xs text-muted border-t border-line">
            <p>Terima kasih atas kepercayaan Anda bermitra dengan Warunk Media.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
