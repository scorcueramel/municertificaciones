import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeaderInterceptorService implements HttpInterceptor{

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let cloneRequest = req;
    let contentType = null;

    if(cloneRequest.headers.has('Content-type')){
      contentType = req.headers.get('Content-type');
      cloneRequest = req.clone({
        setHeaders: {
          'Content-type': 'application/json, text/plain, */*, application/x-www-form-urlencoded',
          // 'Content-type': 'application/json, text/plain, */*',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
    return next.handle(cloneRequest)
  }


}
