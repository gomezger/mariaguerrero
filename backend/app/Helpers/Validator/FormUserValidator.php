<?php 
namespace App\Helpers\Validator;

use App\Repositories\User\UserRepo;
use App\Exceptions\UserUploadException;

class FormUserValidator extends Validator{

        
    public static function validate($array){
        
        if(isset($array['email']) && !is_null(UserRepo::findByEmail($array['email'])))
            throw new UserUploadException(['El usuario con el email: '.$array['email'].' ya existe']);

        $validate = \Validator::make(
            $array,
            [
                'name' => 'required|max:191',
                'email' => 'required|email:rfc,dns|max:191',
                'password' => 'required|max:191',
            ]
        );
        if ($validate->fails())
            throw new UserUploadException(self::errores($validate->errors()));
    } 

}
