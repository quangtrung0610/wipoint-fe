import { PointStatus } from './../enums/point-status';
import { EntityDto } from '@core/dto';
import { Status } from '../enums/status';
import { ProductDto } from './product.dto';
import { ShopDto } from './shop.dto';

export class QrcodeDto extends EntityDto {
  expireDate?: Date;
  manufacturingDate?: Date;
  hasSecurityCode: boolean = false;
  status: Status = Status.inactive;
  pointStatus: PointStatus = PointStatus.none;
  productInfo: ProductDto = new ProductDto();
  productRecommend: ProductDto[] = [];
  shopInfo: ShopDto = new ShopDto();

  constructor(_qrcodeDto?: QrcodeDto) {
    super(_qrcodeDto);
    this.expireDate = _qrcodeDto?.expireDate ? new Date(_qrcodeDto?.expireDate) : undefined;
    this.manufacturingDate = _qrcodeDto?.manufacturingDate ? new Date(_qrcodeDto?.manufacturingDate) : undefined;
    this.hasSecurityCode = _qrcodeDto?.hasSecurityCode!;
    this.status = _qrcodeDto?.status!;
    this.pointStatus = _qrcodeDto?.pointStatus!;
    this.productInfo = _qrcodeDto?.productInfo || new ProductDto();
    this.productRecommend = _qrcodeDto?.productRecommend || [];
    this.shopInfo = _qrcodeDto?.shopInfo || new ShopDto();
  }
}
