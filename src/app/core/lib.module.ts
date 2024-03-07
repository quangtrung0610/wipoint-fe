import { NgModule, NgZone, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreAuthGuardService, CoreAuthInterceptorService, CoreAuthService } from '@core/authentication';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreCommonService, CoreGlobalConfig } from './services';
import { CoreCacheService } from './utility';
import { Router } from '@angular/router';
import { BehaviorSubject, mergeMap, Observable } from 'rxjs';
import { TDSSafeAny } from 'tds-ui/shared/utility';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    CoreAuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CoreAuthInterceptorService, multi: true
    },
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule,
    public libCommon: CoreCommonService,
    public auth: CoreAuthService,
    public cache: CoreCacheService,
    public zone: NgZone,
    public router: Router,
  ) {
    if (core) {
      throw new Error("You should import core module only in the root module")
    } else {
      this.init().subscribe(res => {
        // console.log('init',res)
      });
    }
  }


  init(): Observable<boolean> {
    let that = this;
    return new Observable(obs => {
      that.zone.runOutsideAngular(() => {
        that.setGlobalConfig();
        that.libCommon.init().subscribe((s: TDSSafeAny) => {
          obs.next(true);
          obs.complete();
        });

      });
    })
  }

  private setGlobalConfig() {
    let objConfig = {
      Authen: {
        isLogin: false,
        refreshTokenInProgress: false,
        refreshTokenSubject: new BehaviorSubject<any>(null),
      },
      cache: {
        timerPermission: 0,
        timerApi: 0,

      }
    };
    Object.assign(CoreGlobalConfig, objConfig);
  }
}
