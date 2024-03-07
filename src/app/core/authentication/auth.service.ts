import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CoreCommonService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class CoreAuthService {
  constructor(private router: Router, private apiService: CoreCommonService) {}
}
