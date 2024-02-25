<?php

namespace App\Http\Controllers;

use App\Http\Resources\Category;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function buy(Request $request)
    {
        $validatedData = $request->validate([
            'nama' => 'required',
            'stok' => 'required|integer',
            'merk' => 'required',
            'kategori' => 'required',
            'harga' => 'required|integer'
        ]);

        $currentTime = Carbon::now(); // Mendapatkan waktu saat ini

        $product = new Product([
            'nama' => $validatedData['nama'],
            'stok' => $validatedData['stok'],
            'kategori' => $validatedData['kategori'],
            'merk' => $validatedData['merk'],
            'harga' => $validatedData['harga'],
            'tanggal' => $currentTime->toDateTimeString(), // Menggunakan waktu saat ini
        ]);

        $product->save();

        // Mengubah format created_at menjadi format yang diinginkan

        // Mendapatkan waktu yang ingin ditampilkan (misalnya dari database)
        $waktuDariDatabase = Carbon::parse($product->tanggal);

        // Menghitung selisih waktu antara waktu sekarang dan waktu dari database
        $selisihWaktu = $waktuDariDatabase->diffForHumans($currentTime);

        echo $selisihWaktu;
    }
    public function show($id){

            $product = Product::findOrFail($id);
            return response()->json($product);

    }

   public function databuy()
   {
       // Mengambil semua data produk yang telah dibeli
       $products = Product::all();

       // Mengembalikan respons JSON dengan data produk
       return response()->json($products);
   }

   public function kategori()
   {
       $categories = [
           ['name' => 'Makanan'],
           ['name' => 'Minuman'],
           ['name' => 'Pakaian'],
           ['name' => 'Peralatan'],
       ];

       return new JsonResponse($categories);
   }

   public function hapus($id){
    $product = Product::findOrFail($id);

    $product->delete();
   }

   public function update(Request $request, $id)
{
    $validatedData = $request->validate([
        'nama' => 'required',
        'merk' => 'required',
        'harga' => 'required|integer',
        'stok' => 'required|integer',


    ]);


    $product = Product::findOrFail($id);


    $product->update($validatedData);


    return response()->json($product);
}


public function index($id){

    $product = Product::findOrFail($id);

    return response()->json($product);
}
}
