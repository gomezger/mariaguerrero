<?php
namespace App\Repositories\Product;
use App\Models\Product;

class ProductRepository {
    public static function findById($id){
        return Product::find($id);
    }
    
    public static function findAll(){
        return Product::all();
    }

    public static function delete($id){
        Product::detroy($id);
    }

    public static function update($id,$params){
        $product = self::findById($id);
        $formatArrayData=json_decode($params,true); 
        //Function update need an array
        $product->update($formatArrayData);

    }

    public static function insert($params){
        return Product::create($params);
    }

    public static function getProductByCategory($category){} 

}