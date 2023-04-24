import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { HttpClientModule } from  '@angular/common/http';



@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    BannerComponent
  ]
})
export class SharedModule { }
