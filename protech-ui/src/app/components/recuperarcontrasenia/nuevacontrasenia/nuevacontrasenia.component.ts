import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { Validaciones } from "../../registro/validaciones";
import { RecuperarconrtraseniaService } from "../../../services/recuperarconrtrasenia.service";

@Component({
  selector: 'app-nuevacontrasenia',
  templateUrl: './nuevacontrasenia.component.html',
  styleUrls: ['./nuevacontrasenia.component.css']
})
export class NuevacontraseniaComponent implements OnInit {

  formPassword: FormGroup;
  nuevacontrasenia: any = {}
  constructor(private formBuilder:FormBuilder,private _recuperarContraseniaService:RecuperarconrtraseniaService,private _activatedRoute: ActivatedRoute) {
    this.buildFormPassword();
  }

  ngOnInit(): void {
  }

  private buildFormPassword() {
    this.formPassword = this.formBuilder.group({
      contrasenia: ['',[Validators.required,
        Validators.minLength(8),
        Validaciones.patternValidator(/\d/,{hasNumber: true}),
        Validaciones.patternValidator(/[A-Z]/,{ hasCapitalCase: true}),
        Validaciones.patternValidator(/[a-z]/,{hasSmallCase: true}),
        Validaciones.patternValidator( /[ !@#$%^&*()_+\-=\[\]{};:\\|,.<>\/?]/,{hasSpecialCharacters: true})
      ]],
      validarContrasenia:['',[Validators.required]]
    },{
      validator: Validaciones.passwordMatchValidator
    });
  }

  validarFormContrasenia() : boolean{
    if(this.formPassword.valid){
      this.nuevacontrasenia ={
        password:this.formPassword.get("contrasenia").value
      }
      return true;
    }else{
      this.formPassword.markAllAsTouched();
      return false;
    }
  }

  enviarNuevaContrasenia(){
    if(this.validarFormContrasenia()){
      this._activatedRoute.params.subscribe(params =>{
        console.log(params['token']);
        this._recuperarContraseniaService.recuperarContrasenia(params['token'],this.nuevacontrasenia).subscribe((data: any)=>{
          console.log(data);
        })
      })
    }
  }



}
