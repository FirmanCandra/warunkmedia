<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_code')->unique(); // e.g. WM-0012
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('customer_name');
            $table->string('customer_phone')->nullable();
            $table->string('product_name');
            $table->string('category')->default('Kaos & Polo');
            $table->integer('quantity')->default(1);
            $table->date('order_date')->nullable();
            $table->date('deadline')->nullable();
            $table->string('current_stage')->default('desain'); // desain, potong, sablon_bordir, jahit, qc_packing, selesai
            $table->string('status_text')->default('Menunggu Diproses');
            $table->string('status_variant')->default('waiting'); // waiting, progress, completed
            $table->string('thumbnail')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

