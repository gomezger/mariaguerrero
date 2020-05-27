import { Component, OnInit } from '@angular/core';
import { Info } from '../../../services/info';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public info: any;

  constructor() { }

  ngOnInit(): void {
    this.info = Info;
  }

}
