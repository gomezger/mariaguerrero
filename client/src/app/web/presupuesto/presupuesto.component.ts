import { Component, OnInit } from '@angular/core';
import {ShopcartService} from '../../services/shopcart.service';
import {MailSenderService} from 'src/app/services/mail-sender.service';
import {Contacto}from '../../models/contacto';
import {Product} from '../../models/product';
import { Title } from '@angular/platform-browser';
import { Router,Route, ActivatedRoute } from '@angular/router';
// import {Category}from 'src/app/models/category';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss']
})
export class PresupuestoComponent implements OnInit {

  public presupuesto:Product [];
  public cantidades:[];
  public myContacto:Contacto;
  constructor(
    private _shopcart:ShopcartService,
    private _title: Title,
    private _mailSender:MailSenderService,
    private _router: Router
  ) { 
    this.myContacto=new Contacto('','','','');
  }

  ngOnInit(): void {
    // let p1:Product;
    // let p2:Product;
    // let p3:Product;
    // p1 = new Product(1,'Producto Prueba 1',1,new Category(1,'test',null,null),null,'sadasjdgasjdgadads',null,null);
    // p2 = new Product(1,'Producto Prueba 2',1,new Category(1,'test',null,null),null,'sadasjdgasjdgadads',null,null);
    // p3 = new Product(1,'Producto Prueba 3',1,new Category(1,'test',null,null),null,'sadasjdgasjdgadads',null,null);

    // this._shopcart.saveProduct(p1,2);
    // this._shopcart.saveProduct(p2,1);
    // this._shopcart.saveProduct(p3,5);

    this.presupuesto= this._shopcart.getProducts();
    this.cantidades =this._shopcart.getCantidades();

    console.log(this.presupuesto);
    console.log(this.cantidades);

    
    this._title.setTitle('Presupuesto | Maria Guerrero: Muebles y objetos | Bahía Blanca');  
  }

  eliminarElemento(i){
    console.log(i)
    this.presupuesto.splice(i,1);
    this.cantidades.splice(i,1);
    this._shopcart.eliminar(i);
  }

  onSumbmit(){
    this.enviarPresupuestoMail();
  }

  enviarPresupuestoMail(){
    this._mailSender.sendMailPresupuesto(this.myContacto.nombre,this.myContacto.from,this.myContacto.phone,this.presupuesto,this.cantidades)
    .subscribe(
      response=>{
        console.log(JSON.stringify(this.myContacto));
        console.log('exito');
      },
      error=>{}
    );
  }

  enviarWp(){
    // <a target="_blank" href="https://api.whatsapp.com/send?phone=54{{informacion.telefono}}&text=¡Hola {{informacion.nombre}}!, me interesa el {{profesional.tipo_profesional.nombre.toLowerCase()}} {{profesional.nombre}}." class="boton col-6">Contactar</a>
    let telefono='542914411801'; 
    let texto:String;
    texto='';
    this.presupuesto.forEach((element,index)=>{
      texto.concat(JSON.stringify(element.title) + ' x'+ JSON.stringify(this.cantidades[index])+'-'); 
    });
    let mensaje = `Hola Matias, deseo presupuestar esto: ${texto}`;
    // this._router.navigate([`https://api.whatsapp.com/send?phone=${telefono}&text=${texto}`]);
    // this._router.navigate([`https://api.whatsapp.com/send?phone=542914411801&text=Hola wacho!`]);
    window.location.href=`https://api.whatsapp.com/send?phone=${telefono}&text=${texto}`;
  }

}
