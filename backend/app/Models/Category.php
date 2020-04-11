<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table='categories';

    protected $fillable = ['name'];

    public function products(){
        return $this->HasMany('App\Models\Product','product_id','id');
    }
}
