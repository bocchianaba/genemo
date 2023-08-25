import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderConfig, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { StateModule } from './store/store.module';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './store/user/user.effect';


registerLocaleData(localeFr);

const ngx_ui_loader_configuration:NgxUiLoaderConfig =
{
  "bgsColor": "#2163ff",
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
    NgxUiLoaderModule.forRoot(ngx_ui_loader_configuration),
    NgxUiLoaderRouterModule,
    NgbModule,
    StateModule,
    SharedModule,
    EffectsModule.forRoot([UserEffect])
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-CM' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
