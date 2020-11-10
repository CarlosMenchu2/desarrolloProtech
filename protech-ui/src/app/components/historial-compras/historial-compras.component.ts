import { Component, OnInit } from '@angular/core';
import { HistorialServiceService } from "../../services/historial-service.service";
@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent implements OnInit {

  HistorialCompras: any[] = [];
  DetalleProductos: any[] = [];
  DetalleEnvio: any;
  InfoFactura: any;
  Cliente: any;
  total: any;

  GetDatosCliente() {
    this.Cliente = JSON.parse(sessionStorage.getItem("user"));
    console.log(this.Cliente);
  }

  GetCompras() {
    let id_cliente = this.HistorialServicio.GetUsuarioActual();

    this.HistorialServicio.GetCompras(id_cliente)
      .subscribe((data: any) => {
        data.factura.forEach(element => {
          this.HistorialCompras.push({
            idcompra: element._id, fechacompra: element.fecha_venta,
            total: element.total
          });
        });
      })

  }
  getBoton(id_factura: any) {
    console.log(id_factura);
    this.DetalleProductos = [];
    this.total = 0;
    this.GetDetalleEnvio(id_factura);
    this.HistorialServicio.GetDetalleProductos(id_factura)
      .subscribe((data: any) => {
        data.detalle.forEach(element => {
          this.total += ((element.producto_id.precio * element.cantidad) - (element.producto_id.porcenjateOferta * element.producto_id.precio));
          this.DetalleProductos.push({
            descripcion: element.descripcion, cantidad: element.cantidad,
            descuento: element.producto_id.porcenjateOferta, precio: element.producto_id.precio,
            subtotal: ((element.producto_id.precio * element.cantidad) - (element.producto_id.porcenjateOferta * element.producto_id.precio))
          });
        });
      });
  }

  GetDetalleEnvio(id_envio) {
    this.DetalleEnvio = {direccion: "", anotacion: "",metodoenvio: ""};
    this.InfoFactura ={nombre:"",fecha:"",total:""}
    this.HistorialServicio.GetDetalleEnvio(id_envio)
    .subscribe((data: any)=>{
      console.log("///////////////");
      console.log(data);
      this.InfoFactura ={nombre:JSON.parse(sessionStorage.getItem("user")).nombre,fecha:data.factura.fecha_venta,total:data.factura.total}
      this.DetalleEnvio = { direccion: data.factura.cliente_envio.direccion, anotacion: data.factura.cliente_envio.nota,
                            metodoenvio: data.factura.cliente_envio.metodo_pago};
    

    });
    
  }

  GetNombreCliente(id_cliente){
    let NombreCliente = JSON.parse(sessionStorage.getItem("user")).nombre;
    return NombreCliente.nombre;
  }




  constructor(private HistorialServicio: HistorialServiceService) {
    this.GetDatosCliente();
    this.GetCompras();
    this.GetDetalleEnvio("");
    //this.GetInfoFactura();
    //this.GetDetalleCompra();
  }


  ngOnInit(): void {
  }

}
