import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Certificado } from '@core/interfaces/certificado';
import { CertificadoResp } from '@core/interfaces/certificado-resp';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificadosNumeracionService {

  private URLMEDIADOR!:string

  constructor(
    private http: HttpClient
  ) {
    this.URLMEDIADOR = environment.apiMediador;
  }

  getPadronByParam(padcert:Certificado):Observable<CertificadoResp[]>{
    let uri = 'acertificado/consulta';
    return this.http.post<CertificadoResp[]>(`${this.URLMEDIADOR}${uri}`,padcert);
  }

  generateCodeForPrint(code:any):Observable<any>{
    let uri = `reportes/genera/${code}/codigo`;
    return this.http.get<any>(`${this.URLMEDIADOR}${uri}`);
  }
}
