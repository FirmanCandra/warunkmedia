import React from 'react';

/**
 * Bespoke Vector Product Icons for Warunk Media
 * Rendered in brand red (#B91C1C) with rich silhouette + inner details,
 * matching the exact visual style in the reference layout.
 */
export default function ProductIcon({ productId, className = "w-12 h-12", ...props }) {
  switch (productId) {
    case 'kaos':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="currentColor" {...props}>
          {/* T-Shirt / Polo Silhouette */}
          <path d="M16 6 L20 10 C21 11.5 22.5 12 24 12 C25.5 12 27 11.5 28 10 L32 6 L44 14 L39 21 L34 18 L34 42 L14 42 L14 18 L9 21 L4 14 Z" />
          {/* Collar Band Highlight */}
          <path d="M20 10 C21.5 12 22.5 12.5 24 12.5 C25.5 12.5 26.5 12 28 10 L26 7 C25.5 8 24.8 8.5 24 8.5 C23.2 8.5 22.5 8 22 7 Z" fill="#7F1D1D" />
          {/* Center placket / buttons */}
          <rect x="22.5" y="12.5" width="3" height="9" rx="1" fill="#7F1D1D" />
          <circle cx="24" cy="15.5" r="0.9" fill="white" />
          <circle cx="24" cy="19" r="0.9" fill="white" />
          {/* Sleeve folds */}
          <path d="M12 19 L14 18 M36 19 L34 18" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'jaket':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="currentColor" {...props}>
          {/* Hoodie / Bomber Jacket Silhouette */}
          <path d="M15 8 C15 4 19 3 24 3 C29 3 33 4 33 8 L44 15 L39 22 L34 19 L34 44 L14 44 L14 19 L9 22 L4 15 Z" />
          {/* Center Zipper Line */}
          <line x1="24" y1="9" x2="24" y2="44" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <rect x="22.5" y="11" width="3" height="4" rx="1" fill="#7F1D1D" />
          {/* Split Kangaroo Pockets */}
          <path d="M17 32 H22 V41 H17 Z M26 32 H31 V41 H26 Z" fill="#7F1D1D" />
          {/* Hood Drawstrings */}
          <path d="M20 12 C20 17 19 19 19 22 M28 12 C28 17 29 19 29 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'pdh':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="currentColor" {...props}>
          {/* Formal Shirt Body */}
          <path d="M16 8 L24 13 L32 8 L43 15 L38 22 L33 19 L33 43 L15 43 L15 19 L10 22 L5 15 Z" />
          {/* Dual Pointed Collars */}
          <path d="M16 8 L24 14 L20 18 L14 10 Z" fill="#7F1D1D" />
          <path d="M32 8 L24 14 L28 18 L34 10 Z" fill="#7F1D1D" />
          {/* Center Button Strip */}
          <line x1="24" y1="14" x2="24" y2="43" stroke="#7F1D1D" strokeWidth="2.5" />
          <circle cx="24" cy="22" r="1.1" fill="white" />
          <circle cx="24" cy="28" r="1.1" fill="white" />
          <circle cx="24" cy="34" r="1.1" fill="white" />
          <circle cx="24" cy="40" r="1.1" fill="white" />
          {/* Flapped Chest Pockets (PDH Signature) */}
          <path d="M17 23 H21 V29 H17 Z M27 23 H31 V29 H27 Z" fill="#7F1D1D" />
          <circle cx="19" cy="25" r="0.8" fill="white" />
          <circle cx="29" cy="25" r="0.8" fill="white" />
          {/* Shoulder Epaulets */}
          <path d="M11 12 L15 15 M37 12 L33 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'topi':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="currentColor" {...props}>
          {/* Structured Crown */}
          <path d="M9 28 C9 15 19 10 29 10 C38 10 42 16 42 28 Z" />
          {/* Curved Visor Brim */}
          <path d="M6 28 C10 27 26 27 34 28 C39 29 45 32 46 36 C34 38 14 38 4 33 C3 31 4 29 6 28 Z" fill="#7F1D1D" />
          {/* Top Button Squircle */}
          <ellipse cx="28" cy="10" rx="3.5" ry="2.2" fill="#FFFFFF" />
          {/* Panel Stitching */}
          <path d="M28 10 C28 17 24 24 22 28 M28 10 C31 16 34 22 36 28" stroke="white" strokeWidth="1.4" fill="none" opacity="0.6" />
          {/* Embroidered Eyelets */}
          <circle cx="18" cy="19" r="1.2" fill="white" opacity="0.75" />
          <circle cx="35" cy="19" r="1.2" fill="white" opacity="0.75" />
        </svg>
      );

    case 'id_card':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="currentColor" {...props}>
          {/* Lanyard Strap Loop */}
          <path d="M19 4 L24 16 L29 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Swivel Clip Hook */}
          <rect x="22" y="15" width="4" height="4" rx="1" fill="#7F1D1D" />
          {/* PVC ID Badge */}
          <rect x="13" y="19" width="22" height="26" rx="3" />
          {/* Lanyard Slot Cutout */}
          <rect x="21" y="21" width="6" height="2" rx="1" fill="white" />
          {/* Photo Box */}
          <rect x="16" y="25" width="8" height="9" rx="1.5" fill="white" />
          <circle cx="20" cy="28" r="2" fill="#B91C1C" />
          <path d="M17.5 33 C17.5 31 19 30.5 20 30.5 C21 30.5 22.5 31 22.5 33 Z" fill="#B91C1C" />
          {/* Info Lines */}
          <rect x="26" y="26" width="6" height="2" rx="0.5" fill="white" />
          <rect x="26" y="30" width="6" height="2" rx="0.5" fill="white" />
          <rect x="16" y="37" width="16" height="2" rx="0.5" fill="white" opacity="0.7" />
          <rect x="16" y="41" width="11" height="1.5" rx="0.5" fill="white" opacity="0.5" />
        </svg>
      );

    case 'slempang':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="currentColor" {...props}>
          {/* Draped Velvet Sash Curve */}
          <path d="M12 6 C20 4 36 10 39 20 C41 27 36 34 28 38 L25 43 L19 43 L21 38 C14 36 8 28 9 20 C10 12 11 8 12 6 Z" />
          {/* Inner Ribbon Fold */}
          <path d="M16 10 C22 8 32 12 34 20 C36 26 31 32 24 34 L18 10 Z" fill="#7F1D1D" />
          {/* Graduation Star Insignia */}
          <polygon points="25,18 26.5,22 31,22.5 27.5,25.5 28.5,30 25,27.5 21.5,30 22.5,25.5 19,22.5 23.5,22" fill="white" />
          {/* Gold Tassels at Bottom */}
          <line x1="20" y1="43" x2="20" y2="47" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="22" y1="43" x2="22" y2="47" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="24" y1="43" x2="24" y2="47" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'buku':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="currentColor" {...props}>
          {/* Hardcover Book Body */}
          <rect x="11" y="6" width="26" height="36" rx="3" />
          {/* Spine Binding */}
          <rect x="11" y="6" width="6" height="36" rx="1.5" fill="#7F1D1D" />
          {/* Ribbon Bookmark */}
          <path d="M22 6 L22 22 L25 19 L28 22 L28 6 Z" fill="white" />
          {/* Gilded Page Edges */}
          <rect x="35" y="9" width="2" height="30" rx="0.5" fill="white" opacity="0.4" />
          {/* Embossed Cover Emblem */}
          <circle cx="25" cy="30" r="4.5" fill="#7F1D1D" />
          <circle cx="25" cy="30" r="2.5" fill="white" />
          <rect x="19" y="37" width="12" height="1.8" rx="0.9" fill="white" opacity="0.4" />
        </svg>
      );

    case 'pin':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="currentColor" {...props}>
          {/* Hanging Ribbon Tails */}
          <path d="M19 5 L16 19 L24 15 L32 19 L29 5 Z" fill="#7F1D1D" />
          {/* Round Pin Badge */}
          <circle cx="24" cy="28" r="16" />
          {/* Inner Accent Ring */}
          <circle cx="24" cy="28" r="12.5" fill="#7F1D1D" />
          {/* Star Medal Insignia */}
          <polygon points="24,19 26.5,25 33,25.5 28,30 29.5,36 24,32.5 18.5,36 20,30 15,25.5 21.5,25" fill="white" />
          {/* Curved Gloss Highlight */}
          <path d="M15 21 C20 17 28 17 33 21 C31 19 25 18 19 20 Z" fill="white" opacity="0.45" />
        </svg>
      );

    case 'merchandise':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="currentColor" {...props}>
          {/* Ribbon Bow on top */}
          <path d="M19 12 C16 7 21 6 23 10 C23 11 23 12 24 13 C25 12 25 11 25 10 C27 6 32 7 29 12 C27 15 24 14 24 14 C24 14 21 15 19 12 Z" fill="#7F1D1D" />
          {/* Box Lid */}
          <rect x="7" y="14" width="34" height="8" rx="2" />
          {/* Box Base */}
          <rect x="10" y="22" width="28" height="20" rx="1.5" />
          {/* Center Vertical Ribbon */}
          <rect x="22" y="14" width="4" height="28" fill="white" />
          {/* Horizontal Ribbon on Lid */}
          <rect x="7" y="17" width="34" height="2.5" fill="white" opacity="0.3" />
        </svg>
      );

    case 'banner':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="currentColor" {...props}>
          {/* Vertical Flag/Banner Pole */}
          <rect x="8" y="5" width="4" height="38" rx="1.5" />
          <circle cx="10" cy="5" r="2.5" fill="#7F1D1D" />
          {/* Banner Canvas */}
          <path d="M12 8 C22 5 28 12 38 9 L38 27 C28 30 22 23 12 26 Z" />
          {/* Mountain & Sun graphic inside banner */}
          <polygon points="18,22 24,15 29,21 34,17 36,24 14,24" fill="white" opacity="0.4" />
          <circle cx="20" cy="13" r="2.2" fill="white" />
          {/* Base Stand Foot */}
          <path d="M5 43 H15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 48 48" className={className} fill="currentColor" {...props}>
          <circle cx="24" cy="24" r="18" />
          <circle cx="24" cy="24" r="10" fill="white" />
        </svg>
      );
  }
}

