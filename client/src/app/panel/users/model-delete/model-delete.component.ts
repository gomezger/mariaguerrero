import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-delete-user',
  templateUrl: './model-delete.component.html',
  styleUrls: ['./model-delete.component.scss']
})
export class ModelDeleteComponent implements OnInit {
 //atributes
 @Input() user: User;
  
 @Output() deleteUserView = new EventEmitter<User>();

 constructor(
   private _userService: UserService
 ) { }

 ngOnInit(): void {
 }

 /**
  * Delete product
  */
 public delete(): void{
   this._userService.delete(this.user).subscribe(
     (response) => {

       if(response.status == 'success'){
         //ocultar modal
         document.getElementById('modalDelete-'+this.user.id).classList.remove('show');
         document.getElementsByClassName('modal-backdrop')[0].remove();
         document.body.classList.remove('modal-open');
         document.getElementById('modalDelete-'+this.user.id).removeAttribute('style');
 
         //eliminar prodcuto de la lista
         this.deleteUserView.emit(this.user);
       
       }else if(response.status == 'error'){
         this.setMessage('alert-delete','alert-danger',response.errors);
       }
       
     },
     (error) => {
       this.setMessage('alert-delete','alert-danger','Error. Recargue la pantalla y verifique conexión de internet');
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
