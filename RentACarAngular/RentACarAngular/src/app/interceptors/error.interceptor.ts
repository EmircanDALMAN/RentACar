import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // client-side error
            console.log(`Error: ${error.error.message}`);
          } else {
            // server-side error
            console.log(`Error Status: ${error.status}\nMessage: ${error.message}`);
          }
          return throwError(error);
        })
      );
  }
}
