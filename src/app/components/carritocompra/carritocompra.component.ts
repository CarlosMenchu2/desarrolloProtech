import { Component, OnInit } from '@angular/core';
import { CatalagoService } from '../../services/catalago.service';
import { CarritoUsuarioService } from '../../services/carrito-usuario.service';
import { ActivatedRoute } from '@angular/router'
declare var $: any;

@Component({
  selector: 'app-carritocompra',
  templateUrl: './carritocompra.component.html',
  styleUrls: ['./carritocompra.component.css']
})
export class CarritocompraComponent implements OnInit {
  
  listaVenta: any[] = [];
  productos: any[] = [];
  carritoUser: any[] = [];
  prod: any;
  subtotal = 99999;
  objProducto: any;
  fila = -1;
  total = 0;
  user: any;

  /* TEMPS */
  listaTemporal: any[] = [];
  carritoTemporal: any [] = [];


  constructor( private _productosService: CatalagoService, private router: ActivatedRoute, private _carritoService: CarritoUsuarioService) {
      this.verificarParams();
   }

  ngOnInit(): void {
  }
  
  /* PARA CARGAR AL CARRITO ------------------------------------------------------------------------------ */
  verificarParams(): void{
    this.router.params.subscribe( params => {
      if (Object.entries(params).length === 0){
        if (sessionStorage.getItem('user')){
          this.cargarSession();
          this.cargarCarrito();
        } else {
          this.cargarStorage();
          this.cargarCarrito();
        }
      } else {
        if (sessionStorage.getItem('user')){
          this.cargarSession();
          this.objProducto = params;
          this.agregarProductoSession(this.objProducto.id, this.objProducto.cantidad);
          this.objProducto = [];
        }else{
          this.cargarStorage();
          this.objProducto = params;
          this.agregarProductoLocal(this.objProducto);
          this.objProducto = [];
          this.cargarCarrito();
        }
      }
    });
  }

  cargarCarrito(): void{
    if (sessionStorage.getItem('user')){
      this.listaVenta = [];
      this.productos = [];
      this.carritoUser = [];
      this._carritoService.getCarrito(this.user._id).subscribe((element: any) => {
        this.carritoUser.push(element);
        this.carritoUser.forEach(el => {
          el.forEach(data => {
            this._productosService.getProducto(data.producto_id)
            .subscribe((producto: any) => {
              this.prod = producto.producto;
              this.productos.push(this.prod);
              this.listaVenta.push(data);
              this.total += producto.producto.precio * data.cantidad;
            });
          });
        });
      });
    }else{
      this.productos = [];
      this.listaVenta.forEach( element => {
        this._productosService.getProducto(element.id)
        .subscribe((producto: any) => {
          this.prod = producto.producto;
          this.productos.push(this.prod);
          this.total += producto.producto.precio * element.cantidad;
        });
      });
    }
  }

  agregarProductoSession(productoId: any, cantidad: any): void{
    let find = -1;
    this._carritoService.getCarrito(this.user._id).subscribe((element: any) => {
      if(element.length === 0){
        this._carritoService.postCarrito(this.user._id, productoId, cantidad).subscribe(error => {
          this.cargarCarrito();
        });
      }else{
        this.carritoTemporal.push(element);
        this.carritoTemporal.forEach(el => {
          el.forEach(data => {
            this.listaTemporal.push(data);
          });
          for (let i = 0; i < this.listaTemporal.length; i++){
            if(this.listaTemporal[i].producto_id === productoId){
              this._carritoService.putCarrito(cantidad, this.listaTemporal[i]._id).subscribe(error => {
                this.cargarCarrito();
              });
              find = 1;
              i = this.listaTemporal.length;
            }else{
              find = 0;
            }
          }
        });
        if (find === 0){
          this._carritoService.postCarrito(this.user._id, productoId, cantidad).subscribe(error => {
            this.cargarCarrito();
          });
        }
      }
    });
  }

  agregarProductoLocal(prod: any): void{
    if (this.listaVenta.length === 0){
      this.listaVenta.push(prod);
      this.guardarStorage(this.listaVenta);
      this.cargarStorage();
    } else {
      let equal = -1;
      for (let i = 0; i < this.listaVenta.length; i++){
        if (this.listaVenta[i].id === prod.id){
          equal = i;
          i = this.listaVenta.length;
        }
      }
      if (equal === -1){
        this.listaVenta.push(prod);
        this.guardarStorage(this.listaVenta);
        this.cargarStorage();
      } else{
        this.listaVenta[equal].cantidad = prod.cantidad;
        this.guardarStorage(this.listaVenta);
        this.cargarStorage();
      }
    }
  }

