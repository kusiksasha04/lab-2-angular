import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`[HTTP] ${req.method} ${req.urlWithParams}`);

  return next(req).pipe(
    tap(() => console.log(`[HTTP] ${req.method} ${req.urlWithParams} — OK`)),
    catchError((err: HttpErrorResponse) => {
      console.error(`[HTTP] ${req.method} ${req.urlWithParams} — error ${err.status}: ${err.message}`);
      return throwError(() => err);
    }),
  );
};
