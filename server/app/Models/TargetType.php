<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Target;

class TargetType extends Model
{
    protected $fillable = [
        'name',
        'icon',
    ];

    public function targets()
    {
        return $this->hasMany(Target::class);
    }
}
