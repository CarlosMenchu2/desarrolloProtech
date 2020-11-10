import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CatalagoService {
  constructor(private http: HttpClient) {
    /* console.log('Constructor catalogo servicios'); */
   }

/**
 * Funcion que ejecutará el query que se le haya sido mandado
 * @param query Consulta que se desee realizar dependiendo de los parametros
 */
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZWxpbWluYWRvIjpmYWxzZSwiX2lkIjoiNWY4NTA2MmFlNjgxZWYwMDE3MTQ1N2Y0Iiwibm9tYnJlIjoiYWRtaW4iLCJkaXJlY2Npb24iOiJhZG1pbiIsInRlbGVmb25vIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIiwiX192IjowfSwiaWF0IjoxNjA0OTU5MDY3LCJleHAiOjE2MDUxMzE4Njd9.07kr6zaTUF1Dhi_kaX3snzhyAqQhEDbMIws3sWFWVeQ';
  getQuery( query: String){
    const url = `https://api-protech.herokuapp.com/api/producto/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.http.get(url, {headers})
      .pipe( map (data => {
        //console.log (url);
        return data;
      }));
  }

  /**
   * Función que filtrará los productos por marca o categoria dependiendo del id que reciba
   */
  getFiltros(  idCategoria: String, idMarca: String, noPagina = 1 ){
    return this.getQuery( "marca/"+ idCategoria + '/' + idMarca + `/?page=${ noPagina }`);
  }

  /**
   * Función que devolverá 10 productos dependiendo de la paginación.
   */
  getProductos(noPagina = 1){
    return this.getQuery(`?page=${ noPagina }`)
  }

  /**
   * Función que retornará un único producto asociado a idProducto
   * @param idProducto id del producto a buscar
   */
  getProducto(idProducto:String){
    return this.getQuery(`${idProducto}`)
  }
  /**
   * Funcion que buscará los productos en base al precio que se encuentre entre un intérvalo establecido
   * @param minimo El valor mínimo que se desea buscar
   * @param maximo El valor máximo que se desea buscar
   */
  getRangosPrecios(minimo, maximo, noPagina){
    return this.getQuery( "precio/?min="+`${minimo}&max=${maximo}&page=${ noPagina }`);
  }
  
  getProductos2(idCategoria = '', idMarca = '', minimo = -1, maximo = -1, noPagina = 1){
    if (idCategoria != '' && idMarca == '' && minimo == -1 && maximo == -1) {  //Búsqueda por categoría
      return this.getQuery( "categoria/"+ idCategoria + `/?page=${ noPagina }`);
    } else if (idCategoria == '' && idMarca != '' && minimo == -1 && maximo == -1) {  //Búsqueda por marca
      return this.getQuery( "marca/"+ idMarca + `/?page=${ noPagina }`);
    } else if (idCategoria != '' && idMarca != ''  && minimo == -1 && maximo == -1) { //Búsqueda por categoría y marca
      return this.getQuery( "marca/"+ idCategoria + '/' + idMarca + `/?page=${ noPagina }`);
    // tslint:disable-next-line: triple-equals
    } else if (idCategoria == '' && idMarca == ''  && minimo != -1 && maximo != -1) {  // Búsqueda por rangos de precio sin definir marca ni categoria
      return this.getQuery("precio/?min="+`${minimo}&max=${maximo}&page=${ noPagina }`);
    } else if (idCategoria == '' || idMarca == ''){ //  Ningún filtro aplicado
      return this.getQuery(`?page=${ noPagina }`)
    }
  }

  putExistencias(id: any, cant: any, type: any){
    const headers = new HttpHeaders({
      'Authorization': this.token,
    });
    const body = {tipo: type, cant: cant};
    return this.http.put(`https://api-protech.herokuapp.com/api/producto/update/${ id }`, body, {headers});
  }
}
