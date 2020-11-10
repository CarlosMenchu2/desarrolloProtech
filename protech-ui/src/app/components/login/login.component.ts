import { Component, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { LoginService } from "../../services/login.service";
import { Login } from "../../interfaces/login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  loginData: Login;
  response: any = [];
  isErrorLoged:boolean=false;
  constructor(public activeModal: NgbActiveModal, private formBuilder:FormBuilder, private _loginService:LoginService) {
    this.buildFormLogin();
   }

  ngOnInit(): void {
  }

  private buildFormLogin() {
    this.formLogin = this.formBuilder.group({
      usuario: ['',[Validators.required]],
      contrasenia: ['',[Validators.required]]
    });
  }

   private validarDatos(): boolean{

    if(this.formLogin.valid ){
      this.loginData = {
        username: this.formLogin.get('usuario').value,
        password: this.formLogin.get('contrasenia').value
      };
      return true;
    }else{
      this.formLogin.markAllAsTouched();
      return false;
    }
  }

  login(){

    if(this.validarDatos()){

      this._loginService.inicioSesion(this.loginData).subscribe((data:any) =>{

        if( parseInt(data.status)==200){
          this.isErrorLoged=false;
          this._loginService.setToken(data.body['token']);
          this._loginService.setUser(data.body['usuario']);
          location.reload();
        }
      },
      error =>{
          this.isErrorLoged=true;
      }
      );
    }
  }

}
