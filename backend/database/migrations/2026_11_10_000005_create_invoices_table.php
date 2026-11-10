<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->unique()->constrained('orders')->onDelete('cascade');
            $table->string('invoice_number')->unique(); // INV/2026/WM/11-012
            $table->date('invoice_date');
            $table->json('items'); // [{"name": "...", "qty": 40, "price": 65000, "total": 2600000}]
            $table->decimal('total_amount', 12, 2)->default(0);
            $table->decimal('down_payment', 12, 2)->default(0);
            $table->decimal('balance', 12, 2)->default(0);
            $table->string('payment_status')->default('Menunggu Pembayaran'); // Lunas, DP 50% Lunas, etc.
            $table->text('payment_note')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};

