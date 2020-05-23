import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categories: Array<Category>;
  public pagine: number = 0;

  constructor(
    private _categoryService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void{
    this._categoryService.getCategories().toPromise().then(
      (response)=>{
        this.categories = response.categorias;
      }
    );
  }

  addCategoryView(category: Category): void {
    this.categories.splice(0,0,category);
  }

  editCategoryView(categories: Array<Category>): void{
    this.categories.splice(this.categories.indexOf(categories[1]),1,categories[0]);
  }
  
  deleteCategoryView(c: Category){
    this.categories.splice(this.categories.indexOf(c),1);
    if(this.pagine>0 && this.categories.length%4==0)
      this.pagine--;
  }


}
