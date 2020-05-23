import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { LoginComponent } from './login/login.component';
import { GuardGuard } from '../services/guard.guard';
import { ProductsComponent } from './products/products.component';
import { FormComponent as FormProductsComponent } from './products/form/form.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: PanelComponent,
    canActivate: [GuardGuard],
    children:[
      {path: 'productos', component: ProductsComponent },
      {path: 'productos/crear', component:  FormProductsComponent },
      {path: 'productos/:id', component:  FormProductsComponent },
      {path: 'categorias', component: CategoriesComponent },
      {path: 'usuarios', component: UsersComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
