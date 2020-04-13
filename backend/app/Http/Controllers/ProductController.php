<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Product\ProductRepo;
use App\Repositories\Category\CategoryRepository;
use App\Exception\InvalidFileException;
use App\Helpers\Validator\FileValidator;
use App\Helpers\Validator\FormProductValidator;
use App\Helpers\File\FileUploader;
use App\Helpers\Response\Response;

class ProductController extends Controller
{

    public function insert(Request $request){ 
        // get data 
        $requestParams = json_decode($request->input('json'),true);

        // validate data
        FileValidator::validate($request->file('file'),'mimes:jpeg,gif,png|required');
        FormProductValidator::validate($requestParams);
        
        // upload image
        $requestParams['images']  = array();
        array_push($requestParams['images'],FileUploader::upload($request->file('file'),'public'));
        $requestParams['images'] = json_encode($requestParams['images']);

        $product = ProductRepo::insert($requestParams);
        return Response::success('Producto subido','producto',$product);
        
    }

    public function getAll(){
        $products=ProductRepo::findAll();
        return Response::success('Productos listos','productos',$products);
    }

    public function getById($id){
        $product = ProductRepo::findById($id);
        return Response::success('Producto subido','producto',$product);
    }

    public function update($id,Request $request){
        //get data
        $requestParams = json_decode($request->input('json'),true);

        //Validate data
        FileValidator::validate($request->file('file'),'mimes:jpeg,gif,png|required');
        FormProductValidator::validate($requestParams);

        //upload image
        $requestParams['images']  = array();
        array_push($requestParams['images'],FileUploader::upload($request->file('file'),'public'));
        $requestParams['images'] = json_encode($requestParams['images']);

        ProductRepo::update($id,$requestParams);
    }

    public function delete($id){
        ProductRepo::delete($id);
    }    

    private function getData(Request $request){
        $requestParams = json_decode($request->input('json'),true);
    }

    private function validateData(Request $request, $requestParams){
        FileValidator::validate($request->file('file'),'mimes:jpeg,gif,png|required');
        FormProductValidator::validate($requestParams);
    }

    private function uploadImage($requestParams){
        $requestParams['images']  = array();
        array_push($requestParams['images'],FileUploader::upload($request->file('file'),'public'));
        $requestParams['images'] = json_encode($requestParams['images']);
    }
}
