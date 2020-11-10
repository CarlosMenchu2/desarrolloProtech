import { Component, OnInit } from '@angular/core';
import { CatalagoService} from '../../services/catalago.service';
@Component({
  selector: 'app-paginainicio',
  templateUrl: './paginainicio.component.html',
  styleUrls: ['./paginainicio.component.css']
})
export class PaginainicioComponent implements OnInit {

  arregloproductos:any[]=[];
  arregloproductos1:any[]=[];
  arregloproductos2:any[]=[];

  constructor(private _productos:CatalagoService) { }

  ngOnInit(): void {

     this._productos.getProductos()
     .subscribe( (dataProductos: any) => {
       this.arregloproductos = dataProductos.productos;
       this.recorrer();
     });
  }

  private recorrer(){
    for(let i=0;i<this.arregloproductos.length-7;i++){
      this.arregloproductos1.push(this.arregloproductos[i]);
      this.arregloproductos2.push(this.arregloproductos[3+i]);
    }
  }

}
