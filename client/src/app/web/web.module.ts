import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { WebComponent } from './web.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IndexComponent } from './index/index.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [WebComponent, HeaderComponent, FooterComponent, IndexComponent, ContactComponent],
  imports: [
    CommonModule,
    WebRoutingModule
  ]
})
export class WebModule { }
