<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $fillable = ['id','title','images','description','category_id'];

    public function category(){
        return $this->HasOne('App\Models\Category','id','category_id');
    }
}
