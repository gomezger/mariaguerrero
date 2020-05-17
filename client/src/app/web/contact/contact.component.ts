import { Component, OnInit } from '@angular/core';
import {MailSenderService} from '../../services/mail-sender.service';
import {Contacto}from '../../models/contacto';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public myContacto:Contacto;
  public exito:boolean;

  constructor(private _mailSenderService:MailSenderService) { 
    this.myContacto= new Contacto('','','','');
    this.exito=false;
  }

  ngOnInit(): void {
    
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
