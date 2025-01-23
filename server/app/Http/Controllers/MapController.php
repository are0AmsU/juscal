<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Map;
use App\Traits\FileTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MapController
{

  use FileTrait;

  public function get()
  {
    try {
      $maps = Map::select('id', 'name', 'image', 'preview')->get();

      return response()->json($maps);
    } catch (\Exception $e) {
      return response()->json($e->getMessage(), 500);
    }
  }

  public function getById(Request $request, $id)
  {
    try {
      $map = Map::findOrFail($id);

      return response()->json($map, 200);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ], 500);
    }
  }

  public function create(Request $request)
  {
    try {

      $request->validate([
        'name' => 'required|string|max:255',
        'image' => 'required|image|mimes:svg|max:2048',
        'preview' => 'required|image|mimes:svg|max:2048'
      ]);

      $mapData = [
        'name' => $request->input('name')
      ];

      foreach (['image', 'preview'] as $fileName) {
        if ($request->hasFile($fileName)) {
          $mapData[$fileName] = $this->saveFile('maps', $request->file($fileName));
        }
      }

      $map = Map::create($mapData);

      return response()->json([
        'id' => $map->id,
        'name' => $map->name,
        'image' => $map->image,
        'preview' => $map->preview
      ], 201);
    } catch (\Exception $e) {
      if (isset($mapData['image'])) {
        $this->deleteFile($mapData['image']);
      }
      if (isset($mapData['preview'])) {
        $this->deleteFile($mapData['preview']);
      }

      return response()->json([
        'success' => false,
        'message' => $e->getMessage(),
      ], 500);
    }
  }

  public function delete($id)
  {
    try {
      $map = Map::findOrFail($id);

      Storage::disk('public')->delete($map->image);
      Storage::disk('public')->delete($map->preview);

      $map->delete();

      return response()->json([
        'succes' => true,
        'message' => 'Map deleted'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'succes' => false,
        'message' => $e->getMessage()
      ], 500);
    }
  }
}
