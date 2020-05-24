import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { GLOBAL } from 'src/app/services/global';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-min',
  templateUrl: './min.component.html',
  styleUrls: ['./min.component.scss']
})
export class MinComponent implements OnInit {
  @Input() size: Array<string> = ['12','12'];
  @Input() product: Product;
  public storage: string;

  constructor(
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.storage = GLOBAL.storage;
  }
  
  replaceUrl(url){
    return this._productService.replaceUrl(url);
  }
}
