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
    const ide = localStorage.getItem('panel-identity');
    if(ide!=null){
      const dato:any = JSON.parse(ide);
      this.name = dato.name;
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
