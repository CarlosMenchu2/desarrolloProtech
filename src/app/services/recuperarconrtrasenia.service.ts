import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class RecuperarconrtraseniaService {

  URL:string = "https://api-protech.herokuapp.com/api/password";

  constructor(private http:HttpClient) { }


  mandarCorreo(correo){
    let body = JSON.stringify(correo);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    return this.http.post(`${this.URL}/email/`,body,{headers:headers});
  }

  recuperarContrasenia(token,contrasenia){
    let body = JSON.stringify(contrasenia);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });

    return this.http.put(`${this.URL}/reset/`,body,{headers:headers});
  }
}
