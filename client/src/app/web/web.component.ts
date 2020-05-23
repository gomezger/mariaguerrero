import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss']
})
export class WebComponent implements OnInit {
  public categories: Array<Category>;

  constructor(
    private _categoryService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(){
    this._categoryService.getCategories().toPromise().then(
      (response)=>{ this.categories = response.categorias }
    );
  }

}
