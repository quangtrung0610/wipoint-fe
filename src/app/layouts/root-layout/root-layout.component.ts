import { Component } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root-layout',
  templateUrl: './root-layout.component.html',
  styleUrls: ['./root-layout.component.scss'],
})
export class RootLayoutComponent {
  public androidAppUrl = environment.androidAppUrl;
  public iosAppUrl = environment.iosAppUrl;
}
