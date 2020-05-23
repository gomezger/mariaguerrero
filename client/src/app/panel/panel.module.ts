import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { BreadcrumbsComponent } from './componets/breadcrumbs/breadcrumbs.component';
import { FormComponent as FormProductsComponent } from './products/form/form.component';
import { FormComponent as FormCategoriesComponent } from './categories/form/form.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalDeleteComponent } from './products/modal-delete/modal-delete.component';
import { CategoriesComponent } from './categories/categories.component';
import { ModelDeleteComponent as ModalDeleteCategoriesComponent } from './categories/model-delete/model-delete.component';
import { UsersComponent } from './users/users.component';
import { FormComponent as FormUsersComponent } from './users/form/form.component';
import { ModelDeleteComponent as ModalDeleteUsetComponente } from './users/model-delete/model-delete.component';
import { LoadingComponent } from './componets/loading/loading.component';


@NgModule({
  declarations: [
    PanelComponent, 
    LoginComponent, 
    ProductsComponent,
     BreadcrumbsComponent, 
     FormProductsComponent,
     FormCategoriesComponent,
     ModalDeleteComponent, 
     CategoriesComponent, 
     ModalDeleteCategoriesComponent, 
     UsersComponent, 
     FormUsersComponent, 
     ModalDeleteUsetComponente, LoadingComponent
    
  ],
  imports: [
    NgxPaginationModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    CommonModule,
    PanelRoutingModule,
    FormsModule
  ]
})
export class PanelModule { }
