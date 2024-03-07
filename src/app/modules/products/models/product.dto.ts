import { EntityDto } from '@core/dto';
import { ProductStatus } from '../enums/product-status';
import { MediaDto } from './media.dto';
import { PointStatus } from '../enums/point-status';

export class ProductDto extends EntityDto {
  refId: number = 0;
  thumbnail: string = '';
  thumbnails: string[] = [];
  barCode: string = '';
  status: ProductStatus = ProductStatus.active;
  pointStatus: PointStatus = PointStatus.none;
  categoryId: number | null = null;
  categoryName: string = '';
  origin: string = '';
  salePrice: number = 0.0;
  length: number = 0.0;
  width: number = 0.0;
  height: number = 0.0;
  get size() {
    return this.length ? `${this.length}*${this.width}*${this.height}` : '';
  }

  weight: number = 0.0;
  volume: number = 0.0;
  weightUnit: number = 1;
  volumeUnit: number = 1;
  descriptions: string = '';
  medias: MediaDto[] = [];
  point?: number;

  constructor(_productDto?: ProductDto) {
    super(_productDto);
    this.refId = _productDto?.refId!;
    this.thumbnail = _productDto?.thumbnail!;
    this.thumbnails = _productDto?.thumbnails && _productDto?.thumbnails.length ? _productDto?.thumbnails : [];
    this.barCode = _productDto?.barCode!;
    this.status = _productDto?.status!;
    this.pointStatus = _productDto?.pointStatus!;
    this.categoryId = _productDto?.categoryId!;
    this.categoryName = _productDto?.categoryName!;
    this.origin = _productDto?.origin!;
    this.salePrice = _productDto?.salePrice! || 0;
    this.length = _productDto?.length!;
    this.width = _productDto?.width!;
    this.height = _productDto?.height!;
    this.weight = _productDto?.weight!;
    this.volume = _productDto?.volume!;
    this.weightUnit = _productDto?.weightUnit!;
    this.volumeUnit = _productDto?.volumeUnit!;
    this.descriptions = _productDto?.descriptions || '';
    this.medias = _productDto?.medias && _productDto?.medias.length ? _productDto?.medias : [];
    this.point = _productDto?.point!;
  }
}
