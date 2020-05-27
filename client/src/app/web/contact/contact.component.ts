import { Component, OnInit } from '@angular/core';
import {MailSenderService} from '../../services/mail-sender.service';
import {Contacto}from '../../models/contacto';
import { Title } from '@angular/platform-browser';
import { Info } from '../../services/info';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public info: any;
  public myContacto:Contacto;
  public exito:boolean;

  constructor(
    private _mailSenderService:MailSenderService,
    private _title: Title
  ) { 
    this.myContacto= new Contacto('','','','');
    this.exito=false;
    this.info = Info;
  }

  ngOnInit(): void {
    this._title.setTitle('Contacto | Maria Guerrero: Muebles y objetos | Bahía Blanca');    
  }

  onSubmitContacto(){
    this.sendMailFront();
  }

  sendMailFront(){
    this._mailSenderService.sendMail(this.myContacto.nombre,this.myContacto.from,this.myContacto.phone,this.myContacto.msj)
    .subscribe(
      response=>{
        console.log(response);
        this.exito=true;
      },
      error=>{console.log(error)});
  }
}
