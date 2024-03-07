import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
  CanActivateChild,
  CanLoad,
  UrlSegment,
  Route,
} from '@angular/router';
import { CoreAuthService } from './auth.service';
import { CoreCacheService, CoreUserInitDTO } from '..';

@Injectable({
  providedIn: 'root',
})
export class CoreAuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  userProfile!: CoreUserInitDTO | undefined;
  permissions: string[] = [];

  constructor(public router: Router, public auth: CoreAuthService, private cacheService: CoreCacheService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return true;
  }
}
