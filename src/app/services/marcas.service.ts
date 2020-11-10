import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' //Servicio inyectable en cualquier lugar.
})
export class MarcasService {
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZWxpbWluYWRvIjpmYWxzZSwiX2lkIjoiNWY4NTA2MmFlNjgxZWYwMDE3MTQ1N2Y0Iiwibm9tYnJlIjoiYWRtaW4iLCJkaXJlY2Npb24iOiJhZG1pbiIsInRlbGVmb25vIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIiwiX192IjowfSwiaWF0IjoxNjAyNjMxNzA0LCJleHAiOjE2MDI4MDQ1MDR9.YtG46ZNL2von4-gLP7q_vgtIw3dDAHz6f_Vme8wMEUU';
  constructor(private http: HttpClient) { 
    /*console.log("Constructor, servicio de marcas")*/
  }

  getMarcas(){
  
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.get('https://api-protech.herokuapp.com/api/marca/', {headers})
      .pipe( map( data => data['marcas']));

  }
  postMarca(nombre:any){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    let body = {nombre: nombre};
    console.log(body);
    return this.http.post('https://api-protech.herokuapp.com/api/marca/', body, {headers});
  }
  putMarca(nombre:any, id:any){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    let body = {nombre: nombre};
    return this.http.put(`https://api-protech.herokuapp.com/api/marca/${ id }`, body, {headers});
  }
  deleteMarca(id:any){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.delete(`https://api-protech.herokuapp.com/api/marca/${ id }`, {headers});
  }

}
