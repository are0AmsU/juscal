<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Map;
use App\Models\Target;
use App\Models\NadeTarget;

class Nade extends Model
{
    protected $fillable = [
        'name',
        'description',
        'map_id'
    ];

    public function map()
    {
        return $this->belongsTo(Map::class);
    }

    public function images()
    {
        return $this->hasMany(NadeImg::class)->orderBy('index');
    }

    public function fromTarget()
    {
        return $this->hasOneThrough(
            Target::class,
            NadeTarget::class,
            'nade_id',
            'id',
            'id',
            'target_id'
        )->whereNull('target_type_id');
    }

    public function toTarget()
    {
        return $this->hasOneThrough(
            Target::class,
            NadeTarget::class,
            'nade_id',
            'id',
            'id',
            'target_id'
        )
            ->whereNotNull('target_type_id')
            ->with(['targetType']);
    }
}
