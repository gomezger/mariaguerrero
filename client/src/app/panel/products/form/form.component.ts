import { Component, OnInit } from '@angular/core';
import FroalaEditor from 'froala-editor';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProduct();
  }

  /**
   * create an empty product if it needs to be created, or search in the backend if it needs to be edited
   */
  private getProduct(): void {
    const id = +this._route.snapshot.paramMap.get('id');
    if(id==0)
      this.product = new Product(0,'',0,new Category(0,'',null,null),null,'',null,null);
    else{
      this._productService.getById(id).toPromise().then(
        (response) => {
          this.product = response.producto;
        }
      );
    }
  }


  /**
   * get gategories
   */
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

  /**
   * upload product
   * @param productForm 
   */
  onSubmit(productForm: any): void{
    this.setMessage('alert','alert-info','Validando datos...');
    if(this.product.id==0){
      this.insert(productForm);
    }else{
      this.update(productForm);
    }    
  }

  /**
   * insert a product
   * @param productForm 
   */
  update(productForm: any){
    this._productService.update(this.product,this.mainPhoto,this.photos).toPromise().then(
      (response)=>{
        if(response.status==='success'){
          this.setMessage('alert','alert-success',response.message);
          productForm.reset();
          this._router.navigate(['/panel/productos']);       

        }else if(response.status==='error'){
          this.setMessage('alert','alert-danger',response.errors);
        }
      },
      (error) => {
        this.setMessage('alert','alert-danger','Error. Intente nuevamente');
      }
    );
  }

  /**
   * insert a product
   * @param productForm 
   */
  insert(productForm: any){
    this._productService.insert(this.product,this.mainPhoto,this.photos).toPromise().then(
      (response)=>{
        if(response.status==='success'){
          this.setMessage('alert','alert-success',response.message);
          productForm.reset();
          this._router.navigate(['/panel/productos']);  

        }else if(response.status==='error'){
          this.setMessage('alert','alert-danger',response.errors);
        }
      },
      (error) => {
        this.setMessage('alert','alert-danger','Error. Intente nuevamente');
      }
    );
  }

  /**
   * Check if the user added a main photo
   * @param e 
   */
	mainPhotoChanged(e): void {
    this.mainPhoto = e.target.files[0] !== undefined ? e.target.files[0] : null;
    if( this.mainPhoto !== undefined)
      document.getElementById('main-photo').innerText = this.mainPhoto.name; 
    else
      document.getElementById('main-photo').innerText = "Elegir imagen"; 
  }

  /**
   * Check if the user added a secondary photo
   * @param e 
   */
	photosChanged(e): void {
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


  /**
   * Text editor settings
   */
  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'color', 'formatBlock', 'blockStyle', 'inlineStyle', 'align', 'insertOrderedList', 'insertUnorderedList', 'outdent', 'indent', 'selectAll', 'createLink', 'insertImage', 'insertVideo', 'table', 'undo', 'redo', 'html', 'save', 'insertHorizontalRule', 'uploadFile', 'removeFormat', 'fullscreen'],
    placeholderText: 'Ingrese la descripción del producto'
  };


  /**
   * Puts a message in the alert
   * @param id Setear
   * @param alert 
   * @param err 
   */
  private setMessage(id: string, alert: string, err: any): void{
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
