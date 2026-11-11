import { useState } from 'react';
import { X, Printer, CheckCircle, FileText, Edit3, Save, XCircle, Plus, Trash2 } from 'lucide-react';

export default function WorksheetModal({ order, onClose, isAdmin = false, onSave }) {
  const ws = order?.worksheet || {};
  const hasCustomSpecs = !!(ws.customSpecs && ws.customSpecs.length > 0);

  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState({
    itemType: ws.itemType || order?.productName || '',
    fabric: ws.fabric || '',
    printType: ws.printType || ws.print_type || '',
    notes: ws.notes || '',
    sizes: { S: 0, M: 0, L: 0, XL: 0, XXL: 0, ...ws.sizes },
    customSpecs: ws.customSpecs ? ws.customSpecs.map((s) => ({ ...s })) : [],
  });

  if (!order) return null;

  const sizes = editMode ? draft.sizes : (ws.sizes || {});
  const totalQty = Object.values(sizes).reduce((acc, curr) => acc + (Number(curr) || 0), 0) || order.quantity;

  const handlePrint = () => window.print();

  const handleCancel = () => {
    setDraft({
      itemType: ws.itemType || order?.productName || '',
      fabric: ws.fabric || '',
      printType: ws.printType || ws.print_type || '',
      notes: ws.notes || '',
      sizes: { S: 0, M: 0, L: 0, XL: 0, XXL: 0, ...ws.sizes },
      customSpecs: ws.customSpecs ? ws.customSpecs.map((s) => ({ ...s })) : [],
    });
    setEditMode(false);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...ws,
        itemType: draft.itemType,
        fabric: draft.fabric,
        printType: draft.printType,
        notes: draft.notes,
        sizes: draft.sizes,
        customSpecs: hasCustomSpecs ? draft.customSpecs : ws.customSpecs,
      });
    }
    setEditMode(false);
  };

  const updateSize = (key, value) => {
    setDraft((prev) => ({
      ...prev,
      sizes: { ...prev.sizes, [key]: Number(value) || 0 },
    }));
  };

  const updateSpec = (idx, field, value) => {
    setDraft((prev) => {
      const updated = [...prev.customSpecs];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, customSpecs: updated };
    });
  };

  const addSpec = () => {
    setDraft((prev) => ({
      ...prev,
      customSpecs: [...prev.customSpecs, { label: '', value: '' }],
    }));
  };

  const removeSpec = (idx) => {
    setDraft((prev) => ({
      ...prev,
      customSpecs: prev.customSpecs.filter((_, i) => i !== idx),
    }));
  };

  const inputCls = 'w-full px-2.5 py-1.5 bg-canvas border border-primary/40 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary text-ink';

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
            <FileText className="w-4 h-4 text-primary shrink-0" />
            <div className="min-w-0">
              <h3 className="font-heading font-bold text-sm text-ink truncate">
                {editMode ? 'Edit Worksheet' : `Worksheet #${order.id || order.order_code}`}
              </h3>
              {editMode && (
                <p className="text-[10px] text-primary font-semibold">Mode pengeditan aktif — klik Simpan untuk menyimpan</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Admin actions */}
            {isAdmin && !editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-xl text-xs font-bold text-primary transition-colors"
                title="Buka mode pengeditan worksheet"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Worksheet</span>
              </button>
            )}
            {isAdmin && editMode && (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-green hover:bg-brand-green/90 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
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

        {/* ── Konten Dokumen ── */}
        <div className="p-4 sm:p-6 md:p-8 space-y-5 bg-surface text-ink text-xs sm:text-sm">

          {/* Kop Dokumen */}
          <div className="flex items-start justify-between border-b-2 border-primary pb-4 gap-2">
            <div>
              <img src="/logo-warunkmedia.png" alt="Warunk Media" className="h-7 w-auto object-contain mb-1" />
              <p className="text-[10px] text-muted">PT Warunk Media Grup — Semarang</p>
              <p className="text-[10px] text-muted">WA: 0812-3456-7890</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">LEMBAR KERJA</span>
              <span className="font-mono text-sm font-bold text-ink">{order.id || order.order_code}</span>
              <span className="text-[10px] text-muted block mt-0.5">Tgl: {order.orderDate || order.order_date || 'N/A'}</span>
            </div>
          </div>

          {/* Informasi Pemesan */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-canvas/60 p-3 sm:p-4 rounded-xl border border-line">
            <div>
              <span className="text-muted block text-[10px]">Customer</span>
              <span className="font-semibold text-ink">{order.customerName || order.customer_name}</span>
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

          {/* Spesifikasi Produksi */}
          <div>
            <h4 className="font-heading font-bold text-[11px] uppercase tracking-wider text-muted mb-2.5 border-b border-line pb-1 flex items-center justify-between">
              <span>Spesifikasi Produksi</span>
              {editMode && <span className="text-primary font-semibold normal-case text-[10px]">Dapat diedit</span>}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Jenis Item */}
              <div className="border border-line rounded-xl p-3 bg-surface">
                <span className="text-[10px] text-muted block mb-1">Jenis Item</span>
                {editMode ? (
                  <input
                    type="text"
                    value={draft.itemType}
                    onChange={(e) => setDraft((p) => ({ ...p, itemType: e.target.value }))}
                    className={inputCls}
                    placeholder="Jenis item pesanan"
                  />
                ) : (
                  <span className="font-semibold text-ink">{ws.itemType || order.productName}</span>
                )}
              </div>

              {/* Bahan Kain */}
              <div className="border border-line rounded-xl p-3 bg-surface">
                <span className="text-[10px] text-muted block mb-1">Bahan Kain / Material</span>
                {editMode ? (
                  <input
                    type="text"
                    value={draft.fabric}
                    onChange={(e) => setDraft((p) => ({ ...p, fabric: e.target.value }))}
                    className={inputCls}
                    placeholder="Jenis bahan / material"
                  />
                ) : (
                  <span className="font-semibold text-ink">{ws.fabric || 'Cotton Combed 24s'}</span>
                )}
              </div>

              {/* Aplikasi Cetak */}
              <div className="border border-line rounded-xl p-3 bg-surface">
                <span className="text-[10px] text-muted block mb-1">Aplikasi Cetak / Teknik</span>
                {editMode ? (
                  <input
                    type="text"
                    value={draft.printType}
                    onChange={(e) => setDraft((p) => ({ ...p, printType: e.target.value }))}
                    className={inputCls}
                    placeholder="Jenis sablon / bordir / cetak"
                  />
                ) : (
                  <span className="font-semibold text-ink">{ws.printType || ws.print_type || 'Sablon Plastisol'}</span>
                )}
              </div>
            </div>
          </div>

          {/* Custom Specs (Merchandise) */}
          {hasCustomSpecs ? (
            <div>
              <h4 className="font-heading font-bold text-[11px] uppercase tracking-wider text-muted mb-2.5 border-b border-line pb-1 flex items-center justify-between">
                <span>Rincian & Spesifikasi Teknis Item</span>
                {editMode && (
                  <button
                    onClick={addSpec}
                    className="flex items-center gap-1 text-primary text-[10px] font-bold hover:underline"
                  >
                    <Plus className="w-3 h-3" />
                    Tambah Baris
                  </button>
                )}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(editMode ? draft.customSpecs : ws.customSpecs).map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 bg-canvas/60 rounded-xl border border-line text-xs flex items-center justify-between gap-2"
                  >
                    {editMode ? (
                      <>
                        <input
                          type="text"
                          value={spec.label}
                          onChange={(e) => updateSpec(sIdx, 'label', e.target.value)}
                          className="w-1/3 px-2 py-1 bg-surface border border-primary/30 rounded-lg text-[11px] focus:outline-none focus:ring-1 focus:ring-primary text-muted"
                          placeholder="Label"
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => updateSpec(sIdx, 'value', e.target.value)}
                          className="flex-1 px-2 py-1 bg-surface border border-primary/30 rounded-lg text-[11px] font-semibold focus:outline-none focus:ring-1 focus:ring-primary text-ink"
                          placeholder="Nilai"
                        />
                        <button
                          onClick={() => removeSpec(sIdx)}
                          className="p-1 hover:bg-red-50 rounded-lg text-red-500 shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-muted text-[11px]">{spec.label}:</span>
                        <span className="font-semibold text-ink text-right">{spec.value}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Size Chart (Apparel) */
            <div>
              <h4 className="font-heading font-bold text-[11px] uppercase tracking-wider text-muted mb-2.5 border-b border-line pb-1">
                Rincian Ukuran (Size Breakdown)
              </h4>
              <div className="overflow-x-auto border border-line rounded-xl">
                <table className="w-full text-center border-collapse text-xs">
                  <thead>
                    <tr className="bg-canvas border-b border-line">
                      <th className="py-2 px-3 font-semibold text-left">Size</th>
                      {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                        <th key={s} className="py-2 px-2 border-l border-line font-semibold">{s}</th>
                      ))}
                      <th className="py-2 px-3 border-l border-line font-bold bg-primary/8 text-primary">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold bg-canvas/40 text-left">Jumlah (pcs)</td>
                      {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                        <td key={s} className="py-2.5 px-2 border-l border-line">
                          {editMode ? (
                            <input
                              type="number"
                              min="0"
                              value={draft.sizes[s] || 0}
                              onChange={(e) => updateSize(s, e.target.value)}
                              className="w-14 mx-auto text-center px-1.5 py-1 bg-canvas border border-primary/40 rounded-lg text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          ) : (
                            <span className="font-semibold">{sizes[s] || 0}</span>
                          )}
                        </td>
                      ))}
                      <td className="py-2.5 px-3 border-l border-line font-bold bg-primary/8 text-primary">{totalQty} pcs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Catatan Pengerjaan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-canvas/50 p-3 rounded-xl border border-line">
              <span className="text-[10px] font-bold text-muted block mb-1.5">Catatan Pengerjaan:</span>
              {editMode ? (
                <textarea
                  rows={3}
                  value={draft.notes}
                  onChange={(e) => setDraft((p) => ({ ...p, notes: e.target.value }))}
                  className="w-full px-2.5 py-1.5 bg-surface border border-primary/40 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary text-ink leading-relaxed"
                  placeholder="Catatan spesifik untuk tim produksi..."
                />
              ) : (
                <p className="text-ink/80 leading-relaxed text-xs">
                  {ws.notes || 'Pola dan potongan standar distro Warunk Media.'}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2.5 bg-brand-green/10 border border-brand-green/30 p-3 rounded-xl text-brand-green">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <div>
                <span className="text-xs font-bold block text-[#14532D]">Disetujui Client</span>
                <span className="text-[10px] text-[#14532D]/80">Lembar kerja dikonfirmasi dan siap diproduksi.</span>
              </div>
            </div>
          </div>

          {/* Tanda Tangan */}
          {!editMode && (
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-line text-xs text-center">
              <div>
                <p className="text-muted mb-8 sm:mb-10">Customer Pemesan,</p>
                <p className="font-bold underline text-ink">{order.customerName || order.customer_name}</p>
              </div>
              <div>
                <p className="text-muted mb-8 sm:mb-10">Warunk Media (Produksi),</p>
                <p className="font-bold underline text-ink">PT Warunk Media Grup</p>
              </div>
            </div>
          )}

          {/* Tombol Tutup / Simpan Bawah */}
          <div className="pt-3 border-t border-line flex items-center justify-end gap-2 no-print">
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
                  Simpan Worksheet
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2 bg-[#1F1F1F] hover:bg-black text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
              >
                Tutup Lembar Kerja
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
