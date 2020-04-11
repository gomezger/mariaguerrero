<?php

namespace App\Http\Middleware;

use Closure;
use \App\Helpers\Response\Response as Resp;
use \App\Helpers\Auth\JwtAuth;

class AuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

		$hash = $request->header('Authorization',null);				
        $jwtAuth = new JwtAuth();
                
        if(!$jwtAuth->checkToken($hash)){
            $data = Resp::error(1000,'Error al verificar token','No inició sesión');
            return response()->json($data,200);	
        }

        return $next($request);
    }
}
