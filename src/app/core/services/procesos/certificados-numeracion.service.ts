import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Certificado } from '@core/interfaces/certificado';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificadosNumeracionService {

  URL!:string;

  constructor(
    private http : HttpClient
  )
  {
    this.URL = environment.apiURL;
  }

  getByParamsNumberCertify(certificado:Certificado):Observable<Certificado[]>{
    let uri = 'lCert?entidad=201&sistema=609&key=400';
    return this.http.post<Certificado[]>(`${this.URL}${uri}`,certificado);
  }

}
