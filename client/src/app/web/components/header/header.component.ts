import { Component, OnInit } from '@angular/core';
import { Info } from 'src/app/services/info';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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


}
