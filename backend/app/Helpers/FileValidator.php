<?php
namespace App\Helpers;

use App\Exception\InvalidFileException;

class FileValidator{
    
    public function __construct(){}

    public function validate($file,$condition){
        $validar=\Validar::make(['archivo'=>$file],['[archivo]'=>$condition]);
        if ($validar) return true;
        else{
            throw new InvalidFileException('Formato del archivo invalido.');
        }
    } 
}