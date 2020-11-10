import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZWxpbWluYWRvIjpmYWxzZSwiX2lkIjoiNWY4NjkwMjU0NjQ5ZjIyZDhmNmJmYTk0Iiwibm9tYnJlIjoiYXNkIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjMiLCJjb3JyZW8iOiJhc2RmIiwibml0IjoiMSIsInVzZXJuYW1lIjoiY3Jpc3RpYW4iLCJfX3YiOjB9LCJpYXQiOjE2MDI5ODE3ODUsImV4cCI6MTYwMzE1NDU4NX0.UG-XjfV9XWtjELQYYaEpBfMktGWh_Bn_d0XRrIhW2R8';
  constructor( private http: HttpClient) { }
  getCategorias(){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.get('https://api-protech.herokuapp.com/api/categoria/', {headers})
      .pipe( map( data => data['categorias']));

  }
  postCategorias(nombre:any){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    let body = {nombre: nombre};
    console.log(body);
    return this.http.post('https://api-protech.herokuapp.com/api/categoria/', body, {headers});
  }
  putCategorias(nombre:any, id:any){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    let body = {nombre: nombre};
    return this.http.put(`https://api-protech.herokuapp.com/api/categoria/${ id }`, body, {headers});
  }
  deleteCategorias(id:any){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.delete(`https://api-protech.herokuapp.com/api/categoria/${ id }`, {headers});
  }
}
