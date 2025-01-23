<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait FileTrait
{

  public function saveFile($directory, $file)
  {
    $name = time() . '_' . $file->getClientOriginalName();
    return $file->storeAs($directory, $name, 'public');
  }

  public function deleteFile($fileName)
  {
    Storage::disk('public')->delete($fileName);
  }
}
