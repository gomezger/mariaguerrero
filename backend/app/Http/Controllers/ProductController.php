<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Product\ProductRepository;
use App\Exception\InvalidFileException;
use App\Helper\FileValidator;

class ProductController extends Controller
{
    public function insert(Request $request){ 
        try{
            //[json]
            $requestParams = json_decode($request->input('json'),true);
            $file= $request->file('file');
            //esto va a ir en middleware
            FileValidator::validate($file,'mimes:jpeg,gif,png|required');

            //esto sale para combertirce en una nueva clase
            $file_original_path = $file->getClientOriginalName();
            $file_new_path = time().$file->hashName();
            \Storage::disk('public')->put($file_new_path, \File::get($file));

            $requestParams['file']=$file_new_path;
            ProductRepository::insert($requestParams);
            $data=[
                'status'=>'200',
                'message'=>'Salio todo ok'
            ];

        }catch(InvalidFileException $e){
            $data=[
                'status'=>'400',
                'code'=> 1,
                'message'=>'Formato del archivo invalido.'
            ]; 
        }
        return $data;
    }
}
