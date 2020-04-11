<?php
namespace App\Helpers\Response;

class Response{

    /**
     * @message: string
     */
    public function success($message, $name_object, $object){
        return array(
            "status" => "success",
            "code" => 200,
            "message" => $message,
            $name_object => $object
        );
    }

    /**
     * @code: number
     * @message: string
     * @errors: string array
     */
    public function error($code, $message, $errors){
        return array(
            "status" => "error",
            "code" => $code,
            "message" => $message,
            "errors" => $errors
        );
    }
    
}