<?php 
namespace App\Helpers\Validator;

use App\Repositories\User\UserRepo;
use App\Exceptions\UserException;

class FormUserValidator extends Validator{

    public static function validate($array){
        
        if(isset($array['email'])){
            $user = UserRepo::find([['key'=>'email','condition'=>'=','value'=>$array['email']]]);
            if(!is_null($user))
                throw new UserException(['El usuario con el email: '.$array['email'].' ya existe']);
        }

        self::validateData($array);
    }  
    
    public static function validateData($array){
        
        $validate = \Validator::make(
            $array,
            [
                'name' => 'required|max:191',
                'email' => 'required|email:rfc,dns|max:191',
                'password' => 'required|max:191',
            ]
        );
        if ($validate->fails())
            throw new UserException(self::errores($validate->errors()));
    }          

    public static function validateLogin($array){
        $validate = \Validator::make(
            $array,
            [
                'email' => 'required',
                'password' => 'required',
            ]
        );
        if ($validate->fails())
            throw new UserException(self::errores($validate->errors()));
    } 

}
