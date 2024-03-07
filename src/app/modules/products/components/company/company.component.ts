import { Component, Input } from '@angular/core';
import { ShopDto } from '../../models';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent {
  @Input() data!: ShopDto;
  @Input() isLoading!: boolean;
}
