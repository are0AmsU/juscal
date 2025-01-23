<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Nade;
use App\Models\Target;

class NadeTarget extends Model
{
    protected $fillable = [
        'nade_id',
        'target_id'
    ];

    public function nade()
    {
        return $this->belongsTo(Nade::class);
    }

    public function target()
    {
        return $this->belongsTo(Target::class);
    }
}
