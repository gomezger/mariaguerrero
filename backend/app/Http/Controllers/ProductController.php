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
        // validate data product
        FormProductValidator::validate($requestParams);

        //validate main photos and seconday photos
        FileValidator::validate($request->file('main_photo'),'mimes:jpeg,gif,png|required');
        foreach($request->file('photos') as $file)
            FileValidator::validate($file,'mimes:jpeg,gif,png|required');
        
        // upload main image
        $requestParams['images']  = array();
        array_push($requestParams['images'],FileUploader::upload($request->file('main_photo'),'public'));

        //upload seconday photos
        foreach($request->file('photos') as $file)
            array_push($requestParams['images'],FileUploader::upload($file,'public'));
        
        // array to json
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
        return Response::success('Producto cargado','producto',$product);
    }

    public function update($id,Request $request){
        //get data
        $requestParams = json_decode($request->input('json'),true);

        // validate data product
        FormProductValidator::validate($requestParams);

        //original data
        $images = json_decode(ProductRepo::findById($id)->images,true);

        //upload main img 
        if ($request->file('main_photo')!=null){
            FileValidator::validate($request->file('main_photo'),'mimes:jpeg,gif,png|required');
            $images[0] = FileUploader::upload($request->file('main_photo'),'public');
        }

        //upload other photos
        if ($request->file('photos')!=null){
            foreach($request->file('photos') as $file)
                FileValidator::validate($file,'mimes:jpeg,gif,png|required');
            $images = array($images[0]);
            foreach($request->file('photos') as $file)
                array_push($images,FileUploader::upload($file,'public'));
        }   

        $requestParams['images'] = json_encode($images);
        $product = ProductRepo::update($id,$requestParams);
        return Response::success('Producto editado','producto',$product);
    }

    public function delete($id){
        $product =  ProductRepo::delete($id);
        return Response::success('Producto eliminado','producto',$product);
    }    

    //La idea es usar estos metodos en los de arriba para ahorrar codigo    
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
