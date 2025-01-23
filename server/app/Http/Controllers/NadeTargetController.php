<?php

namespace App\Http\Controllers;

use App\Models\NadeTarget;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class NadeTargetController
{
  public function create(Request $request)
  {
    try {
      $request->validate([
        'nadeId' => 'required|exists:nades,id',
        'targetId' => 'required|exists:targets,id'
      ]);

      NadeTarget::create([
        'nade_id' => $request->nadeId,
        'target_id' => $request->targetId
      ]);

      return response()->json([
        'status' => true,
        'message' => 'NadeTarget created.'
      ]);
    } catch (ValidationException $e) {
      return response()->json([
        'status' => false,
        'message' => 'Validation error.',
        'errors' => $e->getMessage()
      ], 422);
    } catch (Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage(),
      ], 500);
    }
  }
}
