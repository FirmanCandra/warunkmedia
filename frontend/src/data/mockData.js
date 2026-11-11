export const PRODUCTS = [
  // 1. Divisi Konveksi (Apparel & Garment)
  {
    id: 'kaos',
    shortName: 'Kaos',
    name: 'Kaos & Polo Shirt',
    desc: 'Cotton Combed 24s/30s Jet Black & Lacoste CVC. Sablon Plastisol high density & cetak DTF tahan lama.',
    highlight: 'Sablon Plastisol & DTF',
    material: 'Cotton Combed 24s/30s',
    badge: 'Terlaris',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    icon: 'Shirt',
    division: 'konveksi'
  },
  {
    id: 'jaket',
    shortName: 'Jaket',
    name: 'Jaket & Hoodie Komunitas',
    desc: 'Bahan Fleece tebal berbulu lembut, Taslan Milky waterproof & Parasut. Bordir komputer dada dan punggung.',
    highlight: 'Bordir Komputer & YKK',
    material: 'Taslan Milky & Fleece Tebal',
    badge: 'Komunitas',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    icon: 'Layers',
    division: 'konveksi'
  },
  {
    id: 'pdh',
    shortName: 'PDH',
    name: 'Kemeja PDH & Korsa',
    desc: 'Nagata Drill & American Drill original. Pola slim/regular fit, kancing tersembunyi dan bordir nama rapi.',
    highlight: 'Bordir 3 Titik Presisi',
    material: 'Nagata Drill Original',
    badge: 'Organisasi',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80',
    icon: 'Briefcase',
    division: 'konveksi'
  },
  {
    id: 'topi',
    shortName: 'Topi',
    name: 'Topi & Bucket Hat',
    desc: 'Topi baseball, snapback, trucker & bucket hat. Bordir timbul 3D dan jahitan rantai kokoh.',
    highlight: 'Bordir 3D Timbul',
    material: 'Twill Rafel & Drill',
    badge: 'Custom',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
    icon: 'HardHat',
    division: 'konveksi'
  },
  // 2. Divisi Merchandise & Percetakan (Sesuai Bio Resmi IG Warunk Media)
  {
    id: 'id_card',
    shortName: 'ID Card',
    name: 'ID Card & Tali Lanyard',
    desc: 'Kartu PVC tebal standar ATM tahan air anti pudar + tali lanyard tisu sublimasi printing full color dua sisi.',
    highlight: 'Sublim Printing Full Color',
    material: 'PVC ATM & Tali Tisu Halus',
    badge: 'Panitia Event',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    icon: 'CreditCard',
    division: 'merchandise'
  },
  {
    id: 'slempang',
    shortName: 'Slempang',
    name: 'Slempang Wisuda Eksklusif',
    desc: 'Kain bludru tebal premium bertekstur mewah. Bordir nama benang emas/perak berkilau dengan renda rumbai elegan.',
    highlight: 'Bludru Bordir Emas Mewah',
    material: 'Bludru Premium & Renda Rumbai',
    badge: 'Wisuda',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
    icon: 'Award',
    division: 'merchandise'
  },
  {
    id: 'buku',
    shortName: 'Buku',
    name: 'Buku Tahunan & Agenda',
    desc: 'Buku tahunan sekolah dan agenda eksklusif. Cover tebal board 30, jilid jahit benang dan lem panas tahan banting.',
    highlight: 'Hardcover & Spot UV',
    material: 'Art Paper 150gr Full Color',
    badge: 'Edisi Lux',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    icon: 'BookOpen',
    division: 'percetakan'
  },
  {
    id: 'pin',
    shortName: 'Pin',
    name: 'Pin & Gantungan Kunci',
    desc: 'Pin peniti laminasi doff/glossy dan ganci akrilik laser-cut dua sisi anti gores. Cocok untuk merchandise event.',
    highlight: 'Akrilik Laser Cut Presisi',
    material: 'Akrilik Bening & Peniti Awet',
    badge: 'Souvenir',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    icon: 'Sparkles',
    division: 'merchandise'
  },
  {
    id: 'merchandise',
    shortName: 'Merchandise',
    name: 'Merchandise & Seminar Kit',
    desc: 'Paket seminar kit lengkap: tote bag kanvas tebal, pouch serbaguna, mug keramik printing, dan tumbler grafir.',
    highlight: 'Custom Logo Cetak/Grafir',
    material: 'Kanvas Tebal & Keramik',
    badge: 'Seminar Kit',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    icon: 'Package',
    division: 'merchandise'
  },
];

