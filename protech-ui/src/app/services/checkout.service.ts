import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZWxpbWluYWRvIjpmYWxzZSwiX2lkIjoiNWY4NTA2MmFlNjgxZWYwMDE3MTQ1N2Y0Iiwibm9tYnJlIjoiYWRtaW4iLCJkaXJlY2Npb24iOiJhZG1pbiIsInRlbGVmb25vIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIiwiX192IjowfSwiaWF0IjoxNjAyNjMxNzA0LCJleHAiOjE2MDI4MDQ1MDR9.YtG46ZNL2von4-gLP7q_vgtIw3dDAHz6f_Vme8wMEUU';


  constructor(private http: HttpClient) { 
    console.log("servicio checkout listo");
  }


  getproducto(id: number){
    String(id);
    return this.http.get(`https://api-protech.herokuapp.com/api/producto/${id}`);
  }

  PostFactura(factura: any){
    console.log(factura);
    return this.http.post('https://api-protech.herokuapp.com/api/factura/', factura);
  }
}
