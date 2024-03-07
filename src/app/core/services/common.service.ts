import { CoreCacheService } from '@core/utility';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CoreApiCacheDTO, CoreAPIDTO, CoreDictionary } from '../dto';
import { CoreApiMethodType } from '../enum';
import { TDSSafeAny, TDSHelperObject } from 'tds-ui/shared/utility';

@Injectable({
  providedIn: 'root',
})
export class CoreCommonService {
  private _dicData: CoreDictionary<Subject<any>> = {};
  private _dicRunning: CoreDictionary<Boolean> = {};

  constructor(private http: HttpClient, private cache: CoreCacheService) {}
  public init(): Observable<boolean> {
    let that = this;
    return new Observable<boolean>((o) => {
      this.cache.init().subscribe((s: TDSSafeAny) => {
        let keys: Array<string> = this.cache.apiGetKeys();
        keys.forEach((val) => {
          that._dicData[val] = new Subject<any>();
          that._dicRunning[val] = false;
        });
        o.next(s);
        o.complete();
      });
    });
  }
  //Kết nối server lấy dữ liệu
  public connect<T>(
    pmethod: CoreApiMethodType,
    URL: string,
    data: unknown,
    headers?: HttpHeaders,
    body: TDSSafeAny = null,
    withCredent: boolean = false,
    observe: any = 'body',
    responseType: any = 'json'
  ): Observable<T> {
    let that = this;

    if (!TDSHelperObject.hasValue(headers)) headers = that.getHeaderJSon();

    let options: {
      headers?: HttpHeaders;
      observe?: TDSSafeAny;
      params?: TDSSafeAny;
      body?: TDSSafeAny;
      reportProgress?: boolean;
      responseType?: TDSSafeAny;
      withCredentials?: boolean;
    } = {
      headers: headers,
      withCredentials: withCredent,
      observe: observe,
      responseType: responseType,
      body: body,
    };
    let result: Observable<T>;
    switch (pmethod) {
      case CoreApiMethodType.get:
        options.params = data;
        result = that.http.get<T>(URL, options);
        break;
      case CoreApiMethodType.post:
        options.params = null;
        result = this.http.post<T>(URL, data, options);
        break;
      case CoreApiMethodType.put:
        result = this.http.put<T>(URL, data, options);
        break;
      case CoreApiMethodType.delete:
        options.params = data;
        options.body = body;
        result = this.http.delete<T>(URL, options);
        break;
      default:
        result = this.http.post<T>(URL, JSON.stringify(data), options);
        break;
    }
    return result;
  }
  //Reset lại toàn bộ dữ liệu Data và các key đang running
  public resetData() {
    let that = this;

    that._dicData = {};
    that._dicRunning = {};
  }
  //Lấy dữ liệu
  public getData<T>(api: CoreAPIDTO, param: any): Observable<T> {
    let that = this;
    return that.connect<T>(api.method, api.url, param, that.getHeaderJSon());
  }
  //Tạo mới dữ liệu
  public create<T>(api: CoreAPIDTO, param: any): Observable<T> {
    let that = this;
    return that.connect<T>(api.method, api.url, param, that.getHeaderJSon());
  }

  //Tạo mới dữ liệu form data
  public createFormData<T>(api: CoreAPIDTO, param: any, options: any): Observable<T> {
    let that = this;
    return that.connect<T>(api.method, api.url, param, that.getHeaderJSon(false, false, true));
  }

  //Cập nhật dữ liệu
  public updateData<T>(api: CoreAPIDTO, param: any): Observable<T> {
    let that = this;
    return that.connect<T>(api.method, api.url, param, that.getHeaderJSon());
  }

  //Cập nhật dữ liệu form data
  public updateFormData<T>(api: CoreAPIDTO, param: any): Observable<T> {
    let that = this;
    return that.connect<T>(api.method, api.url, param, that.getHeaderJSon(false, false, true));
  }

