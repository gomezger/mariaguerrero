import { Component, OnInit } from '@angular/core';
import { Info } from 'src/app/services/info';
import * as $ from 'jquery';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit {
  public info: any;

  constructor() { }

  ngOnInit(): void {
    this.info = Info;

    $(document).ready(function() {       
      $(window).scroll(function(){
        var windowHeight = $(window).scrollTop();
        var contenido2 = $('.page-footer').offset();
        var contenido3 = contenido2.top-800;
          
        if(windowHeight <= contenido3  ){
          $('#whatsapp').fadeIn(500);       
        }else{
          $('#whatsapp').fadeOut(500);
        }
      });
    });
  }
}
