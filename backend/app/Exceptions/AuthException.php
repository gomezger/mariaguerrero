<?php
namespace App\Exceptions;
 
use Exception;

class AuthException extends ExceptionManager{

    public function __construct($errors){
        parent::__construct(400,'Error en autenticación',$errors);
    }
       
}