<?php
namespace App\Repositories\Product;
use App\Models\Product;

class ProductRepository implements ProductInterfaceRepository{
    private Product $myProduct;

    public function __construct(){
        $this->myProduct=new Product();
    }

    public function getModel(){
        return $this->myProduct;
    }

    public function findById($id){
        return Product::find($id);
    }
    
    public function findAll(){
        return Product::all();
    }

    public function delete($id){
        Product::detroy($id);
    }

    public function update($id,$params){
        $product = $this->findById($id);
        $formatArrayData=json_decode($params,true); 
        //Function update need an array
        $product->update($formatArrayData);

    }

    public function insert($params){
        Product::create($params);
    }

    public function getProductByCategory($category){} 

}