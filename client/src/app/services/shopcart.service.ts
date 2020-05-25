import { Injectable } from '@angular/core';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopcartService {

  constructor() { }

  saveProduct(productToSave :Product,cant){
    if (localStorage.getItem('presupuesto')&& localStorage.getItem('cantidades')){
      let presupuesto= [];
      let cantidades = [];
      presupuesto = JSON.parse(localStorage.getItem('presupuesto'));
      cantidades = JSON.parse(localStorage.getItem('cantidades'));
      presupuesto.push(productToSave);
      cantidades.push(cant);
      localStorage.setItem('presupuesto',JSON.stringify(presupuesto));
      localStorage.setItem('cantidades',JSON.stringify(cantidades));
    }else{
      let save = [productToSave];
      let cantidad= [cant];
      localStorage.setItem('presupuesto',JSON.stringify(save));
      localStorage.setItem('cantidades',JSON.stringify(cantidad));
    }
  }

  getProducts(){
    if (localStorage.getItem('presupuesto')){
      return JSON.parse(localStorage.getItem('presupuesto'));
    }
  }

  getCantidades(){
    if (localStorage.getItem('cantidades')){
      return JSON.parse(localStorage.getItem('cantidades'));
    }
  }

  eliminar(i){
    if (localStorage.getItem('presupuesto')&& localStorage.getItem('cantidades')){
      let presupuesto= [];
      let cantidades = [];
      presupuesto = JSON.parse(localStorage.getItem('presupuesto'));
      cantidades = JSON.parse(localStorage.getItem('cantidades'));
      presupuesto.splice(i,1);
      cantidades.splice(i,1);
      localStorage.setItem('presupuesto',JSON.stringify(presupuesto));
      localStorage.setItem('cantidades',JSON.stringify(cantidades));
    }
  }



}
