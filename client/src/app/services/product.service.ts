import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string; 

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ) {
    this.url = GLOBAL.api;
  }


  public insert(product: Product, mainPhoto: File, photos: Array<File>): Observable<any>{
    const token = this._userService.getToken();  
    const headers = new HttpHeaders({});                 

    const form = new FormData();
    form.append('json',JSON.stringify(product));
    if(mainPhoto!=null) form.append('main_photo', mainPhoto);
    if(photos!=null) 
      for(let p of photos)
        form.append('photos[]', p, p.name);

    return this._http.post(this.url+'/products', form, {headers: headers});
  } 



}
