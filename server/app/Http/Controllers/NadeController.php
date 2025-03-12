<?php

namespace App\Http\Controllers;

use App\Models\Nade;
use App\Models\NadeTarget;
use Exception;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

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

  public function getByTargetsIds(Request $request)
  {
    try {
      $request->validate([
        'fromTargetId' => 'required|exists:targets,id',
        'toTargetId' => 'required|exists:targets,id',
      ]);

      Log::info(json_encode($request));

      $nades = NadeTarget::where('nade_targets.target_id', $request->fromTargetId)
        ->join('nade_targets as nt', function (JoinClause $join) use ($request) {
          return $join
            ->on('nade_targets.nade_id', '=', 'nt.nade_id')
            ->where('nt.target_id', $request->toTargetId);
        })
        ->with('nade.images')
        ->get()
        ->map(function ($nadeTarget) use ($request) {
          return [
            'id' => $nadeTarget->nade->id,
            'name' => $nadeTarget->nade->name,
            'description' => $nadeTarget->nade->description,
            'fromTargetId' => $request->fromTargetId,
            'toTargetId' => $request->toTargetId,
            'images' => $nadeTarget->nade->images->map(function ($image) {
              return [
                'id' => $image->id,
                'index' => $image->index,
                'path' => $image->path
              ];
            })
          ];
        });

      return response()->json($nades);
    } catch (ValidationException $e) {
      return response()->json([
        'status' => false,
        'type' => 'validate',
        'message' => $e->getMessage()
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ]);
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
