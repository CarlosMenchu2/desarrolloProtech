import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { LoginService } from "../services/login.service";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {

  constructor(private _authService:LoginService, private _router:Router){}

  canActivate(){
    if(!this._authService.isLogged()){
      this._router.navigate(['/home']);
      return false;
    }
    return true;
  }



}
