import { Component,ViewChild , OnInit } from '@angular/core';
import {ShopcartService} from '../../services/shopcart.service';
import {MailSenderService} from 'src/app/services/mail-sender.service';
import {Contacto}from '../../models/contacto';
import {Product} from '../../models/product';
import { Title } from '@angular/platform-browser';
import { Router,Route, ActivatedRoute } from '@angular/router';
import {Info} from '../../services/info'
import {Category}from '../../models/category';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss']
})
export class PresupuestoComponent implements OnInit {
  @ViewChild('botonCerrar') public close ;

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
    this.presupuesto= this._shopcart.getProducts();
    this.cantidades =this._shopcart.getCantidades();    
    this._title.setTitle('Presupuesto | Maria Guerrero: Muebles y objetos | Bahía Blanca');  


  }

  eliminarElemento(i){
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
        localStorage.removeItem('presupuesto');
        localStorage.removeItem('cantidades');
        console.log('exito');
        this.close.nativeElement.click();
        alert('Mensaje enviado');
        window.location.reload();
      },
      error=>{}
    );
  }

  enviarWp(){ 
    let texto: string = '';

    for(let i=0; i<this.presupuesto.length; i++){
      texto += '\r\n\t ' + this.presupuesto[i].title + ': ' + this.cantidades[i] + ' unidad/es. ';
    }    

    const mensaje: string = 'Hola Maria Guerrero Deco, deseo presupuestar esto: '+texto+'';
    const url: string = 'https://api.whatsapp.com/send?phone='+Info.phone.cod.int+Info.phone.cod.nac+Info.phone.number+'&text=' + mensaje + '';
    //const url: string = 'https://api.whatsapp.com/send?phone='+'542914411801'+'&text=' + mensaje + '';

    window.open(url);
    localStorage.removeItem('presupuesto');
    localStorage.removeItem('cantidades');
    window.location.reload();

  }

}