  //Xóa dữ liệu
  public deleteData<T>(api: CoreAPIDTO, param: any, body: TDSSafeAny = null): Observable<T> {
    let that = this;
    return that.connect<T>(api.method, api.url, param, that.getHeaderJSon(), body);
  }
  //Thực thi lấy header
  getHeaderJSon(
    isAuthorize: boolean = true,
    istoken: boolean = false,
    isFormData: boolean = false
  ): HttpHeaders {
    if (isAuthorize) {
      return new HttpHeaders({
        'Data-type': 'json',
        'Content-type': 'application/json;charset=utf-8',
        'Accept-Language': 'vi',
        'Access-Control-Allow-Origin': '*',
      });
    } else {
      return istoken
        ? new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept-Language': 'vi',
            'Access-Control-Allow-Origin': '*',
          })
        : isFormData
        ? new HttpHeaders({
            'Accept-Language': 'vi',
            'Access-Control-Allow-Origin': '*',
          })
        : new HttpHeaders({
            'Data-type': 'json',
            'Content-type': 'application/json;charset=utf-8',
            'Accept-Language': 'vi',
            'Access-Control-Allow-Origin': '*',
          });
    }
  }
  //lấy dữ liệu trên cache/server với việc truyền vào form để xác nhận phân quyền
  private connectWithAuthFormURL<T>(
    pmethod: CoreApiMethodType,
    URL: string,
    data: any
  ): Observable<T> {
    let that = this;
    let strkey: string = JSON.stringify(pmethod) + JSON.stringify(data) + URL;
    let headers = this.getHeaderJSon();
    if (TDSHelperObject.hasValue(that._dicData[strkey])) {
      if (that._dicRunning[strkey]) {
        return that._dicData[strkey];
      } else {
        that.cache.apiGet(strkey).subscribe((obs: TDSSafeAny) => {
          let flag: Boolean = false;
          if (obs != null) {
            let itemCache: CoreApiCacheDTO = Object.assign(new CoreApiCacheDTO(), obs);
            if (itemCache.Expire > new Date().getTime()) {
              flag = true;
              that._dicData[strkey].next(itemCache.Data);
              that._dicData[strkey].complete();
              that._dicData[strkey] = new Subject<T>();
            }
          }
          if (flag == false && that._dicRunning[strkey] == false) {
            that._dicRunning[strkey] = true;
            that.connect<T>(pmethod, URL, data, headers).subscribe(
              (res) => {
                that._dicData[strkey].next(res);
                that._dicRunning[strkey] = false;
                that._dicData[strkey].complete();
                that._dicData[strkey] = new Subject<T>();
                let item: CoreApiCacheDTO = new CoreApiCacheDTO();
                if (item.build(res) == true) {
                  that.cache.apiSet(strkey, item).subscribe(() => {});
                }
              },
              (f) => {
                that._dicData[strkey].error(f);
                that._dicRunning[strkey] = false;
                that._dicData[strkey].complete();
                that._dicData[strkey] = new Subject<T>();
              }
            );
          }
        });
        return that._dicData[strkey];
      }
    } else {
      that._dicData[strkey] = new Subject<T>();
      that._dicRunning[strkey] = true;
      that.connect<T>(pmethod, URL, data, headers).subscribe(
        (res) => {
          that._dicData[strkey].next(res);
          that._dicRunning[strkey] = false;
          that._dicData[strkey].complete();
          that._dicData[strkey] = new Subject<T>();
          let item: CoreApiCacheDTO = new CoreApiCacheDTO();
          if (item.build(res) == true) {
            that.cache.apiSet(strkey, item).subscribe(() => {});
          }
        },
        (f) => {
          that._dicData[strkey].error(f);
          that._dicRunning[strkey] = false;
          that._dicData[strkey].complete();
          that._dicData[strkey] = new Subject<T>();
        }
      );
      return that._dicData[strkey];
    }
  }
}
