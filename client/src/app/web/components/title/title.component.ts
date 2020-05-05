import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() title: string;
  @Input() color: string;

  constructor(
    elem: ElementRef, 
    renderer: Renderer2
  ) { }

  ngOnInit(): void {
        
  }

}
