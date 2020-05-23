import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: Array<User>;
  public pagine: number = 0;
  public cant: number = 10;

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void{
    this._userService.getAll().toPromise().then(
      (response)=>{
        this.users = response.usuarios;
      }
    );
  }

  addUserView(user: User): void {
    this.users.splice(0,0,user);
  }

  editUserView(users: Array<User>): void{
    this.users.splice(this.users.indexOf(users[1]),1,users[0]);
  }
  
  deleteUserView(u: User){
    this.users.splice(this.users.indexOf(u),1);
    if(this.pagine>0 && this.users.length%this.cant==0)
      this.pagine--;
  }


}
