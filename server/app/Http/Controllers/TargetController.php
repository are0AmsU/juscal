<?php

namespace App\Http\Controllers;

use App\Models\Target;
use App\Models\TargetType;
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

  public function create($mapId)
  {
    try {
      $target = Target::create([
        'coordinate_x' => 0,
        'coordinate_y' => 0,
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
      $typeName = $request->input('type');
      $target = Target::findOrFail($id);

      if ($typeName !== 'null') {
        $targetType = TargetType::where('name', $typeName)->first();
        $target->target_type_id = $targetType ? $targetType->id : null;
      } else {
        $target->target_type_id = null;
      }

      $target->save();

      $updatedTarget = Target::select(
        'targets.id',
        'targets.coordinate_x',
        'targets.coordinate_y',
        'target_types.name as type',
        'target_types.icon'
      )
        ->leftJoin('target_types', 'targets.target_type_id', '=', 'target_types.id')
        ->where('targets.id', $id)
        ->first();

      return response()->json($updatedTarget);
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
