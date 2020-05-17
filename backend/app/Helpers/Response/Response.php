<?php
namespace App\Helpers\Response;

class Response{

    /**
     * @message: string
     */
    public static function success($message, $name_object, $object){


        if(is_array($name_object)){
            $response = array(
                "status" => "success",
                "code" => 200,
            );

            for($i=0; $i<count($name_object); $i++)
                $response[$name_object[$i]] = $object[$i];

            return $response;

        }else{
            return array(
                "status" => "success",
                "code" => 200,
                "message" => $message,
                $name_object => $object
            );
        }


        
    }

    /**
     * @code: number
     * @message: string
     * @errors: string array
     */
    public static function error($code, $message, $errors){
        return array(
            "status" => "error",
            "code" => $code,
            "message" => $message,
            "errors" => $errors
        );
    }    
}
