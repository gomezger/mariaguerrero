<?php
namespace App\Exceptions;
 
use Exception;

class UserException extends ExceptionManager{

    public function __construct($errors){
        parent::__construct(400,'Error en controlador de usuarios',$errors);
    }
       
}