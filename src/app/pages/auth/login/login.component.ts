import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '@core/interfaces/usuario';
import { AuthService } from '@core/services/auth/auth.service';
import { SwalService } from '@core/services/resources/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _auth: AuthService,
    private _swal: SwalService,
    private router: Router
  ) {}

  usuario: Usuario = {
    username: '',
    pass: '',
  };

  login(): void {
    this._swal.wait();
    this._auth.authLogin(this.usuario).subscribe({
      next: (resp: any) => {
        if (resp.resp.vchstatus == 'ERROR') {
          this._swal.error(resp.resp.vchmensaje);
        } else {
          localStorage.setItem('_token', resp.resp.vchsessionid);
          localStorage.setItem('_username', resp.resp.vchusulogin);
          localStorage.setItem('_rol', resp.resp.vchusurol);
          this._swal.close();
          this.router.navigate(['/panel/vias']);
        }
      },
      error: (err) => {
        alert(err);
        this._swal.close();
      },
    });
  }


}
