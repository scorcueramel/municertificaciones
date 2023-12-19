import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Padron } from '@core/interfaces/padron';
import { PadronResp } from '@core/interfaces/padron-resp';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PadronService {
  private URL!:string;

  constructor(
    private http:HttpClient
  ){
    this.URL = environment.apiURL;
  }

  getPadronByParams(padron:Padron):Observable<PadronResp[]>{
    let URI = `lpadron?chrcurcodigo=${padron.CHRCURCODIGO}&vchviacodigo=${padron.VCHVIACODIGO}&vchrancuadra=&vchmzanumero=&vchlotnumero=&vchlotcodigo=&entidad=201&sistema=609&key=400`;
    return this.http.get<PadronResp[]>(`${this.URL}${URI}`);
  }

}
