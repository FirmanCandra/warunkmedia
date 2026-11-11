import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plus, Users, Trash2, Camera, Upload, 
  X, FileText, Receipt, Package, MessageSquare, Mail, Phone,
  Search, CheckCircle2, Clock, Calendar, Check
} from 'lucide-react';
import { 
  PRODUCTION_STAGES, INITIAL_ORDERS, INITIAL_CUSTOMERS, 
  getWorkflowForCategory 
} from '../data/mockData';
import WorksheetModal from '../components/WorksheetModal';
import InvoiceModal from '../components/InvoiceModal';
import { useAdmin } from '../context/adminContextDef';

// ─── Executive KPI Card Component (Anti-Collision, Mobile-First) ──────────────
function KpiCard({ label, value, compactValue, sub, icon: Icon, iconBg, accent }) {
  return (
    <div className="bg-surface border border-line rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between shadow-2xs transition-shadow hover:shadow-xs min-w-0">
      {/* Top Row: Label & Icon placed side by side */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="block text-[10px] font-extrabold uppercase tracking-wider text-muted truncate">
          {label}
        </span>
        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Bottom Row: Large Value taking 100% card width, never colliding */}
      <div className="min-w-0">
        <span
          className={`block text-lg sm:text-2xl font-black leading-tight truncate ${accent || 'text-ink'}`}
          title={value}
        >
          {compactValue ? (
            <>
              <span className="sm:hidden">{compactValue}</span>
              <span className="hidden sm:inline">{value}</span>
            </>
          ) : (
            value
          )}
        </span>
        {sub && (
          <span className="block text-[10px] sm:text-xs text-muted mt-1 font-medium truncate">
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard({ orders = INITIAL_ORDERS, onUpdateOrders }) {
  const {
    activeTab,
    selectedDivision,
    setSelectedDivision,
    showNewOrderModal,
    setShowNewOrderModal,
    showNewCustomerModal,
    setShowNewCustomerModal,
    setCounts,
  } = useAdmin();

  const [customerList, setCustomerList] = useState(INITIAL_CUSTOMERS);

  // Modals state
  const [selectedOrderForProgress, setSelectedOrderForProgress] = useState(null);
  const [selectedWorksheet, setSelectedWorksheet] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Local Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(''); // '' | 'progress' | 'completed' | 'waiting'
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');

  // Form State untuk Update Progres
  const [stageId, setStageId] = useState('desain');
  const [updateDate, setUpdateDate] = useState(() => new Date().toISOString().slice(0, 16));
  const [notes, setNotes] = useState('');
  const [photoPreviews, setPhotoPreviews] = useState([]);

  // Form State untuk Customer Baru
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
  });

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

  // ─── KPI Calculations ───────────────────────────────────────────────────────
  const totalOrdersCount = orders.length;
  const inProgressOrdersCount = useMemo(
    () => orders.filter((o) => o.statusVariant !== 'completed').length,
    [orders]
  );
  const completedOrdersCount = useMemo(
    () => orders.filter((o) => o.statusVariant === 'completed').length,
    [orders]
  );
  const totalProductionValue = useMemo(() => {
    return orders.reduce((acc, ord) => {
      const val = ord.invoice?.total || (ord.quantity * 45000);
      return acc + val;
    }, 0);
  }, [orders]);

  // Sync badge counts back to sidebar
  useEffect(() => {
    setCounts({
      totalOrders: totalOrdersCount,
      inProgress: inProgressOrdersCount,
      completed: completedOrdersCount,
      customers: customerList.length,
    });
  }, [totalOrdersCount, inProgressOrdersCount, completedOrdersCount, customerList.length, setCounts]);

  const formatIDR = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatCompactIDR = (val) => {
    if (val >= 1000000) {
      const inJt = (val / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 1 });
      return `Rp ${inJt} Jt`;
    }
    return formatIDR(val);
  };

  // ─── Filtered Orders ────────────────────────────────────────────────────────
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      // 1. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesCode = ord.id?.toLowerCase().includes(q);
        const matchesName = ord.customerName?.toLowerCase().includes(q);
        const matchesProduct = ord.productName?.toLowerCase().includes(q);
        const matchesCategory = ord.category?.toLowerCase().includes(q);
        if (!matchesCode && !matchesName && !matchesProduct && !matchesCategory) {
          return false;
        }
      }

      // 2. Division filter (synced with sidebar)
      if (selectedDivision) {
        const wf = ord.workflowType || getWorkflowForCategory(ord.category).type;
        if (wf !== selectedDivision) {
          return false;
        }
      }

      // 3. Status filter
      if (selectedStatus) {
        if (selectedStatus === 'completed' && ord.statusVariant !== 'completed') return false;
        if (selectedStatus === 'progress' && ord.statusVariant !== 'progress') return false;
        if (selectedStatus === 'waiting' && ord.statusVariant !== 'waiting') return false;
      }

      return true;
    });
  }, [orders, searchQuery, selectedDivision, selectedStatus]);

  // ─── Filtered Customers ────────────────────────────────────────────────────
  const filteredCustomers = useMemo(() => {
    if (!customerSearchQuery.trim()) return customerList;
    const q = customerSearchQuery.toLowerCase().trim();
    return customerList.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        (c.email && c.email.toLowerCase().includes(q))
    );
  }, [customerList, customerSearchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDivision('');
    setSelectedStatus('');
  };

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

    const stages = selectedOrderForProgress.timeline || PRODUCTION_STAGES;
    const stageObj = stages.find((s) => (s.stageId || s.id) === stageId);
    const stageName = stageObj ? (stageObj.stageName || stageObj.name) : stageId;
    const stageIdx = stages.findIndex((s) => (s.stageId || s.id) === stageId);

    const updated = orders.map((ord) => {
      if (ord.id === selectedOrderForProgress.id) {
        const isCompleted = stageId === 'selesai';
        const newStatusText = isCompleted ? 'Selesai' : stageName;
        const newVariant = isCompleted ? 'completed' : 'progress';

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
          currentStageIndex: stageIdx >= 0 ? stageIdx : 0,
          statusText: newStatusText,
          statusVariant: newVariant,
          timeline: newTimeline,
        };
      }
      return ord;
    });

    if (onUpdateOrders) onUpdateOrders(updated);
    setSelectedOrderForProgress(null);
    setPhotoPreviews([]);
    setNotes('');
  };

  // ── Simpan Worksheet yang Diedit ─────────────────────────────────────────────
  const handleSaveWorksheet = (updatedWorksheet) => {
    if (!selectedWorksheet) return;
    const nextList = orders.map((ord) =>
      ord.id === selectedWorksheet.id ? { ...ord, worksheet: updatedWorksheet } : ord
    );
    if (onUpdateOrders) onUpdateOrders(nextList);
    setSelectedWorksheet(null);
  };

  // ── Simpan Invoice yang Diedit ───────────────────────────────────────────────
  const handleSaveInvoice = (updatedInvoice) => {
    if (!selectedInvoice) return;
    const nextList = orders.map((ord) =>
      ord.id === selectedInvoice.id ? { ...ord, invoice: updatedInvoice } : ord
    );
    if (onUpdateOrders) onUpdateOrders(nextList);
    setSelectedInvoice(null);
  };

  // Simpan Pesanan Baru
  const handleCreateOrder = (e) => {
    e.preventDefault();
    const newCode = `WM-00${orders.length + 10}`;
    const wf = getWorkflowForCategory(newOrder.category);
    const isApparel = wf.type === 'apparel';

    const created = {
      id: newCode,
      customerName: newOrder.customerName,
      customerPhone: newOrder.customerPhone,
      productName: newOrder.productName,
      category: newOrder.category,
      workflowType: wf.type,
      quantity: Number(newOrder.quantity) || 1,
      orderDate: new Date().toISOString().slice(0, 10),
      deadline: newOrder.deadline || '2026-12-01',
      currentStageIndex: 0,
      statusText: wf.stages[0]?.name || 'Desain / Antrian',
      statusVariant: 'waiting',
      thumbnail: isApparel
        ? 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      timeline: wf.stages.map((stg, idx) => ({
        stageId: stg.id,
        stageName: stg.name,
        date: idx === 0 ? new Date().toISOString().slice(0, 10) : null,
        note: idx === 0 ? 'Pesanan baru terdaftar di sistem Warunk Media.' : '',
        photos: [],
        completed: false,
        current: idx === 0,
      })),
      worksheet: {
        orderNumber: newCode,
        clientName: newOrder.customerName,
        contact: newOrder.customerPhone,
        itemType: newOrder.productName,
        fabric: isApparel ? 'Cotton Combed / Drill Standar Distro' : 'Bahan Standar Merchandise Warunk Media',
        printType: isApparel ? 'Sablon Plastisol / Bordir Komputer' : 'Cetak Sublim / Bordir Emas / Offset',
        sizes: isApparel ? { S: 5, M: 10, L: 10, XL: 5 } : undefined,
        customSpecs: !isApparel ? [
          { label: 'Kategori Item', value: newOrder.category },
          { label: 'Jumlah Pesanan', value: `${newOrder.quantity} pcs` },
          { label: 'Standar Bahan', value: 'Kualitas Premium Standar Warunk Media' },
          { label: 'Instruksi Pengerjaan', value: newOrder.notes || 'Sesuai file artwork yang disepakati' },
        ] : undefined,
        notes: newOrder.notes,
        deadline: newOrder.deadline,
      },
      invoice: {
        invoiceNumber: `INV/2026/WM/${orders.length + 10}`,
        date: new Date().toISOString().slice(0, 10),
        items: [{ name: newOrder.productName, qty: newOrder.quantity, price: 45000, total: newOrder.quantity * 45000 }],
        total: newOrder.quantity * 45000,
        downPayment: (newOrder.quantity * 45000) / 2,
        balance: (newOrder.quantity * 45000) / 2,
        status: 'DP 50% Diterima',
        paymentNote: 'Pelunasan sisa tagihan saat pesanan selesai.',
      },
    };

    const nextList = [created, ...orders];
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

  // Simpan Customer Baru
  const handleCreateCustomer = (e) => {
    e.preventDefault();
    if (!newCustomer.name.trim()) return;

    const createdCust = {
      id: customerList.length + 1,
      name: newCustomer.name.trim(),
      phone: newCustomer.phone.trim() || '0812-3456-7890',
      email: newCustomer.email.trim() || `customer_${Date.now()}@warunkmedia.com`,
      totalOrders: 0,
    };

    setCustomerList([createdCust, ...customerList]);
    setShowNewCustomerModal(false);
    setNewCustomer({ name: '', phone: '', email: '' });
  };

  // Hapus Customer
  const handleDeleteCustomer = (id) => {
    if (window.confirm('Yakin ingin menghapus customer ini? Tindakan tidak dapat dibatalkan.')) {
      setCustomerList(customerList.filter((c) => c.id !== id));
    }
  };

  // Hapus Pesanan
  const handleDeleteOrder = (id) => {
    if (window.confirm(`Yakin ingin menghapus pesanan ${id}? Tindakan ini tidak dapat dibatalkan.`)) {
      const nextList = orders.filter((o) => o.id !== id);
      if (onUpdateOrders) onUpdateOrders(nextList);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* ── 1. KPI SUMMARY STRIP (Anti-Overlap Layout) ── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4" aria-label="Statistik Produksi">
        <KpiCard
          label="Total Pesanan"
          value={totalOrdersCount}
          sub="Semua divisi aktif"
          icon={Package}
          iconBg="bg-primary/10 text-primary"
        />
        <KpiCard
          label="Sedang Diproduksi"
          value={inProgressOrdersCount}
          sub="Antrean & pengerjaan"
          icon={Clock}
          iconBg="bg-amber-500/10 text-amber-600"
          accent="text-amber-600"
        />
        <KpiCard
          label="Pesanan Selesai"
          value={completedOrdersCount}
          sub="Siap diambil / terkirim"
          icon={CheckCircle2}
          iconBg="bg-brand-green/10 text-brand-green"
          accent="text-brand-green"
        />
        <KpiCard
          label="Nilai Produksi"
          value={formatIDR(totalProductionValue)}
          compactValue={formatCompactIDR(totalProductionValue)}
          sub="Akumulasi tagihan"
          icon={Receipt}
          iconBg="bg-sky-500/10 text-sky-600"
          accent="text-ink"
        />
      </section>

      {/* =========================================================================
          2. TAB 1: DAFTAR PESANAN PRODUKSI
          ========================================================================= */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {/* Filter & Toolbar */}
          <div className="bg-surface border border-line rounded-2xl p-3.5 sm:p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari kode (WM-...), customer, nama produk..."
                  className="w-full h-9 pl-8 pr-7 text-xs bg-canvas border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-ink font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                    title="Hapus pencarian"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status Dropdown */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="h-9 px-3 text-xs font-semibold bg-canvas border border-line rounded-xl text-ink focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="">Semua Status</option>
                  <option value="progress">Sedang Diproduksi</option>
                  <option value="completed">Pesanan Selesai</option>
                  <option value="waiting">Menunggu Antrian / Desain</option>
                </select>

                {(searchQuery || selectedDivision || selectedStatus) && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="h-9 px-3 rounded-xl border border-red-200 bg-red-50 text-primary text-xs font-bold flex items-center gap-1 hover:bg-red-100 transition-colors"
                    title="Reset semua filter"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters Badges */}
            {(searchQuery || selectedDivision || selectedStatus) && (
              <div className="pt-2 border-t border-line/60 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[10px] font-bold text-muted uppercase">Filter:</span>
                {selectedDivision && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-primary/10 text-primary font-bold text-[11px]">
                    Divisi: {selectedDivision === 'apparel' ? 'Konveksi' : selectedDivision === 'merchandise' ? 'Merchandise' : 'Percetakan'}
                  </span>
                )}
                {selectedStatus && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 text-amber-700 font-bold text-[11px]">
                    Status: {selectedStatus === 'completed' ? 'Selesai' : selectedStatus === 'progress' ? 'Sedang Diproduksi' : 'Antrian'}
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-canvas border border-line text-ink font-bold text-[11px]">
                    "{searchQuery}"
                  </span>
                )}
                <span className="text-[11px] text-muted ml-auto font-medium">
                  {filteredOrders.length} pesanan ditemukan
                </span>
              </div>
            )}
          </div>

          {/* Orders Content View */}
          {filteredOrders.length === 0 ? (
            <div className="bg-surface rounded-2xl border border-line p-10 text-center space-y-3">
              <Package className="w-8 h-8 mx-auto text-muted/40" />
              <p className="text-sm font-bold text-ink">Tidak ada pesanan yang sesuai</p>
              <p className="text-xs text-muted max-w-sm mx-auto">
                Coba ubah kata kunci pencarian atau reset filter divisi dan status di panel samping.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 bg-canvas hover:bg-line border border-line rounded-xl text-xs font-bold text-ink transition-colors"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* DESKTOP TABLE VIEW (hidden on mobile, visible on lg) */}
              <div className="hidden lg:block bg-surface rounded-2xl border border-line overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-canvas border-b border-line text-muted uppercase font-bold text-[11px] tracking-wider">
                        <th className="py-3 px-4">Kode</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Rincian Produk</th>
                        <th className="py-3 px-4">Deadline</th>
                        <th className="py-3 px-4">Tahapan Progres</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {filteredOrders.map((ord) => {
                        const totalStages = ord.timeline?.length || 6;
                        const currentStageNum = (ord.currentStageIndex ?? 0) + 1;
                        const isDone = ord.statusVariant === 'completed';
                        const progressPct = Math.min(Math.round((currentStageNum / totalStages) * 100), 100);

                        return (
                          <tr key={ord.id} className="hover:bg-canvas/50 transition-colors">
                            {/* Kode Pesanan */}
                            <td className="py-3.5 px-4 align-top">
                              <span className="font-mono font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-md border border-primary/20 inline-block">
                                {ord.id}
                              </span>
                              <div className="mt-1 text-[10px] text-muted font-medium">
                                Masuk: {ord.orderDate || '2026-11-01'}
                              </div>
                            </td>

                            {/* Customer & Kontak */}
                            <td className="py-3.5 px-4 align-top">
                              <div className="font-bold text-ink text-xs">{ord.customerName}</div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <a
                                  href={`https://wa.me/${ord.customerPhone?.replace(/[^0-9]/g, '') || '6281234567890'}?text=Halo%20${encodeURIComponent(ord.customerName)},%20update%20pesanan%20${ord.id}%20di%20Warunk%20Media.`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] text-brand-green hover:underline font-mono"
                                  title="Chat WhatsApp customer"
                                >
                                  <MessageSquare className="w-3 h-3" />
                                  <span>{ord.customerPhone}</span>
                                </a>
                              </div>
                            </td>

                            {/* Rincian Produk */}
                            <td className="py-3.5 px-4 align-top">
                              <div className="font-bold text-ink">{ord.productName}</div>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="px-2 py-0.5 bg-canvas border border-line rounded text-[10px] font-bold text-ink">
                                  {ord.quantity} pcs
                                </span>
                                <span className="text-[11px] text-muted">
                                  · {ord.category}
                                </span>
                              </div>
                            </td>

                            {/* Deadline */}
                            <td className="py-3.5 px-4 align-top">
                              <div className="flex items-center gap-1.5 text-ink font-semibold">
                                <Calendar className="w-3.5 h-3.5 text-muted" />
                                <span>{ord.deadline}</span>
                              </div>
                              <div className="text-[10px] text-muted mt-0.5">
                                Estimasi selesai
                              </div>
                            </td>

                            {/* Tahapan Progres */}
                            <td className="py-3.5 px-4 align-top min-w-[170px]">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                                    isDone
                                      ? 'bg-[#DDF3E1] text-[#14532D] border-brand-green/30'
                                      : ord.statusVariant === 'progress'
                                      ? 'bg-[#FDF0C4] text-[#5B4300] border-[#F5B400]/40'
                                      : 'bg-[#ECEAE6] text-[#5F5B55] border-line'
                                  }`}
                                >
                                  {isDone && <Check className="w-3 h-3" />}
                                  <span>{ord.statusText}</span>
                                </span>
                              </div>

                              <div className="mt-2 space-y-1">
                                <div className="flex items-center justify-between text-[10px] text-muted font-semibold">
                                  <span>Tahap {currentStageNum} dari {totalStages}</span>
                                  <span>{progressPct}%</span>
                                </div>
                                <div className="w-full bg-canvas rounded-full h-1.5 overflow-hidden border border-line">
                                  <div
                                    className={`h-full rounded-full transition-all duration-500 ${
                                      isDone ? 'bg-brand-green' : 'bg-primary'
                                    }`}
                                    style={{ width: `${progressPct}%` }}
                                  />
                                </div>
                              </div>
                            </td>

                            {/* Aksi */}
                            <td className="py-3.5 px-4 text-right align-top">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    setSelectedOrderForProgress(ord);
                                    const orderFirstStage = (ord.timeline && ord.timeline[ord.currentStageIndex]?.stageId) 
                                      || (ord.timeline && ord.timeline[0]?.stageId) 
                                      || 'desain';
                                    setStageId(orderFirstStage);
                                    setNotes('');
                                    setPhotoPreviews([]);
                                  }}
                                  className="px-2.5 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors shadow-xs"
                                  title="Update Tahap & Unggah Bukti Foto"
                                >
                                  <Camera className="w-3.5 h-3.5" />
                                  <span>Update Progres</span>
                                </button>

                                <button
                                  onClick={() => setSelectedWorksheet(ord)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 hover:bg-canvas border border-line rounded-lg text-[11px] font-bold text-ink transition-colors shadow-2xs"
                                  title="Lihat & Edit Lembar Kerja (Worksheet)"
                                >
                                  <FileText className="w-3.5 h-3.5 text-primary" />
                                  <span>Worksheet</span>
                                </button>

                                <button
                                  onClick={() => setSelectedInvoice(ord)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 hover:bg-canvas border border-line rounded-lg text-[11px] font-bold text-ink transition-colors shadow-2xs"
                                  title="Lihat & Edit Invoice Pesanan"
                                >
                                  <Receipt className="w-3.5 h-3.5 text-brand-green" />
                                  <span>Invoice</span>
                                </button>

                                <button
                                  onClick={() => handleDeleteOrder(ord.id)}
                                  className="p-1.5 hover:bg-red-50 border border-line hover:border-red-300 rounded-lg text-red-600 transition-colors"
                                  title="Hapus Pesanan"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MOBILE CARDS VIEW (visible on phone/tablet, hidden on lg) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-3">
                {filteredOrders.map((ord) => {
                  const totalStages = ord.timeline?.length || 6;
                  const currentStageNum = (ord.currentStageIndex ?? 0) + 1;
                  const isDone = ord.statusVariant === 'completed';
                  const progressPct = Math.min(Math.round((currentStageNum / totalStages) * 100), 100);

                  return (
                    <div
                      key={ord.id}
                      className="bg-surface rounded-2xl border border-line p-4 shadow-xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-md border border-primary/20 text-xs">
                            {ord.id}
                          </span>
                          <span className="ml-2 text-[11px] text-muted">
                            {ord.orderDate || '2026-11-01'}
                          </span>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            isDone
                              ? 'bg-[#DDF3E1] text-[#14532D] border-brand-green/30'
                              : ord.statusVariant === 'progress'
                              ? 'bg-[#FDF0C4] text-[#5B4300] border-[#F5B400]/40'
                              : 'bg-[#ECEAE6] text-[#5F5B55] border-line'
                          }`}
                        >
                          {isDone && <Check className="w-3 h-3" />}
                          <span>{ord.statusText}</span>
                        </span>
                      </div>

                      <div>
                        <h3 className="font-heading font-bold text-sm text-ink">{ord.productName}</h3>
                        <p className="text-xs text-muted mt-0.5">
                          {ord.quantity} pcs · {ord.category}
                        </p>
                      </div>

                      <div className="bg-canvas rounded-xl p-3 space-y-1.5 border border-line/60">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted font-medium">Customer:</span>
                          <span className="font-bold text-ink">{ord.customerName}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted font-medium">WhatsApp:</span>
                          <a
                            href={`https://wa.me/${ord.customerPhone?.replace(/[^0-9]/g, '') || '6281234567890'}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-brand-green hover:underline flex items-center gap-1 font-semibold"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>{ord.customerPhone}</span>
                          </a>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted font-medium">Deadline:</span>
                          <span className="font-bold text-ink flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-muted" />
                            {ord.deadline}
                          </span>
                        </div>
                      </div>

                      {/* Mini Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-muted font-semibold">
                          <span>Tahap {currentStageNum} dari {totalStages}</span>
                          <span>{progressPct}%</span>
                        </div>
                        <div className="w-full bg-canvas rounded-full h-1.5 overflow-hidden border border-line">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isDone ? 'bg-brand-green' : 'bg-primary'
                            }`}
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>

                      {/* Card Action Buttons (Two rows, zero awkward clipping) */}
                      <div className="pt-2 border-t border-line space-y-2">
                        <button
                          onClick={() => {
                            setSelectedOrderForProgress(ord);
                            const orderFirstStage = (ord.timeline && ord.timeline[ord.currentStageIndex]?.stageId) 
                              || (ord.timeline && ord.timeline[0]?.stageId) 
                              || 'desain';
                            setStageId(orderFirstStage);
                            setNotes('');
                            setPhotoPreviews([]);
                          }}
                          className="w-full py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Update Progres & Foto Bukti</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedWorksheet(ord)}
                            className="flex-1 py-1.5 px-2 bg-canvas hover:bg-line border border-line rounded-xl text-ink text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5 text-primary" />
                            <span>Worksheet</span>
                          </button>
                          <button
                            onClick={() => setSelectedInvoice(ord)}
                            className="flex-1 py-1.5 px-2 bg-canvas hover:bg-line border border-line rounded-xl text-ink text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                          >
                            <Receipt className="w-3.5 h-3.5 text-brand-green" />
                            <span>Invoice</span>
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(ord.id)}
                            className="p-2 hover:bg-red-50 border border-line hover:border-red-300 rounded-xl text-red-600 transition-colors"
                            title="Hapus Pesanan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          3. TAB 2: DATA CUSTOMER / PARTICIPANT
          ========================================================================= */}
      {activeTab === 'customers' && (
        <div className="space-y-4">
          {/* Customer Toolbar */}
          <div className="bg-surface border border-line rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={customerSearchQuery}
                onChange={(e) => setCustomerSearchQuery(e.target.value)}
                placeholder="Cari nama, telp WhatsApp, atau email..."
                className="w-full h-9 pl-8 pr-7 text-xs bg-canvas border border-line rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-ink font-medium"
              />
              {customerSearchQuery && (
                <button
                  onClick={() => setCustomerSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                  title="Hapus pencarian"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowNewCustomerModal(true)}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Customer Baru</span>
            </button>
          </div>

          {/* Customer Content View */}
          {filteredCustomers.length === 0 ? (
            <div className="bg-surface rounded-2xl border border-line p-10 text-center space-y-2">
              <Users className="w-8 h-8 mx-auto text-muted/40" />
              <p className="text-sm font-bold text-ink">Tidak ada customer ditemukan</p>
              <p className="text-xs text-muted">
                {customerSearchQuery
                  ? 'Tidak ada data customer yang sesuai dengan pencarian.'
                  : 'Belum ada data customer terdaftar.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* DESKTOP TABLE VIEW (hidden on mobile, visible on md/lg) */}
              <div className="hidden md:block bg-surface rounded-2xl border border-line overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-canvas border-b border-line text-muted uppercase font-bold text-[11px] tracking-wider">
                        <th className="py-3 px-4">Nama Customer / Organisasi</th>
                        <th className="py-3 px-4">Kontak WhatsApp</th>
                        <th className="py-3 px-4">Alamat Email</th>
                        <th className="py-3 px-4 text-center">Pesanan Terdaftar</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {filteredCustomers.map((cust) => {
                        const custOrdersCount = orders.filter(
                          (o) => o.customerName?.toLowerCase() === cust.name?.toLowerCase()
                        ).length;

                        return (
                          <tr key={cust.id} className="hover:bg-canvas/50 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-ink">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                                  {cust.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-bold text-ink">{cust.name}</div>
                                  <div className="text-[10px] text-muted">ID: CUST-{String(cust.id).padStart(2, '0')}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-ink font-mono text-xs">
                              <div className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-muted" />
                                <span>{cust.phone}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-muted">
                              <div className="flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-muted" />
                                <span>{cust.email}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-canvas border border-line text-ink">
                                {custOrdersCount} pesanan
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={`https://wa.me/${cust.phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(cust.name)},%20kami%20dari%20Warunk%20Media%20Semarang`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-3 py-1.5 bg-brand-green/10 hover:bg-brand-green/20 text-brand-green border border-brand-green/30 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-colors"
                                  title="Chat via WhatsApp"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>Chat WA</span>
                                </a>
                                <button
                                  onClick={() => handleDeleteCustomer(cust.id)}
                                  className="p-1.5 hover:bg-red-50 border border-line hover:border-red-300 rounded-xl text-red-600 transition-colors"
                                  title="Hapus Customer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MOBILE CARDS VIEW FOR CUSTOMERS (Anti-Overflow Mobile Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-3">
                {filteredCustomers.map((cust) => {
                  const custOrdersCount = orders.filter(
                    (o) => o.customerName?.toLowerCase() === cust.name?.toLowerCase()
                  ).length;

                  return (
                    <div
                      key={cust.id}
                      className="bg-surface rounded-2xl border border-line p-4 shadow-xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                            {cust.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-heading font-bold text-sm text-ink truncate">{cust.name}</h4>
                            <span className="text-[10px] text-muted">ID: CUST-{String(cust.id).padStart(2, '0')}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteCustomer(cust.id)}
                          className="p-1.5 hover:bg-red-50 border border-line hover:border-red-300 rounded-xl text-red-600 transition-colors"
                          title="Hapus Customer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="bg-canvas rounded-xl p-2.5 border border-line/60 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-muted">Email:</span>
                          <span className="text-ink font-medium truncate max-w-[170px]">{cust.email || '-'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted">Total Order:</span>
                          <span className="font-bold text-primary">{custOrdersCount} pesanan</span>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/${cust.phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(cust.name)},%20kami%20dari%20Warunk%20Media%20Semarang`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 bg-brand-green/10 hover:bg-brand-green/20 text-brand-green border border-brand-green/30 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat WhatsApp ({cust.phone})</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          4. MODALS (Update Progres, Pesanan Baru, Customer Baru, Worksheet, Invoice)
          ========================================================================= */}

      {/* Modal Form: Update Progres & Unggah Foto */}
      {selectedOrderForProgress && (
        <div
          className="fixed inset-0 z-60 bg-black/75 overflow-y-auto backdrop-blur-xs flex justify-center p-0 sm:p-4"
          onClick={() => setSelectedOrderForProgress(null)}
        >
          <div
            className="relative w-full max-w-xl bg-surface sm:rounded-2xl border border-line shadow-2xl p-5 sm:p-8 my-0 sm:my-6 min-h-screen sm:min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-line">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/10 text-primary">
                  {selectedOrderForProgress.id}
                </span>
                <h3 className="font-heading font-extrabold text-lg text-ink mt-1">
                  Update Progres & Foto Workshop
                </h3>
                <p className="text-xs text-muted">
                  {selectedOrderForProgress.productName} — {selectedOrderForProgress.customerName}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrderForProgress(null)}
                className="p-1.5 hover:bg-canvas rounded-xl text-muted hover:text-ink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProgress} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-ink block mb-1">Tahapan Produksi Terkini</label>
                <select
                  value={stageId}
                  onChange={(e) => setStageId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-canvas border border-line rounded-xl text-xs font-semibold focus:ring-1 focus:ring-primary"
                >
                  {(selectedOrderForProgress.timeline || PRODUCTION_STAGES).map((stg) => (
                    <option key={stg.stageId || stg.id} value={stg.stageId || stg.id}>
                      {stg.stageName || stg.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-ink block mb-1">Waktu / Tanggal Update</label>
                <input
                  type="datetime-local"
                  value={updateDate}
                  onChange={(e) => setUpdateDate(e.target.value)}
                  className="w-full px-3 py-2 bg-canvas border border-line rounded-xl text-xs focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-ink block mb-1">Catatan Pengerjaan untuk Customer</label>
                <textarea
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Sablon plastisol bagian depan selesai 40 pcs, lanjut pengeringan sebelum jahit."
                  className="w-full px-3 py-2 bg-canvas border border-line rounded-xl text-xs focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Upload Foto Bukti */}
              <div>
                <label className="font-bold text-ink block mb-1">Unggah Foto Bukti Produksi</label>
                <label className="border-2 border-dashed border-line hover:border-primary rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-canvas/50 transition-colors">
                  <Upload className="w-6 h-6 text-muted mb-1" />
                  <span className="font-bold text-ink text-xs">Klik untuk pilih foto dari galeri / kamera HP</span>
                  <span className="text-[10px] text-muted mt-0.5">Format JPG, PNG (Maks 5MB per foto)</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>

                {photoPreviews.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {photoPreviews.map((preview, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-line group">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
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
                  className="px-4 py-2 bg-canvas hover:bg-line text-ink rounded-xl text-xs font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  Simpan Progres
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Tambah Pesanan Baru */}
      {showNewOrderModal && (
        <div
          className="fixed inset-0 z-60 bg-black/75 overflow-y-auto backdrop-blur-xs flex justify-center p-0 sm:p-4"
          onClick={() => setShowNewOrderModal(false)}
        >
          <div
            className="relative w-full max-w-lg bg-surface sm:rounded-2xl border border-line shadow-2xl p-5 sm:p-8 my-0 sm:my-6 min-h-screen sm:min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-line">
              <h3 className="font-heading font-extrabold text-lg text-ink">Buat Pesanan Baru</h3>
              <button
                onClick={() => setShowNewOrderModal(false)}
                className="p-1.5 hover:bg-canvas rounded-xl text-muted hover:text-ink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-ink block mb-1">Nama Customer / Organisasi</label>
                <input
                  type="text"
                  required
                  value={newOrder.customerName}
                  onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                  placeholder="Misal: BEM Universitas Diponegoro"
                  className="w-full px-3 py-2 bg-canvas border border-line rounded-xl text-xs focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-ink block mb-1">Nomor WhatsApp Customer</label>
                <input
                  type="text"
                  required
                  value={newOrder.customerPhone}
                  onChange={(e) => setNewOrder({ ...newOrder, customerPhone: e.target.value })}
                  placeholder="0812-3456-7890"
                  className="w-full px-3 py-2 bg-canvas border border-line rounded-xl text-xs font-mono focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-ink block mb-1">Kategori Produk</label>
                  <select
                    value={newOrder.category}
                    onChange={(e) => setNewOrder({ ...newOrder, category: e.target.value })}
                    className="w-full px-3 py-2 bg-canvas border border-line rounded-xl text-xs font-semibold focus:ring-1 focus:ring-primary"
                  >
                    <option value="Kaos & Polo">Kaos & Polo (Apparel)</option>
                    <option value="Jaket & Hoodie">Jaket & Hoodie (Apparel)</option>
                    <option value="PDH / Kemeja">PDH / Kemeja (Apparel)</option>
                    <option value="Topi & Bucket">Topi & Bucket (Apparel)</option>
                    <option value="ID Card & Lanyard">ID Card & Lanyard (Merchandise)</option>
                    <option value="Slempang Wisuda">Slempang Wisuda (Merchandise)</option>
                    <option value="Pin & Bros">Pin & Gantungan (Merchandise)</option>
                    <option value="Buku & Agenda">Buku & Agenda (Percetakan)</option>
                    <option value="Merchandise Lain">Merchandise Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-ink block mb-1">Jumlah Pesanan (Pcs)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newOrder.quantity}
                    onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                    className="w-full px-3 py-2 bg-canvas border border-line rounded-xl text-xs focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-ink block mb-1">Nama / Deskripsi Produk</label>
                <input
                  type="text"
                  required
                  value={newOrder.productName}
                  onChange={(e) => setNewOrder({ ...newOrder, productName: e.target.value })}
                  placeholder="Misal: Kaos Panitia LDK 2026 Bahan Combed 24s"
                  className="w-full px-3 py-2 bg-canvas border border-line rounded-xl text-xs focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-ink block mb-1">Target Selesai (Deadline)</label>
                <input
                  type="date"
                  required
                  value={newOrder.deadline}
                  onChange={(e) => setNewOrder({ ...newOrder, deadline: e.target.value })}
                  className="w-full px-3 py-2 bg-canvas border border-line rounded-xl text-xs focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-ink block mb-1">Catatan Tambahan (Opsional)</label>
                <textarea
                  rows="2"
                  value={newOrder.notes}
                  onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                  placeholder="Catatan sablon, spesifikasi bahan, atau info pengiriman..."
                  className="w-full px-3 py-2 bg-canvas border border-line rounded-xl text-xs focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={() => setShowNewOrderModal(false)}
                  className="px-4 py-2 bg-canvas hover:bg-line text-ink rounded-xl text-xs font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  Simpan Pesanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Tambah Customer Baru */}
      {showNewCustomerModal && (
        <div
          className="fixed inset-0 z-60 bg-black/75 overflow-y-auto backdrop-blur-xs flex justify-center p-0 sm:p-4"
          onClick={() => setShowNewCustomerModal(false)}
        >
          <div
            className="relative w-full max-w-md bg-surface sm:rounded-2xl border border-line shadow-2xl p-5 sm:p-8 my-0 sm:my-6 min-h-screen sm:min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-line">
              <h3 className="font-heading font-extrabold text-lg text-ink">Tambah Customer Baru</h3>
              <button
                onClick={() => setShowNewCustomerModal(false)}
                className="p-1.5 hover:bg-canvas rounded-xl text-muted hover:text-ink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-ink block mb-1">Nama Lengkap / Organisasi</label>
                <input
                  type="text"
                  required
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="Misal: Panitia Dies Natalis FT"
                  className="w-full px-3 py-2 bg-canvas border border-line rounded-xl text-xs focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-ink block mb-1">Nomor WhatsApp</label>
                <input
                  type="text"
                  required
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  placeholder="0812-3456-7890"
                  className="w-full px-3 py-2 bg-canvas border border-line rounded-xl text-xs font-mono focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-ink block mb-1">Alamat Email (Opsional)</label>
                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  placeholder="kontak@organisasi.com"
                  className="w-full px-3 py-2 bg-canvas border border-line rounded-xl text-xs focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={() => setShowNewCustomerModal(false)}
                  className="px-4 py-2 bg-canvas hover:bg-line text-ink rounded-xl text-xs font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  Simpan Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal Worksheet (editable for admin) ── */}
      {selectedWorksheet && (
        <WorksheetModal
          order={selectedWorksheet}
          onClose={() => setSelectedWorksheet(null)}
          isAdmin
          onSave={handleSaveWorksheet}
        />
      )}

      {/* ── Modal Invoice (editable for admin) ── */}
      {selectedInvoice && (
        <InvoiceModal
          order={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          isAdmin
          onSave={handleSaveInvoice}
        />
      )}
    </div>
  );
}
