import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Info } from 'src/app/services/info';
import { Category } from 'src/app/models/category';


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

  constructor() { }

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


}
