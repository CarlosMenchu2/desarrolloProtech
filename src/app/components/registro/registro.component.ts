import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { map } from "rxjs/operators";

import { Validaciones } from "./validaciones";
import { Registro } from "../../interfaces/registro";
import { RegistroService } from "../../services/registro.service";
import { MensajeErrorComponent } from "../shared/mensaje-error/mensaje-error.component";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  active = 1;
  formCredenciales: FormGroup;
  formDatos: FormGroup;
  dataUsuario:Registro;
  response:any =[];

  constructor(public activeModal: NgbActiveModal, private formBuilder:FormBuilder, private _registro:RegistroService,private modalService: NgbModal,private toastr: ToastrService) {
    this.buildFormCredenciales();
    this.buildFormDatos();
  }

  ngOnInit(): void {
  }

  private buildFormCredenciales(){
    this.formCredenciales = this.formBuilder.group({
      usuario: ['',[Validators.required]],
      contrasenia: ['',[Validators.required,
        Validators.minLength(8),
        Validaciones.patternValidator(/\d/,{hasNumber: true}),
        Validaciones.patternValidator(/[A-Z]/,{ hasCapitalCase: true}),
        Validaciones.patternValidator(/[a-z]/,{hasSmallCase: true}),
        Validaciones.patternValidator( /[ !@#$%^&*()_+\-=\[\]{};:\\|,.<>\/?]/,{hasSpecialCharacters: true})
      ]],
      validarContrasenia: ['',Validators.required],
    },{
      validator:Validaciones.passwordMatchValidator
    });
  }

  private buildFormDatos(){
    this.formDatos = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      correo:['',[Validators.required,Validators.email]],
      telefono:['',[Validators.required,Validaciones.patternValidator(/\d/,{hasNumber: true})]],
      direccion: ['',[Validators.required]],
      nit: ['',[Validators.required]]
    });
  }

  validarDatos():boolean{

    if(this.formCredenciales.valid && this.formDatos.valid){

      this.dataUsuario = {
        nombre:this.formDatos.get('nombre').value,
        direccion:this.formDatos.get('direccion').value,
        telefono:this.formDatos.get('telefono').value,
        correo:this.formDatos.get('correo').value,
        nit:this.formDatos.get('nit').value,
        username:this.formCredenciales.get('usuario').value,
        password:this.formCredenciales.get('contrasenia').value
      };
      // this._registro.registrarUsuario(this.dataUsuario).subscribe(data =>{
      //   this.response= data;
      //   console.log(this.response);
      // },
      // error=>{
      //   this.activeModal.close();
      //   this.modalService.open(MensajeErrorComponent);
      // });
      // console.log(valor);
      return true;
    }else{
      this.formDatos.markAllAsTouched();
      this.formCredenciales.markAllAsTouched();
      return false;
    }

  }

  registrarUsuario() {
    if (this.validarDatos()){
      this._registro.registrarUsuario(this.dataUsuario).subscribe(data =>{
        this.response= data;
        console.log(this.response);
        this.activeModal.close();
        this.toastr.success("Registro Exitoso","Pro-tech");
      },
      error=>{
        this.activeModal.close();
        this.modalService.open(MensajeErrorComponent);
      });

    // Login
    }
  }
}
