import { Component, OnInit, resolveForwardRef, TemplateRef, ViewChild, ɵConsole } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutService } from "../../services/checkout.service";
import { JsonPipe, Location } from "@angular/common";
import { CarritoUsuarioService } from "../../services/carrito-usuario.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {


  detalleproductos: any[] = []; //aqui se almacenan los productos con nuevas propiedades, cantidad y subtotal
  t: number = 0; //este es el total a pagar
  client: any; //Aqui se almacena el id de la key del sessionStorage
  metodo: any = '';//el ngmodule lo enlaza con el tipo de envio en la vista
  //aca estan las variables para los detalles del envio
  nombreenvio: string; telefonoenvio: number; nitenvio: number; emailenvio: string; direccionenvio: string;
  departamentoenvio: string; notaenvio: string;
  //Arreglo de detalle_envio, factura y detalle_factura
  facturacion: any[] = [];


  @ViewChild("myModalConf", { static: false }) myModalConf: TemplateRef<any>;
  @ViewChild("myModalCierre", { static: false }) myModalCierre: TemplateRef<any>;
  /* Esta funcion  recoge los productos que se encuentran en localstorage, los almacena en un arreglo
     */
  GetLocalStorage() {
    let producto = JSON.parse(localStorage.getItem("venta"));

    producto.forEach(element => {
      let x = 0;
      this.checkout.getproducto(element.id)
        .subscribe((data: any) => {

          Object.defineProperty(data.producto, 'cantidad', { value: 1, writable: true });
          Object.defineProperty(data.producto, 'subtotal', { value: 1, writable: true });
          data.producto.cantidad = parseInt(element.cantidad);
          x = (data.producto.precio * data.producto.cantidad) - (data.producto.precio * data.producto.porcenjateOferta);
          data.producto.subtotal = x;
          this.detalleproductos.push(data.producto);
          this.t += x;
        });
    });
  }
  /* */
  GetStorageConCliente(id_usuario: any) {
    this.CarritoConUsuarioService.getCarrito(id_usuario)
      .subscribe((data: any) => {
        console.log(data);
        data.forEach(element => {
          let x = 0;
          //console.log(element.producto_id);
          this.checkout.getproducto(element.producto_id)
            .subscribe((data: any) => {

              Object.defineProperty(data.producto, 'cantidad', { value: 1, writable: true });
              Object.defineProperty(data.producto, 'subtotal', { value: 1, writable: true });
              data.producto.cantidad = parseInt(element.cantidad);
              x = (data.producto.precio * data.producto.cantidad) - (data.producto.precio * data.producto.porcenjateOferta);
              data.producto.subtotal = x;
              this.detalleproductos.push(data.producto);
              this.t += x;
            });
        });
      });

  }


  /* esta funcino es del boton de cancelar, que regresa al carrito de compras, utiliza
     el objeto location con la funcion back, para regresar al pathurl anterior*/
  prevlocation() {
    this.Location.back();
  }
  homelocation(){
    this.router.navigate(['home']);
  }
  /* Un metodo accesor simple para el total*/
  get total() {
    return this.t;
  }

  /* esta funcion es la confirmacion de compra, toma el valor del boton
     si se confirma realiza la confirmacion de compra y ejecuta la facturacion
     si no, regresa a la vista*/
  mostrarModalConf() {
    this.modalService.open(this.myModalConf).result.then(r => {

      if (r === "Si") {
        console.log("Compra confirmada");
        this.ConfirmacionCompra();
        this.mostrarModalCerrar();
      } else {
        console.log("Compra denegada");
      }
    }, error => {
      console.log(error);
    });
  }

  mostrarModalCerrar(){
    this.modalService.open(this.myModalCierre).result.then(r =>{
      
      
      if (r==="gracias"){
        console.log("Gracias por su compra");
        if(JSON.parse(sessionStorage.getItem("user")) ==null){
          localStorage.clear();
          console.log("carrito limpio");
        }
        if(JSON.parse(sessionStorage.getItem("user")) !=null){
          let id = JSON.parse(sessionStorage.getItem("user"))._id;
          this.CarritoConUsuarioService.deleteAllCarrito(id).subscribe(data => {
            console.log("carrito limpio");
          });
        }
        
      }
    },
    error =>{
      console.log(error);
    });
  }
  /* Genera el detalle del envio, con nombre, telefono, nit, memail, direccion, departamento
      y alguna nota si fuera necesario.*/
  GetDetalleEnvio() {
    let detalleenvio = {
      nombre: this.nombreenvio, direccion: this.direccionenvio, email: this.emailenvio,
      nit: this.nitenvio, departamento: this.departamentoenvio, telefono: this.telefonoenvio,
      nota: this.notaenvio, metodo_pago: "Pago Contra Entrega"
    }
    return detalleenvio;
  }
  /*Estas funciones estructuran el formato de tipo DATE de mongodb */
  getfechaformato() {
    let date = new Date(); let anio, mes, dia;
    anio = date.getFullYear(); mes = (date.getMonth() + 1); dia = date.getDate();
    let m, d;

    if (mes < 10) { m = '0' + mes; } else { m = mes; }
    if (dia < 10) { d = '0' + dia; } else { d = dia; }

    let fecha = anio + '-' + m + '-' + d;
    console.log(fecha)
    return fecha;
  }

  gethoraformato() {
    let date = new Date();
    let horas = date.getHours(); let minutos = date.getMinutes(); let segundos = date.getSeconds();

    let h; let m; let s;
    if (horas < 10) { h = '0' + horas; } else { h = horas; }
    if (minutos < 10) { m = '0' + minutos; } else { m = minutos; }
    if (segundos < 10) { s = '0' + segundos; } else { s = segundos; }
    let horafactura = h + ":" + m + ":" + s;

    return horafactura;
  }
  //Esta funcion devuelve el formato bien estructurado como es solicitado en mongodb
  GetDate() {
    let date = this.getfechaformato() + 'T' + this.gethoraformato();
    return date;
  }

  //Obtiene el identificador del cliente.
  GetClient() {
    let id_cliente;
    console.log("funcion de get cliente");
    if (sessionStorage.length != 0) {
      id_cliente = JSON.parse(sessionStorage.getItem('user'));
      return id_cliente._id;
    } else {
      console.log("el cliente no existe");
    }

  }
  //Genera el detalle de la factura, el total la fecha y el id del cliente si existe
  GetDetalleFactura() {
    let detalle_factura = { total: this.total, fecha_venta: this.GetDate(), cliente_factura: this.GetClient() }
    return detalle_factura;

  }
  //Toma los detalles de los productos y los almacena en un arreglo de jsons
  GetDetalleProductoFactura() {
    let p = [];
    this.detalleproductos.forEach(element => {
      p.push({
        sub_total: element.subtotal, cantidad: element.cantidad, descripcion: element.descripcion,
        producto_id: element.id
      })
    });
    return p;
  }

  //Esta funcion crea un json, de otros objetos de tipo json. y contiene la informacion necesaria
  //para el post a la api.
  DetalleGeneral() {
    let DetalleGeneral = {
      det_envio: this.GetDetalleEnvio(), factura: this.GetDetalleFactura(),
      det_factura: this.GetDetalleProductoFactura()
    };
    return DetalleGeneral;
  }

  /* Esta funcion crea la facturacion y la confirmacion de compra
    hace uso de dos funciones una cuando no existe el usuario 
    y otra funcion cuando existe el usuario para poder asociarla al cliente
    esto para el historial  */
  ConfirmacionCompra() {
    //console.log("Confirmando compra y creando factura");
    this.checkout.PostFactura(this.DetalleGeneral())
      .subscribe((data: any) => console.log(data));

  }
  // Funcion que obtiene el id del cliente del SessionStorage

  constructor(private checkout: CheckoutService, private modalService: NgbModal, private Location: Location,
              private CarritoConUsuarioService: CarritoUsuarioService,private router:Router) {
    //inicializa la funcion para obtener los id's asociados al carrito de compras, para poder buscar el detalle
    //de los productos
    let usuario = JSON.parse(sessionStorage.getItem("user"));
    
    //si existe el usuario toma el carrito de compras previamente almacenado, sino toma el localStorage

    if(usuario == null){
      this.GetLocalStorage();
    }
    if(usuario!= null){
      let id_usuario = usuario._id;
      this.GetStorageConCliente(id_usuario);
    }
    console.log("usuario");
  }

  ngOnInit(): void {
  }

}
