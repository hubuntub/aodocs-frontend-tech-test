import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class InterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (token) {
            req = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
        }
        req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});

        return next.handle(req);
    }
}
