import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private url: string; 

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.api;
  }


  public getCategories(): Observable<any>{
    const headers = new HttpHeaders();
    return this._http.get(this.url+'/categories', {headers: headers});
  } 

}
