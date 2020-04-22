<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\User\UserRepo;
use App\Helpers\Response\Response;
use App\Helpers\Validator\FormUserValidator;

class UserController extends Controller
{
    
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

    public function login(Request $request){ 
        
    }

}
