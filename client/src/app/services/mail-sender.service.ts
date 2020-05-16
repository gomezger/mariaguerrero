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
    const headers = new HttpHeaders().set('Content-Type','application/json');
    let body={
      'name':name,
      'from':from,
      'phone':phone,
      'msj':msj,
      'to':'mati.luciano.garcia@gmail.com'
    }
    return this._http.post(this.url+'contact',body,{'headers':headers}) 
  }
}
