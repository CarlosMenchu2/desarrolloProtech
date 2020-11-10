import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { from, Observable } from 'rxjs';
import { HistorialServiceService } from '../services/historial-service.service'


@Injectable({
  providedIn: 'root'
})
export class AuthHistorialGuard implements CanActivate {
  constructor(private HistorialService: HistorialServiceService, private router: Router ){

  }

  canActivate(){
    if (this.HistorialService.ExistUsuario() == true) {
      //si true
      return true;
    }else{
      console.log("el usuario no esta registrado");
      this.router.navigate(['home']);
      return false;
    }
    
  }
  
}
