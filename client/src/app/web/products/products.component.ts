import { Component, OnInit, DoCheck } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import * as $ from 'jquery';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, DoCheck {
  p = 0;
  public categories: Array<Category>;
  public products: Array<Product>;
  public productsAll: Array<Product>;
  public filter: string = '';
  public category_id: Number = null;

  constructor(
    private _categoriesService: CategoriesService,
    private _productsService: ProductService,
    private _route: ActivatedRoute,
    private _title: Title,
    private _filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this._title.setTitle('Productos | Maria Guerrero: Muebles y objetos | Bahía Blanca');  
    this.getCategories();       
  }

  ngDoCheck(): void {
    //verifica si cambio la categoria
    if(this.category_id!=+this._route.snapshot.paramMap.get('id')){
      this.category_id = +this._route.snapshot.paramMap.get('id');
      this.filtrarCategory();
    }
  }

  private getCategories(){
    this._categoriesService.getCategories().toPromise().then(
      (response) => {
        if(response.status==='success'){
          this.categories = response.categorias;
        }
      },
      (error) =>{}
    );
  }



  private getProducts(){
    const id = +this._route.snapshot.paramMap.get('id');

    if(id==0){
      this.getAllProducts(false);
    }else{
      this.category_id = id;
      this.getAllProducts(true);

    }
    
  }

  private getAllProducts(filter: boolean){
    this._productsService.getAll().subscribe(
      (response) => {
        if(response.status==='success'){
          this.products = response.productos;
          this.productsAll = this.products;

          if(filter){
            this.filtrarCategory();
          }
        }
      },
      (error) =>{
      }
    );
  }  
  
  // filtrar productos por nombre o codigo
  filtrar() {
    if(this.category_id==null){
      this.products = this._filterService.filterProductsByText(this.productsAll,this.filter);    
      this.efectLoading();
    }else{
      this.filtrarCategory();
    }
  }

  /**
   * Filtra por el filtro elegido y la catgeoria
   */
  filtrarCategory() {
    this.products = this._filterService.filterProductsByText(this.productsAll,this.filter);    
    this.products = this._filterService.filterProductsByCategoryId(this.products, this.category_id);   
    this.efectLoading(); 
  }

  /**
   * Un efecto de 1seg donde carga la pantalla
   */
  efectLoading(){
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

  /**
   * Abre el menu en el celular
   */
  open(){
    //cambiar botones
    document.getElementById('open').classList.add('d-none');
    document.getElementById('close').classList.remove('d-none');

    //abrir la barra de busqueda
    const form = document.getElementsByClassName('form-inline')[0];
    form.classList.remove('d-none');
    this.setEfecto(form,'fadeInDown');

  }

  /**
   * cierra el menu en el celular
   */
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

  
  replaceUrl(url){
    return this._productsService.replaceUrl(url);
  }


}

