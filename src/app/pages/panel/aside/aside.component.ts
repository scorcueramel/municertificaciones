import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '@core/interfaces/usuario';
import { AuthService } from '@core/services/auth/auth.service';
import { SwalService } from '@core/services/resources/swal.service';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  constructor(
    private _auth:AuthService,
    private router : Router,
    private _swal: SwalService
  ){}

  tokenLogin:string = localStorage.getItem('_token');

  usuario:Usuario = {
    token:this.tokenLogin,
  }

  logOut():void{
    this._swal.wait();
    this._auth.authLogOut(this.usuario).subscribe({
      next:(resp:any)=>{
        localStorage.removeItem('_token');
        localStorage.removeItem('_rol');
        localStorage.removeItem('_username');
        console.log(resp);
        this.router.navigate(['/login']);
        this._swal.close();
      },
      error:(err)=>{
        console.log(err)
        this._swal.close();
      }
    });
  }
}
