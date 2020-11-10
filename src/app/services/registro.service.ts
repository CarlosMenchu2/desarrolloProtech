import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Registro } from "../interfaces/registro";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  URL:string = "https://api-protech.herokuapp.com/api/cliente/";

  constructor(private http:HttpClient) { }

  registrarUsuario(registro:Registro){
    let body = JSON.stringify(registro);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post(this.URL,body,{headers:headers});

  }
}
