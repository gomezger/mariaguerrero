<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\User\UserRepo;
use App\Helpers\Response\Response;
use App\Helpers\Validator\FormUserValidator;
use App\Helpers\Auth\JwtAuth;

class UserController extends Controller
{
    private $auth;

    function __construct(){
        $this->auth = new JwtAuth();
    }
    
    public function insert(Request $request){ 
        // get data 
        $requestParams = $request->json()->all();

        // validate data
        FormUserValidator::validate($requestParams);

        // encrypt password
        $requestParams['password'] = hash('sha256',$requestParams['password']);

        $user = UserRepo::insert($requestParams);

        return Response::success('Usuario creado','usuario',$user);
    }
    
    public function update($id, Request $request){ 
        // get data 
        $requestParams = $request->json()->all();

        // validate data
        FormUserValidator::validateData($requestParams);

        // encrypt password
        $requestParams['password'] = hash('sha256',$requestParams['password']);

        $user = UserRepo::update($id, $requestParams);

        return Response::success('Usuario editado','usuario',$user);
    }


    public function login(Request $request){ 
        // get data 
        $requestParams = $request->json()->all();
        
        // validate data        
        FormUserValidator::validateLogin($requestParams);

        // get Token
        $password = hash('sha256', $requestParams['password']);
        $token = $this->auth->getToken($requestParams['email'],$password);
        $identity = $this->auth->getDataToken($requestParams['email'],$password);

        return Response::success('Token generado',['token','identity'],[$token,$identity]);        
    }

    
    public function delete($id){
        $user = UserRepo::delete($id);
        return Response::success('Usuario eliminado','usuario',$user);
    } 

}
