<?php 
namespace App\Helpers\Validator;

use App\Repositories\Category\CategoryRepo;
use App\Exceptions\ProductUploadException;

class FormProductValidator extends Validator{

        
    public static function validate($array){

        if(isset($array['category_id']) && is_null(CategoryRepo::findById($array['category_id'])))
            throw new ProductUploadException(['La categoría con el id: '.$array['category_id'].' no existe']);


        $validate = \Validator::make(
            $array,
            [
                'title' => 'required',
                'description' => 'required',
                'category_id' => 'required',
            ]
        );
        if ($validate->fails())
            throw new ProductUploadException(self::errores($validate->errors()));
    } 

}
