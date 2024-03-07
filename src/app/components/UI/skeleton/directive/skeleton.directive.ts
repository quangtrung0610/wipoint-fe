import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appSkeleton]',
})
export class SkeletonDirective implements OnChanges {
  @Input('appSkeleton') skeleton!: string;
  @Input('isLoading') isLoading: boolean = true;

  constructor(private elementRef: ElementRef) {
    if (this.isLoading) {
      this.elementRef.nativeElement.classList.add('skeleton-loading');
    } else {
      this.elementRef.nativeElement.classList.remove('skeleton-loading');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isLoading'] && !changes['isLoading'].firstChange) {
      if (this.isLoading) {
        this.elementRef.nativeElement.classList.add('skeleton-loading');
      } else {
        this.elementRef.nativeElement.classList.remove('skeleton-loading');
      }
    }
  }
}
