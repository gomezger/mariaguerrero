<?php
namespace App\Helpers\Validator;

use App\Exception\InvalidFileException;
use App\Helpers\Validator\Validator;

class FileValidator extends Validator{
    
    public function __construct(){}

    public function validate($file,$condition){
        $validate = \Validar::make(['archivo'=>$file],['archivo'=>$condition]);
        if ($validate->fails())
            throw new InvalidFileException($this->errores($validate->errors())[0]);
    } 
}
