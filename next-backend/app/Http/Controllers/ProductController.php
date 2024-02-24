<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ProductController extends Controller
{
   public function buy(Request $request){
    $validatedData = $request->validate([
        'nama' => 'required',
        'stok'=> 'required|integer',
        'merk'=>'required',
        'harga' => 'required|integer'
    ]);

    $product = new Product([
        'nama' => $validatedData['nama'],
        'stok' => $validatedData['stok'],
        'merk' => $validatedData['merk'],
        'harga' => $validatedData['harga'],
    ]);

    $product->save();

    // Mengubah format created_at menjadi format yang diinginkan
    $product->created_at = Carbon::parse($product->created_at)->format('Y-m-d H:i:s');
   }

   public function databuy()
   {
       // Mengambil semua data produk yang telah dibeli
       $products = Product::all();

       // Mengembalikan respons JSON dengan data produk
       return response()->json($products);
   }

}
