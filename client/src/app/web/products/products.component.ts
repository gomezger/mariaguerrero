import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import * as $ from 'jquery';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  p = 0;
  public categories: Array<Category>;
  public products: Array<Product>;

  constructor(
    private _categoriesService: CategoriesService,
    private _productsService: ProductService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
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


}
