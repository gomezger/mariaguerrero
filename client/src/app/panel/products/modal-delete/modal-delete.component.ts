import { Component, OnInit, Input, ViewChild, Output, EventEmitter  } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {
  //atributes
  @Input() product: Product;
  
  @Output() deleteProductView = new EventEmitter<Product>();

  constructor(
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Delete product
   */
  public delete(){
    this._productService.delete(this.product).subscribe(
      (response) => {
        
        //ocultar modal
        document.getElementById('modalDelete-'+this.product.id).classList.remove('show');
        document.getElementsByClassName('modal-backdrop')[0].remove();
        document.body.classList.remove('modal-open');
        document.getElementById('modalDelete-'+this.product.id).removeAttribute('style');

        //eliminar prodcuto de la lista
        this.deleteProductView.emit(this.product);
      },
      (error) => {
        this.setMessage('alert-delete','alert-danger','Error al cargar los productos. Recargue la pantalla y verifique conexión de internet');
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
