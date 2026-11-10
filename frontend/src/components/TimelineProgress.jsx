import React, { useState } from 'react';
import { Check, Clock, X, ZoomIn } from 'lucide-react';

export default function TimelineProgress({ timeline = [], currentStageIndex = 0 }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="relative pl-7 sm:pl-8 space-y-5 sm:space-y-7 before:absolute before:left-3.5 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-line">
      {timeline.map((step, idx) => {
        const isCompleted = idx < currentStageIndex || step.completed;
        const isCurrent = idx === currentStageIndex && !step.completed;

        return (
          <div key={step.stageId || idx} className="relative group">
            {/* Dot Indikator Status */}
            <div
              className={`absolute -left-7 sm:-left-8 top-1 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all shrink-0 ${
                isCompleted
                  ? 'bg-brand-green border-brand-green text-white shadow-xs'
                  : isCurrent
                  ? 'bg-primary border-white ring-4 ring-primary/20 text-white animate-pulse'
                  : 'bg-surface border-line text-muted'
              }`}
            >
              {isCompleted ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : isCurrent ? (
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              ) : (
                <div className="w-2 h-2 bg-muted/40 rounded-full" />
              )}
            </div>

            {/* Konten Tahapan */}
            <div className="bg-surface p-3.5 sm:p-5 rounded-card border border-line shadow-xs min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-heading font-bold text-sm sm:text-base text-ink">
                    {step.stageName}
                  </h4>
                  {isCurrent && (
                    <span className="px-2 py-0.5 text-[11px] sm:text-xs font-semibold rounded-full bg-[#FDF0C4] text-[#5B4300] border border-[#F5B400]/30">
                      Sedang Berjalan
                    </span>
                  )}
                  {isCompleted && (
                    <span className="px-2 py-0.5 text-[11px] sm:text-xs font-semibold rounded-full bg-[#DDF3E1] text-[#14532D] border border-brand-green/30">
                      Selesai
                    </span>
                  )}
                </div>
                {step.date && (
                  <span className="text-[11px] sm:text-xs text-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {step.date}
                  </span>
                )}
              </div>

              {/* Catatan Owner */}
              {step.note ? (
                <p className="text-xs sm:text-sm text-ink/80 mt-1 leading-relaxed bg-canvas/60 p-2 sm:p-2.5 rounded-lg border border-line/60">
                  {step.note}
                </p>
              ) : (
                <p className="text-xs text-muted italic mt-1">Belum ada catatan untuk tahapan ini.</p>
              )}

              {/* Bukti Foto Produksi */}
              {step.photos && step.photos.length > 0 && (
                <div className="mt-3">
                  <div className="text-xs font-semibold text-muted mb-2 flex items-center gap-1">
                    <span>Foto Bukti Produksi ({step.photos.length}):</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {step.photos.map((photoUrl, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setSelectedPhoto(photoUrl)}
                        className="group/img relative rounded-lg overflow-hidden border border-line focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <img
                          src={photoUrl}
                          alt={`Bukti ${step.stageName} ${pIdx + 1}`}
                          className="w-16 h-16 sm:w-24 sm:h-24 object-cover group-hover/img:scale-105 transition-transform"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-white">
                          <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Modal Zoom Foto */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] bg-surface rounded-card overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors z-10"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedPhoto}
              alt="Bukti Produksi Full Size"
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
