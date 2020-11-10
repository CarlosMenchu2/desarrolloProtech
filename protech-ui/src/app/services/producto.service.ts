import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Producto } from './productos.service';
import { Productos } from "../interfaces/productos";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZWxpbWluYWRvIjpmYWxzZSwiX2lkIjoiNWY4NTA2MmFlNjgxZWYwMDE3MTQ1N2Y0Iiwibm9tYnJlIjoiYWRtaW4iLCJkaXJlY2Npb24iOiJhZG1pbiIsInRlbGVmb25vIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIiwiX192IjowfSwiaWF0IjoxNjA0OTU5MDY3LCJleHAiOjE2MDUxMzE4Njd9.07kr6zaTUF1Dhi_kaX3snzhyAqQhEDbMIws3sWFWVeQ';
  url = 'http://api-protech.herokuapp.com/api/producto/';
  bodyProducto: Productos;
  constructor(private http: HttpClient) { }
  //campos: any
  //campos[0] = producto
  //campos[1] = descripcion
  //campos[2] = marca
  //campos[3] = categoría
  //campos[4] = precio de venta
  //campos[5] = existencia
  //campos[6] = % descuento

  //descuento: any
  //false = no hay descuento
  //true = hay descuento

  //disponible: any
  //banderaradio = 1 (disponible)
  //banderaradio = 2 (descontinuado)

  postProducto(campos: string[], disponible: any, descuento: any, especificacion: any, mid: any, cid: any){
    const headers = new HttpHeaders({
      'Authorization': this.header,
      'Content-Type':'application/json'
    });
    this.bodyProducto = {
      descripcion: campos[1],
      garantia: 'No dispone',
      ofertado: descuento,
      porcenjateOferta: parseInt(campos[6]),
      nombre: campos[0],
      precio: parseFloat(campos[4]),
      existencia: parseInt(campos[5]),
      especificacion: especificacion,
      disponible: true,
      marca: mid,
      categoria: cid
    };
    console.log(this.bodyProducto.descripcion);
    if (disponible === 2)
    {
      this.bodyProducto.disponible = false;
    }
    let body = JSON.stringify(this.bodyProducto);
    return this.http.post(this.url, body, {headers});
  }

  putProducto(id: any, campos: string[], disponible: any, descuento: any, especificacion: any, mid: any, cid: any)
  {
    const headers = new HttpHeaders({
      'Authorization': this.header,
      'Content-Type':'application/json'
    });
    this.bodyProducto = {
      descripcion: campos[1],
      garantia: 'No dispone',
      ofertado: descuento,
      porcenjateOferta: parseInt(campos[6]),
      nombre: campos[0],
      precio: parseFloat(campos[4]),
      existencia: parseInt(campos[5]),
      especificacion: especificacion,
      disponible: true,
      marca: mid,
      categoria: cid
    };
    console.log(this.bodyProducto.descripcion);
    if (disponible === 2)
    {
      this.bodyProducto.disponible = false;
    }
    let body = JSON.stringify(this.bodyProducto);
    return this.http.put(this.url + id, body, {headers});
  }

  deleteProducto(id: any)
  {
    const headers = new HttpHeaders({
      'Authorization': this.header,
      'Content-Type':'application/json'
    });

    return this.http.delete(this.url + id, {headers});
  }
}
