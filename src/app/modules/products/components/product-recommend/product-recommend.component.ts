import { Component, Input } from '@angular/core';
import { ProductDto } from '../../models';

@Component({
  selector: 'app-product-recommend',
  templateUrl: './product-recommend.component.html',
  styleUrls: ['./product-recommend.component.scss'],
})
export class ProductRecommendComponent {
  @Input() data: ProductDto = new ProductDto();

}
