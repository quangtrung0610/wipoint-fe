import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonDirective } from './directive/skeleton.directive';

@NgModule({
  declarations: [SkeletonDirective],
  imports: [CommonModule],
  exports: [SkeletonDirective],
})
export class SkeletonModule {}
