import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() urls: Array<Array<string>> = [];
  @Input() title: string = "";
  @Input() buttons: Array<Array<string>> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
