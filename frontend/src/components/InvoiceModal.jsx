import { useState } from 'react';
import { X, Printer, Receipt, Edit3, Save, XCircle, Plus, Trash2 } from 'lucide-react';

export default function InvoiceModal({ order, onClose, isAdmin = false, onSave }) {
  const inv = order?.invoice || {};

  const [editMode, setEditMode] = useState(false);
  const [draftItems, setDraftItems] = useState(() =>
    inv.items
      ? inv.items.map((i) => ({ ...i }))
      : [{ name: order?.productName || '', qty: order?.quantity || 1, price: 65000, total: (order?.quantity || 1) * 65000 }]
  );
  const [draftDP, setDraftDP] = useState(() => inv.downPayment ?? inv.down_payment ?? 0);
  const [draftStatus, setDraftStatus] = useState(() => inv.status || inv.payment_status || 'DP 50% Diterima');
  const [draftPaymentNote, setDraftPaymentNote] = useState(() => inv.paymentNote || inv.payment_note || 'Pelunasan sisa tagihan dilakukan saat pesanan selesai.');

  if (!order) return null;

  const formatRupiah = (val) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val || 0);

  // ── View mode values ──────────────────────────────────────────────────────
  const viewItems = inv.items || [
    { name: order.productName, qty: order.quantity, price: 65000, total: order.quantity * 65000 },
  ];
  const viewTotal = inv.total || inv.total_amount || 0;
  const viewDP = inv.downPayment ?? inv.down_payment ?? 0;
  const viewBalance = inv.balance ?? viewTotal - viewDP;

  // ── Draft computed values ─────────────────────────────────────────────────
  const draftTotal = draftItems.reduce((acc, item) => acc + (Number(item.qty) || 0) * (Number(item.price) || 0), 0);
  const draftBalance = draftTotal - (Number(draftDP) || 0);

  const handlePrint = () => window.print();

  const handleCancel = () => {
    setDraftItems(inv.items ? inv.items.map((i) => ({ ...i })) : [
      { name: order.productName || '', qty: order.quantity || 1, price: 65000, total: (order.quantity || 1) * 65000 },
    ]);
    setDraftDP(inv.downPayment ?? inv.down_payment ?? 0);
    setDraftStatus(inv.status || 'DP 50% Diterima');
    setDraftPaymentNote(inv.paymentNote || 'Pelunasan sisa tagihan dilakukan saat pesanan selesai.');
    setEditMode(false);
  };

  const handleSave = () => {
    if (onSave) {
      const updatedItems = draftItems.map((item) => ({
        ...item,
        qty: Number(item.qty) || 0,
        price: Number(item.price) || 0,
        total: (Number(item.qty) || 0) * (Number(item.price) || 0),
      }));
      onSave({
        ...inv,
        items: updatedItems,
        total: draftTotal,
        downPayment: Number(draftDP) || 0,
        balance: draftBalance,
        status: draftStatus,
        paymentNote: draftPaymentNote,
      });
    }
    setEditMode(false);
  };

  const updateItem = (idx, field, value) => {
    setDraftItems((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      updated[idx].total = (Number(updated[idx].qty) || 0) * (Number(updated[idx].price) || 0);
      return updated;
    });
  };

  const addItem = () => {
    setDraftItems((prev) => [...prev, { name: '', qty: 1, price: 0, total: 0 }]);
  };

  const removeItem = (idx) => {
    setDraftItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const inputCls = 'w-full px-2 py-1.5 bg-canvas border border-primary/40 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary text-ink';

  const statusOptions = [
    'DP 50% Diterima',
    'DP 30% Diterima',
    'DP 70% Diterima',
    'Belum Ada Pembayaran',
    'Lunas',
  ];

  return (
    <div
      className="fixed inset-0 z-60 bg-black/75 overflow-y-auto backdrop-blur-xs flex justify-center p-0 sm:p-4"
      onClick={editMode ? undefined : onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-surface sm:rounded-2xl border-x-0 sm:border border-line shadow-2xl my-0 sm:my-8 flex flex-col min-h-screen sm:min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Sticky Header ── */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-line bg-surface/95 backdrop-blur-md shadow-xs no-print">
          <div className="flex items-center gap-2 min-w-0">
            <Receipt className="w-4 h-4 text-primary shrink-0" />
            <div className="min-w-0">
              <h3 className="font-heading font-bold text-sm text-ink truncate">
                {editMode ? 'Edit Invoice' : `Invoice #${inv.invoiceNumber || inv.invoice_number || `INV-${order.id}`}`}
              </h3>
              {editMode && (
                <p className="text-[10px] text-primary font-semibold">Mode pengeditan aktif — klik Simpan untuk menyimpan</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isAdmin && !editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-green/10 hover:bg-brand-green/20 border border-brand-green/30 rounded-xl text-xs font-bold text-brand-green transition-colors"
                title="Buka mode pengeditan invoice"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Invoice</span>
              </button>
            )}
            {isAdmin && editMode && (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-green hover:bg-brand-green/90 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-canvas hover:bg-line border border-line rounded-xl text-xs font-bold text-muted transition-colors"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Batal</span>
                </button>
              </>
            )}

            {!editMode && (
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors no-print"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Cetak</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 bg-canvas hover:bg-line text-ink rounded-full border border-line transition-colors"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Lembar Invoice ── */}
        <div className="p-4 sm:p-6 md:p-8 space-y-5 bg-surface text-ink text-xs sm:text-sm">

          {/* Kop Invoice */}
          <div className="flex items-start justify-between border-b-2 border-primary pb-4 gap-2">
            <div>
              <img src="/logo-warunkmedia.png" alt="Warunk Media" className="h-7 w-auto object-contain mb-1" />
              <p className="text-[10px] text-muted">PT Warunk Media Grup</p>
              <p className="text-[10px] text-muted">Semarang · WA: 0812-3456-7890</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-sm sm:text-xl font-heading font-black text-primary block tracking-wider">INVOICE</span>
              <span className="font-mono text-[11px] font-semibold text-ink block mt-0.5">
                {inv.invoiceNumber || inv.invoice_number || `INV-${order.id}`}
              </span>
              <span className="text-[10px] text-muted block mt-0.5">
                Tgl: {inv.date || inv.invoice_date || order.orderDate || 'N/A'}
              </span>
            </div>
          </div>

          {/* Kepada Customer + Status Pembayaran */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 bg-canvas/60 p-3 sm:p-4 rounded-xl border border-line">
            <div>
              <span className="text-[10px] text-muted block uppercase tracking-wider font-semibold mb-0.5">Ditujukan Kepada:</span>
              <p className="font-bold text-ink text-xs sm:text-sm">{order.customerName || order.customer_name}</p>
              <p className="text-muted text-xs">{order.customerPhone || order.customer_phone || '-'}</p>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] text-muted block uppercase tracking-wider font-semibold mb-0.5">Status Pembayaran:</span>
              {editMode ? (
                <select
                  value={draftStatus}
                  onChange={(e) => setDraftStatus(e.target.value)}
                  className="mt-1 px-3 py-1.5 bg-surface border border-primary/40 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary text-ink cursor-pointer"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              ) : (
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DDF3E1] text-[#14532D] border border-brand-green/30">
                  {inv.status || inv.payment_status || 'DP 50% Diterima'}
                </span>
              )}
            </div>
          </div>

          {/* Rincian Item */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-heading font-bold text-[11px] uppercase tracking-wider text-muted">
                Rincian Item Pesanan
              </h4>
              {editMode && (
                <button
                  onClick={addItem}
                  className="flex items-center gap-1 text-primary text-[10px] font-bold hover:underline"
                >
                  <Plus className="w-3 h-3" />
                  Tambah Baris
                </button>
              )}
            </div>

            <div className="overflow-x-auto border border-line rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-canvas border-b border-line">
                    <th className="py-2.5 px-3 font-semibold text-muted">Deskripsi Item</th>
                    <th className="py-2.5 px-2 text-center font-semibold text-muted">Qty</th>
                    <th className="py-2.5 px-2 text-right font-semibold text-muted">Harga/Pcs</th>
                    <th className="py-2.5 px-2 text-right font-semibold text-muted">Subtotal</th>
                    {editMode && <th className="py-2.5 px-2 w-8" />}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {(editMode ? draftItems : viewItems).map((item, idx) => (
                    <tr key={idx} className={editMode ? 'bg-canvas/30' : ''}>
                      <td className="py-2.5 px-3 font-medium text-ink">
                        {editMode ? (
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateItem(idx, 'name', e.target.value)}
                            className={inputCls}
                            placeholder="Nama item / deskripsi"
                          />
                        ) : item.name}
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        {editMode ? (
                          <input
                            type="number"
                            min="0"
                            value={item.qty}
                            onChange={(e) => updateItem(idx, 'qty', e.target.value)}
                            className="w-16 text-center px-1.5 py-1.5 bg-canvas border border-primary/40 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        ) : `${item.qty} pcs`}
                      </td>
                      <td className="py-2.5 px-2 text-right">
                        {editMode ? (
                          <input
                            type="number"
                            min="0"
                            value={item.price}
                            onChange={(e) => updateItem(idx, 'price', e.target.value)}
                            className="w-28 text-right px-2 py-1.5 bg-canvas border border-primary/40 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        ) : formatRupiah(item.price)}
                      </td>
                      <td className="py-2.5 px-2 text-right font-bold">
                        {formatRupiah(editMode ? (Number(item.qty) || 0) * (Number(item.price) || 0) : item.total)}
                      </td>
                      {editMode && (
                        <td className="py-2.5 px-2 text-center">
                          {draftItems.length > 1 && (
                            <button
                              onClick={() => removeItem(idx)}
                              className="p-1 hover:bg-red-50 rounded-lg text-red-500"
                              title="Hapus baris"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ringkasan Biaya */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-2 border-t border-line">
            {/* Rekening & Catatan */}
            <div className="flex-1 bg-canvas/40 p-3 rounded-xl border border-line space-y-1.5">
              <span className="font-bold text-ink block mb-0.5 text-xs">Rekening Pembayaran:</span>
              <p className="text-muted text-xs">Bank BCA: <strong>803-0123-456</strong></p>
              <p className="text-muted text-xs">A/N: <strong>PT Warunk Media Grup</strong></p>
              {editMode ? (
                <textarea
                  rows={2}
                  value={draftPaymentNote}
                  onChange={(e) => setDraftPaymentNote(e.target.value)}
                  className="w-full mt-1 px-2.5 py-1.5 bg-surface border border-primary/40 rounded-lg text-[11px] italic text-muted focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Catatan pembayaran..."
                />
              ) : (
                <p className="text-[11px] text-muted italic mt-1">
                  * {inv.paymentNote || inv.payment_note || 'Pelunasan sisa tagihan dilakukan saat pesanan selesai.'}
                </p>
              )}
            </div>

            {/* Summary Totals */}
            <div className="w-full sm:w-64 space-y-2">
              <div className="flex justify-between py-0.5 text-muted text-xs">
                <span>Total Tagihan:</span>
                <span className="font-bold text-ink">{formatRupiah(editMode ? draftTotal : viewTotal)}</span>
              </div>
              <div className="flex justify-between py-0.5 text-muted text-xs items-center gap-2">
                <span>Uang Muka (DP):</span>
                {editMode ? (
                  <input
                    type="number"
                    min="0"
                    value={draftDP}
                    onChange={(e) => setDraftDP(e.target.value)}
                    className="w-32 text-right px-2 py-1 bg-canvas border border-primary/40 rounded-lg text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary text-brand-green"
                  />
                ) : (
                  <span className="font-semibold text-brand-green">- {formatRupiah(viewDP)}</span>
                )}
              </div>
              <div className="flex justify-between py-2 border-t border-line font-bold text-sm items-center">
                <span className="text-xs">Sisa Pembayaran:</span>
                <span className={`font-black ${(editMode ? draftBalance : viewBalance) > 0 ? 'text-primary' : 'text-brand-green'}`}>
                  {formatRupiah(editMode ? draftBalance : viewBalance)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          {!editMode && (
            <div className="pt-3 text-center text-[10px] text-muted border-t border-line">
              <p>Terima kasih atas kepercayaan Anda bermitra dengan Warunk Media.</p>
            </div>
          )}

          {/* Tombol Bawah */}
          <div className="pt-2 border-t border-line flex items-center justify-end gap-2 no-print">
            {editMode ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-canvas hover:bg-line border border-line text-ink rounded-xl text-xs font-bold transition-colors"
                >
                  Batal Edit
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-2 bg-brand-green hover:bg-brand-green/90 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  Simpan Invoice
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2 bg-[#1F1F1F] hover:bg-black text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
              >
                Tutup Invoice
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
