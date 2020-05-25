import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  
  @Input() category: Category;
  @Input() title: string = 'Crear';
  @Output() addCategoryView = new EventEmitter<Category>();
  @Output() editCategoryView = new EventEmitter<Array<Category>>();

  constructor(
    private _categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    if(this.category==null)
      this.category = new Category(0,"",null,null);
  }


  onSubmit(Form: any): void{
    if(this.category.name=='')
      this.setMessage('alert-form','alert-danger','El nombre de la categoría es obligatorio');
    else if(this.category.id==0){
      this.create();
    }else{
      this.update();
    }
  }

  private create(): void{
    this._categoriesService.insert(this.category).subscribe(
      (response) => {

        if(response.status == 'success'){

          //ocultar modal
          this.closebutton.nativeElement.click();
  
          // guardar categorias
          this.category = response.categoria;

          //eliminar categoria de la lista
          this.addCategoryView.emit(this.category);

          //reinicio la categoria
          this.category = new Category(0,"",null,null);
        
        }else if(response.status == 'error'){
          this.setMessage('alert-form','alert-danger',response.errors);
        }

      },
      (error) =>{
        this.setMessage('alert-form','alert-form','Error. Recargue la pantalla y verifique conexión de internet');
      }
    );
  }

  private update(): void{
    this._categoriesService.update(this.category).subscribe(
      (response) => {

        if(response.status == 'success'){
          const old_cat = this.category;

          //ocultar modal
          this.closebutton.nativeElement.click();
  
          this.category = response.categoria;

          //eliminar prodcuto de la lista
          this.editCategoryView.emit([this.category,old_cat]);
        
        }else if(response.status == 'error'){
          this.setMessage('alert-form','alert-danger',response.errors);
        }

      },
      (error) =>{
        this.setMessage('alert-form','alert-form','Error. Recargue la pantalla y verifique conexión de internet');
      }
    );
  }

  /**
   * set message
   * @param id id del div a editar
   * @param alert alert de bootstrap a usar
   * @param err arreglo de strings o string cn errores
   */  
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
