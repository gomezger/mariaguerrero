import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { WebRoutingModule } from './web-routing.module';
import { MinComponent } from './products/min/min.component';
import { WebComponent } from './web.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IndexComponent } from './index/index.component';
import { ContactComponent } from './contact/contact.component';
import { CarouselComponent } from './index/carousel/carousel.component';
import { AboutUsComponent } from './index/about-us/about-us.component';
import { TitleComponent } from './components/title/title.component';
import { ProductsComponent as IndexProductComponet } from './index/products/products.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';
import { DetailProductsComponent } from './products/detail-products/detail-products.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    WebComponent, 
    HeaderComponent,
    FooterComponent, 
    IndexComponent, 
    ContactComponent, 
    CarouselComponent, 
    AboutUsComponent, 
    TitleComponent, 
    ProductsComponent, 
    IndexProductComponet,
    MinComponent,
    DetailProductsComponent,
    PresupuestoComponent, 
    WhatsappComponent,
    LoadingComponent
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    WebRoutingModule,
    FormsModule
  ]
})
export class WebModule { }
