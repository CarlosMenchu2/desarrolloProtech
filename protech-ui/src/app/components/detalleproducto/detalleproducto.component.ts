import { Component, OnInit } from '@angular/core';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CatalagoService } from '../../services/catalago.service';

@Component({
  selector: 'app-detalleproducto',
  templateUrl: './detalleproducto.component.html',
  styleUrls: ['./detalleproducto.component.css']
})

export class DetalleproductoComponent implements OnInit {
  numero: number = 0; //Cantidad del producto a comprar
  ruta = 0; // Posición del vector de rutas
  sEspecificacion: string; // String completo de especificaciones
  especificaciones: string[] = []; // Arreglo de especificaciones descompuesto de sEspecificacion
  rutas: string[] = []; // Rutas del producto recibido desde el catálogo
  id: string; // Id del producto recibido desde el catálogo
  producto: any = {}; // Producto recibido desde el catálogo
  reservado: number;
  constructor(private router: Router, private catalogoService: CatalagoService) {
    this.id = this.router.url.split('/')[2]; // Obtener el id del producto desde la URL
    
    this.catalogoService.getProducto(this.id)
      .subscribe( (producto: any) => {
        this.producto = producto.producto; //Obtener producto
        this.reservado = producto.reservado;
        this.obtenerEspecificaciones(); //Obtener especificaciones
        this.obtenerImagenes(); // Obtener imágenes
        this.obtenerImagenPrincipal(); //Obtener imagen principal
      });
    
  }
  ngOnInit(): void {
  }
  //Asignar cantidad del producto a la variable número
  setCantidad()
  {
    this.numero = (+(<HTMLInputElement>document.getElementById('cantidad')).value);
  }
  //Obtener imagen a mostrar en el card grande
  obtenerImagenPrincipal()
  {
    return this.rutas[this.ruta];
  }
  //Descomponer string de especificaciones (separar string cuando encuentre comas)
  obtenerEspecificaciones(){
    for (let i = 0; i < this.producto.especificacion.split(',').length; i++)
    {
      this.especificaciones[i] = this.producto.especificacion.split(',')[i];
    }
  }
  //Asignar imágenes dependiendo de cuántas imágenes tiene el producto
  obtenerImagenes(){
    for (let i = 0; i < 3; i++)
    {
      if (this.producto.imagenes.length > i)
      {
        this.rutas[i] = this.producto.imagenes[i].url;
      }
    }
    if (this.producto.imagenes.length === 0)
    {
      this.rutas[0] = 'assets/img/Interrogación.png';
      this.rutas[1] = 'assets/img/Interrogación.png';
      this.rutas[2] = 'assets/img/Interrogación.png';
    }
    else if (this.producto.imagenes.length === 1)
    {
      this.rutas[1] = 'assets/img/Interrogación.png';
      this.rutas[2] = 'assets/img/Interrogación.png';
    }
    else if (this.producto.imagenes.length === 2)
    {
      this.rutas[2] = 'assets/img/Interrogación.png';
    }
    
  }

  // tslint:disable-next-line: typedef
  // Aumentar/disminuir cantidad, validando que no sobrepase la cantidad de existencias
  manipularContador(accion: number)
  {
    if (accion === 0)
    {
      this.catalogoService.getProducto(this.id)
        .subscribe( () => {
          if (this.numero > 0)
          {
            this.numero = this.numero - 1;
          }              
      });
    }
    else if (accion === 1)
    {
      this.catalogoService.getProducto(this.id)
        .subscribe( (producto: any) => {
          if ((this.producto.existencia-producto.producto.reservado-this.numero) > 0)
          {
            this.numero = this.numero + 1;
          }
        });
    }
    // tslint:disable-next-line: no-trailing-whitespace
  }
  // tslint:disable-next-line: typedef
  //Asignar posición de arreglo de rutas
  asignarRuta(ruta: number)
  {
    this.ruta = ruta;
  }
  // tslint:disable-next-line: typedef
  //Retornar una imagen del vector de rutas
  retornarRuta(posicion: number)
  {
    return this.rutas[posicion];
  }

  confirmarCompra()
  {
    this.catalogoService.putExistencias(this.id, this.numero, "reserve").subscribe();
    console.log("Confirmado");
  }
  
}
