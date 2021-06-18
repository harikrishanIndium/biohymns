import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public http: HttpClient) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token =sessionStorage.getItem('idtoken');
        if (token) {
            request = request.clone({
                setHeaders: {
                    
                    Authorization:"Bearer "+ token
                }
            });
        }
        return next.handle(request)

    }
}