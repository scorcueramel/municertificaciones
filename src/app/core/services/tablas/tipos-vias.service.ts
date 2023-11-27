import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiposViasService {
  private URL!:string;

  constructor(
    private http:HttpClient,
  ) {
    this.URL = environment.apiURL;
  }


  getAllTypeVias():Observable<TiposViasService[]>{
    const uri = "ltipovia?entidad=201&sistema=609&key=400";
    return this.http.get<TiposViasService[]>(`${this.URL}${uri}`);
  }
}
