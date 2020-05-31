import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'index-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Array<Product>;
  public storage: string;

  constructor(
    private _products: ProductService
  ) { }

  ngOnInit(): void {
    this.storage = GLOBAL.storage;
    this.getProducts();
  }

  
  private getProducts(){
    this._products.getN(3).subscribe(
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
