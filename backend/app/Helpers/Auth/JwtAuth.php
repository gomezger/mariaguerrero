<?php
namespace App\Helpers\Auth;

use Firebase\JWT\JWT;
use App\Helpers\Auth\AuthInterface;
use App\Repositories\User\UserRepo;
use Illuminate\Support\Facades\BD;
use App\Models\User;
use App\Exceptions\AuthException;

class JwtAuth implements AuthInterface{

    public $key;

    public function __construct(){
        $this->key = 'the most difficult key of the world $%&/()·';
    }

    /**
     * Returns the user's data token with correct email and password
     */
    public function getDataToken($email, $password){
        $data = $this->getToken($email, $password);

        // si es un string, es porque existe el usuario y lo decodifico
        if(is_string($data))
            return JWT::decode($data,$this->key,['HS256']);        
        else
            throw new AuthException(['El usuario o contraseña incorrecto']);          
    }

    /**
     * Returns the user's token with correct email and password
     */
    public function getToken($email, $password){
        // buscar si existe el usuario con sus credenciales
        $user = UserRepo::find([
                                ['key'=>'email','condition'=>'=','value'=>$email],
                                ['key'=>'password','condition'=>'=','value'=>$password]
                              ]);

        //Comprobar si son correctos (objetos) 
        //generar Token con los datos del usuario idetificado
        if(is_object($user)){
            $token = array(
                'sub' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'iat' => time(),
                'exp' => time() + (7 * 24 * 60 * 60) //dura una semana (semana*dia*minutos*segundos)
            );

            $data = JWT::encode($token, $this->key, 'HS256');

        }else       
            throw new AuthException(['El usuario o contraseña incorrecto']);   

        return $data;        
    }

    /**
	 * Verifico si el token es valido
	 * $token, token de sesion
	 */
	public function checkToken($token){
		try{
            //decodifico
            $decoded = JWT::decode($token, $this->key, array('HS256'));

            //si es un objeto: es token valido
            if(is_object($decoded))
                return true;
            else
                return false;  

		}catch(\UnexpectedValueException $e){
            throw new AuthException(['Envie el token por header']);    
		}catch(\DomainException $e){
            throw new AuthException(['El token no es válido']);    
		}
	}

    /**
	 * Devuelvo datos del token
	 * $token, token de sesion
	 */
	public function getIdentity($token){
		try{
            //decodifico
            $decoded = JWT::decode($token, $this->key, array('HS256'));

            //si es un objeto: es token valido
            if(is_object($decoded))
                return $decoded;
            else
                return null;            

		}catch(\UnexpectedValueException $e){
            throw new AuthException(['Envie el token por header']);   
		}catch(\DomainException $e){
            throw new AuthException(['El token no es válido']);    
		}
    }
}

