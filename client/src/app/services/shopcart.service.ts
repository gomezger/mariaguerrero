import { Injectable } from '@angular/core';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopcartService {

  constructor() { }

  saveProduct(productToSave :Product){
    if (localStorage.getItem('presupuesto')){
      let  presupuesto= []
      presupuesto  = JSON.parse(localStorage.getItem('presupuesto'));
      presupuesto.push(productToSave);
    }else{
      let save = [productToSave];
      localStorage.setItem('presupuesto',JSON.stringify(save));
    }
  }

  getProducts(){
    if (localStorage.getItem('presupuesto')){
      return JSON.parse(localStorage.getItem('presupuesto'))
    }
  }
}
