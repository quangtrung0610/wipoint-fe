import { TDSColumnSettingsDTO } from 'tds-ui/column-settings';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable, merge, tap } from 'rxjs';
import { TDSSafeAny } from 'tds-ui/shared/utility';
@Injectable({
  providedIn: 'root',
})
export class CoreCacheService {
  private keyAPI: string = 'api_';
  private keyAPICache: string = '___keyapi___';
  private lstKeyAPI: Array<string> = [];

  constructor(protected localStorage: LocalStorage, private router: Router) {}
  //lấy danh sách các key API từ cache lên đưa vào bảng lstKeyAPI
  public init(): Observable<boolean> {
    return new Observable<boolean>((o) => {
      this.localStorage.getItem(this.keyAPICache).subscribe((obs) => {
        if (obs != null) {
          this.lstKeyAPI = Object.assign(new Array<string>(), obs);
          o.next(true);
        } else {
          o.next(false);
        }
        o.complete();
      });
    });
  }
  //lấy danh sách các key API
  public apiGetKeys(): Array<string> {
    return this.lstKeyAPI;
  }
  //Thiết lập key api
  private apiKeySave(key: string) {
    if (this.lstKeyAPI.indexOf(key) < 0) {
      this.lstKeyAPI.push(key);
      this.localStorage.setItem(this.keyAPICache, this.lstKeyAPI).subscribe(() => {});
    }
  }
  //Xóa key api
  private apiKeyDel(key: string) {
    if (this.lstKeyAPI.indexOf(key) >= 0) {
      this.lstKeyAPI.splice(this.lstKeyAPI.indexOf(key), 1);
      this.localStorage.setItem(this.keyAPICache, this.lstKeyAPI).subscribe(() => {});
    }
  }
  //Lưu trữ giá trị 01 key trên cache
  public setItem(key: TDSSafeAny, value: TDSSafeAny) {
    let that = this;
    var saveItem = {
      date: new Date(),
      value: value,
    };
    that.localStorage.setItem(key, { value: JSON.stringify(saveItem) }).toPromise();
  }
  //Lấy giá trị 01 key trên cache
  public getItem(key: string): Observable<any> {
    let that = this;
    return that.localStorage.getItem(key);
  }
  //Xóa giá trị 01 key trên cache
  public removeItem(key: string) {
    let that = this;
    that.localStorage.removeItem(key).subscribe();
    // that.localStorage.removeItem(key).subscribe(() => { console.log(key + ' is cleared!'); });
  }
  //lưu kết quả trả về của 01 api lên cache
  public apiSet(key: string, val: any): Observable<boolean> {
    let that = this;
    that.apiKeySave(key);
    return that.localStorage.setItem(that.keyAPI + key, val);
  }
  //trả kết quả trả về của 01 api gần nhất
  public apiGet(key: string): Observable<unknown> {
    let that = this;
    return that.localStorage.getItem(that.keyAPI + key);
  }
  //xóa kết quả trả về của 01 api gần nhất trên cache
  public apiRemove(key: string): Observable<boolean> {
    let that = this;
    that.apiKeyDel(key);
    return that.localStorage.removeItem(that.keyAPI + key);
  }
  //xóa toàn bộ cache
  public clear(): Observable<boolean> {
    return this.localStorage.clear();
  }

  //lưu cột
  // getColumnSetting(value: any[]) {
  //   const currentPath = window.location.pathname.substring(1);
  //   this.getItem('column-filters').subscribe((data) => {
  //     let columnSetting: { [key: string]: TDSColumnSettingsDTO[] } = JSON.parse(data?.value)?.value;
  //     if (columnSetting[currentPath]) {
  //       value = columnSetting[currentPath];
  //     } else {
  //       this.setItem('column-filters', columnSetting);
  //       columnSetting[currentPath] = value;
  //     }
  //   });
  // }

  setColumnSetting(value: TDSColumnSettingsDTO[]) {
    const currentPath = window.location.pathname.substring(1);

    this.getItem('column-filters').subscribe((data) => {
      let columnSetting = JSON.parse(data?.value)?.value;
      if(columnSetting[currentPath]){
        columnSetting[currentPath] = value;
        this.setItem('column-filters', columnSetting);
      }else{
        this.setItem('column-filters', value);
      }
    });
  }
}
