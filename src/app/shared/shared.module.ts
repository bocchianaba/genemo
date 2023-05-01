import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { HttpClientModule } from  '@angular/common/http';
import { NgbAccordionModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';



@NgModule({
  declarations: [
    BannerComponent,
    TruncateTextPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    BannerComponent,
    NgbPaginationModule,
    TruncateTextPipe,
    NgbTooltipModule,
    NgbAccordionModule
  ]
})
export class SharedModule { }
