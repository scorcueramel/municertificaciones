import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '@core/interfaces/usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL!:string;

  constructor(
    private http:HttpClient
  ) {
    this.URL = environment.apiMediador;
  }

  authLogin(usuario:Usuario):Observable<Usuario>{
    let uri = 'auth/sicu/login';
    return this.http.post<Usuario>(`${this.URL}${uri}`,usuario);
  }

  authLogOut(usuario:Usuario):Observable<Usuario>{
    let uri = `auth/sicu/${usuario.token}/logout`;
    return this.http.get<Usuario>(`${this.URL}${uri}`);
  }

  isAuth():boolean{
    const token = localStorage.getItem('_token');
    if(token == null || token == ""){
      return false
    }
    return true;
  }
}
