<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Worksheet extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'item_type',
        'fabric',
        'print_type',
        'sizes',
        'notes',
        'is_approved',
    ];

    protected $casts = [
        'sizes' => 'array',
        'is_approved' => 'boolean',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
