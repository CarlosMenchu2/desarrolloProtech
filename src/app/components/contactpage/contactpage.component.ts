import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

import { Validaciones } from "../registro/validaciones";

@Component({
  selector: 'app-contactpage',
  templateUrl: './contactpage.component.html',
  styleUrls: ['./contactpage.component.css']
})
export class ContactpageComponent implements OnInit {

  formContacto: FormGroup;
  constructor(private formBuilder:FormBuilder) {
    this.buildFormContacto();
  }

  ngOnInit(): void {
  }

  private buildFormContacto(){
    this.formContacto = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      telefono: ['',[Validators.required,Validaciones.patternValidator(/\d/,{hasNumber: true})]],
      correo: ['',[Validators.required,Validators.email]],
      mensaje: ['',Validators.required]
    });
  }

  enviarCorreo(){
    if(this.formContacto.valid){
      console.log('correo valido');
    }else{
      this.formContacto.markAllAsTouched();
    }
  }

}
