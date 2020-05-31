<?php
namespace App\Helpers\Validator;

abstract class Validator{
    
    protected static function errores($arreglo_validator){
        $arreglo = json_decode(json_encode($arreglo_validator), true);
        $errores = array();
        foreach($arreglo as $error_por_tipo)
            foreach($error_por_tipo as $error)
                array_push($errores, $error);
        return $errores;
    }
}
