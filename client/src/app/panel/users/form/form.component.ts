import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() user: User;
  @Output() addUserView = new EventEmitter<User>();
  @Output() editUserView = new EventEmitter<Array<User>>();

  constructor(
    private _usersService: UserService
  ) { }

  ngOnInit(): void {
    if(this.user==null)
      this.user = new User(0,"","","",null,null);
  }


  onSubmit(Form: any): void{
    if(this.user.id==0){
      this.create();
    }else{
      this.update();
    }
  }

  private create(): void{
    this._usersService.insert(this.user).subscribe(
      (response) => {

        if(response.status == 'success'){

          //ocultar modal
          document.getElementById('modalUser-'+this.user.id).classList.remove('show');
          document.getElementsByClassName('modal-backdrop')[0].remove();
          document.body.classList.remove('modal-open');
          document.getElementById('modalUser-'+this.user.id).removeAttribute('style');
  
          this.user = response.usuario;

          //eliminar prodcuto de la lista
          this.addUserView.emit(this.user);
        
        }else if(response.status == 'error'){
          this.setMessage('alert-user-'+this.user.id,'alert-danger',response.errors);
        }

      },
      (error) =>{
        this.setMessage('alert-user-'+this.user.id,'alert-danger','Error. Recargue la pantalla y verifique conexión de internet');
      }
    );
  }

  private update(): void{
    this._usersService.update(this.user).subscribe(
      (response) => {

        if(response.status == 'success'){
          const old = this.user;

          //ocultar modal
          document.getElementById('modalUser-'+this.user.id).classList.remove('show');
          document.getElementsByClassName('modal-backdrop')[0].remove();
          document.body.classList.remove('modal-open');
          document.getElementById('modalUser-'+this.user.id).removeAttribute('style');
  
          this.user = response.usuario;

          //eliminar prodcuto de la lista
          this.editUserView.emit([this.user,old]);
        
        }else if(response.status == 'error'){
          console.log(response);
          this.setMessage('alert-user-'+this.user.id,'alert-danger',response.errors);
        }

      },
      (error) =>{
        this.setMessage('alert-user-'+this.user.id,'alert-danger','Error. Recargue la pantalla y verifique conexión de internet');
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
