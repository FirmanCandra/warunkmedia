<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CustomerController extends Controller
{
    public function index(): JsonResponse
    {
        $customers = User::withCount('orders')
            ->where('role', 'customer')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $customers,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|email|unique:users,email',
        ]);

        $email = $validated['email'] ?? sprintf('customer_%s@warunkmedia.com', time());

        $customer = User::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $email,
            'password' => Hash::make('password123'),
            'role' => 'customer',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Customer berhasil ditambahkan.',
            'data' => $customer,
        ], 201);
    }

    public function destroy(int $id): JsonResponse
    {
        $customer = User::where('role', 'customer')->findOrFail($id);
        $customer->delete();

        return response()->json([
            'success' => true,
            'message' => 'Customer berhasil dihapus.',
        ]);
    }
}
