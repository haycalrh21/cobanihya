<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Category extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        $categories = [
            ['name' => 'Makanan', 'description' => 'Kategori makanan'],
            ['name' => 'Minuman', 'description' => 'Kategori minuman'],
            ['name' => 'Pakaian', 'description' => 'Kategori pakaian'],
            ['name' => 'Peralatan', 'description' => 'Kategori peralatan'],
        ];

        return $categories;
    }
}
