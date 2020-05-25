import { Component, OnInit } from '@angular/core';
import {ShopcartService} from '../../services/shopcart.service'

import {Product} from '../../models/product';
import {Category}from '../../models/category';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss']
})
export class PresupuestoComponent implements OnInit {

  public presupuesto:Product [];
  public cantidades:[];

  constructor(
    private _shopcart:ShopcartService,
    private _title: Title
  ) { }

  ngOnInit(): void {
    // let p1:Product;
    // let p2:Product;
    // let p3:Product;
    // p1 = new Product(1,'Producto Prueba 1',1,new Category(1,'test',null,null),null,'sadasjdgasjdgadads',null,null);
    // p2 = new Product(1,'Producto Prueba 2',1,new Category(1,'test',null,null),null,'sadasjdgasjdgadads',null,null);
    // p3 = new Product(1,'Producto Prueba 3',1,new Category(1,'test',null,null),null,'sadasjdgasjdgadads',null,null);

    // this._shopcart.saveProduct(p1,2);
    // this._shopcart.saveProduct(p2,1);
    // this._shopcart.saveProduct(p3,5);

    this.presupuesto= this._shopcart.getProducts();
    this.cantidades =this._shopcart.getCantidades();

    console.log(this.presupuesto);
    console.log(this.cantidades);

    
    this._title.setTitle('Presupuesto | Maria Guerrero: Muebles y objetos | Bahía Blanca');  
  }

  eliminarElemento(i){
    console.log(i)
    this.presupuesto.splice(i,1);
    this.cantidades.splice(i,1);
    this._shopcart.eliminar(i);

  }

}
