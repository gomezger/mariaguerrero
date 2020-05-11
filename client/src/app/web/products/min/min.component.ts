import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-min',
  templateUrl: './min.component.html',
  styleUrls: ['./min.component.scss']
})
export class MinComponent implements OnInit {
  @Input() size: string = '12';

  constructor() { }

  ngOnInit(): void {
  }

}
