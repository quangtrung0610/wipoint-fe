import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductDto } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { QrcodeDto } from '../../models/qrcode.dto';
import { COUNTRIES_DICT } from '../../data/countries';
import { HiddenAnimation } from '@animations/hidden';
import { CollapseAnimation } from '@animations/collapse';
import { OS } from '@core/enum';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  animations: [HiddenAnimation, CollapseAnimation],
})
export class ProductDetailComponent implements OnInit {
  public isLoading: boolean = true;
  public dataSet: QrcodeDto = new QrcodeDto();
  public productId: number = 0;
  public countriesDict = COUNTRIES_DICT;
  public advertisements = [
    'assets/images/advertisements/advertisement-1.svg',
    'assets/images/advertisements/advertisement-2.svg',
    'assets/images/advertisements/advertisement-3.svg',
  ];

  public androidAppUrl = environment.androidAppUrl;
  public iosAppUrl = environment.iosAppUrl;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      if ('qr' in params) {
        this.productId = params['qr'];
        this.getEntity();
      } else {
        this.router.navigateByUrl('');
      }
    });
  }

  ngOnInit(): void {}

  //#region handle api
  private getEntity(): void {
    this.productService.getEntity(this.productId).subscribe({
      next: (res) => {
        this.dataSet = res;
      },
      error: (err) => {
        this.isLoading = false;
        this.router.navigateByUrl('');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  //#endregion

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
