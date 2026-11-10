import React from 'react';
import { Calendar, Package, ArrowRight, FileText, Receipt } from 'lucide-react';

export default function OrderCard({
  order,
  onViewDetail,
  onViewWorksheet,
  onViewInvoice,
  showActions = true,
}) {
  // Status badge styling per design.md
  const getBadgeStyle = () => {
    switch (order.statusVariant) {
      case 'completed':
        return 'bg-[#DDF3E1] text-[#14532D] border-brand-green/30';
      case 'progress':
        return 'bg-[#FDF0C4] text-[#5B4300] border-[#F5B400]/40';
      case 'delayed':
        return 'bg-[#FBE1E1] text-[#7F1D1D] border-red-300';
      default:
        return 'bg-[#ECEAE6] text-[#5F5B55] border-line';
    }
  };

  // Progress percentage calculation (out of 6 stages)
  const totalStages = 6;
  const currentStageIndex = order.currentStageIndex ?? 0;
  const progressPercent = Math.min(
    100,
    Math.round(((currentStageIndex + (order.statusVariant === 'completed' ? 1 : 0.5)) / totalStages) * 100)
  );

  return (
    <div className="bg-surface rounded-card border border-line p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Foto Thumbnail */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-canvas border border-line flex-shrink-0">
          <img
            src={order.thumbnail || '/logo-warunkmedia.jpg'}
            alt={order.productName}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Informasi Utama Pesanan */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
              {order.id || order.order_code}
            </span>
            <span className="text-xs text-muted">·</span>
            <span className="text-xs text-muted font-medium">{order.category}</span>
          </div>

          <h3 className="font-heading font-bold text-base sm:text-lg text-ink truncate mb-1">
            {order.productName || order.product_name}
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Package className="w-3.5 h-3.5 text-primary" />
              <span>{order.quantity} pcs</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>Deadline: {order.deadline}</span>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 max-w-md">
            <div className="flex justify-between items-center text-[11px] mb-1">
              <span className="text-muted">Progres: Tahap {currentStageIndex + 1} dari {totalStages}</span>
              <span className="font-semibold text-ink">{progressPercent}%</span>
            </div>
            <div className="w-full bg-canvas border border-line/60 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  order.statusVariant === 'completed' ? 'bg-brand-green' : 'bg-primary'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Status Badge & Tombol */}
        <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-line">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeStyle()}`}
          >
            {order.statusText || order.status_text}
          </span>

          <div className="flex items-center gap-2">
            {showActions && (
              <>
                {onViewWorksheet && (
                  <button
                    type="button"
                    onClick={() => onViewWorksheet(order)}
                    className="p-2 text-muted hover:text-ink hover:bg-canvas rounded-lg border border-line text-xs flex items-center gap-1 transition-colors"
                    title="Lihat Worksheet Order"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="hidden lg:inline">Worksheet</span>
                  </button>
                )}
                {onViewInvoice && (
                  <button
                    type="button"
                    onClick={() => onViewInvoice(order)}
                    className="p-2 text-muted hover:text-ink hover:bg-canvas rounded-lg border border-line text-xs flex items-center gap-1 transition-colors"
                    title="Lihat Invoice"
                  >
                    <Receipt className="w-4 h-4" />
                    <span className="hidden lg:inline">Invoice</span>
                  </button>
                )}
              </>
            )}

            <button
              type="button"
              onClick={() => onViewDetail(order)}
              className="px-4 py-2 bg-secondary hover:bg-ink text-white text-xs font-semibold rounded-control flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Lihat detail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
