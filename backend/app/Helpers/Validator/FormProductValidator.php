<?php 
namespace App\Helpers\Validator;

use App\Repositories\Category\CategoryRepo;
use App\Exceptions\ProductException;

class FormProductValidator extends Validator{

        
    public static function validate($array){
        if(isset($array['category_id']) && $array['category_id']==0)
            throw new ProductException(['La categoría es obligatoria']);

        if(isset($array['category_id']) && is_null(CategoryRepo::findById($array['category_id'])))
            throw new ProductException(['La categoría con el id: '.$array['category_id'].' no existe']);



        $validate = \Validator::make(
            $array,
            [
                'title' => 'required',
                'description' => 'required',
                'category_id' => 'required',
            ]
        );
        if ($validate->fails())
            throw new ProductException(self::errores($validate->errors()));
    } 

}
