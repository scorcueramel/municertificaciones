import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TiposHabilitaciones } from '@core/interfaces/tipos-habilitaciones';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiposHabilitacionesUrbanasService {
  private URL!:string;

  constructor(
    private http:HttpClient
  ) {
    this.URL = environment.apiURL;
  }

  getAllTypeHabilitacionesUrbanas():Observable<TiposHabilitaciones[]>{
    const uri = 'ltipohab?entidad=201&sistema=609&key=400';
    return this.http.get<TiposHabilitaciones[]>(`${this.URL}${uri}`);
  }
}
