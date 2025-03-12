<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Map;
use App\Models\TargetType;

class Target extends Model
{
    protected $fillable = [
        'coordinate_x',
        'coordinate_y',
        'target_type_id',
        'map_id'
    ];

    protected $appends = ['coordinates'];
    protected $hidden = ['coordinate_x', 'coordinate_y'];

    public function getCoordinatesAttribute()
    {
        return [$this->coordinate_x, $this->coordinate_y];
    }

    public function map()
    {
        return $this->belongsTo(Map::class);
    }

    public function type()
    {
        return $this->belongsTo(TargetType::class, 'target_type_id');
    }

    public function nades()
    {
        return $this->belongsToMany(Nade::class, 'nade_targets');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($target) {
            $target->nades()->delete();
        });
    }
}
