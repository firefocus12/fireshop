import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PreviewPage } from './preview/preview.page';
import { PlaceOrderPage } from './place-order/place-order.page';




@NgModule({
  declarations: [AppComponent, PlaceOrderPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,

  ],
  providers: [
    StatusBar,BarcodeScanner,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent, PlaceOrderPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
