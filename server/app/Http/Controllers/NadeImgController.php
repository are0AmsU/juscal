<?php

namespace App\Http\Controllers;

use App\Models\NadeImg;
use App\Traits\FileTrait;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class NadeImgController extends Controller
{

  use FileTrait;

  public function create(Request $request, $nadeId)
  {
    try {
      $request->validate([
        'image' => 'required|image|mimes:png,jpg,jpeg|max:4096'
      ]);

      $nadeImgData = [
        'nade_id' => $nadeId,
        'index' => NadeImg::where('nade_id', $nadeId)->max('index') + 1,
        'path' => ''
      ];

      if ($request->hasFile('image')) {
        $nadeImgData['path'] = $this->saveFile('nade-images', $request->file('image'));
      }

      $nadeImg = NadeImg::create($nadeImgData);

      return response()->json([
        'id' => $nadeImg->id,
        'path' => $nadeImg->path,
        'index' => $nadeImg->index,
      ], 201);
    } catch (ValidationException $e) {
      return response()->json([
        'status' => false,
        'type' => 'validation',
        'message' => $e
      ]);
    } catch (\Exception $e) {
      if (isset($nadeImgData['path'])) {
        $this->deleteFile($nadeImgData);
      }

      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ]);
    }
  }

  public function delete($id)
  {
    try {

      $nadeImg = NadeImg::findOrFail($id);

      $this->deleteFile($nadeImg->path);

      $nadeImg->delete();

      return response()->noContent();
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ]);
    }
  }

  public function replaceIndexes(Request $request)
  {
    try {
      $request->validate([
        'firstNadeImgId' => 'required|integer|exists:nade_imgs,id',
        'secondNadeImgId' => 'required|integer|exists:nade_imgs,id',
      ]);

      $firstNadeImgId = $request->input('firstNadeImgId');
      $secondNadeImgId = $request->input('secondNadeImgId');

      $firstIndex = NadeImg::findOrFail($firstNadeImgId)->index;
      $secondIndex = NadeImg::findOrFail($secondNadeImgId)->index;

      NadeImg::whereIn('id', [$firstNadeImgId, $secondNadeImgId])
        ->update([
          'index' => DB::raw("CASE
            WHEN id = $firstNadeImgId THEN $secondIndex
            WHEN id = $secondNadeImgId THEN $firstIndex END
          ")
        ]);

      return response()->json([
        'message' => [$firstIndex, $secondIndex]
      ], 200);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage(),
      ]);
    }
  }
}
