import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { CoreCommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private service: CoreCommonService, private httpClient: HttpClient) {}

  upload(files: any[]) {
    const url: string = `${environment.loyaltyService}${environment.apiLoyalty.media.uploadFiles}`;
    // const api: CoreAPIDTO = {
    //   method: CoreApiMethodType.post,
    //   url,
    // };
    const formData = new FormData();
    const headers = this.service.getHeaderJSon(false, false, true);
    files.forEach((file) => {
      formData.append('Files', file, file.name);
    });

    return this.httpClient.post(url, formData, {
      headers,
      reportProgress: true,
      observe: 'events',
    });
  }
}
