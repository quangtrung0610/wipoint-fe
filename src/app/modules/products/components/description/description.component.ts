import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CollapseAnimation } from '@animations/collapse';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations:[CollapseAnimation]
})
export class DescriptionComponent {
  @Input() description: string = '';
  @Input() isLoading!: boolean;

  // isActive: boolean = false;

  // ngOnChanges(e: SimpleChanges): void {
  //   if (e['description'] && !e['description'].firstChange) {
  //     if (this.description) this.isActive = !!this.description;
  //   }
  // }
}
