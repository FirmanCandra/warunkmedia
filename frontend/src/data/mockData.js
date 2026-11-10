export const PRODUCTS = [
  { id: 'kaos', name: 'Kaos & Polo', desc: 'Cotton combed 24s/30s, lacoste cvc, sablon DTF & plastisol.', icon: 'Shirt' },
  { id: 'jaket', name: 'Jaket & Hoodie', desc: 'Fleece, parasut taslan, drill, bordir komputer rapi.', icon: 'Layers' },
  { id: 'pdh', name: 'PDH / Kemeja', desc: 'American drill, nagata drill, kemeja angkatan & instansi.', icon: 'Briefcase' },
  { id: 'topi', name: 'Topi & Bucket', desc: 'Topi baseball, snapback, bucket hat custom bordir.', icon: 'HardHat' },
  { id: 'merchandise', name: 'Merchandise', desc: 'Tote bag kanvas, pouch, lanyard, gantungan kunci custom.', icon: 'Package' },
];

export const PRODUCTION_STAGES = [
  { id: 'desain', name: 'Desain & Mockup', desc: 'Penyusunan pola dan ACC desain dari client.' },
  { id: 'potong', name: 'Potong Kain', desc: 'Pemotongan bahan sesuai pola ukuran yang disepakati.' },
  { id: 'sablon_bordir', name: 'Sablon / Bordir', desc: 'Proses cetak sablon manual/DTF atau bordir komputer.' },
  { id: 'jahit', name: 'Jahit', desc: 'Perakitan potongan kain menjadi produk jadi.' },
  { id: 'qc_packing', name: 'QC & Packing', desc: 'Pemeriksaan kualitas jahitan, pembersihan benang, dan pengemasan.' },
  { id: 'selesai', name: 'Selesai / Dikirim', desc: 'Pesanan siap diambil di workshop atau dikirim ke alamat customer.' },
];

export const WORKFLOW_STEPS = [
  { step: '1', title: '1. Pesan', desc: 'Hubungi owner via WhatsApp, sepakati desain, bahan, jumlah, dan deadline.' },
  { step: '2', title: '2. Produksi', desc: 'Tim Warunk Media memproses dan owner rutin memperbarui foto bukti progres di sistem.' },
  { step: '3', title: '3. Pantau', desc: 'Cek status dan foto pengerjaan kapan saja dengan memasukkan kode pesanan.' },
  { step: '4', title: '4. Selesai', desc: 'Produk lolos QC, siap diambil di workshop Semarang atau dikirim via ekspedisi.' },
];

