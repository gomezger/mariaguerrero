<?php

namespace App\Repositories\Product;
use App\Models\Product;
use App\Exceptions\ProductException;

class ProductRepo {
    
    public static function findById($id){
        return Product::find($id);
    }
    
    public static function findAll(){
        return Product::all();
    }

    public static function delete($id){
        $product = self::findById($id);

        if(is_null($product))
            throw new ProductException(['El producto no existe']);

        return Product::destroy($id);
    }

    public static function update($id,$params){
        $product = self::findById($id);

        if(is_null($product))
            throw new ProductException(['El producto no existe']);

        //Function update need an array
        $product->update($params);
        return $product;
    }

    public static function insert($params){
        return Product::create($params);
    }

    public static function getProductByCategory($category){} 

}