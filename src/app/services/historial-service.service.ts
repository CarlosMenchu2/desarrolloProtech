import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class HistorialServiceService {

  UsuarioActual: any;

  constructor(private HttpClient: HttpClient) {
    console.log("Servicio de historial disponible");
  }

  ExistUsuario(): boolean {
    if (sessionStorage.length == 0 ) {
      console.log("usuario no existe");
      return false;
    }
    if (sessionStorage.length != 0) {
      console.log("usuario existe");
      return true;
    }
  }
  
  GetUsuarioActual(){
    let ua = JSON.parse(sessionStorage.getItem("user"));
    console.log(ua._id);
    return this.UsuarioActual = ua._id;
  }

  GetCompras(id_Cliente: string){
    return this.HttpClient.get("https://api-protech.herokuapp.com/api/factura/"+id_Cliente);
  }

  GetDetalleEnvio(id_factura){
    return this.HttpClient.get("https://api-protech.herokuapp.com/api/factura/detenvio/"+id_factura);
  }

  GetDetalleProductos(id_factura:string){
    return this.HttpClient.get("https://api-protech.herokuapp.com/api/detalle_factura/"+id_factura);
  }
}
