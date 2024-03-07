import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootLayoutComponent } from './root-layout.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/layouts/root-layout/components/footer/footer.component';

@NgModule({
  declarations: [RootLayoutComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
})
export class RootLayoutModule {}
