<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StageUpdate extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'stage_id',
        'stage_name',
        'notes',
        'photos',
        'completed',
        'current',
        'stage_date',
    ];

    protected $casts = [
        'photos' => 'array',
        'completed' => 'boolean',
        'current' => 'boolean',
        'stage_date' => 'datetime',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
