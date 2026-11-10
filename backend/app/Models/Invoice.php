<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'invoice_number',
        'invoice_date',
        'items',
        'total_amount',
        'down_payment',
        'balance',
        'payment_status',
        'payment_note',
    ];

    protected $casts = [
        'invoice_date' => 'date',
        'items' => 'array',
        'total_amount' => 'decimal:2',
        'down_payment' => 'decimal:2',
        'balance' => 'decimal:2',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
