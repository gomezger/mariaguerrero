import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-modal-delete-category',
  templateUrl: './model-delete.component.html',
  styleUrls: ['./model-delete.component.scss']
})
export class ModelDeleteComponent implements OnInit {
  //atributes
  @Input() category: Category;
  
  @Output() deleteCategoryView = new EventEmitter<Category>();

  constructor(
    private _categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Delete product
   */
  public delete(){
    this._categoriesService.delete(this.category).subscribe(
      (response) => {

        if(response.status == 'success'){
          //ocultar modal
          document.getElementById('modalDelete-'+this.category.id).classList.remove('show');
          document.getElementsByClassName('modal-backdrop')[0].remove();
          document.body.classList.remove('modal-open');
          document.getElementById('modalDelete-'+this.category.id).removeAttribute('style');
  
          //eliminar prodcuto de la lista
          this.deleteCategoryView.emit(this.category);
        
        }else if(response.status == 'error'){
          this.setMessage('alert-delete-'+this.category.id,'alert-danger',response.errors);
        }
        
      },
      (error) => {
        this.setMessage('alert-delete-'+this.category.id,'alert-danger','Error al cargar los productos. Recargue la pantalla y verifique conexión de internet');
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
