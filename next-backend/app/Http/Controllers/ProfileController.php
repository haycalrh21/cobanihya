<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
   public function profile(Request $request){
        // Data dummy dengan nama "haycal"
        $dummyData = [
            'name' => 'haycal'
        ];

        // Mengembalikan data dummy
        return response()->json($dummyData);
   }
}