export const WORKFLOW_CONFIG = {
  apparel: {
    type: 'apparel',
    name: 'Alur Produksi Konveksi',
    stages: [
      { id: 'desain', name: 'Desain & Mockup', desc: 'ACC pola desain dan penentuan detail spesifikasi.' },
      { id: 'potong', name: 'Potong Kain', desc: 'Pemotongan bahan kain sesuai pola size chart.' },
      { id: 'sablon_bordir', name: 'Sablon / Bordir', desc: 'Pengerjaan sablon manual/DTF atau bordir komputer.' },
      { id: 'jahit', name: 'Jahit & Obras', desc: 'Perakitan potongan kain menjadi pakaian jadi.' },
      { id: 'qc_packing', name: 'Finishing & QC Packing', desc: 'Pembersihan sisa benang, setrika uap, dan plastik pelindung.' },
      { id: 'selesai', name: 'Selesai / Siap Kirim', desc: 'Pesanan siap diambil di workshop atau dikirim via ekspedisi.' },
    ]
  },
  merchandise: {
    type: 'merchandise',
    name: 'Alur Produksi Merchandise & Souvenir',
    stages: [
      { id: 'desain', name: 'Desain & Layout Cetak', desc: 'Pemeriksaan resolusi artwork, font bordir, dan approval client.' },
      { id: 'cetak_bordir', name: 'Cetak / Bordir', desc: 'Proses cetak UV, sublimasi lanyard, atau bordir komputer slempang.' },
      { id: 'perakitan', name: 'Finishing & Perakitan', desc: 'Pemasangan kaitan, stopper, jepit pin, atau list renda rumbai.' },
      { id: 'qc_packing', name: 'Quality Control & Packing', desc: 'Pengecekan kualitas cetak, kelengkapan item, dan pengemasan.' },
      { id: 'selesai', name: 'Selesai / Siap Kirim', desc: 'Pesanan selesai dan siap diambil atau dikirim.' },
    ]
  },
  percetakan: {
    type: 'percetakan',
    name: 'Alur Produksi Percetakan & Buku',
    stages: [
      { id: 'desain', name: 'Layout & Proofing', desc: 'Penyusunan tata letak halaman dan proof cover dari client.' },
      { id: 'cetak', name: 'Cetak Cover & Isi', desc: 'Proses cetak digital/offset dan laminasi cover (Doff/Glossy/UV).' },
      { id: 'jilid', name: 'Jilid / Binding & Finishing', desc: 'Proses penjilidan hard cover, lem panas, atau jahit kawat.' },
      { id: 'qc_packing', name: 'QC & Pengemasan', desc: 'Pemeriksaan kerapian potong, kelurusan buku, dan shrink wrapping.' },
      { id: 'selesai', name: 'Selesai / Siap Kirim', desc: 'Buku siap diambil atau dikirim ke pemesan.' },
    ]
  }
};

export const getWorkflowForCategory = (category = '') => {
  const cat = category.toLowerCase();
  if (cat.includes('buku') || cat.includes('agenda') || cat.includes('cetak') || cat.includes('blocknote')) {
    return WORKFLOW_CONFIG.percetakan;
  }
  if (cat.includes('id card') || cat.includes('lanyard') || cat.includes('slempang') || cat.includes('pin') || cat.includes('merchandise') || cat.includes('marchandise')) {
    return WORKFLOW_CONFIG.merchandise;
  }
  return WORKFLOW_CONFIG.apparel;
};

export const PRODUCTION_STAGES = WORKFLOW_CONFIG.apparel.stages;

