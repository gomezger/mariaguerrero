import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

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


}
