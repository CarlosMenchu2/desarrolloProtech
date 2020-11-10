import { Component, OnInit } from '@angular/core';
import { MarcasService } from '../../services/marcas.service';
import { CategoriasService } from "../../services/categorias.service";
//import * as $ from 'jquery';
declare var $ : any;

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})

export class ConfiguracionesComponent implements OnInit {

  marcas: any[] = [];
  categorias: any[] = [];
  idCat = -1;
  idMarc = -1;
  idCategoria = '';
  idMarca = '';

  constructor( private _marcasService:MarcasService, private _categoriasService:CategoriasService ) {
    this._marcasService.getMarcas()
      .subscribe( (dataMarcas: any) => {
        this.marcas = dataMarcas;
      });
    this._categoriasService.getCategorias()
      .subscribe( (dataCategorias: any) => {
        this.categorias = dataCategorias;
      });
  }


  ngOnInit(): void {
    //Desplegar ingreso categoría
    $('#btnCategoria').click(function(){
      let cat = $('#categoriatxt').val();
      let re = /^[a-zA-ZñÑ.'-]{1,25}/;
      let bandera = re.test(cat);
      if(bandera === true){
        $('#submitCategoria').modal('show');
      }
      else{
        $('#error').modal('show');
      }
    });
    //Desplegar ingreso marca
    $('#btnMarca').click(function(){
      let cat = $('#marcatxt').val();
      let re = /^[a-zA-ZñÑ.'-]{1,25}/;
      let bandera = re.test(cat);
      if(bandera === true){
        $('#submitMarca').modal('show');
      }
      else{
        $('#error').modal('show');
      }
    });

  }
  msgValidationCat(idx):void{
    let cat = $('#cat' + idx).val();
    let re = /^[a-zA-ZñÑ.'-]{1,25}/;
    let bandera = re.test(cat);
    if(bandera === true){
      $('#updCategoria').modal('show');
      this.setCategoria(idx);
    }
    else{
      this.setCategoria(idx);
      $('#error').modal('show');
    }
  }
  msgValidationMarc(idx):void{
    let cat = $('#mar' + idx).val();
    let re = /^[a-zA-ZñÑ.'-]{1,25}/;
    let bandera = re.test(cat);
    if(bandera === true){
      $('#updMarca').modal('show');
      this.setMarca(idx);
    }
    else{
      this.setMarca(idx);
      $('#error').modal('show');
    }
  }

  setCategoria(idx: any): void{
    this.idCategoria = this.categorias[idx]._id;
    this.idCat = idx;
  }
  setMarca(idx: any): void{
    this.idMarca = this.marcas[idx]._id;
    this.idMarc = idx;
  }

  addCategoria(): void{
    const nombre = document.querySelector(`[id=categoriatxt]`) as HTMLInputElement;
    this._categoriasService.postCategorias(nombre.value).subscribe(data => {
      this._categoriasService.getCategorias()
      .subscribe( (dataCategorias: any) => {
        this.categorias = dataCategorias;
      });
      $("#categoriatxt").val('');
      
      }, 
      error => {
        console.log(error as any);
      }
    );
  }

  updCategoria(): void{
    const newName = document.querySelector(`[id=cat${this.idCat}]`) as HTMLInputElement;
    console.log("New Name: " + newName.value)
    for (let i=0; i < this.categorias.length; i++){
      if (this.categorias[i]._id === this.idCategoria){
        this.categorias[i].nombre = newName.value;
        this._categoriasService.putCategorias(newName.value, this.idCategoria).subscribe(error => {
            console.log(error as any);
          }
        );
        i = this.categorias.length;
      }
    }
  }

  delCategoria(): void{
    this._categoriasService.deleteCategorias(this.idCategoria).subscribe(data => {
      this._categoriasService.getCategorias()
      .subscribe( (dataCategorias: any) => {
        this.categorias = dataCategorias;
      });
    }, 
      error => {
        console.log(error as any);
      }
    );
  }

  addMarca(): void{
    const nombre = document.querySelector(`[id=marcatxt]`) as HTMLInputElement;
    this._marcasService.postMarca(nombre.value).subscribe(data => {
      this._marcasService.getMarcas()
      .subscribe( (dataMarcas: any) => {
        this.marcas = dataMarcas;
      });
      $("#marcatxt").val('');
      
      }, 
      error => {
        console.log(error as any);
      }
    );
  }

  updMarca(): void{
    const newName = document.querySelector(`[id=mar${this.idMarc}]`) as HTMLInputElement;
    console.log("New Name: " + newName.value)
    for (let i=0; i < this.marcas.length; i++){
      if (this.marcas[i]._id === this.idMarca){
        this.marcas[i].nombre = newName.value;
        this._marcasService.putMarca(newName.value, this.idMarca).subscribe(error => {
            console.log(error as any);
          }
        );
        i = this.marcas.length;
      }
    }
  }

  delMarca(): void{
    this._marcasService.deleteMarca(this.idMarca).subscribe(data => {
      this._marcasService.getMarcas()
      .subscribe( (datamarcas: any) => {
        this.marcas = datamarcas;
      });
    }, 
      error => {
        console.log(error as any);
      }
    );
  }
}
