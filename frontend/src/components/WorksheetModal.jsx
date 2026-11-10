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
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-surface rounded-card border border-line shadow-2xl overflow-hidden my-6">
        {/* Header Modal Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-canvas no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-bold text-base text-ink">
              Worksheet Order #{order.id || order.order_code}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-control text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Dokumen</span>
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

        {/* Isi Dokumen Worksheet (Siap Cetak) */}
        <div className="p-6 sm:p-8 space-y-6 bg-surface text-ink text-sm">
          {/* Kop Dokumen */}
          <div className="flex items-start justify-between border-b-2 border-primary pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <img src="/logo-warunkmedia.png" alt="Warunk Media" className="h-8 w-auto object-contain" />
              </div>
              <p className="text-xs text-muted">PT Warunk Media Grup — Konveksi & Percetakan Semarang</p>
              <p className="text-xs text-muted">Jl. Griya Prasetya Selatan VI No.183 · WA: 0812-3456-7890</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block">LEMBAR KERJA PRODUKSI</span>
              <span className="font-mono text-lg font-bold text-ink">{order.id || order.order_code}</span>
              <span className="text-xs text-muted block mt-0.5">Tanggal: {order.orderDate || order.order_date || 'N/A'}</span>
            </div>
          </div>

          {/* Informasi Pemesan */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-canvas/60 p-4 rounded-xl border border-line">
            <div>
              <span className="text-xs text-muted block">Nama Customer</span>
              <span className="font-semibold text-ink">{order.customerName || order.customer_name}</span>
            </div>
            <div>
              <span className="text-xs text-muted block">Kontak / WhatsApp</span>
              <span className="font-semibold text-ink">{order.customerPhone || order.customer_phone || '-'}</span>
            </div>
            <div>
              <span className="text-xs text-muted block">Target Selesai (Deadline)</span>
              <span className="font-semibold text-primary">{order.deadline}</span>
            </div>
          </div>

          {/* Spesifikasi Kain & Sablon */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-muted mb-3 border-b border-line pb-1">
              Spesifikasi Produksi
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="border border-line rounded-lg p-3">
                <span className="text-xs text-muted block mb-1">Jenis Item</span>
                <span className="font-semibold text-ink">{ws.itemType || ws.item_type || order.productName}</span>
              </div>
              <div className="border border-line rounded-lg p-3">
                <span className="text-xs text-muted block mb-1">Bahan Kain</span>
                <span className="font-semibold text-ink">{ws.fabric || 'Cotton Combed 24s'}</span>
              </div>
              <div className="border border-line rounded-lg p-3">
                <span className="text-xs text-muted block mb-1">Aplikasi Cetak</span>
                <span className="font-semibold text-ink">{ws.printType || ws.print_type || 'Sablon Plastisol'}</span>
              </div>
            </div>
          </div>

          {/* Rincian Ukuran / Size Chart Breakdown */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-muted mb-3 border-b border-line pb-1">
              Rincian Ukuran (Size Breakdown)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse border border-line text-xs">
                <thead>
                  <tr className="bg-canvas">
                    <th className="border border-line py-2 px-3">Size</th>
                    <th className="border border-line py-2 px-3">S</th>
                    <th className="border border-line py-2 px-3">M</th>
                    <th className="border border-line py-2 px-3">L</th>
                    <th className="border border-line py-2 px-3">XL</th>
                    <th className="border border-line py-2 px-3">XXL</th>
                    <th className="border border-line py-2 px-3 font-bold bg-primary/10 text-primary">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-line py-2 px-3 font-semibold bg-canvas/30">Jumlah (pcs)</td>
                    <td className="border border-line py-2 px-3">{sizes.S || 0}</td>
                    <td className="border border-line py-2 px-3">{sizes.M || 0}</td>
                    <td className="border border-line py-2 px-3">{sizes.L || 0}</td>
                    <td className="border border-line py-2 px-3">{sizes.XL || 0}</td>
                    <td className="border border-line py-2 px-3">{sizes.XXL || 0}</td>
                    <td className="border border-line py-2 px-3 font-bold bg-primary/10 text-primary">{totalQty} pcs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Catatan Pengerjaan & Tanda Persetujuan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-canvas/50 p-3.5 rounded-lg border border-line">
              <span className="text-xs font-bold text-muted block mb-1">Catatan Pengerjaan:</span>
              <p className="text-xs text-ink/80 leading-relaxed">
                {ws.notes || 'Pola dan potongan standar distro Warunk Media. Label woven di bagian dalam kerah leher.'}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-brand-green/10 border border-brand-green/30 p-3.5 rounded-lg text-brand-green">
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold block text-[#14532D]">Disetujui Client</span>
                <span className="text-[11px] text-[#14532D]/80">Lembar kerja telah dikonfirmasi dan siap/sedang diproduksi.</span>
              </div>
            </div>
          </div>

          {/* Tanda Tangan */}
          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-line text-xs text-center">
            <div>
              <p className="text-muted mb-12">Customer Pemesan,</p>
              <p className="font-bold underline text-ink">{order.customerName || order.customer_name}</p>
            </div>
            <div>
              <p className="text-muted mb-12">Warunk Media (Produksi),</p>
              <p className="font-bold underline text-ink">PT Warunk Media Grup</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

