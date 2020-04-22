<?php
namespace App\Exceptions;
 
use Exception;

class UserUploadException extends ExceptionManager{

    public function __construct($errors){
        parent::__construct(400,'Error al subir el usuario',$errors);
    }
       
}