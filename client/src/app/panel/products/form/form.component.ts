import { Component, OnInit } from '@angular/core';
import FroalaEditor from 'froala-editor';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public product: Product;
  public mainPhoto: File = null;
  public photos: Array<File> = null;

  public categories: Array<Category>;

  constructor(
    private _categoriesService: CategoriesService,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.product = new Product(0,'',0,new Category(0,'',null,null),null,'',null,null);
  }

  private getCategories(): void{
    this._categoriesService.getCategories().toPromise().then(
      (response) => {
        if(response.status==='success'){
          this.categories = response.categorias;
        }
      },
      (error) =>{}
    );
  }

  onSubmit(productForm: any): void{
    this.setMessage('alert','alert-info','Validando datos...');

    this._productService.insert(this.product,this.mainPhoto,this.photos).toPromise().then(
      (response)=>{
        if(response.status==='success'){
          this.setMessage('alert','alert-success',response.message);
        }else if(response.status==='error'){
          this.setMessage('alert','alert-danger',response.errors);
        }
      },
      (error) => {
        this.setMessage('alert','alert-danger','Error. Intente nuevamente');
      }
    );


  }


	mainPhotoChanged(e) {
    this.mainPhoto = e.target.files[0] !== undefined ? e.target.files[0] : null;
    if( this.mainPhoto !== undefined)
      document.getElementById('main-photo').innerText = this.mainPhoto.name; 
    else
      document.getElementById('main-photo').innerText = "Elegir imagen"; 
  }

	photosChanged(e) {
    let i = 0;
    this.photos = [];
    while(e.target.files[i] !== undefined){
      this.photos.push(e.target.files[i]);
      document.getElementById('photos').innerText = 'Cantidad de imágenes: '+(i+1)+''; 
      i++;
    }

    if(e.target.files[0] === undefined){
      document.getElementById('photos').innerText = "Elegir imágenes"; 
      this.photos = null;
    }
  }


  
  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'color', 'formatBlock', 'blockStyle', 'inlineStyle', 'align', 'insertOrderedList', 'insertUnorderedList', 'outdent', 'indent', 'selectAll', 'createLink', 'insertImage', 'insertVideo', 'table', 'undo', 'redo', 'html', 'save', 'insertHorizontalRule', 'uploadFile', 'removeFormat', 'fullscreen'],
    placeholderText: 'Ingrese la descripción del producto'
  };

  private setMessage(id: string, alert: string, err: any){
    const div = document.getElementById(id);
    div.classList.remove('d-none', 'alert-info', 'alert-success', 'alert-danger');
    div.classList.add(alert, 'animated', 'fadeIn');
    
    if(Array.isArray(err)){
      div.innerText = '';
      for(let error of err){
        div.innerText = div.innerText+"-"+error+"\r";
      }
    }else{
      div.innerText = err;
    }
  }

}
