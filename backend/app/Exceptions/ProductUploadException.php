<?php
namespace App\Exceptions;
 
use Exception;

class ProductUploadException extends ExceptionManager{

    public function __construct($errors){
        parent::__construct(400,'Error al subir el producto',$errors);
    }
       
}