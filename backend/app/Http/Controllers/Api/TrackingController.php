<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;

class TrackingController extends Controller
{
    public function show(string $code): JsonResponse
    {
        $cleanCode = strtoupper(trim($code));

        $order = Order::with(['stageUpdates', 'worksheet', 'invoice', 'user'])
            ->where('order_code', $cleanCode)
            ->first();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => "Pesanan dengan kode {$cleanCode} tidak ditemukan.",
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }
}
