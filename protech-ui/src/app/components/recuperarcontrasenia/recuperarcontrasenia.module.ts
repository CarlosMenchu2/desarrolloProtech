import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RecuperarcontraseniaRoutingModule } from './recuperarcontrasenia-routing.module';
import { RecuperarcontraseniaComponent } from "./recuperarcontrasenia.component";
import { RecepcioncorreoComponent } from './recepcioncorreo/recepcioncorreo.component';
import { NuevacontraseniaComponent } from './nuevacontrasenia/nuevacontrasenia.component';

@NgModule({
  declarations: [RecuperarcontraseniaComponent, RecepcioncorreoComponent, NuevacontraseniaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecuperarcontraseniaRoutingModule
  ]
})
export class RecuperarcontraseniaModule { }
