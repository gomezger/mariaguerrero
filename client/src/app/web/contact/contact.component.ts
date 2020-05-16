import { Component, OnInit } from '@angular/core';
import {MailSenderService} from '../../services/mail-sender.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private _mailSenderService:MailSenderService) { }

  ngOnInit(): void {
    this.prueba();
  }

  prueba(){
    this._mailSenderService.sendMail('Juan Perez','juanperez@juan.com','2914411801','Esto es un mensaje de prueba')
    .subscribe(
      response=>{console.log(response)},
      error=>{console.log(error)});
  }
}
