import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tarjetas-productos',
  templateUrl: './tarjetas-productos.component.html',
  styleUrls: ['./tarjetas-productos.component.css']
})
export class TarjetasProductosComponent implements OnInit {
  @Input() producto:any = {};
  @Input() index:number;
  
  constructor() { }

  ngOnInit(): void {
  }
  
  /**
   * Función que obtendrá la url del producto.
   */
  obtenerImagen(){
    let bytes = this.producto.imagenes[0].url;
    return bytes;
  }
}
