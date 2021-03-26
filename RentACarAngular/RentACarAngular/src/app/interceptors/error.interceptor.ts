import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // client-side error
            this.toastrService.error(`Error: ${error.error.message}`);
          } else {
            // server-side error
            this.toastrService.error(`Error Status: ${error.status}\nMessage: ${error.message}`);
          }
          return throwError(error);
        })
      );
  }
}
