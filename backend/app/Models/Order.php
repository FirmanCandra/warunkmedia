<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_code',
        'user_id',
        'customer_name',
        'customer_phone',
        'product_name',
        'category',
        'quantity',
        'order_date',
        'deadline',
        'current_stage',
        'status_text',
        'status_variant',
        'thumbnail',
        'notes',
    ];

    protected $casts = [
        'order_date' => 'date',
        'deadline' => 'date',
        'quantity' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function stageUpdates(): HasMany
    {
        return $this->hasMany(StageUpdate::class)->orderBy('id', 'asc');
    }

    public function worksheet(): HasOne
    {
        return $this->hasOne(Worksheet::class);
    }

    public function invoice(): HasOne
    {
        return $this->hasOne(Invoice::class);
    }
}

