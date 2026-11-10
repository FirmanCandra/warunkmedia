<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stage_updates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->string('stage_id'); // desain, potong, sablon_bordir, jahit, qc_packing, selesai
            $table->string('stage_name');
            $table->text('notes')->nullable();
            $table->json('photos')->nullable();
            $table->boolean('completed')->default(false);
            $table->boolean('current')->default(false);
            $table->timestamp('stage_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stage_updates');
    }
};
