<?php

namespace App\Helpers\Auth;


interface AuthInterface{

    /**
     * Returns the user's data token with correct email and password
     */
    public function getDataToken($email, $password);

    /**
     * Returns the user's token with correct email and password
     */
    public function getToken($email, $password);

    /**
	 * Validate Token data
	 */
	public function checkToken($token);

    /**
	 * Return token's data
     * @return array with data if exists, and null when don't exists
	 */
	public function getIdentity($token);
}