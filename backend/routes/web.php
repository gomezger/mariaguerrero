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
    

    //----- need token auth -----//
    Route::group(['middleware' => ['auth.token']], function () {  
        
        // products
        Route::post('products/{id}', 'ProductController@update');  
        Route::delete('products/{id}', 'ProductController@delete');  
        Route::post('products', 'ProductController@insert');  

        // categories
        Route::post('categories', 'CategoryController@insert');  
        Route::put('categories/{id}', 'CategoryController@update');  
        Route::delete('categories/{id}', 'CategoryController@delete');  

        // users
        Route::post('users', 'UserController@insert');  
        Route::put('users/{id}', 'UserController@update');   
        Route::delete('users/{id}', 'UserController@delete'); 

    });

    //----- no need token auth -----//

    //products
    Route::get('products', 'ProductController@getAll');  
    Route::get('products/{id}', 'ProductController@getById');  

    // users
    Route::post('users/login', 'UserController@login');  
    Route::get('users', 'UserController@getAll');  

    //categories
    Route::get('categories', 'CategoryController@getAll');  

    //mail
    Route::post('contact', 'SendEmailController@contact');
    Route::post('budget', 'SendEmailController@budget');

});
