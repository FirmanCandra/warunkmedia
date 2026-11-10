import React, { useState } from 'react';
import { 
  Plus, Users, Trash2, Camera, Upload, 
  X, FileText, Receipt
} from 'lucide-react';
import { PRODUCTION_STAGES, INITIAL_ORDERS } from '../data/mockData';
import WorksheetModal from '../components/WorksheetModal';
import InvoiceModal from '../components/InvoiceModal';

export default function AdminDashboard({ orders = INITIAL_ORDERS, onUpdateOrders }) {
  const [orderList, setOrderList] = useState(orders);
  const [selectedOrderForProgress, setSelectedOrderForProgress] = useState(null);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [selectedWorksheet, setSelectedWorksheet] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Form State untuk Update Progres
  const [stageId, setStageId] = useState('sablon_bordir');
  const [updateDate, setUpdateDate] = useState(() => new Date().toISOString().slice(0, 16));
  const [notes, setNotes] = useState('');
  const [photoPreviews, setPhotoPreviews] = useState([]);

  // Form State untuk Pesanan Baru
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    customerPhone: '',
    productName: '',
    category: 'Kaos & Polo',
    quantity: 30,
    deadline: '',
    notes: ''
  });

  // Handle Photo Select / Drag Simulation
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    setPhotoPreviews((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Simpan Update Progres
  const handleSaveProgress = (e) => {
    e.preventDefault();
    if (!selectedOrderForProgress) return;

    const stageObj = PRODUCTION_STAGES.find((s) => s.id === stageId);
    const stageName = stageObj ? stageObj.name : stageId;
    const stageIdx = PRODUCTION_STAGES.findIndex((s) => s.id === stageId);

    const updated = orderList.map((ord) => {
      if (ord.id === selectedOrderForProgress.id) {
        // Update status text
        const isCompleted = stageId === 'selesai';
        const newStatusText = isCompleted ? 'Selesai' : stageName;
        const newVariant = isCompleted ? 'completed' : 'progress';

        // Update timeline
        const newTimeline = ord.timeline.map((step, idx) => {
          if (step.stageId === stageId) {
            return {
              ...step,
              completed: isCompleted,
              current: !isCompleted,
              date: updateDate.replace('T', ' '),
              note: notes || step.note,
              photos: photoPreviews.length > 0 ? photoPreviews : step.photos,
            };
          } else if (idx < stageIdx) {
            return { ...step, completed: true, current: false };
          } else {
            return { ...step, completed: false, current: false };
          }
        });

        return {
          ...ord,
          currentStageIndex: stageIdx,
          statusText: newStatusText,
          statusVariant: newVariant,
          timeline: newTimeline,
        };
      }
      return ord;
    });

    setOrderList(updated);
    if (onUpdateOrders) onUpdateOrders(updated);
    setSelectedOrderForProgress(null);
    setPhotoPreviews([]);
    setNotes('');
  };

  // Simpan Pesanan Baru
  const handleCreateOrder = (e) => {
    e.preventDefault();
    const newCode = `WM-00${orderList.length + 10}`;
    const created = {
      id: newCode,
      customerName: newOrder.customerName,
      customerPhone: newOrder.customerPhone,
      productName: newOrder.productName,
      category: newOrder.category,
      quantity: Number(newOrder.quantity) || 1,
      orderDate: new Date().toISOString().slice(0, 10),
      deadline: newOrder.deadline || '2026-12-01',
      currentStageIndex: 0,
      statusText: 'Desain/mockup',
      statusVariant: 'waiting',
      thumbnail: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
      timeline: PRODUCTION_STAGES.map((stg, idx) => ({
        stageId: stg.id,
        stageName: stg.name,
        date: idx === 0 ? new Date().toISOString().slice(0, 10) : null,
        note: idx === 0 ? 'Pesanan baru terdaftar di sistem.' : '',
        photos: [],
        completed: false,
        current: idx === 0,
      })),
      worksheet: {
        orderNumber: newCode,
        clientName: newOrder.customerName,
        contact: newOrder.customerPhone,
        itemType: newOrder.productName,
        fabric: 'Standard Distro Fabric',
        printType: 'Sablon / Bordir Standard',
        sizes: { S: 5, M: 10, L: 10, XL: 5 },
        notes: newOrder.notes,
        deadline: newOrder.deadline,
      },
      invoice: {
        invoiceNumber: `INV/2026/WM/${orderList.length + 10}`,
        date: new Date().toISOString().slice(0, 10),
        items: [{ name: newOrder.productName, qty: newOrder.quantity, price: 65000, total: newOrder.quantity * 65000 }],
        total: newOrder.quantity * 65000,
        downPayment: (newOrder.quantity * 65000) / 2,
        balance: (newOrder.quantity * 65000) / 2,
        status: 'DP 50% Diterima',
        paymentNote: 'Pelunasan sisa tagihan saat pesanan selesai.',
      },
    };

    const nextList = [created, ...orderList];
    setOrderList(nextList);
    if (onUpdateOrders) onUpdateOrders(nextList);
    setShowNewOrderModal(false);
    setNewOrder({
      customerName: '',
      customerPhone: '',
      productName: '',
      category: 'Kaos & Polo',
      quantity: 30,
      deadline: '',
      notes: ''
    });
  };

  // Hapus Pesanan
  const handleDeleteOrder = (id) => {
    if (window.confirm(`Yakin ingin menghapus pesanan ${id}? Tindakan ini tidak dapat dibatalkan.`)) {
      const nextList = orderList.filter((o) => o.id !== id);
      setOrderList(nextList);
      if (onUpdateOrders) onUpdateOrders(nextList);
    }
  };

  return (
    <div className="max-w-[1120px] mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Header Admin (Wireframe Hal 4) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink">
            Admin: Kelola Pesanan & Progres
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-0.5">
            Kelola pesanan konveksi, update tahapan produksi dengan foto bukti, dan cek worksheet order.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewOrderModal(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-control text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ Pesanan Baru</span>
          </button>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 bg-surface hover:bg-canvas text-ink border border-line rounded-control text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Users className="w-4 h-4 text-primary" />
            <span>Participant/Customer</span>
          </a>
        </div>
      </div>

      {/* Tabel Pesanan (Desktop) & Kartu Pesanan (Mobile) */}
      <div className="bg-surface rounded-card border border-line overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-canvas border-b border-line text-muted uppercase font-semibold">
                <th className="py-3 px-4">Kode</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Produk & Qty</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {orderList.map((ord) => (
                <tr key={ord.id} className="hover:bg-canvas/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-primary">
                    {ord.id}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-ink">
                    <div>{ord.customerName}</div>
                    <div className="text-[11px] text-muted font-normal">{ord.customerPhone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-ink">{ord.productName}</div>
                    <div className="text-[11px] text-muted">{ord.quantity} pcs · {ord.category}</div>
                  </td>
                  <td className="py-3.5 px-4 text-ink font-medium">
                    {ord.deadline}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        ord.statusVariant === 'completed'
                          ? 'bg-[#DDF3E1] text-[#14532D] border-brand-green/30'
                          : ord.statusVariant === 'progress'
                          ? 'bg-[#FDF0C4] text-[#5B4300] border-[#F5B400]/40'
                          : 'bg-[#ECEAE6] text-[#5F5B55] border-line'
                      }`}
                    >
                      {ord.statusText}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedOrderForProgress(ord);
                          setStageId(PRODUCTION_STAGES[ord.currentStageIndex]?.id || 'sablon_bordir');
                          setNotes('');
                          setPhotoPreviews([]);
                        }}
                        className="px-2.5 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-md text-[11px] font-semibold flex items-center gap-1 transition-colors"
                        title="Update Tahap & Bukti Foto"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Update</span>
                      </button>
                      <button
                        onClick={() => setSelectedWorksheet(ord)}
                        className="p-1.5 hover:bg-canvas border border-line rounded-md text-muted hover:text-ink transition-colors"
                        title="Worksheet"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedInvoice(ord)}
                        className="p-1.5 hover:bg-canvas border border-line rounded-md text-muted hover:text-ink transition-colors"
                        title="Invoice"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(ord.id)}
                        className="p-1.5 hover:bg-red-50 border border-line hover:border-red-300 rounded-md text-red-600 transition-colors"
                        title="Hapus Pesanan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form: Update Progres & Unggah Foto (Wireframe Hal 4) */}
      {selectedOrderForProgress && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl bg-surface rounded-card border border-line shadow-2xl p-6 sm:p-8 my-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-line">
              <div>
                <h3 className="font-heading font-bold text-lg text-ink">
                  Update Progres: {selectedOrderForProgress.id}
                </h3>
                <p className="text-xs text-muted">
                  {selectedOrderForProgress.productName} — {selectedOrderForProgress.customerName}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrderForProgress(null)}
                className="p-1.5 hover:bg-canvas rounded-control text-muted hover:text-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProgress} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-ink block mb-1">Pilih Tahapan Produksi</label>
                  <select
                    value={stageId}
                    onChange={(e) => setStageId(e.target.value)}
                    className="w-full px-3 py-2 bg-canvas border border-line rounded-control text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {PRODUCTION_STAGES.map((stg) => (
                      <option key={stg.id} value={stg.id}>
                        {stg.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-ink block mb-1">Tanggal & Waktu Update</label>
                  <input
                    type="datetime-local"
                    value={updateDate}
                    onChange={(e) => setUpdateDate(e.target.value)}
                    className="w-full px-3 py-2 bg-canvas border border-line rounded-control text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-ink block mb-1">Catatan untuk Customer</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tuliskan keterangan detail pengerjaan tahap ini, misal: Sablon depan selesai, lanjut punggung belakang."
                  className="w-full px-3 py-2 bg-canvas border border-line rounded-control text-xs focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
                />
              </div>

              {/* Area Unggah Foto Bukti */}
              <div>
                <label className="font-semibold text-ink block mb-1">
                  Unggah Foto Bukti Produksi (Bisa lebih dari satu)
                </label>
                <label className="border-2 border-dashed border-line hover:border-primary rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-canvas/50 transition-colors">
                  <Upload className="w-6 h-6 text-primary mb-1" />
                  <span className="font-semibold text-ink">Klik untuk pilih foto pengerjaan</span>
                  <span className="text-[11px] text-muted">Format JPG atau PNG (Maks 5MB per file)</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>

                {/* Preview Foto */}
                {photoPreviews.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {photoPreviews.map((src, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-line group">
                        <img src={src} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute top-0.5 right-0.5 bg-black/70 hover:bg-black text-white p-0.5 rounded-full"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForProgress(null)}
                  className="px-4 py-2 bg-canvas hover:bg-line text-ink rounded-control text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-control text-xs font-semibold shadow-xs"
                >
                  Simpan Progres
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Form: + Pesanan Baru */}
      {showNewOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg bg-surface rounded-card border border-line shadow-2xl p-6 sm:p-8 my-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-line">
              <h3 className="font-heading font-bold text-lg text-ink">
                + Tambah Pesanan Konveksi Baru
              </h3>
              <button
                onClick={() => setShowNewOrderModal(false)}
                className="p-1.5 hover:bg-canvas rounded-control text-muted hover:text-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-ink block mb-1">Nama Customer</label>
                <input
                  type="text"
                  required
                  value={newOrder.customerName}
                  onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                  placeholder="Misal: Firman Candra"
                  className="w-full px-3 py-2 bg-canvas border border-line rounded-control text-xs focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-semibold text-ink block mb-1">Nomor WhatsApp Customer</label>
                <input
                  type="text"
                  value={newOrder.customerPhone}
                  onChange={(e) => setNewOrder({ ...newOrder, customerPhone: e.target.value })}
                  placeholder="Misal: 0812-3456-7890"
                  className="w-full px-3 py-2 bg-canvas border border-line rounded-control text-xs focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-ink block mb-1">Nama Pesanan</label>
                  <input
                    type="text"
                    required
                    value={newOrder.productName}
                    onChange={(e) => setNewOrder({ ...newOrder, productName: e.target.value })}
                    placeholder="Misal: Kaos Reuni Angkatan 2026"
                    className="w-full px-3 py-2 bg-canvas border border-line rounded-control text-xs focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="font-semibold text-ink block mb-1">Kategori</label>
                  <select
                    value={newOrder.category}
                    onChange={(e) => setNewOrder({ ...newOrder, category: e.target.value })}
                    className="w-full px-3 py-2 bg-canvas border border-line rounded-control text-xs focus:ring-2 focus:ring-primary"
                  >
                    <option value="Kaos & Polo">Kaos & Polo</option>
                    <option value="Jaket & Hoodie">Jaket & Hoodie</option>
                    <option value="PDH / Kemeja">PDH / Kemeja</option>
                    <option value="Topi & Bucket">Topi & Bucket</option>
                    <option value="Merchandise">Merchandise</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-ink block mb-1">Jumlah (Pcs)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newOrder.quantity}
                    onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                    className="w-full px-3 py-2 bg-canvas border border-line rounded-control text-xs focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="font-semibold text-ink block mb-1">Target Deadline Selesai</label>
                  <input
                    type="date"
                    required
                    value={newOrder.deadline}
                    onChange={(e) => setNewOrder({ ...newOrder, deadline: e.target.value })}
                    className="w-full px-3 py-2 bg-canvas border border-line rounded-control text-xs focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-ink block mb-1">Catatan Khusus</label>
                <textarea
                  rows={2}
                  value={newOrder.notes}
                  onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                  placeholder="Catatan bahan, sablon, atau permintaan khusus dari customer"
                  className="w-full px-3 py-2 bg-canvas border border-line rounded-control text-xs focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={() => setShowNewOrderModal(false)}
                  className="px-4 py-2 bg-canvas hover:bg-line text-ink rounded-control text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-control text-xs font-semibold shadow-xs"
                >
                  Buat Pesanan & Buatkan Kode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Worksheet */}
      {selectedWorksheet && (
        <WorksheetModal order={selectedWorksheet} onClose={() => setSelectedWorksheet(null)} />
      )}

      {/* Modal Invoice */}
      {selectedInvoice && (
        <InvoiceModal order={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      )}
    </div>
  );
}
