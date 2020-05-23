import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebComponent } from './web.component';
import { IndexComponent } from './index/index.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';
import {DetailProductsComponent} from './products/detail-products/detail-products.component';
import {PresupuestoComponent} from './presupuesto/presupuesto.component';

const routes: Routes = [
  {
    path: '',
    component: WebComponent,
    children:[
      { path: '', component: IndexComponent },
      { path: 'productos/:id/:category', component: ProductsComponent },
      { path: 'productos', component: ProductsComponent },
      { path: 'contacto', component: ContactComponent },
      { path: 'producto/:category/:id/:name', component: DetailProductsComponent},
      { path: 'producto/:id', component: DetailProductsComponent},
      { path: 'presupuesto',component:PresupuestoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
