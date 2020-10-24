<?php

namespace App\Repositories\Product;
use App\Models\Product;
use App\Exceptions\ProductException;

class ProductRepo {

    public static function findById($id){
        $product =  Product::find($id)->load('category');
        $product->images = json_decode($product->images);
        return $product;
    }

    public static function findAll($cant = 0){
        if($cant!=0)
            $products = Product::inRandomOrder()->limit($cant)->get()->load('category');
        else
            $products = Product::all()->load('category');

        foreach($products as $p)
            $p->images = json_decode($p->images);
        return $products;
    }

    public static function delete($id){
        $product = self::findById($id);

        if(is_null($product))
            throw new ProductException(['El producto no existe']);

        Product::destroy($id);
        return $product;
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
