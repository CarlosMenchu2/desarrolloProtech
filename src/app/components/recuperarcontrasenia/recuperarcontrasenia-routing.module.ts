import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarcontraseniaComponent } from "../recuperarcontrasenia/recuperarcontrasenia.component";
import { RecepcioncorreoComponent } from "./recepcioncorreo/recepcioncorreo.component";
import { NuevacontraseniaComponent } from "./nuevacontrasenia/nuevacontrasenia.component";

const routes: Routes = [
  {path:'forgotpassword', component: RecuperarcontraseniaComponent,
  children: [
    {path:'ingresocorreo',component:RecepcioncorreoComponent},
    {path:'newpassword/:token',component:NuevacontraseniaComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecuperarcontraseniaRoutingModule { }
