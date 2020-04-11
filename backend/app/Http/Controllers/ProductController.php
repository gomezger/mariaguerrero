<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Product\ProductRepository;
use App\Exception\InvalidFileException;
use App\Helper\Validator\FileValidator;
use App\Helper\File\FileUploader;
use App\Helper\Response\Response;

class ProductController extends Controller
{
    public function insert(Request $request){ 
        return "hola";

        try{
            $requestParams = json_decode($request->input('json'),true);

            // upload image
            FileValidator::validate($request->file('file'),'mimes:jpeg,gif,png|required');
            $requestParams['file'] = FileUploader::upload($request->file('file'),'public');

            // upload product
            $product = ProductRepository::insert($requestParams);

            $data = Response::success('Producto subido','producto',$product);

        }catch(InvalidFileException $e){
            $data= Response::error(200,$e->getMessage());
        }
        return $data;
    }
}
