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


  /**
   * Insert product
   * @param product data of product 
   * @param mainPhoto 
   * @param photos 
   */
  public insert(product: Product, mainPhoto: File, photos: Array<File>): Observable<any>{

    const headers = {
      headers : new HttpHeaders({
        Authorization : this._userService.getToken()
      })
    };           

    const form = new FormData();
    form.append('json',JSON.stringify(product));
    if(mainPhoto!=null) form.append('main_photo', mainPhoto);
    if(photos!=null) 
      for(let p of photos)
        form.append('photos[]', p, p.name);

    return this._http.post(this.url+'/products', form, headers);
  } 

  /**
   * Insert product
   * @param product data of product 
   * @param mainPhoto 
   * @param photos 
   */
  public update(product: Product, mainPhoto: File, photos: Array<File>): Observable<any>{

    const headers = {
      headers : new HttpHeaders({
        Authorization : this._userService.getToken()
      })
    };           

    const form = new FormData();
    form.append('json',JSON.stringify(product));
    if(mainPhoto!=null) form.append('main_photo', mainPhoto);
    if(photos!=null) 
      for(let p of photos)
        form.append('photos[]', p, p.name);

    return this._http.post(this.url+'/products/' + product.id, form, headers);
  } 

  /**
   * Get all products
   */
  public getAll(): Observable<any> {
    const headers = {headers : new HttpHeaders()};
    return this._http.get(this.url + '/products', headers);
  }
  
  /**
   * Get all products
   */
  public getN(cant: number): Observable<any> {
    const headers = {headers : new HttpHeaders()};
    return this._http.get(this.url + '/products/quantity/' + cant, headers);
  }
  
  /**
   * Get all products
   */
  public getById(id: number): Observable<any> {
    const headers = {headers : new HttpHeaders()};
    return this._http.get(this.url + '/products/' + id, headers);
  }

  /**
   * Get all products
   */
  public delete(product: Product): Observable<any> {
    const headers = {
      headers : new HttpHeaders({
        Authorization : this._userService.getToken()
      })
    };
    return this._http.delete(this.url + '/products/' + product.id, headers);
  }

  
  replaceUrl(url){
    return url.replace(/[^a-zA-Z 0-9.]+/g,'').replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();
  }


}
