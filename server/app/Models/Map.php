<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Nade;
use App\Models\Target;

class Map extends Model
{
    protected $fillable = [
        'name',
        'image',
        'preview',
    ];

    public function nades()
    {
        return $this->hasMany(Nade::class);
    }

    public function targets()
    {
        return $this->hasMany(Target::class);
    }

    public function images()
    {
        return $this->hasMany(NadeImg::class);
    }
}
