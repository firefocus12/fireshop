import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceOrderPageRoutingModule } from './place-order-routing.module';

import { PlaceOrderPage } from './place-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceOrderPageRoutingModule
  ],
  declarations: [PlaceOrderPage]
})
export class PlaceOrderPageModule {}
