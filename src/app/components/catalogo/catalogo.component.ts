import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CatalagoService } from '../../services/catalago.service';
import { fromEventPattern } from 'rxjs';
import { MarcasService } from '../../services/marcas.service';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  constructor(private _categoriasService: CategoriasService ,private _catalogoService: CatalagoService, private _marcasService: MarcasService,private activatedRoute: ActivatedRoute) {
    this._marcasService.getMarcas()
      .subscribe( (dataMarcas: any) => {
        this.arregloMarcas = dataMarcas;
      });

    this._categoriasService.getCategorias()
      .subscribe( (dataCategorias: any) => {
        this.arregloCategorias = dataCategorias;
      });

    this.activatedRoute.params.subscribe(params =>{
      this._catalogoService.getProductos2(params['id']).subscribe((dataProductos: any)=>{
        this.arregloProductos = dataProductos.productos;
      })
    })

    // this._catalogoService.getProductos2()
    //   .subscribe( (dataProductos: any) => {
    //     this.arregloProductos = dataProductos.productos;
    //   });
    this.obtenerPaginas();
    }
  arregloProductos: any[] = [];
  arregloMarcas: any[] = [];
  arregloCategorias: any[] = [];
  arregloPaginas: any = [];
  numPaginas: number;
  marca = '';
  categoria = '';


  ngOnInit(): void {

  }
  setMarca(marca: string): void{
    this.marca = marca;
  }
  setCategoria(categoria: string): void{
    this.categoria = categoria;
  }

  aplicarFiltros(termino = 1): void{
    this._catalogoService.getProductos2(this.categoria, this.marca,-1,-1, termino)
    .subscribe( (dataProductosFiltrados: any) => {
      this.arregloProductos = dataProductosFiltrados.productos;
    });
    this.obtenerPaginas();
  }


  obtenerPaginas(): void{
    /* this.arregloPaginas = [];
    this._catalogoService.getProductos2(this.categoria, this.marca )
    .subscribe( (dataPaginacion: any) => {
      this.numPaginas = dataPaginacion.count;
      this.numPaginas = Math.ceil( this.numPaginas / 10);
      for (let i = 1; i <= this.numPaginas; i++){
        this.arregloPaginas.push(i);
      }
    }); */
  }


}
