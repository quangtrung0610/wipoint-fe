import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { TDSCardModule } from 'tds-ui/card';
import { TDSCollapseModule } from 'tds-ui/collapse';
import { TDSButtonModule } from 'tds-ui/button';
import { CompanyComponent } from './components/company/company.component';
import { TDSCarouselModule } from 'tds-ui/carousel';
import { TDSPipesModule } from 'tds-ui/core/pipes';
import { DescriptionComponent } from './components/description/description.component';
import { SkeletonModule } from '@UI/skeleton/skeleton.module';
import { TDSSkeletonModule } from 'tds-ui/skeleton';
import { CarouselModule } from '@UI/carousel/carousel.module';
import { TDSImageModule } from 'tds-ui/image';
import { ProductRecommendComponent } from './components/product-recommend/product-recommend.component';

@NgModule({
  declarations: [
    ProductDetailComponent,
    CompanyComponent,
    DescriptionComponent,
    ProductRecommendComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TDSCardModule,
    TDSCollapseModule,
    TDSButtonModule,
    TDSCarouselModule,
    TDSPipesModule,
    TDSSkeletonModule,
    TDSImageModule,

    SkeletonModule,
    CarouselModule,
  ],
})
export class ProductsModule {}
