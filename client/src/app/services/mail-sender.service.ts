import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GLOBAL} from '../services/global';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MailSenderService {
  private url:string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.api;
  }

  public sendMail(name,from,phone,msj):Observable<any>{
    const headers = new HttpHeaders();
    let subject = 'Mensaje a MARIA GUERRERO DECORACIÓN de: ' + name; 
    let body={
      name:name,
      from:from,
      phone:phone,
      msj:msj,
      subject:subject
    }
    return this._http.post(this.url+'/contact',JSON.stringify(body),{headers:headers}) 
  }

  public sendMailPresupuesto(name,from,phone,products,cantidades){
    let headers =new HttpHeaders();
    let subject = 'PEDIDO PRESUPUESTO a MARIA GUERRERO DECORACIÓN de: ' + name; 
    let body={
      name:name,
      from:from,
      phone:phone,
      products:products,
      cantidades: cantidades
    }
    return this._http.post(this.url+'/budget',JSON.stringify(body),{headers:headers});
  }
}
