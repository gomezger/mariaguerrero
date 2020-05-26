import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }


  

  filterProductsByText(products: Array<Product>, text: string){
    let prof = [];
    products.forEach((element) => {

      const filter = this.normalize(text);
      const title = this.normalize(element.title);
      const categoryName = this.normalize(element.category.name);
      
      if (
        (title.search(filter) !== -1 || categoryName.search(filter) !== -1 ) 
      ) {
        prof.push(element);
      }
    });

    if(text == '')
      return products;   
    else
     return prof;
 
  }

  filterProductsByCategoryId(products: Array<Product>, category_id: Number): Array<Product>{
    let auxList = [];

    products.forEach((element) => {
      if(element.category.id === category_id)
        auxList.push(element);
    });
    console.log(auxList);
    return auxList;
  }

  private normalize(cadena): string{
    return cadena.toLowerCase().replace(/á/gi,"a").replace(/é/gi,"e").replace(/í/gi,"i").replace(/ó/gi,"o").replace(/ú/gi,"u").replace(/ñ/gi,"n");
  }


  

}
