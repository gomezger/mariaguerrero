import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit,DoCheck {
  public name: string;

  constructor(
    private _route: Router
  ) { }

  ngOnInit(): void {
    document.title = "Panel de control";
  }


  ngDoCheck() {
    this.checkSession();
  }


  
  private checkSession(){
    //ver si esta logueado
    const log = localStorage.getItem('panel-login');
    const tok = localStorage.getItem('panel-token');
    const ide = localStorage.getItem('panel-identity');

    //si esta logueado, chequeamos que no haya expirado
    if(log!=null && tok!=null && ide!=null && log=='true'){
      
      //expira en
      const dato:any = JSON.parse(ide);
      const exp = dato.exp;
      const actual = Math.floor(new Date().getTime() / 1000); //es lo mismo que time() en php


      if(actual>exp){
        this._route.navigate(['/panel/login']);
      }else{
        this.name = dato.name;
      }

    //redirigimos al login
    }else{      
        this._route.navigate(['/panel/login']);
    }
  }

  toggle() {
		$('#wrapper').toggleClass('toggled');
  }


  logout(){    
    localStorage.removeItem('panel-token');
    localStorage.removeItem('panel-identity');
    localStorage.removeItem('panel-login');

    this._route.navigate(['panel/login']);
  }
}
