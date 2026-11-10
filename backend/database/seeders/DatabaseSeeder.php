<?php

namespace Database\Seeders;

use App\Models\Invoice;
use App\Models\Order;
use App\Models\StageUpdate;
use App\Models\User;
use App\Models\Worksheet;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Users
        $owner = User::create([
            'name' => 'Owner Warunk Media',
            'email' => 'owner@warunkmedia.com',
            'password' => Hash::make('owner123'),
            'role' => 'admin',
            'phone' => '0812-3456-7890',
        ]);

        $customer1 = User::create([
            'name' => 'Firman Candra',
            'email' => 'firman@example.com',
            'password' => Hash::make('password123'),
            'role' => 'customer',
            'phone' => '0812-3456-7890',
        ]);

        $customer2 = User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@example.com',
            'password' => Hash::make('password123'),
            'role' => 'customer',
            'phone' => '0813-9876-5432',
        ]);

        // 2. Order WM-0012 (Sedang Berjalan - Sablon/Bordir)
        $order1 = Order::create([
            'order_code' => 'WM-0012',
            'user_id' => $customer1->id,
            'customer_name' => 'Firman Candra',
            'customer_phone' => '0812-3456-7890',
            'product_name' => 'Kaos Angkatan 2026',
            'category' => 'Kaos & Polo',
            'quantity' => 40,
            'order_date' => '2026-11-01',
            'deadline' => '2026-11-20',
            'current_stage' => 'sablon_bordir',
            'status_text' => 'Sablon/bordir',
            'status_variant' => 'progress',
            'thumbnail' => 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
            'notes' => 'Kaos reuni angkatan, bahan combed 24s hitam reaktif, sablon plastisol 2 sisi.',
        ]);

        $stages1 = [
            [
                'stage_id' => 'desain',
                'stage_name' => 'Desain/mockup',
                'notes' => 'Mockup kaos warna hitam kombinasi merah disetujui client via WhatsApp.',
                'photos' => ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80'],
                'completed' => true,
                'current' => false,
                'stage_date' => '2026-11-02 10:30:00',
            ],
            [
                'stage_id' => 'potong',
                'stage_name' => 'Potong kain',
                'notes' => 'Bahan Cotton Combed 24s Premium hitam 40 pcs selesai dipotong sesuai rincian ukuran.',
                'photos' => ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80'],
                'completed' => true,
                'current' => false,
                'stage_date' => '2026-11-05 14:15:00',
            ],
            [
                'stage_id' => 'sablon_bordir',
                'stage_name' => 'Sablon/bordir (sedang berjalan)',
                'notes' => 'Pencetakan sablon plastisol dada depan dan punggung belakang sedang berjalan di meja sablon.',
                'photos' => ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80'],
                'completed' => false,
                'current' => true,
                'stage_date' => '2026-11-09 11:00:00',
            ],
            [
                'stage_id' => 'jahit',
                'stage_name' => 'Jahit',
                'notes' => 'Menunggu proses sablon selesai.',
                'photos' => [],
                'completed' => false,
                'current' => false,
                'stage_date' => null,
            ],
            [
                'stage_id' => 'qc_packing',
                'stage_name' => 'QC & packing',
                'notes' => 'Pengecekan ukuran, kerapian jahitan, dan pengemasan plastik.',
                'photos' => [],
                'completed' => false,
                'current' => false,
                'stage_date' => null,
            ],
            [
                'stage_id' => 'selesai',
                'stage_name' => 'Selesai / Siap Ambil',
                'notes' => 'Pengambilan di workshop Warunk Media Semarang atau pengiriman.',
                'photos' => [],
                'completed' => false,
                'current' => false,
                'stage_date' => null,
            ],
        ];

        foreach ($stages1 as $s) {
            StageUpdate::create(array_merge($s, ['order_id' => $order1->id]));
        }

        Worksheet::create([
            'order_id' => $order1->id,
            'item_type' => 'Kaos Oblong Pendek',
            'fabric' => 'Cotton Combed 24s Jet Black Reaktif',
            'print_type' => 'Sablon Plastisol High Density 2 Sisi',
            'sizes' => ['S' => 5, 'M' => 15, 'L' => 14, 'XL' => 6],
            'notes' => 'Jahitan rantai standar distro, label woven Warunk Media di leher.',
            'is_approved' => true,
        ]);

        Invoice::create([
            'order_id' => $order1->id,
            'invoice_number' => 'INV/2026/WM/11-012',
            'invoice_date' => '2026-11-01',
            'items' => [
                ['name' => 'Kaos Cotton Combed 24s + Sablon Plastisol', 'qty' => 40, 'price' => 65000, 'total' => 2600000],
                ['name' => 'Biaya Setting Film Sablon (Promo)', 'qty' => 1, 'price' => 0, 'total' => 0],
            ],
            'total_amount' => 2600000,
            'down_payment' => 1300000,
            'balance' => 1300000,
            'payment_status' => 'DP 50% Lunas',
            'payment_note' => 'Pelunasan dilakukan saat pesanan selesai sebelum diambil atau dikirim.',
        ]);

        // 3. Order WM-0009 (Selesai)
        $order2 = Order::create([
            'order_code' => 'WM-0009',
            'user_id' => $customer1->id,
            'customer_name' => 'Firman Candra',
            'customer_phone' => '0812-3456-7890',
            'product_name' => 'Jaket Komunitas Semarang',
            'category' => 'Jaket & Hoodie',
            'quantity' => 25,
            'order_date' => '2026-10-15',
            'deadline' => '2026-11-02',
            'current_stage' => 'selesai',
            'status_text' => 'Selesai',
            'status_variant' => 'completed',
            'thumbnail' => 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
            'notes' => 'Jaket bomber taslan waterproof komunitas motor.',
        ]);

        $stages2 = [
            ['stage_id' => 'desain', 'stage_name' => 'Desain/mockup', 'notes' => 'Mockup disetujui.', 'photos' => [], 'completed' => true, 'current' => false, 'stage_date' => '2026-10-16 09:00:00'],
            ['stage_id' => 'potong', 'stage_name' => 'Potong kain', 'notes' => 'Bahan Taslan milky dipotong.', 'photos' => [], 'completed' => true, 'current' => false, 'stage_date' => '2026-10-19 14:00:00'],
            ['stage_id' => 'sablon_bordir', 'stage_name' => 'Bordir', 'notes' => 'Bordir komputer dada & punggung rapi.', 'photos' => [], 'completed' => true, 'current' => false, 'stage_date' => '2026-10-23 11:30:00'],
            ['stage_id' => 'jahit', 'stage_name' => 'Jahit', 'notes' => 'Jahit furing dan ritsleting selesai.', 'photos' => [], 'completed' => true, 'current' => false, 'stage_date' => '2026-10-27 16:00:00'],
            ['stage_id' => 'qc_packing', 'stage_name' => 'QC & packing', 'notes' => 'Lolos uji QC 25 pcs.', 'photos' => [], 'completed' => true, 'current' => false, 'stage_date' => '2026-10-31 10:00:00'],
            ['stage_id' => 'selesai', 'stage_name' => 'Selesai', 'notes' => 'Pesanan telah diambil oleh customer.', 'photos' => [], 'completed' => true, 'current' => false, 'stage_date' => '2026-11-02 15:30:00'],
        ];

        foreach ($stages2 as $s) {
            StageUpdate::create(array_merge($s, ['order_id' => $order2->id]));
        }

        Worksheet::create([
            'order_id' => $order2->id,
            'item_type' => 'Jaket Bomber Taslan',
            'fabric' => 'Taslan Milky Waterproof + Furing Asahi',
            'print_type' => 'Bordir Komputer Presisi Tinggi',
            'sizes' => ['M' => 10, 'L' => 10, 'XL' => 5],
            'notes' => 'Ritsleting YKK, rib leher dan lengan elastis tebal.',
            'is_approved' => true,
        ]);

        Invoice::create([
            'order_id' => $order2->id,
            'invoice_number' => 'INV/2026/WM/10-009',
            'invoice_date' => '2026-10-15',
            'items' => [
                ['name' => 'Jaket Bomber Taslan + Bordir Komputer', 'qty' => 25, 'price' => 145000, 'total' => 3625000],
            ],
            'total_amount' => 3625000,
            'down_payment' => 3625000,
            'balance' => 0,
            'payment_status' => 'Lunas',
            'payment_note' => 'Lunas penuh saat pengambilan pesanan.',
        ]);

        // 4. Order WM-0015 (Menunggu)
        $order3 = Order::create([
            'order_code' => 'WM-0015',
            'user_id' => $customer2->id,
            'customer_name' => 'Budi Santoso',
            'customer_phone' => '0813-9876-5432',
            'product_name' => 'Kemeja PDH Angkatan',
            'category' => 'PDH / Kemeja',
            'quantity' => 50,
            'order_date' => '2026-11-08',
            'deadline' => '2026-11-28',
            'current_stage' => 'desain',
            'status_text' => 'Desain/mockup',
            'status_variant' => 'waiting',
            'thumbnail' => 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80',
            'notes' => 'Kemeja PDH dinas warna navy bahan nagata drill.',
        ]);

        $stages3 = [
            ['stage_id' => 'desain', 'stage_name' => 'Desain/mockup', 'notes' => 'Menunggu konfirmasi pemilihan warna bahan Nagata Drill.', 'photos' => [], 'completed' => false, 'current' => true, 'stage_date' => '2026-11-09 13:00:00'],
            ['stage_id' => 'potong', 'stage_name' => 'Potong kain', 'notes' => null, 'photos' => [], 'completed' => false, 'current' => false, 'stage_date' => null],
            ['stage_id' => 'sablon_bordir', 'stage_name' => 'Bordir', 'notes' => null, 'photos' => [], 'completed' => false, 'current' => false, 'stage_date' => null],
            ['stage_id' => 'jahit', 'stage_name' => 'Jahit', 'notes' => null, 'photos' => [], 'completed' => false, 'current' => false, 'stage_date' => null],
            ['stage_id' => 'qc_packing', 'stage_name' => 'QC & packing', 'notes' => null, 'photos' => [], 'completed' => false, 'current' => false, 'stage_date' => null],
            ['stage_id' => 'selesai', 'stage_name' => 'Selesai', 'notes' => null, 'photos' => [], 'completed' => false, 'current' => false, 'stage_date' => null],
        ];

        foreach ($stages3 as $s) {
            StageUpdate::create(array_merge($s, ['order_id' => $order3->id]));
        }

        Worksheet::create([
            'order_id' => $order3->id,
            'item_type' => 'Kemeja PDH Lengan Panjang',
            'fabric' => 'Nagata Drill Original',
            'print_type' => 'Bordir Komputer 3 Titik',
            'sizes' => ['S' => 10, 'M' => 20, 'L' => 15, 'XL' => 5],
            'notes' => 'Kancing sembunyi, bordir nama personal di dada kanan.',
            'is_approved' => true,
        ]);

        Invoice::create([
            'order_id' => $order3->id,
            'invoice_number' => 'INV/2026/WM/11-015',
            'invoice_date' => '2026-11-08',
            'items' => [
                ['name' => 'Kemeja PDH Nagata Drill + Bordir Nama', 'qty' => 50, 'price' => 120000, 'total' => 6000000],
            ],
            'total_amount' => 6000000,
            'down_payment' => 3000000,
            'balance' => 3000000,
            'payment_status' => 'DP 50% Diterima',
            'payment_note' => 'Sisa pembayaran dilunasi saat pengiriman.',
        ]);
    }
}