export const WORKFLOW_STEPS = [
  { step: '1', title: '1. Pesan', desc: 'Hubungi owner via WhatsApp, sepakati desain, bahan, jumlah, dan deadline.' },
  { step: '2', title: '2. Produksi', desc: 'Tim Warunk Media memproses dan owner rutin memperbarui foto bukti progres di sistem.' },
  { step: '3', title: '3. Pantau', desc: 'Cek status dan foto pengerjaan kapan saja dengan memasukkan kode pesanan.' },
  { step: '4', title: '4. Selesai', desc: 'Produk lolos QC, siap diambil di workshop Semarang atau dikirim via ekspedisi.' },
];

export const INITIAL_CUSTOMERS = [
  { id: 1, name: 'Firman Candra', phone: '0812-3456-7890', email: 'firman@warunkmedia.com', totalOrders: 2 },
  { id: 2, name: 'Komunitas Motor Semarang', phone: '0821-9876-5432', email: 'bikers.smg@gmail.com', totalOrders: 1 },
  { id: 3, name: 'BEM Universitas Diponegoro', phone: '0857-1234-5678', email: 'bem.undip@gmail.com', totalOrders: 1 },
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
  },
  {
    id: 'WM-0021',
    customerName: 'BEM Universitas Diponegoro',
    customerPhone: '0857-1234-5678',
    productName: 'Tali Lanyard & ID Card PVC Panitia',
    category: 'ID Card & Lanyard',
    workflowType: 'merchandise',
    quantity: 120,
    orderDate: '2026-11-04',
    deadline: '2026-11-18',
    currentStageIndex: 1, // Cetak / Bordir
    statusText: 'Cetak / Bordir',
    statusVariant: 'progress',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    timeline: [
      {
        stageId: 'desain',
        stageName: 'Desain & Layout Cetak',
        date: '2026-11-04 11:00',
        note: 'Layout cetak kartu PVC dan proof warna tali lanyard disetujui panitia.',
        photos: ['https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80'],
        completed: true,
      },
      {
        stageId: 'cetak_bordir',
        stageName: 'Cetak Lanyard & PVC (Sedang Berjalan)',
        date: '2026-11-09 14:00',
        note: 'Proses cetak sublimasi tali lanyard 2cm dan cetak UV kartu PVC 120 pcs.',
        photos: ['https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80'],
        completed: false,
        current: true,
      },
      {
        stageId: 'perakitan',
        stageName: 'Finishing & Perakitan',
        date: null,
        note: 'Pemasangan kaitan nikel oval, stopper putar hitam, dan casing mika.',
        photos: [],
        completed: false,
      },
      {
        stageId: 'qc_packing',
        stageName: 'Quality Control & Packing',
        date: null,
        note: 'Pengecekan kelengkapan nama, foto panitia, dan packing plastik.',
        photos: [],
        completed: false,
      },
      {
        stageId: 'selesai',
        stageName: 'Selesai / Siap Kirim',
        date: null,
        note: 'Siap diambil di workshop Semarang atau dikirim ke kampus.',
        photos: [],
        completed: false,
      },
    ],
    worksheet: {
      orderNumber: 'WM-0021',
      clientName: 'BEM Universitas Diponegoro',
      contact: '0857-1234-5678',
      itemType: 'ID Card PVC + Tali Lanyard Sublim',
      fabric: 'Tali Tisue 2cm + Kartu PVC Standar ATM (Tebal 0.76mm)',
      printType: 'Sublimasi Full Color 2 Sisi + Cetak UV Kartu',
      customSpecs: [
        { label: 'Lebar & Bahan Tali', value: '2 cm Tissue Super Halus' },
        { label: 'Aksesoris Tali', value: 'Kait Nikel Oval + Stopper Putar' },
        { label: 'Bahan Kartu', value: 'PVC Card Tebal 0.76 mm Glossy' },
        { label: 'Wadah / Casing', value: 'Cardholder Mika Bening Transparan' },
      ],
      notes: 'Format file PDF/CorelDraw siap cetak, nama dan foto panitia urut abjad.',
      deadline: '2026-11-18',
    },
    invoice: {
      invoiceNumber: 'INV/2026/WM/11-021',
      date: '2026-11-04',
      items: [
        { name: 'Tali Lanyard 2cm Sublimasi Full Color + Stopper', qty: 120, price: 12000, total: 1440000 },
        { name: 'Kartu ID Card PVC Tebal + Case Transparan', qty: 120, price: 6000, total: 720000 },
      ],
      total: 2160000,
      downPayment: 1100000,
      balance: 1060000,
      status: 'DP Diterima',
      paymentNote: 'Pelunasan sisa tagihan saat pesanan siap diambil.',
    },
  },
  {
    id: 'WM-0024',
    customerName: 'Komunitas Wisudawan Semarang',
    customerPhone: '0821-9876-5432',
    productName: 'Slempang Wisuda Bludru Bordir Emas',
    category: 'Slempang Wisuda',
    workflowType: 'merchandise',
    quantity: 35,
    orderDate: '2026-11-05',
    deadline: '2026-11-22',
    currentStageIndex: 2, // Finishing & Perakitan
    statusText: 'Finishing & Perakitan',
    statusVariant: 'progress',
    thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80',
    timeline: [
      {
        stageId: 'desain',
        stageName: 'Desain & Layout Font',
        date: '2026-11-05 15:00',
        note: 'Daftar nama wisudawan dan penulisan gelar resmi dikonfirmasi client.',
        photos: ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80'],
        completed: true,
      },
      {
        stageId: 'cetak_bordir',
        stageName: 'Bordir Komputer Nama & Gelar',
        date: '2026-11-08 17:00',
        note: 'Bordir komputer benang emas metalik mengkilap selesai untuk 35 nama.',
        photos: ['https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=800&auto=format&fit=crop&q=80'],
        completed: true,
      },
      {
        stageId: 'perakitan',
        stageName: 'Pasang List Rumbai & Furing (Sedang Berjalan)',
        date: '2026-11-10 10:30',
        note: 'Pemasangan lapisan furing belakang dan list rumbai emas keliling.',
        photos: [],
        completed: false,
        current: true,
      },
      {
        stageId: 'qc_packing',
        stageName: 'Quality Control & Packing',
        date: null,
        note: 'Pembersihan sisa benang, setrika uap, dan bungkus plastik satu per satu.',
        photos: [],
        completed: false,
      },
      {
        stageId: 'selesai',
        stageName: 'Selesai / Siap Kirim',
        date: null,
        note: 'Pesanan siap diambil di workshop Warunk Media Semarang.',
        photos: [],
        completed: false,
      },
    ],
    worksheet: {
      orderNumber: 'WM-0024',
      clientName: 'Komunitas Wisudawan Semarang',
      contact: '0821-9876-5432',
      itemType: 'Slempang Wisuda Custom',
      fabric: 'Kain Bludru Premium Hitam Pekat 2 Lapis + Perekat Velcro',
      printType: 'Bordir Komputer Benang Emas Metalik Mengkilap',
      customSpecs: [
        { label: 'Bahan Dasar', value: 'Bludru Premium Hitam (Tebal & Halus)' },
        { label: 'Pilihan Benang', value: 'Benang Emas Metalik Mengkilap' },
        { label: 'Model List', value: 'Rumbai Emas (Gold Tassel) Keliling' },
        { label: 'Ukuran Panjang', value: '175 cm x Lebar 12 cm (Standar Wisuda)' },
      ],
      notes: 'Perekat velcro terpasang rapi, setiap slempang dikemas plastik zipper terpisah.',
      deadline: '2026-11-22',
    },
    invoice: {
      invoiceNumber: 'INV/2026/WM/11-024',
      date: '2026-11-05',
      items: [
        { name: 'Slempang Wisuda Bludru Bordir Emas 2 Sisi + Rumbai', qty: 35, price: 45000, total: 1575000 }
      ],
      total: 1575000,
      downPayment: 1000000,
      balance: 575000,
      status: 'DP Diterima',
      paymentNote: 'Sisa tagihan dibayar tunai / transfer saat serah terima barang.',
    },
  },
  {
    id: 'WM-0028',
    customerName: 'SMK Negeri 7 Semarang',
    customerPhone: '0813-2233-4455',
    productName: 'Buku Tahunan Sekolah (Yearbook) & Agenda',
    category: 'Buku & Agenda',
    workflowType: 'percetakan',
    quantity: 80,
    orderDate: '2026-11-07',
    deadline: '2026-12-10',
    currentStageIndex: 0, // Layout & Proofing
    statusText: 'Layout & Proofing',
    statusVariant: 'waiting',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    timeline: [
      {
        stageId: 'desain',
        stageName: 'Layout & Proofing (Sedang Berjalan)',
        date: '2026-11-08 14:00',
        note: 'Penyusunan grid layout 96 halaman dan proofing warna cover hardcover di-ACC tim guru.',
        photos: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'],
        completed: false,
        current: true,
      },
      {
        stageId: 'cetak',
        stageName: 'Cetak Cover & Isi',
        date: null,
        note: 'Cetak digital offset Art Paper 150gr full color dan laminasi cover doff + spot UV.',
        photos: [],
        completed: false,
      },
      {
        stageId: 'jilid',
        stageName: 'Jilid / Binding & Finishing',
        date: null,
        note: 'Penjilidan hardcover mewah jahit benang dan lem panas tahan banting.',
        photos: [],
        completed: false,
      },
      {
        stageId: 'qc_packing',
        stageName: 'QC & Pengemasan',
        date: null,
        note: 'Pengecekan kelurusan potong, kelengkapan halaman, dan shrink wrap plastik.',
        photos: [],
        completed: false,
      },
      {
        stageId: 'selesai',
        stageName: 'Selesai / Siap Kirim',
        date: null,
        note: 'Pengiriman langsung ke sekolah atau workshop Warunk Media.',
        photos: [],
        completed: false,
      },
    ],
    worksheet: {
      orderNumber: 'WM-0028',
      clientName: 'SMK Negeri 7 Semarang',
      contact: '0813-2233-4455',
      itemType: 'Buku Tahunan Hardcover Eksklusif',
      fabric: 'Cover Board 30 + Kertas Art Paper 150gr',
      printType: 'Digital Offset Full Color + Laminasi Doff & Spot UV',
      customSpecs: [
        { label: 'Ukuran Buku', value: 'A4 (21 x 29.7 cm)' },
        { label: 'Jumlah Halaman', value: '96 Halaman Full Color' },
        { label: 'Finishing Cover', value: 'Hardcover Tebal + Laminasi Doff + Spot UV' },
        { label: 'Teknik Jilid', value: 'Jahit Benang + Lem Panas (Hard Binding)' },
      ],
      notes: 'Dummy buku siap proofing dalam 2 hari kerja sebelum cetak massal.',
      deadline: '2026-12-10',
    },
    invoice: {
      invoiceNumber: 'INV/2026/WM/11-028',
      date: '2026-11-07',
      items: [
        { name: 'Buku Tahunan Hardcover Eksklusif 96 Hal Full Color', qty: 80, price: 95000, total: 7600000 }
      ],
      total: 7600000,
      downPayment: 3800000,
      balance: 3800000,
      status: 'DP 50% Diterima',
      paymentNote: 'Pelunasan dilakukan saat serah terima buku selesai.',
    },
  }
];

export const PRODUCTION_GALLERY = [
  { id: 1, title: 'Kaos Sablon Plastisol Event Semarang', category: 'Kaos & Polo', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80' },
  { id: 2, title: 'Jaket Bomber Taslan Komunitas Motor', category: 'Jaket & Hoodie', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80' },
  { id: 3, title: 'Kemeja PDH Nagata Drill Kampus Undip', category: 'PDH / Kemeja', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80' },
  { id: 4, title: 'Tali Lanyard & ID Card PVC Panitia', category: 'ID Card & Lanyard', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80' },
  { id: 5, title: 'Slempang Wisuda Bludru Bordir Emas', category: 'Slempang Wisuda', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80' },
  { id: 6, title: 'Buku Tahunan Hardcover & Agenda', category: 'Buku & Agenda', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80' },
  { id: 7, title: 'Pin Peniti & Gantungan Kunci Souvenir', category: 'Pin & Ganci', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80' },
  { id: 8, title: 'Topi Snapback Custom Bordir Timbul', category: 'Topi & Bucket', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80' },
];

