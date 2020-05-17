import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {


  constructor(
    private _route: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    
    const log = localStorage.getItem('panel-login');
    const tok = localStorage.getItem('panel-token');
    const ide = localStorage.getItem('panel-identity');

    let ok = true;

    //si esta logueado, chequeamos que no haya expirado
    if(log!=null && tok!=null && ide!=null && log=='true'){
      
      // get actual time and expire time
      const exp = JSON.parse(ide).exp;
      const actual = Math.floor(new Date().getTime() / 1000); // time() en php

      // expire?
      if(actual>exp)
        ok = false;

    // no login
    }else     
        ok = false; 
    
    // go to login
    if(!ok)
      this._route.navigate(['/panel/login']);

    return ok;
  
  }
  
}
