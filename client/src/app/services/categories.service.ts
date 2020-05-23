import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private url: string; 

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ) {
    this.url = GLOBAL.api;
  }


  public getCategories(): Observable<any>{
    const headers = new HttpHeaders();
    return this._http.get(this.url+'/categories', {headers: headers});
  } 

  public delete(category: Category): Observable<any> {
    const headers = new HttpHeaders(
      {
        Authorization : this._userService.getToken() 
      }
    );

    return this._http.delete( this.url + '/categories/' + category.id, { headers : headers});
  }

  public insert(category: Category): Observable<any>{
    const headers = new HttpHeaders({
      Authorization : this._userService.getToken()
    });
    return this._http.post(this.url + '/categories', JSON.stringify(category), { headers: headers});
  }

  public update(category: Category): Observable<any>{
    const headers = new HttpHeaders({
      Authorization : this._userService.getToken(),
      'Content-Type' : 'application/json'
    });
    return this._http.put(this.url + '/categories/' + category.id, JSON.stringify(category), { headers: headers});
  }

}
