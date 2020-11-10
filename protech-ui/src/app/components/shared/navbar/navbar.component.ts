import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { CategoriasService } from "../../../services/categorias.service";
import { LoginComponent } from "../../login/login.component";
import { RegistroComponent } from "../../registro/registro.component";
import { LoginService } from "../../../services/login.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categorias: any[] = [];
  isLogged:boolean = false;
  constructor(private _cateogiriasService:CategoriasService,private modalService: NgbModal, private _loginService: LoginService,
              private Router: Router) {
    this._cateogiriasService.getCategorias()
      .subscribe( (dataCategorias: any) => {
        this.categorias = dataCategorias;
      });
   }

  HistorialLocation() {
    this.Router.navigate(['historialcompras']);
  }

  ngOnInit(): void {
    this.onCheckUser();
  }

  openInicioSesion() {
    const modalRef = this.modalService.open(LoginComponent);

  }

  openRegistro(){
    const modalRef = this.modalService.open(RegistroComponent);
    // this.modalService.open(RegistroComponent, { size: 'lg' });
  }

  onCheckUser(){
    if(this._loginService.getToken() ===null){
      this.isLogged=false;
      console.log(this.isLogged);
    }else{
      this.isLogged=true;
      console.log(this.isLogged);
    }
  }

  onLogOut(){
    this._loginService.logOut();
    location.reload();
  }
}
