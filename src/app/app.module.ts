import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderConfig, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

const ngx_ui_loader_configuration:NgxUiLoaderConfig =
{
  "bgsColor": "blue",
  "bgsOpacity": 1,
  "bgsPosition": "bottom-right",
  "bgsSize": 100,
  "bgsType": "square-jelly-box",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "blue",
  "fgsPosition": "center-center",
  "fgsSize": 80,
  "fgsType": "square-jelly-box",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "white",
  "pbDirection": "ltr",
  "pbThickness": 10,
  "hasProgressBar": true,
  "text": "Quelques secondes ...",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    NgxUiLoaderModule.forRoot(ngx_ui_loader_configuration),
    NgxUiLoaderRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
