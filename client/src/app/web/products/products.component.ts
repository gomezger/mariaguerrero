import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import * as $ from 'jquery';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  p = 0;
  public categories: Array<Category>;
  public products: Array<Product>;
  public productsAll: Array<Product>;
  public filter: string = '';

  constructor(
    private _categoriesService: CategoriesService,
    private _productsService: ProductService,
    private _title: Title
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
    this._title.setTitle('Productos | Maria Guerrero: Muebles y objetos | Bahía Blanca');    
  }

  private getCategories(){
    this._categoriesService.getCategories().subscribe(
      (response) => {
        if(response.status==='success'){
          this.categories = response.categorias;
        }
      },
      (error) =>{

      }
    );
  }

  private getProducts(){
    this._productsService.getAll().subscribe(
      (response) => {
        if(response.status==='success'){
          this.products = response.productos;
          this.productsAll = this.products;
        }
      },
      (error) =>{

      }
    );
  }

  open(){
    //cambiar botones
    document.getElementById('open').classList.add('d-none');
    document.getElementById('close').classList.remove('d-none');

    //abrir la barra de busqueda
    const form = document.getElementsByClassName('form-inline')[0];
    form.classList.remove('d-none');
    this.setEfecto(form,'fadeInDown');

  }

  
  close(){
    //cambiar botones
    document.getElementById('open').classList.remove('d-none');
    document.getElementById('close').classList.add('d-none');

    //abrir la barra de busqueda
    const form = document.getElementsByClassName('form-inline')[0];
    this.setEfecto(form,'fadeOutUp');
    form.classList.add('d-none');

  }

  
    // agrega el efecto de animate css y 300ms lo saca para que pueda ser usado nuevamente 
  setEfecto(div,efecto){        
    div.classList.add('animated');
    setTimeout(function (){
        div.classList.remove('animated', efecto);
    },300);
  }

  
  // filtrar productos por nombre o codigo
  filtrar() {
    let prof = [];
    this.products = null;
    this.productsAll.forEach((element) => {
      if (
        element.title.toLowerCase().search(this.filter.toLowerCase()) !== -1 ||
        element.category.name.toLowerCase().search(this.filter.toLowerCase()) !== -1 
      ) {
        prof.push(element);
      }
    });

    this.products = prof;

    if(this.filter=='')
      this.products = this.productsAll;


    // mstrar mensaje de cargando y sacar al segundo  
    document.getElementById('loading').classList.remove('d-none');
    document.getElementById('products').classList.add('d-none');

    setTimeout(
      function (){
        document.getElementById('loading').classList.add('d-none');   
        document.getElementById('products').classList.remove('d-none');  
      }, 
      1000
    );
  }
  
  replaceUrl(url){
    return this._productsService.replaceUrl(url);
  }
}