export const INITIAL_ORDERS = [
  {
    id: 'WM-0012',
    customerName: 'Firman Candra',
    customerPhone: '081234567890',
    productName: 'Kaos Angkatan 2026',
    category: 'Kaos & Polo',
    quantity: 40,
    orderDate: '2026-11-01',
    deadline: '2026-11-20',
    currentStageIndex: 2, // 0-based: sablon_bordir
    statusText: 'Sablon/bordir',
    statusVariant: 'progress', // 'progress', 'completed', 'waiting'
    thumbnail: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    timeline: [
      {
        stageId: 'desain',
        stageName: 'Desain/mockup',
        date: '2026-11-02 10:30',
        note: 'Mockup kaos warna hitam kombinasi merah disetujui client via WhatsApp.',
        photos: [
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80'
        ],
        completed: true
      },
      {
        stageId: 'potong',
        stageName: 'Potong kain',
        date: '2026-11-05 14:15',
        note: 'Bahan Cotton Combed 24s Premium hitam 40 pcs selesai dipotong sesuai rincian ukuran (S, M, L, XL).',
        photos: [
          'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80'
        ],
        completed: true
      },
      {
        stageId: 'sablon_bordir',
        stageName: 'Sablon/bordir (sedang berjalan)',
        date: '2026-11-09 11:00',
        note: 'Pencetakan sablon plastisol dada depan dan punggung belakang sedang berjalan di meja sablon.',
        photos: [
          'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80'
        ],
        completed: false,
        current: true
      },
      {
        stageId: 'jahit',
        stageName: 'Jahit',
        date: null,
        note: 'Menunggu proses sablon selesai.',
        photos: [],
        completed: false
      },
      {
        stageId: 'qc_packing',
        stageName: 'QC & packing',
        date: null,
        note: 'Pengecekan ukuran, kerapian jahitan, dan pengemasan plastik.',
        photos: [],
        completed: false
      },
      {
        stageId: 'selesai',
        stageName: 'Selesai / Siap Ambil',
        date: null,
        note: 'Pengambilan di workshop Warunk Media Semarang atau pengiriman.',
        photos: [],
        completed: false
      }
    ],
    worksheet: {
      orderNumber: 'WM-0012',
      clientName: 'Firman Candra',
      contact: '0812-3456-7890',
      itemType: 'Kaos Oblong Pendek',
      fabric: 'Cotton Combed 24s Jet Black Reaktif',
      printType: 'Sablon Plastisol High Density 2 Sisi',
      sizes: { S: 5, M: 15, L: 14, XL: 6 },
      notes: 'Jahitan rantai standar distro, label woven Warunk Media di leher.',
      deadline: '2026-11-20'
    },
    invoice: {
      invoiceNumber: 'INV/2026/WM/11-012',
      date: '2026-11-01',
      items: [
        { name: 'Kaos Cotton Combed 24s + Sablon Plastisol', qty: 40, price: 65000, total: 2600000 },
        { name: 'Biaya Setting Film Sablon (Promo)', qty: 1, price: 0, total: 0 }
      ],
      total: 2600000,
      downPayment: 1300000,
      balance: 1300000,
      status: 'DP 50% Lunas',
      paymentNote: 'Pelunasan dilakukan saat pesanan selesai sebelum diambil atau dikirim.'
    }
  },
  {
    id: 'WM-0009',
    customerName: 'Firman Candra',
    customerPhone: '081234567890',
    productName: 'Jaket Komunitas Semarang',
    category: 'Jaket & Hoodie',
    quantity: 25,
    orderDate: '2026-10-15',
    deadline: '2026-11-02',
    currentStageIndex: 5,
    statusText: 'Selesai',
    statusVariant: 'completed',
    thumbnail: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
    timeline: [
      { stageId: 'desain', stageName: 'Desain/mockup', date: '2026-10-16', note: 'Mockup disetujui.', photos: [], completed: true },
      { stageId: 'potong', stageName: 'Potong kain', date: '2026-10-19', note: 'Bahan Taslan milky dipotong.', photos: [], completed: true },
      { stageId: 'sablon_bordir', stageName: 'Bordir', date: '2026-10-23', note: 'Bordir komputer dada & punggung rapi.', photos: [], completed: true },
      { stageId: 'jahit', stageName: 'Jahit', date: '2026-10-27', note: 'Jahit furing dan ritsleting selesai.', photos: [], completed: true },
      { stageId: 'qc_packing', stageName: 'QC & packing', date: '2026-10-31', note: 'Lolos uji QC 25 pcs.', photos: [], completed: true },
      { stageId: 'selesai', stageName: 'Selesai', date: '2026-11-02', note: 'Pesanan telah diambil oleh customer.', photos: [], completed: true }
    ],
    worksheet: {
      orderNumber: 'WM-0009',
      clientName: 'Firman Candra',
      contact: '0812-3456-7890',
      itemType: 'Jaket Bomber Taslan',
      fabric: 'Taslan Milky Waterproof + Furing Asahi',
      printType: 'Bordir Komputer Presisi Tinggi',
      sizes: { M: 10, L: 10, XL: 5 },
      notes: 'Ritsleting YKK, rib leher dan lengan elastis tebal.',
      deadline: '2026-11-02'
    },
    invoice: {
      invoiceNumber: 'INV/2026/WM/10-009',
      date: '2026-10-15',
      items: [
        { name: 'Jaket Bomber Taslan + Bordir Komputer', qty: 25, price: 145000, total: 3625000 }
      ],
      total: 3625000,
      downPayment: 3625000,
      balance: 0,
      status: 'Lunas',
      paymentNote: 'Lunas penuh saat pengambilan pesanan.'
    }
  },
  {
    id: 'WM-0015',
    customerName: 'Budi Santoso',
    customerPhone: '081398765432',
    productName: 'Kemeja PDH Angkatan',
    category: 'PDH / Kemeja',
    quantity: 50,
    orderDate: '2026-11-08',
    deadline: '2026-11-28',
    currentStageIndex: 0,
    statusText: 'Desain/mockup',
    statusVariant: 'waiting',
    thumbnail: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80',
    timeline: [
      { stageId: 'desain', stageName: 'Desain/mockup', date: '2026-11-09', note: 'Menunggu konfirmasi pemilihan warna bahan Nagata Drill.', photos: [], completed: false, current: true },
      { stageId: 'potong', stageName: 'Potong kain', date: null, note: '', photos: [], completed: false },
      { stageId: 'sablon_bordir', stageName: 'Bordir', date: null, note: '', photos: [], completed: false },
      { stageId: 'jahit', stageName: 'Jahit', date: null, note: '', photos: [], completed: false },
      { stageId: 'qc_packing', stageName: 'QC & packing', date: null, note: '', photos: [], completed: false },
      { stageId: 'selesai', stageName: 'Selesai', date: null, note: '', photos: [], completed: false }
    ],
    worksheet: {
      orderNumber: 'WM-0015',
      clientName: 'Budi Santoso',
      contact: '0813-9876-5432',
      itemType: 'Kemeja PDH Lengan Panjang',
      fabric: 'Nagata Drill Original',
      printType: 'Bordir Komputer 3 Titik',
      sizes: { S: 10, M: 20, L: 15, XL: 5 },
      notes: 'Kancing sembunyi, bordir nama personal di dada kanan.',
      deadline: '2026-11-28'
    },
    invoice: {
      invoiceNumber: 'INV/2026/WM/11-015',
      date: '2026-11-08',
      items: [
        { name: 'Kemeja PDH Nagata Drill + Bordir Nama', qty: 50, price: 120000, total: 6000000 }
      ],
      total: 6000000,
      downPayment: 3000000,
      balance: 3000000,
      status: 'DP 50% Diterima',
      paymentNote: 'Sisa pembayaran dilunasi saat pengiriman.'
    }
  }
];

export const PRODUCTION_GALLERY = [
  { id: 1, title: 'Kaos Sablon Plastisol Event Semarang', category: 'Kaos & Polo', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80' },
  { id: 2, title: 'Jaket Bomber Taslan Komunitas Motor', category: 'Jaket & Hoodie', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80' },
  { id: 3, title: 'Kemeja PDH Nagata Drill Kampus', category: 'PDH / Kemeja', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80' },
  { id: 4, title: 'Topi Snapback Custom Bordir Timbul', category: 'Topi & Bucket', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80' },
];

