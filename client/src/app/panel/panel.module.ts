import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    PanelComponent, 
    LoginComponent
    
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    FormsModule
  ]
})
export class PanelModule { }
