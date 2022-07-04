import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `verification_token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicmF6bWlrLmRhdnR5YW5AZ21haWwuY29tIiwiaWF0IjoxNjUwMTc2NzQyLCJleHAiOjE2NTA0MzU5NDJ9.x3xqr9eC47w_luI5NgPpDVzv9-ILxBlKZymgTv1AVg0`,
      },
      url: `${environment.mainUrl}${request.url}`,
    });
    return next.handle(request);
  }
}
