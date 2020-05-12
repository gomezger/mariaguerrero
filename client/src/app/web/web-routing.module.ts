import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebComponent } from './web.component';
import { IndexComponent } from './index/index.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '',
    component: WebComponent,
    children:[
      { path: '', component: IndexComponent },
      { path: 'productos', component: ProductsComponent },
      { path: 'contacto', component: ContactComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
