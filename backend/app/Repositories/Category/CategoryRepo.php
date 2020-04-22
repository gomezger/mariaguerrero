<?php
namespace App\Repositories\Category;


use App\Models\Category;
use App\Exceptions\CategoryException;

class CategoryRepo {
    public static function findById($id){
        return Category::find($id);
    }
    
    public static function findAll(){
        return Category::all();
    }

    public static function delete($id){
        $category = self::findById($id);

        if(is_null($category))
            throw new CategoryException(['La categoría no existe']);
            
        Category::destroy($id);
        return $category;
    }

    public static function update($id,$params){
        $category = self::findById($id);

        if(is_null($category))
            throw new CategoryException(['La categoría no existe']);

        $category->update($params);
        return $category;
    }

    public static function insert($params){
        return Category::create($params);
    }

}