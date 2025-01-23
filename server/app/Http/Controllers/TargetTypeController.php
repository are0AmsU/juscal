<?php

namespace App\Http\Controllers;

use App\Models\TargetType;

class TargetTypeController
{
  public function getNames()
  {
    try {
      $names = TargetType::pluck('name');

      return response()->json($names);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ]);
    }
  }
}
