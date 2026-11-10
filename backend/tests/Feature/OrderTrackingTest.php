<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\StageUpdate;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderTrackingTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_track_order_via_order_code(): void
    {
        $order = Order::create([
            'order_code' => 'WM-0012',
            'customer_name' => 'Firman Candra',
            'product_name' => 'Kaos Angkatan 2026',
            'category' => 'Kaos & Polo',
            'quantity' => 40,
            'current_stage' => 'sablon_bordir',
            'status_text' => 'Sablon/bordir',
            'status_variant' => 'progress',
        ]);

        StageUpdate::create([
            'order_id' => $order->id,
            'stage_id' => 'desain',
            'stage_name' => 'Desain/mockup',
            'notes' => 'Mockup disetujui.',
            'completed' => true,
            'current' => false,
        ]);

        $response = $this->getJson('/api/tracking/WM-0012');

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.order_code', 'WM-0012')
            ->assertJsonPath('data.customer_name', 'Firman Candra')
            ->assertJsonCount(1, 'data.stage_updates');
    }

    public function test_tracking_returns_404_for_unknown_code(): void
    {
        $response = $this->getJson('/api/tracking/WM-9999');

        $response->assertStatus(404)
            ->assertJsonPath('success', false);
    }

    public function test_can_create_new_order_with_stages_worksheet_and_invoice(): void
    {
        $payload = [
            'customer_name' => 'Budi Utomo',
            'customer_phone' => '081299998888',
            'product_name' => 'Topi Baseball Custom',
            'category' => 'Topi & Bucket',
            'quantity' => 50,
            'deadline' => '2026-11-30',
            'notes' => 'Bordir timbul 3D di depan.',
        ];

        $response = $this->postJson('/api/orders', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.customer_name', 'Budi Utomo')
            ->assertJsonCount(6, 'data.stage_updates');

        $this->assertDatabaseHas('orders', [
            'customer_name' => 'Budi Utomo',
            'product_name' => 'Topi Baseball Custom',
        ]);

        $this->assertDatabaseHas('worksheets', [
            'item_type' => 'Topi Baseball Custom',
        ]);

        $this->assertDatabaseHas('invoices', [
            'total_amount' => 50 * 65000,
        ]);
    }
}

