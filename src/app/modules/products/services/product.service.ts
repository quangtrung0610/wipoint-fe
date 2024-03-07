import { Injectable } from '@angular/core';
import { CoreAPIDTO } from '@core/dto';
import { CoreApiMethodType } from '@core/enum';
import { CoreCommonService } from '@core/services';
import { environment } from '@environments/environment';
import { map } from 'rxjs';
import { QrcodeDto } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private service: CoreCommonService) {}

  getEntity(id: number) {
    const url: string = `${environment.apiService}${environment.apiPath.qrcode.base}/${id}`;
    const api: CoreAPIDTO = {
      method: CoreApiMethodType.get,
      url,
    };
    return this.service.getData<any>(api, null).pipe(
      map((data) => {
        return new QrcodeDto(data);
      })
    );
  }
}
