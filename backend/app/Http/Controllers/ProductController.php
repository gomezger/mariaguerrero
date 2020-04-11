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
}
