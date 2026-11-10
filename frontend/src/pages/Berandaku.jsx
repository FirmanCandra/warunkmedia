import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ClipboardList, Search } from 'lucide-react';
import OrderCard from '../components/OrderCard';
import WorksheetModal from '../components/WorksheetModal';
import InvoiceModal from '../components/InvoiceModal';
import { INITIAL_ORDERS } from '../data/mockData';

export default function Berandaku({ orders = INITIAL_ORDERS, currentUser }) {
  const [filter, setFilter] = useState('all'); // 'all', 'progress', 'completed'
  const [selectedOrderForWorksheet, setSelectedOrderForWorksheet] = useState(null);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState(null);
  const navigate = useNavigate();

  // Filter orders (if currentUser is logged in, show their orders, else show sample demo orders)
  const userOrders = currentUser
    ? orders.filter(
        (o) =>
          o.customerName?.toLowerCase() === currentUser.name?.toLowerCase() ||
          currentUser.role === 'admin'
      )
    : orders;

  const filteredOrders = userOrders.filter((order) => {
    if (filter === 'progress') return order.statusVariant === 'progress' || order.statusVariant === 'waiting';
    if (filter === 'completed') return order.statusVariant === 'completed';
    return true;
  });

  return (
    <div className="max-w-[1120px] mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Header Berandaku */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink">
            Berandaku
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-0.5">
            Daftar seluruh pesanan konveksi Anda di Warunk Media beserta status pengerjaannya.
          </p>
        </div>

        {/* Tab Filter Status */}
        <div className="flex items-center gap-1.5 bg-surface border border-line p-1 rounded-control text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              filter === 'all' ? 'bg-primary text-white shadow-xs' : 'text-muted hover:text-ink'
            }`}
          >
            Semua ({userOrders.length})
          </button>
          <button
            onClick={() => setFilter('progress')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              filter === 'progress' ? 'bg-primary text-white shadow-xs' : 'text-muted hover:text-ink'
            }`}
          >
            Sedang Berjalan
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              filter === 'completed' ? 'bg-primary text-white shadow-xs' : 'text-muted hover:text-ink'
            }`}
          >
            Selesai
          </button>
        </div>
      </div>

      {/* Daftar Kartu Pesanan */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id || order.order_code}
              order={order}
              onViewDetail={(ord) => navigate(`/cek-projek?code=${ord.id || ord.order_code}`)}
              onViewWorksheet={(ord) => setSelectedOrderForWorksheet(ord)}
              onViewInvoice={(ord) => setSelectedOrderForInvoice(ord)}
            />
          ))}
        </div>
      ) : (
        /* Kondisi Kosong (Wireframe Hal 3 & 7) */
        <div className="bg-surface rounded-card border border-line p-10 text-center space-y-3">
          <div className="w-12 h-12 bg-canvas rounded-full flex items-center justify-center mx-auto text-muted">
            <ClipboardList className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-base text-ink">Belum Ada Pesanan</h3>
          <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">
            Pesanan Anda akan otomatis muncul di sini setelah didaftarkan oleh tim Warunk Media. Anda juga dapat langsung mengecek status menggunakan kode nota.
          </p>
          <div className="pt-2">
            <Link
              to="/cek-projek"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-control text-xs font-semibold transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Cek Kode Pesanan</span>
            </Link>
          </div>
        </div>
      )}

      {/* Modal Worksheet Order */}
      {selectedOrderForWorksheet && (
        <WorksheetModal
          order={selectedOrderForWorksheet}
          onClose={() => setSelectedOrderForWorksheet(null)}
        />
      )}

      {/* Modal Invoice */}
      {selectedOrderForInvoice && (
        <InvoiceModal
          order={selectedOrderForInvoice}
          onClose={() => setSelectedOrderForInvoice(null)}
        />
      )}
    </div>
  );
}