  /* DATOS DEL LOCALSTORAGE ------------------------------------------------------------------------------ */
  cargarStorage(): void{
    this.listaVenta = [];
    if(localStorage.getItem('venta')){
      this.listaVenta = JSON.parse(localStorage.getItem('venta'));
    } else {
      this.listaVenta = [];
    }
  }

  cargarSession(): void{
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  guardarStorage(prod: any): void{
    localStorage.setItem('venta', JSON.stringify(prod));
  }

  /* PARA DE SESIÓN ------------------------------------------------------------------------------ */
  putSession(cantidad: any, id: any): void{
    this._carritoService.putCarrito(cantidad, id).subscribe(error => {
    });

  }
  deleteOneProduct(productoId: any, clienteId: any): void{
    this._carritoService.deleteProductoCarrito(productoId, clienteId)
      .subscribe(error => {});
  }

  /* Botones más y menos ------------------------------------------------------------------------------ */
  inc(elementI, elementS, idx): void{
    const formatter = new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    });
    let elementCantidad = document.querySelector(`[name="${elementI}"]`) as HTMLInputElement;
    let cant = parseInt(elementCantidad.value);
    let precio = this.productos[idx].precio;
    let subT = 0;
    if( cant < this.productos[idx].existencia){
      cant = cant + 1;
      subT = cant * precio;
      elementCantidad.value = cant.toString();
      document.getElementById(elementS).innerHTML = formatter.format(subT);
      if (sessionStorage.getItem('user')){
        for(let i = 0; i < this.listaVenta.length; i++){
          if(this.listaVenta[i].producto_id === this.productos[idx]._id){
            this.putSession(cant, this.listaVenta[i]._id);
            this.listaVenta[i].cantidad = cant;
            i = this.listaVenta.length;
          }
        }
      }else{
        this.listaVenta[idx].cantidad = cant;
        this.guardarStorage(this.listaVenta);
      }
      this.getTotal();
    }
  }
  
  dec(elementI, elementS, idx): void {
    const formatter = new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    })

    let elementCantidad = document.querySelector(`[name="${elementI}"]`) as HTMLInputElement;
    let cant = parseInt(elementCantidad.value);
    let precio = this.productos[idx].precio;
    let subT = 0;
    if (cant > 1) {
      cant = cant - 1;
      subT = cant * precio;
      elementCantidad.value = cant.toString();
      document.getElementById(elementS).innerHTML = formatter.format(subT);
      if(sessionStorage.getItem('user')){
        for(let i = 0; i < this.listaVenta.length; i++){
          if(this.listaVenta[i].producto_id === this.productos[idx]._id){
            this.putSession(cant, this.listaVenta[i]._id);
            this.listaVenta[i].cantidad = cant;
            i = this.listaVenta.length;
          }
        }
      } else {
        this.listaVenta[idx].cantidad = cant;
        this.guardarStorage(this.listaVenta);
      }
      this.getTotal();
    }
  }

  /* Botón eliminar */
  getRow(idx): void{
    this.fila = idx;
  }
  
  deleteRow(): void{
    if(sessionStorage.getItem('user')){
      this.deleteOneProduct(this.productos[this.fila]._id, this.listaVenta[this.fila].cliente_id);
      this.listaVenta.splice(this.fila, 1);
      this.productos.splice(this.fila, 1);
      this.fila = -1;
    }else{
      this.listaVenta.splice(this.fila, 1);
      this.productos.splice(this.fila, 1);
      this.guardarStorage(this.listaVenta);
      this.cargarStorage();
      this.fila = -1;
    }
    this.getTotal();
  }

  /* TOTAL */

  getTotal(): number{
    const formatter = new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    })

    let precio = 0;
    let cantidad = 0;
    let total = 0;
    for (let i = 0; i < this.listaVenta.length; i++){
      cantidad = this.listaVenta[i].cantidad;
      precio = this.productos[i].precio;
      total = total + (cantidad * precio);
    }
    document.getElementById("tabTotal").innerHTML = formatter.format(total);
    return total;
  }
  /* Cargar la cantidad */
  getCantidad(productoId): number{
    let cant = 0;
    this.listaVenta.forEach(element => {
        if (element.id === productoId){
          cant = element.cantidad;
        } 
    });
    return cant;
  }
}
