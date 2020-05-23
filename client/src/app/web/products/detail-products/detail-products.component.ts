import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router,Route, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrls: ['./detail-products.component.scss']
})
export class DetailProductsComponent implements OnInit {
  public product: Product;
  public mainPhoto: String;
  public photos: Array<String>;
  public storage: string;

  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.storage = GLOBAL.storage;
  }

  private getProduct(){
    const id = +this._activatedRoute.snapshot.paramMap.get('id');

    this._productService.getById(id).subscribe(
      (response)=>{
        if (response.status === 'success' ){
          this.product = response.producto;
          this.mainPhoto = this.product.images[0];
          this.photos = this.product.images;
          this.photos.splice(0,1);
        }
      },
      (error)=>{

      }
    );


  }

}
