<?php

namespace App\Http\Controllers;

use App\Models\Nade;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class NadeController extends Controller
{
  public function getByMapId($mapId)
  {
    try {
      $nades = Nade::where('map_id', $mapId)
        ->with(['images', 'fromTarget', 'toTarget'])
        ->get()
        ->map(function ($nade) {
          return [
            'id' => $nade->id,
            'name' => $nade->name,
            'description' => $nade->description,
            'fromTargetId' => ($nade->fromTarget) ? $nade->fromTarget->id : null,
            'toTargetId' => ($nade->toTarget) ? $nade->toTarget->id : null,
            'images' => $nade->images->map(function ($image) {
              return [
                'id' => $image->id,
                'path' => $image->path,
                'index' => $image->index
              ];
            })
          ];
        });

      return response()->json($nades);
    } catch (Exception $e) {

      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ], 500);
    }
  }

  public function create($mapId)
  {
    try {
      $nade = Nade::create([
        'map_id' => $mapId
      ]);

      return response()->json([
        'id' => $nade->id,
        'name' => null,
        'description' => null,
        'fromTargetId' => null,
        'toTargetId' => null,
        'images' => []
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ], 500);
    }
  }

  public function updateName(Request $request, $nadeId)
  {
    try {
      $request->validate([
        'name' => 'required|string|max:255'
      ]);

      $name = $request->input('name');

      Nade::where('id', $nadeId)->update([
        'name' => $name
      ]);

      return response()->json([
        'message' => 'Updated'
      ], 200);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ]);
    }
  }

  public function updateDescription(Request $request, $nadeId)
  {
    try {
      $request->validate([
        'description' => 'required|string|max:255'
      ]);

      $description = $request->input('description');

      Nade::where('id', $nadeId)->update([
        'description' => $description
      ]);

      return response()->json([
        'message' => 'Updated'
      ], 200);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ]);
    }
  }
}
