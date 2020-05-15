import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
	providers : [
	  	UserService
	]
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(
    private _route: Router,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    this.setMessage('alert','alert-info',['Validando datos...']);

    this._userService.login(this.email, this.password).subscribe(
      (response) => {
        if ( response.status === 'error' ) {

          this.setMessage('alert','alert-danger',response.errors);

        } else if( response.status === 'success' ) {


          localStorage.setItem('panel-token', response.token);
          localStorage.setItem('panel-login', 'true');
          localStorage.setItem('panel-identity', response.identity); 
          this._route.navigate(['/panel']);        

          form.reset();
          

        }
      },
      (error) => {		
        this.setMessage('alert','alert-danger',['Error. Intente nuevamente']);
      }
    );
  }

  private setMessage(id: string, alert: string, errors: Array<string>){
    const div = document.getElementById(id);
    div.classList.remove('d-none');
    div.classList.add(alert, 'animated', 'fadeIn');
    div.innerText = '';
    for(let error of errors){
      div.innerText = div.innerText+"-"+error+"\r";
    }

  }




}
