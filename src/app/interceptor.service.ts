import { Injectable } from '@angular/core';
import {  HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    if ((req.url.includes('registervendor/') && (req.method == "POST")) || req.url.includes('registerclient/') && (req.method == "POST") || req.url.includes('emplyerLogin/') && (req.method == "POST") || req.url.includes('emplyeeLogin/') && (req.method == "POST") ) {
      
      return next.handle(req).pipe(map(event => {
        if (event instanceof HttpResponse) {
          
            let token
            if(event.body.access_token){
              token = event.body.access_token; 
              localStorage.setItem('token', token)
            }   
            else{
              token = event.body.access; 
              localStorage.setItem('token', token)
            }        
          
          return event;
        }
      }))
    } else {
      if(event instanceof HttpRequest){
      }
      let token = localStorage.getItem('token');
      if (token) {        
        let authorizedReq = req.clone({ setHeaders: {'Authorization': `Token ${token}`}});
        return next.handle(authorizedReq);
      }else{
        return next.handle(req);
      }
    }   
  }

}
