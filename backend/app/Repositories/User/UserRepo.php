<?php
namespace App\Repositories\User;
use App\Models\User;

class UserRepo {
    public static function findById($id){
        return User::find($id);
    }
    public static function findByEmail($email){
        return User::where('email','=',$email)->first();
    }
    
    public static function findAll(){
        return User::all();
    }

    public static function delete($id){
        return User::detroy($id);
    }

    public static function update($id,$params){
        $user = self::findById($id);
        return $user->update($formatArrayData);
    }

    public static function insert($params){
        return User::create($params);
    }


}