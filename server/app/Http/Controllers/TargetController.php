<?php

namespace App\Http\Controllers;

use App\Models\Target;
use App\Models\NadeTarget;
use App\Models\TargetType;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;


class TargetController
{
  public function getByMapId(Request $request, $mapId)
  {
    try {
      $targets = Target::select(
        'targets.id',
        'targets.coordinate_x',
        'targets.coordinate_y',
        'target_types.name as type',
        'target_types.icon'
      )
        ->leftJoin('target_types', 'target_types.id', '=', 'targets.target_type_id')
        ->where('targets.map_id', $mapId)
        ->get();

      return response()->json($targets, 200);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ]);
    }
  }

  public function getToTargetsByMapId(Request $request, $mapId)
  {
    try {
      $toTargets = Target::with('type')
        ->where('map_id', $mapId)
        ->whereHas('type', function ($query) {
          return $query->whereNotNull('name');
        })->get()->map(function ($target) {
          return [
            'id' => $target->id,
            'coordinates' => $target->coordinates,
            'icon' => $target->type->icon,
            'type' => $target->type->name
          ];
        });

      return response()->json($toTargets);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ]);
    }
  }

  public function getFromTargetsByToTargetId(Request $request, $toTargetId)
  {
    try {
      $fromTargets = NadeTarget::where('nade_targets.target_id', $toTargetId)
        ->join('nade_targets as nt', function (JoinClause $join) {
          return $join
            ->on('nt.nade_id', '=', 'nade_targets.nade_id')
            ->on('nt.target_id', '!=', 'nade_targets.target_id');
        })
        ->with('target')
        ->get()
        ->map(function ($nadeTarget) {
          return [
            'id' => $nadeTarget->target->id,
            'coordinates' => $nadeTarget->target->coordinates,
            'icon' => null,
            'type' => null
          ];
        });
      return response()->json($fromTargets);
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
      $target = Target::create([
        'coordinate_x' => 50,
        'coordinate_y' => 50,
        'map_id' => $mapId,
        'target_type_id' => null
      ]);

      return response()->json([
        'id' => $target->id,
        'coordinates' => $target->coordinates,
        'icon' => null,
        'type' => null
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ], 500);
    }
  }

  public function delete($id)
  {
    try {
      $target = Target::findOrFail($id);
      $target->delete();

      return response()->json([
        'status' => true,
        'message' => 'Target deleted successfully'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ], 404);
    }
  }

  public function updateType(Request $request, $id)
  {
    try {
      $request->validate([
        'type' => 'nullable|exists:target_types,name',
        'nadeId' => 'nullable|exists:nades,id'
      ]);

      $type = $request->input('type');
      $nadeId = $request->input('nadeId');
      $target = Target::findOrFail($id);

      if ($nadeId !== null) {
        $secondNadeTarget = NadeTarget::where('nade_id', $nadeId)->whereNot('target_id', $id)->with('target.type')->first();
        if ($secondNadeTarget) {
          $secondTarget = $secondNadeTarget->target;
          if (($type === null && $secondTarget->type === null) || ($type !== null && $secondTarget->type !== null)) {
            return response()->json([
              'status' => false,
              'message' => 'Uncorreced type.'
            ], 500);
          };
        }
      };

      $targetType = TargetType::where('name', $type)->first();

      $target->update([
        'target_type_id' => $targetType->id
      ]);

      return response()->json([
        'id' => $id,
        'coordinates' => $target->coordinates,
        'type' => $type,
        'icon' => $targetType->icon
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ], 500);
    }
  }

  public function updateCoordinates(Request $request, $id)
  {
    try {
      $x = $request->input('coordinate_x');
      $y = $request->input('coordinate_y');
      $target = Target::findOrFail($id);
      $target->coordinate_x = $x;
      $target->coordinate_y = $y;
      $target->save();

      return response()->json([
        'status' => true,
        'message' => 'Coordinates have been changed.'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ]);
    }
  }
}
