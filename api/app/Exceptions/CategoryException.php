<?php
namespace App\Exceptions;
 
use Exception;

class CategoryException extends ExceptionManager{

    public function __construct($errors){
        parent::__construct(400,'Error en controlador de categorias',$errors);
    }
       
}