import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { BreadcrumbsComponent } from './componets/breadcrumbs/breadcrumbs.component';
import { FormComponent } from './products/form/form.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


@NgModule({
  declarations: [
    PanelComponent, 
    LoginComponent, ProductsComponent, BreadcrumbsComponent, FormComponent
    
  ],
  imports: [
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    CommonModule,
    PanelRoutingModule,
    FormsModule
  ]
})
export class PanelModule { }
