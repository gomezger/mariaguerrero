import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Info } from 'src/app/services/info';
import { Category } from 'src/app/models/category';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbarToggler') navbarToggler:ElementRef;
  @Input() categories: Array<Category>;  

  // attributes
  public lang: string;
  public phone: any;
  public social: any;
  public city: any;

  constructor(
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.phone = Info.phone;
    this.social = Info.social;
    this.city = Info.city;
  }

  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }
  
  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }

  replaceUrl(url){
    return this._productService.replaceUrl(url);
  }


}
