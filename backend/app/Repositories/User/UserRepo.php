<?php
namespace App\Repositories\User;
use App\Models\User;

class UserRepo {
    public static function findById($id){
        return User::find($id);
    }
    
    public static function findAll(){
        return User::all();
    }

    public static function delete($id){
        User::detroy($id);
    }

    public static function update($id,$params){
        $user = self::findById($id);
        $formatArrayData=json_decode($params,true); 
        //Function update need an array
        $user->update($formatArrayData);

    }

    public static function insert($params){
        User::create($params);
    }


}