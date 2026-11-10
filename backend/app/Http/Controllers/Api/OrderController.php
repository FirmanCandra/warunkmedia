<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\StageUpdate;
use App\Models\Worksheet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    const DEFAULT_STAGES = [
        ['id' => 'desain', 'name' => 'Desain & Mockup'],
        ['id' => 'potong', 'name' => 'Potong Kain'],
        ['id' => 'sablon_bordir', 'name' => 'Sablon / Bordir'],
        ['id' => 'jahit', 'name' => 'Jahit'],
        ['id' => 'qc_packing', 'name' => 'QC & Packing'],
        ['id' => 'selesai', 'name' => 'Selesai / Dikirim'],
    ];

    public function index(Request $request): JsonResponse
    {
        $query = Order::with(['stageUpdates', 'worksheet', 'invoice'])->orderBy('id', 'desc');

        if ($request->has('user_id')) {
            $query->where('user_id', $request->query('user_id'));
        }

        if ($request->has('status')) {
            $query->where('status_variant', $request->query('status'));
        }

        return response()->json([
            'success' => true,
            'data' => $query->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'nullable|string|max:50',
            'product_name' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'quantity' => 'required|integer|min:1',
            'deadline' => 'nullable|date',
            'notes' => 'nullable|string',
            'user_id' => 'nullable|exists:users,id',
        ]);

        return DB::transaction(function () use ($validated, $request) {
            $lastOrder = Order::orderBy('id', 'desc')->first();
            $nextNum = $lastOrder ? ($lastOrder->id + 1) : 1;
            $orderCode = sprintf('WM-%04d', $nextNum);

            $order = Order::create([
                'order_code' => $orderCode,
                'user_id' => $validated['user_id'] ?? null,
                'customer_name' => $validated['customer_name'],
                'customer_phone' => $validated['customer_phone'] ?? null,
                'product_name' => $validated['product_name'],
                'category' => $validated['category'] ?? 'Kaos & Polo',
                'quantity' => $validated['quantity'],
                'order_date' => now()->toDateString(),
                'deadline' => $validated['deadline'] ?? now()->addDays(14)->toDateString(),
                'current_stage' => 'desain',
                'status_text' => 'Desain & Mockup',
                'status_variant' => 'waiting',
                'notes' => $validated['notes'] ?? null,
            ]);

            // Buat 6 Tahapan Default
            foreach (self::DEFAULT_STAGES as $idx => $stg) {
                StageUpdate::create([
                    'order_id' => $order->id,
                    'stage_id' => $stg['id'],
                    'stage_name' => $stg['name'],
                    'notes' => $idx === 0 ? 'Pesanan berhasil didaftarkan.' : null,
                    'photos' => [],
                    'completed' => false,
                    'current' => $idx === 0,
                    'stage_date' => $idx === 0 ? now() : null,
                ]);
            }

            // Buat Lembar Kerja Default
            Worksheet::create([
                'order_id' => $order->id,
                'item_type' => $order->product_name,
                'fabric' => 'Standard Distro Fabric',
                'print_type' => 'Sablon / Bordir Standard',
                'sizes' => ['S' => 0, 'M' => intval($order->quantity / 2), 'L' => intval($order->quantity / 2), 'XL' => 0],
                'notes' => $validated['notes'] ?? null,
                'is_approved' => true,
            ]);

            // Buat Invoice Default
            $unitPrice = 65000;
            $totalAmount = $order->quantity * $unitPrice;
            $downPayment = $totalAmount / 2;

            Invoice::create([
                'order_id' => $order->id,
                'invoice_number' => sprintf('INV/%s/WM/%04d', now()->format('Y'), $nextNum),
                'invoice_date' => now()->toDateString(),
                'items' => [
                    [
                        'name' => $order->product_name,
                        'qty' => $order->quantity,
                        'price' => $unitPrice,
                        'total' => $totalAmount,
                    ],
                ],
                'total_amount' => $totalAmount,
                'down_payment' => $downPayment,
                'balance' => $totalAmount - $downPayment,
                'payment_status' => 'DP 50% Diterima',
                'payment_note' => 'Pelunasan sisa tagihan saat pesanan siap dikirim.',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Pesanan berhasil dibuat.',
                'data' => $order->load(['stageUpdates', 'worksheet', 'invoice']),
            ], 201);
        });
    }

    public function show(int $id): JsonResponse
    {
        $order = Order::with(['stageUpdates', 'worksheet', 'invoice', 'user'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $order = Order::findOrFail($id);

        $validated = $request->validate([
            'customer_name' => 'sometimes|string|max:255',
            'customer_phone' => 'nullable|string|max:50',
            'product_name' => 'sometimes|string|max:255',
            'category' => 'sometimes|string|max:100',
            'quantity' => 'sometimes|integer|min:1',
            'deadline' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $order->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Pesanan berhasil diperbarui.',
            'data' => $order,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pesanan berhasil dihapus.',
        ]);
    }

    public function updateStage(Request $request, int $id): JsonResponse
    {
        $order = Order::with('stageUpdates')->findOrFail($id);

        $validated = $request->validate([
            'stage_id' => 'required|string',
            'notes' => 'nullable|string',
            'stage_date' => 'nullable|date',
            'photos.*' => 'nullable|image|max:5120', // maks 5MB
        ]);

        $stageId = $validated['stage_id'];
        $uploadedPhotoUrls = [];

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $file) {
                $path = $file->store('stage_photos', 'public');
                $uploadedPhotoUrls[] = Storage::url($path);
            }
        }

        // Cari index tahapan
        $stageIndex = array_search($stageId, array_column(self::DEFAULT_STAGES, 'id'));
        if ($stageIndex === false) {
            $stageIndex = 0;
        }

        $stageName = self::DEFAULT_STAGES[$stageIndex]['name'];
        $isCompleted = ($stageId === 'selesai');

        // Update semua stages
        foreach ($order->stageUpdates as $idx => $stg) {
            if ($stg->stage_id === $stageId) {
                $mergedPhotos = array_merge($stg->photos ?? [], $uploadedPhotoUrls);
                $stg->update([
                    'completed' => $isCompleted,
                    'current' => !$isCompleted,
                    'notes' => $validated['notes'] ?? $stg->notes,
                    'photos' => $mergedPhotos,
                    'stage_date' => $validated['stage_date'] ?? now(),
                ]);
            } elseif ($idx < $stageIndex) {
                $stg->update(['completed' => true, 'current' => false]);
            } else {
                $stg->update(['completed' => false, 'current' => false]);
            }
        }

        // Update Order status
        $order->update([
            'current_stage' => $stageId,
            'status_text' => $isCompleted ? 'Selesai' : $stageName,
            'status_variant' => $isCompleted ? 'completed' : 'progress',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Tahapan progres berhasil diperbarui.',
            'data' => $order->fresh(['stageUpdates']),
        ]);
    }
}
