import { Component } from '@angular/core';
import { OS } from '@core/enum';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  public androidAppUrl = environment.androidAppUrl;
  public iosAppUrl = environment.iosAppUrl;

  getOS() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod');
    const isAndroid = userAgent.includes('android');

    if (isIOS) {
      return OS.ios;
    }
    if (isAndroid) {
      return OS.android;
    }

    return OS.other;
  }
}
