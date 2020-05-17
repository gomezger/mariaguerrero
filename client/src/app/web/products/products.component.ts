import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  p = 0;
  public categories: Array<Category>;

  constructor(
    private _categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(){
    this._categoriesService.getCategories().subscribe(
      (response) => {
        if(response.status==='success'){
          this.categories = response.categorias;
        }
      },
      (error) =>{

      }
    );
  }


}
