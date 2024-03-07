import { CoreAuthService } from '@core/authentication';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CoreCommonService } from '@core/services/common.service';
import { environment } from '@environments/environment';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { CoreGlobalConfig } from '@core/services/global-config';
import { TDSSafeAny, TDSHelperObject, TDSHelperString } from 'tds-ui/shared/utility';

@Injectable()
export class CoreAuthInterceptorService implements HttpInterceptor {
  constructor(public auth: CoreAuthService, public libcommon: CoreCommonService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<TDSSafeAny> {
    let that = this;

    //add header token
    req = this.addAuthenticationToken(req);
    return next.handle(req).pipe(
      catchError((err) => {
        //xữ lý lỗi trả về
        if (err.status !== 401) {
          let error = '';
          if (TDSHelperObject.hasValue(err)) {
            if (TDSHelperObject.hasValue(err.error)) {
              error = err.error;
            } else {
              if (TDSHelperObject.hasValue(err.statusText)) error = err.statusText;
              else {
                error = err;
              }
            }
          }

          return throwError(() => error);
        }
        //Lỗi 401
        else {
          // if (!CoreGlobalConfig.Authen.refreshTokenInProgress) {
          //   CoreGlobalConfig.Authen.refreshTokenInProgress = true;
          //   CoreGlobalConfig.Authen.refreshTokenSubject.next(null);
          //   that.auth.refreshToken(this.auth.getAccessToken()).subscribe({
          //     next: (data) => {
          //       CoreGlobalConfig.Authen.refreshTokenInProgress = false;
          //       CoreGlobalConfig.Authen.refreshTokenSubject.next(data);
          //       return next.handle(that.addAuthenticationToken(req));
          //     },
          //     error: (error) => {
          //       that.auth.logout();
          //       return throwError(() => error);
          //     },
          //   });
          // }
          // return CoreGlobalConfig.Authen.refreshTokenSubject.pipe(
          //   filter((token) => token !== null),
          //   take(1),
          //   switchMap((token) => next.handle(that.addAuthenticationToken(req)))
          // );
          return next.handle(that.addAuthenticationToken(req));
        }
      })
    );
  }
  //Thực thi add authen token
  addAuthenticationToken(req: HttpRequest<TDSSafeAny>): HttpRequest<TDSSafeAny> {
      req = req.clone({
        setHeaders: {
          xApiKey: environment.apiKey.xapiKey,
          xApiSecret: environment.apiKey.xApiSecret,
        },
      });
    return req;
  }
}
