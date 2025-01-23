<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Nade;

class NadeImg extends Model
{
    protected $fillable = [
        'path',
        'index',
        'nade_id',
    ];

    public function nade()
    {
        return $this->belongsTo(Nade::class);
    }
}
