<?php
namespace App\Repositories\User;
use App\Models\User;
use App\Exceptions\UserException;

class UserRepo {
    public static function findById($id){
        return User::find($id);
    }
    public static function find($conditions){
        $query = User::all();
        foreach($conditions as $condition)
            $query = $query->where($condition['key'],$condition['condition'],$condition['value']);
        return $query->first();
    }
    
    public static function findAll(){
        return User::all();
    }

    public static function delete($id){
        $user = self::findById($id);

        if(is_null($user))
            throw new UserException(['El usuario no existe']);
            
        User::destroy($id);
        return $user;
    }

    public static function update($id,$params){
        $user = self::findById($id);

        if(is_null($user))
            throw new UserException(['El usuario no existe']);

        $user->update($params);
        return $user;
    }

    public static function insert($params){
        return User::create($params);
    }


}