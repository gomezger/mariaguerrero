<?php
namespace App\Repositories\Category;
use App\Models\Category;

class CategoryRepo {
    public static function findById($id){
        return Category::find($id);
    }
    
    public static function findAll(){
        return Category::all();
    }

    public static function delete($id){
        return Category::detroy($id);
    }

    public static function update($id,$params){
        $category = self::findById($id);
        return $category->update($formatArrayData);
    }

    public static function insert($params){
        return Category::create($params);
    }

}