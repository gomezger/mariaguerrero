<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => ['cors']], function () {

    // need token auth
    Route::group(['middleware' => ['auth.token']], function () {  
        
        // products
        Route::post('products', 'ProductController@insert');  


    });

    // no need token auth

        // users
        Route::post('users', 'UserController@insert');  
});