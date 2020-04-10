<?php
namespace App\Repositories\Category;
use App\Models\Category;

class CategoryRepository {
    public static function findById($id){
        return Category::find($id);
    }
    
    public static function findAll(){
        return Category::all();
    }

    public static function delete($id){
        Category::detroy($id);
    }

    public static function update($id,$params){
        $category = self::findById($id);
        $formatArrayData=json_decode($params,true); 
        //Function update need an array
        $category->update($formatArrayData);

    }

    public static function insert($params){
        Category::create($params);
    }

}