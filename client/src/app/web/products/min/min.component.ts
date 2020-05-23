import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-min',
  templateUrl: './min.component.html',
  styleUrls: ['./min.component.scss']
})
export class MinComponent implements OnInit {
  @Input() size: string = '12';
  @Input() product: Product;
  public storage: string;

  constructor() { }

  ngOnInit(): void {
    this.storage = GLOBAL.storage;
  }

}
