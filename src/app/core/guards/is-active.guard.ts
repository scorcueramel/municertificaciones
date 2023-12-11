import { ActivatedRouteSnapshot, CanActivate,  Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "@core/services/auth/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class isActiveGuard implements CanActivate {
  constructor(
    private _auth:AuthService,
    private router:Router
  ){}

  canActivate(): boolean{
    if(this._auth.isAuth()){
      return  true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
